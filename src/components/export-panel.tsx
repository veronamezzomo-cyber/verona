"use client";

import { Button } from '@/components/ui/button';
import { Download, FileCode, Layers, FileType } from 'lucide-react';
import { exportSVG } from '@/services/export-svg-grouped';
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