/**
 * @fileOverview Gerador de estruturas para interfaces de Chat/LLM.
 */

export function generateChatTemplates(colors: any): string[] {
  const { bg, primary, secondary, text } = colors;

  // Variação 1: Clássica (Claude/ChatGPT style)
  const var1 = `
    <svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg'>
      <rect width='100%' height='100%' fill='${bg}' />
      <g id='sidebar'>
        <rect width='280' height='720' fill='${bg}' stroke='${secondary}' stroke-opacity='0.1' />
        <rect x='20' y='30' width='240' height='45' rx='12' fill='${primary}' opacity='0.1' stroke='${primary}' stroke-opacity='0.5' />
        <text x='140' y='58' text-anchor='middle' font-family='Inter' font-size='14' fill='${text}' font-weight='bold'>+ NOVA CONVERSA</text>
        <rect x='20' y='100' width='200' height='12' rx='6' fill='${text}' opacity='0.2' />
        <rect x='20' y='130' width='180' height='12' rx='6' fill='${text}' opacity='0.1' />
      </g>
      <g id='chat-area' transform='translate(320, 40)'>
        <g id='bubble-ai-1'>
          <rect width='600' height='100' rx='20' fill='${secondary}' opacity='0.05' />
          <circle cx='30' cy='30' r='15' fill='${secondary}' opacity='0.5' />
          <rect x='60' y='25' width='500' height='10' rx='5' fill='${text}' opacity='0.3' />
          <rect x='60' y='45' width='400' height='10' rx='5' fill='${text}' opacity='0.2' />
        </g>
        <g id='bubble-user-1' transform='translate(300, 130)'>
          <rect width='300' height='60' rx='20' fill='${primary}' opacity='0.8' />
          <rect x='20' y='25' width='200' height='10' rx='5' fill='${text}' />
        </g>
        <g id='generating-indicator' transform='translate(0, 220)'>
           <circle cx='10' cy='10' r='4' fill='${primary}'><animate attributeName='opacity' values='0;1;0' dur='1.5s' repeatCount='indefinite' /></circle>
           <circle cx='25' cy='10' r='4' fill='${primary}'><animate attributeName='opacity' values='0;1;0' dur='1.5s' begin='0.2s' repeatCount='indefinite' /></circle>
           <circle cx='40' cy='10' r='4' fill='${primary}'><animate attributeName='opacity' values='0;1;0' dur='1.5s' begin='0.4s' repeatCount='indefinite' /></circle>
        </g>
      </g>
      <g id='input-bar' transform='translate(320, 600)'>
        <rect width='900' height='70' rx='20' fill='${bg}' stroke='${text}' stroke-opacity='0.15' />
        <text x='30' y='42' font-family='Inter' font-size='16' fill='${text}' opacity='0.3'>Pergunte qualquer coisa...</text>
        <rect x='830' y='15' width='40' height='40' rx='10' fill='${primary}' />
      </g>
    </svg>
  `;

  // Variação 2: Minimalista (Focus Mode)
  const var2 = `
    <svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg'>
      <rect width='100%' height='100%' fill='${bg}' />
      <g id='header' transform='translate(0, 0)'>
        <rect width='1280' height='60' fill='${bg}' stroke-bottom='1' stroke='${text}' stroke-opacity='0.05' />
        <text x='640' y='38' text-anchor='middle' font-family='Space Grotesk' font-size='18' fill='${text}' font-weight='bold'>NEURAL ASSISTANT</text>
      </g>
      <g id='messages' transform='translate(340, 100)'>
        <g id='msg-1'>
          <rect x='0' y='0' width='600' height='120' rx='12' fill='${secondary}' opacity='0.08' />
          <rect x='20' y='20' width='500' height='12' rx='6' fill='${text}' opacity='0.4' />
          <rect x='20' y='45' width='450' height='12' rx='6' fill='${text}' opacity='0.2' />
        </g>
        <g id='msg-2' transform='translate(0, 150)'>
          <rect x='0' y='0' width='600' height='80' rx='12' fill='${primary}' opacity='0.15' stroke='${primary}' stroke-opacity='0.3' />
          <rect x='20' y='25' width='300' height='12' rx='6' fill='${text}' opacity='0.6' />
        </g>
      </g>
      <g id='input-pill' transform='translate(340, 620)'>
        <rect width='600' height='50' rx='25' fill='${bg}' stroke='${primary}' stroke-width='2' />
        <text x='25' y='31' font-family='Inter' font-size='14' fill='${text}' opacity='0.5'>Mensagem...</text>
        <circle cx='575' cy='25' r='15' fill='${primary}' />
      </g>
    </svg>
  `;

  // Variação 3: Dashboard Chat (Complexo)
  const var3 = `
    <svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg'>
      <rect width='100%' height='100%' fill='${bg}' />
      <g id='nav-rail' transform='translate(0, 0)'>
        <rect width='80' height='720' fill='${bg}' stroke-right='1' stroke='${secondary}' stroke-opacity='0.2' />
        <circle cx='40' cy='50' r='20' fill='${primary}' />
        <rect x='25' y='120' width='30' height='30' rx='8' fill='${text}' opacity='0.2' />
        <rect x='25' y='170' width='30' height='30' rx='8' fill='${text}' opacity='0.2' />
      </g>
      <g id='chat-window' transform='translate(100, 20)'>
        <rect width='1160' height='680' rx='24' fill='${secondary}' opacity='0.03' stroke='${secondary}' stroke-opacity='0.1' />
        <g id='chat-bubbles' transform='translate(40, 60)'>
          <rect width='500' height='150' rx='16' fill='${bg}' stroke='${text}' stroke-opacity='0.05' />
          <rect x='20' y='20' width='40' height='40' rx='20' fill='${secondary}' />
          <rect x='80' y='25' width='380' height='12' rx='6' fill='${text}' opacity='0.3' />
          <rect x='80' y='50' width='300' height='12' rx='6' fill='${text}' opacity='0.2' />
        </g>
        <g id='input-bottom' transform='translate(40, 580)'>
           <rect width='1080' height='60' rx='30' fill='${primary}' opacity='0.1' />
           <text x='30' y='36' font-family='Inter' font-size='16' fill='${text}' opacity='0.4'>Digite para processar...</text>
        </g>
      </g>
    </svg>
  `;

  return [var1, var2, var3];
}
