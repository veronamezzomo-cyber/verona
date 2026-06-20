'use server';
/**
 * @fileOverview Gerador de variações de layout UI 100% local.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { detectCategory, TEMPLATE_REGISTRY } from '../templates/template-registry';
import { UIElement } from '@/lib/layout-templates';

const GenerateLayoutVariationsInputSchema = z.object({
  prompt: z.string(),
});
export type GenerateLayoutVariationsInput = z.infer<typeof GenerateLayoutVariationsInputSchema>;

// O output agora é um array de arrays de UIElement (cada sub-array é uma variação completa)
const GenerateLayoutVariationsOutputSchema = z.array(z.array(z.any())); 
export type GenerateLayoutVariationsOutput = UIElement[][];

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
    // Remove o comando /create se presente para a detecção de categoria
    const promptClean = input.prompt.replace(/^\/create\s*/i, '');
    const category = detectCategory(promptClean);
    const generator = TEMPLATE_REGISTRY[category];
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return generator(SYSTEM_COLORS);
  }
);

export async function generateLayoutVariations(
  input: GenerateLayoutVariationsInput
): Promise<GenerateLayoutVariationsOutput> {
  return generateLayoutVariationsFlow(input) as unknown as Promise<GenerateLayoutVariationsOutput>;
}
