import { UIElement } from '@/lib/layout-templates';

/**
 * @fileOverview Gerador de estruturas para Plataformas de Vídeo (editáveis).
 */

export function generateVideoTemplates(colors: any): UIElement[][] {
  const { bg, primary, secondary, text } = colors;

  const var1: UIElement[] = [
    { id: 'top-nav', name: 'Header Bar', type: 'rect', x: 0, y: 0, width: 1280, height: 65, fill: bg, opacity: 1, stroke: text, strokeWidth: 0.2 },
    { id: 'side', name: 'Nav Rail', type: 'rect', x: 0, y: 65, width: 240, height: 655, fill: bg, opacity: 1, stroke: text, strokeWidth: 0.1 },
    { id: 'card-1', name: 'Video Card', type: 'rect', x: 270, y: 95, width: 300, height: 170, fill: secondary, opacity: 0.1, rx: 12, ry: 12 }
  ];

  const var2: UIElement[] = [
    { id: 'mini-side', name: 'Mini Rail', type: 'rect', x: 0, y: 0, width: 72, height: 720, fill: bg, opacity: 1, stroke: text, strokeWidth: 0.1 },
    { id: 'featured', name: 'Hero Video', type: 'rect', x: 100, y: 80, width: 1140, height: 300, fill: primary, opacity: 0.05, rx: 16, ry: 16, stroke: primary, strokeWidth: 1 }
  ];

  const var3: UIElement[] = [
    { id: 'player', name: 'Cinema Player', type: 'rect', x: 40, y: 40, width: 850, height: 480, fill: 'black', opacity: 1, rx: 16, ry: 16 },
    { id: 'rec', name: 'Recommendation', type: 'rect', x: 920, y: 40, width: 320, height: 80, fill: secondary, opacity: 0.1, rx: 12, ry: 12 }
  ];

  return [var1, var2, var3];
}
