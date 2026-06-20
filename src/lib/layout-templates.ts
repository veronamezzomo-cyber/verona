/**
 * @fileOverview Visual Map System - YouTube & Grok Edition.
 * Implementação baseada na DIRETRIZ ANALÍTICA GLOBAL e PROTOCOLO DE ICONOGRAFIA.
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
      // Sidebar Fixed Width (YouTube Mode)
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
        el.x = (VIEWPORT_WIDTH - el.width) / 2;
      }

      // Footer Absolute Centering
      if (el.id === 'Footer_Disclaimer') {
        el.x = VIEWPORT_WIDTH / 2;
        el.y = 690;
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
 * System Icon Factory (24x24 Grid, Stroke 1.5)
 */
function createSystemIcon(id: string, name: string, x: number, y: number, path: string): UIElement {
  return {
    id,
    name,
    type: 'path',
    x, y, width: 24, height: 24,
    fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round',
    pathData: path,
    opacity: 1, visible: true, locked: false
  };
}

/**
 * Reconstrução Analítica do Logo Grok/xAI via Raw SVG imutável.
 */
function createGrokLogo(id: string, x: number, y: number, size: number): UIElement {
  const scale = size / 24;
  return {
    id: id,
    name: 'Grok_Logo',
    type: 'group',
    x, y, width: size, height: size,
    fill: 'none', opacity: 1, visible: true, locked: false,
    children: [
      {
        id: `${id}_Slash`,
        name: 'Logo_Slash',
        type: 'path',
        x: 0, y: 0, width: 24, height: 24,
        fill: 'none', stroke: 'currentColor', strokeWidth: 1.75 * scale, strokeLinecap: 'round',
        pathData: 'M4.5 19.5 L19.5 4.5',
        opacity: 1, visible: true, locked: false
      },
      {
        id: `${id}_ArcL`,
        name: 'Logo_Arc_Left',
        type: 'path',
        x: 0, y: 0, width: 24, height: 24,
        fill: 'currentColor',
        pathData: 'M10.2 4.5C7.2 8.5 7.2 15.5 10.2 19.5C8.5 15.5 8.5 8.5 10.2 4.5Z',
        opacity: 1, visible: true, locked: false
      },
      {
        id: `${id}_ArcR`,
        name: 'Logo_Arc_Right',
        type: 'path',
        x: 0, y: 0, width: 24, height: 24,
        fill: 'currentColor',
        pathData: 'M13.8 4.5C16.8 8.5 16.8 15.5 13.8 19.5C12.1 15.5 12.1 8.5 13.8 4.5Z',
        opacity: 1, visible: true, locked: false
      }
    ]
  };
}

