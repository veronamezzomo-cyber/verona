import { UIElement } from '@/lib/layout-templates';

/**
 * @fileOverview Gerador de estruturas para Dashboards/SaaS (editáveis).
 */

export function generateDashboardTemplates(colors: any): UIElement[][] {
  const { bg, primary, secondary, text } = colors;

  const var1: UIElement[] = [
    { id: 'side', name: 'Sidebar', type: 'rect', x: 0, y: 0, width: 260, height: 720, fill: bg, opacity: 1, stroke: text, strokeWidth: 0.2 },
    { id: 'title', name: 'Page Title', type: 'text', x: 300, y: 60, width: 200, height: 40, fill: text, opacity: 1, text: 'Dashboard', fontSize: 32 },
    { id: 'stat-1', name: 'Stat Card 1', type: 'rect', x: 300, y: 100, width: 280, height: 140, fill: primary, opacity: 0.05, rx: 20, ry: 20, stroke: primary, strokeWidth: 1 },
    { id: 'stat-2', name: 'Stat Card 2', type: 'rect', x: 610, y: 100, width: 280, height: 140, fill: secondary, opacity: 0.05, rx: 20, ry: 20, stroke: secondary, strokeWidth: 1 },
    { id: 'chart', name: 'Chart Area', type: 'rect', x: 300, y: 280, width: 920, height: 380, fill: bg, opacity: 1, rx: 24, ry: 24, stroke: text, strokeWidth: 0.5 }
  ];

  const var2: UIElement[] = [
    { id: 'top', name: 'Top Bar', type: 'rect', x: 0, y: 0, width: 1280, height: 70, fill: bg, opacity: 1, stroke: text, strokeWidth: 0.2 },
    { id: 'col-1', name: 'Column Todo', type: 'rect', x: 40, y: 110, width: 360, height: 500, fill: secondary, opacity: 0.03, rx: 16, ry: 16 },
    { id: 'col-2', name: 'Column Progress', type: 'rect', x: 420, y: 110, width: 360, height: 500, fill: primary, opacity: 0.08, rx: 16, ry: 16, stroke: primary, strokeWidth: 1 }
  ];

  const var3: UIElement[] = [
    { id: 'list-bg', name: 'List Container', type: 'rect', x: 60, y: 140, width: 1160, height: 500, fill: secondary, opacity: 0.02, rx: 24, ry: 24 },
    { id: 'row-1', name: 'List Item 1', type: 'rect', x: 80, y: 160, width: 1120, height: 70, fill: bg, opacity: 1, rx: 12, ry: 12, stroke: text, strokeWidth: 0.2 }
  ];

  return [var1, var2, var3];
}
