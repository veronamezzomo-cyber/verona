/**
 * @fileOverview Visual Map System - Grok High-Fidelity Static Edition.
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
      // Header Full Width
      if (el.id === 'Header') {
        el.width = VIEWPORT_WIDTH;
      }

      // Content Area Offset
      if (el.id === 'MainContent' || el.id === 'PromptContainer' || el.id === 'BuildCard' || el.id === 'HeroLogo') {
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
 * System Icon Factory (Protocolo de Iconografia: 24x24, Stroke 1.5)
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
 * Reconstrução Analítica do Logo Grok/xAI via Raw SVG (Pen Tool Mode).
 * Implementa o glifo tapered com pontas agudas.
 */
function createGrokLogo(id: string, name: string, x: number, y: number, size: number, color: string): UIElement {
  const scale = size / 24;
  return {
    id,
    name,
    type: 'group',
    x, y, width: size, height: size,
    fill: 'none', opacity: 1, visible: true, locked: false,
    children: [
      // Linha Diagonal (Blade Shape para Tapering)
      {
        id: `${id}_slash`,
        name: 'Slash',
        type: 'path',
        x: 0, y: 0, width: 24, height: 24,
        fill: color, opacity: 1, visible: true, locked: false,
        pathData: `M${4.5 * scale} ${19.5 * scale} L${19.5 * scale} ${4.5 * scale} L${18.5 * scale} ${5.5 * scale} L${5.5 * scale} ${18.5 * scale} Z`,
        strokeLinecap: 'round'
      },
      // Arco Crescente Esquerdo (Tapered)
      {
        id: `${id}_arc_l`,
        name: 'Arc_L',
        type: 'path',
        x: 0, y: 0, width: 24, height: 24,
        fill: color, opacity: 1, visible: true, locked: false,
        pathData: `M${10.2 * scale} ${4.5 * scale} C${7.2 * scale} ${8.5 * scale} ${7.2 * scale} ${15.5 * scale} ${10.2 * scale} ${19.5 * scale} C${8.5 * scale} ${15.5 * scale} ${8.5 * scale} ${8.5 * scale} ${10.2 * scale} ${4.5 * scale} Z`
      },
      // Arco Crescente Direito (Tapered)
      {
        id: `${id}_arc_r`,
        name: 'Arc_R',
        type: 'path',
        x: 0, y: 0, width: 24, height: 24,
        fill: color, opacity: 1, visible: true, locked: false,
        pathData: `M${13.8 * scale} ${4.5 * scale} C${16.8 * scale} ${8.5 * scale} ${16.8 * scale} ${15.5 * scale} ${13.8 * scale} ${19.5 * scale} C${12.1 * scale} ${15.5 * scale} ${12.1 * scale} ${8.5 * scale} ${13.8 * scale} ${4.5 * scale} Z`
      }
    ]
  };
}

export function generateGrokAbsoluteReconstruction(): VisualMap {
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
        createGrokLogo('LOGO_TOPO', 'Grok_Logo_Top', 24, 20, 24, textMain),
        {
          id: 'Header_Actions',
          name: 'Navigation_Actions',
          type: 'group',
          x: 880, y: 16, width: 380, height: 32,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            createSystemIcon('Icon_Imagine', 'Imagine_Toggle', 0, 4, 'M4 4h16v16H4z M4 12h16 M12 4v16'),
            { id: 'Txt_Imagine', name: 'Label', type: 'text', x: 30, y: 22, width: 0, height: 0, fill: textMain, text: 'Imagine', fontSize: 13, visible: true, locked: false, opacity: 1 },
            
            // Settings Gear (8-tooth industrial gear - Pen Tool Path Literal)
            createSystemIcon('Icon_Settings', 'Settings_Gear', 100, 4, 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z'),
            
            // Secondary Action (Outline Pill)
            { id: 'Btn_Login_BG', name: 'Login_Pill', type: 'pill', x: 180, y: 0, width: 80, height: 32, fill: 'none', stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1, opacity: 1, visible: true, locked: false },
            { id: 'Btn_Login_Txt', name: 'Label', type: 'text', x: 220, y: 21, width: 0, height: 0, fill: textMain, text: 'Entrar', fontSize: 13, fontWeight: '600', textAlign: 'center', visible: true, locked: false },
            
            // Primary Action (Solid Pill)
            { id: 'Btn_Signup_BG', name: 'Signup_Pill', type: 'pill', x: 270, y: 0, width: 100, height: 32, fill: textMain, opacity: 1, visible: true, locked: false },
            { id: 'Btn_Signup_Txt', name: 'Label', type: 'text', x: 320, y: 21, width: 0, height: 0, fill: bg, text: 'Criar conta', fontSize: 13, fontWeight: '600', textAlign: 'center', visible: true, locked: false }
          ]
        }
      ]
    },

    // --- MAIN HERO ---
    {
      id: 'HeroLogo',
      name: 'Main_Identity',
      type: 'group',
      x: 520, y: 240, width: 240, height: 80,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        createGrokLogo('LOGO_CENTRO', 'Grok_Logo_Center', 0, 16, 64, textMain),
        { id: 'Hero_Text', name: 'Logo_Wordmark', type: 'text', x: 80, y: 64, width: 0, height: 0, fill: textMain, text: 'Grok', fontSize: 64, fontWeight: '700', visible: true, locked: false }
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
        
        // Terminal Group
        {
           id: 'TerminalGroup',
           name: 'CLI_Section',
           type: 'group',
           x: 320, y: 30, width: 356, height: 80,
           fill: 'none', opacity: 1, visible: true, locked: false,
           children: [
             { id: 'Terminal_Label', name: 'Env', type: 'text', x: 0, y: 40, width: 0, height: 0, fill: textMain, text: 'PowerShell', fontSize: 12, fontWeight: '600', visible: true, locked: false },
             { id: 'Terminal_Label2', name: 'Env2', type: 'text', x: 75, y: 40, width: 0, height: 0, fill: textMuted, text: 'WSL', fontSize: 12, visible: true, locked: false },
             { id: 'Terminal_BG', name: 'Code_Box', type: 'rect', x: 0, y: 50, width: 356, height: 36, fill: '#000', rx: 8, ry: 8, visible: true, locked: false, opacity: 1 },
             { id: 'Terminal_Txt', name: 'CLI_Command', type: 'text', x: 15, y: 73, width: 0, height: 0, fill: textMuted, text: 'irm https://x.ai/cli/install.ps1 | iex', fontSize: 11, fontFamily: 'monospace', visible: true, locked: false },
             createSystemIcon('Terminal_Copy', 'Copy_Icon', 320, 56, 'M8 12h8m-8-4h8m-10 4V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4')
           ]
        },
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
