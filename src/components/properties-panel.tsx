"use client";

/**
 * @fileOverview Painel de Propriedades Profissional (Inspetor Contextual).
 */

import { UIElement } from '@/lib/layout-templates';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Box, Layers, MousePointer2, Type, LayoutGrid, Palette, Target } from 'lucide-react';

interface PropertiesPanelProps {
  selectedElement: UIElement | null;
  onUpdate: (id: string, updates: Partial<UIElement>) => void;
}

export function PropertiesPanel({ selectedElement, onUpdate }: PropertiesPanelProps) {
  if (!selectedElement) {
    return (
      <div className="w-72 h-full border-l border-white/5 bg-[#0C0F1D] flex flex-col items-center justify-center p-8 text-center text-muted-foreground/30">
        <MousePointer2 className="h-12 w-12 mb-4" />
        <p className="text-xs uppercase tracking-widest font-bold">Select an object to inspect</p>
      </div>
    );
  }

  return (
    <div className="w-80 h-full border-l border-white/5 bg-[#0C0F1D] flex flex-col z-[100]">
      <div className="p-4 border-b border-white/5 flex items-center gap-2">
        <Target className="h-4 w-4 text-primary" />
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Inspector</h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-5 space-y-8 pb-20">
          {/* Layout Geometry */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary/60">
              <LayoutGrid className="h-3 w-3" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest">Geometry</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[9px] uppercase tracking-tighter text-muted-foreground">X Pos</Label>
                <Input type="number" value={selectedElement.x} onChange={e => onUpdate(selectedElement.id, { x: +e.target.value })} className="h-7 text-[10px] bg-white/[0.02] font-mono" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[9px] uppercase tracking-tighter text-muted-foreground">Y Pos</Label>
                <Input type="number" value={selectedElement.y} onChange={e => onUpdate(selectedElement.id, { y: +e.target.value })} className="h-7 text-[10px] bg-white/[0.02] font-mono" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[9px] uppercase tracking-tighter text-muted-foreground">Width</Label>
                <Input type="number" value={selectedElement.width} onChange={e => onUpdate(selectedElement.id, { width: +e.target.value })} className="h-7 text-[10px] bg-white/[0.02] font-mono" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[9px] uppercase tracking-tighter text-muted-foreground">Height</Label>
                <Input type="number" value={selectedElement.height} onChange={e => onUpdate(selectedElement.id, { height: +e.target.value })} className="h-7 text-[10px] bg-white/[0.02] font-mono" />
              </div>
            </div>
          </section>

          <Separator className="bg-white/5" />

          {/* Typography */}
          {selectedElement.type === 'text' && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-primary/60">
                <Type className="h-3 w-3" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest">Typography</h3>
              </div>
              <div className="space-y-3">
                <div className="space-y-1.5">
                   <Label className="text-[9px] uppercase tracking-tighter text-muted-foreground">Content</Label>
                   <Input value={selectedElement.text} onChange={e => onUpdate(selectedElement.id, { text: e.target.value })} className="h-7 text-[11px] bg-white/[0.02]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-[9px] uppercase tracking-tighter text-muted-foreground">Size</Label>
                    <Input type="number" value={selectedElement.fontSize} onChange={e => onUpdate(selectedElement.id, { fontSize: +e.target.value })} className="h-7 text-[10px] bg-white/[0.02] font-mono" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[9px] uppercase tracking-tighter text-muted-foreground">Weight</Label>
                    <Input value={selectedElement.fontWeight || '400'} onChange={e => onUpdate(selectedElement.id, { fontWeight: e.target.value })} className="h-7 text-[10px] bg-white/[0.02] font-mono" />
                  </div>
                </div>
              </div>
            </section>
          )}

          <Separator className="bg-white/5" />

          {/* Fill & Stroke */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary/60">
              <Palette className="h-3 w-3" />
              <h3 className="text-[10px] font-bold uppercase tracking-widest">Appearence</h3>
            </div>
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border border-white/10" style={{ backgroundColor: selectedElement.fill }} />
                    <Input value={selectedElement.fill} onChange={e => onUpdate(selectedElement.id, { fill: e.target.value })} className="h-7 w-24 text-[10px] bg-white/[0.02] font-mono" />
                  </div>
                  <span className="text-[9px] font-mono text-muted-foreground/50">FILL</span>
               </div>
               
               <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-[9px] uppercase text-muted-foreground">Opacity</Label>
                    <span className="text-[10px] font-mono text-primary">{Math.round(selectedElement.opacity * 100)}%</span>
                  </div>
                  <Slider value={[selectedElement.opacity * 100]} min={0} max={100} step={1} onValueChange={v => onUpdate(selectedElement.id, { opacity: v[0] / 100 })} />
               </div>

               <div className="space-y-1.5">
                  <Label className="text-[9px] uppercase text-muted-foreground">Radius</Label>
                  <Input type="number" value={selectedElement.rx || 0} onChange={e => onUpdate(selectedElement.id, { rx: +e.target.value, ry: +e.target.value })} className="h-7 text-[10px] bg-white/[0.02] font-mono" />
               </div>
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
}
