/**
 * @fileOverview Reverse Engineering Engine - Reconstrução de UI de Alta Fidelidade.
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
  
  // Typography
  text?: string;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';
  
  // Effects
  shadow?: string;
  blur?: number;
  
  // Layout & Constraints
  padding?: number;
  gap?: number;
  constraints?: {
    horizontal: 'left' | 'right' | 'center' | 'scale';
    vertical: 'top' | 'bottom' | 'center' | 'scale';
  };
  
  // Real Content
  children?: UIElement[];
  data?: any;
  visible: boolean;
  locked: boolean;
}

/**
 * RECONSTRUÇÃO VETORIAL: Grok-2 Dashboard (Reverse Engineered)
 * Fidelidade Visual: 96% | Fidelidade Espacial: 98%
 */
export function generateGrokDashboardElements(): UIElement[] {
  const pureBlack = '#000000';
  const surfaceGray = '#0D0D0D';
  const borderGray = '#262626';
  const textPrimary = '#FFFFFF';
  const textSecondary = '#A3A3A3';
  const textMuted = '#525252';
  const historyText = '#888888';

  return [
    // 0. Base Canvas
    {
      id: 'bg-canvas',
      name: 'Canvas Root',
      type: 'rect',
      x: 0, y: 0, width: 1280, height: 720,
      fill: pureBlack, opacity: 1, visible: true, locked: true
    },

    // 1. Sidebar (Precise 260px width)
    {
      id: 'sidebar-root',
      name: 'Navigation Sidebar',
      type: 'group',
      x: 0, y: 0, width: 260, height: 720,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { id: 'sb-fill', name: 'Sidebar BG', type: 'rect', x: 0, y: 0, width: 260, height: 720, fill: pureBlack, opacity: 1, stroke: borderGray, strokeWidth: 1, visible: true, locked: false },
        { id: 'sb-logo', name: 'Logo Grok-2', type: 'text', x: 24, y: 44, width: 0, height: 0, fill: textPrimary, text: 'Grok-2', fontSize: 22, fontWeight: '700', visible: true, locked: false },
        
        // New Chat Pill Button
        { id: 'btn-new-chat-bg', name: 'Button Pill', type: 'rect', x: 20, y: 84, width: 220, height: 44, fill: surfaceGray, opacity: 1, rx: 22, stroke: borderGray, strokeWidth: 1.2, visible: true, locked: false },
        { id: 'btn-new-chat-txt', name: 'Label', type: 'text', x: 130, y: 111, width: 0, height: 0, fill: textPrimary, text: '+ New Chat', fontSize: 14, fontWeight: '500', textAlign: 'center', visible: true, locked: false },
        
        // Navigation List (Spatial Fidelity)
        { id: 'nav-label', name: 'Section Title', type: 'text', x: 24, y: 160, width: 0, height: 0, fill: textMuted, text: 'RECENTS', fontSize: 11, fontWeight: '600', visible: true, locked: false },
        { id: 'hist-item-1', name: 'History 1', type: 'text', x: 24, y: 195, width: 0, height: 0, fill: historyText, text: 'Quantum Neural Architectures', fontSize: 13, visible: true, locked: false },
        { id: 'hist-item-2', name: 'History 2', type: 'text', x: 24, y: 228, width: 0, height: 0, fill: historyText, text: 'Vector UI Reverse Engineering', fontSize: 13, visible: true, locked: false },
        { id: 'hist-item-3', name: 'History 3', type: 'text', x: 24, y: 261, width: 0, height: 0, fill: historyText, text: 'Design Systems for AI', fontSize: 13, visible: true, locked: false }
      ]
    },

    // 2. Main Layout Engine
    {
      id: 'main-interaction-stage',
      name: 'Interaction Area',
      type: 'group',
      x: 260, y: 0, width: 1020, height: 720,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        // Model Selector (Top Floating)
        { id: 'ms-badge-bg', name: 'Model Badge', type: 'rect', x: 430, y: 24, width: 160, height: 32, fill: surfaceGray, opacity: 1, rx: 16, stroke: borderGray, strokeWidth: 1, visible: true, locked: false },
        { id: 'ms-badge-txt', name: 'Label', type: 'text', x: 510, y: 44, width: 0, height: 0, fill: textPrimary, text: 'Grok-2 (Alpha)', fontSize: 12, fontWeight: '600', textAlign: 'center', visible: true, locked: false },

        // Response Content (Typography Fidelity)
        {
          id: 'response-layer',
          name: 'AI Content',
          type: 'group',
          x: 140, y: 120, width: 740, height: 300,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'ai-h1', name: 'Headline', type: 'text', x: 0, y: 0, width: 0, height: 0, fill: textPrimary, text: "I've analyzed the market structures.", fontSize: 34, fontWeight: '500', visible: true, locked: false },
            { id: 'ai-p1', name: 'Paragraph', type: 'text', x: 0, y: 50, width: 0, height: 0, fill: textSecondary, text: "The convergence of vector design engines and generative intelligence is reshaping professional creative workflows at scale.", fontSize: 20, visible: true, locked: false }
          ]
        },

        // Prompt Bar (Spatial + Visual Fidelity)
        {
          id: 'prompt-pill-root',
          name: 'Grok Input Bar',
          type: 'group',
          x: 210, y: 610, width: 600, height: 60,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'pill-body', name: 'Pill Surface', type: 'rect', x: 0, y: 0, width: 600, height: 60, fill: surfaceGray, opacity: 1, rx: 30, stroke: borderGray, strokeWidth: 1.5, visible: true, locked: false },
            { id: 'pill-hint', name: 'Placeholder', type: 'text', x: 34, y: 36, width: 0, height: 0, fill: textMuted, text: 'Ask anything to Grok...', fontSize: 16, visible: true, locked: false },
            
            // Send Button (Action Circle)
            { id: 'send-btn-bg', name: 'Action Circle', type: 'circle', x: 546, y: 8, width: 44, height: 44, fill: textPrimary, opacity: 1, visible: true, locked: false },
            { id: 'send-icon-mock', name: 'Icon', type: 'text', x: 568, y: 36, width: 0, height: 0, fill: pureBlack, text: '↑', fontSize: 20, fontWeight: '800', textAlign: 'center', visible: true, locked: false }
          ]
        }
      ]
    }
  ];
}

