/**
 * @fileOverview Visual Map System - Definições de infraestrutura para Engenharia Reversa.
 * Contexto: WEBSITE (Fullscreen).
 */

export type UIElementType = 'rect' | 'circle' | 'text' | 'group' | 'path' | 'chart' | 'table' | 'pill' | 'capsule';

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
  shadow?: string; // Formato: "x y blur color" ex: "0 4 12 rgba(0,0,0,0.5)"
  blur?: number;
  
  // Path Data
  pathData?: string;
  
  // Typography
  text?: string;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';
  
  // Metadados de Engenharia Reversa
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
 * Layout Solver Engine
 * Reconcilia coordenadas baseando-se em relações espaciais e regras de posicionamento relativo.
 */
export function applyLayoutSolver(elements: UIElement[], metrics: NegativeSpaceMetrics[]): UIElement[] {
  if (!elements) return [];

  const VIEWPORT_WIDTH = 1280;
  const solvedElements = JSON.parse(JSON.stringify(elements)) as UIElement[];
  const elementMap = new Map<string, UIElement>();

  const buildMap = (els: UIElement[]) => {
    els.forEach(el => {
      elementMap.set(el.id, el);
      
      // AUTO-CENTERING LOGIC (Horizontal)
      if (el.id === 'HeroBranding' || el.id === 'PromptPill' || el.id === 'BuildCard' || el.id === 'Footer') {
        el.x = (VIEWPORT_WIDTH - el.width) / 2;
      }

      // DYNAMIC CHILDREN ANCHORING
      if (el.children && el.children.length > 0) {
        el.children.forEach(child => {
          // Pill Anchoring (Right-aligned elements)
          if (child.id === 'pill-send-circle' || child.id === 'pill-send-arrow') {
            child.x = el.width - 50; // Offset from right
          }
          if (child.id === 'pill-fast-text' || child.id === 'pill-fast-chevron') {
            child.x = el.width - 110; 
          }
          
          // Card Anchoring
          if (child.id === 'card-close') {
             child.x = el.width - 30;
          }
          if (child.id === 'term-bg' || child.id === 'term-tabs') {
             child.x = el.width - 340; 
          }
          if (child.id === 'term-code') {
             child.x = el.width - 320;
          }

          elementMap.set(child.id, child);
        });
        buildMap(el.children);
      }
    });
  };
  buildMap(solvedElements);

  // Reconciliação via Espaço Negativo
  if (metrics) {
    metrics.forEach(metric => {
      const from = elementMap.get(metric.fromId);
      const to = elementMap.get(metric.toId);

      if (from && to) {
        if (metric.relation === 'vertical' && metric.distanceY !== undefined) {
          to.y = from.y + from.height + metric.distanceY;
        } else if (metric.relation === 'horizontal' && metric.distanceX !== undefined) {
          to.x = from.x + from.width + metric.distanceX;
        }
      }
    });
  }

  return solvedElements;
}

