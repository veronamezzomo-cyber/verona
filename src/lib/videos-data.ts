/**
 * @fileOverview Conteúdo curado do portfólio.
 * Centraliza os metadados dos vídeos para facilitar a edição e manutenção.
 */

export interface ProjectVideo {
  id: string;
  title: string;
  date: string;
  videoUrl: string;
  category: string;
  description?: string;
}

export const VIDEOS_DATA: ProjectVideo[] = [
  {
    id: 'cinematic-01',
    title: 'Cinematic Reel',
    date: '2024',
    videoUrl: 'https://i.imgur.com/i33VokI.mp4',
    category: 'motion',
    description: 'A deep dive into high-contrast grading and rhythmic cutting. Explores the boundary between motion design and reality.'
  },
  {
    id: 'urban-flow',
    title: 'Urban Flow Edit',
    date: '2023',
    videoUrl: 'https://i.imgur.com/EDMdRG8_lq.mp4',
    category: 'shorts',
    description: 'Capturing the heartbeat of the city through fast-paced transitions and dynamic speed ramping.'
  },
  {
    id: 'podcast-highlight',
    title: 'Podcast Dynamics',
    date: '2024',
    videoUrl: 'https://i.imgur.com/3r8dNuR_lq.mp4',
    category: 'talking',
    description: 'Focusing on sound design and visual clarity to maximize audience engagement in long-form conversations.'
  }
];
