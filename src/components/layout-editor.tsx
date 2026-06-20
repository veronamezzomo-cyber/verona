
"use client";

/**
 * @fileOverview Engine de renderização vetorial 100% Estática.
 * Focada em Motion Design e exportação profissional.
 * Inclui ViewBox explícita para escalabilidade absoluta.
 */

import { UIElement } from '@/lib/layout-templates';
import { cn } from '@/lib/utils';
import React, { useRef } from 'react';

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

  const defsContent: JSX.Element[] = [];
  
  const collectDefs = (els: UIElement[]) => {
    els.forEach(el => {
      const idSafe = el.id.replace(/\s+/g, '_');
      
      // Shadows
      if (el.shadow) {
        const [dx, dy, blur, ...colorParts] = el.shadow.split(' ');
        const color = colorParts.join(' ');
        defsContent.push(
          <filter id={`shadow-${idSafe}`} key={`shadow-${idSafe}`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx={dx} dy={dy} stdDeviation={parseFloat(blur) / 2} floodColor={color} />
          </filter>
        );
      }
      
      // Blurs
      if (el.blur) {
        defsContent.push(
          <filter id={`blur-${idSafe}`} key={`blur-${idSafe}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={el.blur} />
          </filter>
        );
      }
      
      if (el.children) collectDefs(el.children);
    });
  };
  collectDefs(elements);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-black selection:bg-transparent"
      onWheel={handleWheel}
      onClick={() => onSelect(null)}
    >
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: '0 0' }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1280 720"
      >
        <defs>
          {defsContent}
        </defs>

        {elements.map((el) => (
          <g 
            key={el.id}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(el.id, e.shiftKey);
            }}
            className="pointer-events-auto"
          >
            {renderElementPreview(el, selectedIds.includes(el.id))}
          </g>
        ))}
      </svg>
    </div>
  );
}

function renderElementPreview(el: UIElement, isSelected: boolean) {
  if (!el.visible) return null;

  const idSafe = el.id.replace(/\s+/g, '_');
  const selectionProps = isSelected ? { stroke: '#3B82F6', strokeWidth: 2 } : {};
  
  // Resolve Filters/Masks/ClipPaths
  const filterUrl = el.shadow ? `url(#shadow-${idSafe})` : el.blur ? `url(#blur-${idSafe})` : undefined;
  const clipPathUrl = el.clipPathId ? `url(#${el.clipPathId})` : undefined;
  const maskUrl = el.maskId ? `url(#${el.maskId})` : undefined;

  switch (el.type) {
    case 'rect':
    case 'pill':
    case 'capsule': {
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
          filter={filterUrl}
          clipPath={clipPathUrl}
          mask={maskUrl}
          stroke={el.stroke || (isSelected ? selectionProps.stroke : undefined)}
          strokeWidth={el.strokeWidth || (isSelected ? selectionProps.strokeWidth : undefined)}
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
          filter={filterUrl}
          clipPath={clipPathUrl}
          mask={maskUrl}
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
          filter={filterUrl}
          clipPath={clipPathUrl}
          mask={maskUrl}
          stroke={el.stroke || (isSelected ? selectionProps.stroke : undefined)}
          strokeWidth={el.strokeWidth || (isSelected ? selectionProps.strokeWidth : undefined)}
        />
      );
    }
    case 'path':
      return (
        <path
          key={el.id}
          d={el.pathData || ''}
          fill={el.fill}
          stroke={el.stroke || (isSelected ? selectionProps.stroke : undefined)}
          strokeWidth={el.strokeWidth || (isSelected ? selectionProps.strokeWidth : undefined)}
          strokeLinecap={el.strokeLinecap}
          opacity={el.opacity}
          filter={filterUrl}
          clipPath={clipPathUrl}
          mask={maskUrl}
          transform={`translate(${el.x}, ${el.y}) rotate(${el.rotation || 0})`}
        />
      );
    case 'group':
      return (
        <g 
          key={el.id} 
          transform={`translate(${el.x}, ${el.y}) rotate(${el.rotation || 0})`}
          filter={filterUrl}
          clipPath={clipPathUrl}
          mask={maskUrl}
        >
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
