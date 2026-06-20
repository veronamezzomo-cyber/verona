/**
 * @fileOverview Definição de tipos e propriedades de nível profissional para elementos vetoriais.
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
  data?: any; // Para gráficos e tabelas
  visible: boolean;
  locked: boolean;
}

/**
 * Gerador de Grok.com Dashboard de Alta Fidelidade (xAI Style).
 */
export function generateGrokDashboardElements(): UIElement[] {
  const primary = '#3B82F6';
  const text = '#FFFFFF';
  const bg = '#000000';
  const muted = '#1A1A1A';
  const border = '#262626';

  return [
    // Artboard (Deep Black)
    {
      id: 'artboard',
      name: 'Artboard',
      type: 'rect',
      x: 0, y: 0, width: 1280, height: 720,
      fill: bg, opacity: 1, visible: true, locked: true
    },
    // Sidebar (Grok History)
    {
      id: 'grok-sidebar',
      name: 'History Sidebar',
      type: 'group',
      x: 0, y: 0, width: 260, height: 720,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { id: 'sb-bg', name: 'Background', type: 'rect', x: 0, y: 0, width: 260, height: 720, fill: bg, opacity: 1, stroke: border, strokeWidth: 1, visible: true, locked: false },
        { id: 'sb-logo', name: 'Grok Logo', type: 'text', x: 20, y: 40, width: 0, height: 0, fill: text, text: 'Grok-2', fontSize: 20, fontWeight: '700', visible: true, locked: false },
        { id: 'new-chat', name: 'New Chat Btn', type: 'rect', x: 20, y: 80, width: 220, height: 40, fill: muted, opacity: 1, rx: 20, stroke: border, strokeWidth: 1, visible: true, locked: false },
        { id: 'new-chat-txt', name: 'Label', type: 'text', x: 130, y: 105, width: 0, height: 0, fill: text, text: '+ New Chat', fontSize: 13, textAlign: 'center', visible: true, locked: false },
        { id: 'hist-1', name: 'Recent 1', type: 'text', x: 20, y: 160, width: 0, height: 0, fill: '#888', text: 'Quantum Physics Engine', fontSize: 12, visible: true, locked: false },
        { id: 'hist-2', name: 'Recent 2', type: 'text', x: 20, y: 190, width: 0, height: 0, fill: '#888', text: 'Market Analysis 2024', fontSize: 12, visible: true, locked: false }
      ]
    },
    // Main Chat Interface
    {
      id: 'chat-container',
      name: 'Main Interaction',
      type: 'group',
      x: 260, y: 0, width: 1020, height: 720,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        // AI Response Bubble (Large & Clean)
        { 
          id: 'ai-response', 
          name: 'AI Response Layer', 
          type: 'group', 
          x: 100, y: 100, width: 820, height: 200, 
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'ai-txt-1', name: 'Greeting', type: 'text', x: 0, y: 0, width: 0, height: 0, fill: text, text: "I've analyzed the current market trends.", fontSize: 28, fontWeight: '500', visible: true, locked: false },
            { id: 'ai-txt-2', name: 'Content', type: 'text', x: 0, y: 40, width: 0, height: 0, fill: '#A3A3A3', text: "The convergence of AI and decentralized compute is accelerating...", fontSize: 18, visible: true, locked: false }
          ]
        },
        // Floating Input Bar (Signature Grok Pill)
        {
          id: 'input-pill',
          name: 'Prompt Input Bar',
          type: 'group',
          x: 210, y: 600, width: 600, height: 56,
          fill: 'none', opacity: 1, visible: true, locked: false,
          children: [
            { id: 'pill-bg', name: 'Pill BG', type: 'rect', x: 0, y: 0, width: 600, height: 56, fill: '#0D0D0D', opacity: 1, rx: 28, stroke: border, strokeWidth: 1.5, visible: true, locked: false },
            { id: 'pill-placeholder', name: 'Placeholder', type: 'text', x: 30, y: 34, width: 0, height: 0, fill: '#525252', text: 'Ask anything to Grok...', fontSize: 15, visible: true, locked: false },
            { id: 'pill-btn', name: 'Action Button', type: 'circle', x: 550, y: 8, width: 40, height: 40, fill: text, opacity: 1, visible: true, locked: false }
          ]
        }
      ]
    },
    // Model Selector (Top Floating)
    {
      id: 'model-selector',
      name: 'Model Switcher',
      type: 'group',
      x: 640, y: 30, width: 160, height: 32,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { id: 'ms-bg', name: 'Badge', type: 'rect', x: -80, y: 0, width: 160, height: 32, fill: muted, opacity: 1, rx: 16, stroke: border, strokeWidth: 1, visible: true, locked: false },
        { id: 'ms-txt', name: 'Label', type: 'text', x: 0, y: 20, width: 0, height: 0, fill: text, text: 'Grok-2 (Alpha)', fontSize: 12, fontWeight: '600', textAlign: 'center', visible: true, locked: false }
      ]
    }
  ];
}

