'use server';
/**
 * @fileOverview Gerador de variações de layout UI 100% local.
 *               Orquestra a detecção de categoria e chama o gerador correspondente.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { detectCategory, TEMPLATE_REGISTRY } from '../templates/template-registry';

const GenerateLayoutVariationsInputSchema = z.object({
  prompt: z.string(),
});
export type GenerateLayoutVariationsInput = z.infer<typeof GenerateLayoutVariationsInputSchema>;

const GenerateLayoutVariationsOutputSchema = z.array(z.string());
export type GenerateLayoutVariationsOutput = z.infer<typeof GenerateLayoutVariationsOutputSchema>;

/**
 * Cores padrão baseadas no tema dark/neon do sistema.
 */
const SYSTEM_COLORS = {
  bg: "#0A0E27",
  primary: "#3B82F6",
  secondary: "#8B5CF6",
  text: "#E5E7EB"
};

export const generateLayoutVariationsFlow = ai.defineFlow(
  {
    name: 'generateLayoutVariationsFlow',
    inputSchema: GenerateLayoutVariationsInputSchema,
    outputSchema: GenerateLayoutVariationsOutputSchema,
  },
  async (input) => {
    // 1. Detecta a intenção (categoria)
    const category = detectCategory(input.prompt);
    
    // 2. Obtém o gerador registrado
    const generator = TEMPLATE_REGISTRY[category];
    
    // 3. Simula um pequeno atraso para UX (calculando vetores...)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 4. Retorna as 3 variações específicas da categoria
    return generator(SYSTEM_COLORS);
  }
);

export async function generateLayoutVariations(
  input: GenerateLayoutVariationsInput
): Promise<GenerateLayoutVariationsOutput> {
  return generateLayoutVariationsFlow(input);
}
