/**
 * @fileOverview Gerador de estruturas para Plataformas de Vídeo.
 */

export function generateVideoTemplates(colors: any): string[] {
  const { bg, primary, secondary, text } = colors;

  // Variação 1: Home Grid (YouTube Style)
  const var1 = `
    <svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg'>
      <rect width='100%' height='100%' fill='${bg}' />
      <g id='header'>
        <rect width='1280' height='65' fill='${bg}' stroke-bottom='1' stroke='${text}' stroke-opacity='0.05' />
        <rect x='30' y='20' width='100' height='25' rx='4' fill='${primary}' />
        <rect x='440' y='12' width='400' height='40' rx='20' fill='${bg}' stroke='${text}' stroke-opacity='0.2' />
        <circle cx='1220' cy='32' r='18' fill='${secondary}' />
      </g>
      <g id='sidebar' transform='translate(0, 65)'>
        <rect width='240' height='655' fill='${bg}' />
        <rect x='20' y='30' width='200' height='40' rx='10' fill='${primary}' opacity='0.1' />
        <rect x='20' y='80' width='200' height='40' rx='10' fill='transparent' />
        <rect x='20' y='130' width='200' height='40' rx='10' fill='transparent' />
      </g>
      <g id='video-grid' transform='translate(270, 95)'>
        <g id='card-1'>
          <rect width='300' height='170' rx='12' fill='${secondary}' opacity='0.1' />
          <circle cx='30' cy='200' r='18' fill='${text}' opacity='0.2' />
          <rect x='60' y='190' width='220' height='12' rx='6' fill='${text}' opacity='0.4' />
          <rect x='60' y='210' width='150' height='10' rx='5' fill='${text}' opacity='0.2' />
        </g>
        <g id='card-2' transform='translate(330, 0)'>
          <rect width='300' height='170' rx='12' fill='${secondary}' opacity='0.1' />
          <rect x='60' y='190' width='220' height='12' rx='6' fill='${text}' opacity='0.4' />
        </g>
        <g id='card-3' transform='translate(660, 0)'>
          <rect width='300' height='170' rx='12' fill='${secondary}' opacity='0.1' />
        </g>
        <g id='card-4' transform='translate(0, 280)'>
          <rect width='300' height='170' rx='12' fill='${secondary}' opacity='0.1' />
        </g>
      </g>
    </svg>
  `;

  // Variação 2: Sidebar Mini (Compact Feed)
  const var2 = `
    <svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg'>
      <rect width='100%' height='100%' fill='${bg}' />
      <g id='mini-sidebar'>
        <rect width='72' height='720' fill='${bg}' stroke-right='1' stroke='${text}' stroke-opacity='0.05' />
        <rect x='20' y='40' width='32' height='32' rx='8' fill='${primary}' opacity='0.8' />
        <rect x='20' y='100' width='32' height='32' rx='8' fill='${text}' opacity='0.1' />
      </g>
      <g id='categories' transform='translate(100, 20)'>
        <rect width='80' height='32' rx='16' fill='${text}' />
        <rect x='95' y='0' width='120' height='32' rx='16' fill='${secondary}' opacity='0.15' />
        <rect x='230' y='0' width='100' height='32' rx='16' fill='${secondary}' opacity='0.15' />
      </g>
      <g id='video-feed' transform='translate(100, 80)'>
        <rect width='1140' height='250' rx='16' fill='${secondary}' opacity='0.05' stroke='${secondary}' stroke-opacity='0.1' />
        <rect x='30' y='30' width='360' height='190' rx='8' fill='${primary}' opacity='0.1' />
        <rect x='420' y='40' width='400' height='24' rx='12' fill='${text}' opacity='0.5' />
        <rect x='420' y='80' width='200' height='12' rx='6' fill='${text}' opacity='0.2' />
      </g>
    </svg>
  `;

  // Variação 3: Player Cinema Mode
  const var3 = `
    <svg viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg'>
      <rect width='100%' height='100%' fill='${bg}' />
      <g id='player-main' transform='translate(40, 40)'>
        <rect width='850' height='480' rx='16' fill='black' />
        <rect x='400' y='215' width='50' height='50' rx='25' fill='${primary}' opacity='0.9' />
        <g id='controls' transform='translate(0, 440)'>
           <rect width='850' height='40' fill='${bg}' opacity='0.3' />
           <rect x='20' y='18' width='810' height='4' rx='2' fill='${primary}' />
        </g>
      </g>
      <g id='sidebar-results' transform='translate(920, 40)'>
        <rect width='320' height='80' rx='12' fill='${secondary}' opacity='0.1' />
        <rect width='320' height='80' rx='12' fill='${secondary}' opacity='0.1' transform='translate(0, 100)' />
        <rect width='320' height='80' rx='12' fill='${secondary}' opacity='0.1' transform='translate(0, 200)' />
      </g>
      <g id='video-info' transform='translate(40, 540)'>
        <rect width='600' height='24' rx='12' fill='${text}' opacity='0.6' />
        <rect y='40' width='40' height='40' rx='20' fill='${secondary}' />
      </g>
    </svg>
  `;

  return [var1, var2, var3];
}
