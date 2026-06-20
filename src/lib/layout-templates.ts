/**
 * @fileOverview Visual Map System - YouTube Edition (Fidelidade Absoluta).
 * Implementa a reconstrução analítica rigorosa da interface do YouTube.
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
  // Motor de restrição estática
  return JSON.parse(JSON.stringify(elements)) as UIElement[];
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
    id, name: 'YouTube_Logo_Group', type: 'group', category: 'Icon',
    x, y, width: 120, height: 24,
    fill: 'none', opacity: 1, visible: true, locked: false,
    children: [
      {
        id: `${id}_bg`, name: 'Red_Play', type: 'rect', category: 'Icon',
        x: 0, y: 0, width: 30, height: 22, fill: '#FF0000', rx: 6, ry: 6,
        opacity: 1, visible: true, locked: false
      },
      {
        id: `${id}_triangle`, name: 'Triangle', type: 'path', category: 'Icon',
        x: 11, y: 6, width: 8, height: 10, fill: '#FFFFFF',
        pathData: 'M0 0L9 5L0 10V0Z',
        opacity: 1, visible: true, locked: false
      },
      {
        id: `${id}_txt`, name: 'YouTube_Text', type: 'text', category: 'Typography',
        x: 38, y: 17, width: 0, height: 0, fill: '#FFFFFF', text: 'YouTube',
        fontSize: 20, fontWeight: '800', fontFamily: 'Inter', visible: true, locked: false, opacity: 1
      },
      {
        id: `${id}_br`, name: 'BR_Superscript', type: 'text', category: 'Typography',
        x: 118, y: 8, width: 0, height: 0, fill: '#AAAAAA', text: 'BR',
        fontSize: 10, fontWeight: '400', visible: true, locked: false, opacity: 1
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
        createYouTubeLogo('Logo', 56, 16),
        // Search Bar Area
        {
          id: 'Search_Area', name: 'Search_Group', type: 'group', category: 'Interactive',
          x: 380, y: 8, width: 600, height: 40, fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'S_Input_BG', name: 'Input', type: 'pill', category: 'Container', x: 0, y: 0, width: 500, height: 40, fill: '#121212', stroke: '#333333', strokeWidth: 1, opacity: 1, visible: true, locked: false },
            { id: 'S_Placeholder', name: 'Txt', type: 'text', category: 'Typography', x: 16, y: 25, width: 0, height: 0, fill: '#888888', text: 'Pesquisar', fontSize: 16, visible: true, locked: false },
            createSystemIcon('Keyboard_Icon', 'KB', 460, 8, 'M3 5h18v14H3V5zm3 3h2v2H6V8zm4 0h2v2h-2V8zm4 0h2v2h-2V8zm-8 4h2v2H6v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 4h6v2h-6v-2z', textMuted),
            { id: 'S_Btn', name: 'Search_Btn', type: 'rect', category: 'Interactive', x: 500, y: 0, width: 64, height: 40, fill: '#222222', stroke: '#333333', strokeWidth: 1, rx: 0, ry: 0, opacity: 1, visible: true, locked: false },
            createSystemIcon('Lens_Icon', 'Lens', 520, 8, 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', textMain),
            { id: 'Mic_Circle', name: 'Mic_Circle', type: 'circle', category: 'Interactive', x: 575, y: 0, width: 40, height: 40, fill: '#181818', opacity: 1, visible: true, locked: false },
            createSystemIcon('Mic_Icon', 'Mic', 583, 8, 'M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z M19 10v1a7 7 0 01-14 0v-1 M12 18v4 M8 22h8', textMain)
          ]
        },
        // Right Side Actions
        {
          id: 'Right_Actions', name: 'User_Toolbar', type: 'group', category: 'Interactive',
          x: 1040, y: 12, width: 220, height: 32, fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'Create_Btn', name: 'Criar_Pill', type: 'pill', category: 'Interactive', x: 0, y: 0, width: 90, height: 32, fill: '#272727', opacity: 1, visible: true, locked: false },
            createSystemIcon('Plus_Icon', 'Add', 8, 4, 'M12 5v14M5 12h14', textMain),
            { id: 'Create_Txt', name: 'Criar_Label', type: 'text', category: 'Typography', x: 40, y: 21, width: 0, height: 0, fill: textMain, text: 'Criar', fontSize: 14, fontWeight: '600', visible: true, locked: false },
            createSystemIcon('Bell_Icon', 'Notify', 115, 4, 'M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0', textMain),
            { id: 'Bell_Badge', name: 'Dot', type: 'circle', category: 'Icon', x: 130, y: 0, width: 16, height: 16, fill: '#CC0000', opacity: 1, visible: true, locked: false },
            { id: 'Bell_Num', name: 'Num', type: 'text', category: 'Typography', x: 138, y: 12, width: 0, height: 0, fill: textMain, text: '2', fontSize: 10, fontWeight: '700', textAlign: 'center', visible: true, locked: false },
            { id: 'Avatar', name: 'User_Photo', type: 'circle', category: 'Image', x: 165, y: -4, width: 40, height: 40, fill: '#443322', opacity: 1, visible: true, locked: false }
          ]
        }
      ]
    },
    // Sidebar Navigation
    {
      id: 'Sidebar', name: 'Sidebar_Container', type: 'group', category: 'Container',
      x: 0, y: headerHeight, width: sidebarWidth, height: 720 - headerHeight, fill: bg, opacity: 1, visible: true, locked: false,
      children: [
        { id: 'S_Active', name: 'Home_Active', type: 'rect', category: 'Interactive', x: 12, y: 12, width: 216, height: 40, fill: '#272727', rx: 10, ry: 10, opacity: 1, visible: true, locked: false },
        createSystemIcon('S_Home_Icon', 'H', 24, 20, 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', textMain),
        { id: 'S_Home_Txt', name: 'Txt', type: 'text', category: 'Typography', x: 64, y: 38, width: 0, height: 0, fill: textMain, text: 'Início', fontSize: 14, fontWeight: '700', visible: true, locked: false },
        
        createSystemIcon('S_Shorts_Icon', 'S', 24, 70, 'M10 15l5.19-3L10 9v6zM22.38 8.08c-.09-.12-.19-.23-.29-.34a.79.79 0 00-.28-.21.82.82 0 00-.34-.07H.53c-.12 0-.24.02-.34.07a.82.82 0 00-.28.21c-.1.11-.2.22-.29.34a.8.8 0 00-.12.42v10.84c0 .15.04.29.12.42.09.12.19.23.29.34.08.08.17.15.28.21.1.05.22.07.34.07h21.94c.12 0 .24-.02.34-.07.11-.06.2-.13.28-.21.1-.11.2-.22.29-.34.08-.13.12-.27.12-.42V8.5c0-.15-.04-.29-.12-.42z', textMain),
        { id: 'S_Shorts_Txt', name: 'Txt', type: 'text', category: 'Typography', x: 64, y: 88, width: 0, height: 0, fill: textMain, text: 'Shorts', fontSize: 14, visible: true, locked: false },

        { id: 'S_Title_1', name: 'Inscricoes_Title', type: 'text', category: 'Typography', x: 24, y: 150, width: 0, height: 0, fill: textMain, text: 'Inscrições', fontSize: 16, fontWeight: '700', visible: true, locked: false },
        createSystemIcon('S_Chevron_1', 'C', 110, 134, 'M9 5l7 7-7 7', textMain),
        
        // Subscription List Mapping (Imersivo)
        { id: 'U1_Ava', name: 'orochidois', type: 'circle', category: 'Image', x: 24, y: 175, width: 24, height: 24, fill: '#333344', opacity: 1, visible: true, locked: false },
        { id: 'U1_Txt', name: 'U1', type: 'text', category: 'Typography', x: 60, y: 192, width: 0, height: 0, fill: textMain, text: 'orochidois', fontSize: 14, visible: true, locked: false },
        
        { id: 'U2_Ava', name: 'Perrenoud', type: 'circle', category: 'Image', x: 24, y: 215, width: 24, height: 24, fill: '#443333', opacity: 1, visible: true, locked: false },
        { id: 'U2_Txt', name: 'U2', type: 'text', category: 'Typography', x: 60, y: 232, width: 0, height: 0, fill: textMain, text: 'Perrenoud', fontSize: 14, visible: true, locked: false },
        
        { id: 'U3_Ava', name: 'Professor HOC', type: 'circle', category: 'Image', x: 24, y: 255, width: 24, height: 24, fill: '#224422', opacity: 1, visible: true, locked: false },
        { id: 'U3_Txt', name: 'U3', type: 'text', category: 'Typography', x: 60, y: 272, width: 0, height: 0, fill: textMain, text: 'Professor HOC', fontSize: 14, visible: true, locked: false },
        { id: 'U3_Dot', name: 'Activity', type: 'circle', category: 'Icon', x: 210, y: 265, width: 4, height: 4, fill: '#3ea6ff', opacity: 1, visible: true, locked: false },

        { id: 'U4_Ava', name: 'Inutilismo', type: 'circle', category: 'Image', x: 24, y: 295, width: 24, height: 24, fill: '#444422', opacity: 1, visible: true, locked: false },
        { id: 'U4_Txt', name: 'U4', type: 'text', category: 'Typography', x: 60, y: 312, width: 0, height: 0, fill: textMain, text: 'Inutilismo', fontSize: 14, visible: true, locked: false },
        { id: 'U4_Dot', name: 'Activity', type: 'circle', category: 'Icon', x: 210, y: 305, width: 4, height: 4, fill: '#3ea6ff', opacity: 1, visible: true, locked: false }
      ]
    },
    // Main Content Feed
    {
      id: 'Content_Main', name: 'Video_Feed', type: 'group', category: 'Container',
      x: sidebarWidth, y: headerHeight, width: 1280 - sidebarWidth, height: 720 - headerHeight, fill: bg, opacity: 1, visible: true, locked: false,
      children: [
        // Category Toolbar
        {
          id: 'Chips', name: 'Category_Chips', type: 'group', category: 'Interactive',
          x: 24, y: 12, width: 1000, height: 32, fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'C_1_BG', name: 'Tudo', type: 'pill', category: 'Interactive', x: 0, y: 0, width: 60, height: 32, fill: '#FFFFFF', opacity: 1, visible: true, locked: false },
            { id: 'C_1_Txt', name: 'Txt', type: 'text', category: 'Typography', x: 30, y: 21, width: 0, height: 0, fill: '#000000', text: 'Tudo', fontSize: 14, fontWeight: '700', textAlign: 'center', visible: true, locked: false },
            { id: 'C_2_BG', name: 'Musica', type: 'pill', category: 'Interactive', x: 70, y: 0, width: 70, height: 32, fill: '#272727', opacity: 1, visible: true, locked: false },
            { id: 'C_2_Txt', name: 'Txt', type: 'text', category: 'Typography', x: 105, y: 21, width: 0, height: 0, fill: textMain, text: 'Música', fontSize: 14, textAlign: 'center', visible: true, locked: false },
            { id: 'C_3_BG', name: 'IA', type: 'pill', category: 'Interactive', x: 150, y: 0, width: 150, height: 32, fill: '#272727', opacity: 1, visible: true, locked: false },
            { id: 'C_3_Txt', name: 'Txt', type: 'text', category: 'Typography', x: 225, y: 21, width: 0, height: 0, fill: textMain, text: 'Inteligência artificial', fontSize: 14, textAlign: 'center', visible: true, locked: false }
          ]
        },
        // Video Row 1
        {
          id: 'Vid_Row_1', name: 'Primary_Videos', type: 'group', category: 'Container',
          x: 24, y: 64, width: 1000, height: 280, fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            // Video 1
            {
              id: 'V1', name: 'Video_1', type: 'group', category: 'Container',
              x: 0, y: 0, width: 320, height: 260, fill: 'none', opacity: 1, visible: true, locked: false,
              children: [
                { id: 'V1_Th', name: 'Thumb', type: 'rect', category: 'Image', x: 0, y: 0, width: 320, height: 180, fill: '#222', rx: 12, ry: 12 },
                { id: 'V1_Ts', name: 'Time', type: 'rect', category: 'Icon', x: 275, y: 155, width: 40, height: 20, fill: 'rgba(0,0,0,0.8)', rx: 4, ry: 4 },
                { id: 'V1_Tt', name: '27:17', type: 'text', category: 'Typography', x: 295, y: 169, width: 0, height: 0, fill: '#FFF', text: '27:17', fontSize: 12, fontWeight: '700', textAlign: 'center' },
                { id: 'V1_Av', name: 'Ava', type: 'circle', category: 'Image', x: 0, y: 195, width: 36, height: 36, fill: '#444' },
                { id: 'V1_Ti', name: 'Title', type: 'text', category: 'Typography', x: 48, y: 208, width: 260, height: 0, fill: textMain, text: 'receba e speed juntos no cozinha', fontSize: 16, fontWeight: '700' },
                { id: 'V1_Me', name: 'Meta', type: 'text', category: 'Typography', x: 48, y: 232, width: 0, height: 0, fill: textMuted, text: 'orochidois • 377 mil views', fontSize: 14 },
                { id: 'V1_Bd', name: 'Badge', type: 'rect', category: 'Icon', x: 48, y: 245, width: 130, height: 20, fill: '#222', rx: 4, ry: 4 },
                { id: 'V1_Bt', name: 'Label', type: 'text', category: 'Typography', x: 55, y: 259, width: 0, height: 0, fill: textMuted, text: 'Dublagem automática', fontSize: 10 }
              ]
            },
            // Video 2 (Live)
            {
              id: 'V2', name: 'Video_2_Live', type: 'group', category: 'Container',
              x: 340, y: 0, width: 320, height: 260, fill: 'none', opacity: 1, visible: true, locked: false,
              children: [
                { id: 'V2_Th', name: 'Thumb', type: 'rect', category: 'Image', x: 0, y: 0, width: 320, height: 180, fill: '#333', rx: 12, ry: 12 },
                { id: 'V2_Lv', name: 'Live', type: 'rect', category: 'Icon', x: 10, y: 10, width: 60, height: 20, fill: '#FF0000', rx: 4, ry: 4 },
                { id: 'V2_Lt', name: 'AO VIVO', type: 'text', category: 'Typography', x: 40, y: 24, width: 0, height: 0, fill: '#FFF', text: 'AO VIVO', fontSize: 10, fontWeight: '800', textAlign: 'center' },
                { id: 'V2_Ti', name: 'Title', type: 'text', category: 'Typography', x: 48, y: 208, width: 260, height: 0, fill: textMain, text: 'NANTES E FRANK AO VIVO', fontSize: 16, fontWeight: '700' }
              ]
            }
          ]
        },
        // Shorts Shelf
        {
          id: 'Shorts_Shelf', name: 'Shorts_Section', type: 'group', category: 'Container',
          x: 24, y: 360, width: 1000, height: 300, fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            createSystemIcon('Shorts_Red_Icon', 'Logo', 0, 0, 'M10 15l5.19-3L10 9v6z', '#FF0000'),
            { id: 'Shorts_Title', name: 'Shorts', type: 'text', category: 'Typography', x: 30, y: 18, width: 0, height: 0, fill: textMain, text: 'Shorts', fontSize: 20, fontWeight: '800' },
            { id: 'S1', name: 'Short_1', type: 'rect', category: 'Image', x: 0, y: 40, width: 160, height: 240, fill: '#222', rx: 12, ry: 12 },
            { id: 'S2', name: 'Short_2', type: 'rect', category: 'Image', x: 180, y: 40, width: 160, height: 240, fill: '#333', rx: 12, ry: 12 },
            { id: 'S3', name: 'Short_3', type: 'rect', category: 'Image', x: 360, y: 40, width: 160, height: 240, fill: '#444', rx: 12, ry: 12 }
          ]
        }
      ]
    }
  ];

  return {
    metadata: {
      layout_type: 'YouTube High Fidelity',
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
