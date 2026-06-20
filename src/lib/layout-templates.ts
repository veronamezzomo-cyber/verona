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
  audit: {
    visualFidelity: number;
    layoutFidelity: number;
    spacingFidelity: number;
    typographyFidelity: number;
    logoFidelity: number;
  };
}

export function generateGrokAbsoluteReconstruction(): UIElement[] {
  const surface = '#0d0d0d';
  const cardBg = '#0d0d0d';
  const border = '#1e1e1e';
  const textPrimary = '#FFFFFF';
  const textSecondary = '#828282';
  const accentBeta = '#D34B30';
  const terminalBg = '#050505';

  return [
    // TOP NAVIGATION (ALIGNED RIGHT)
    {
      id: 'top-nav',
      name: 'Layer 07 — Navigation',
      type: 'group',
      x: 0, y: 0, width: 1280, height: 64,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { id: 'top-imagine', name: 'Imagine_Link', type: 'text', x: 1020, y: 38, width: 0, height: 0, fill: textPrimary, text: 'Imagine', fontSize: 13, fontWeight: '500', visible: true, locked: false },
        { 
          id: 'top-settings', 
          name: 'Settings_Icon', 
          type: 'path', 
          x: 1085, y: 22, width: 20, height: 20, 
          fill: textSecondary, opacity: 0.5, visible: true, locked: false,
          pathData: 'M10 2.5a.5.5 0 0 1 .5.5v1.5a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5zm0 13a.5.5 0 0 1 .5.5v1.5a.5.5 0 0 1-1 0V16a.5.5 0 0 1 .5-.5z'
        },
        { id: 'top-entrar', name: 'Login_Link', type: 'text', x: 1140, y: 38, width: 0, height: 0, fill: textPrimary, text: 'Entrar', fontSize: 13, fontWeight: '500', visible: true, locked: false },
        { id: 'top-signup-pill', name: 'Sign_Up_Button', type: 'pill', x: 1195, y: 16, width: 90, height: 32, fill: textPrimary, opacity: 1, visible: true, locked: false },
        { id: 'top-signup-text', name: 'Sign_Up_Label', type: 'text', x: 1240, y: 37, width: 0, height: 0, fill: '#000000', text: 'Criar conta', fontSize: 12, fontWeight: '600', textAlign: 'center', visible: true, locked: false }
      ]
    },
    // HERO BRANDING (CENTERED)
    {
      id: 'hero-branding',
      name: 'Layer 05 — Branding',
      type: 'group',
      x: 540, y: 220, width: 200, height: 60,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { 
          id: 'hero-glyph', 
          name: 'Grok_Glyph', 
          type: 'path', 
          x: 0, y: 0, width: 50, height: 50, 
          fill: 'none', stroke: textPrimary, strokeWidth: 2, opacity: 1, visible: true, locked: false,
          pathData: 'M40 5L10 45M35 5L45 15M5 35L15 45'
        },
        { id: 'hero-name', name: 'Grok_Text', type: 'text', x: 65, y: 44, width: 0, height: 0, fill: textPrimary, text: 'Grok', fontSize: 44, fontWeight: '600', visible: true, locked: false }
      ]
    },
    // MAIN INPUT PILL
    {
      id: 'prompt-pill-container',
      name: 'Layer 09 — Interaction',
      type: 'group',
      x: 290, y: 340, width: 700, height: 60,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { id: 'pill-surface', name: 'Input_Surface', type: 'pill', x: 0, y: 0, width: 700, height: 60, fill: surface, opacity: 1, stroke: border, strokeWidth: 1, visible: true, locked: false },
        { id: 'pill-plus', name: 'Add_Icon', type: 'text', x: 24, y: 37, width: 0, height: 0, fill: textSecondary, text: '+', fontSize: 22, fontWeight: '300', visible: true, locked: false },
        { id: 'pill-hint', name: 'Placeholder_Text', type: 'text', x: 60, y: 37, width: 0, height: 0, fill: textSecondary, text: 'O que você quer saber?', fontSize: 16, fontWeight: '400', visible: true, locked: false },
        { id: 'pill-fast-btn', name: 'Fast_Selector', type: 'text', x: 620, y: 37, width: 0, height: 0, fill: textPrimary, text: 'Fast v', fontSize: 13, fontWeight: '500', visible: true, locked: false },
        { id: 'pill-send-circle', name: 'Send_Button_BG', type: 'circle', x: 655, y: 10, width: 40, height: 40, fill: '#222', opacity: 1, visible: true, locked: false },
        { id: 'pill-send-arrow', name: 'Arrow_Icon', type: 'text', x: 675, y: 36, width: 0, height: 0, fill: textSecondary, text: '↑', fontSize: 18, fontWeight: '600', textAlign: 'center', visible: true, locked: false }
      ]
    },
    // GROK BUILD CARD
    {
      id: 'build-card',
      name: 'Layer 02 — Features',
      type: 'group',
      x: 290, y: 440, width: 700, height: 160,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { id: 'card-bg', name: 'Card_Background', type: 'rect', x: 0, y: 0, width: 700, height: 160, fill: cardBg, opacity: 1, rx: 16, stroke: border, strokeWidth: 1, visible: true, locked: false },
        { id: 'card-title', name: 'Feature_Title', type: 'text', x: 24, y: 45, width: 0, height: 0, fill: textPrimary, text: 'Grok Build', fontSize: 18, fontWeight: '600', visible: true, locked: false },
        { id: 'beta-badge-bg', name: 'Beta_Badge_Surface', type: 'rect', x: 125, y: 28, width: 42, height: 20, fill: accentBeta, opacity: 0.15, rx: 4, visible: true, locked: false },
        { id: 'beta-badge-txt', name: 'Beta_Label', type: 'text', x: 146, y: 42, width: 0, height: 0, fill: accentBeta, text: 'Beta', fontSize: 11, fontWeight: '600', textAlign: 'center', visible: true, locked: false },
        { id: 'card-desc', name: 'Feature_Description', type: 'text', x: 24, y: 85, width: 280, height: 40, fill: textSecondary, text: 'Acesso antecipado para assinantes SuperGrok e X Premium+', fontSize: 13, fontWeight: '400', visible: true, locked: false },
        
        // Terminal Window
        { id: 'term-tabs', name: 'Terminal_Tabs', type: 'text', x: 400, y: 45, width: 0, height: 0, fill: textSecondary, text: 'PowerShell  WSL', fontSize: 12, fontWeight: '500', visible: true, locked: false },
        { id: 'term-bg', name: 'Shell_Background', type: 'rect', x: 400, y: 65, width: 276, height: 48, fill: terminalBg, opacity: 1, rx: 8, stroke: border, strokeWidth: 1, visible: true, locked: false },
        { id: 'term-cmd', name: 'CLI_Command', type: 'text', x: 415, y: 94, width: 0, height: 0, fill: textSecondary, text: 'irm https://x.ai/cli/install.ps1 | iex', fontSize: 11, fontWeight: '400', visible: true, locked: false },
        { id: 'term-copy', name: 'Copy_Icon', type: 'path', x: 650, y: 82, width: 14, height: 14, fill: textSecondary, opacity: 0.8, visible: true, locked: false, pathData: 'M4 4h8v8H4z' }
      ]
    },
    // FOOTER
    {
      id: 'legal-footer',
      name: 'Layer 10 — Metadata',
      type: 'text',
      x: 640, y: 700, width: 0, height: 0,
      fill: textSecondary, opacity: 0.5,
      text: 'Ao enviar mensagens para o Grok, você concorda com nossos termos e política de privacidade.',
      fontSize: 11, fontWeight: '400', textAlign: 'center',
      visible: true, locked: false
    }
  ];
}

export function generateGrokDashboardElements(): UIElement[] {
  return generateGrokAbsoluteReconstruction();
}
