"use client";

/**
 * @fileOverview Engine de renderização vetorial profissional com Zoom e Pan.
 */

import { UIElement } from '@/lib/layout-templates';
import { cn } from '@/lib/utils';
import React, { useRef, useEffect } from 'react';

interface LayoutEditorProps {
  elements: UIElement[];
  selectedIds: string[];
  zoom: number;
  pan: { x: number; y: number };
  onSelect: (id: string | null, multi?: boolean) => void;
  onUpdate: (id: string, updates: Partial<UIElement>) => void;
  onPan: (x: number, y: number) => void;
  onZoom: (delta: number) => void;
}

export function LayoutEditor({ 
  elements, 
  selectedIds, 
  zoom, 
  pan, 
  onSelect, 
  onUpdate,
  onPan,
  onZoom 
}: LayoutEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      onZoom(e.deltaY > 0 ? 0.9 : 1.1);
    } else {
      onPan(pan.x - e.deltaX, pan.y - e.deltaY);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-[#03040B] cursor-crosshair selection:bg-transparent"
      onWheel={handleWheel}
      onClick={() => onSelect(null)}
    >
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: `${32 * zoom}px ${32 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`
        }}
      />

      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: '0 0' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="shadow-professional">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3" />
          </filter>
        </defs>

        {elements.map((el) => (
          <g 
            key={el.id}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(el.id, e.shiftKey);
            }}
            className={cn(
              "cursor-pointer pointer-events-auto",
              selectedIds.includes(el.id) && "filter-[url(#shadow-professional)]"
            )}
          >
            {renderElementPreview(el, selectedIds.includes(el.id))}
          </g>
        ))}
      </svg>

      {/* Rulers Placeholder */}
      <div className="absolute top-0 left-0 w-full h-4 bg-black/40 border-b border-white/5 z-20" />
      <div className="absolute top-0 left-0 w-4 h-full bg-black/40 border-r border-white/5 z-20" />
    </div>
  );
}

function renderElementPreview(el: UIElement, isSelected: boolean) {
  if (!el.visible) return null;

  const selectionProps = isSelected ? { stroke: '#3B82F6', strokeWidth: 2 } : {};

  switch (el.type) {
    case 'rect':
    case 'pill':
    case 'capsule': {
      // Regra de Geometria para Pills e Capsules
      const isPill = el.type === 'pill' || el.type === 'capsule';
      const radius = isPill ? el.height / 2 : (el.rx || 0);
      
      return (
        <rect
          key={el.id}
          x={el.x}
          y={el.y}
          width={el.width}
          height={el.height}
          fill={el.fill}
          opacity={el.opacity}
          rx={radius}
          ry={radius}
          stroke={el.stroke || selectionProps.stroke}
          strokeWidth={el.strokeWidth || selectionProps.strokeWidth}
          transform={`rotate(${el.rotation || 0}, ${el.x + el.width/2}, ${el.y + el.height/2})`}
        />
      );
    }
    case 'text':
      return (
        <text
          key={el.id}
          x={el.x}
          y={el.y}
          fill={el.fill}
          fontSize={el.fontSize}
          fontWeight={el.fontWeight}
          fontFamily={el.fontFamily || 'Inter'}
          textAnchor={el.textAlign === 'center' ? 'middle' : el.textAlign === 'right' ? 'end' : 'start'}
          opacity={el.opacity}
          transform={`rotate(${el.rotation || 0}, ${el.x}, ${el.y})`}
        >
          {el.text}
        </text>
      );
    case 'circle': {
      const r = el.width / 2;
      return (
        <circle
          key={el.id}
          cx={el.x + r}
          cy={el.y + r}
          r={r}
          fill={el.fill}
          opacity={el.opacity}
          stroke={el.stroke || selectionProps.stroke}
          strokeWidth={el.strokeWidth || selectionProps.strokeWidth}
        />
      );
    }
    case 'path':
      return (
        <path
          key={el.id}
          d={el.pathData || ''}
          fill={el.fill}
          stroke={el.stroke || selectionProps.stroke}
          strokeWidth={el.strokeWidth || selectionProps.strokeWidth}
          opacity={el.opacity}
          transform={`translate(${el.x}, ${el.y}) rotate(${el.rotation || 0})`}
        />
      );
    case 'group':
      return (
        <g key={el.id} transform={`translate(${el.x}, ${el.y}) rotate(${el.rotation || 0})`}>
          {el.children?.map(child => renderElementPreview(child, false))}
          {isSelected && (
             <rect 
                key={`${el.id}-outline`}
                x={-4} y={-4} 
                width={el.width + 8} height={el.height + 8} 
                fill="transparent" 
                stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 2" 
             />
          )}
        </g>
      );
    default:
      return null;
  }
}
