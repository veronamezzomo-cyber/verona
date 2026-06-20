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
import { Layers, ChevronLeft, Layout, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ViewMode = 'browse' | 'edit';

export default function LayoutForge() {
  const [viewMode, setViewMode] = useState<ViewMode>('browse');
  const [variations, setVariations] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const { elements, selectedId, selectedElement, setLayout, addElement, updateElement, removeElement, selectElement } = useLayoutState();

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const results = await generateLayoutVariations({ prompt });
      setVariations(results);
      setSelectedVariation(results[0] || null);
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEnterEdit = () => {
    if (!selectedVariation) return;
    
    // Simulação de inicialização de elementos baseada na variação
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
        id: 'hero-main',
        name: 'Main Layout Card',
        type: 'rect',
        x: 340,
        y: 180,
        width: 600,
        height: 300,
        fill: 'rgba(59, 130, 246, 0.05)',
        opacity: 1,
        rx: 16,
        ry: 16,
        stroke: '#3B82F6',
        strokeWidth: 1
      }
    ];
    
    setLayout(initialElements);
    setViewMode('edit');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#050714]">
      {/* Header - Fixed in both modes */}
      <header className="h-16 border-b border-white/5 bg-card/20 backdrop-blur-md flex items-center justify-between px-8 z-[100]">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-1.5 rounded-lg glow-primary">
            <Layout className="h-5 w-5 text-white" />
          </div>
          <h1 className="font-headline uppercase tracking-[0.2em] text-lg font-bold">
            Layout <span className="text-secondary">Forge</span>
          </h1>
        </div>

        {viewMode === 'browse' && variations.length > 0 && (
          <Button 
            onClick={handleEnterEdit}
            className="bg-secondary hover:bg-secondary/90 glow-secondary uppercase font-headline tracking-widest text-xs"
          >
            Editar Seleção <ChevronLeft className="ml-2 h-4 w-4 rotate-180" />
          </Button>
        )}
      </header>

      <main className="flex-1 relative overflow-hidden">
        {/* MODO BROWSE */}
        <div className={cn(
          "absolute inset-0 transition-all duration-500 ease-in-out flex flex-col items-center p-8 overflow-y-auto",
          viewMode === 'browse' ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"
        )}>
          <div className="w-full max-w-4xl space-y-12 py-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-headline font-bold uppercase tracking-tight text-white/90">
                Architect Your <span className="text-primary glow-primary">Interface</span>
              </h2>
              <p className="text-muted-foreground">Descreva sua visão e forje variações vetoriais instantâneas.</p>
            </div>

            <PromptInput onGenerate={handleGenerate} isLoading={isGenerating} />

            {isGenerating && (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 border-2 border-primary/20 rounded-full"></div>
                  <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="font-headline text-xs uppercase tracking-widest text-primary animate-pulse">Calculating Vectors...</p>
              </div>
            )}

            {!isGenerating && variations.length > 0 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h3 className="font-headline text-sm uppercase tracking-[0.3em] text-muted-foreground">Variações Geradas</h3>
                  <span className="text-[10px] font-mono text-white/20">3 LAYOUTS DISPONÍVEIS</span>
                </div>
                <VariationPicker 
                  variations={variations} 
                  onSelect={(v) => setSelectedVariation(v)} 
                />
              </div>
            )}
            
            {viewMode === 'browse' && !isGenerating && variations.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 opacity-20 pointer-events-none">
                <Sparkles className="h-12 w-12 mb-4" />
                <p className="text-sm uppercase tracking-widest">Waiting for architect input</p>
              </div>
            )}
          </div>
        </div>

        {/* MODO EDIT */}
        <div className={cn(
          "absolute inset-0 transition-all duration-500 ease-in-out flex bg-[#03040b]",
          viewMode === 'edit' ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}>
          <div className="flex-1 relative flex flex-col items-center justify-center p-8 canvas-container overflow-auto">
            <LayoutEditor 
              elements={elements} 
              selectedId={selectedId}
              onSelect={selectElement}
              onUpdate={updateElement}
            />
            
            {/* Floating Toolbar Overlay */}
            <EditorToolbar 
              selectedElement={selectedElement}
              onUpdate={updateElement}
              onDelete={removeElement}
              onAdd={addElement}
              onClose={() => selectElement(null)}
            />

            {/* Editor Footer Actions */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-card/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-white"
                onClick={() => setViewMode('browse')}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Voltar ao Browse
              </Button>
              <div className="w-px h-6 bg-white/10 mx-2" />
              <ExportPanel elements={elements} />
            </div>
          </div>
        </div>
      </main>

      <footer className="h-8 border-t border-white/5 bg-black/40 flex items-center justify-between px-8 text-[9px] text-muted-foreground/40 font-mono uppercase tracking-[0.2em]">
        <span>Vector Studio v2.0 // NEON_UI_STABLE</span>
        <div className="flex gap-6">
          <span className={viewMode === 'edit' ? "text-primary font-bold" : ""}>Mode: {viewMode}</span>
          <span>Buffer: 100%</span>
        </div>
      </footer>
    </div>
  );
}