"use client";

import { useState, useCallback } from 'react';
import { UIElement } from '@/lib/layout-templates';

export function useLayoutState() {
  const [elements, setElements] = useState<UIElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addElement = useCallback((element: UIElement) => {
    const newElement = { ...element, id: `${element.type}-${Date.now()}` };
    setElements(prev => [...prev, newElement]);
    setSelectedId(newElement.id);
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<UIElement>) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
  }, []);

  const removeElement = useCallback((id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedId === id) setSelectedId(null);
  }, [selectedId]);

  const selectElement = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  const setLayout = useCallback((newElements: UIElement[]) => {
    setElements(newElements);
    setSelectedId(null);
  }, []);

  const selectedElement = elements.find(el => el.id === selectedId) || null;

  return {
    elements,
    selectedId,
    selectedElement,
    addElement,
    updateElement,
    removeElement,
    selectElement,
    setLayout
  };
}
