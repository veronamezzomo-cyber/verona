"use client";

import { useState } from 'react';
import { PromptInput } from '@/components/prompt-input';
import { VariationPicker } from '@/components/variation-picker';
import { LayoutEditor } from '@/components/layout-editor';
import { EditorToolbar } from '@/components/editor-toolbar';
import { ExportPanel } from '@/components/export-panel';
import { useLayoutState } from '@/hooks/use-layout-state';
import { generateLayoutVariations } from '@/ai/flows/generate-layout-variations';
import { UIElement } from '@/lib/layout-templates';
import { Layers, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

type AppState = 'idle' | 'variations' | 'editing';

export default function LayoutForge() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [variations, setVariations] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { elements, selectedId, selectedElement, setLayout, addElement, updateElement, removeElement, selectElement } = useLayoutState();

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    setAppState('idle');
    try {
      const results = await generateLayoutVariations({ prompt });
      setVariations(results);
      setAppState('variations');
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVariationSelect = (svg: string) => {
    // In a production app, we would use a robust SVG parser to convert the AI output back to UIElement[]
    // For this prototype demonstration, we'll initialize a representative "Layered" state 
    // to showcase the editing capabilities immediately upon selection.
    
    const initialElements: UIElement[] = [
      {
        id: 'logo-group',
        name: 'Header Branding',
        type: 'group',
        x: 50,
        y: 40,
        width: 180,
        height: 50,
        fill: '#3B82F6',
        opacity: 1,
        children: [
          { id: 'logo-rect', name: 'Logo Rect', type: 'rect', x: 0, y: 0, width: 40, height: 40, fill: '#3B82F6', opacity: 1, rx: 8, ry: 8 },
          { id: 'logo-text', name: 'Brand Name', type: 'text', x: 100, y: 28, width: 0, height: 0, fill: '#E5E7EB', opacity: 1, text: 'FORGE UI', fontSize: 24 }
        ]
      },
      {
        id: 'search-main',
        name: 'Main Search',
        type: 'rect',
        x: 440,
        y: 40,
        width: 400,
        height: 48,
        fill: 'rgba(139, 92, 246, 0.15)',
        opacity: 1,
        rx: 24,
        ry: 24,
        stroke: '#8B5CF6',
        strokeWidth: 1
      },
      {
        id: 'chat-bubble-1',
        name: 'System Response',
        type: 'rect',
        x: 340,
        y: 200,
        width: 600,
        height: 120,
        fill: 'rgba(59, 130, 246, 0.05)',
        opacity: 1,
        rx: 16,
        ry: 16,
        stroke: '#3B82F6',
        strokeWidth: 1
      }
    ];
    
    setLayout(initialElements);
    setAppState('editing');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar */}
      <header className="h-16 border-b border-border bg-card/50 flex items-center justify-between px-8 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-1.5 rounded-lg">
            <Layers className="h-5 w-5 text-white" />
          </div>
          <h1 className="font-headline uppercase tracking-widest text-lg font-bold">
            Layout <span className="text-secondary">Forge</span>
          </h1>
        </div>

        {appState === 'editing' && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <ExportPanel elements={elements} />
          </div>
        )}
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        {/* Editor Workbench */}
        {appState === 'editing' ? (
          <>
            <div className="flex-1 p-8 flex flex-col items-center justify-center bg-[#050714] overflow-auto">
              <div className="mb-6 w-full max-w-5xl flex justify-between items-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="font-headline text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => setAppState('variations')}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back to Variations
                </Button>
                <div className="text-right">
                  <p className="text-[10px] font-headline uppercase tracking-widest text-muted-foreground">Studio Viewport</p>
                  <p className="text-xs font-mono">1280 x 720 (16:9)</p>
                </div>
              </div>
              <LayoutEditor 
                elements={elements} 
                selectedId={selectedId}
                onSelect={selectElement}
                onUpdate={updateElement}
              />
            </div>
            <EditorToolbar 
              selectedElement={selectedElement}
              onUpdate={updateElement}
              onDelete={removeElement}
              onAdd={addElement}
            />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#050714] text-center">
            {appState === 'idle' && !isGenerating && (
              <div className="max-w-2xl mb-12 animate-in fade-in zoom-in-95 duration-700">
                <h2 className="font-headline text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient">
                  Vector UI Reimagined
                </h2>
                <p className="text-muted-foreground text-lg mb-12">
                  Generate structured SVG layouts ready for After Effects and Illustrator using architectural text prompts.
                </p>
                <PromptInput onGenerate={handleGenerate} isLoading={isGenerating} />
              </div>
            )}

            {isGenerating && (
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="relative h-24 w-24">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <Layers className="absolute inset-0 m-auto h-8 w-8 text-secondary animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-headline text-xl uppercase tracking-tighter">Forging Vector Layers</h3>
                  <p className="text-muted-foreground text-sm animate-pulse">Calculating geometric constraints...</p>
                </div>
              </div>
            )}

            {appState === 'variations' && (
              <div className="w-full max-w-6xl mx-auto space-y-12">
                <div className="flex justify-between items-center">
                  <h2 className="font-headline text-2xl uppercase">Layout Variations</h2>
                  <Button variant="link" onClick={() => setAppState('idle')}>New Prompt</Button>
                </div>
                <VariationPicker variations={variations} onSelect={handleVariationSelect} />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="h-8 border-t border-border bg-card/30 flex items-center justify-between px-8 text-[10px] text-muted-foreground/60 font-mono tracking-widest uppercase">
        <span>Vector Studio v1.0 // GENKIT_ENGINE_STABLE</span>
        <div className="flex gap-6">
          <span>SV_GROUP_ID_RETENTION: ACTIVE</span>
          <span>LAYERED_PDF_ENGINE: READY</span>
        </div>
      </footer>
    </div>
  );
}
