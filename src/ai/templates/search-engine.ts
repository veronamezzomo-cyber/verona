import { UIElement } from '@/lib/layout-templates';

/**
 * @fileOverview Gerador de estruturas para Search Engines (editáveis).
 */

export function generateSearchTemplates(colors: any): UIElement[][] {
  const { bg, primary, secondary, text } = colors;

  const var1: UIElement[] = [
    { id: 'logo', name: 'Big Logo', type: 'text', x: 640, y: 260, width: 0, height: 0, fill: primary, opacity: 1, text: 'SEARCH', fontSize: 72 },
    { id: 'search-bar', name: 'Main Search', type: 'rect', x: 340, y: 300, width: 600, height: 56, fill: bg, opacity: 1, rx: 28, ry: 28, stroke: text, strokeWidth: 1 },
    { id: 'btn-1', name: 'Search Button', type: 'rect', x: 480, y: 390, width: 150, height: 40, fill: secondary, opacity: 0.1, rx: 8, ry: 8 }
  ];

  const var2: UIElement[] = [
    { id: 'head', name: 'Small Header', type: 'rect', x: 0, y: 0, width: 1280, height: 120, fill: bg, opacity: 1, stroke: secondary, strokeWidth: 0.5 },
    { id: 'results', name: 'Result List', type: 'group', x: 180, y: 160, width: 600, height: 400, fill: 'none', opacity: 1, children: [
      { id: 'res-1', name: 'Result Item', type: 'rect', x: 0, y: 0, width: 600, height: 80, fill: secondary, opacity: 0.05, rx: 8, ry: 8 }
    ]}
  ];

  const var3: UIElement[] = [
    { id: 'modern-box', name: 'Hero Search', type: 'rect', x: 240, y: 280, width: 800, height: 80, fill: secondary, opacity: 0.05, rx: 40, ry: 40, stroke: secondary, strokeWidth: 1 },
    { id: 'grid', name: 'Quick Links', type: 'rect', x: 390, y: 450, width: 500, height: 120, fill: secondary, opacity: 0.1, rx: 20, ry: 20 }
  ];

  return [var1, var2, var3];
}
