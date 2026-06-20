/**
 * @fileOverview Visual Map System - Enterprise Motion Edition.
 */

export type UIElementType = 'rect' | 'circle' | 'text' | 'group' | 'path' | 'pill' | 'capsule';

export interface VisualMetrics {
  padding?: { top: number; right: number; bottom: number; left: number };
  margin?: { top: number; right: number; bottom: number; left: number };
  gap?: number;
  fidelityScore?: number;
}

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
  
  // Design System Tokens
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'round' | 'butt' | 'square';
  rx?: number;
  ry?: number;
  
  // Effects
  shadow?: string; // Format: "dx dy blur color"
  blur?: number;
  
  // Typography
  text?: string;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';
  lineHeight?: number;
  
  // Path Data
  pathData?: string;
  
  // Motion Logic
  animationHint?: AnimationHint;
  
  // Estrutura
  children?: UIElement[];
  visible: boolean;
  locked: boolean;
  
  // SVG specific attributes for complex shapes
  maskId?: string;
  clipPathId?: string;
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
      if (el.id === 'Header') el.width = VIEWPORT_WIDTH;
      if (['MainContent', 'PromptContainer', 'BuildCard', 'HeroLogo'].includes(el.id)) {
        el.x = (VIEWPORT_WIDTH - el.width) / 2;
      }
      if (el.id === 'Footer_Disclaimer') {
        el.x = VIEWPORT_WIDTH / 2;
        el.y = 690;
      }
      if (el.children) buildMap(el.children);
    });
  };
  buildMap(solvedElements);
  return solvedElements;
}

function createSystemIcon(id: string, name: string, x: number, y: number, path: string): UIElement {
  return {
    id, name, type: 'path', category: 'Icon',
    x, y, width: 24, height: 24,
    fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round',
    pathData: path,
    opacity: 1, visible: true, locked: false,
    animationHint: { type: 'fade', duration: 400, easing: 'ease-out' }
  };
}

function createGrokLogo(id: string, name: string, x: number, y: number, size: number, color: string): UIElement {
  const scale = size / 24;
  return {
    id, name, type: 'group', category: 'Icon',
    x, y, width: size, height: size,
    fill: 'none', opacity: 1, visible: true, locked: false,
    children: [
      {
        id: `${id}_slash`, name: 'Slash', type: 'path', category: 'Icon',
        x: 0, y: 0, width: 24, height: 24,
        fill: 'none', stroke: color, strokeWidth: 1.75 * scale, strokeLinecap: 'round',
        pathData: `M${4.5 * scale} ${19.5 * scale} L${19.5 * scale} ${4.5 * scale}`,
        opacity: 1, visible: true, locked: false
      },
      {
        id: `${id}_arc_l`, name: 'Arc_L', type: 'path', category: 'Icon',
        x: 0, y: 0, width: 24, height: 24,
        fill: color, pathData: `M${10.2 * scale} ${4.5 * scale} C${7.2 * scale} ${8.5 * scale} ${7.2 * scale} ${15.5 * scale} ${10.2 * scale} ${19.5 * scale} C${8.5 * scale} ${15.5 * scale} ${8.5 * scale} ${8.5 * scale} ${10.2 * scale} ${4.5 * scale} Z`,
        opacity: 1, visible: true, locked: false
      },
      {
        id: `${id}_arc_r`, name: 'Arc_R', type: 'path', category: 'Icon',
        x: 0, y: 0, width: 24, height: 24,
        fill: color, pathData: `M${13.8 * scale} ${4.5 * scale} C${16.8 * scale} ${8.5 * scale} ${16.8 * scale} ${15.5 * scale} ${13.8 * scale} ${19.5 * scale} C${12.1 * scale} ${15.5 * scale} ${12.1 * scale} ${8.5 * scale} ${13.8 * scale} ${4.5 * scale} Z`,
        opacity: 1, visible: true, locked: false
      }
    ]
  };
}

