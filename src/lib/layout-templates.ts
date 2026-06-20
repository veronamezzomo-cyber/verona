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
 * RECONSTRUÇÃO DE ENGENHARIA REVERSA: Grok.com Homepage
 */
export function generateGrokDashboardElements(): UIElement[] {
  const bg = '#000000';
  const surface = '#161616';
  const border = '#262626';
  const textPrimary = '#FFFFFF';
  const textSecondary = '#828282';
  const accentBeta = '#D34B30';
  const codeBg = '#0A0A0A';

  return [
    {
      id: 'root-bg',
      name: 'Background',
      type: 'rect',
      x: 0, y: 0, width: 1280, height: 720,
      fill: bg, opacity: 1, visible: true, locked: true
    },
    {
      id: 'top-nav-group',
      name: 'Top Navigation',
      type: 'group',
      x: 0, y: 0, width: 1280, height: 60,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { 
          id: 'nav-logo-glyph', 
          name: 'Grok Glyph', 
          type: 'path', 
          x: 24, y: 18, width: 24, height: 24, 
          fill: 'none', stroke: textPrimary, strokeWidth: 1.5, opacity: 1, visible: true, locked: false,
          pathData: 'M12 2L2 12M12 2L22 12M12 22L2 12M12 22L22 12'
        },
        { id: 'nav-imagine', name: 'Imagine Link', type: 'text', x: 1020, y: 36, width: 0, height: 0, fill: textPrimary, text: 'Imagine', fontSize: 14, fontWeight: '500', visible: true, locked: false },
        { id: 'nav-login', name: 'Login Text', type: 'text', x: 1140, y: 36, width: 0, height: 0, fill: textPrimary, text: 'Entrar', fontSize: 14, fontWeight: '500', visible: true, locked: false },
        { id: 'nav-signup-bg', name: 'Signup Button BG', type: 'rect', x: 1200, y: 14, width: 110, height: 32, fill: textPrimary, opacity: 1, rx: 16, visible: true, locked: false },
        { id: 'nav-signup-txt', name: 'Signup Button Label', type: 'text', x: 1255, y: 35, width: 0, height: 0, fill: bg, text: 'Criar conta', fontSize: 13, fontWeight: '600', textAlign: 'center', visible: true, locked: false }
      ]
    },
    {
      id: 'hero-center',
      name: 'Hero Interaction Zone',
      type: 'group',
      x: 240, y: 180, width: 800, height: 420,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { 
          id: 'hero-logo-glyph', 
          name: 'Main Grok Logo', 
          type: 'path', 
          x: 330, y: 0, width: 48, height: 48, 
          fill: 'none', stroke: textPrimary, strokeWidth: 2, visible: true, locked: false,
          pathData: 'M24 4L4 24M24 4L44 24M24 44L4 24M24 44L44 24'
        },
        { id: 'hero-logo-text', name: 'Grok Label', type: 'text', x: 440, y: 44, width: 0, height: 0, fill: textPrimary, text: 'Grok', fontSize: 52, fontWeight: '700', visible: true, locked: false },
        { id: 'prompt-input-bg', name: 'Prompt Pill Container', type: 'rect', x: 0, y: 110, width: 800, height: 64, fill: surface, opacity: 1, rx: 32, stroke: border, strokeWidth: 1, visible: true, locked: false },
        { id: 'prompt-placeholder', name: 'Prompt Placeholder', type: 'text', x: 60, y: 148, width: 0, height: 0, fill: textSecondary, text: 'O que você quer saber?', fontSize: 18, visible: true, locked: false },
        { id: 'prompt-send-bg', name: 'Send Button Surface', type: 'circle', x: 748, y: 120, width: 44, height: 44, fill: '#333333', opacity: 1, visible: true, locked: false }
      ]
    }
  ];
}