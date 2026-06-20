'use server';
/**
 * @fileOverview Gerador de variações de layout UI utilizando o TraceEngine.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { UIElement, VisualMap } from '@/lib/layout-templates';
import { traceEngineFlow } from './trace-engine';

const GenerateLayoutVariationsInputSchema = z.object({
  prompt: z.string(),
});
export type GenerateLayoutVariationsInput = z.infer<typeof GenerateLayoutVariationsInputSchema>;

export type GenerateLayoutVariationsOutput = UIElement[][];

export const generateLayoutVariationsFlow = ai.defineFlow(
  {
    name: 'generateLayoutVariationsFlow',
    inputSchema: GenerateLayoutVariationsInputSchema,
    outputSchema: z.array(z.array(z.any())),
  },
  async (input) => {
    // Agora o /create utiliza o TraceEngine para a análise inicial
    const visualMap = await traceEngineFlow({
      prompt: input.prompt
    }) as VisualMap;
    
    // Retornamos um array de variações (aqui poderíamos gerar mais baseado no VisualMap)
    return [visualMap.elements];
  }
);

export async function generateLayoutVariations(
  input: GenerateLayoutVariationsInput
): Promise<GenerateLayoutVariationsOutput> {
  return generateLayoutVariationsFlow(input) as unknown as Promise<GenerateLayoutVariationsOutput>;
}
