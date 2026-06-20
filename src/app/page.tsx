
"use client";

/**
 * @fileOverview Grok UI Forge - Core Interface.
 * 100% Estático para Motion Design de Plataformas de IA.
 */

import { useState, useEffect } from 'react';
import { LayoutEditor } from '@/components/layout-editor';
import { PropertiesPanel } from '@/components/properties-panel';
import { useLayoutState } from '@/hooks/use-layout-state';
import { generateGrokAbsoluteReconstruction } from '@/lib/layout-templates';
import { 
  Maximize2,
  Loader2,
  Settings,
  Plus,
  Box
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ExportPanel } from '@/components/export-panel';
import { generateLayoutVariations } from '@/ai/flows/generate-layout-variations';

export default function GrokForgeStudio() {
  const { 
    elements, 
    selectedIds, 
    selectedElement, 
    zoom, setZoom,
    pan, setPan,
    setLayout, 
    updateElement, 
    selectElement 
  } = useLayoutState();

  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  useEffect(() => {
    const initialMap = generateGrokAbsoluteReconstruction();
    setLayout(initialMap.elements, initialMap.negativeSpaceMetrics);
  }, [setLayout]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black text-white font-sans selection:bg-primary/30">
      {/* Top Header - Export and Status */}
      <header className="h-14 border-b border-white/5 bg-black/80 backdrop-blur-xl flex items-center justify-between px-6 z-[100]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Box className="h-5 w-5 text-primary" />
            <span className="text-xs font-headline uppercase tracking-widest font-bold">Forge Studio</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1.5 text-primary text-[10px] font-mono font-bold">
              <div className={cn("w-1.5 h-1.5 rounded-full bg-primary animate-pulse")} /> 
              SYSTEM_STABLE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ExportPanel elements={elements} />
        </div>
      </header>
      
      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 relative bg-black overflow-hidden">
          <LayoutEditor 
            elements={elements} 
            selectedIds={selectedIds}
            zoom={zoom}
            pan={pan}
            onSelect={selectElement}
            onUpdate={updateElement}
            onPan={(x, y) => setPan({ x, y })}
            onZoom={(z) => setZoom(prev => Math.max(0.1, Math.min(10, prev * z)))}
          />

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/80 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-2xl z-50">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => setZoom(prev => prev * 0.9)}>-</Button>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[10px] font-mono w-12 text-center text-primary font-bold">{Math.round(zoom * 100)}%</span>
            <div className="h-4 w-px bg-white/10" />
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => setZoom(prev => prev * 1.1)}>+</Button>
          </div>
        </div>

        {selectedElement && (
          <PropertiesPanel selectedElement={selectedElement} onUpdate={updateElement} />
        )}
      </main>

      <footer className="h-8 border-t border-white/5 bg-black flex items-center justify-between px-6 text-[9px] text-muted-foreground/30 font-mono tracking-widest">
        <div className="flex gap-6 uppercase">
          <span>xAI_CLUSTER_NODE_01</span>
          <span>v3.14_STABLE</span>
        </div>
        <div>
          <span>VECTOR_PRECISION: 100%</span>
        </div>
      </footer>
    </div>
  );
}
