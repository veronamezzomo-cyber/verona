"use client";

import { Button } from '@/components/ui/button';
import { FileType, Layers, Database } from 'lucide-react';
import { exportSVG } from '@/services/export-svg-grouped';
import { exportAEJson } from '@/services/export-ae-json';
import { UIElement } from '@/lib/layout-templates';

interface ExportPanelProps {
  elements: UIElement[];
}

export function ExportPanel({ elements }: ExportPanelProps) {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm"
        className="font-headline tracking-widest uppercase border-white/10 bg-white/5 hover:bg-primary/10 hover:border-primary/50 text-[10px] px-4"
        onClick={() => exportSVG(elements)}
      >
        <FileType className="mr-2 h-3.5 w-3.5" /> SVG
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        className="font-headline tracking-widest uppercase border-white/10 bg-white/5 hover:bg-secondary/10 hover:border-secondary/50 text-[10px] px-4"
        onClick={() => exportAEJson(elements)}
      >
        <Database className="mr-2 h-3.5 w-3.5" /> AE JSON
      </Button>
      <Button 
        size="sm"
        className="font-headline tracking-widest uppercase bg-secondary hover:bg-secondary/90 glow-secondary text-[10px] px-4"
        onClick={() => {
          alert("Export Engine: Processing Layered PDF...");
          exportSVG(elements, 'forge-layout-export.svg');
        }}
      >
        <Layers className="mr-2 h-3.5 w-3.5" /> PDF
      </Button>
    </div>
  );
}
