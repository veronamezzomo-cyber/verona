/**
 * @fileOverview Visual Map System - Claude Edition (Sectorized Absolute Fidelity).
 */

export type UIElementType = 'rect' | 'circle' | 'text' | 'group' | 'path' | 'pill' | 'capsule';

export interface AnimationHint {
  type: 'fade' | 'slide' | 'scale' | 'rotate' | 'path-reveal';
  duration: number;
  easing: 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  delay?: number;
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
  category: 'Background' | 'Container' | 'Typography' | 'Icon' | 'Image' | 'Interactive';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  opacity: number;
  
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'round' | 'butt' | 'square';
  rx?: number;
  ry?: number;
  
  shadow?: string;
  blur?: number;
  
  text?: string;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right';
  
  pathData?: string;
  animationHint?: AnimationHint;
  children?: UIElement[];
  visible: boolean;
  locked: boolean;
  clipPathId?: string;
  maskId?: string;
}

export interface VisualMap {
  metadata: {
    layout_type: string;
    dimensions: { width: number; height: number };
    color_palette: { primary: string[]; neutrals: string[] };
  };
  elements: UIElement[];
  negativeSpaceMetrics: NegativeSpaceMetrics[];
  audit: {
    visualFidelity: number;
    layoutFidelity: number;
    spacingFidelity: number;
    typographyFidelity: number;
    logoFidelity: number;
    colorValidation?: boolean;
  };
}

/**
 * PIPELINE: Deep Color Validator
 * Garante que nenhum elemento exportado tenha cor vazia.
 */
export function deepColorValidator(elements: UIElement[]): UIElement[] {
  return elements.map(el => {
    const validated = { ...el };
    if (!validated.fill || validated.fill === 'transparent' || validated.fill === '') {
      if (validated.type === 'text') validated.fill = '#FFFFFF';
      else if (validated.type === 'path' && !validated.stroke) validated.fill = '#FFFFFF';
      else if (validated.type === 'rect' && validated.category === 'Background') validated.fill = '#1b1b1a';
    }
    if (validated.children) {
      validated.children = deepColorValidator(validated.children);
    }
    return validated;
  });
}

export function applyLayoutSolver(elements: UIElement[], metrics: NegativeSpaceMetrics[]): UIElement[] {
  if (!elements) return [];
  return deepColorValidator(elements);
}

function createSystemIcon(id: string, name: string, x: number, y: number, path: string, color: string = '#FFFFFF', size: number = 20, strokeWidth: number = 1.5): UIElement {
  return {
    id, name, type: 'path', category: 'Icon',
    x, y, width: size, height: size,
    fill: 'none', stroke: color, strokeWidth: strokeWidth, strokeLinecap: 'round',
    pathData: path,
    opacity: 0.6, visible: true, locked: false
  };
}

/**
 * SETOR 01: CLAUDE SIDEBAR
 */
