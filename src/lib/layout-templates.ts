/**
 * @fileOverview Visual Map System - Definições de infraestrutura para Engenharia Reversa.
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

/**
 * RECONSTRUÇÃO DE ENGENHARIA REVERSA ABSOLUTA: Grok.com Landing Page
 * Fonte da Verdade: Captura de Tela do Usuário
 */
export function generateGrokAbsoluteReconstruction(): UIElement[] {
  const bg = '#000000';
  const surface = '#0d0d0d';
  const cardBg = '#161616';
  const border = '#262626';
  const textPrimary = '#FFFFFF';
  const textSecondary = '#828282';
  const accentBeta = '#D34B30';
  const terminalBg = '#0a0a0a';

  return [
    {
      id: 'artboard-bg',
      name: 'Background Layer',
      type: 'rect',
      x: 0, y: 0, width: 1280, height: 720,
      fill: bg, opacity: 1, visible: true, locked: true
    },
    // TOP NAVIGATION
    {
      id: 'top-nav',
      name: 'Navigation Bar',
      type: 'group',
      x: 0, y: 0, width: 1280, height: 64,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { 
          id: 'top-logo', 
          name: 'Top Grok Icon', 
          type: 'path', 
          x: 20, y: 20, width: 24, height: 24, 
          fill: 'none', stroke: textPrimary, strokeWidth: 1.5, opacity: 1, visible: true, locked: false,
          pathData: 'M12 2L2 12M12 2L22 12M12 22L2 12M12 22L22 12'
        },
        { id: 'nav-imagine', name: 'Link Imagine', type: 'text', x: 1040, y: 36, width: 0, height: 0, fill: textPrimary, text: 'Imagine', fontSize: 13, fontWeight: '500', visible: true, locked: false },
        { id: 'nav-entrar', name: 'Link Entrar', type: 'text', x: 1145, y: 36, width: 0, height: 0, fill: textPrimary, text: 'Entrar', fontSize: 13, fontWeight: '500', visible: true, locked: false },
        { id: 'nav-signup-btn', name: 'CTA Criar conta', type: 'rect', x: 1205, y: 16, width: 110, height: 32, fill: textPrimary, opacity: 1, rx: 16, visible: true, locked: false },
        { id: 'nav-signup-txt', name: 'CTA Label', type: 'text', x: 1260, y: 37, width: 0, height: 0, fill: bg, text: 'Criar conta', fontSize: 13, fontWeight: '600', textAlign: 'center', visible: true, locked: false }
      ]
    },
    // HERO LOGO
    {
      id: 'hero-logo-group',
      name: 'Hero Logo Branding',
      type: 'group',
      x: 580, y: 220, width: 120, height: 48,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { 
          id: 'hero-glyph', 
          name: 'Grok Glyph High-Fi', 
          type: 'path', 
          x: -60, y: 0, width: 48, height: 48, 
          fill: 'none', stroke: textPrimary, strokeWidth: 2, opacity: 1, visible: true, locked: false,
          pathData: 'M24 4L4 24M24 4L44 24M24 44L4 24M24 44L44 24'
        },
        { id: 'hero-text', name: 'Grok Typography', type: 'text', x: 10, y: 44, width: 0, height: 0, fill: textPrimary, text: 'Grok', fontSize: 48, fontWeight: '600', visible: true, locked: false }
      ]
    },
    // MAIN INPUT BAR
    {
      id: 'search-interaction',
      name: 'Prompt Interaction Pill',
      type: 'group',
      x: 340, y: 340, width: 600, height: 56,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { id: 'pill-bg', name: 'Input Pill Surface', type: 'rect', x: 0, y: 0, width: 600, height: 56, fill: surface, opacity: 1, rx: 28, stroke: border, strokeWidth: 1, visible: true, locked: false },
        { id: 'pill-plus', name: 'Add Icon', type: 'text', x: 20, y: 34, width: 0, height: 0, fill: textSecondary, text: '+', fontSize: 24, fontWeight: '300', visible: true, locked: false },
        { id: 'pill-placeholder', name: 'Input Label', type: 'text', x: 60, y: 34, width: 0, height: 0, fill: textSecondary, text: 'O que você quer saber?', fontSize: 15, fontWeight: '400', visible: true, locked: false },
        { id: 'pill-fast', name: 'Fast Badge', type: 'text', x: 500, y: 34, width: 0, height: 0, fill: textPrimary, text: 'Fast', fontSize: 13, fontWeight: '600', visible: true, locked: false },
        { id: 'pill-send-bg', name: 'Send Action Circle', type: 'circle', x: 550, y: 10, width: 36, height: 36, fill: '#333333', opacity: 1, visible: true, locked: false }
      ]
    },
    // BETA BANNER CARD
    {
      id: 'beta-banner',
      name: 'Developer Beta Card',
      type: 'group',
      x: 340, y: 430, width: 600, height: 160,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { id: 'card-surface', name: 'Card Surface', type: 'rect', x: 0, y: 0, width: 600, height: 160, fill: cardBg, opacity: 1, rx: 16, stroke: border, strokeWidth: 1, visible: true, locked: false },
        { id: 'title-beta', name: 'Card Title', type: 'text', x: 24, y: 40, width: 0, height: 0, fill: textPrimary, text: 'Grok Build', fontSize: 18, fontWeight: '600', visible: true, locked: false },
        { id: 'badge-beta-bg', name: 'Beta Badge BG', type: 'rect', x: 125, y: 24, width: 45, height: 20, fill: accentBeta, opacity: 0.2, rx: 4, visible: true, locked: false },
        { id: 'badge-beta-txt', name: 'Beta Badge Label', type: 'text', x: 147, y: 38, width: 0, height: 0, fill: accentBeta, text: 'Beta', fontSize: 11, fontWeight: '600', textAlign: 'center', visible: true, locked: false },
        { id: 'card-subtext', name: 'Card Description', type: 'text', x: 24, y: 70, width: 300, height: 40, fill: textSecondary, text: 'Acesso antecipado para assinantes SuperGrok e X Premium+', fontSize: 13, fontWeight: '400', visible: true, locked: false },
        
        // Terminal Section
        { id: 'terminal-tabs', name: 'Terminal Shell Select', type: 'text', x: 400, y: 40, width: 0, height: 0, fill: textPrimary, text: 'PowerShell  WSL', fontSize: 12, fontWeight: '500', visible: true, locked: false },
        { id: 'terminal-bg', name: 'Command Surface', type: 'rect', x: 400, y: 60, width: 180, height: 48, fill: terminalBg, opacity: 1, rx: 8, visible: true, locked: false },
        { id: 'terminal-cmd', name: 'CLI Command', type: 'text', x: 415, y: 88, width: 0, height: 0, fill: textSecondary, text: 'irm https://x.ai/cli/...', fontSize: 11, fontWeight: '400', visible: true, locked: false }
      ]
    },
    // FOOTER
    {
      id: 'footer-disclaimer',
      name: 'Legal Footer',
      type: 'text',
      x: 640, y: 700,
      width: 0, height: 0,
      fill: textSecondary,
      text: 'Ao enviar mensagens para o Grok, você concorda com nossos termos e política de privacidade.',
      fontSize: 11,
      fontWeight: '400',
      textAlign: 'center',
      opacity: 0.6,
      visible: true,
      locked: false
    }
  ];
}

export function generateGrokDashboardElements(): UIElement[] {
  return generateGrokAbsoluteReconstruction();
}
