'use server';
/**
 * @fileOverview A Genkit flow to generate three distinct SVG UI layout variations
 *               based on a text prompt. Each variation includes structured SVG
 *               with named groups, consistent viewBox, rounded corners, and a
 *               defined color palette.
 *
 * - generateLayoutVariations - A wrapper function to call the Genkit flow.
 * - GenerateLayoutVariationsInput - The input type for the flow.
 * - GenerateLayoutVariationsOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateLayoutVariationsInputSchema = z.object({
  prompt: z
    .string()
    .describe('A text description of the desired UI layout, e.g., "UI de chatbot com logo azul, duas bolhas de chat, barra de busca arredondada".'),
});
export type GenerateLayoutVariationsInput = z.infer<typeof GenerateLayoutVariationsInputSchema>;

const GenerateLayoutVariationsOutputSchema = z.array(
  z
    .string()
    .describe(
      'An SVG string representing a UI layout variation, with a consistent viewBox of 1280x720, named group IDs (e.g., <g id="logo">), rounded corners, and adherence to the specified color palette.'
    )
);
export type GenerateLayoutVariationsOutput = z.infer<typeof GenerateLayoutVariationsOutputSchema>;

export async function generateLayoutVariations(
  input: GenerateLayoutVariationsInput
): Promise<GenerateLayoutVariationsOutput> {
  return generateLayoutVariationsFlow(input);
}

const generateLayoutVariationsPrompt = ai.definePrompt({
  name: 'generateLayoutVariationsPrompt',
  input: { schema: GenerateLayoutVariationsInputSchema },
  output: { schema: GenerateLayoutVariationsOutputSchema },
  prompt: `You are a UI layout designer assistant. Your task is to generate three distinct SVG code snippets for a UI layout based on the user's description.

Each SVG must strictly adhere to the following rules:
1.  **ViewBox Consistency**: Use a consistent viewBox of "0 0 1280 720" for all SVGs.
2.  **Structured Groups**: Each significant UI element (e.g., logo, chat bubble, search bar, button, card) must be enclosed in a <g> tag with a semantic 'id' attribute. For example: <g id="logo">...</g>, <g id="chat-bubble-user">...</g>, <g id="search-bar">...</g>.
3.  **Rounded Corners**: All rectangles and visually enclosed elements should have rounded corners, with a minimum border-radius of 8px. This can be achieved using 'rx' and 'ry' attributes for <rect> elements or designing paths with curves.
4.  **Color Palette**: Use only the following color palette for all elements:
    -   Background: #0A0E27 (Deep Navy)
    -   Primary elements: #3B82F6 (Electric Blue)
    -   Secondary elements: #8B5CF6 (Vivid Violet)
    -   Neutral elements (text, borders, subtle accents): #E5E7EB (Light Gray)


Your output must be a JSON array containing exactly three valid SVG strings, each adhering to the rules above. Ensure the SVGs are distinct visual variations of the user's request.

User Description: {{{prompt}}}

Output format example:
[
  "<svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg' version='1.1'>\n  <!-- Variation 1 -->\n  <rect width='100%' height='100%' fill='#0A0E27' />\n  <g id='logo' transform='translate(50, 50)'>\n    <rect x='0' y='0' width='100' height='40' rx='8' ry='8' fill='#3B82F6' />\n    <text x='10' y='28' font-family='Space Grotesk' font-size='20' fill='#E5E7EB'>\n      Logo\n    </text>\n  </g>\n  <g id='search-bar' transform='translate(200, 50)'>\n    <rect x='0' y='0' width='400' height='40' rx='20' ry='20' fill='#8B5CF6' opacity='0.2' stroke='#E5E7EB' stroke-width='1' />\n    <text x='20' y='28' font-family='Inter' font-size='16' fill='#E5E7EB'>\n      Search...\n    </text>\n  </g>\n  <g id='chat-bubble-user' transform='translate(700, 100)'>\n    <rect x='0' y='0' width='250' height='80' rx='12' ry='12' fill='#3B82F6' />\n    <text x='15' y='30' font-family='Inter' font-size='16' fill='#E5E7EB' wrap='true' width='220' transform='translate(0, -10)'>\n      Hello, how can I help you today?\n    </text>\n  </g>\n\n</svg>",
  "<svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg' version='1.1'>\n  <!-- Variation 2 -->\n  <rect width='100%' height='100%' fill='#0A0E27' />\n  <g id='logo' transform='translate(100, 30)'>\n    <circle cx='30' cy='30' r='25' fill='#8B5CF6' />\n    <text x='70' y='38' font-family='Space Grotesk' font-size='24' fill='#E5E7EB'>\n      Forge\n    </text>\n  </g>\n  <g id='button-primary' transform='translate(500, 60)'>\n    <rect x='0' y='0' width='150' height='50' rx='10' ry='10' fill='#3B82F6' />\n    <text x='75' y='30' text-anchor='middle' font-family='Inter' font-size='18' fill='#E5E7EB'>\n      Action\n    </text>\n  </g>\n  <g id='card-element' transform='translate(100, 200)'>\n    <rect x='0' y='0' width='300' height='180' rx='12' ry='12' fill='rgba(59, 130, 246, 0.1)' stroke='#3B82F6' stroke-width='1' />\n    <text x='20' y='40' font-family='Space Grotesk' font-size='20' fill='#E5E7EB'>\n      Card Title\n    </text>\n    <rect x='20' y='60' width='260' height='8' rx='4' ry='4' fill='#8B5CF6' opacity='0.7' />\n    <rect x='20' y='80' width='200' height='8' rx='4' ry='4' fill='#8B5CF6' opacity='0.5' />\n    <rect x='20' y='100' width='240' height='8' rx='4' ry='4' fill='#8B5CF6' opacity='0.3' />\n  </g>\n</svg>",
  "<svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg' version='1.1'>\n  <!-- Variation 3 -->\n  <rect width='100%' height='100%' fill='#0A0E27' />\n  <g id='header-bar'>\n    <rect x='0' y='0' width='1280' height='70' fill='#0A0E27' stroke-bottom='1' stroke='#8B5CF6' />\n    <g id='logo' transform='translate(30, 15)'>\n      <path d='M10 25 L20 5 L30 25 L20 45 Z' fill='#3B82F6' stroke='#E5E7EB' stroke-width='1' />\n      <text x='40' y='38' font-family='Space Grotesk' font-size='22' fill='#E5E7EB'>\n        Layout Forge\n      </text>\n    </g>\n    <g id='nav-item-1' transform='translate(900, 25)'>\n      <text font-family='Inter' font-size='18' fill='#E5E7EB'>\n        Home\n      </text>\n    </g>\n    <g id='nav-item-2' transform='translate(1000, 25)'>\n      <text font-family='Inter' font-size='18' fill='#8B5CF6'>\n        Designs\n      </text>\n    </g>\n  </g>\n  <g id='main-content-area' transform='translate(50, 100)'>\n    <rect x='0' y='0' width='1180' height='580' rx='16' ry='16' fill='rgba(139, 92, 246, 0.1)' stroke='#8B5CF6' stroke-width='1' />\n    <text x='30' y='50' font-family='Inter' font-size='24' fill='#E5E7EB'>\n      Welcome to your workspace!\n    </text>\n  </g>\n</svg>"
]

`,
});

const generateLayoutVariationsFlow = ai.defineFlow(
  {
    name: 'generateLayoutVariationsFlow',
    inputSchema: GenerateLayoutVariationsInputSchema,
    outputSchema: GenerateLayoutVariationsOutputSchema,
  },
  async (input) => {
    const { output } = await generateLayoutVariationsPrompt(input);
    if (!output) {
      throw new Error('Failed to generate layout variations.');
    }
    return output;
  }
);
