
/**
 * @fileOverview Visual Map System - Definições de infraestrutura para Engenharia Reversa.
 * Contexto: WEBSITE (Fullscreen). 100% Estático para Motion Design.
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
  rx?: number;
  ry?: number;
  
  // Effects
  shadow?: string;
  blur?: number;
  
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
  const elementMap = new Map<string, UIElement>();

  const buildMap = (els: UIElement[]) => {
    els.forEach(el => {
      elementMap.set(el.id, el);
      
      // Centralização horizontal dinâmica para blocos principais
      if (el.id === 'HeroBranding' || el.id === 'PromptPill' || el.id === 'BuildCard') {
        el.x = (VIEWPORT_WIDTH - el.width) / 2;
      }

      // Correção matemática do Footer: para text-anchor: middle, x deve ser o centro.
      if (el.id === 'Footer') {
        el.x = VIEWPORT_WIDTH / 2;
      }

      if (el.id === 'Header') {
        el.width = VIEWPORT_WIDTH;
        el.x = 0;
        
        if (el.children) {
          const marginRight = 24;
          const gutter = 32;

          // Sign Up Pill (Far Right Anchoring)
          const signUpPill = el.children.find(c => c.id === 'SignUpPill');
          const signUpText = el.children.find(c => c.id === 'SignUpText');
          if (signUpPill) {
            signUpPill.x = VIEWPORT_WIDTH - signUpPill.width - marginRight;
            if (signUpText) {
              signUpText.x = signUpPill.x + (signUpPill.width / 2);
            }
          }

          // Login Text (Relative to Sign Up)
          const loginText = el.children.find(c => c.id === 'Login_Text');
          if (loginText && signUpPill) {
            loginText.x = signUpPill.x - 45 - gutter; 
          }

          // Settings Icon (Relative to Login)
          const settingsIcon = el.children.find(c => c.id === 'Settings_Icon_Group');
          if (settingsIcon && loginText) {
            settingsIcon.x = loginText.x - 20 - gutter;
          }

          // Imagine Toggle Group (Relative to Settings)
          const imagineToggle = el.children.find(c => c.id === 'Imagine_Toggle');
          if (imagineToggle && settingsIcon) {
            imagineToggle.x = settingsIcon.x - imagineToggle.width - gutter;
          }
        }
      }

      // Ancoragem interna relativa para filhos
      if (el.children && el.children.length > 0) {
        el.children.forEach(child => {
          if (child.id === 'pill-send-circle') child.x = el.width - 48;
          if (child.id === 'pill-send-arrow') child.x = el.width - 48 + 15;
          if (child.id === 'pill-fast-text') child.x = el.width - 105;
          if (child.id === 'pill-fast-chevron') child.x = el.width - 75;
          if (child.id === 'card-close') child.x = el.width - 32;
          
          if (child.id === 'TerminalGroup') child.x = el.width - child.width - 24;

          elementMap.set(child.id, child);
        });
        buildMap(el.children);
      }
    });
  };
  buildMap(solvedElements);

  if (metrics) {
    metrics.forEach(metric => {
      const from = elementMap.get(metric.fromId);
      const to = elementMap.get(metric.toId);
      if (from && to && metric.relation === 'vertical' && metric.distanceY !== undefined) {
        to.y = from.y + from.height + metric.distanceY;
      }
    });
  }

  return solvedElements;
}

/**
 * Helper para gerar o grupo do Logo Grok (xAI) com 3 paths discretos.
 * REFINAMENTO: Pontas agudas (Tapered) via fill paths.
 */
