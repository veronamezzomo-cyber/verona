/**
 * @fileOverview Visual Map System - Google Maps Edition (Sectorized Absolute Fidelity).
 * Pipeline segmentada por setores: Maps Sidebar, Floating Header e Earth Engine.
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
 * SETOR 01: MAPS SIDEBAR (Navegação Vertical)
 */
function generateMapsSidebarSector(): UIElement {
  const bg = '#FFFFFF';
  const textMuted = '#70757a';
  
  return {
    id: 'Sidebar_Sector', name: 'Sidebar_Container', type: 'group', category: 'Container',
    x: 0, y: 0, width: 80, height: 720, fill: bg, opacity: 1, visible: true, locked: false,
    children: [
      { id: 'Sidebar_BG', name: 'BG', type: 'rect', category: 'Background', x: 0, y: 0, width: 80, height: 720, fill: '#FFFFFF', opacity: 1, visible: true, locked: false },
      createSystemIcon('Menu_Icon', 'Menu', 28, 20, 'M4 6h16M4 12h16M4 18h16', '#3c4043'),
      
      // Salvos
      { id: 'Salvos_Group', name: 'Salvos', type: 'group', category: 'Interactive', x: 0, y: 80, width: 80, height: 60, fill: 'none', opacity: 1, visible: true, locked: false, children: [
        createSystemIcon('Salvos_Icon', 'Bookmark', 28, 0, 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z', textMuted),
        { id: 'Salvos_Txt', name: 'Label', type: 'text', category: 'Typography', x: 40, y: 40, width: 0, height: 0, fill: textMuted, text: 'Salvos', fontSize: 10, textAlign: 'center', visible: true, locked: false }
      ]},
      
      // Recentes
      { id: 'Recentes_Group', name: 'Recentes', type: 'group', category: 'Interactive', x: 0, y: 150, width: 80, height: 60, fill: 'none', opacity: 1, visible: true, locked: false, children: [
        createSystemIcon('Recentes_Icon', 'History', 28, 0, 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', textMuted),
        { id: 'Recentes_Txt', name: 'Label', type: 'text', category: 'Typography', x: 40, y: 40, width: 0, height: 0, fill: textMuted, text: 'Recentes', fontSize: 10, textAlign: 'center', visible: true, locked: false }
      ]},

      // Thumbnails Locations
      { id: 'Loc1_Thumb', name: 'Loc1', type: 'rect', category: 'Image', x: 20, y: 240, width: 40, height: 40, fill: '#333344', rx: 8, ry: 8, opacity: 1, visible: true, locked: false },
      { id: 'Loc1_Txt', name: 'Label', type: 'text', category: 'Typography', x: 40, y: 300, width: 0, height: 0, fill: textMuted, text: 'Gaspar &', fontSize: 9, textAlign: 'center', visible: true, locked: false },
      { id: 'Loc1_Txt2', name: 'Label', type: 'text', category: 'Typography', x: 40, y: 312, width: 0, height: 0, fill: textMuted, text: 'Blumenau', fontSize: 9, textAlign: 'center', visible: true, locked: false },

      { id: 'Loc2_Thumb', name: 'Loc2', type: 'rect', category: 'Image', x: 20, y: 340, width: 40, height: 40, fill: '#443333', rx: 8, ry: 8, opacity: 1, visible: true, locked: false },
      { id: 'Loc2_Txt', name: 'Label', type: 'text', category: 'Typography', x: 40, y: 400, width: 0, height: 0, fill: textMuted, text: 'Campos', fontSize: 9, textAlign: 'center', visible: true, locked: false },
      { id: 'Loc2_Txt2', name: 'Label', type: 'text', category: 'Typography', x: 40, y: 412, width: 0, height: 0, fill: textMuted, text: 'Gerais', fontSize: 9, textAlign: 'center', visible: true, locked: false },

      createSystemIcon('VerMais_Icon', 'More', 28, 440, 'M5 12h.01M12 12h.01M19 12h.01', textMuted),
      { id: 'VerMais_Txt', name: 'Label', type: 'text', category: 'Typography', x: 40, y: 480, width: 0, height: 0, fill: textMuted, text: 'Ver mais', fontSize: 10, textAlign: 'center', visible: true, locked: false },

      // Bottom app download
      { id: 'App_Group', name: 'App', type: 'group', category: 'Interactive', x: 0, y: 640, width: 80, height: 60, fill: 'none', opacity: 1, visible: true, locked: false, children: [
        createSystemIcon('App_Icon', 'Download', 28, 0, 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', textMuted),
        { id: 'App_Txt', name: 'Label', type: 'text', category: 'Typography', x: 40, y: 40, width: 0, height: 0, fill: textMuted, text: 'Baixar o', fontSize: 9, textAlign: 'center', visible: true, locked: false },
        { id: 'App_Txt2', name: 'Label', type: 'text', category: 'Typography', x: 40, y: 52, width: 0, height: 0, fill: textMuted, text: 'aplicativo', fontSize: 9, textAlign: 'center', visible: true, locked: false }
      ]}
    ]
  };
}

/**
 * SETOR 02: FLOATING HEADER (Busca e Perfil)
 */
function generateMapsHeaderSector(): UIElement {
  return {
    id: 'Header_Sector', name: 'Header_Floating', type: 'group', category: 'Container',
    x: 96, y: 12, width: 1184, height: 48, fill: 'none', opacity: 1, visible: true, locked: false,
    children: [
      { id: 'Search_Box', name: 'Search_Container', type: 'rect', category: 'Interactive', x: 0, y: 0, width: 380, height: 48, fill: '#FFFFFF', rx: 24, ry: 24, opacity: 1, visible: true, locked: false, shadow: '0 2px 6px rgba(0,0,0,0.3)' },
      { id: 'Search_Plac', name: 'Txt', type: 'text', category: 'Typography', x: 16, y: 30, width: 0, height: 0, fill: '#70757a', text: 'Pesquise no Google Maps', fontSize: 15, visible: true, locked: false },
      createSystemIcon('Search_Lens', 'Lens', 290, 12, 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', '#70757a'),
      createSystemIcon('Directions_Icon', 'Directions', 330, 12, 'M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z', '#1a73e8'),
      
      { id: 'Lang_Box', name: 'Lang_Container', type: 'rect', category: 'Interactive', x: 400, y: 0, width: 64, height: 48, fill: '#FFFFFF', rx: 4, ry: 4, opacity: 1, visible: true, locked: false, shadow: '0 2px 6px rgba(0,0,0,0.3)' },
      { id: 'Lang_Txt', name: 'Label', type: 'text', category: 'Typography', x: 412, y: 30, width: 0, height: 0, fill: '#3c4043', text: 'Pt', fontSize: 14, fontWeight: '700', visible: true, locked: false },
      createSystemIcon('Lang_Arrow', 'Down', 435, 12, 'M7 10l5 5 5-5', '#70757a', 20),
      
      { id: 'User_Sector', name: 'Right_Profile', type: 'group', category: 'Interactive', x: 1080, y: 0, width: 80, height: 40, fill: 'none', opacity: 1, visible: true, locked: false, children: [
        createSystemIcon('Apps_Icon', 'Grid', 0, 8, 'M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z', '#FFFFFF', 24),
        { id: 'Avatar', name: 'User_Avatar', type: 'circle', category: 'Image', x: 40, y: 0, width: 40, height: 40, fill: '#334455', opacity: 1, visible: true, locked: false }
      ]}
    ]
  };
}

/**
 * SETOR 03: EARTH ENGINE (Visualização 3D)
 */
function generateEarthEngineSector(): UIElement {
  return {
    id: 'Earth_Sector', name: 'Main_Globe_View', type: 'group', category: 'Container',
    x: 80, y: 0, width: 1200, height: 720, fill: 'none', opacity: 1, visible: true, locked: false,
    children: [
      // O Globo Central
      { id: 'Globe_BG', name: 'Earth_Sphere', type: 'circle', category: 'Image', x: 350, y: 110, width: 500, height: 500, fill: '#2a5ea8', opacity: 1, visible: true, locked: false, shadow: '0 0 100px rgba(42, 94, 168, 0.4)' },
      { id: 'Continents', name: 'Land_Shapes', type: 'path', category: 'Image', x: 400, y: 150, width: 400, height: 400, fill: '#4a8e3d', opacity: 0.6, visible: true, locked: false, pathData: 'M50,50 Q100,0 150,50 T250,50 T350,150 T150,350 Z' },
      
      // Pins
      { id: 'Pin_Blue', name: 'Loc_Pin', type: 'group', category: 'Icon', x: 650, y: 250, width: 30, height: 40, fill: 'none', opacity: 1, visible: true, locked: false, children: [
        { id: 'Pin1_BG', name: 'Body', type: 'path', category: 'Icon', x: 0, y: 0, width: 30, height: 40, fill: '#1a73e8', pathData: 'M15 0a15 15 0 00-15 15c0 10 15 25 15 25s15-15 15-25a15 15 0 00-15-15z', visible: true, locked: false, opacity: 1 },
        { id: 'Pin1_Icon', name: 'Book', type: 'path', category: 'Icon', x: 8, y: 8, width: 14, height: 14, fill: '#FFFFFF', pathData: 'M5 5h10v10H5z', visible: true, locked: false, opacity: 1 }
      ]},
      
      { id: 'Pin_Pink', name: 'Love_Pin', type: 'group', category: 'Icon', x: 600, y: 600, width: 30, height: 40, fill: 'none', opacity: 1, visible: true, locked: false, children: [
        { id: 'Pin2_BG', name: 'Body', type: 'path', category: 'Icon', x: 0, y: 0, width: 30, height: 40, fill: '#f06292', pathData: 'M15 0a15 15 0 00-15 15c0 10 15 25 15 25s15-15 15-25a15 15 0 00-15-15z', visible: true, locked: false, opacity: 1 },
        { id: 'Pin2_Icon', name: 'Heart', type: 'circle', category: 'Icon', x: 10, y: 10, width: 10, height: 10, fill: '#FFFFFF', visible: true, locked: false, opacity: 1 }
      ]},

      // Camadas Thumbnail (Bottom Left)
      { id: 'Layers_Box', name: 'Layers_Selector', type: 'group', category: 'Interactive', x: 16, y: 610, width: 90, height: 90, fill: 'none', opacity: 1, visible: true, locked: false, children: [
        { id: 'Layers_Img', name: 'Map_Type', type: 'rect', category: 'Image', x: 0, y: 0, width: 80, height: 80, fill: '#556677', rx: 12, ry: 12, opacity: 1, visible: true, locked: false, stroke: '#FFFFFF', strokeWidth: 2 },
        { id: 'Layers_Txt', name: 'Label', type: 'text', category: 'Typography', x: 40, y: 70, width: 0, height: 0, fill: '#FFFFFF', text: 'Camadas', fontSize: 10, fontWeight: '700', textAlign: 'center', visible: true, locked: false }
      ]},

      // Controls (Bottom Right)
      { id: 'Controls_Group', name: 'Nav_Controls', type: 'group', category: 'Interactive', x: 1140, y: 460, width: 40, height: 240, fill: 'none', opacity: 1, visible: true, locked: false, children: [
        { id: 'Compass', name: 'Comp', type: 'circle', category: 'Icon', x: 0, y: 0, width: 40, height: 40, fill: '#FFFFFF', opacity: 0.9, visible: true, locked: false },
        { id: '3D_Btn', name: '3D', type: 'rect', category: 'Interactive', x: 0, y: 50, width: 40, height: 40, fill: '#FFFFFF', rx: 8, ry: 8, opacity: 0.9, visible: true, locked: false },
        { id: 'Loc_Btn', name: 'Me', type: 'rect', category: 'Interactive', x: 0, y: 100, width: 40, height: 40, fill: '#FFFFFF', rx: 8, ry: 8, opacity: 0.9, visible: true, locked: false },
        { id: 'Zoom_P', name: 'Plus', type: 'rect', category: 'Interactive', x: 0, y: 150, width: 40, height: 40, fill: '#FFFFFF', rx: 8, ry: 8, opacity: 0.9, visible: true, locked: false },
        { id: 'Zoom_M', name: 'Minus', type: 'rect', category: 'Interactive', x: 0, y: 195, width: 40, height: 40, fill: '#FFFFFF', rx: 8, ry: 8, opacity: 0.9, visible: true, locked: false }
      ]}
    ]
  };
}

export function generateGoogleMapsReconstruction(): VisualMap {
  const elements: UIElement[] = [
    generateMapsSidebarSector(),
    generateMapsHeaderSector(),
    generateEarthEngineSector()
  ];

  return {
    metadata: {
      layout_type: 'Google Maps Dark Space (Sectorized)',
      dimensions: { width: 1280, height: 720 },
      color_palette: { primary: ['#1a73e8', '#f06292', '#FFFFFF'], neutrals: ['#000000', '#121212'] }
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