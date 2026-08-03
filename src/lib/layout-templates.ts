/**
 * @fileOverview Tipagem central para elementos de UI gerados por IA.
 */

export interface UIElement {
  id: string;
  name?: string;
  type: 'rect' | 'circle' | 'text' | 'path' | 'group' | 'pill' | 'capsule';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  opacity: number;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'round' | 'butt' | 'square';
  rx?: number;
  ry?: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  pathData?: string;
  rotation?: number;
  visible?: boolean;
  category?: string;
  children?: UIElement[];
  shadow?: string;
  blur?: number;
  animationHint?: {
    suggested_animation: string;
    duration_ms: number;
    easing: string;
  };
}

/**
 * Reconstrutor analítico para layouts complexos (ex: YouTube).
 */
export function generateYouTubeAbsoluteReconstruction() {
  return {
    category: 'video-platform',
    elements: [
      { id: 'yt-nav', name: 'Header Nav', type: 'rect', x: 0, y: 0, width: 1280, height: 56, fill: '#0f0f0f', opacity: 1 },
      { id: 'yt-search', name: 'Search Bar', type: 'rect', x: 380, y: 10, width: 520, height: 36, fill: '#121212', opacity: 1, rx: 18, ry: 18, stroke: '#333', strokeWidth: 1 },
      { id: 'yt-sidebar', name: 'Mini Rail', type: 'rect', x: 0, y: 56, width: 72, height: 664, fill: '#0f0f0f', opacity: 1 },
      { id: 'yt-grid', name: 'Video Grid', type: 'group', x: 100, y: 100, width: 1100, height: 600, fill: 'none', opacity: 1, children: [
        { id: 'v-1', name: 'Thumb 1', type: 'rect', x: 0, y: 0, width: 340, height: 190, fill: '#222', opacity: 1, rx: 12, ry: 12 }
      ]}
    ] as UIElement[]
  };
}