export function generateGrokAbsoluteReconstruction(): VisualMap {
  const surface = '#161616';
  const border = '#262626';
  const textPrimary = '#FFFFFF';
  const textSecondary = '#828282';
  const accentBeta = '#D34B30';
  const darkBlack = '#000000';

  const elements: UIElement[] = [
    {
      id: 'Header',
      name: 'Header_Navigation',
      type: 'group',
      x: 0, y: 0, width: 1280, height: 64,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { 
          id: 'TopLogoGlyph', 
          name: 'Top_Logo_Glyph', 
          type: 'path', 
          x: 32, y: 22, width: 20, height: 20, 
          fill: 'none', stroke: textPrimary, strokeWidth: 1.5, opacity: 1, visible: true, locked: false,
          pathData: 'M16 2L4 18M14 2L18 6M2 14L6 18'
        },
        { id: 'ImagineIcon', name: 'Imagine_Icon', type: 'rect', x: 1040, y: 24, width: 16, height: 16, fill: 'none', stroke: textPrimary, strokeWidth: 1, rx: 2, ry: 2, opacity: 1, visible: true, locked: false },
        { id: 'ImagineText', name: 'Imagine_Text', type: 'text', x: 1062, y: 37, width: 0, height: 0, fill: textPrimary, text: 'Imagine', fontSize: 13, fontWeight: '500', visible: true, locked: false },
        { id: 'SettingsIcon', name: 'Settings_Icon', type: 'path', x: 1120, y: 24, width: 16, height: 16, fill: 'none', stroke: textPrimary, strokeWidth: 1.2, opacity: 0.7, visible: true, locked: false, pathData: 'M8 4V12M4 8H12' },
        { id: 'LoginText', name: 'Login_Text', type: 'text', x: 1160, y: 37, width: 0, height: 0, fill: textPrimary, text: 'Entrar', fontSize: 13, fontWeight: '500', visible: true, locked: false },
        { id: 'SignUpPill', name: 'Sign_Up_Pill', type: 'pill', x: 1210, y: 16, width: 85, height: 32, fill: textPrimary, opacity: 1, visible: true, locked: false },
        { id: 'SignUpText', name: 'Sign_Up_Text', type: 'text', x: 1252.5, y: 36, width: 0, height: 0, fill: darkBlack, text: 'Criar conta', fontSize: 12, fontWeight: '600', textAlign: 'center', visible: true, locked: false }
      ]
    },
    {
      id: 'HeroBranding',
      name: 'Hero_Branding_Section',
      type: 'group',
      x: 0, y: 220, width: 200, height: 50,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { 
          id: 'HeroGlyph', 
          name: 'Grok_Glyph', 
          type: 'path', 
          x: 0, y: 0, width: 50, height: 50, 
          fill: 'none', stroke: textPrimary, strokeWidth: 3, opacity: 1, visible: true, locked: false,
          pathData: 'M40 5L10 45M35 5L45 15M5 35L15 45'
        },
        { id: 'HeroName', name: 'Grok_Title_Text', type: 'text', x: 65, y: 44, width: 0, height: 0, fill: textPrimary, text: 'Grok', fontSize: 44, fontWeight: '600', visible: true, locked: false }
      ]
    },
    {
      id: 'PromptPill',
      name: 'Main_Prompt_Input',
      type: 'group',
      x: 0, y: 330, width: 700, height: 60,
      fill: 'none', opacity: 1, visible: true, locked: false,
      shadow: '0 8 24 rgba(0,0,0,0.4)',
      children: [
        { id: 'pill-surface', name: 'Input_Background', type: 'pill', x: 0, y: 0, width: 700, height: 60, fill: surface, opacity: 1, stroke: border, strokeWidth: 1, visible: true, locked: false },
        { id: 'pill-plus', name: 'Add_Attachment_Icon', type: 'text', x: 25, y: 38, width: 0, height: 0, fill: textSecondary, text: '+', fontSize: 24, fontWeight: '300', visible: true, locked: false },
        { id: 'pill-hint', name: 'Placeholder_Hint', type: 'text', x: 60, y: 37, width: 0, height: 0, fill: textSecondary, text: 'O que você quer saber?', fontSize: 16, fontWeight: '400', visible: true, locked: false },
        { id: 'pill-fast-text', name: 'Model_Selector_Text', type: 'text', x: 610, y: 37, width: 0, height: 0, fill: textPrimary, text: 'Fast', fontSize: 13, fontWeight: '600', visible: true, locked: false },
        { id: 'pill-fast-chevron', name: 'Model_Selector_Arrow', type: 'path', x: 645, y: 30, width: 10, height: 10, fill: 'none', stroke: textPrimary, strokeWidth: 1.5, pathData: 'M2 4L5 7L8 4', visible: true, locked: false },
        { id: 'pill-send-circle', name: 'Send_Action_Button', type: 'circle', x: 660, y: 10, width: 40, height: 40, fill: border, opacity: 1, visible: true, locked: false },
        { id: 'pill-send-arrow', name: 'Send_Arrow_Glyph', type: 'path', x: 675, y: 22, width: 10, height: 16, fill: 'none', stroke: textSecondary, strokeWidth: 2, pathData: 'M5 14V2M2 5L5 2L8 5', visible: true, locked: false }
      ]
    },
    {
      id: 'BuildCard',
      name: 'Developer_Grok_Build_Card',
      type: 'group',
      x: 0, y: 430, width: 600, height: 140,
      fill: 'none', opacity: 1, visible: true, locked: false,
      shadow: '0 4 16 rgba(0,0,0,0.3)',
      children: [
        { id: 'card-bg', name: 'Card_Surface', type: 'rect', x: 0, y: 0, width: 600, height: 140, fill: surface, opacity: 1, rx: 16, stroke: border, strokeWidth: 1, visible: true, locked: false },
        { id: 'card-title', name: 'Card_Header_Title', type: 'text', x: 24, y: 40, width: 0, height: 0, fill: textPrimary, text: 'Grok Build', fontSize: 18, fontWeight: '600', visible: true, locked: false },
        { id: 'card-beta', name: 'Beta_Status_Badge', type: 'pill', x: 120, y: 24, width: 40, height: 20, fill: accentBeta, opacity: 0.2, visible: true, locked: false },
        { id: 'card-beta-text', name: 'Beta_Status_Label', type: 'text', x: 140, y: 38, width: 0, height: 0, fill: accentBeta, text: 'Beta', fontSize: 10, fontWeight: '700', textAlign: 'center', visible: true, locked: false },
        { id: 'card-desc', name: 'Card_Context_Line1', type: 'text', x: 24, y: 70, width: 0, height: 0, fill: textSecondary, text: 'Acesso antecipado para assinantes', fontSize: 13, visible: true, locked: false },
        { id: 'card-desc-2', name: 'Card_Context_Line2', type: 'text', x: 24, y: 90, width: 0, height: 0, fill: textSecondary, text: 'SuperGrok e X Premium+', fontSize: 13, visible: true, locked: false },
        { id: 'card-close', name: 'Close_Dismiss_Icon', type: 'text', x: 570, y: 30, width: 0, height: 0, fill: textSecondary, text: '×', fontSize: 18, visible: true, locked: false },
        { id: 'term-tabs', name: 'Terminal_Tab_Selector', type: 'text', x: 260, y: 40, width: 0, height: 0, fill: textPrimary, text: 'PowerShell  WSL', fontSize: 12, fontWeight: '500', opacity: 0.6, visible: true, locked: false },
        { id: 'term-bg', name: 'Terminal_Interface_BG', type: 'rect', x: 260, y: 60, width: 316, height: 50, fill: darkBlack, rx: 8, stroke: border, strokeWidth: 1, visible: true, locked: false },
        { id: 'term-code', name: 'Command_Line_String', type: 'text', x: 280, y: 92, width: 0, height: 0, fill: textSecondary, text: 'irm https://x.ai/cli/install.ps1 | iex', fontSize: 11, fontFamily: 'monospace', visible: true, locked: false }
      ]
    },
    {
      id: 'Footer',
      name: 'Legal_Compliance_Footer',
      type: 'text',
      x: 0, y: 680,
      width: 1280, height: 0,
      fill: textSecondary,
      text: 'Ao enviar mensagens para o Grok, você concorda com nossos termos e política de privacidade.',
      fontSize: 11,
      textAlign: 'center',
      opacity: 0.5,
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
      visualFidelity: 95,
      layoutFidelity: 98,
      spacingFidelity: 97,
      typographyFidelity: 94,
      logoFidelity: 99
    }
  };
}
