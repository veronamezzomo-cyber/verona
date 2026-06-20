
"use client";

import { useState, useEffect } from 'react';
import { PromptInput } from '@/components/prompt-input';
import { VariationPicker } from '@/components/variation-picker';
import { LayoutEditor } from '@/components/layout-editor';
import { EditorToolbar } from '@/components/editor-toolbar';
import { ExportPanel } from '@/components/export-panel';
import { useLayoutState } from '@/hooks/use-layout-state';
import { generateLayoutVariations } from '@/ai/flows/generate-layout-variations';
import { UIElement } from '@/lib/layout-templates';
import { ChevronLeft, Layout, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ViewMode = 'browse' | 'edit';

// Layout injetado diretamente pelo Prototipador via Chat
const BOOTSTRAP_LAYOUT: UIElement[] = [
  { id: 'header', name: 'Studio Header', type: 'rect', x: 0, y: 0, width: 1280, height: 64, fill: '#0A0E27', opacity: 1, stroke: '#3B82F6', strokeWidth: 0.5 },
  { id: 'search-pill', name: 'Search', type: 'rect', x: 440, y: 14, width: 400, height: 36, fill: 'rgba(255,255,255,0.05)', opacity: 1, rx: 18, ry: 18, stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 },
  { id: 'side-nav', name: 'Studio Sidebar', type: 'rect', x: 0, y: 64, width: 240, height: 656, fill: '#0A0E27', opacity: 1, stroke: 'rgba(255,255,255,0.05)', strokeWidth: 1 },
  { id: 'dash-title', name: 'Dashboard Title', type: 'text', x: 280, y: 110, width: 0, height: 0, fill: '#E5E7EB', opacity: 1, text: 'Painel do Canal', fontSize: 28 },
  
  // Card Analytics
  {
    id: 'card-stats', name: 'Channel Analytics', type: 'group', x: 280, y: 140, width: 340, height: 420, fill: 'none', opacity: 1,
    children: [
      { id: 'card-bg-1', name: 'Card BG', type: 'rect', x: 0, y: 0, width: 340, height: 420, fill: 'rgba(139, 92, 246, 0.03)', opacity: 1, rx: 12, ry: 12, stroke: 'rgba(139, 92, 246, 0.3)', strokeWidth: 1 },
      { id: 'stat-label', name: 'Subs Label', type: 'text', x: 20, y: 40, width: 0, height: 0, fill: 'rgba(255,255,255,0.6)', opacity: 1, text: 'Inscritos Atuais', fontSize: 14 },
      { id: 'stat-val', name: 'Subs Count', type: 'text', x: 20, y: 90, width: 0, height: 0, fill: '#3B82F6', opacity: 1, text: '1.240.582', fontSize: 36 },
      { id: 'stat-growth', name: 'Growth', type: 'text', x: 20, y: 130, width: 0, height: 0, fill: '#10B981', opacity: 1, text: '+12.4% nos últimos 28 dias', fontSize: 12 }
    ]
  },

  // Card Latest Video
  {
    id: 'card-video', name: 'Latest Video Performance', type: 'group', x: 640, y: 140, width: 580, height: 280, fill: 'none', opacity: 1,
    children: [
      { id: 'card-bg-2', name: 'Video Card BG', type: 'rect', x: 0, y: 0, width: 580, height: 280, fill: 'rgba(255,255,255,0.02)', opacity: 1, rx: 12, ry: 12, stroke: 'rgba(255,255,255,0.05)', strokeWidth: 1 },
      { id: 'thumb-box', name: 'Thumbnail', type: 'rect', x: 20, y: 20, width: 240, height: 135, fill: 'rgba(59, 130, 246, 0.1)', opacity: 1, rx: 8, ry: 8 },
      { id: 'vid-title', name: 'Video Title', type: 'text', x: 280, y: 40, width: 0, height: 0, fill: '#E5E7EB', opacity: 1, text: 'Como criar UI Vetorial com IA', fontSize: 18 },
      { id: 'vid-views', name: 'Views', type: 'text', x: 280, y: 80, width: 0, height: 0, fill: 'rgba(255,255,255,0.5)', opacity: 1, text: '45.231 visualizações', fontSize: 14 }
    ]
  },

  // News/Ideas Card
  { id: 'card-news', name: 'News & Ideas', type: 'rect', x: 640, y: 440, width: 580, height: 220, fill: 'rgba(59, 130, 246, 0.05)', opacity: 1, rx: 12, ry: 12, stroke: 'rgba(59, 130, 246, 0.2)', strokeWidth: 1 }
];

export default function LayoutForge() {
  const [viewMode, setViewMode] = useState<ViewMode>('browse');
  const [variations, setVariations] = useState<UIElement[][]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<UIElement[] | null>(null);
  const { elements, selectedId, selectedElement, setLayout, addElement, updateElement, removeElement, selectElement } = useLayoutState();

  // Efeito de "Bootstrap" para quando o Prototipador injeta um layout
  useEffect(() => {
    if (BOOTSTRAP_LAYOUT && BOOTSTRAP_LAYOUT.length > 0) {
      setLayout(BOOTSTRAP_LAYOUT);
      setViewMode('edit');
    }
  }, [setLayout]);

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    const isDirectCreate = prompt.toLowerCase().startsWith('/create');
    
    try {
      const results = await generateLayoutVariations({ prompt });
      setVariations(results);
      
      if (isDirectCreate && results.length > 0) {
        const firstVar = results[0];
        setSelectedVariation(firstVar);
        setLayout(firstVar);
        setViewMode('edit');
      } else {
        setSelectedVariation(results[0] || null);
      }
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEnterEdit = () => {
    if (!selectedVariation) return;
    setLayout(selectedVariation);
    setViewMode('edit');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#050714]">
      {/* Header */}
      <header className="h-16 border-b border-white/5 bg-card/20 backdrop-blur-md flex items-center justify-between px-8 z-[100]">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-1.5 rounded-lg glow-primary">
            <Layout className="h-5 w-5 text-white" />
          </div>
          <h1 className="font-headline uppercase tracking-[0.2em] text-lg font-bold text-white">
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
              <p className="text-muted-foreground text-sm">
                Use <code className="bg-white/5 px-2 py-0.5 rounded text-primary">/create [termo]</code> para editar instantaneamente.
              </p>
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
                  <span className="text-[10px] font-mono text-white/20">{variations.length} LAYOUTS DISPONÍVEIS</span>
                </div>
                <VariationPicker 
                  variations={variations} 
                  onSelect={(v) => setSelectedVariation(v)} 
                />
              </div>
            )}
            
            {!isGenerating && variations.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 opacity-20 pointer-events-none">
                <Sparkles className="h-12 w-12 mb-4" />
                <p className="text-sm uppercase tracking-widest text-white">Waiting for architect input</p>
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
            
            <EditorToolbar 
              selectedElement={selectedElement}
              onUpdate={updateElement}
              onDelete={removeElement}
              onAdd={addElement}
              onClose={() => selectElement(null)}
            />

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
