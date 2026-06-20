"use client";

import { useState } from 'react';
import { UIElement, TEMPLATES } from '@/lib/layout-templates';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Plus, Move, Layout, X, Settings2, Box, Layers as LayersIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface EditorToolbarProps {
  selectedElement: UIElement | null;
  onUpdate: (id: string, updates: Partial<UIElement>) => void;
  onDelete: (id: string) => void;
  onAdd: (template: UIElement) => void;
  onClose: () => void;
}

export function EditorToolbar({ selectedElement, onUpdate, onDelete, onAdd, onClose }: EditorToolbarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={cn(
      "fixed top-24 right-8 transition-all duration-500 ease-out z-[90]",
      isOpen ? "w-80" : "w-14"
    )}>
      <div className="bg-card/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-[70vh]">
        {/* Header/Toggle */}
        <div className="p-4 flex items-center justify-between border-b border-white/5">
          {isOpen ? (
            <>
              <h2 className="text-[10px] font-headline uppercase tracking-[0.3em] text-primary flex items-center">
                <Settings2 className="mr-2 h-3 w-3" /> Designer
              </h2>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setIsOpen(false)}>
                <X className="h-3 w-3" />
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="icon" className="h-6 w-6 mx-auto" onClick={() => setIsOpen(true)}>
              <Settings2 className="h-4 w-4 text-primary" />
            </Button>
          )}
        </div>

        {isOpen && (
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-8 animate-in fade-in duration-300">
              {/* Asset Library */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Box className="h-3 w-3" />
                  <h3 className="text-[10px] font-bold uppercase tracking-widest">Library</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(TEMPLATES).map(([key, tpl]) => (
                    <Button 
                      key={key} 
                      variant="outline" 
                      size="sm" 
                      className="flex flex-col h-auto py-3 space-y-1 bg-white/[0.02] border-white/5 hover:border-primary/50 hover:bg-primary/5 transition-all"
                      onClick={() => onAdd(tpl)}
                    >
                      <Plus className="h-3 w-3 text-primary" />
                      <span className="text-[9px] uppercase font-bold tracking-tighter">{tpl.name}</span>
                    </Button>
                  ))}
                </div>
              </section>

              <Separator className="bg-white/5" />

              {/* Properties */}
              {selectedElement ? (
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary">
                      <LayersIcon className="h-3 w-3" />
                      <h3 className="text-[10px] font-bold uppercase tracking-widest">Properties</h3>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-destructive/50 hover:text-destructive hover:bg-destructive/10"
                      onClick={() => onDelete(selectedElement.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Layer Name</Label>
                      <Input 
                        value={selectedElement.name} 
                        onChange={(e) => onUpdate(selectedElement.id, { name: e.target.value })}
                        className="h-8 text-xs bg-white/[0.03] border-white/10"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Pos X</Label>
                        <Input 
                          type="number" 
                          value={selectedElement.x} 
                          onChange={(e) => onUpdate(selectedElement.id, { x: Number(e.target.value) })}
                          className="h-8 text-xs bg-white/[0.03] border-white/10 font-mono"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Pos Y</Label>
                        <Input 
                          type="number" 
                          value={selectedElement.y} 
                          onChange={(e) => onUpdate(selectedElement.id, { y: Number(e.target.value) })}
                          className="h-8 text-xs bg-white/[0.03] border-white/10 font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Color / HEX</Label>
                      <div className="flex gap-2">
                        <div 
                          className="w-8 h-8 rounded-lg border border-white/10 shadow-inner" 
                          style={{ backgroundColor: selectedElement.fill }}
                        />
                        <Input 
                          value={selectedElement.fill} 
                          onChange={(e) => onUpdate(selectedElement.id, { fill: e.target.value })}
                          className="h-8 text-xs bg-white/[0.03] border-white/10 font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Opacity</Label>
                        <span className="text-[10px] font-mono text-primary">{Math.round(selectedElement.opacity * 100)}%</span>
                      </div>
                      <Slider 
                        value={[selectedElement.opacity * 100]} 
                        min={0} 
                        max={100} 
                        step={1}
                        onValueChange={(v) => onUpdate(selectedElement.id, { opacity: v[0] / 100 })}
                        className="py-2"
                      />
                    </div>

                    {selectedElement.type === 'text' && (
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Content</Label>
                        <Input 
                          value={selectedElement.text} 
                          onChange={(e) => onUpdate(selectedElement.id, { text: e.target.value })}
                          className="h-8 text-xs bg-white/[0.03] border-white/10"
                        />
                      </div>
                    )}
                  </div>
                </section>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center opacity-20">
                  <Move className="h-8 w-8 mb-3" />
                  <p className="text-[10px] uppercase tracking-widest font-medium">Select an element<br/>to edit</p>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}