import { UIElement } from './layout-templates';

export function buildSVG(elements: UIElement[], viewBox = '0 0 1280 720'): string {
  const elementsSVG = elements.map(el => renderElement(el)).join('\n  ');
  
  return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <rect width="100%" height="100%" fill="#0A0E27" />
  ${elementsSVG}
</svg>`;
}

function renderElement(el: UIElement): string {
  switch (el.type) {
    case 'group':
      const children = el.children?.map(child => renderElement(child)).join('\n    ') || '';
      return `<g id="${el.id}" transform="translate(${el.x}, ${el.y})">
    ${children}
  </g>`;
    
    case 'rect':
      return `<rect id="${el.id}" x="${el.x}" y="${el.y}" width="${el.width}" height="${el.height}" fill="${el.fill}" opacity="${el.opacity}" rx="${el.rx || 0}" ry="${el.ry || 0}" ${el.stroke ? `stroke="${el.stroke}" stroke-width="${el.strokeWidth || 1}"` : ''} />`;
      
    case 'text':
      return `<text id="${el.id}" x="${el.x}" y="${el.y}" fill="${el.fill}" opacity="${el.opacity}" font-family="Inter" font-size="${el.fontSize || 16}" text-anchor="middle">${el.text || ''}</text>`;
      
    case 'circle':
      const r = Math.min(el.width, el.height) / 2;
      return `<circle id="${el.id}" cx="${el.x + r}" cy="${el.y + r}" r="${r}" fill="${el.fill}" opacity="${el.opacity}" />`;
      
    default:
      return '';
  }
}
