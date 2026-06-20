import { UIElement } from '@/lib/layout-templates';

/**
 * @fileOverview Gerador de estruturas para YouTube (Fidelidade Absoluta).
 */

export function generateVideoTemplates(colors: any): UIElement[][] {
  const { bg, primary, text } = colors;

  // Variação 1: YouTube Home Feed (3 Colunas)
  const var1: UIElement[] = [
    {
      id: 'Grid_Layout',
      name: 'Main_Feed',
      type: 'group',
      x: 0, y: 0, width: 1040, height: 720,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        {
          id: 'Vid_1',
          name: 'Video_Card_1',
          type: 'group',
          x: 20, y: 20, width: 320, height: 260,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'v1_thumb', name: 'Thumbnail', type: 'rect', x: 0, y: 0, width: 320, height: 180, fill: '#222', rx: 12, ry: 12 },
            { id: 'v1_avatar', name: 'Avatar', type: 'circle', x: 0, y: 195, width: 36, height: 36, fill: '#444' },
            { id: 'v1_title', name: 'Title', type: 'text', x: 48, y: 205, width: 260, height: 0, fill: '#FFF', text: 'receba e speed juntos no cozinha', fontSize: 14, fontWeight: '600' },
            { id: 'v1_meta', name: 'Info', type: 'text', x: 48, y: 230, width: 0, height: 0, fill: '#AAA', text: 'orochidois • 377 mil visualizações', fontSize: 12 }
          ]
        },
        {
          id: 'Vid_2',
          name: 'Video_Card_Live',
          type: 'group',
          x: 360, y: 20, width: 320, height: 260,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'v2_thumb', name: 'Thumbnail', type: 'rect', x: 0, y: 0, width: 320, height: 180, fill: '#333', rx: 12, ry: 12 },
            { id: 'v2_live', name: 'Live_Badge', type: 'rect', x: 10, y: 10, width: 60, height: 20, fill: '#FF0000', rx: 4, ry: 4 },
            { id: 'v2_live_txt', name: 'Txt', type: 'text', x: 40, y: 24, width: 0, height: 0, fill: '#FFF', text: 'AO VIVO', fontSize: 10, fontWeight: '800', textAlign: 'center' }
          ]
        }
      ]
    }
  ];

  return [var1];
}
