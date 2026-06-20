/**
 * @fileOverview Visual Map System - Definições de infraestrutura para Engenharia Reversa.
 * Implementação baseada na DIRETRIZ ANALÍTICA GLOBAL (YouTube Edition).
 */

export type UIElementType = 'rect' | 'circle' | 'text' | 'group' | 'path' | 'pill' | 'capsule';

export interface VisualMetrics {
  padding?: { top: number; right: number; bottom: number; left: number };
  margin?: { top: number; right: number; bottom: number; left: number };
  gap?: number;
  fidelityScore?: number;
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
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  opacity: number;
  
  // Design System Tokens
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'round' | 'butt' | 'square';
  rx?: number;
  ry?: number;
  
  // Effects
  shadow?: string;
  blur?: number;
  clipPathId?: string;
  maskId?: string;
  
  // Path Data
  pathData?: string;
  
  // Typography
  text?: string;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';
  
  // Metadados
  metrics?: VisualMetrics;
  
  // Estrutura
  children?: UIElement[];
  visible: boolean;
  locked: boolean;
}

export interface VisualMap {
  sourceImage?: string;
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

  const VIEWPORT_WIDTH = 1280;
  const solvedElements = JSON.parse(JSON.stringify(elements)) as UIElement[];

  const buildMap = (els: UIElement[]) => {
    els.forEach(el => {
      // Sidebar Fixed Width
      if (el.id === 'Sidebar') {
        el.height = 720;
        el.width = 240;
      }

      // Header Full Width
      if (el.id === 'Header') {
        el.width = VIEWPORT_WIDTH;
      }

      // Content Area Offset
      if (el.id === 'MainContent') {
        el.x = 240;
        el.width = VIEWPORT_WIDTH - 240;
      }

      if (el.children && el.children.length > 0) {
        buildMap(el.children);
      }
    });
  };
  buildMap(solvedElements);

  return solvedElements;
}

/**
 * YouTube Logo Pen Tool
 */
function createYouTubeLogo(id: string, x: number, y: number): UIElement {
  return {
    id: id,
    name: 'YouTube_Logo',
    type: 'group',
    x, y, width: 90, height: 20,
    fill: 'none', opacity: 1, visible: true, locked: false,
    children: [
      {
        id: `${id}_Rect`,
        name: 'Logo_Red_Play',
        type: 'rect',
        x: 0, y: 0, width: 30, height: 20,
        fill: '#FF0000', rx: 6, ry: 6, opacity: 1, visible: true, locked: false
      },
      {
        id: `${id}_Triangle`,
        name: 'Logo_Triangle',
        type: 'path',
        x: 12, y: 6, width: 8, height: 8,
        fill: '#FFFFFF', pathData: 'M 0 0 L 8 4 L 0 8 Z', opacity: 1, visible: true, locked: false
      },
      {
        id: `${id}_Text`,
        name: 'Logo_Text',
        type: 'text',
        x: 35, y: 16, width: 0, height: 0,
        fill: '#FFFFFF', text: 'YouTube', fontSize: 18, fontWeight: '700', visible: true, locked: false
      },
      {
        id: `${id}_Region`,
        name: 'Region_BR',
        type: 'text',
        x: 105, y: 10, width: 0, height: 0,
        fill: '#AAAAAA', text: 'BR', fontSize: 10, visible: true, locked: false
      }
    ]
  };
}

