import { UIElement } from '@/lib/layout-templates';

/**
 * @fileOverview Gerador de manifesto JSON para Adobe After Effects.
 */

export function generateAEJson(elements: UIElement[]) {
  const layers: any[] = [];
  
  const flattenElements = (els: UIElement[], parentId = 'null') => {
    els.forEach(el => {
      const layer = {
        id: el.id,
        name: `${el.category}_${el.name}_Static`,
        type: el.type === 'group' ? 'Group' : el.type === 'text' ? 'Text' : 'Shape',
        category: el.category,
        position: { x: el.x, y: el.y },
        dimensions: { width: el.width, height: el.height },
        fill: {
          type: 'solid',
          color: el.fill,
          opacity: el.opacity * 100
        },
        stroke: el.stroke ? {
          color: el.stroke,
          width: el.strokeWidth || 0,
          type: 'solid'
        } : null,
        border_radius: el.rx || 0,
        content: el.text || '',
        typography: el.type === 'text' ? {
          font_family: el.fontFamily || 'Inter',
          font_size: `${el.fontSize}px`,
          font_weight: el.fontWeight || '400',
          text_align: el.textAlign || 'left',
          color: el.fill
        } : null,
        animation_hint: el.animationHint || null
      };
      layers.push(layer);
      if (el.children) flattenElements(el.children, el.id);
    });
  };

  flattenElements(elements);

  const manifest = {
    metadata: {
      layout_type: "Vector UI Studio Layout",
      color_palette: {
        primary: ["#FFFFFF", "#3B82F6"],
        neutrals: ["#000000", "#121212"]
      },
      dimensions: { width: 1280, height: 720 },
      viewport: "Desktop"
    },
    layers: layers,
    animation_hints: layers.filter(l => l.animation_hint).map(l => ({
      layer_id: l.id,
      ...l.animation_hint
    })),
    export_instructions: {
      format: "JSON + Layered SVG",
      color_space: "RGB",
      resolution: "4K Ready",
      notes: "Import using AE Layered Importer Script"
    }
  };

  return JSON.stringify(manifest, null, 2);
}

export async function exportAEJson(elements: UIElement[], filename = 'ae-layout-manifest.json') {
  const jsonContent = generateAEJson(elements);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
