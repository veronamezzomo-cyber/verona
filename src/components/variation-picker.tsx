"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { UIElement } from '@/lib/layout-templates';

interface VariationPickerProps {
  variations: UIElement[][];
  onSelect: (variation: UIElement[]) => void;
}

export function VariationPicker({ variations, onSelect }: VariationPickerProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleSelect = (idx: number, elements: UIElement[]) => {
    setSelectedIndex(idx);
    onSelect(elements);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {variations.map((elements, idx) => (
        <Card 
          key={idx} 
          className={cn(
            "group relative overflow-hidden bg-white/[0.02] transition-all cursor-pointer p-4 aspect-video flex flex-col items-center justify-center border-2",
            selectedIndex === idx 
              ? "border-primary neon-border-primary scale-[1.02]" 
              : "border-white/5 hover:border-white/20"
          )}
          onClick={() => handleSelect(idx, elements)}
        >
          <div className={cn(
            "w-full h-full pointer-events-none transition-opacity duration-500",
            selectedIndex === idx ? "opacity-100" : "opacity-40 group-hover:opacity-60"
          )}>
            <svg viewBox="0 0 1280 720" className="w-full h-full">
               <rect width="100%" height="100%" fill="#0A0E27" rx="8" ry="8" />
               {elements.map(el => renderMiniElement(el))}
            </svg>
          </div>
          
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

function renderMiniElement(el: UIElement) {
  switch (el.type) {
    case 'rect':
      return <rect key={el.id} x={el.x} y={el.y} width={el.width} height={el.height} fill={el.fill} opacity={el.opacity} rx={el.rx} ry={el.ry} stroke={el.stroke} strokeWidth={el.strokeWidth} />;
    case 'circle':
      return <circle key={el.id} cx={el.x + el.width/2} cy={el.y + el.height/2} r={el.width/2} fill={el.fill} opacity={el.opacity} />;
    case 'text':
      return <text key={el.id} x={el.x} y={el.y} fill={el.fill} fontSize={el.fontSize} opacity={el.opacity} textAnchor="middle">{el.text}</text>;
    case 'group':
      return <g key={el.id} transform={`translate(${el.x}, ${el.y})`}>{el.children?.map(c => renderMiniElement(c))}</g>;
    default: return null;
  }
}
