import { UIElement } from '@/lib/layout-templates';

/**
 * @fileOverview Gerador de manifesto JSON para Adobe After Effects (Rigorously Structured).
 */

export function generateAEJson(elements: UIElement[]) {
  const layers: any[] = [];
  
  const flattenElements = (els: UIElement[], parentId = 'null') => {
    els.forEach(el => {
      const layer = {
        id: el.id,
        name: el.name || `${el.category}_${el.id}`,
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
        border_radius: el.rx || (el.type === 'pill' ? el.height / 2 : 0),
        content: el.text || '',
        typography: el.type === 'text' ? {
          font_family: el.fontFamily || 'Inter',
          font_size: `${el.fontSize}px`,
          font_weight: el.fontWeight || '400',
          text_align: el.textAlign || 'left',
          color: el.fill
        } : null,
        animation_hint: el.animationHint || {
          suggested_animation: 'fade',
          duration_ms: 300,
          easing: 'ease-out'
        }
      };
      layers.push(layer);
      if (el.children) flattenElements(el.children, el.id);
    });
  };

  flattenElements(elements);

  const manifest = {
    metadata: {
      layout_type: "AI Interface Studio",
      color_palette: {
        primary: ["#FFFFFF", "#3B82F6"],
        neutrals: ["#000000", "#121212"],
        accents: ["#FF6B00"]
      },
      typography: {
        primary_font: "Inter",
        sizes: ["11px", "13px", "14px", "16px", "18px", "64px"]
      },
      dimensions: { width: 1280, height: 720 },
      viewport: "Desktop",
      grid_system: "Flexbox-inspired coordinate mapping"
    },
    layers: layers,
    export_instructions: {
      format: "JSON + Layered SVG",
      color_space: "RGB",
      resolution: "4K Ready",
      layers_structure: "Hierarchical naming convention [Category]_[Component]_[Descriptor]",
      notes: "Import using AE Layered Importer Script. Check 'Create Shapes from Vector Layer' for all shape layers."
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
