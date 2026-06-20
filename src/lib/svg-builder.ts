import { UIElement } from './layout-templates';

export function buildSVG(elements: UIElement[], viewBox = '0 0 1280 720'): string {
  const elementsSVG = elements.map(el => renderElement(el)).join('\n  ');
  
  return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" version="1.1">
  ${elementsSVG}
</svg>`;
}

function renderElement(el: UIElement): string {
  if (!el.visible) return '';

  switch (el.type) {
    case 'group':
      const children = el.children?.map(child => renderElement(child)).join('\n    ') || '';
      return `<g id="${el.id}" transform="translate(${el.x}, ${el.y})">
    ${children}
  </g>`;
    
    case 'rect':
    case 'pill':
    case 'capsule': {
      const isPill = el.type === 'pill' || el.type === 'capsule';
      const radius = isPill ? el.height / 2 : (el.rx || 0);
      return `<rect id="${el.id}" x="${el.x}" y="${el.y}" width="${el.width}" height="${el.height}" fill="${el.fill}" opacity="${el.opacity}" rx="${radius}" ry="${radius}" ${el.stroke ? `stroke="${el.stroke}" stroke-width="${el.strokeWidth || 1}"` : ''} transform="rotate(${el.rotation || 0}, ${el.x + el.width/2}, ${el.y + el.height/2})" />`;
    }
      
    case 'text':
      const textAnchor = el.textAlign === 'center' ? 'middle' : el.textAlign === 'right' ? 'end' : 'start';
      return `<text id="${el.id}" x="${el.x}" y="${el.y}" fill="${el.fill}" opacity="${el.opacity}" font-family="${el.fontFamily || 'Inter'}" font-size="${el.fontSize || 16}" font-weight="${el.fontWeight || '400'}" text-anchor="${textAnchor}">${el.text || ''}</text>`;
      
    case 'circle':
      const r = el.width / 2;
      return `<circle id="${el.id}" cx="${el.x + r}" cy="${el.y + r}" r="${r}" fill="${el.fill}" opacity="${el.opacity}" ${el.stroke ? `stroke="${el.stroke}" stroke-width="${el.strokeWidth || 1}"` : ''} />`;
    
    case 'path':
      return `<path id="${el.id}" d="${el.pathData || ''}" transform="translate(${el.x}, ${el.y})" fill="${el.fill}" stroke="${el.stroke || 'none'}" stroke-width="${el.strokeWidth || 0}" opacity="${el.opacity}" />`;
      
    default:
      return '';
  }
}