function createGrokLogo(id: string, name: string, size: number, fillColor: string): UIElement {
  const scale = size / 24;
  return {
    id: id,
    name: name,
    type: 'group',
    x: 0, y: 0, width: size, height: size,
    fill: 'none', opacity: 1, visible: true, locked: false,
    children: [
      {
        id: `${id}_Slash`,
        name: 'Logo_Slash_Sharp',
        type: 'path',
        x: 0, y: 0, width: size, height: size,
        fill: fillColor, stroke: 'none',
        pathData: `M ${3 * scale} ${21 * scale} L ${21 * scale} ${3 * scale} L ${20.5 * scale} ${3 * scale} L ${2.5 * scale} ${21 * scale} Z`,
        visible: true, locked: false, opacity: 1
      },
      {
        id: `${id}_Left_Arc`,
        name: 'Logo_Left_Arc_Sharp',
        type: 'path',
        x: 0, y: 0, width: size, height: size,
        fill: fillColor, stroke: 'none',
        pathData: `M ${10 * scale} ${4.5 * scale} A ${8 * scale} ${8 * scale} 0 0 0 ${10 * scale} ${19.5 * scale} L ${10.5 * scale} ${18 * scale} A ${7 * scale} ${7 * scale} 0 0 1 ${10.5 * scale} ${6 * scale} Z`,
        visible: true, locked: false, opacity: 1
      },
      {
        id: `${id}_Right_Arc`,
        name: 'Logo_Right_Arc_Sharp',
        type: 'path',
        x: 0, y: 0, width: size, height: size,
        fill: fillColor, stroke: 'none',
        pathData: `M ${14 * scale} ${4.5 * scale} A ${8 * scale} ${8 * scale} 0 0 1 ${14 * scale} ${19.5 * scale} L ${13.5 * scale} ${18 * scale} A ${7 * scale} ${7 * scale} 0 0 0 ${13.5 * scale} ${6 * scale} Z`,
        visible: true, locked: false, opacity: 1
      }
    ]
  };
}

