
"use client";

/**
 * @fileOverview Visual Reverse Engineering Engine - Core Interface.
 */

import { useState, useEffect } from 'react';
import { LayoutEditor } from '@/components/layout-editor';
import { PropertiesPanel } from '@/components/properties-panel';
import { useLayoutState } from '@/hooks/use-layout-state';
import { generateGrokDashboardElements } from '@/lib/layout-templates';
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
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ExportPanel } from '@/components/export-panel';

export default function LayoutForgeEnterprise() {
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
  
  // REVERSE ENGINEERING BOOTSTRAP: High Fidelity Grok.com
  useEffect(() => {
    setLayout(generateGrokDashboardElements());
  }, [setLayout]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black text-white font-sans selection:bg-primary/30">
      {/* Reverse Engineering Top Bar */}
      <header className="h-14 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl flex items-center justify-between px-6 z-[200]">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="bg-primary p-1.5 rounded-lg shadow-lg">
                <Layout className="h-5 w-5" />
             </div>
             <div className="flex flex-col">
                <h1 className="text-xs font-bold uppercase tracking-[0.25em] text-white/90">Forge <span className="text-primary/70">v3.0</span></h1>
                <span className="text-[9px] text-muted-foreground font-mono">REVERSE_ENGINEERING_ACTIVE</span>
             </div>
          </div>
          <div className="h-8 w-px bg-white/5" />
          <nav className="flex items-center gap-2">
            <ToolButton icon={MousePointer2} active />
            <ToolButton icon={Box} />
            <ToolButton icon={Type} />
            <ToolButton icon={Grid3X3} />
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
             <span className="text-[10px] font-mono text-muted-foreground uppercase">Zoom</span>
             <span className="text-[10px] font-mono text-primary font-bold">{Math.round(zoom * 100)}%</span>
          </div>
          <div className="h-8 w-px bg-white/5" />
          <ExportPanel elements={elements} />
          <Button size="sm" className="h-9 px-6 bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all font-bold">
            <Share2 className="mr-2 h-4 w-4" /> Deploy
          </Button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Navigation & Structure Panel */}
        <aside className="w-72 border-r border-white/5 bg-[#050505] flex flex-col z-[100]">
          <div className="flex h-12 border-b border-white/5">
            <SideTab label="Structure" active={activeTab === 'layers'} onClick={() => setActiveTab('layers')} icon={Layers} />
            <SideTab label="Library" active={activeTab === 'assets'} onClick={() => setActiveTab('assets')} icon={Box} />
            <SideTab label="Engine" active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} icon={Sparkles} />
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-5">
              {activeTab === 'layers' && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-4 px-1">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Layers</span>
                     <Maximize2 className="h-3 w-3 text-muted-foreground/40" />
                  </div>
                  {elements.map(el => (
                    <LayerItem 
                      key={el.id} 
                      element={el} 
                      selected={selectedIds.includes(el.id)} 
                      onClick={() => selectElement(el.id)} 
                    />
                  ))}
                </div>
              )}
              {activeTab === 'ai' && (
                <div className="space-y-6 pt-2">
                   <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
                      <div className="flex items-center gap-2 text-primary">
                         <Command className="h-4 w-4" />
                         <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Visual Engine</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">Capture coordinates and spatial mapping from any reference interface.</p>
                      <input 
                        type="text" 
                        placeholder="Ex: 'Increase sidebar width to 280px'" 
                        className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-[11px] focus:ring-1 focus:ring-primary outline-none transition-all"
                      />
                   </div>
                   <div className="space-y-3">
                      <h4 className="text-[9px] font-bold uppercase text-muted-foreground/40 px-1 tracking-widest">Automation Logs</h4>
                      <div className="bg-black/40 rounded-lg p-3 border border-white/5 font-mono text-[9px] text-primary/60 space-y-1">
                         <div className="flex justify-between"><span>&gt; DETECT_LOGO</span><span className="text-green-500">OK</span></div>
                         <div className="flex justify-between"><span>&gt; MAP_PILL_INPUT</span><span className="text-green-500">OK</span></div>
                         <div className="flex justify-between"><span>&gt; SYNC_COORDINATES</span><span className="text-green-500">OK</span></div>
                      </div>
                   </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </aside>

        {/* High-Fidelity Interaction Stage */}
        <div className="flex-1 relative bg-black">
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

          {/* Floating Workspace Controls */}
          <div className="absolute bottom-8 right-8 flex items-center gap-3 bg-black/80 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-2xl">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => setZoom(prev => prev * 0.9)}>-</Button>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[10px] font-mono w-12 text-center text-primary font-bold">{Math.round(zoom * 100)}%</span>
            <div className="h-4 w-px bg-white/10" />
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => setZoom(prev => prev * 1.1)}>+</Button>
          </div>
        </div>

        {/* Real Inspector Panel */}
        <PropertiesPanel selectedElement={selectedElement} onUpdate={updateElement} />
      </main>

      {/* Engineering Footer */}
      <footer className="h-7 border-t border-white/5 bg-[#050505] flex items-center justify-between px-6 text-[10px] text-muted-foreground/40 font-mono tracking-wider">
        <div className="flex gap-6">
          <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" /> ENGINE_STABLE</span>
          <span>OBJECTS: {elements.length}</span>
          <span>REF_FIDELITY: 0.98</span>
        </div>
        <div className="flex gap-4">
          <span>{pan.x.toFixed(0)}, {pan.y.toFixed(0)} PX</span>
          <span>LATENCY: 12ms</span>
        </div>
      </footer>
    </div>
  );
}

function ToolButton({ icon: Icon, active = false }: { icon: any, active?: boolean }) {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={cn(
        "h-9 w-9 rounded-lg transition-all", 
        active ? "bg-primary/20 text-primary shadow-inner" : "text-muted-foreground hover:bg-white/5"
      )}
    >
      <Icon className="h-5 w-5" />
    </Button>
  );
}

function SideTab({ label, icon: Icon, active, onClick }: { label: string, icon: any, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border-b-2",
        active ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground hover:bg-white/5"
      )}
    >
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
}

function LayerItem({ element, selected, onClick }: { element: UIElement, selected: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer group transition-all border border-transparent",
        selected ? "bg-primary/10 border-primary/20 text-white" : "hover:bg-white/5 text-muted-foreground/70"
      )}
    >
      <div className={cn("p-1 rounded bg-black/40", selected ? "text-primary" : "text-muted-foreground/30")}>
        <Box className="h-3.5 w-3.5" />
      </div>
      <span className="text-[11px] font-medium truncate flex-1 tracking-tight">{element.name}</span>
      <ChevronRight className={cn("h-3.5 w-3.5 transition-all opacity-0", selected ? "opacity-100" : "group-hover:opacity-30")} />
    </div>
  );
}
