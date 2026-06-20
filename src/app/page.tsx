"use client";

/**
 * @fileOverview Layout Forge Enterprise - Plataforma de Edição Vetorial Premium.
 */

import { useState, useEffect } from 'react';
import { LayoutEditor } from '@/components/layout-editor';
import { PropertiesPanel } from '@/components/properties-panel';
import { useLayoutState } from '@/hooks/use-layout-state';
import { generateGrokDashboardElements } from '@/lib/layout-templates';
import { 
  ChevronLeft, 
  Layout, 
  Layers, 
  Box, 
  MousePointer2, 
  Type, 
  Maximize, 
  Grid3X3, 
  Settings2,
  Download,
  Share2,
  Sparkles,
  Command
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

  // Bootstrap com Grok.com Dashboard
  useEffect(() => {
    setLayout(generateGrokDashboardElements());
  }, [setLayout]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#050714] text-white">
      {/* Premium Top Bar */}
      <header className="h-12 border-b border-white/5 bg-[#0C0F1D]/80 backdrop-blur-xl flex items-center justify-between px-4 z-[200]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="bg-primary p-1 rounded-md shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                <Layout className="h-4 w-4" />
             </div>
             <h1 className="text-xs font-headline font-bold uppercase tracking-[0.2em]">Forge <span className="text-muted-foreground font-normal">v2.0</span></h1>
          </div>
          <div className="h-6 w-px bg-white/5" />
          <nav className="flex items-center gap-1">
            <ToolButton icon={MousePointer2} active />
            <ToolButton icon={Box} />
            <ToolButton icon={Type} />
            <ToolButton icon={Grid3X3} />
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-md border border-white/5">
             <span className="text-[10px] font-mono text-muted-foreground uppercase">Zoom</span>
             <span className="text-[10px] font-mono text-primary font-bold">{Math.round(zoom * 100)}%</span>
          </div>
          <div className="h-6 w-px bg-white/5" />
          <ExportPanel elements={elements} />
          <Button size="sm" className="h-8 bg-primary hover:bg-primary/90 glow-primary">
            <Share2 className="mr-2 h-3.5 w-3.5" /> Publish
          </Button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Navigation & Layers */}
        <aside className="w-64 border-r border-white/5 bg-[#0C0F1D] flex flex-col z-[100]">
          <div className="flex h-10 border-b border-white/5">
            <SideTab label="Layers" active={activeTab === 'layers'} onClick={() => setActiveTab('layers')} icon={Layers} />
            <SideTab label="Assets" active={activeTab === 'assets'} onClick={() => setActiveTab('assets')} icon={Box} />
            <SideTab label="AI" active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} icon={Sparkles} />
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-4">
              {activeTab === 'layers' && (
                <div className="space-y-1">
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
                <div className="space-y-4 pt-2">
                   <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
                      <div className="flex items-center gap-2 text-primary">
                         <Command className="h-3 w-3" />
                         <span className="text-[10px] font-bold uppercase tracking-widest">AI Command Panel</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">Execute transformações globais no seu layout usando linguagem natural.</p>
                      <input 
                        type="text" 
                        placeholder="Ex: 'Torne o tema Dark Blue'" 
                        className="w-full bg-black/40 border border-white/10 rounded-md p-2 text-[11px] focus:ring-1 focus:ring-primary outline-none"
                      />
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-[9px] font-bold uppercase text-muted-foreground/40 px-1">Presets Rápidos</h4>
                      <Button variant="outline" className="w-full justify-start h-8 text-[10px] border-white/5 hover:bg-white/5">
                        <Maximize className="mr-2 h-3 w-3" /> Redimensionar para Mobile
                      </Button>
                      <Button variant="outline" className="w-full justify-start h-8 text-[10px] border-white/5 hover:bg-white/5">
                        <Settings2 className="mr-2 h-3 w-3" /> Ajustar Constraints
                      </Button>
                   </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </aside>

        {/* Center: Infinite Canvas */}
        <div className="flex-1 relative bg-[#03040B] shadow-inner">
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

          {/* Floating Canvas Controls */}
          <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-[#0C0F1D]/60 backdrop-blur-md p-1 rounded-lg border border-white/5">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setZoom(prev => prev * 0.9)}>-</Button>
            <span className="text-[10px] font-mono w-10 text-center">{Math.round(zoom * 100)}%</span>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setZoom(prev => prev * 1.1)}>+</Button>
          </div>
        </div>

        {/* Right Side: Properties Inspector */}
        <PropertiesPanel selectedElement={selectedElement} onUpdate={updateElement} />
      </main>

      {/* Footer Info */}
      <footer className="h-6 border-t border-white/5 bg-[#0C0F1D] flex items-center justify-between px-4 text-[9px] text-muted-foreground/50 font-mono">
        <div className="flex gap-4">
          <span>{elements.length} LAYERS</span>
          <span>STABLE_REVISION_642</span>
        </div>
        <span>RENDER_ENGINE: VECTOR_CORE_X</span>
      </footer>
    </div>
  );
}

function ToolButton({ icon: Icon, active = false }: { icon: any, active?: boolean }) {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={cn("h-8 w-8 rounded-md", active ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-white/5")}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}

function SideTab({ label, icon: Icon, active, onClick }: { label: string, icon: any, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all border-b-2",
        active ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground hover:bg-white/5"
      )}
    >
      <Icon className="h-3 w-3" /> {label}
    </button>
  );
}

function LayerItem({ element, selected, onClick }: { element: UIElement, selected: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer group transition-all",
        selected ? "bg-primary text-white" : "hover:bg-white/5 text-muted-foreground"
      )}
    >
      <Box className={cn("h-3 w-3", selected ? "text-white" : "text-primary/40")} />
      <span className="text-[10px] font-medium truncate flex-1">{element.name}</span>
      <Settings2 className="h-3 w-3 opacity-0 group-hover:opacity-40 transition-opacity" />
    </div>
  );
}
