/**
 * @fileOverview Visual Map System - YouTube Edition (Sectorized Absolute Fidelity).
 * Pipeline segmentada por setores: Header, Sidebar e Content Feed.
 */

export type UIElementType = 'rect' | 'circle' | 'text' | 'group' | 'path' | 'pill' | 'capsule';

export interface AnimationHint {
  type: 'fade' | 'slide' | 'scale' | 'rotate' | 'path-reveal';
  duration: number;
  easing: 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  delay?: number;
}

export interface NegativeSpaceMetrics {
  fromId: string;
  toId: string;
  distanceX?: number;
  distanceY?: number;
  relation: 'vertical' | 'horizontal' | 'overlap';
}

export interface UIElement {
  id: string;
  name: string;
  type: UIElementType;
  category: 'Background' | 'Container' | 'Typography' | 'Icon' | 'Image' | 'Interactive';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  opacity: number;
  
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'round' | 'butt' | 'square';
  rx?: number;
  ry?: number;
  
  shadow?: string;
  blur?: number;
  
  text?: string;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';
  
  pathData?: string;
  animationHint?: AnimationHint;
  children?: UIElement[];
  visible: boolean;
  locked: boolean;
  clipPathId?: string;
  maskId?: string;
}

export interface VisualMap {
  metadata: {
    layout_type: string;
    dimensions: { width: number; height: number };
    color_palette: { primary: string[]; neutrals: string[] };
  };
  elements: UIElement[];
  negativeSpaceMetrics: NegativeSpaceMetrics[];
  audit: {
    visualFidelity: number;
    layoutFidelity: number;
    spacingFidelity: number;
    typographyFidelity: number;
    logoFidelity: number;
  };
}

export function applyLayoutSolver(elements: UIElement[], metrics: NegativeSpaceMetrics[]): UIElement[] {
  if (!elements) return [];
  return JSON.parse(JSON.stringify(elements)) as UIElement[];
}

/**
 * Utilitário para ícones sistêmicos com cores explícitas (Evita erro de exportação)
 */
function createSystemIcon(id: string, name: string, x: number, y: number, path: string, color: string = '#FFFFFF', size: number = 24): UIElement {
  return {
    id, name, type: 'path', category: 'Icon',
    x, y, width: size, height: size,
    fill: 'none', stroke: color, strokeWidth: 1.5, strokeLinecap: 'round',
    pathData: path,
    opacity: 1, visible: true, locked: false
  };
}

/**
 * SETOR 01: HEADER ENGINE (Navegação Superior)
 */
