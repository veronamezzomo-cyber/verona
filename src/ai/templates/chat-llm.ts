import { UIElement } from '@/lib/layout-templates';

/**
 * @fileOverview Gerador de estruturas para interfaces de Chat/LLM (editáveis).
 */

export function generateChatTemplates(colors: any): UIElement[][] {
  const { bg, primary, secondary, text } = colors;

  // Variação 1: Clássica (Claude/ChatGPT style)
  const var1: UIElement[] = [
    {
      id: 'sidebar-container',
      name: 'Sidebar',
      type: 'rect',
      x: 0, y: 0, width: 280, height: 720,
      fill: bg, opacity: 1, stroke: secondary, strokeWidth: 0.5
    },
    {
      id: 'new-chat-btn',
      name: 'New Chat Button',
      type: 'rect',
      x: 20, y: 30, width: 240, height: 45,
      fill: primary, opacity: 0.15, rx: 12, ry: 12, stroke: primary, strokeWidth: 1
    },
    {
      id: 'ai-bubble-1',
      name: 'AI Response',
      type: 'group',
      x: 320, y: 40, width: 600, height: 100,
      fill: secondary, opacity: 1,
      children: [
        { id: 'ai-bg-1', name: 'Bubble BG', type: 'rect', x: 0, y: 0, width: 600, height: 100, fill: secondary, opacity: 0.05, rx: 20, ry: 20 },
        { id: 'ai-avatar-1', name: 'AI Avatar', type: 'circle', x: 20, y: 20, width: 30, height: 30, fill: secondary, opacity: 0.5 },
        { id: 'ai-text-1', name: 'Text Line', type: 'rect', x: 70, y: 25, width: 480, height: 10, fill: text, opacity: 0.2, rx: 5, ry: 5 }
      ]
    },
    {
      id: 'user-bubble-1',
      name: 'User Message',
      type: 'rect',
      x: 600, y: 160, width: 320, height: 60,
      fill: primary, opacity: 0.8, rx: 20, ry: 20
    },
    {
      id: 'input-container',
      name: 'Input Bar',
      type: 'rect',
      x: 320, y: 600, width: 900, height: 70,
      fill: bg, opacity: 1, rx: 20, ry: 20, stroke: text, strokeWidth: 1
    }
  ];

  // Variação 2: Minimalista (Focus Mode)
  const var2: UIElement[] = [
    {
      id: 'minimal-header',
      name: 'Header',
      type: 'rect',
      x: 0, y: 0, width: 1280, height: 60,
      fill: bg, opacity: 1, stroke: text, strokeWidth: 0.2
    },
    {
      id: 'main-bubble',
      name: 'Main Content Area',
      type: 'rect',
      x: 340, y: 100, width: 600, height: 400,
      fill: secondary, opacity: 0.03, rx: 24, ry: 24
    },
    {
      id: 'pill-input',
      name: 'Pill Input',
      type: 'rect',
      x: 440, y: 620, width: 400, height: 50,
      fill: bg, opacity: 1, rx: 25, ry: 25, stroke: primary, strokeWidth: 2
    }
  ];

  // Variação 3: Dashboard Chat
  const var3: UIElement[] = [
    {
      id: 'rail',
      name: 'Nav Rail',
      type: 'rect',
      x: 0, y: 0, width: 80, height: 720,
      fill: bg, opacity: 1, stroke: secondary, strokeWidth: 0.5
    },
    {
      id: 'chat-card',
      name: 'Chat Window',
      type: 'rect',
      x: 100, y: 20, width: 1140, height: 680,
      fill: secondary, opacity: 0.02, rx: 30, ry: 30, stroke: secondary, strokeWidth: 1
    }
  ];

  return [var1, var2, var3];
}
