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
 * Gerador de YouTube Studio Dashboard de Alta Fidelidade.
 */
export function generateYouTubeStudioElements(): UIElement[] {
  const primary = '#3B82F6';
  const text = '#E5E7EB';
  const bg = '#0A0E27';
  const secondary = '#8B5CF6';

  return [
    // Background
    {
      id: 'artboard',
      name: 'Artboard',
      type: 'rect',
      x: 0, y: 0, width: 1280, height: 720,
      fill: bg, opacity: 1, visible: true, locked: true
    },
    // Sidebar Professional
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
    // Header
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
    // Main Metrics Card
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
    // Performance Chart Area
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
