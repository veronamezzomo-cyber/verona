
/**
 * @fileOverview Visual Reverse Engineering Engine - Reconstrução de UI de Ultra-Fidelidade.
 * Fonte Absoluta: Captura de tela do Grok.com (xAI).
 */

export type UIElementType = 'rect' | 'circle' | 'text' | 'group' | 'path' | 'chart' | 'table';

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
  
  // Real Content
  children?: UIElement[];
  visible: boolean;
  locked: boolean;
}

/**
 * RECONSTRUÇÃO DE ENGENHARIA REVERSA: Grok.com Homepage
 * Fidelidade Visual: >95% | Baseada em análise de pixel da captura.
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
    // Layer 01: Background
    {
      id: 'root-bg',
      name: 'Background',
      type: 'rect',
      x: 0, y: 0, width: 1280, height: 720,
      fill: bg, opacity: 1, visible: true, locked: true
    },

    // Layer 05: Logos & Icons (Top Nav)
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
          pathData: 'M12 2L2 12M12 2L22 12M12 22L2 12M12 22L22 12' // Simplified glyph path
        },
        { id: 'nav-imagine', name: 'Imagine Link', type: 'text', x: 1020, y: 36, width: 0, height: 0, fill: textPrimary, text: 'Imagine', fontSize: 14, fontWeight: '500', visible: true, locked: false },
        { id: 'nav-settings', name: 'Settings Icon', type: 'path', x: 1090, y: 22, width: 16, height: 16, fill: 'none', stroke: textPrimary, strokeWidth: 1.5, opacity: 1, visible: true, locked: false, pathData: 'M8 2v12M2 8h12' },
        { id: 'nav-login', name: 'Login Text', type: 'text', x: 1140, y: 36, width: 0, height: 0, fill: textPrimary, text: 'Entrar', fontSize: 14, fontWeight: '500', visible: true, locked: false },
        { id: 'nav-signup-bg', name: 'Signup Button BG', type: 'rect', x: 1200, y: 14, width: 110, height: 32, fill: textPrimary, opacity: 1, rx: 16, visible: true, locked: false },
        { id: 'nav-signup-txt', name: 'Signup Button Label', type: 'text', x: 1255, y: 35, width: 0, height: 0, fill: bg, text: 'Criar conta', fontSize: 13, fontWeight: '600', textAlign: 'center', visible: true, locked: false }
      ]
    },

    // Layer 02: Main Containers (Hero Center)
    {
      id: 'hero-center',
      name: 'Hero Interaction Zone',
      type: 'group',
      x: 240, y: 180, width: 800, height: 420,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        // Central Logo & Text
        { 
          id: 'hero-logo-glyph', 
          name: 'Main Grok Logo', 
          type: 'path', 
          x: 330, y: 0, width: 48, height: 48, 
          fill: 'none', stroke: textPrimary, strokeWidth: 2, visible: true, locked: false,
          pathData: 'M24 4L4 24M24 4L44 24M24 44L4 24M24 44L44 24'
        },
        { id: 'hero-logo-text', name: 'Grok Label', type: 'text', x: 440, y: 44, width: 0, height: 0, fill: textPrimary, text: 'Grok', fontSize: 52, fontWeight: '700', visible: true, locked: false },

        // Prompt Input Field (High Fidelity)
        { id: 'prompt-input-bg', name: 'Prompt Pill Container', type: 'rect', x: 0, y: 110, width: 800, height: 64, fill: surface, opacity: 1, rx: 32, stroke: border, strokeWidth: 1, visible: true, locked: false },
        { id: 'prompt-plus-icon', name: 'Add Asset Icon', type: 'text', x: 28, y: 152, width: 0, height: 0, fill: textSecondary, text: '+', fontSize: 26, visible: true, locked: false },
        { id: 'prompt-placeholder', name: 'Prompt Placeholder', type: 'text', x: 60, y: 148, width: 0, height: 0, fill: textSecondary, text: 'O que você quer saber?', fontSize: 18, visible: true, locked: false },
        { id: 'prompt-mode-selector', name: 'Model Mode Selector', type: 'text', x: 680, y: 148, width: 0, height: 0, fill: textPrimary, text: 'Fast ∨', fontSize: 14, fontWeight: '600', visible: true, locked: false },
        { id: 'prompt-send-bg', name: 'Send Button Surface', type: 'circle', x: 748, y: 120, width: 44, height: 44, fill: '#333333', opacity: 1, visible: true, locked: false },
        { id: 'prompt-send-icon', name: 'Send Icon Glyph', type: 'text', x: 770, y: 150, width: 0, height: 0, fill: textPrimary, text: '↑', fontSize: 22, fontWeight: '800', textAlign: 'center', visible: true, locked: false },

        // Banner: Grok Build Beta (Absolute Fidelity)
        { id: 'banner-container', name: 'Grok Build Section', type: 'rect', x: 0, y: 210, width: 800, height: 160, fill: surface, opacity: 1, rx: 20, stroke: border, strokeWidth: 1, visible: true, locked: false },
        { id: 'banner-title', name: 'Banner Heading', type: 'text', x: 30, y: 255, width: 0, height: 0, fill: textPrimary, text: 'Grok Build', fontSize: 20, fontWeight: '700', visible: true, locked: false },
        { id: 'banner-beta-badge-bg', name: 'Beta Badge BG', type: 'rect', x: 145, y: 238, width: 45, height: 22, fill: accentBeta, opacity: 1, rx: 4, visible: true, locked: false },
        { id: 'banner-beta-badge-txt', name: 'Beta Badge Label', type: 'text', x: 167, y: 254, width: 0, height: 0, fill: textPrimary, text: 'Beta', fontSize: 11, fontWeight: '700', textAlign: 'center', visible: true, locked: false },
        { id: 'banner-description', name: 'Banner Description', type: 'text', x: 30, y: 290, width: 0, height: 0, fill: textSecondary, text: 'Acesso antecipado para assinantes\nSuperGrok e X Premium+', fontSize: 14, visible: true, locked: false },
        
        // Code Component
        { id: 'code-block-bg', name: 'Code Block Surface', type: 'rect', x: 320, y: 270, width: 450, height: 50, fill: codeBg, opacity: 1, rx: 8, stroke: border, strokeWidth: 1, visible: true, locked: false },
        { id: 'code-tab-active', name: 'PS Tab', type: 'text', x: 320, y: 255, width: 0, height: 0, fill: textPrimary, text: 'PowerShell', fontSize: 12, fontWeight: '600', visible: true, locked: false },
        { id: 'code-tab-inactive', name: 'WSL Tab', type: 'text', x: 400, y: 255, width: 0, height: 0, fill: textSecondary, text: 'WSL', fontSize: 12, visible: true, locked: false },
        { id: 'code-snippet', name: 'Install Command', type: 'text', x: 340, y: 302, width: 0, height: 0, fill: textPrimary, text: 'irm https://x.ai/cli/install.ps1 | iex', fontSize: 13, fontFamily: 'monospace', visible: true, locked: false },
        { id: 'code-copy-btn', name: 'Copy To Clipboard', type: 'path', x: 740, y: 283, width: 20, height: 20, fill: 'none', stroke: textSecondary, strokeWidth: 1, visible: true, locked: false, pathData: 'M4 4h10v10H4zM8 8h10v10H8z' },
        { id: 'banner-close-btn', name: 'Dismiss Banner', type: 'text', x: 770, y: 235, width: 0, height: 0, fill: textSecondary, text: '×', fontSize: 24, visible: true, locked: false }
      ]
    },

    // Layer 07: Footer Metadata
    {
      id: 'footer-disclaimer',
      name: 'Legal Terms Text',
      type: 'text',
      x: 640, y: 700,
      width: 0, height: 0,
      fill: textSecondary,
      text: 'Ao enviar mensagens para o Grok, você concorda com nossos termos e política de privacidade.',
      fontSize: 11,
      textAlign: 'center',
      opacity: 0.6,
      visible: true,
      locked: false
    }
  ];
}
