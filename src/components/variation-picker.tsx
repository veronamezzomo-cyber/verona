"use client";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface VariationPickerProps {
  variations: string[];
  onSelect: (variation: string) => void;
}

export function VariationPicker({ variations, onSelect }: VariationPickerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {variations.map((svg, idx) => (
        <Card 
          key={idx} 
          className="group relative overflow-hidden bg-card/50 border-border/50 hover:border-primary/50 transition-all cursor-pointer p-4 aspect-video flex flex-col items-center justify-center"
          onClick={() => onSelect(svg)}
        >
          <div 
            className="w-full h-full pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button size="lg" className="rounded-full font-headline">
              <Check className="mr-2 h-5 w-5" /> Select Variation {idx + 1}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
