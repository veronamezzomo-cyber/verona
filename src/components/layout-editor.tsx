"use client";

import { UIElement } from '@/lib/layout-templates';
import { cn } from '@/lib/utils';

interface LayoutEditorProps {
  elements: UIElement[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, updates: Partial<UIElement>) => void;
}

export function LayoutEditor({ elements, selectedId, onSelect, onUpdate }: LayoutEditorProps) {
  const handleDrag = (e: React.MouseEvent, id: string) => {
    // Basic drag-and-drop orchestration could be implemented here
    // For this prototype, we'll rely on property panel controls to maintain robustness
  };

  return (
    <div 
      className="canvas-container w-full aspect-video max-w-5xl mx-auto border border-border rounded-xl shadow-2xl relative overflow-hidden bg-[#0A0E27]"
      onClick={() => onSelect(null)}
    >
      <svg 
        viewBox="0 0 1280 720" 
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="selection-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {elements.map((el) => (
          <g 
            key={el.id}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(el.id);
            }}
            className={cn(
              "cursor-pointer transition-all duration-300",
              selectedId === el.id && "filter-[url(#selection-glow)]"
            )}
          >
            {renderElementPreview(el, selectedId === el.id)}
          </g>
        ))}
      </svg>
    </div>
  );
}

function renderElementPreview(el: UIElement, isSelected: boolean) {
  const selectionProps = isSelected ? { stroke: '#3B82F6', strokeWidth: 2 } : {};

  switch (el.type) {
    case 'rect':
      return (
        <rect
          x={el.x}
          y={el.y}
          width={el.width}
          height={el.height}
          fill={el.fill}
          opacity={el.opacity}
          rx={el.rx}
          ry={el.ry}
          {...selectionProps}
        />
      );
    case 'text':
      return (
        <text
          x={el.x}
          y={el.y}
          fill={el.fill}
          fontSize={el.fontSize}
          fontFamily="Inter"
          textAnchor="middle"
          opacity={el.opacity}
          className="font-medium"
        >
          {el.text}
        </text>
      );
    case 'group':
      return (
        <g transform={`translate(${el.x}, ${el.y})`}>
          {el.children?.map(child => renderElementPreview(child, false))}
          {isSelected && (
             <rect 
                x={-5} y={-5} 
                width={el.width + 10} height={el.height + 10} 
                fill="transparent" 
                stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" 
             />
          )}
        </g>
      );
    default:
      return null;
  }
}