/**
 * Gerador de YouTube Studio Dashboard de Alta Fidelidade.
 */
export function generateYouTubeStudioElements(): UIElement[] {
  const primary = '#3B82F6';
  const text = '#E5E7EB';
  const bg = '#0A0E27';
  const secondary = '#8B5CF6';

  return [
    {
      id: 'artboard',
      name: 'Artboard',
      type: 'rect',
      x: 0, y: 0, width: 1280, height: 720,
      fill: bg, opacity: 1, visible: true, locked: true
    },
    {
      id: 'sidebar-container',
      name: 'Sidebar Navigation',
      type: 'group',
      x: 0, y: 0, width: 240, height: 720,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { id: 'sb-bg', name: 'BG', type: 'rect', x: 0, y: 0, width: 240, height: 720, fill: bg, opacity: 1, stroke: '#1E293B', strokeWidth: 1, visible: true, locked: false },
        { id: 'sb-logo', name: 'Logo Studio', type: 'text', x: 120, y: 40, width: 0, height: 0, fill: '#EF4444', text: 'STUDIO', fontSize: 24, fontWeight: '700', visible: true, locked: false },
        { id: 'sb-nav-1', name: 'Nav Item Active', type: 'rect', x: 12, y: 100, width: 216, height: 40, fill: primary, opacity: 0.1, rx: 8, visible: true, locked: false },
        { id: 'sb-txt-1', name: 'Dash Text', type: 'text', x: 40, y: 125, width: 0, height: 0, fill: primary, text: 'Painel', fontSize: 14, textAlign: 'left', visible: true, locked: false }
      ]
    },
    {
      id: 'header-pro',
      name: 'Top Header',
      type: 'group',
      x: 240, y: 0, width: 1040, height: 64,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { id: 'h-bg', name: 'Header BG', type: 'rect', x: 0, y: 0, width: 1040, height: 64, fill: bg, opacity: 0.8, stroke: '#1E293B', strokeWidth: 1, visible: true, locked: false },
        { id: 'h-search', name: 'Search Pill', type: 'rect', x: 300, y: 14, width: 440, height: 36, fill: '#1E293B', opacity: 1, rx: 18, visible: true, locked: false },
        { id: 'h-avatar', name: 'User Avatar', type: 'circle', x: 980, y: 12, width: 40, height: 40, fill: secondary, opacity: 1, visible: true, locked: false }
      ]
    },
    {
      id: 'metrics-grid',
      name: 'Channel Analytics View',
      type: 'group',
      x: 272, y: 96, width: 340, height: 460,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { id: 'card-metric-bg', name: 'Card Container', type: 'rect', x: 0, y: 0, width: 340, height: 460, fill: '#111827', opacity: 1, rx: 16, stroke: '#1E293B', strokeWidth: 1, visible: true, locked: false },
        { id: 'metric-title', name: 'Title', type: 'text', x: 24, y: 40, width: 0, height: 0, fill: text, text: 'Estatísticas do canal', fontSize: 18, fontWeight: '600', textAlign: 'left', visible: true, locked: false },
        { id: 'sub-label', name: 'Subs Label', type: 'text', x: 24, y: 70, width: 0, height: 0, fill: '#94A3B8', text: 'Inscritos atuais', fontSize: 13, visible: true, locked: false },
        { id: 'sub-value', name: 'Subs Val', type: 'text', x: 24, y: 110, width: 0, height: 0, fill: text, text: '1.240.582', fontSize: 32, fontWeight: '700', visible: true, locked: false },
        { id: 'growth-badge', name: 'Growth', type: 'text', x: 24, y: 140, width: 0, height: 0, fill: '#10B981', text: '+12.4% nos últimos 28 dias', fontSize: 12, visible: true, locked: false }
      ]
    },
    {
      id: 'chart-performance',
      name: 'Performance Graph',
      type: 'group',
      x: 636, y: 96, width: 612, height: 280,
      fill: 'none', opacity: 1, visible: true, locked: false,
      children: [
        { id: 'ch-bg', name: 'Graph BG', type: 'rect', x: 0, y: 0, width: 612, height: 280, fill: '#111827', opacity: 1, rx: 16, stroke: '#1E293B', strokeWidth: 1, visible: true, locked: false },
        { id: 'ch-title', name: 'Graph Title', type: 'text', x: 24, y: 40, width: 0, height: 0, fill: text, text: 'Resumo das visualizações', fontSize: 16, visible: true, locked: false },
        { id: 'ch-line', name: 'Data Line', type: 'rect', x: 40, y: 100, width: 532, height: 140, fill: primary, opacity: 0.1, visible: true, locked: false }
      ]
    }
  ];
}
