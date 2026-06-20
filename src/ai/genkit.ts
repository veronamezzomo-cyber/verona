import { genkit } from 'genkit';

// Genkit agora inicializado sem plugins de modelos externos (Gemini/OpenAI)
// Servindo apenas como orquestrador de flows locais.
export const ai = genkit({
  plugins: [],
});
