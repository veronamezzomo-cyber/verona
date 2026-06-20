import { buildSVG } from '@/lib/svg-builder';
import { UIElement } from '@/lib/layout-templates';

export async function exportSVG(elements: UIElement[], filename = 'layout-forge-export.svg') {
  const svgContent = buildSVG(elements);
  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