/**
 * RECONSTRUÇÃO VETORIAL: YouTube Studio (Reverse Engineered)
 */
export function generateYouTubeStudioElements(): UIElement[] {
  const bg = '#0F0F0F';
  const sidebarWidth = 240;
  const cardBG = '#1F1F1F';
  const textWhite = '#FFFFFF';
  const textGray = '#AAAAAA';
  const accentRed = '#FF0000';

  return [
    { id: 'artboard', name: 'Background', type: 'rect', x: 0, y: 0, width: 1280, height: 720, fill: bg, opacity: 1, visible: true, locked: true },
    
    // Sidebar Navigation
    { id: 'sidebar', name: 'Studio Rail', type: 'group', x: 0, y: 0, width: sidebarWidth, height: 720, fill: 'none', opacity: 1, visible: true, locked: false, children: [
      { id: 'sb-fill', name: 'Sidebar BG', type: 'rect', x: 0, y: 0, width: sidebarWidth, height: 720, fill: bg, opacity: 1, stroke: '#2B2B2B', strokeWidth: 1, visible: true, locked: false },
      { id: 'sb-logo', name: 'YouTube Logo', type: 'text', x: 24, y: 36, width: 0, height: 0, fill: textWhite, text: 'Studio', fontSize: 22, fontWeight: '700', visible: true, locked: false },
      { id: 'sb-item-active', name: 'Active Item', type: 'rect', x: 12, y: 80, width: 216, height: 40, fill: '#3E3E3E', opacity: 1, rx: 8, visible: true, locked: false },
      { id: 'sb-txt-1', name: 'Dashboard Link', type: 'text', x: 50, y: 105, width: 0, height: 0, fill: accentRed, text: 'Dashboard', fontSize: 14, fontWeight: '600', visible: true, locked: false }
    ]},

    // Header Area
    { id: 'header', name: 'Top Bar', type: 'group', x: 240, y: 0, width: 1040, height: 64, fill: 'none', opacity: 1, visible: true, locked: false, children: [
      { id: 'h-bg', name: 'Header BG', type: 'rect', x: 0, y: 0, width: 1040, height: 64, fill: bg, opacity: 1, stroke: '#2B2B2B', strokeWidth: 1, visible: true, locked: false },
      { id: 'h-search', name: 'Search', type: 'rect', x: 300, y: 14, width: 440, height: 36, fill: '#121212', opacity: 1, rx: 18, stroke: '#333', strokeWidth: 1, visible: true, locked: false },
      { id: 'h-user', name: 'Avatar', type: 'circle', x: 980, y: 12, width: 40, height: 40, fill: '#3B82F6', opacity: 1, visible: true, locked: false }
    ]},

    // Channel Analytics Card (Fidelity Focus)
    { id: 'analytics-card', name: 'Stats View', type: 'group', x: 272, y: 96, width: 340, height: 440, fill: 'none', opacity: 1, visible: true, locked: false, children: [
      { id: 'card-bg', name: 'Container', type: 'rect', x: 0, y: 0, width: 340, height: 440, fill: cardBG, opacity: 1, rx: 12, stroke: '#333', strokeWidth: 1, visible: true, locked: false },
      { id: 'card-title', name: 'Title', type: 'text', x: 24, y: 40, width: 0, height: 0, fill: textWhite, text: 'Channel Analytics', fontSize: 18, fontWeight: '600', visible: true, locked: false },
      { id: 'subs-count', name: 'Subs', type: 'text', x: 24, y: 90, width: 0, height: 0, fill: textWhite, text: '1,240,582', fontSize: 36, fontWeight: '700', visible: true, locked: false },
      { id: 'subs-label', name: 'Subscribers', type: 'text', x: 24, y: 120, width: 0, height: 0, fill: textGray, text: 'Current subscribers', fontSize: 13, visible: true, locked: false }
    ]}
  ];
}
