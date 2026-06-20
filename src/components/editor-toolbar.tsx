"use client";

import { UIElement, TEMPLATES } from '@/lib/layout-templates';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Plus, Move, Layout, Type, Square } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface EditorToolbarProps {
  selectedElement: UIElement | null;
  onUpdate: (id: string, updates: Partial<UIElement>) => void;
  onDelete: (id: string) => void;
  onAdd: (template: UIElement) => void;
}

export function EditorToolbar({ selectedElement, onUpdate, onDelete, onAdd }: EditorToolbarProps) {
  return (
    <div className="w-80 h-full border-l border-border bg-card/30 flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="font-headline text-lg uppercase tracking-tight flex items-center">
          <Layout className="mr-2 h-5 w-5 text-primary" /> Assets & Properties
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          {/* Asset Library */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Components</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(TEMPLATES).map(([key, tpl]) => (
                <Button 
                  key={key} 
                  variant="outline" 
                  size="sm" 
                  className="flex flex-col h-auto py-3 space-y-1"
                  onClick={() => onAdd(tpl)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-[10px] uppercase font-bold">{tpl.name}</span>
                </Button>
              ))}
            </div>
          </section>

          <Separator />

          {/* Properties */}
          {selectedElement ? (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Properties</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-destructive"
                  onClick={() => onDelete(selectedElement.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs">Element Name</Label>
                  <Input 
                    value={selectedElement.name} 
                    onChange={(e) => onUpdate(selectedElement.id, { name: e.target.value })}
                    className="h-8"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Position X</Label>
                    <Input 
                      type="number" 
                      value={selectedElement.x} 
                      onChange={(e) => onUpdate(selectedElement.id, { x: Number(e.target.value) })}
                      className="h-8"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Position Y</Label>
                    <Input 
                      type="number" 
                      value={selectedElement.y} 
                      onChange={(e) => onUpdate(selectedElement.id, { y: Number(e.target.value) })}
                      className="h-8"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Color (Hex)</Label>
                  <div className="flex gap-2">
                    <div 
                      className="w-8 h-8 rounded border border-border" 
                      style={{ backgroundColor: selectedElement.fill }}
                    />
                    <Input 
                      value={selectedElement.fill} 
                      onChange={(e) => onUpdate(selectedElement.id, { fill: e.target.value })}
                      className="h-8"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs">Opacity</Label>
                    <span className="text-xs font-mono">{Math.round(selectedElement.opacity * 100)}%</span>
                  </div>
                  <Slider 
                    value={[selectedElement.opacity * 100]} 
                    min={0} 
                    max={100} 
                    step={1}
                    onValueChange={(v) => onUpdate(selectedElement.id, { opacity: v[0] / 100 })}
                  />
                </div>

                {selectedElement.type === 'text' && (
                  <div className="space-y-2">
                    <Label className="text-xs">Text Content</Label>
                    <Input 
                      value={selectedElement.text} 
                      onChange={(e) => onUpdate(selectedElement.id, { text: e.target.value })}
                      className="h-8"
                    />
                  </div>
                )}
              </div>
            </section>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
              <Move className="h-10 w-10 mb-4" />
              <p className="text-sm font-medium">Select an element to<br/>modify properties</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
