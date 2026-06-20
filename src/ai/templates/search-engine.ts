/**
 * @fileOverview Gerador de estruturas para Search Engines.
 */

export function generateSearchTemplates(colors: any): string[] {
  const { bg, primary, secondary, text } = colors;

  // Variação 1: Landing Page (Google Style)
  const var1 = `
    <svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg'>
      <rect width='100%' height='100%' fill='${bg}' />
      <g id='top-nav' transform='translate(1000, 30)'>
        <text x='0' y='0' font-family='Inter' font-size='14' fill='${text}' opacity='0.6'>Imagens</text>
        <text x='80' y='0' font-family='Inter' font-size='14' fill='${text}' opacity='0.6'>Maps</text>
        <circle cx='180' cy='-5' r='18' fill='${primary}' />
      </g>
      <g id='center-search' transform='translate(640, 300)'>
        <text x='0' y='-80' text-anchor='middle' font-family='Space Grotesk' font-size='72' font-weight='bold' fill='${primary}'>SEARCH</text>
        <rect x='-300' y='0' width='600' height='56' rx='28' fill='${bg}' stroke='${text}' stroke-opacity='0.2' />
        <circle cx='-270' cy='28' r='10' fill='${text}' opacity='0.3' />
        <g id='buttons' transform='translate(0, 90)'>
          <rect x='-160' y='0' width='150' height='40' rx='8' fill='${secondary}' opacity='0.1' />
          <text x='-85' y='25' text-anchor='middle' font-family='Inter' font-size='14' fill='${text}'>Pesquisa Search</text>
          <rect x='10' y='0' width='150' height='40' rx='8' fill='${secondary}' opacity='0.1' />
          <text x='85' y='25' text-anchor='middle' font-family='Inter' font-size='14' fill='${text}'>Estou com sorte</text>
        </g>
      </g>
    </svg>
  `;

  // Variação 2: Página de Resultados (SERP)
  const var2 = `
    <svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg'>
      <rect width='100%' height='100%' fill='${bg}' />
      <g id='header' transform='translate(0, 0)'>
        <rect width='1280' height='120' fill='${bg}' stroke-bottom='1' stroke='${secondary}' stroke-opacity='0.1' />
        <text x='60' y='50' font-family='Space Grotesk' font-size='24' fill='${primary}' font-weight='bold'>SEARCH</text>
        <rect x='180' y='25' width='600' height='45' rx='22' fill='${bg}' stroke='${text}' stroke-opacity='0.2' />
        <g id='tabs' transform='translate(180, 100)'>
           <text x='0' y='0' font-family='Inter' font-size='14' fill='${primary}' font-weight='bold'>Tudo</text>
           <rect x='0' y='5' width='35' height='3' fill='${primary}' />
           <text x='70' y='0' font-family='Inter' font-size='14' fill='${text}' opacity='0.5'>Vídeos</text>
           <text x='150' y='0' font-family='Inter' font-size='14' fill='${text}' opacity='0.5'>Notícias</text>
        </g>
      </g>
      <g id='results' transform='translate(180, 160)'>
        <g id='result-1'>
          <text x='0' y='20' font-family='Inter' font-size='14' fill='${text}' opacity='0.5'>www.exemplo.com > categorias</text>
          <text x='0' y='45' font-family='Inter' font-size='20' fill='${primary}' font-weight='600'>Melhores Práticas de Design UI</text>
          <rect x='0' y='60' width='600' height='10' rx='5' fill='${text}' opacity='0.2' />
          <rect x='0' y='80' width='450' height='10' rx='5' fill='${text}' opacity='0.1' />
        </g>
        <g id='result-2' transform='translate(0, 150)'>
          <text x='0' y='20' font-family='Inter' font-size='14' fill='${text}' opacity='0.5'>github.com > repo</text>
          <text x='0' y='45' font-family='Inter' font-size='20' fill='${primary}' font-weight='600'>Componentes SVG para React</text>
          <rect x='0' y='60' width='600' height='10' rx='5' fill='${text}' opacity='0.2' />
        </g>
      </g>
    </svg>
  `;

  // Variação 3: Minimal Dark Search (Modern)
  const var3 = `
    <svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg'>
      <rect width='100%' height='100%' fill='${bg}' />
      <g id='hero' transform='translate(640, 320)'>
        <rect x='-400' y='-40' width='800' height='80' rx='40' fill='${secondary}' opacity='0.05' stroke='${secondary}' stroke-width='1' />
        <text x='-350' y='12' font-family='Inter' font-size='24' fill='${text}' opacity='0.6'>O que você busca hoje?</text>
        <circle cx='350' cy='0' r='25' fill='${primary}' />
      </g>
      <g id='quick-links' transform='translate(640, 450)'>
        <rect x='-250' y='0' width='120' height='120' rx='20' fill='${secondary}' opacity='0.1' />
        <rect x='-50' y='0' width='120' height='120' rx='20' fill='${secondary}' opacity='0.1' />
        <rect x='150' y='0' width='120' height='120' rx='20' fill='${secondary}' opacity='0.1' />
      </g>
    </svg>
  `;

  return [var1, var2, var3];
}
