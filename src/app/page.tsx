"use client";

/**
 * @fileOverview YouTube UI Forge - Core Interface.
 * 100% Estático para Motion Design de Plataformas de Vídeo.
 */

import { useState, useEffect } from 'react';
import { LayoutEditor } from '@/components/layout-editor';
import { PropertiesPanel } from '@/components/properties-panel';
import { useLayoutState } from '@/hooks/use-layout-state';
import { generateYouTubeAbsoluteReconstruction } from '@/lib/layout-templates';
import { 
  Layout, 
  Layers, 
  Box, 
  MousePointer2, 
  Type, 
  Grid3X3, 
  Share2,
  Sparkles,
  Command,
  ChevronRight,
  Maximize2,
  Loader2,
  Video,
  Search,
  Bell,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ExportPanel } from '@/components/export-panel';
import { generateLayoutVariations } from '@/ai/flows/generate-layout-variations';

export default function YouTubeForgeStudio() {
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

  const [activeTab, setActiveTab] = useState<'layers' | 'assets' | 'ai'>('layers');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [engineLogs, setEngineLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const initialMap = generateYouTubeAbsoluteReconstruction();
    setLayout(initialMap.elements, initialMap.negativeSpaceMetrics);
  }, [setLayout]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setEngineLogs([]);
    
    const addLog = (msg: string) => setEngineLogs(prev => [...prev, msg]);
    
    try {
      addLog("INITIATING_VIDEO_RECONSTRUCTION");
      addLog("PHASE_1: GRID_ANALYSIS... OK");
      addLog("PHASE_2: SIDEBAR_HIERARCHY... OK");
      addLog("PHASE_3: HEADER_CONTROLS... OK");
      
      const result = await generateLayoutVariations({ prompt });
      if (result && result.length > 0) {
        setLayout(result[0]);
        addLog("RECONSTRUCTION_COMPLETE");
      }
    } catch (error) {
      addLog("PIPELINE_ERROR: ABORTED");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0f0f0f] text-white font-sans selection:bg-red-500/30">
      <header className="h-14 border-b border-white/5 bg-[#0f0f0f]/80 backdrop-blur-xl flex items-center justify-between px-4 z-[200]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
             <Menu className="h-6 w-6 text-white cursor-pointer" />
             <div className="flex items-center gap-1">
                <Video className="h-6 w-6 text-red-600 fill-red-600" />
                <h1 className="text-sm font-bold tracking-tighter">YouTube <span className="text-[10px] text-muted-foreground align-top">BR</span></h1>
             </div>
          </div>
        </div>

        <div className="flex-1 max-w-2xl px-8 flex items-center gap-4">
          <div className="flex-1 flex items-center bg-[#121212] border border-white/10 rounded-full h-10 overflow-hidden">
             <div className="flex-1 px-4 text-sm text-muted-foreground">Pesquisar</div>
             <div className="w-16 h-full bg-white/5 flex items-center justify-center border-l border-white/10 hover:bg-white/10 cursor-pointer">
                <Search className="h-5 w-5 text-white" />
             </div>
          </div>
          <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer">
             <div className="h-5 w-5 border-2 border-white rounded-full flex items-center justify-center">
                <div className="h-1 w-1 bg-white rounded-full" />
             </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex gap-2 text-sm font-medium">
             <div className="h-5 w-5 border border-white/20 rounded flex items-center justify-center">+</div>
             Criar
          </Button>
          <div className="relative cursor-pointer">
             <Bell className="h-6 w-6" />
             <span className="absolute -top-1 -right-1 bg-red-600 text-[10px] font-bold px-1 rounded-full">2</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-sm">P</div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <aside className="w-60 border-r border-white/5 bg-[#0f0f0f] flex flex-col z-[100]">
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              <SidebarItem icon={Layers} label="Início" active />
              <SidebarItem icon={Video} label="Shorts" />
              <SidebarItem icon={Maximize2} label="Inscrições" />
              <div className="h-px bg-white/5 my-3 mx-4" />
              <h4 className="px-4 py-2 text-sm font-bold">Inscrições</h4>
              <ChannelItem name="orochidois" active />
              <ChannelItem name="Perrenoud" />
              <ChannelItem name="Professor HOC" />
            </div>
          </ScrollArea>
        </aside>

        <div className="flex-1 relative bg-[#0f0f0f] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-14 z-50 px-6 flex items-center gap-3 bg-[#0f0f0f]/90 backdrop-blur-sm">
             <CategoryPill label="Tudo" active />
             <CategoryPill label="Música" />
             <CategoryPill label="Podcasts" />
             <CategoryPill label="Inteligência artificial" />
          </div>
          
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
            <span className="text-[10px] font-mono w-12 text-center text-red-500 font-bold">{Math.round(zoom * 100)}%</span>
            <div className="h-4 w-px bg-white/10" />
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => setZoom(prev => prev * 1.1)}>+</Button>
          </div>
        </div>

        <PropertiesPanel selectedElement={selectedElement} onUpdate={updateElement} />
      </main>

      <footer className="h-7 border-t border-white/5 bg-[#0f0f0f] flex items-center justify-between px-6 text-[10px] text-muted-foreground/40 font-mono tracking-wider">
        <div className="flex gap-6">
          <span className="flex items-center gap-1.5 text-red-500 font-bold">
            <div className={cn("w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse")} /> 
            PLATFORM_LIVE
          </span>
          <span>CHANNELS: 142</span>
          <span>REGION: BR</span>
        </div>
        <div className="flex gap-4">
          <ExportPanel elements={elements} />
        </div>
      </footer>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-5 px-3 py-2.5 rounded-xl cursor-pointer transition-colors",
      active ? "bg-white/10 text-white font-medium" : "text-white/80 hover:bg-white/5"
    )}>
      <Icon className="h-6 w-6" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

function ChannelItem({ name, active = false }: { name: string, active?: boolean }) {
  return (
    <div className="flex items-center gap-4 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-white/5 group">
      <div className="h-6 w-6 rounded-full bg-white/10 border border-white/5" />
      <span className="text-sm flex-1 truncate">{name}</span>
      {active && <div className="h-1 w-1 bg-blue-500 rounded-full" />}
    </div>
  );
}

function CategoryPill({ label, active = false }: { label: string, active?: boolean }) {
  return (
    <div className={cn(
      "px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors whitespace-nowrap",
      active ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
    )}>
      {label}
    </div>
  );
}