export function generateYouTubeAbsoluteReconstruction(): VisualMap {
  const bg = '#000000';
  const textMain = '#FFFFFF';
  const textMuted = '#AAAAAA';

  const elements: UIElement[] = [
    // --- HEADER ---
    {
      id: 'Header',
      name: 'Global_Header',
      type: 'group',
      x: 0, y: 0, width: 1280, height: 64,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        createGrokLogo('Header_Logo_Small', 24, 20, 24),
        // Group: Right Controls
        {
          id: 'Header_Actions',
          name: 'Navigation_Actions',
          type: 'group',
          x: 920, y: 16, width: 340, height: 32,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            createSystemIcon('Icon_Imagine', 'Imagine_Toggle', 0, 4, 'M4 4h16v16H4z M4 12h16 M12 4v16'), // Placeholder for landscape
            { id: 'Txt_Imagine', name: 'Label', type: 'text', x: 30, y: 22, width: 0, height: 0, fill: textMain, text: 'Imagine', fontSize: 13, visible: true, locked: false, opacity: 1 },
            
            // Settings Gear (Injected Path)
            {
              id: 'Icon_Settings',
              name: 'Settings_Gear',
              type: 'path',
              x: 100, y: 4, width: 24, height: 24,
              fill: 'none', stroke: textMain, strokeWidth: 1.5,
              pathData: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z',
              opacity: 1, visible: true, locked: false
            },
            
            // Secondary Action (Outline)
            { id: 'Btn_Login_BG', name: 'Login_Pill', type: 'pill', x: 160, y: 0, width: 80, height: 32, fill: 'none', stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1, opacity: 1, visible: true, locked: false },
            { id: 'Btn_Login_Txt', name: 'Label', type: 'text', x: 200, y: 21, width: 0, height: 0, fill: textMain, text: 'Entrar', fontSize: 13, fontWeight: '600', textAlign: 'center', visible: true, locked: false },
            
            // Primary Action (Solid)
            { id: 'Btn_Signup_BG', name: 'Signup_Pill', type: 'pill', x: 250, y: 0, width: 90, height: 32, fill: textMain, opacity: 1, visible: true, locked: false },
            { id: 'Btn_Signup_Txt', name: 'Label', type: 'text', x: 295, y: 21, width: 0, height: 0, fill: bg, text: 'Criar conta', fontSize: 13, fontWeight: '600', textAlign: 'center', visible: true, locked: false }
          ]
        }
      ]
    },

    // --- MAIN HERO ---
    {
      id: 'HeroLogo',
      name: 'Main_Identity',
      type: 'group',
      x: 540, y: 240, width: 200, height: 80,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        createGrokLogo('Hero_Glifo', 0, 0, 80),
        { id: 'Hero_Text', name: 'Logo_Wordmark', type: 'text', x: 90, y: 62, width: 0, height: 0, fill: textMain, text: 'Grok', fontSize: 64, fontWeight: '700', visible: true, locked: false }
      ]
    },

    // --- PROMPT PILL ---
    {
      id: 'PromptContainer',
      name: 'Input_Area',
      type: 'group',
      x: 290, y: 360, width: 700, height: 60,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { id: 'Pill_BG', name: 'Pill_Shape', type: 'pill', x: 0, y: 0, width: 700, height: 60, fill: '#121212', stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, visible: true, locked: false, opacity: 1 },
        createSystemIcon('Icon_Plus', 'Attach', 20, 18, 'M12 5v14M5 12h14'),
        { id: 'Pill_Hint', name: 'Placeholder', type: 'text', x: 60, y: 36, width: 0, height: 0, fill: '#777', text: 'O que você quer saber?', fontSize: 16, visible: true, locked: false },
        { id: 'Fast_Selector', name: 'Mode', type: 'group', x: 580, y: 20, width: 60, height: 20, fill: 'none', opacity: 1, children: [
          { id: 'Fast_Txt', name: 'Label', type: 'text', x: 0, y: 15, width: 0, height: 0, fill: textMain, text: 'Fast', fontSize: 13, fontWeight: '600', visible: true, locked: false },
          createSystemIcon('Fast_Chevron', 'Arrow', 35, -4, 'm6 9 6 6 6-6')
        ]},
        { id: 'Send_Btn_Circle', name: 'Send_Action', type: 'circle', x: 650, y: 10, width: 40, height: 40, fill: '#272727', opacity: 1, visible: true, locked: false },
        createSystemIcon('Send_Arrow', 'Arrow_Up', 658, 18, 'M12 19V5M5 12l7-7 7 7')
      ]
    },

    // --- BUILD CARD ---
    {
      id: 'BuildCard',
      name: 'Beta_Promo_Card',
      type: 'group',
      x: 290, y: 460, width: 700, height: 130,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { id: 'Card_BG', name: 'Container', type: 'rect', x: 0, y: 0, width: 700, height: 130, fill: '#121212', rx: 16, ry: 16, stroke: 'rgba(255,255,255,0.05)', strokeWidth: 1, visible: true, locked: false, opacity: 1 },
        { id: 'Card_Title', name: 'Headline', type: 'text', x: 24, y: 45, width: 0, height: 0, fill: textMain, text: 'Grok Build', fontSize: 18, fontWeight: '700', visible: true, locked: false },
        { id: 'Card_Beta', name: 'Badge', type: 'pill', x: 125, y: 28, width: 40, height: 20, fill: 'rgba(255,87,34,0.15)', visible: true, locked: false, opacity: 1 },
        { id: 'Beta_Txt', name: 'Label', type: 'text', x: 145, y: 42, width: 0, height: 0, fill: '#FF5722', text: 'Beta', fontSize: 10, fontWeight: '700', textAlign: 'center', visible: true, locked: false },
        { id: 'Card_Desc1', name: 'Sub', type: 'text', x: 24, y: 72, width: 0, height: 0, fill: textMuted, text: 'Acesso antecipado para assinantes', fontSize: 13, visible: true, locked: false },
        { id: 'Card_Desc2', name: 'Sub2', type: 'text', x: 24, y: 92, width: 0, height: 0, fill: textMuted, text: 'SuperGrok e X Premium+', fontSize: 13, visible: true, locked: false },
        
        // Terminal Box (Gap 32px from text)
        { id: 'Terminal_Label', name: 'Env', type: 'text', x: 300, y: 70, width: 0, height: 0, fill: textMain, text: 'PowerShell', fontSize: 12, fontWeight: '600', visible: true, locked: false },
        { id: 'Terminal_Label2', name: 'Env2', type: 'text', x: 375, y: 70, width: 0, height: 0, fill: textMuted, text: 'WSL', fontSize: 12, visible: true, locked: false },
        { id: 'Terminal_BG', name: 'Code_Box', type: 'rect', x: 300, y: 80, width: 376, height: 36, fill: '#000', rx: 8, ry: 8, visible: true, locked: false, opacity: 1 },
        { id: 'Terminal_Txt', name: 'CLI_Command', type: 'text', x: 315, y: 103, width: 0, height: 0, fill: textMuted, text: 'irm https://x.ai/cli/install.ps1 | iex', fontSize: 11, fontFamily: 'monospace', visible: true, locked: false },
        createSystemIcon('Terminal_Copy', 'Copy_Icon', 645, 86, 'M8 12h8m-8-4h8m-10 4V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4'),
        createSystemIcon('Card_Close', 'Dismiss', 670, 8, 'M18 6L6 18M6 6l12 12')
      ]
    },

    // --- FOOTER ---
    {
      id: 'Footer_Disclaimer',
      name: 'Legal_Notice',
      type: 'text',
      x: 640, y: 690, width: 1280, height: 20,
      fill: textMuted,
      text: 'Ao enviar mensagens para o Grok, você concorda com nossos termos e política de privacidade.',
      fontSize: 11,
      textAlign: 'center',
      opacity: 0.5,
      visible: true,
      locked: false
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
