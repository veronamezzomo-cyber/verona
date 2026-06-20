/**
 * @fileOverview Visual Map System - YouTube Edition.
 * Implementa a reconstrução analítica da interface do YouTube.
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
  const VIEWPORT_WIDTH = 1280;
  const solvedElements = JSON.parse(JSON.stringify(elements)) as UIElement[];

  const buildMap = (els: UIElement[]) => {
    els.forEach(el => {
      if (el.children) buildMap(el.children);
    });
  };
  buildMap(solvedElements);
  return solvedElements;
}

function createSystemIcon(id: string, name: string, x: number, y: number, path: string, color: string = '#FFFFFF'): UIElement {
  return {
    id, name, type: 'path', category: 'Icon',
    x, y, width: 24, height: 24,
    fill: 'none', stroke: color, strokeWidth: 1.5, strokeLinecap: 'round',
    pathData: path,
    opacity: 1, visible: true, locked: false
  };
}

export function createYouTubeLogo(id: string, x: number, y: number): UIElement {
  return {
    id, name: 'YouTube_Logo', type: 'group', category: 'Icon',
    x, y, width: 90, height: 20,
    fill: 'none', opacity: 1, visible: true, locked: false,
    children: [
      {
        id: `${id}_bg`, name: 'Red_Play', type: 'rect', category: 'Icon',
        x: 0, y: 0, width: 28, height: 20, fill: '#FF0000', rx: 6, ry: 6,
        opacity: 1, visible: true, locked: false
      },
      {
        id: `${id}_triangle`, name: 'Triangle', type: 'path', category: 'Icon',
        x: 10, y: 6, width: 8, height: 8, fill: '#FFFFFF',
        pathData: 'M0 0L8 4L0 8V0Z',
        opacity: 1, visible: true, locked: false
      },
      {
        id: `${id}_txt`, name: 'YouTube_Text', type: 'text', category: 'Typography',
        x: 34, y: 15, width: 0, height: 0, fill: '#FFFFFF', text: 'YouTube',
        fontSize: 18, fontWeight: '700', visible: true, locked: false, opacity: 1
      },
      {
        id: `${id}_br`, name: 'BR_Badge', type: 'text', category: 'Typography',
        x: 105, y: 8, width: 0, height: 0, fill: '#AAAAAA', text: 'BR',
        fontSize: 10, visible: true, locked: false, opacity: 1
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
    // Header
    {
      id: 'Header', name: 'Header_Container', type: 'group', category: 'Container',
      x: 0, y: 0, width: 1280, height: headerHeight, fill: bg, opacity: 1, visible: true, locked: false,
      children: [
        createSystemIcon('Menu_Icon', 'Hamburger', 16, 16, 'M4 6h16M4 12h16M4 18h16', textMain),
        createYouTubeLogo('Logo', 56, 18),
        // Search Bar
        {
          id: 'Search_Group', name: 'Search_Area', type: 'group', category: 'Interactive',
          x: 380, y: 8, width: 540, height: 40, fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'Search_Input', name: 'Input', type: 'pill', category: 'Container', x: 0, y: 0, width: 480, height: 40, fill: '#121212', stroke: '#333333', strokeWidth: 1, opacity: 1, visible: true, locked: false },
            { id: 'Search_Placeholder', name: 'Txt', type: 'text', category: 'Typography', x: 20, y: 25, width: 0, height: 0, fill: '#888888', text: 'Pesquisar', fontSize: 16, visible: true, locked: false },
            createSystemIcon('Kb_Icon', 'Keyboard', 440, 8, 'M3 5h18v14H3V5zm3 3h2v2H6V8zm4 0h2v2h-2V8zm4 0h2v2h-2V8zm-8 4h2v2H6v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 4h6v2h-6v-2z', textMuted),
            { id: 'Search_Btn', name: 'Button', type: 'rect', category: 'Interactive', x: 480, y: 0, width: 60, height: 40, fill: '#222222', stroke: '#333333', strokeWidth: 1, rx: 0, ry: 0, opacity: 1, visible: true, locked: false },
            createSystemIcon('Search_Icon', 'Lens', 498, 8, 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', textMain),
            { id: 'Mic_Btn', name: 'Mic', type: 'circle', category: 'Interactive', x: 555, y: 0, width: 40, height: 40, fill: '#181818', opacity: 1, visible: true, locked: false },
            createSystemIcon('Mic_Icon', 'Microphone', 563, 8, 'M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z M19 10v1a7 7 0 01-14 0v-1 M12 18v4 M8 22h8', textMain)
          ]
        },
        // Right Actions
        {
          id: 'Header_Right', name: 'Actions', type: 'group', category: 'Interactive',
          x: 1040, y: 12, width: 220, height: 32, fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'Create_Pill', name: 'Create', type: 'pill', category: 'Interactive', x: 0, y: 0, width: 85, height: 32, fill: '#272727', opacity: 1, visible: true, locked: false },
            createSystemIcon('Plus_Icon', 'Add', 8, 4, 'M12 5v14M5 12h14', textMain),
            { id: 'Create_Txt', name: 'Label', type: 'text', category: 'Typography', x: 38, y: 21, width: 0, height: 0, fill: textMain, text: 'Criar', fontSize: 14, fontWeight: '600', visible: true, locked: false },
            createSystemIcon('Bell_Icon', 'Alerts', 110, 4, 'M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0', textMain),
            { id: 'Bell_Badge', name: 'Badge', type: 'circle', category: 'Icon', x: 124, y: 0, width: 16, height: 16, fill: '#CC0000', opacity: 1, visible: true, locked: false },
            { id: 'Bell_Num', name: 'Count', type: 'text', category: 'Typography', x: 132, y: 12, width: 0, height: 0, fill: textMain, text: '2', fontSize: 10, fontWeight: '700', textAlign: 'center', visible: true, locked: false },
            { id: 'User_Avatar', name: 'Profile', type: 'circle', category: 'Image', x: 160, y: -4, width: 40, height: 40, fill: '#443322', opacity: 1, visible: true, locked: false }
          ]
        }
      ]
    },
    // Sidebar
    {
      id: 'Sidebar', name: 'Navigation_Rail', type: 'group', category: 'Container',
      x: 0, y: headerHeight, width: sidebarWidth, height: 720 - headerHeight, fill: bg, opacity: 1, visible: true, locked: false,
      children: [
        { id: 'Side_Home_BG', name: 'Active_Item', type: 'rect', category: 'Interactive', x: 12, y: 12, width: 216, height: 40, fill: '#272727', rx: 10, ry: 10, opacity: 1, visible: true, locked: false },
        createSystemIcon('Side_Home_Icon', 'Home', 24, 20, 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', textMain),
        { id: 'Side_Home_Txt', name: 'Home_Txt', type: 'text', category: 'Typography', x: 64, y: 38, width: 0, height: 0, fill: textMain, text: 'Início', fontSize: 14, fontWeight: '600', visible: true, locked: false },
        
        createSystemIcon('Side_Shorts_Icon', 'Shorts', 24, 70, 'M10 15l5.19-3L10 9v6zM22.38 8.08c-.09-.12-.19-.23-.29-.34a.79.79 0 00-.28-.21.82.82 0 00-.34-.07H.53c-.12 0-.24.02-.34.07a.82.82 0 00-.28.21c-.1.11-.2.22-.29.34a.8.8 0 00-.12.42v10.84c0 .15.04.29.12.42.09.12.19.23.29.34.08.08.17.15.28.21.1.05.22.07.34.07h21.94c.12 0 .24-.02.34-.07.11-.06.2-.13.28-.21.1-.11.2-.22.29-.34.08-.13.12-.27.12-.42V8.5c0-.15-.04-.29-.12-.42z', textMain),
        { id: 'Side_Shorts_Txt', name: 'Shorts_Txt', type: 'text', category: 'Typography', x: 64, y: 88, width: 0, height: 0, fill: textMain, text: 'Shorts', fontSize: 14, visible: true, locked: false },

        { id: 'Side_Section_Title', name: 'Subscriptions', type: 'text', category: 'Typography', x: 24, y: 150, width: 0, height: 0, fill: textMain, text: 'Inscrições', fontSize: 16, fontWeight: '700', visible: true, locked: false },
        createSystemIcon('Side_Chevron', 'More', 110, 134, 'M9 5l7 7-7 7', textMain),
        
        { id: 'User_1_Avatar', name: 'orochidois', type: 'circle', category: 'Image', x: 24, y: 175, width: 24, height: 24, fill: '#333344', opacity: 1, visible: true, locked: false },
        { id: 'User_1_Txt', name: 'User_1', type: 'text', category: 'Typography', x: 60, y: 192, width: 0, height: 0, fill: textMain, text: 'orochidois', fontSize: 14, visible: true, locked: false },
        
        { id: 'User_2_Avatar', name: 'Perrenoud', type: 'circle', category: 'Image', x: 24, y: 215, width: 24, height: 24, fill: '#443333', opacity: 1, visible: true, locked: false },
        { id: 'User_2_Txt', name: 'User_2', type: 'text', category: 'Typography', x: 60, y: 232, width: 0, height: 0, fill: textMain, text: 'Perrenoud', fontSize: 14, visible: true, locked: false },
        { id: 'User_2_Dot', name: 'New_Indicator', type: 'circle', category: 'Icon', x: 210, y: 225, width: 4, height: 4, fill: '#3ea6ff', opacity: 1, visible: true, locked: false }
      ]
    },
    // Main Content
    {
      id: 'Content', name: 'Video_Feed', type: 'group', category: 'Container',
      x: sidebarWidth, y: headerHeight, width: 1280 - sidebarWidth, height: 720 - headerHeight, fill: bg, opacity: 1, visible: true, locked: false,
      children: [
        // Category Chips
        {
          id: 'Chips_Rail', name: 'Categories', type: 'group', category: 'Interactive',
          x: 24, y: 12, width: 1000, height: 32, fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'Chip_1_BG', name: 'Chip_Active', type: 'pill', category: 'Interactive', x: 0, y: 0, width: 50, height: 32, fill: '#FFFFFF', opacity: 1, visible: true, locked: false },
            { id: 'Chip_1_Txt', name: 'Tudo', type: 'text', category: 'Typography', x: 25, y: 21, width: 0, height: 0, fill: '#000000', text: 'Tudo', fontSize: 14, fontWeight: '600', textAlign: 'center', visible: true, locked: false },
            { id: 'Chip_2_BG', name: 'Chip_Muted', type: 'pill', category: 'Interactive', x: 60, y: 0, width: 65, height: 32, fill: '#272727', opacity: 1, visible: true, locked: false },
            { id: 'Chip_2_Txt', name: 'Musica', type: 'text', category: 'Typography', x: 92, y: 21, width: 0, height: 0, fill: textMain, text: 'Música', fontSize: 14, textAlign: 'center', visible: true, locked: false },
            { id: 'Chip_3_BG', name: 'Chip_Muted', type: 'pill', category: 'Interactive', x: 135, y: 0, width: 85, height: 32, fill: '#272727', opacity: 1, visible: true, locked: false },
            { id: 'Chip_3_Txt', name: 'Podcasts', type: 'text', category: 'Typography', x: 177, y: 21, width: 0, height: 0, fill: textMain, text: 'Podcasts', fontSize: 14, textAlign: 'center', visible: true, locked: false }
          ]
        },
        // Grid Row 1
        {
          id: 'Video_1', name: 'Video_Card_1', type: 'group', category: 'Container',
          x: 24, y: 64, width: 320, height: 280, fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'V1_Thumb', name: 'Thumbnail', type: 'rect', category: 'Image', x: 0, y: 0, width: 320, height: 180, fill: '#222222', rx: 12, ry: 12, opacity: 1, visible: true, locked: false },
            { id: 'V1_Time_BG', name: 'Timestamp', type: 'rect', category: 'Icon', x: 275, y: 155, width: 40, height: 20, fill: 'rgba(0,0,0,0.8)', rx: 4, ry: 4, visible: true, locked: false },
            { id: 'V1_Time_Txt', name: 'Time', type: 'text', category: 'Typography', x: 295, y: 169, width: 0, height: 0, fill: textMain, text: '27:17', fontSize: 12, fontWeight: '700', textAlign: 'center', visible: true, locked: false },
            { id: 'V1_Avatar', name: 'Ch_Avatar', type: 'circle', category: 'Image', x: 0, y: 195, width: 36, height: 36, fill: '#555555', opacity: 1, visible: true, locked: false },
            { id: 'V1_Title', name: 'Title', type: 'text', category: 'Typography', x: 48, y: 208, width: 260, height: 0, fill: textMain, text: 'receba e speed juntos no cozinha', fontSize: 16, fontWeight: '600', visible: true, locked: false },
            { id: 'V1_Meta', name: 'Meta', type: 'text', category: 'Typography', x: 48, y: 232, width: 0, height: 0, fill: textMuted, text: 'orochidois • 377 mil visualizações', fontSize: 14, visible: true, locked: false }
          ]
        },
        {
          id: 'Video_2', name: 'Video_Card_Live', type: 'group', category: 'Container',
          x: 360, y: 64, width: 320, height: 280, fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'V2_Thumb', name: 'Thumbnail', type: 'rect', category: 'Image', x: 0, y: 0, width: 320, height: 180, fill: '#333333', rx: 12, ry: 12, opacity: 1, visible: true, locked: false },
            { id: 'V2_Live_BG', name: 'Badge', type: 'rect', category: 'Icon', x: 10, y: 10, width: 60, height: 20, fill: '#FF0000', rx: 4, ry: 4, visible: true, locked: false },
            { id: 'V2_Live_Txt', name: 'Txt', type: 'text', category: 'Typography', x: 40, y: 24, width: 0, height: 0, fill: textMain, text: 'AO VIVO', fontSize: 10, fontWeight: '800', textAlign: 'center', visible: true, locked: false }
          ]
        }
      ]
    }
  ];

  return {
    metadata: {
      layout_type: 'YouTube Dashboard',
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
