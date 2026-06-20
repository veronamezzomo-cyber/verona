import { UIElement } from './layout-templates';

/**
 * Gerador de SVG Profissional para Adobe Illustrator / After Effects.
 * Otimizado com metadados para importação hierárquica.
 */
export function buildSVG(elements: UIElement[], viewBox = '0 0 1280 720'): string {
  const filters: string[] = [];
  
  const collectFiltersSVG = (els: UIElement[]) => {
    els.forEach(el => {
      const idSafe = el.id.replace(/\s+/g, '_');
      if (el.shadow) {
        const [dx, dy, blur, ...colorParts] = el.shadow.split(' ');
        const color = colorParts.join(' ');
        filters.push(`
    <filter id="shadow-${idSafe}" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="${dx}" dy="${dy}" stdDeviation="${parseFloat(blur) / 2}" flood-color="${color}" />
    </filter>`);
      }
      if (el.blur) {
        filters.push(`
    <filter id="blur-${idSafe}" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="${el.blur}" />
    </filter>`);
      }
      if (el.children) collectFiltersSVG(el.children);
    });
  };
  collectFiltersSVG(elements);

  const backgroundRect = `<rect id="Viewport_Background" width="100%" height="100%" fill="#000000" data-name="Background" />`;
  
  const elementsSVG = elements.map(el => renderElement(el)).join('\n  ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <style type="text/css">
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap');
    </style>
    ${filters.join('')}
  </defs>
  ${backgroundRect}
  ${elementsSVG}
</svg>`;
}

function renderElement(el: UIElement): string {
  if (!el.visible) return '';

  const idSafe = el.id.replace(/\s+/g, '_');
  const layerName = el.name || el.id;
  const metadata = `id="${idSafe}" data-name="${layerName}" data-layer-type="${el.type}" data-category="${el.category}"`;
  const filterUrl = el.shadow ? `url(#shadow-${idSafe})` : el.blur ? `url(#blur-${idSafe})` : '';
  const filterAttr = filterUrl ? `filter="${filterUrl}"` : '';
  const commonProps = `${metadata} opacity="${el.opacity}" ${filterAttr}`;

  switch (el.type) {
    case 'group':
      const children = el.children?.map(child => renderElement(child)).join('\n    ') || '';
      return `<g ${commonProps} transform="translate(${el.x}, ${el.y})">
    ${children}
  </g>`;
    
    case 'rect':
    case 'pill':
    case 'capsule': {
      const isPill = el.type === 'pill' || el.type === 'capsule';
      const radius = isPill ? el.height / 2 : (el.rx || 0);
      const strokeProps = el.stroke ? `stroke="${el.stroke}" stroke-width="${el.strokeWidth || 1}"` : '';
      return `<rect ${commonProps} x="${el.x}" y="${el.y}" width="${el.width}" height="${el.height}" fill="${el.fill}" rx="${radius}" ry="${radius}" ${strokeProps} transform="rotate(${el.rotation || 0}, ${el.x + el.width/2}, ${el.y + el.height/2})" />`;
    }
      
    case 'text':
      const textAnchor = el.textAlign === 'center' ? 'middle' : el.textAlign === 'right' ? 'end' : 'start';
      const fontWeight = el.fontWeight || '400';
      return `<text ${commonProps} x="${el.x}" y="${el.y}" fill="${el.fill}" font-family="${el.fontFamily || 'Inter'}" font-size="${el.fontSize || 16}" font-weight="${fontWeight}" text-anchor="${textAnchor}">${el.text || ''}</text>`;
      
    case 'circle': {
      const r = el.width / 2;
      const cStrokeProps = el.stroke ? `stroke="${el.stroke}" stroke-width="${el.strokeWidth || 1}"` : '';
      return `<circle ${commonProps} cx="${el.x + r}" cy="${el.y + r}" r="${r}" fill="${el.fill}" ${cStrokeProps} />`;
    }
    
    case 'path':
      const pStrokeProps = el.stroke ? `stroke="${el.stroke}" stroke-width="${el.strokeWidth || 1}"` : '';
      const linecapProp = el.strokeLinecap ? `stroke-linecap="${el.strokeLinecap}"` : '';
      return `<path ${commonProps} d="${el.pathData || ''}" transform="translate(${el.x}, ${el.y}) rotate(${el.rotation || 0})" fill="${el.fill}" ${pStrokeProps} ${linecapProp} />`;
      
    default:
      return '';
  }
}
