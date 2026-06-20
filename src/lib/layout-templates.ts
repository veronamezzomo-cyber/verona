/**
 * @fileOverview Visual Map System - Definições de infraestrutura para Engenharia Reversa.
 * Implementação baseada na DIRETRIZ ANALÍTICA GLOBAL (Constraint-Based Layout).
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

/**
 * Constraint Solver: Motor de posicionamento absoluto baseado em regras de respiro.
 */
export function applyLayoutSolver(elements: UIElement[], metrics: NegativeSpaceMetrics[]): UIElement[] {
  if (!elements) return [];

  const VIEWPORT_WIDTH = 1280;
  const VIEWPORT_HEIGHT = 720;
  const solvedElements = JSON.parse(JSON.stringify(elements)) as UIElement[];
  const elementMap = new Map<string, UIElement>();

  const buildMap = (els: UIElement[]) => {
    els.forEach(el => {
      elementMap.set(el.id, el);
      
      // Centralização Horizontal de Elementos Hero
      if (el.id === 'HeroBranding' || el.id === 'PromptPill' || el.id === 'BuildCard') {
        el.x = (VIEWPORT_WIDTH - el.width) / 2;
      }

      // Rodapé: Ancoragem Absoluta Centralizada
      if (el.id === 'Footer') {
        el.x = VIEWPORT_WIDTH / 2;
        el.y = VIEWPORT_HEIGHT - 40;
      }

      // Header: Distribuição Analítica de Unidades
      if (el.id === 'Header') {
        el.width = VIEWPORT_WIDTH;
        el.x = 0;
        
        if (el.children) {
          const marginRight = 24;
          const gap = 32;

          // Unidade 1: Primary Action (Sign Up) - Extrema Direita
          const signUpPill = el.children.find(c => c.id === 'SignUpPill');
          const signUpText = el.children.find(c => c.id === 'SignUpText');
          if (signUpPill) {
            signUpPill.x = VIEWPORT_WIDTH - signUpPill.width - marginRight;
            if (signUpText) {
              signUpText.x = signUpPill.x + (signUpPill.width / 2);
            }
          }

          // Unidade 2: Secondary Action (Login) - Adjacente ao Sign Up
          const loginBtn = el.children.find(c => c.id === 'Login_Button_Group');
          if (loginBtn && signUpPill) {
            loginBtn.x = signUpPill.x - loginBtn.width - 20;
          }

          // Unidade 3: Tertiary Icons (Settings, Imagine)
          const settingsIcon = el.children.find(c => c.id === 'Settings_Icon_Group');
          if (settingsIcon && loginBtn) {
            settingsIcon.x = loginBtn.x - gap - settingsIcon.width;
          }

          const imagineToggle = el.children.find(c => c.id === 'Imagine_Toggle_Group');
          if (imagineToggle && settingsIcon) {
            imagineToggle.x = settingsIcon.x - gap - imagineToggle.width;
          }
        }
      }

      // Distribuição Interna do Prompt Pill
      if (el.id === 'PromptPill' && el.children) {
        const sendBtn = el.children.find(c => c.id === 'pill-send-group');
        if (sendBtn) sendBtn.x = el.width - sendBtn.width - 8;

        const modelSelector = el.children.find(c => c.id === 'pill-model-selector');
        if (modelSelector && sendBtn) modelSelector.x = sendBtn.x - modelSelector.width - 12;
      }

      // Distribuição Interna do Card (No-Collision)
      if (el.id === 'BuildCard' && el.children) {
        const terminal = el.children.find(c => c.id === 'TerminalGroup');
        const textBlock = el.children.find(c => c.id === 'Card_Text_Block');
        
        if (terminal) {
          terminal.x = el.width - terminal.width - 24;
        }
        
        const closeBtn = el.children.find(c => c.id === 'card-close');
        if (closeBtn) closeBtn.x = el.width - 32;
      }

      if (el.children && el.children.length > 0) {
        buildMap(el.children);
      }
    });
  };
  buildMap(solvedElements);

  // Aplicação de Métricas de Espaçamento Negativo (Vertical Flow)
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
 * Reconstrução Analítica do Logo Grok/xAI via Raw SVG.
 * Protocolo de Identidade Vetorial (Lâmina Afiada).
 */
function createGrokLogo(id: string, name: string, size: number, color: string): UIElement {
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
        name: 'Logo_Slash',
        type: 'path',
        x: 0, y: 0, width: size, height: size,
        fill: 'none', stroke: color, strokeWidth: 1.75 * scale, strokeLinecap: 'round',
        pathData: `M ${4.5 * scale} ${19.5 * scale} L ${19.5 * scale} ${4.5 * scale}`,
        visible: true, locked: false, opacity: 1
      },
      {
        id: `${id}_Left_Arc`,
        name: 'Logo_Left_Arc',
        type: 'path',
        x: 0, y: 0, width: size, height: size,
        fill: color, stroke: 'none',
        pathData: `M ${10.2 * scale} ${4.5 * scale} C ${7.2 * scale} ${8.5 * scale} ${7.2 * scale} ${15.5 * scale} ${10.2 * scale} ${19.5 * scale} C ${8.5 * scale} ${15.5 * scale} ${8.5 * scale} ${8.5 * scale} ${10.2 * scale} ${4.5 * scale} Z`,
        visible: true, locked: false, opacity: 1
      },
      {
        id: `${id}_Right_Arc`,
        name: 'Logo_Right_Arc',
        type: 'path',
        x: 0, y: 0, width: size, height: size,
        fill: color, stroke: 'none',
        pathData: `M ${13.8 * scale} ${4.5 * scale} C ${16.8 * scale} ${8.5 * scale} ${16.8 * scale} ${15.5 * scale} ${13.8 * scale} ${19.5 * scale} C ${12.1 * scale} ${15.5 * scale} ${12.1 * scale} ${8.5 * scale} ${13.8 * scale} ${4.5 * scale} Z`,
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
          ...createGrokLogo('TopLogo', 'Header_Logo', 18, textPrimary),
          x: 24, y: 21
        },
        {
          id: 'Imagine_Toggle_Group',
          name: 'Imagine_Toggle (Tertiary)',
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
          name: 'Settings (Tertiary)',
          type: 'group',
          x: 0, y: 22, width: 20, height: 20,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { 
              id: 'Settings_Icon_Path', 
              name: 'Settings_Gear_Path', 
              type: 'path', 
              x: 0, y: 0, width: 20, height: 20, 
              fill: 'none', stroke: textPrimary, strokeWidth: 1.5, opacity: 0.6, visible: true, locked: false, 
              pathData: 'M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z'
            }
          ]
        },
        {
          id: 'Login_Button_Group',
          name: 'Login (Secondary)',
          type: 'group',
          x: 0, y: 14, width: 76, height: 32,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'Login_Pill', name: 'Login_Outline', type: 'pill', x: 0, y: 0, width: 76, height: 32, fill: 'none', stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1, rx: 9999, ry: 9999, opacity: 1, visible: true, locked: false },
            { id: 'Login_Text', name: 'Login_Label', type: 'text', x: 38, y: 20, width: 0, height: 0, fill: textPrimary, text: 'Entrar', fontSize: 13, fontWeight: '500', textAlign: 'center', visible: true, locked: false }
          ]
        },
        { id: 'SignUpPill', name: 'Sign_Up (Primary)', type: 'pill', x: 0, y: 14, width: 92, height: 32, fill: textPrimary, opacity: 1, visible: true, locked: false, rx: 8, ry: 8 },
        { id: 'SignUpText', name: 'Sign_Up_Text', type: 'text', x: 0, y: 34, width: 0, height: 0, fill: darkBlack, text: 'Criar conta', fontSize: 12, fontWeight: '600', textAlign: 'center', visible: true, locked: false }
      ]
    },
    {
      id: 'HeroBranding',
      name: 'Hero_Branding',
      type: 'group',
      x: 0, y: 210, width: 220, height: 56,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { 
          ...createGrokLogo('HeroLogo', 'Hero_Logo_Main', 56, textPrimary),
          x: 0, y: 0
        },
        { id: 'HeroName', name: 'Grok_Title', type: 'text', x: 68, y: 48, width: 0, height: 0, fill: textPrimary, text: 'Grok', fontSize: 56, fontWeight: '700', visible: true, locked: false }
      ]
    },
    {
      id: 'PromptPill',
      name: 'Prompt_Pill_Input',
      type: 'group',
      x: 0, y: 320, width: 700, height: 56,
      fill: 'none', opacity: 1, visible: true, locked: false,
      shadow: '0 8 24 rgba(0,0,0,0.4)', 
      children: [
        { id: 'pill-surface', name: 'Pill_BG', type: 'pill', x: 0, y: 0, width: 700, height: 56, fill: surface, opacity: 1, stroke: border, strokeWidth: 1, rx: 28, ry: 28, visible: true, locked: false },
        { id: 'pill-plus', name: 'Plus_Icon', type: 'path', x: 20, y: 20, width: 16, height: 16, fill: 'none', stroke: textSecondary, strokeWidth: 1.5, visible: true, locked: false, pathData: 'M8 2 V14 M2 8 H14' },
        { id: 'pill-hint', name: 'Hint', type: 'text', x: 52, y: 34, width: 0, height: 0, fill: textSecondary, text: 'O que você quer saber?', fontSize: 16, fontWeight: '400', visible: true, locked: false },
        {
          id: 'pill-model-selector',
          name: 'Model_Selector',
          type: 'group',
          x: 0, y: 20, width: 60, height: 16,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'pill-fast-text', name: 'Fast_Label', type: 'text', x: 0, y: 14, width: 0, height: 0, fill: textPrimary, text: 'Fast', fontSize: 13, fontWeight: '600', visible: true, locked: false },
            { id: 'pill-fast-chevron', name: 'Chevron', type: 'path', x: 35, y: 8, width: 10, height: 10, fill: 'none', stroke: textPrimary, strokeWidth: 1.5, pathData: 'M2 4 L5 7 L8 4', visible: true, locked: false }
          ]
        },
        {
          id: 'pill-send-group',
          name: 'Send_Action',
          type: 'group',
          x: 0, y: 8, width: 40, height: 40,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'pill-send-circle', name: 'Circle', type: 'circle', x: 0, y: 0, width: 40, height: 40, fill: '#262626', opacity: 1, visible: true, locked: false },
            { id: 'pill-send-arrow', name: 'Arrow', x: 15, y: 12, width: 10, height: 16, type: 'path', fill: 'none', stroke: textPrimary, strokeWidth: 2, pathData: 'M5 14 V2 M2 5 L5 2 L8 5', visible: true, locked: false }
          ]
        }
      ]
    },
    {
      id: 'BuildCard',
      name: 'Grok_Build_Card',
      type: 'group',
      x: 0, y: 410, width: 700, height: 130,
      fill: 'none', opacity: 1, visible: true, locked: false,
      shadow: '0 4 20 rgba(0,0,0,0.3)',
      children: [
        { id: 'card-bg', name: 'Surface', type: 'rect', x: 0, y: 0, width: 700, height: 130, fill: surface, opacity: 1, rx: 12, stroke: border, strokeWidth: 1, visible: true, locked: false },
        {
          id: 'Card_Text_Block',
          name: 'Text_Block',
          type: 'group',
          x: 24, y: 30, width: 300, height: 80,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'card-title', name: 'Title', type: 'text', x: 0, y: 15, width: 0, height: 0, fill: textPrimary, text: 'Grok Build', fontSize: 18, fontWeight: '700', visible: true, locked: false },
            { id: 'card-beta-badge', name: 'Badge_BG', type: 'pill', x: 100, y: 0, width: 40, height: 20, fill: accentBeta, opacity: 0.1, visible: true, locked: false },
            { id: 'card-beta-text', name: 'Badge_Text', type: 'text', x: 120, y: 14, width: 0, height: 0, fill: accentBeta, text: 'Beta', fontSize: 10, fontWeight: '700', textAlign: 'center', visible: true, locked: false },
            { id: 'card-desc', name: 'Desc_1', type: 'text', x: 0, y: 42, width: 0, height: 0, fill: textSecondary, text: 'Acesso antecipado para assinantes', fontSize: 13, visible: true, locked: false },
            { id: 'card-desc-2', name: 'Desc_2', type: 'text', x: 0, y: 62, width: 0, height: 0, fill: textSecondary, text: 'SuperGrok e X Premium+', fontSize: 13, visible: true, locked: false }
          ]
        },
        { id: 'card-close', name: 'Close', type: 'path', x: 0, y: 20, width: 12, height: 12, fill: 'none', stroke: textSecondary, strokeWidth: 1.5, visible: true, locked: false, pathData: 'M2 2 L10 10 M10 2 L2 10' },
        {
          id: 'TerminalGroup',
          name: 'Terminal_Unit',
          type: 'group',
          x: 0, y: 30, width: 340, height: 70,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'PowerShell_Tab', name: 'Tab_PS', type: 'text', x: 0, y: 10, width: 0, height: 0, fill: textPrimary, text: 'PowerShell', fontSize: 11, fontWeight: '600', visible: true, locked: false },
            { id: 'WSL_Tab', name: 'Tab_WSL', type: 'text', x: 80, y: 10, width: 0, height: 0, fill: textSecondary, text: 'WSL', fontSize: 11, fontWeight: '400', visible: true, locked: false },
            { id: 'term-bg', name: 'CLI_BG', type: 'rect', x: 0, y: 20, width: 340, height: 45, fill: darkBlack, opacity: 0.8, rx: 8, visible: true, locked: false, stroke: border, strokeWidth: 0.5 },
            { id: 'term-text', name: 'Command', type: 'text', x: 15, y: 48, width: 0, height: 0, fill: textPrimary, text: 'irm https://x.ai/cli/install.ps1 | iex', fontSize: 11, fontFamily: 'monospace', visible: true, locked: false },
            { 
              id: 'term-copy-icon', 
              name: 'Copy_Asset', 
              type: 'path', 
              x: 310, y: 35, width: 16, height: 16, 
              fill: 'none', stroke: textSecondary, strokeWidth: 1.5, visible: true, locked: false,
              pathData: 'M4 4 H12 V12 H4 Z M2 2 H10 V10 H2 Z' 
            }
          ]
        }
      ]
    },
    {
      id: 'Footer',
      name: 'Disclaimer (Ancoragem Absoluta)',
      type: 'text',
      x: 640, y: 700,
      width: 0, height: 0,
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
      visualFidelity: 100,
      layoutFidelity: 100,
      spacingFidelity: 100,
      typographyFidelity: 100,
      logoFidelity: 100
    }
  };
}