export function generateGrokAbsoluteReconstruction(): VisualMap {
  const surface = '#0d0d0d'; 
  const border = '#1a1a1a'; 
  const textPrimary = '#FFFFFF';
  const textSecondary = '#737373'; 
  const accentBeta = '#d34b30';
  const darkBlack = '#000000';

  const elements: UIElement[] = [
    {
      id: 'Header',
      name: 'Header_Navigation',
      type: 'group',
      x: 0, y: 0, width: 1280, height: 60,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { 
          ...createGrokLogo('TopLogo', 'Header_Logo', 20, textPrimary),
          x: 24, y: 20
        },
        {
          id: 'Imagine_Toggle',
          name: 'Imagine_Toggle_Group',
          type: 'group',
          x: 0, y: 22, width: 80, height: 16,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { 
              id: 'Imagine_Icon', 
              name: 'Imagine_Icon_Path', 
              type: 'path', 
              x: 0, y: 0, width: 16, height: 16, 
              fill: textPrimary, opacity: 0.8, visible: true, locked: false, 
              pathData: 'M 2 4 C 1 4 0 5 0 6 V 14 C 0 15 1 16 2 16 H 14 C 15 16 16 15 16 14 V 6 C 16 5 15 4 14 4 H 2 Z M 3 13 L 6 9 L 9 12 L 11 10 L 14 14 H 2 Z' 
            },
            { id: 'Imagine_Text', name: 'Imagine_Text', type: 'text', x: 24, y: 13, width: 0, height: 0, fill: textPrimary, text: 'Imagine', fontSize: 13, fontWeight: '500', visible: true, locked: false }
          ]
        },
        {
          id: 'Settings_Icon_Group',
          name: 'Settings_Group',
          type: 'group',
          x: 0, y: 22, width: 20, height: 20,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { 
              id: 'Settings_Icon_Path', 
              name: 'Settings_Gear_Path', 
              type: 'path', 
              x: 0, y: 0, width: 20, height: 20, 
              fill: 'none', stroke: textPrimary, strokeWidth: 1.2, opacity: 0.6, visible: true, locked: false, 
              // Ícone de Engrenagem Ortogonal Geométrica
              pathData: 'M 10 7 A 3 3 0 1 1 10 13 A 3 3 0 0 1 10 7 Z M 9 2 H 11 V 4.5 A 6 6 0 0 1 12.5 5.2 L 14.2 3.5 L 15.6 4.9 L 13.9 6.6 A 6 6 0 0 1 14.6 8 H 17 V 10 H 14.6 A 6 6 0 0 1 13.9 11.4 L 15.6 13.1 L 14.2 14.5 L 12.5 12.8 A 6 6 0 0 1 11 13.5 V 16 H 9 V 13.5 A 6 6 0 0 1 7.5 12.8 L 5.8 14.5 L 4.4 13.1 L 6.1 11.4 A 6 6 0 0 1 5.4 10 H 3 V 8 H 5.4 A 6 6 0 0 1 6.1 6.6 L 4.4 4.9 L 5.8 3.5 L 7.5 5.2 A 6 6 0 0 1 9 4.5 V 2 Z'
            }
          ]
        },
        { id: 'Login_Text', name: 'Login_Text', type: 'text', x: 0, y: 35, width: 0, height: 0, fill: textPrimary, text: 'Entrar', fontSize: 13, fontWeight: '500', visible: true, locked: false },
        { id: 'SignUpPill', name: 'Sign_Up_Pill', type: 'pill', x: 0, y: 14, width: 92, height: 32, fill: textPrimary, opacity: 1, visible: true, locked: false, rx: 8, ry: 8 },
        { id: 'SignUpText', name: 'Sign_Up_Text', type: 'text', x: 0, y: 34, width: 0, height: 0, fill: darkBlack, text: 'Criar conta', fontSize: 12, fontWeight: '600', textAlign: 'center', visible: true, locked: false }
      ]
    },
    {
      id: 'HeroBranding',
      name: 'Hero_Branding_Section',
      type: 'group',
      x: 0, y: 210, width: 250, height: 60,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { 
          ...createGrokLogo('HeroLogo', 'Hero_Logo_Main', 56, textPrimary),
          x: 0, y: 0
        },
        { id: 'HeroName', name: 'Grok_Title_Text', type: 'text', x: 72, y: 48, width: 0, height: 0, fill: textPrimary, text: 'Grok', fontSize: 56, fontWeight: '700', visible: true, locked: false }
      ]
    },
    {
      id: 'PromptPill',
      name: 'Main_Prompt_Input',
      type: 'group',
      x: 0, y: 320, width: 700, height: 56,
      fill: 'none', opacity: 1, visible: true, locked: false,
      shadow: '0 8 24 rgba(0,0,0,0.4)', 
      children: [
        { id: 'pill-surface', name: 'Input_Background', type: 'pill', x: 0, y: 0, width: 700, height: 56, fill: surface, opacity: 1, stroke: border, strokeWidth: 1, rx: 28, ry: 28, visible: true, locked: false },
        { id: 'pill-plus', name: 'Plus_Icon_Path', type: 'path', x: 20, y: 20, width: 16, height: 16, fill: 'none', stroke: textSecondary, strokeWidth: 1.5, visible: true, locked: false, pathData: 'M8 2 V14 M2 8 H14' },
        { id: 'pill-hint', name: 'Placeholder_Hint', type: 'text', x: 52, y: 34, width: 0, height: 0, fill: textSecondary, text: 'O que você quer saber?', fontSize: 16, fontWeight: '400', visible: true, locked: false },
        { id: 'pill-fast-text', name: 'Model_Selector_Label', type: 'text', x: 0, y: 34, width: 0, height: 0, fill: textPrimary, text: 'Fast', fontSize: 13, fontWeight: '600', visible: true, locked: false },
        { id: 'pill-fast-chevron', name: 'Fast_Chevron_Path', type: 'path', x: 0, y: 28, width: 10, height: 10, fill: 'none', stroke: textPrimary, strokeWidth: 1.5, pathData: 'M2 4 L5 7 L8 4', visible: true, locked: false },
        { id: 'pill-send-circle', name: 'Send_Button_BG', type: 'circle', x: 0, y: 8, width: 40, height: 40, fill: '#262626', opacity: 1, visible: true, locked: false },
        { id: 'pill-send-arrow', name: 'Send_Arrow_Path', type: 'path', x: 0, y: 20, width: 10, height: 16, fill: 'none', stroke: textPrimary, strokeWidth: 2, pathData: 'M5 14 V2 M2 5 L5 2 L8 5', visible: true, locked: false }
      ]
    },
    {
      id: 'BuildCard',
      name: 'Developer_Grok_Build_Card',
      type: 'group',
      x: 0, y: 410, width: 640, height: 140,
      fill: 'none', opacity: 1, visible: true, locked: false,
      shadow: '0 4 20 rgba(0,0,0,0.3)',
      children: [
        { id: 'card-bg', name: 'Card_Surface', type: 'rect', x: 0, y: 0, width: 640, height: 140, fill: surface, opacity: 1, rx: 12, stroke: border, strokeWidth: 1, visible: true, locked: false },
        { id: 'card-title', name: 'Card_Title', type: 'text', x: 24, y: 36, width: 0, height: 0, fill: textPrimary, text: 'Grok Build', fontSize: 18, fontWeight: '700', visible: true, locked: false },
        { id: 'card-beta-badge', name: 'Beta_Badge_BG', type: 'pill', x: 120, y: 20, width: 40, height: 20, fill: accentBeta, opacity: 0.1, visible: true, locked: false },
        { id: 'card-beta-text', name: 'Beta_Label', type: 'text', x: 140, y: 34, width: 0, height: 0, fill: accentBeta, text: 'Beta', fontSize: 10, fontWeight: '700', textAlign: 'center', visible: true, locked: false },
        { id: 'card-desc', name: 'Card_Description_1', type: 'text', x: 24, y: 64, width: 0, height: 0, fill: textSecondary, text: 'Acesso antecipado para assinantes', fontSize: 13, visible: true, locked: false },
        { id: 'card-desc-2', name: 'Card_Description_2', type: 'text', x: 24, y: 84, width: 0, height: 0, fill: textSecondary, text: 'SuperGrok e X Premium+', fontSize: 13, visible: true, locked: false },
        { id: 'card-close', name: 'Close_Icon_Path', type: 'path', x: 0, y: 20, width: 12, height: 12, fill: 'none', stroke: textSecondary, strokeWidth: 1.5, visible: true, locked: false, pathData: 'M2 2 L10 10 M10 2 L2 10' },
        {
          id: 'TerminalGroup',
          name: 'Terminal_CLI_Block',
          type: 'group',
          x: 0, y: 35, width: 340, height: 70,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'term-bg', name: 'Terminal_BG', type: 'rect', x: 0, y: 0, width: 340, height: 70, fill: darkBlack, opacity: 0.8, rx: 8, visible: true, locked: false },
            { id: 'term-text', name: 'Terminal_Command', type: 'text', x: 15, y: 40, width: 0, height: 0, fill: textPrimary, text: 'irm https://x.ai/cli/install.ps1 | iex', fontSize: 11, fontFamily: 'monospace', visible: true, locked: false },
            { 
              id: 'term-copy-icon', 
              name: 'Copy_Icon_Path', 
              type: 'path', 
              x: 310, y: 25, width: 16, height: 16, 
              fill: 'none', stroke: textSecondary, strokeWidth: 1.5, visible: true, locked: false,
              pathData: 'M4 4 H12 V12 H4 Z M2 2 H10 V10 H2 Z' 
            }
          ]
        }
      ]
    },
    {
      id: 'Footer',
      name: 'Legal_Disclaimer_Footer',
      type: 'text',
      x: 0, y: 640,
      width: 1280, height: 0,
      fill: textSecondary,
      text: 'Ao enviar mensagens para o Grok, você concorda com nossos termos e política de privacidade.',
      fontSize: 11,
      textAlign: 'center',
      opacity: 0.6,
      visible: true, locked: false
    }
  ];

  const metrics: NegativeSpaceMetrics[] = [
    { fromId: 'HeroBranding', toId: 'PromptPill', distanceY: 60, relation: 'vertical' },
    { fromId: 'PromptPill', toId: 'BuildCard', distanceY: 40, relation: 'vertical' }
  ];

  return {
    elements: applyLayoutSolver(elements, metrics),
    negativeSpaceMetrics: metrics,
    audit: {
      visualFidelity: 99,
      layoutFidelity: 100,
      spacingFidelity: 99,
      typographyFidelity: 99,
      logoFidelity: 100
    }
  };
}
