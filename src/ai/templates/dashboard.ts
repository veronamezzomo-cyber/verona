/**
 * @fileOverview Gerador de estruturas para Dashboards/SaaS.
 */

export function generateDashboardTemplates(colors: any): string[] {
  const { bg, primary, secondary, text } = colors;

  // Variação 1: Analytics Dashboard
  const var1 = `
    <svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg'>
      <rect width='100%' height='100%' fill='${bg}' />
      <g id='sidebar'>
        <rect width='260' height='720' fill='${bg}' stroke-right='1' stroke='${text}' stroke-opacity='0.05' />
        <text x='30' y='50' font-family='Space Grotesk' font-size='22' fill='${primary}' font-weight='bold'>FORGE.IO</text>
        <rect x='20' y='100' width='220' height='40' rx='10' fill='${primary}' opacity='0.1' />
        <rect x='20' y='150' width='220' height='40' rx='10' fill='transparent' />
      </g>
      <g id='main-content' transform='translate(300, 40)'>
        <text x='0' y='20' font-family='Space Grotesk' font-size='32' fill='${text}' font-weight='bold'>Overview</text>
        <g id='stats' transform='translate(0, 60)'>
          <rect width='280' height='140' rx='20' fill='${secondary}' opacity='0.05' stroke='${secondary}' stroke-opacity='0.2' />
          <text x='25' y='40' font-family='Inter' font-size='14' fill='${text}' opacity='0.5'>USUÁRIOS ATIVOS</text>
          <text x='25' y='90' font-family='Space Grotesk' font-size='48' fill='${text}'>1,248</text>
          
          <rect x='310' width='280' height='140' rx='20' fill='${primary}' opacity='0.05' stroke='${primary}' stroke-opacity='0.2' />
          <rect x='620' width='280' height='140' rx='20' fill='${secondary}' opacity='0.05' stroke='${secondary}' stroke-opacity='0.2' />
        </g>
        <g id='chart-area' transform='translate(0, 230)'>
          <rect width='900' height='400' rx='24' fill='${bg}' stroke='${text}' stroke-opacity='0.1' />
          <polyline points='50,350 150,280 250,320 350,200 450,250 550,150 650,180 850,100' fill='none' stroke='${primary}' stroke-width='4' />
        </g>
      </g>
    </svg>
  `;

  // Variação 2: Kanban / Task Manager
  const var2 = `
    <svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg'>
      <rect width='100%' height='100%' fill='${bg}' />
      <g id='top-bar'>
        <rect width='1280' height='70' fill='${bg}' stroke-bottom='1' stroke='${text}' stroke-opacity='0.05' />
        <circle cx='1220' cy='35' r='18' fill='${primary}' />
      </g>
      <g id='kanban' transform='translate(40, 110)'>
        <g id='col-todo'>
          <text x='0' y='0' font-family='Inter' font-size='14' fill='${text}' font-weight='bold'>A FAZER (3)</text>
          <rect y='20' width='360' height='160' rx='16' fill='${secondary}' opacity='0.05' />
          <rect y='190' width='360' height='120' rx='16' fill='${secondary}' opacity='0.05' />
        </g>
        <g id='col-doing' transform='translate(400, 0)'>
          <text x='0' y='0' font-family='Inter' font-size='14' fill='${text}' font-weight='bold'>EM ANDAMENTO (1)</text>
          <rect y='20' width='360' height='200' rx='16' fill='${primary}' opacity='0.1' stroke='${primary}' stroke-opacity='0.5' />
        </g>
        <g id='col-done' transform='translate(800, 0)'>
           <text x='0' y='0' font-family='Inter' font-size='14' fill='${text}' font-weight='bold'>CONCLUÍDO</text>
           <rect y='20' width='360' height='100' rx='16' fill='${secondary}' opacity='0.05' />
        </g>
      </g>
    </svg>
  `;

  // Variação 3: Modern List / CRM
  const var3 = `
    <svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg'>
      <rect width='100%' height='100%' fill='${bg}' />
      <g id='header' transform='translate(60, 60)'>
         <text x='0' y='0' font-family='Space Grotesk' font-size='36' fill='${text}' font-weight='bold'>Contatos</text>
         <rect x='1000' y='-30' width='160' height='45' rx='12' fill='${primary}' />
      </g>
      <g id='list' transform='translate(60, 140)'>
        <g id='row-1'>
          <rect width='1160' height='70' rx='16' fill='${secondary}' opacity='0.03' stroke='${secondary}' stroke-opacity='0.1' />
          <circle cx='40' cy='35' r='20' fill='${secondary}' opacity='0.2' />
          <rect x='80' y='25' width='200' height='10' rx='5' fill='${text}' opacity='0.5' />
          <rect x='80' y='45' width='150' height='8' rx='4' fill='${text}' opacity='0.2' />
        </g>
        <g id='row-2' transform='translate(0, 90)'>
          <rect width='1160' height='70' rx='16' fill='${secondary}' opacity='0.03' stroke='${secondary}' stroke-opacity='0.1' />
        </g>
        <g id='row-3' transform='translate(0, 180)'>
          <rect width='1160' height='70' rx='16' fill='${secondary}' opacity='0.03' stroke='${secondary}' stroke-opacity='0.1' />
        </g>
      </g>
    </svg>
  `;

  return [var1, var2, var3];
}
