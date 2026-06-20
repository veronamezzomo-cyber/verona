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
  Video,
  Search,
  Bell,
  Menu,
  Settings,
  Image as ImageIcon,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
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

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const result = await generateLayoutVariations({ prompt });
      if (result && result.length > 0) {
        setLayout(result[0]);
      }
    } catch (error) {
      console.error("PIPELINE_ERROR:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black text-white font-sans selection:bg-primary/30">
      {/* Header logic removed from layout as it's part of the static SVG for higher fidelity and simpler AE export */}
      
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

        <PropertiesPanel selectedElement={selectedElement} onUpdate={updateElement} />
      </main>

      <footer className="h-10 border-t border-white/5 bg-black flex items-center justify-between px-6 text-[10px] text-muted-foreground/40 font-mono tracking-wider">
        <div className="flex gap-6">
          <span className="flex items-center gap-1.5 text-primary font-bold">
            <div className={cn("w-1.5 h-1.5 rounded-full bg-primary animate-pulse")} /> 
            GROK_ENGINE_STABLE
          </span>
          <span>SYSTEM: xAI_CLUSTER</span>
          <span>VERSION: 3.14-BETA</span>
        </div>
        <div className="flex gap-4">
          <ExportPanel elements={elements} />
        </div>
      </footer>
    </div>
  );
}