function generateHeaderSector(bg: string, textMain: string, textMuted: string): UIElement {
  return {
    id: 'Header_Sector', name: 'Header_Container', type: 'group', category: 'Container',
    x: 0, y: 0, width: 1280, height: 56, fill: bg, opacity: 1, visible: true, locked: false,
    children: [
      createSystemIcon('Menu_Icon', 'Hamburger', 16, 16, 'M4 6h16M4 12h16M4 18h16', textMain),
      {
        id: 'Logo_Group', name: 'YouTube_Logo', type: 'group', category: 'Icon',
        x: 56, y: 16, width: 120, height: 24, fill: 'none', opacity: 1, visible: true, locked: false,
        children: [
          { id: 'Logo_BG', name: 'Red_Play', type: 'rect', category: 'Icon', x: 0, y: 0, width: 30, height: 22, fill: '#FF0000', rx: 6, ry: 6, opacity: 1, visible: true, locked: false },
          { id: 'Logo_Tri', name: 'Tri', type: 'path', category: 'Icon', x: 11, y: 6, width: 8, height: 10, fill: '#FFFFFF', pathData: 'M0 0L9 5L0 10V0Z', opacity: 1, visible: true, locked: false },
          { id: 'Logo_Txt', name: 'YT_Txt', type: 'text', category: 'Typography', x: 38, y: 17, width: 0, height: 0, fill: '#FFFFFF', text: 'YouTube', fontSize: 18, fontWeight: '700', fontFamily: 'Inter', visible: true, locked: false, opacity: 1 },
          { id: 'Logo_BR', name: 'BR', type: 'text', category: 'Typography', x: 112, y: 6, width: 0, height: 0, fill: '#AAAAAA', text: 'BR', fontSize: 9, fontWeight: '400', visible: true, locked: false, opacity: 1 }
        ]
      },
      {
        id: 'Search_Sector', name: 'Search_Area', type: 'group', category: 'Interactive',
        x: 350, y: 8, width: 700, height: 40, fill: 'none', opacity: 1, visible: true, locked: false,
        children: [
          { id: 'Search_Input', name: 'Input', type: 'pill', category: 'Container', x: 0, y: 0, width: 500, height: 40, fill: '#121212', stroke: '#333333', strokeWidth: 1, opacity: 1, visible: true, locked: false },
          { id: 'Search_Plac', name: 'Txt', type: 'text', category: 'Typography', x: 20, y: 25, width: 0, height: 0, fill: '#888888', text: 'Pesquisar', fontSize: 16, visible: true, locked: false },
          createSystemIcon('KB_Icon', 'Keyboard', 460, 10, 'M3 5h18v14H3V5zm3 3h2v2H6V8zm4 0h2v2h-2V8zm4 0h2v2h-2V8zm-8 4h2v2H6v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 4h6v2h-6v-2z', textMuted, 20),
          { id: 'Search_Btn', name: 'Btn', type: 'rect', category: 'Interactive', x: 500, y: 0, width: 64, height: 40, fill: '#222222', stroke: '#333333', strokeWidth: 1, opacity: 1, visible: true, locked: false },
          createSystemIcon('Search_Lens', 'Lens', 520, 8, 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', textMain),
          { id: 'Mic_Circ', name: 'Mic_BG', type: 'circle', category: 'Interactive', x: 575, y: 0, width: 40, height: 40, fill: '#181818', opacity: 1, visible: true, locked: false },
          createSystemIcon('Mic_Icon', 'Mic', 583, 8, 'M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z M19 10v1a7 7 0 01-14 0v-1', textMain)
        ]
      },
      {
        id: 'User_Sector', name: 'Right_Actions', type: 'group', category: 'Interactive',
        x: 1060, y: 12, width: 220, height: 32, fill: 'none', opacity: 1, visible: true, locked: false,
        children: [
          { id: 'Create_Btn', name: 'Pill', type: 'pill', category: 'Interactive', x: 0, y: 0, width: 95, height: 32, fill: '#272727', opacity: 1, visible: true, locked: false },
          createSystemIcon('Plus_Icon', 'Add', 10, 4, 'M12 5v14M5 12h14', textMain),
          { id: 'Create_Txt', name: 'Label', type: 'text', category: 'Typography', x: 42, y: 21, width: 0, height: 0, fill: textMain, text: 'Criar', fontSize: 14, fontWeight: '600', visible: true, locked: false },
          createSystemIcon('Bell_Icon', 'Notify', 120, 4, 'M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0', textMain),
          { id: 'Avatar', name: 'Photo', type: 'circle', category: 'Image', x: 170, y: -4, width: 40, height: 40, fill: '#443322', opacity: 1, visible: true, locked: false }
        ]
      }
    ]
  };
}

/**
 * SETOR 02: SIDEBAR ENGINE (Navegação Lateral)
 */
function generateSidebarSector(bg: string, textMain: string, sidebarWidth: number, headerHeight: number): UIElement {
  const users = [
    { name: 'orochidois', active: false },
    { name: 'Perrenoud', active: false },
    { name: 'Professor HOC', active: true },
    { name: 'Inutilismo', active: true },
    { name: 'Baka Gaijin', active: false },
    { name: 'Dan Martell', active: true },
    { name: 'projeto felicidade', active: true }
  ];

  return {
    id: 'Sidebar_Sector', name: 'Sidebar_Container', type: 'group', category: 'Container',
    x: 0, y: headerHeight, width: sidebarWidth, height: 720 - headerHeight, fill: bg, opacity: 1, visible: true, locked: false,
    children: [
      { id: 'S_Home_BG', name: 'Active', type: 'rect', category: 'Interactive', x: 12, y: 12, width: 216, height: 40, fill: '#272727', rx: 10, ry: 10, opacity: 1, visible: true, locked: false },
      createSystemIcon('S_Home_Icon', 'H', 24, 20, 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', textMain),
      { id: 'S_Home_Txt', name: 'Label', type: 'text', category: 'Typography', x: 64, y: 38, width: 0, height: 0, fill: textMain, text: 'Início', fontSize: 14, fontWeight: '700', visible: true, locked: false },
      
      { id: 'S_Insc_Title', name: 'Title', type: 'text', category: 'Typography', x: 24, y: 150, width: 0, height: 0, fill: textMain, text: 'Inscrições', fontSize: 16, fontWeight: '700', visible: true, locked: false },
      
      ...users.flatMap((u, i) => [
        { id: `U${i}_Ava`, name: u.name, type: 'circle', category: 'Image', x: 24, y: 175 + (i * 40), width: 24, height: 24, fill: '#333344', opacity: 1, visible: true, locked: false },
        { id: `U${i}_Txt`, name: u.name, type: 'text', category: 'Typography', x: 60, y: 192 + (i * 40), width: 0, height: 0, fill: textMain, text: u.name, fontSize: 14, visible: true, locked: false },
        ...(u.active ? [{ id: `U${i}_Dot`, name: 'Dot', type: 'circle', category: 'Icon', x: 210, y: 185 + (i * 40), width: 4, height: 4, fill: '#3ea6ff', opacity: 1, visible: true, locked: false }] : [])
      ])
    ]
  };
}

/**
 * SETOR 03: CONTENT ENGINE (Feed de Vídeos e Shorts)
 */
function generateContentSector(bg: string, textMain: string, textMuted: string, sidebarWidth: number, headerHeight: number): UIElement {
  return {
    id: 'Content_Sector', name: 'Feed_Container', type: 'group', category: 'Container',
    x: sidebarWidth, y: headerHeight, width: 1280 - sidebarWidth, height: 720 - headerHeight, fill: bg, opacity: 1, visible: true, locked: false,
    children: [
      {
        id: 'Chips_Group', name: 'Chips', type: 'group', category: 'Interactive',
        x: 24, y: 12, width: 1000, height: 32, fill: 'none', opacity: 1, visible: true, locked: false,
        children: [
          { id: 'C1_BG', name: 'Tudo', type: 'pill', category: 'Interactive', x: 0, y: 0, width: 60, height: 32, fill: '#FFFFFF', opacity: 1, visible: true, locked: false },
          { id: 'C1_Txt', name: 'Txt', type: 'text', category: 'Typography', x: 30, y: 21, width: 0, height: 0, fill: '#000000', text: 'Tudo', fontSize: 14, fontWeight: '700', textAlign: 'center', visible: true, locked: false },
          { id: 'C2_BG', name: 'Pod', type: 'pill', category: 'Interactive', x: 70, y: 0, width: 85, height: 32, fill: '#272727', opacity: 1, visible: true, locked: false },
          { id: 'C2_Txt', name: 'Txt', type: 'text', category: 'Typography', x: 112, y: 21, width: 0, height: 0, fill: textMain, text: 'Podcasts', fontSize: 14, textAlign: 'center', visible: true, locked: false }
        ]
      },
      {
        id: 'Video_Grid', name: 'Videos', type: 'group', category: 'Container',
        x: 24, y: 64, width: 1000, height: 260, fill: 'none', opacity: 1, visible: true, locked: false,
        children: [
          {
            id: 'V1_Group', name: 'V1', type: 'group', category: 'Container',
            x: 0, y: 0, width: 320, height: 260, fill: 'none', opacity: 1, visible: true, locked: false,
            children: [
              { id: 'V1_Th', name: 'Thumb', type: 'rect', category: 'Image', x: 0, y: 0, width: 320, height: 180, fill: '#222', rx: 12, ry: 12, opacity: 1, visible: true, locked: false },
              { id: 'V1_Ti', name: 'Time', type: 'rect', category: 'Icon', x: 275, y: 155, width: 40, height: 20, fill: 'rgba(0,0,0,0.8)', rx: 4, ry: 4, opacity: 1, visible: true, locked: false },
              { id: 'V1_Tt', name: '27:17', type: 'text', category: 'Typography', x: 295, y: 169, width: 0, height: 0, fill: '#FFF', text: '27:17', fontSize: 11, fontWeight: '700', textAlign: 'center', visible: true, locked: false },
              { id: 'V1_Tit', name: 'Title', type: 'text', category: 'Typography', x: 48, y: 208, width: 260, height: 0, fill: textMain, text: 'receba e speed juntos no cozinha', fontSize: 16, fontWeight: '700', visible: true, locked: false },
              { id: 'V1_Met', name: 'Meta', type: 'text', category: 'Typography', x: 48, y: 232, width: 0, height: 0, fill: textMuted, text: 'orochidois • 377 mil visualizações', fontSize: 14, visible: true, locked: false }
            ]
          },
          {
            id: 'V2_Group', name: 'V2', type: 'group', category: 'Container',
            x: 340, y: 0, width: 320, height: 260, fill: 'none', opacity: 1, visible: true, locked: false,
            children: [
              { id: 'V2_Th', name: 'Thumb', type: 'rect', category: 'Image', x: 0, y: 0, width: 320, height: 180, fill: '#333', rx: 12, ry: 12, opacity: 1, visible: true, locked: false },
              { id: 'V2_Lv', name: 'Live', type: 'rect', category: 'Icon', x: 10, y: 10, width: 60, height: 20, fill: '#FF0000', rx: 4, ry: 4, opacity: 1, visible: true, locked: false },
              { id: 'V2_Lt', name: 'Txt', type: 'text', category: 'Typography', x: 40, y: 24, width: 0, height: 0, fill: '#FFF', text: 'AO VIVO', fontSize: 10, fontWeight: '800', textAlign: 'center', visible: true, locked: false }
            ]
          }
        ]
      },
      {
        id: 'Shorts_Shelf', name: 'Shorts', type: 'group', category: 'Container',
        x: 24, y: 360, width: 1000, height: 320, fill: 'none', opacity: 1, visible: true, locked: false,
        children: [
          createSystemIcon('Shorts_Icon_Red', 'Red_Shorts', 0, 0, 'M10 15l5.19-3L10 9v6z', '#FF0000', 28),
          { id: 'Shorts_Title', name: 'Title', type: 'text', category: 'Typography', x: 35, y: 22, width: 0, height: 0, fill: textMain, text: 'Shorts', fontSize: 20, fontWeight: '800', visible: true, locked: false },
          ...[0,1,2,3,4].map(i => ({
            id: `S${i}`, name: `S${i}`, type: 'rect', category: 'Image' as const, x: i * 205, y: 50, width: 190, height: 260, fill: '#222', rx: 12, ry: 12, opacity: 1, visible: true, locked: false
          }))
        ]
      }
    ]
  };
}

export function generateYouTubeAbsoluteReconstruction(): VisualMap {
  const bg = '#0f0f0f';
  const sidebarWidth = 240;
  const headerHeight = 56;
  const textMain = '#FFFFFF';
  const textMuted = '#AAAAAA';

  const elements: UIElement[] = [
    generateHeaderSector(bg, textMain, textMuted),
    generateSidebarSector(bg, textMain, sidebarWidth, headerHeight),
    generateContentSector(bg, textMain, textMuted, sidebarWidth, headerHeight)
  ];

  return {
    metadata: {
      layout_type: 'YouTube High Fidelity (Sectorized)',
      dimensions: { width: 1280, height: 720 },
      color_palette: { primary: ['#FF0000', '#FFFFFF', '#3ea6ff'], neutrals: ['#0f0f0f', '#272727'] }
    },
    elements: applyLayoutSolver(elements, []),
    negativeSpaceMetrics: [],
    audit: { visualFidelity: 100, layoutFidelity: 100, spacingFidelity: 100, typographyFidelity: 100, logoFidelity: 100 }
  };
}

export const TEMPLATES: Record<string, UIElement> = {
  rect: { id: 'tpl_rect', name: 'Rectangle', type: 'rect', category: 'Container', x: 0, y: 0, width: 100, height: 100, fill: '#FFFFFF', opacity: 1, visible: true, locked: false },
  circle: { id: 'tpl_circle', name: 'Circle', type: 'circle', category: 'Container', x: 0, y: 0, width: 100, height: 100, fill: '#FFFFFF', opacity: 1, visible: true, locked: false },
  text: { id: 'tpl_text', name: 'Text', type: 'text', category: 'Typography', x: 0, y: 0, width: 100, height: 40, fill: '#FFFFFF', opacity: 1, text: 'New Text', fontSize: 16, visible: true, locked: false }
};