export function generateGrokAbsoluteReconstruction(): VisualMap {
  const bg = '#000000';
  const textMain = '#FFFFFF';
  const textMuted = '#AAAAAA';

  const elements: UIElement[] = [
    {
      id: 'Header', name: 'Global_Header', type: 'group', category: 'Container',
      x: 0, y: 0, width: 1280, height: 64,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        createGrokLogo('LOGO_TOPO', 'Grok_Logo_Top', 24, 20, 24, textMain),
        {
          id: 'Header_Actions', name: 'Navigation_Actions', type: 'group', category: 'Interactive',
          x: 880, y: 16, width: 380, height: 32,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            createSystemIcon('Icon_Imagine', 'Imagine_Toggle', 0, 4, 'M4 4h16v16H4z M4 12h16 M12 4v16'),
            { id: 'Txt_Imagine', name: 'Label_Imagine', type: 'text', category: 'Typography', x: 30, y: 22, width: 0, height: 0, fill: textMain, text: 'Imagine', fontSize: 13, visible: true, locked: false, opacity: 1 },
            createSystemIcon('Icon_Settings', 'Settings_Gear', 100, 4, 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z'),
            { id: 'Btn_Login_BG', name: 'Login_Pill_Outline', type: 'pill', category: 'Interactive', x: 180, y: 0, width: 80, height: 32, fill: 'none', stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1, opacity: 1, visible: true, locked: false },
            { id: 'Btn_Login_Txt', name: 'Login_Label', type: 'text', category: 'Typography', x: 220, y: 21, width: 0, height: 0, fill: textMain, text: 'Entrar', fontSize: 13, fontWeight: '600', textAlign: 'center', visible: true, locked: false },
            { id: 'Btn_Signup_BG', name: 'Signup_Pill_Solid', type: 'pill', category: 'Interactive', x: 270, y: 0, width: 100, height: 32, fill: textMain, opacity: 1, visible: true, locked: false },
            { id: 'Btn_Signup_Txt', name: 'Signup_Label', type: 'text', category: 'Typography', x: 320, y: 21, width: 0, height: 0, fill: bg, text: 'Criar conta', fontSize: 13, fontWeight: '600', textAlign: 'center', visible: true, locked: false }
          ]
        }
      ]
    },
    {
      id: 'HeroLogo', name: 'Main_Identity_Group', type: 'group', category: 'Container',
      x: 520, y: 240, width: 240, height: 80,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        createGrokLogo('LOGO_CENTRO', 'Grok_Logo_Center', 0, 16, 64, textMain),
        { id: 'Hero_Text', name: 'Logo_Wordmark_Bold', type: 'text', category: 'Typography', x: 80, y: 64, width: 0, height: 0, fill: textMain, text: 'Grok', fontSize: 64, fontWeight: '700', visible: true, locked: false }
      ]
    },
    {
      id: 'PromptContainer', name: 'Input_Area_Group', type: 'group', category: 'Interactive',
      x: 290, y: 360, width: 700, height: 60,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { id: 'Pill_BG', name: 'Pill_Shape_Container', type: 'pill', category: 'Container', x: 0, y: 0, width: 700, height: 60, fill: '#121212', stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, visible: true, locked: false, opacity: 1 },
        createSystemIcon('Icon_Plus', 'Attach_Icon', 20, 18, 'M12 5v14M5 12h14'),
        { id: 'Pill_Hint', name: 'Placeholder_Label', type: 'text', category: 'Typography', x: 60, y: 36, width: 0, height: 0, fill: '#777', text: 'O que você quer saber?', fontSize: 16, visible: true, locked: false },
        { id: 'Pill_Fast_Label', name: 'Fast_Mode_Label_Bold', type: 'text', category: 'Typography', x: 600, y: 36, width: 0, height: 0, fill: '#FFF', text: 'Fast', fontSize: 14, fontWeight: '600', visible: true, locked: false },
        createSystemIcon('Icon_Chevron', 'Fast_Menu_Icon', 625, 26, 'M6 9l6 6 6-6'),
        { id: 'Send_Btn_Circle', name: 'Send_Action_Circle', type: 'circle', category: 'Interactive', x: 650, y: 10, width: 40, height: 40, fill: '#272727', opacity: 1, visible: true, locked: false },
        createSystemIcon('Send_Arrow', 'Arrow_Up_Icon', 658, 18, 'M12 19V5M5 12l7-7 7 7')
      ]
    },
    {
      id: 'BuildCard', name: 'Beta_Promo_Card_Group', type: 'group', category: 'Container',
      x: 290, y: 460, width: 700, height: 130,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { id: 'Card_BG', name: 'Card_Container_Shape', type: 'rect', category: 'Container', x: 0, y: 0, width: 700, height: 130, fill: '#121212', rx: 16, ry: 16, stroke: 'rgba(255,255,255,0.05)', strokeWidth: 1, visible: true, locked: false, opacity: 1 },
        createSystemIcon('Card_Close', 'Close_Action_Icon', 670, 10, 'M18 6L6 18M6 6l12 12'),
        { id: 'Card_Title', name: 'Headline_Bold', type: 'text', category: 'Typography', x: 24, y: 45, width: 0, height: 0, fill: textMain, text: 'Grok Build', fontSize: 18, fontWeight: '700', visible: true, locked: false },
        { id: 'Beta_Badge_BG', name: 'Beta_Shape_Tag', type: 'rect', category: 'Container', x: 125, y: 28, width: 40, height: 20, fill: '#2B1208', rx: 10, ry: 10, visible: true, locked: false, opacity: 1 },
        { id: 'Beta_Badge_Txt', name: 'Beta_Label_Bold', type: 'text', category: 'Typography', x: 145, y: 42, width: 0, height: 0, fill: '#FF6B00', text: 'Beta', fontSize: 10, fontWeight: '800', textAlign: 'center', visible: true, locked: false },
        { id: 'Card_Desc1', name: 'Sub_Text_1', type: 'text', category: 'Typography', x: 24, y: 72, width: 0, height: 0, fill: textMuted, text: 'Acesso antecipado para assinantes', fontSize: 13, visible: true, locked: false },
        { id: 'Card_Desc2', name: 'Sub_Text_2', type: 'text', category: 'Typography', x: 24, y: 92, width: 0, height: 0, fill: textMuted, text: 'SuperGrok e X Premium+', fontSize: 13, visible: true, locked: false },
        {
           id: 'TerminalGroup', name: 'CLI_Section_Group', type: 'group', category: 'Container',
           x: 340, y: 30, width: 336, height: 80,
           fill: 'none', opacity: 1, visible: true, locked: false,
           children: [
             { id: 'Tabs_PS', name: 'Env_PS_Bold', type: 'text', category: 'Typography', x: 0, y: 15, width: 0, height: 0, fill: textMain, text: 'PowerShell', fontSize: 11, fontWeight: '600', visible: true, locked: false },
             { id: 'Tabs_WSL', name: 'Env_WSL_Label', type: 'text', category: 'Typography', x: 75, y: 15, width: 0, height: 0, fill: textMuted, text: 'WSL', fontSize: 11, visible: true, locked: false },
             { id: 'Terminal_BG', name: 'Code_Box_Shape', type: 'rect', category: 'Container', x: 0, y: 25, width: 336, height: 45, fill: '#000', rx: 8, ry: 8, visible: true, locked: false, opacity: 1 },
             { id: 'Terminal_Txt', name: 'CLI_Command_Text', type: 'text', category: 'Typography', x: 15, y: 53, width: 0, height: 0, fill: textMuted, text: 'irm https://x.ai/cli/install.ps1 | iex', fontSize: 11, fontFamily: 'monospace', visible: true, locked: false },
             createSystemIcon('Icon_Copy', 'Copy_Code_Icon', 300, 36, 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 002-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2')
           ]
        }
      ]
    },
    {
      id: 'Footer_Disclaimer', name: 'Legal_Notice_Footer', type: 'text', category: 'Typography',
      x: 640, y: 690, width: 1280, height: 20, fill: textMuted,
      text: 'Ao enviar mensagens para o Grok, você concorda com nossos termos e política de privacidade.',
      fontSize: 11, textAlign: 'center', opacity: 0.5, visible: true, locked: false
    }
  ];

  return {
    metadata: {
      layout_type: 'AI Interface',
      dimensions: { width: 1280, height: 720 },
      color_palette: { primary: ['#FFFFFF', '#3B82F6'], neutrals: ['#000000', '#121212'] }
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
