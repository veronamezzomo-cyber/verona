/**
 * @fileOverview Hook de gerenciamento de estado Enterprise para o Editor.
 */

import { useState, useCallback, useMemo } from 'react';
import { UIElement } from '@/lib/layout-templates';

export function useLayoutState() {
  const [elements, setElements] = useState<UIElement[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const addElement = useCallback((element: UIElement) => {
    const newElement = { ...element, id: `${element.type}-${Date.now()}` };
    setElements(prev => [...prev, newElement]);
    setSelectedIds([newElement.id]);
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<UIElement>) => {
    setElements(prev => {
      const updateRecursive = (els: UIElement[]): UIElement[] => {
        return els.map(el => {
          if (el.id === id) return { ...el, ...updates };
          if (el.children) return { ...el, children: updateRecursive(el.children) };
          return el;
        });
      };
      return updateRecursive(prev);
    });
  }, []);

  const removeElement = useCallback((id: string) => {
    setElements(prev => {
      const filterRecursive = (els: UIElement[]): UIElement[] => {
        return els.filter(el => {
          if (el.id === id) return false;
          if (el.children) {
            el.children = filterRecursive(el.children);
          }
          return true;
        });
      };
      return filterRecursive(prev);
    });
    setSelectedIds(prev => prev.filter(sid => sid !== id));
  }, []);

  const selectElement = useCallback((id: string | null, multi = false) => {
    if (!id) {
      setSelectedIds([]);
      return;
    }
    if (multi) {
      setSelectedIds(prev => prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]);
    } else {
      setSelectedIds([id]);
    }
  }, []);

  const setLayout = useCallback((newElements: UIElement[]) => {
    setElements(newElements);
    setSelectedIds([]);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const selectedElements = useMemo(() => {
    const findRecursive = (els: UIElement[], ids: string[]): UIElement[] => {
      let found: UIElement[] = [];
      for (const el of els) {
        if (ids.includes(el.id)) found.push(el);
        if (el.children) found.push(...findRecursive(el.children, ids));
      }
      return found;
    };
    return findRecursive(elements, selectedIds);
  }, [elements, selectedIds]);

  return {
    elements,
    selectedIds,
    selectedElement: selectedElements[0] || null,
    selectedElements,
    zoom,
    setZoom,
    pan,
    setPan,
    addElement,
    updateElement,
    removeElement,
    selectElement,
    setLayout
  };
}
