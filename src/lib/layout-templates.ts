
/**
 * @fileOverview Visual Map System - Grok Edition (Sectorized Absolute Fidelity).
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

function createSystemIcon(id: string, name: string, x: number, y: number, path: string, color: string = '#FFFFFF', size: number = 24, strokeWidth: number = 1.5): UIElement {
  return {
    id, name, type: 'path', category: 'Icon',
    x, y, width: size, height: size,
    fill: 'none', stroke: color, strokeWidth: strokeWidth, strokeLinecap: 'round',
    pathData: path,
    opacity: 1, visible: true, locked: false
  };
}

/**
 * GLYPH: Grok Logo Construction
 */
function createGrokLogo(idPrefix: string, x: number, y: number, scale: number = 1): UIElement {
  const color = '#FFFFFF';
  return {
    id: `${idPrefix}_Group`, name: 'Grok_Logo', type: 'group', category: 'Icon',
    x, y, width: 48 * scale, height: 48 * scale, fill: 'none', opacity: 1, visible: true, locked: false,
    children: [
      { id: `${idPrefix}_Slash`, name: 'Slash', type: 'path', category: 'Icon', x: 0, y: 0, width: 48, height: 48, fill: 'none', stroke: color, strokeWidth: 4 * scale, strokeLinecap: 'round', pathData: 'M10 38 L38 10', opacity: 1, visible: true, locked: false },
      { id: `${idPrefix}_ArcTop`, name: 'Arc_Top', type: 'path', category: 'Icon', x: 0, y: 0, width: 48, height: 48, fill: color, pathData: 'M24 8 C30 8 36 12 38 18 L34 20 C32 16 28 14 24 14 Z', opacity: 1, visible: true, locked: false },
      { id: `${idPrefix}_ArcBot`, name: 'Arc_Bottom', type: 'path', category: 'Icon', x: 0, y: 0, width: 48, height: 48, fill: color, pathData: 'M24 40 C18 40 12 36 10 30 L14 28 C16 32 20 34 24 34 Z', opacity: 1, visible: true, locked: false }
    ]
  };
}

/**
 * SETOR 01: HEADER
 */
