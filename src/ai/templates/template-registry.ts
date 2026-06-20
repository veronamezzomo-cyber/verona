/**
 * @fileOverview Registro centralizado de geradores de layout por categoria.
 */

import { generateChatTemplates } from './chat-llm';
import { generateSearchTemplates } from './search-engine';
import { generateVideoTemplates } from './video-platform';
import { generateDashboardTemplates } from './dashboard';

export type UICategory = 'chat-llm' | 'search-engine' | 'video-platform' | 'dashboard';

export const TEMPLATE_REGISTRY: Record<UICategory, (colors: any) => string[]> = {
  'chat-llm': generateChatTemplates,
  'search-engine': generateSearchTemplates,
  'video-platform': generateVideoTemplates,
  'dashboard': generateDashboardTemplates,
};

/**
 * Detecta a categoria baseada no prompt do usuário.
 */
export function detectCategory(prompt: string): UICategory {
  const p = prompt.toLowerCase();
  
  if (p.includes('chat') || p.includes('claude') || p.includes('chatgpt') || p.includes('gemini') || p.includes('assistente') || p.includes('conversa') || p.includes('mensagem')) {
    return 'chat-llm';
  }
  
  if (p.includes('busca') || p.includes('pesquisa') || p.includes('google') || p.includes('search')) {
    return 'search-engine';
  }
  
  if (p.includes('vídeo') || p.includes('video') || p.includes('youtube') || p.includes('canal') || p.includes('thumbnail')) {
    return 'video-platform';
  }
  
  // Default fallback
  return 'dashboard';
}