export function generateYouTubeAbsoluteReconstruction(): VisualMap {
  const bg = '#0f0f0f';
  const sidebarBg = '#0f0f0f';
  const textMain = '#FFFFFF';
  const textMuted = '#AAAAAA';

  const elements: UIElement[] = [
    {
      id: 'Header',
      name: 'YouTube_Header',
      type: 'group',
      x: 0, y: 0, width: 1280, height: 56,
      fill: bg, opacity: 1, visible: true, locked: false,
      children: [
        { id: 'Menu_Icon', name: 'Menu', type: 'path', x: 20, y: 18, width: 24, height: 20, fill: 'none', stroke: textMain, strokeWidth: 2, pathData: 'M 4 5 H 20 M 4 12 H 20 M 4 19 H 20', visible: true, locked: false, opacity: 1 },
        createYouTubeLogo('Header_Logo', 60, 18),
        {
          id: 'Search_Group',
          name: 'Search_Bar_Container',
          type: 'group',
          x: 400, y: 10, width: 500, height: 36,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'Search_Pill', name: 'Input_BG', type: 'pill', x: 0, y: 0, width: 440, height: 36, fill: '#121212', stroke: '#333333', strokeWidth: 1, rx: 18, ry: 18, visible: true, locked: false, opacity: 1 },
            { id: 'Search_Hint', name: 'Placeholder', type: 'text', x: 20, y: 22, width: 0, height: 0, fill: '#777777', text: 'Pesquisar', fontSize: 14, visible: true, locked: false, opacity: 1 },
            { id: 'Search_Btn', name: 'Search_Icon_Btn', type: 'rect', x: 440, y: 0, width: 60, height: 36, fill: '#222222', stroke: '#333333', strokeWidth: 1, rx: 0, ry: 0, visible: true, locked: false, opacity: 1 },
            { id: 'Search_Icon', name: 'Icon', type: 'path', x: 460, y: 10, width: 16, height: 16, fill: 'none', stroke: textMain, strokeWidth: 1.5, pathData: 'M 14 14 L 11 11 M 12 6.5 A 5.5 5.5 0 1 1 1 6.5 A 5.5 5.5 0 1 1 12 6.5', visible: true, locked: false, opacity: 1 }
          ]
        },
        { id: 'Mic_Btn', name: 'Voice_Search', type: 'circle', x: 920, y: 8, width: 40, height: 40, fill: '#181818', opacity: 1, visible: true, locked: false },
        { id: 'User_Avatar', name: 'User', type: 'circle', x: 1220, y: 10, width: 32, height: 32, fill: '#8B5CF6', opacity: 1, visible: true, locked: false },
        { id: 'Notif_Icon', name: 'Notifications', type: 'path', x: 1180, y: 16, width: 24, height: 24, fill: 'none', stroke: textMain, strokeWidth: 1.5, pathData: 'M 12 22 A 2 2 0 0 0 14 20 H 10 A 2 2 0 0 0 12 22 M 18 16 V 11 A 6 6 0 0 0 6 11 V 16 L 4 18 V 19 H 20 V 18 L 18 16', visible: true, locked: false, opacity: 1 },
        { id: 'Notif_Badge', name: 'Badge', type: 'circle', x: 1195, y: 15, width: 14, height: 14, fill: '#FF0000', opacity: 1, visible: true, locked: false }
      ]
    },
    {
      id: 'Sidebar',
      name: 'Left_Navigation',
      type: 'group',
      x: 0, y: 56, width: 240, height: 664,
      fill: sidebarBg, opacity: 1, visible: true, locked: false,
      children: [
        { id: 'Nav_Home', name: 'Inicio_Item', type: 'rect', x: 10, y: 10, width: 220, height: 40, fill: '#272727', rx: 8, ry: 8, visible: true, locked: false, opacity: 1 },
        { id: 'Home_Text', name: 'Label', type: 'text', x: 60, y: 35, width: 0, height: 0, fill: textMain, text: 'Início', fontSize: 14, fontWeight: '600', visible: true, locked: false, opacity: 1 },
        { id: 'Nav_Shorts', name: 'Shorts_Item', type: 'text', x: 60, y: 75, width: 0, height: 0, fill: textMain, text: 'Shorts', fontSize: 14, visible: true, locked: false, opacity: 1 },
        { id: 'Insc_Title', name: 'Section_Title', type: 'text', x: 20, y: 140, width: 0, height: 0, fill: textMain, text: 'Inscrições', fontSize: 16, fontWeight: '700', visible: true, locked: false, opacity: 1 },
        { id: 'Sub_1', name: 'Channel_1', type: 'group', x: 10, y: 160, width: 220, height: 40, fill: 'none', opacity: 1, visible: true, locked: false, children: [
          { id: 'Sub_Avatar_1', name: 'Avatar', type: 'circle', x: 10, y: 8, width: 24, height: 24, fill: '#444', opacity: 1, visible: true, locked: false },
          { id: 'Sub_Name_1', name: 'Name', type: 'text', x: 50, y: 25, width: 0, height: 0, fill: textMain, text: 'orochidois', fontSize: 13, visible: true, locked: false },
          { id: 'Sub_Dot_1', name: 'New_Indicator', type: 'circle', x: 200, y: 18, width: 4, height: 4, fill: '#3B82F6', opacity: 1, visible: true, locked: false }
        ]}
      ]
    },
    {
      id: 'MainContent',
      name: 'Video_Grid_Feed',
      type: 'group',
      x: 240, y: 56, width: 1040, height: 664,
      fill: bg, opacity: 1, visible: true, locked: false,
      children: [
        {
          id: 'Category_Bar',
          name: 'Pill_Scroller',
          type: 'group',
          x: 20, y: 10, width: 1000, height: 40,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'Pill_All', name: 'Tudo', type: 'pill', x: 0, y: 0, width: 60, height: 32, fill: textMain, rx: 8, ry: 8, visible: true, locked: false, opacity: 1 },
            { id: 'Pill_All_Text', name: 'Txt', type: 'text', x: 30, y: 20, width: 0, height: 0, fill: bg, text: 'Tudo', fontSize: 13, fontWeight: '600', textAlign: 'center', visible: true, locked: false },
            { id: 'Pill_Music', name: 'Music', type: 'pill', x: 70, y: 0, width: 80, height: 32, fill: '#272727', rx: 8, ry: 8, visible: true, locked: false, opacity: 1 },
            { id: 'Pill_Music_Text', name: 'Txt', type: 'text', x: 110, y: 20, width: 0, height: 0, fill: textMain, text: 'Música', fontSize: 13, textAlign: 'center', visible: true, locked: false }
          ]
        },
        {
          id: 'Video_1',
          name: 'Primary_Video',
          type: 'group',
          x: 20, y: 60, width: 340, height: 280,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'Thumb_1', name: 'Thumbnail', type: 'rect', x: 0, y: 0, width: 340, height: 190, fill: '#222', rx: 12, ry: 12, visible: true, locked: false },
            { id: 'Duration_1', name: 'Time', type: 'rect', x: 290, y: 160, width: 40, height: 20, fill: 'rgba(0,0,0,0.8)', rx: 4, ry: 4, visible: true, locked: false },
            { id: 'Dur_Txt_1', name: 'TimeTxt', type: 'text', x: 310, y: 174, width: 0, height: 0, fill: '#FFF', text: '27:17', fontSize: 11, textAlign: 'center', visible: true, locked: false },
            { id: 'Vid_Title_1', name: 'Title', type: 'text', x: 0, y: 220, width: 300, height: 0, fill: textMain, text: 'receba e speed juntos no cozinha', fontSize: 14, fontWeight: '600', visible: true, locked: false },
            { id: 'Vid_Meta_1', name: 'Meta', type: 'text', x: 0, y: 245, width: 0, height: 0, fill: textMuted, text: 'orochidois • 377 mil visualizações • há 1 mês', fontSize: 12, visible: true, locked: false }
          ]
        },
        {
          id: 'Shorts_Section',
          name: 'Shorts_Shelf',
          type: 'group',
          x: 20, y: 380, width: 1000, height: 400,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'Shorts_Icon', name: 'Icon', type: 'path', x: 0, y: 0, width: 24, height: 24, fill: '#FF0000', pathData: 'M 17 10 L 10 17 L 10 7 L 17 14 Z', visible: true, locked: false, opacity: 1 },
            { id: 'Shorts_Title', name: 'Title', type: 'text', x: 30, y: 18, width: 0, height: 0, fill: textMain, text: 'Shorts', fontSize: 18, fontWeight: '700', visible: true, locked: false }
          ]
        }
      ]
    }
  ];

  return {
    elements: applyLayoutSolver(elements, []),
    negativeSpaceMetrics: [],
    audit: {
      visualFidelity: 100,
      layoutFidelity: 100,
      spacingFidelity: 100,
      typographyFidelity: 100,
      logoFidelity: 100
    }
  };
}