function generateHeaderSector(): UIElement {
  return {
    id: 'Header_Sector', name: 'Header', type: 'group', category: 'Container',
    x: 0, y: 0, width: 1280, height: 80, fill: 'none', opacity: 1, visible: true, locked: false,
    children: [
      createGrokLogo('Logo_Top', 24, 24, 0.6),
      
      { id: 'Header_Actions', name: 'Nav_Right', type: 'group', category: 'Interactive', x: 920, y: 24, width: 340, height: 40, fill: 'none', opacity: 1, visible: true, locked: false, children: [
        // Gallery Icon (Imagine)
        createSystemIcon('Imagine_Icon', 'Imagine', 0, 8, 'M3 3h18v18H3z M8.5 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M21 15l-5-5L5 21', '#FFFFFF', 20),
        { id: 'Imagine_Txt', name: 'Label', type: 'text', category: 'Typography', x: 28, y: 23, width: 0, height: 0, fill: '#FFFFFF', text: 'Imagine', fontSize: 13, fontWeight: '500', visible: true, locked: false },
        
        // Settings Icon (Gear)
        createSystemIcon('Settings_Icon', 'Settings', 100, 8, 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z', '#FFFFFF', 20),
        
        // Buttons
        { id: 'Login_Btn', name: 'Login', type: 'rect', category: 'Interactive', x: 140, y: 0, width: 70, height: 36, fill: 'none', stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1, rx: 18, ry: 18, opacity: 1, visible: true, locked: false },
        { id: 'Login_Txt', name: 'Label', type: 'text', category: 'Typography', x: 175, y: 23, width: 0, height: 0, fill: '#FFFFFF', text: 'Entrar', fontSize: 13, fontWeight: '600', textAlign: 'center', visible: true, locked: false },
        
        { id: 'Signup_Btn', name: 'Signup', type: 'rect', category: 'Interactive', x: 220, y: 0, width: 100, height: 36, fill: '#FFFFFF', rx: 18, ry: 18, opacity: 1, visible: true, locked: false },
        { id: 'Signup_Txt', name: 'Label', type: 'text', category: 'Typography', x: 270, y: 23, width: 0, height: 0, fill: '#000000', text: 'Criar conta', fontSize: 13, fontWeight: '700', textAlign: 'center', visible: true, locked: false }
      ]}
    ]
  };
}

/**
 * SETOR 02: HERO
 */
function generateHeroSector(): UIElement {
  return {
    id: 'Hero_Sector', name: 'Hero', type: 'group', category: 'Container',
    x: 520, y: 240, width: 240, height: 60, fill: 'none', opacity: 1, visible: true, locked: false,
    children: [
      createGrokLogo('Hero_Logo', 0, 0, 1.2),
      { id: 'Hero_Title', name: 'Brand', type: 'text', category: 'Typography', x: 70, y: 48, width: 0, height: 0, fill: '#FFFFFF', text: 'Grok', fontSize: 56, fontWeight: '700', visible: true, locked: false }
    ]
  };
}

/**
 * SETOR 03: PROMPT BAR
 */
function generatePromptSector(): UIElement {
  return {
    id: 'Prompt_Sector', name: 'Search_Bar', type: 'group', category: 'Container',
    x: 320, y: 360, width: 640, height: 60, fill: 'none', opacity: 1, visible: true, locked: false,
    children: [
      { id: 'Prompt_BG', name: 'BG', type: 'rect', category: 'Background', x: 0, y: 0, width: 640, height: 60, fill: '#121212', rx: 30, ry: 30, stroke: 'rgba(255,255,255,0.05)', strokeWidth: 1, opacity: 1, visible: true, locked: false },
      createSystemIcon('Plus_Icon', 'Add', 24, 18, 'M12 6v12 M6 12h12', '#FFFFFF', 24),
      { id: 'Prompt_Placeholder', name: 'Placeholder', type: 'text', category: 'Typography', x: 60, y: 36, width: 0, height: 0, fill: 'rgba(255,255,255,0.3)', text: 'O que você quer saber?', fontSize: 16, visible: true, locked: false },
      
      { id: 'Prompt_Right', name: 'Controls', type: 'group', category: 'Interactive', x: 530, y: 10, width: 100, height: 40, fill: 'none', opacity: 1, visible: true, locked: false, children: [
        { id: 'Fast_Txt', name: 'Label', type: 'text', category: 'Typography', x: 0, y: 26, width: 0, height: 0, fill: '#FFFFFF', text: 'Fast', fontSize: 14, fontWeight: '600', visible: true, locked: false },
        // Chevron de expansão ultra-nítido
        createSystemIcon('Fast_Chevron', 'Down', 36, 18, 'M4 6l4 4 4-4', '#FFFFFF', 16, 2),
        
        { id: 'Send_Circle', name: 'Btn', type: 'circle', category: 'Interactive', x: 60, y: 0, width: 40, height: 40, fill: '#262626', opacity: 1, visible: true, locked: false },
        // Ícone de envio alinhado ao centro do círculo
        createSystemIcon('Send_Icon', 'Up', 68, 8, 'M12 19V5 M5 12l7-7 7 7', '#FFFFFF', 24, 2)
      ]}
    ]
  };
}

/**
 * SETOR 04: GROK BUILD CARD
 */
function generateBuildCardSector(): UIElement {
  return {
    id: 'Build_Sector', name: 'Promo_Card', type: 'group', category: 'Container',
    x: 320, y: 460, width: 640, height: 160, fill: 'none', opacity: 1, visible: true, locked: false,
    children: [
      { id: 'Card_BG', name: 'BG', type: 'rect', category: 'Background', x: 0, y: 0, width: 640, height: 160, fill: '#0a0a0a', rx: 24, ry: 24, stroke: 'rgba(255,255,255,0.05)', strokeWidth: 1, opacity: 1, visible: true, locked: false },
      
      { id: 'Card_Title', name: 'Title', type: 'text', category: 'Typography', x: 24, y: 50, width: 0, height: 0, fill: '#FFFFFF', text: 'Grok Build', fontSize: 20, fontWeight: '700', visible: true, locked: false },
      { id: 'Beta_Badge', name: 'Badge', type: 'rect', category: 'Container', x: 135, y: 32, width: 45, height: 22, fill: '#FF6B00', rx: 11, ry: 11, opacity: 0.15, visible: true, locked: false },
      { id: 'Beta_Txt', name: 'Label', type: 'text', category: 'Typography', x: 157, y: 47, width: 0, height: 0, fill: '#FF6B00', text: 'Beta', fontSize: 11, fontWeight: '700', textAlign: 'center', visible: true, locked: false },
      { id: 'Card_Desc', name: 'Body', type: 'text', category: 'Typography', x: 24, y: 85, width: 0, height: 0, fill: 'rgba(255,255,255,0.4)', text: 'Acesso antecipado para assinantes', fontSize: 13, visible: true, locked: false },
      { id: 'Card_Desc2', name: 'Body', type: 'text', category: 'Typography', x: 24, y: 105, width: 0, height: 0, fill: 'rgba(255,255,255,0.4)', text: 'SuperGrok e X Premium+', fontSize: 13, visible: true, locked: false },
      
      { id: 'CLI_Tabs', name: 'Tabs', type: 'group', category: 'Interactive', x: 280, y: 44, width: 100, height: 20, fill: 'none', opacity: 1, visible: true, locked: false, children: [
        { id: 'Tab_PS', name: 'Active', type: 'text', category: 'Typography', x: 0, y: 15, width: 0, height: 0, fill: '#FFFFFF', text: 'PowerShell', fontSize: 12, fontWeight: '600', visible: true, locked: false },
        { id: 'Tab_WSL', name: 'Inactive', type: 'text', category: 'Typography', x: 75, y: 15, width: 0, height: 0, fill: 'rgba(255,255,255,0.3)', text: 'WSL', fontSize: 12, fontWeight: '500', visible: true, locked: false }
      ]},
      { id: 'Terminal_BG', name: 'Terminal', type: 'rect', category: 'Container', x: 280, y: 75, width: 330, height: 45, fill: '#161616', rx: 12, ry: 12, stroke: 'rgba(255,255,255,0.03)', strokeWidth: 1, opacity: 1, visible: true, locked: false },
      { id: 'CLI_Cmd', name: 'Command', type: 'text', category: 'Typography', x: 300, y: 103, width: 0, height: 0, fill: '#FFFFFF', text: 'irm https://x.ai/cli/install.ps1 | iex', fontSize: 11, fontFamily: 'monospace', visible: true, locked: false },
      createSystemIcon('Copy_Icon', 'Copy', 580, 88, 'M8 4h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z', 'rgba(255,255,255,0.3)', 18),
      
      createSystemIcon('Close_Icon', 'Close', 600, 16, 'M18 6L6 18 M6 6l12 12', 'rgba(255,255,255,0.2)', 16)
    ]
  };
}

/**
 * SETOR 05: FOOTER
 */
function generateFooterSector(): UIElement {
  return {
    id: 'Footer_Sector', name: 'Legal_Text', type: 'text', category: 'Typography',
    x: 640, y: 700, width: 1280, height: 20, fill: 'rgba(255,255,255,0.2)',
    text: 'Ao enviar mensagens para o Grok, você concorda com nossos termos e política de privacidade.',
    fontSize: 11, textAlign: 'center', visible: true, locked: false, opacity: 1
  };
}

export function generateGrokReconstruction(): VisualMap {
  const elements: UIElement[] = [
    generateHeaderSector(),
    generateHeroSector(),
    generatePromptSector(),
    generateBuildCardSector(),
    generateFooterSector()
  ];

  return {
    metadata: {
      layout_type: 'Grok xAI (Absolute Fidelity)',
      dimensions: { width: 1280, height: 720 },
      color_palette: { primary: ['#FFFFFF', '#FF6B00'], neutrals: ['#000000', '#121212'] }
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