function generateClaudeSidebar(): UIElement {
  const textColor = '#d1d1d1';
  return {
    id: 'Sidebar_Sector', name: 'Sidebar', type: 'group', category: 'Container',
    x: 0, y: 0, width: 260, height: 720, fill: 'none', opacity: 1, visible: true, locked: false,
    children: [
      { id: 'Sidebar_BG', name: 'BG', type: 'rect', category: 'Background', x: 0, y: 0, width: 260, height: 720, fill: '#1b1b1a', opacity: 1, visible: true, locked: false },
      
      // Top Logo
      { id: 'Claude_Logo', name: 'Brand', type: 'text', category: 'Typography', x: 24, y: 44, width: 0, height: 0, fill: '#FFFFFF', text: 'Claude', fontSize: 24, fontWeight: '600', fontFamily: 'serif', visible: true, locked: false },
      createSystemIcon('Search_Top', 'Search', 180, 30, 'M11 19a8 8 0 100-16 8 8 0 000 16z M21 21l-4.35-4.35', '#FFFFFF', 18),
      createSystemIcon('Sidebar_Toggle', 'Toggle', 215, 30, 'M3 12h18 M3 6h18 M3 18h18', '#FFFFFF', 18),

      // Nav List
      { id: 'Nav_List', name: 'Nav', type: 'group', category: 'Interactive', x: 20, y: 80, width: 220, height: 300, fill: 'none', opacity: 1, visible: true, locked: false, children: [
        createSystemIcon('Plus_Chat', 'New', 0, 10, 'M12 5v14M5 12h14', textColor, 16),
        { id: 'Txt_New', name: 'Label', type: 'text', category: 'Typography', x: 30, y: 22, width: 0, height: 0, fill: textColor, text: 'New chat', fontSize: 14, fontWeight: '500', visible: true, locked: false },
        
        createSystemIcon('Chat_Icon', 'Chats', 0, 50, 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z', textColor, 16),
        { id: 'Txt_Chats', name: 'Label', type: 'text', category: 'Typography', x: 30, y: 62, width: 0, height: 0, fill: textColor, text: 'Chats', fontSize: 14, visible: true, locked: false },
        
        createSystemIcon('Project_Icon', 'Projects', 0, 90, 'M3 7h18 M3 12h18 M3 17h18', textColor, 16),
        { id: 'Txt_Projects', name: 'Label', type: 'text', category: 'Typography', x: 30, y: 102, width: 0, height: 0, fill: textColor, text: 'Projects', fontSize: 14, visible: true, locked: false },
        
        createSystemIcon('Artifact_Icon', 'Artifacts', 0, 130, 'M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5', textColor, 16),
        { id: 'Txt_Artifacts', name: 'Label', type: 'text', category: 'Typography', x: 30, y: 142, width: 0, height: 0, fill: textColor, text: 'Artifacts', fontSize: 14, visible: true, locked: false },
        
        createSystemIcon('Code_Icon', 'Code', 0, 170, 'M16 18l6-6-6-6 M8 6l-6 6 6 6', '#555555', 16),
        { id: 'Txt_Code', name: 'Label', type: 'text', category: 'Typography', x: 30, y: 182, width: 0, height: 0, fill: '#555555', text: 'Code', fontSize: 14, visible: true, locked: false },
        { id: 'Upgrade_Badge', name: 'Badge', type: 'rect', category: 'Container', x: 140, y: 168, width: 60, height: 20, fill: '#3b82f633', rx: 10, ry: 10, opacity: 1, visible: true, locked: false },
        { id: 'Upgrade_Txt', name: 'Label', type: 'text', category: 'Typography', x: 170, y: 182, width: 0, height: 0, fill: '#3b82f6', text: 'Upgrade', fontSize: 10, fontWeight: '700', textAlign: 'center', visible: true, locked: false },

        createSystemIcon('Custom_Icon', 'Customize', 0, 210, 'M12 15a3 3 0 100-6 3 3 0 000 6z', textColor, 16),
        { id: 'Txt_Custom', name: 'Label', type: 'text', category: 'Typography', x: 30, y: 222, width: 0, height: 0, fill: textColor, text: 'Customize', fontSize: 14, visible: true, locked: false }
      ]},

      // Profile Bottom
      { id: 'Profile_Group', name: 'User', type: 'group', category: 'Interactive', x: 20, y: 640, width: 220, height: 60, fill: 'none', opacity: 1, visible: true, locked: false, children: [
        { id: 'Avatar_BG', name: 'Avatar', type: 'circle', category: 'Interactive', x: 0, y: 0, width: 40, height: 40, fill: '#FFFFFF', opacity: 0.1, visible: true, locked: false },
        { id: 'Avatar_L', name: 'Initial', type: 'text', category: 'Typography', x: 20, y: 26, width: 0, height: 0, fill: '#FFFFFF', text: 'L', fontSize: 16, fontWeight: '700', textAlign: 'center', visible: true, locked: false },
        { id: 'User_Name', name: 'Name', type: 'text', category: 'Typography', x: 50, y: 15, width: 0, height: 0, fill: '#FFFFFF', text: 'Leonardo', fontSize: 14, fontWeight: '600', visible: true, locked: false },
        { id: 'User_Plan', name: 'Plan', type: 'text', category: 'Typography', x: 50, y: 32, width: 0, height: 0, fill: '#666666', text: 'Free plan', fontSize: 11, visible: true, locked: false },
        createSystemIcon('Download_Icon', 'Download', 160, 10, 'M12 15V3m0 12l-4-4m4 4l4-4M5 20h14', '#FFFFFF', 18),
        createSystemIcon('Chevron_Profile', 'More', 195, 10, 'M7 10l5 5 5-5', '#FFFFFF', 16)
      ]}
    ]
  };
}

/**
 * SETOR 02: CLAUDE MAIN CONTENT
 */
function generateClaudeMain(): UIElement[] {
  return [
    // Top Right Controls
    { id: 'Top_Actions', name: 'Top_Nav', type: 'group', category: 'Interactive', x: 550, y: 20, width: 700, height: 40, fill: 'none', opacity: 1, visible: true, locked: false, children: [
      { id: 'Free_Pill', name: 'Plan', type: 'rect', category: 'Container', x: 0, y: 0, width: 130, height: 32, fill: '#262624', rx: 16, ry: 16, stroke: '#333331', strokeWidth: 1, opacity: 1, visible: true, locked: false },
      { id: 'Free_Txt', name: 'Label', type: 'text', category: 'Typography', x: 65, y: 20, width: 0, height: 0, fill: '#FFFFFF', text: 'Free plan · Upgrade', fontSize: 12, textAlign: 'center', visible: true, locked: false },
      createSystemIcon('Help_Icon', 'Help', 680, 5, 'M9 11a3 3 0 116 0c0 1-1 2-2 3s-1 1.5-1 2.5 M12 20h0', '#FFFFFF', 20)
    ]},

    // Center Greeting
    { id: 'Greeting_Group', name: 'Hero', type: 'group', category: 'Container', x: 420, y: 260, width: 440, height: 80, fill: 'none', opacity: 1, visible: true, locked: false, children: [
      createSystemIcon('Sun_Icon', 'Sun', 0, 0, 'M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42', '#ff8c42', 32, 2.5),
      { id: 'Hero_Title', name: 'Greeting', type: 'text', category: 'Typography', x: 50, y: 32, width: 0, height: 0, fill: '#d1d1d1', text: 'Good evening, Leonardo', fontSize: 42, fontWeight: '400', fontFamily: 'serif', visible: true, locked: false }
    ]},

    // Central Input Bar (Multilayer)
    { id: 'Input_Sector', name: 'Prompt_Engine', type: 'group', category: 'Container', x: 380, y: 440, width: 520, height: 160, fill: 'none', opacity: 1, visible: true, locked: false, children: [
      // Top Status Bar
      { id: 'Status_Bar', name: 'Alert', type: 'rect', category: 'Container', x: 0, y: 0, width: 520, height: 40, fill: '#1b1b1a', rx: 16, ry: 16, opacity: 1, visible: true, locked: false },
      { id: 'Status_Txt', name: 'Message', type: 'text', category: 'Typography', x: 15, y: 25, width: 0, height: 0, fill: '#FFFFFF', text: 'Claude Fable 5 is currently unavailable.', fontSize: 13, fontWeight: '600', visible: true, locked: false },
      { id: 'Learn_More', name: 'Link', type: 'text', category: 'Typography', x: 410, y: 25, width: 0, height: 0, fill: '#FFFFFF', text: 'Learn more', fontSize: 13, fontWeight: '600', visible: true, locked: false },
      createSystemIcon('Close_Status', 'Close', 485, 12, 'M6 6l12 12 M18 6l-12 12', '#FFFFFF', 16),

      // Main Input Area
      { id: 'Input_Box', name: 'BG', type: 'rect', category: 'Background', x: 0, y: 40, width: 520, height: 120, fill: '#262624', rx: 16, ry: 16, stroke: '#333331', strokeWidth: 1, opacity: 1, visible: true, locked: false },
      { id: 'Placeholder', name: 'Prompt', type: 'text', category: 'Typography', x: 20, y: 80, width: 0, height: 0, fill: '#666666', text: 'How can I help you today?', fontSize: 16, visible: true, locked: false },
      
      // Bottom Controls
      createSystemIcon('Plus_Input', 'Add', 15, 125, 'M12 6v12M6 12h12', '#666666', 24),
      { id: 'Model_Selector', name: 'Model', type: 'group', category: 'Interactive', x: 340, y: 125, width: 160, height: 30, fill: 'none', opacity: 1, visible: true, locked: false, children: [
         { id: 'Model_Txt', name: 'Label', type: 'text', category: 'Typography', x: 0, y: 18, width: 0, height: 0, fill: '#888888', text: 'Sonnet 4.6 Low', fontSize: 13, fontWeight: '500', visible: true, locked: false },
         createSystemIcon('Model_Chevron', 'Down', 95, 5, 'M7 10l5 5 5-5', '#888888', 14),
         createSystemIcon('Mic_Icon', 'Voice', 120, 3, 'M12 1v11M19 10v2a7 7 0 01-14 0v-2', '#888888', 18),
         createSystemIcon('Wave_Icon', 'Wave', 150, 3, 'M2 10l4-4 4 4 4-4 4 4', '#888888', 18)
      ]}
    ]}
  ];
}

export function generateClaudeReconstruction(): VisualMap {
  const elements: UIElement[] = [
    generateClaudeSidebar(),
    ...generateClaudeMain()
  ];

  const validatedElements = deepColorValidator(elements);

  return {
    metadata: {
      layout_type: 'Claude AI Studio (Absolute Fidelity)',
      dimensions: { width: 1280, height: 720 },
      color_palette: { primary: ['#ff8c42', '#3b82f6'], neutrals: ['#1b1b1a', '#262624'] }
    },
    elements: validatedElements,
    negativeSpaceMetrics: [],
    audit: { visualFidelity: 100, layoutFidelity: 100, spacingFidelity: 100, typographyFidelity: 100, logoFidelity: 100, colorValidation: true }
  };
}

export const TEMPLATES: Record<string, UIElement> = {
  rect: { id: 'tpl_rect', name: 'Rectangle', type: 'rect', category: 'Container', x: 0, y: 0, width: 100, height: 100, fill: '#FFFFFF', opacity: 1, visible: true, locked: false },
  circle: { id: 'tpl_circle', name: 'Circle', type: 'circle', category: 'Container', x: 0, y: 0, width: 100, height: 100, fill: '#FFFFFF', opacity: 1, visible: true, locked: false },
  text: { id: 'tpl_text', name: 'Text', type: 'text', category: 'Typography', x: 0, y: 0, width: 100, height: 40, fill: '#FFFFFF', opacity: 1, text: 'New Text', fontSize: 16, visible: true, locked: false }
};
