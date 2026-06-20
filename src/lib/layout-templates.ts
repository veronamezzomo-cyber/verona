export type UIElementType = 'rect' | 'circle' | 'text' | 'group';

export interface UIElement {
  id: string;
  name: string;
  type: UIElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  opacity: number;
  rx?: number;
  ry?: number;
  text?: string;
  fontSize?: number;
  children?: UIElement[];
  stroke?: string;
  strokeWidth?: number;
}

export const TEMPLATES: Record<string, UIElement> = {
  button: {
    id: 'tpl-button',
    name: 'Primary Button',
    type: 'group',
    x: 0,
    y: 0,
    width: 160,
    height: 48,
    fill: '#3B82F6',
    opacity: 1,
    children: [
      {
        id: 'bg',
        name: 'Background',
        type: 'rect',
        x: 0,
        y: 0,
        width: 160,
        height: 48,
        fill: '#3B82F6',
        opacity: 1,
        rx: 12,
        ry: 12
      },
      {
        id: 'label',
        name: 'Label',
        type: 'text',
        x: 80,
        y: 30,
        width: 0,
        height: 0,
        fill: '#E5E7EB',
        opacity: 1,
        text: 'Action',
        fontSize: 18
      }
    ]
  },
  card: {
    id: 'tpl-card',
    name: 'Content Card',
    type: 'group',
    x: 0,
    y: 0,
    width: 320,
    height: 200,
    fill: 'rgba(59, 130, 246, 0.05)',
    opacity: 1,
    children: [
      {
        id: 'bg',
        name: 'Background',
        type: 'rect',
        x: 0,
        y: 0,
        width: 320,
        height: 200,
        fill: 'rgba(59, 130, 246, 0.05)',
        opacity: 1,
        rx: 16,
        ry: 16,
        stroke: '#3B82F6',
        strokeWidth: 1
      },
      {
        id: 'title',
        name: 'Title',
        type: 'text',
        x: 20,
        y: 40,
        width: 0,
        height: 0,
        fill: '#E5E7EB',
        opacity: 1,
        text: 'Featured Item',
        fontSize: 20
      }
    ]
  },
  searchBar: {
    id: 'tpl-search',
    name: 'Search Bar',
    type: 'rect',
    x: 0,
    y: 0,
    width: 400,
    height: 40,
    fill: 'rgba(139, 92, 246, 0.1)',
    opacity: 1,
    rx: 20,
    ry: 20,
    stroke: '#E5E7EB',
    strokeWidth: 1
  }
};
