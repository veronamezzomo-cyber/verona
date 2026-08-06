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
  },
  {
    id: 'motion-graphics-01',
    title: 'Future Tech Opener',
    date: '2024',
    videoUrl: 'https://i.imgur.com/i33VokI.mp4',
    category: 'motion',
    description: 'Exploration of futuristic UI elements and fluid motion principles.'
  },
  {
    id: 'vlog-edit-01',
    title: 'Tokyo Nights',
    date: '2023',
    videoUrl: 'https://i.imgur.com/EDMdRG8_lq.mp4',
    category: 'vlogs',
    description: 'Color grading experiment focusing on neon aesthetics and urban atmosphere.'
  },
  {
    id: 'commercial-spot',
    title: 'Brand Story 2024',
    date: '2024',
    videoUrl: 'https://i.imgur.com/p23vehx_lq.mp4',
    category: 'talking',
    description: 'A professional brand documentary highlighting sustainable practices.'
  }
];
