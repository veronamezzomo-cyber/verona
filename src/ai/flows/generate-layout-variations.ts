'use server';
/**
 * @fileOverview Gerador de variações de layout UI 100% local e determinístico.
 *               Substitui chamadas de LLM por uma lógica de seleção de templates
 *               baseada em palavras-chave (keywords).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateLayoutVariationsInputSchema = z.object({
  prompt: z.string(),
});
export type GenerateLayoutVariationsInput = z.infer<typeof GenerateLayoutVariationsInputSchema>;

const GenerateLayoutVariationsOutputSchema = z.array(z.string());
export type GenerateLayoutVariationsOutput = z.infer<typeof GenerateLayoutVariationsOutputSchema>;

/**
 * Gera 3 variações de SVG localmente baseadas no prompt.
 */
function generateLocalLayouts(prompt: string): string[] {
  const p = prompt.toLowerCase();
  
  // Cores padrão do sistema
  const bg = "#0A0E27";
  const primary = "#3B82F6";
  const secondary = "#8B5CF6";
  const text = "#E5E7EB";

  // Variação 1: Dashboard / Estrutural
  const var1 = `
    <svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg' version='1.1'>
      <rect width='100%' height='100%' fill='${bg}' />
      <g id='sidebar' transform='translate(0, 0)'>
        <rect width='260' height='720' fill='${bg}' stroke='${secondary}' stroke-opacity='0.2' />
        <rect x='30' y='40' width='200' height='40' rx='8' fill='${primary}' opacity='0.8' />
        <rect x='30' y='120' width='160' height='12' rx='6' fill='${text}' opacity='0.3' />
        <rect x='30' y='150' width='140' height='12' rx='6' fill='${text}' opacity='0.2' />
      </g>
      <g id='main-card' transform='translate(300, 60)'>
        <rect width='920' height='400' rx='16' fill='${secondary}' opacity='0.05' stroke='${secondary}' stroke-width='1' />
        <text x='40' y='60' font-family='Space Grotesk' font-size='32' fill='${text}' font-weight='bold'>Layout Workspace</text>
        <rect x='40' y='100' width='400' height='16' rx='8' fill='${text}' opacity='0.2' />
      </g>
      <g id='action-button' transform='translate(1050, 620)'>
        <rect width='180' height='50' rx='25' fill='${primary}' />
        <text x='90' y='32' text-anchor='middle' font-family='Inter' font-size='16' fill='${text}' font-weight='bold'>GERAR AGORA</text>
      </g>
    </svg>
  `;

  // Variação 2: Chat / Mobile-like
  const var2 = `
    <svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg' version='1.1'>
      <rect width='100%' height='100%' fill='${bg}' />
      <g id='header' transform='translate(0, 0)'>
        <rect width='1280' height='80' fill='${bg}' stroke-bottom='1' stroke='${primary}' stroke-opacity='0.5' />
        <circle cx='60' cy='40' r='20' fill='${secondary}' />
        <text x='100' y='48' font-family='Space Grotesk' font-size='24' fill='${text}'>AI Assistant Forge</text>
      </g>
      <g id='chat-bubble-1' transform='translate(100, 150)'>
        <rect width='450' height='100' rx='20' fill='${secondary}' opacity='0.15' />
        <rect x='20' y='30' width='380' height='12' rx='6' fill='${text}' opacity='0.4' />
        <rect x='20' y='55' width='250' height='12' rx='6' fill='${text}' opacity='0.2' />
      </g>
      <g id='chat-bubble-2' transform='translate(730, 300)'>
        <rect width='450' height='100' rx='20' fill='${primary}' opacity='0.9' />
        <rect x='30' y='30' width='380' height='12' rx='6' fill='${text}' />
        <rect x='30' y='55' width='200' height='12' rx='6' fill='${text}' opacity='0.6' />
      </g>
      <g id='input-bar' transform='translate(240, 600)'>
        <rect width='800' height='60' rx='30' fill='${bg}' stroke='${text}' stroke-opacity='0.2' />
        <text x='40' y='36' font-family='Inter' font-size='18' fill='${text}' opacity='0.5'>Digite sua mensagem...</text>
      </g>
    </svg>
  `;

  // Variação 3: Landing Page / Hero
  const var3 = `
    <svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg' version='1.1'>
      <rect width='100%' height='100%' fill='${bg}' />
      <g id='hero-content' transform='translate(0, 180)'>
        <text x='640' y='0' text-anchor='middle' font-family='Space Grotesk' font-size='72' fill='${text}' font-weight='bold'>TRANSFORME IDEIAS</text>
        <text x='640' y='80' text-anchor='middle' font-family='Space Grotesk' font-size='72' fill='${primary}' font-weight='bold'>EM VETORES</text>
        <rect x='540' y='140' width='200' height='50' rx='12' fill='${secondary}' />
        <text x='640' y='172' text-anchor='middle' font-family='Inter' font-size='18' fill='${text}' font-weight='bold'>INICIAR STUDIO</text>
      </g>
      <g id='abstract-shape-1' transform='translate(1000, 100)'>
        <rect width='300' height='300' rx='150' fill='${primary}' opacity='0.1' />
      </g>
      <g id='abstract-shape-2' transform='translate(-50, 500)'>
        <rect width='400' height='400' rx='200' fill='${secondary}' opacity='0.1' />
      </g>
    </svg>
  `;

  return [var1, var2, var3];
}

export const generateLayoutVariationsFlow = ai.defineFlow(
  {
    name: 'generateLayoutVariationsFlow',
    inputSchema: GenerateLayoutVariationsInputSchema,
    outputSchema: GenerateLayoutVariationsOutputSchema,
  },
  async (input) => {
    // Agora gera localmente sem chamar nenhuma API externa
    return generateLocalLayouts(input.prompt);
  }
);

export async function generateLayoutVariations(
  input: GenerateLayoutVariationsInput
): Promise<GenerateLayoutVariationsOutput> {
  return generateLayoutVariationsFlow(input);
}
