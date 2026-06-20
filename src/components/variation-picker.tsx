"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface VariationPickerProps {
  variations: string[];
  onSelect: (variation: string) => void;
}

export function VariationPicker({ variations, onSelect }: VariationPickerProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleSelect = (idx: number, svg: string) => {
    setSelectedIndex(idx);
    onSelect(svg);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {variations.map((svg, idx) => (
        <Card 
          key={idx} 
          className={cn(
            "group relative overflow-hidden bg-white/[0.02] transition-all cursor-pointer p-2 aspect-video flex flex-col items-center justify-center border-2",
            selectedIndex === idx 
              ? "border-primary neon-border-primary scale-[1.02]" 
              : "border-white/5 hover:border-white/20"
          )}
          onClick={() => handleSelect(idx, svg)}
        >
          <div 
            className={cn(
              "w-full h-full pointer-events-none transition-opacity duration-500",
              selectedIndex === idx ? "opacity-100" : "opacity-40 group-hover:opacity-60"
            )}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
          
          {selectedIndex === idx && (
            <div className="absolute top-3 right-3 bg-primary p-1 rounded-full glow-primary animate-in zoom-in-50 duration-300">
              <Check className="h-3 w-3 text-white" />
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </Card>
      ))}
    </div>
  );
}