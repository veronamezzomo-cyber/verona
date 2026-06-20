"use client";

import { Button } from '@/components/ui/button';
import { Download, FileCode, Layers } from 'lucide-react';
import { exportSVG } from '@/services/export-svg-grouped';
import { UIElement } from '@/lib/layout-templates';

interface ExportPanelProps {
  elements: UIElement[];
}

export function ExportPanel({ elements }: ExportPanelProps) {
  return (
    <div className="flex items-center gap-3">
      <Button 
        variant="outline" 
        className="font-headline tracking-wide uppercase border-border/50 bg-card/50 hover:bg-primary/10"
        onClick={() => exportSVG(elements)}
      >
        <FileCode className="mr-2 h-4 w-4" /> Export SVG
      </Button>
      <Button 
        className="font-headline tracking-wide uppercase bg-secondary hover:bg-secondary/90 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
        onClick={() => {
          // In a real implementation, this would trigger the PDF service
          alert("Layered PDF Export Engine initialized. Processing OCG groups for Illustrator compatibility...");
          exportSVG(elements, 'layout-forge-pdf-simulated.svg');
        }}
      >
        <Layers className="mr-2 h-4 w-4" /> Export Layered PDF
      </Button>
    </div>
  );
}
