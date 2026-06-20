import { UIElement } from '@/lib/layout-templates';

/**
 * @fileOverview Gerador de estruturas para Plataformas de Vídeo e Creator Studios.
 */

export function generateVideoTemplates(colors: any): UIElement[][] {
  const { bg, primary, secondary, text } = colors;

  // Variação 1: YouTube Home (Feed de Descoberta)
  const var1: UIElement[] = [
    { id: 'header', name: 'Top Navigation', type: 'rect', x: 0, y: 0, width: 1280, height: 56, fill: bg, opacity: 1, stroke: text, strokeWidth: 0.1 },
    { id: 'search-pill', name: 'Search Bar', type: 'rect', x: 440, y: 10, width: 400, height: 36, fill: bg, opacity: 1, rx: 18, ry: 18, stroke: text, strokeWidth: 0.5 },
    { id: 'sidebar-rail', name: 'Mini Rail', type: 'rect', x: 0, y: 56, width: 72, height: 664, fill: bg, opacity: 1 },
    { id: 'cat-bar', name: 'Categories', type: 'rect', x: 72, y: 56, width: 1208, height: 56, fill: bg, opacity: 1, stroke: text, strokeWidth: 0.1 },
    { id: 'video-grid', name: 'Feed Grid', type: 'group', x: 92, y: 132, width: 1100, height: 500, fill: 'none', opacity: 1, children: [
      { id: 'v1', name: 'Video 1', type: 'rect', x: 0, y: 0, width: 260, height: 146, fill: secondary, opacity: 0.1, rx: 12, ry: 12 },
      { id: 'v1-t', name: 'Title 1', type: 'rect', x: 0, y: 156, width: 200, height: 12, fill: text, opacity: 0.2, rx: 4, ry: 4 },
      { id: 'v2', name: 'Video 2', type: 'rect', x: 280, y: 0, width: 260, height: 146, fill: secondary, opacity: 0.1, rx: 12, ry: 12 },
      { id: 'v3', name: 'Video 3', type: 'rect', x: 560, y: 0, width: 260, height: 146, fill: secondary, opacity: 0.1, rx: 12, ry: 12 },
      { id: 'v4', name: 'Video 4', type: 'rect', x: 840, y: 0, width: 260, height: 146, fill: secondary, opacity: 0.1, rx: 12, ry: 12 }
    ]}
  ];

  // Variação 2: YouTube Studio Dashboard (Analíticos e Conteúdo)
  const var2: UIElement[] = [
    { id: 'studio-header', name: 'Studio Header', type: 'rect', x: 0, y: 0, width: 1280, height: 64, fill: bg, opacity: 1, stroke: primary, strokeWidth: 0.5 },
    { id: 'studio-side', name: 'Studio Nav', type: 'rect', x: 0, y: 64, width: 256, height: 656, fill: bg, opacity: 1, stroke: text, strokeWidth: 0.1 },
    { id: 'dash-title', name: 'Dashboard Title', type: 'text', x: 300, y: 110, width: 200, height: 40, fill: text, opacity: 1, text: 'Painel do Canal', fontSize: 24 },
    { id: 'card-stats', name: 'Channel Analytics', type: 'group', x: 280, y: 140, width: 320, height: 400, fill: 'none', opacity: 1, children: [
      { id: 'card-bg', name: 'Card BG', type: 'rect', x: 0, y: 0, width: 320, height: 400, fill: secondary, opacity: 0.05, rx: 12, ry: 12, stroke: secondary, strokeWidth: 0.5 },
      { id: 'stat-title', name: 'Summary', type: 'text', x: 20, y: 40, width: 0, height: 0, fill: text, opacity: 0.8, text: 'Estatísticas do Canal', fontSize: 18 },
      { id: 'sub-count', name: 'Subs', type: 'text', x: 20, y: 80, width: 0, height: 0, fill: primary, opacity: 1, text: '1.240 Inscritos', fontSize: 32 }
    ]},
    { id: 'card-latest', name: 'Latest Video', type: 'group', x: 620, y: 140, width: 600, height: 280, fill: 'none', opacity: 1, children: [
      { id: 'vid-bg', name: 'Vid Card', type: 'rect', x: 0, y: 0, width: 600, height: 280, fill: primary, opacity: 0.03, rx: 12, ry: 12, stroke: primary, strokeWidth: 0.5 },
      { id: 'thumb-placeholder', name: 'Thumbnail', type: 'rect', x: 20, y: 20, width: 200, height: 112, fill: primary, opacity: 0.1, rx: 8, ry: 8 },
      { id: 'vid-metrics', name: 'Metrics', type: 'rect', x: 240, y: 20, width: 340, height: 240, fill: bg, opacity: 0.5, rx: 8, ry: 8 }
    ]}
  ];

  // Variação 3: Video Player (Modo Cinema)
  const var3: UIElement[] = [
    { id: 'cinema-bg', name: 'Player BG', type: 'rect', x: 0, y: 0, width: 1280, height: 720, fill: '#000000', opacity: 1 },
    { id: 'main-player', name: 'Video Player', type: 'rect', x: 100, y: 40, width: 1080, height: 607, fill: '#111111', opacity: 1, rx: 16, ry: 16 },
    { id: 'controls', name: 'Control Bar', type: 'rect', x: 100, y: 607, width: 1080, height: 40, fill: primary, opacity: 0.1, rx: 0, ry: 0 },
    { id: 'play-btn', name: 'Play Icon', type: 'circle', x: 120, y: 617, width: 20, height: 20, fill: text, opacity: 1 }
  ];

  return [var1, var2, var3];
}
