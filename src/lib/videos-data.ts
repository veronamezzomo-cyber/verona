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
  tags?: string[];
  skills?: string[];
  role?: string;
}

export const VIDEOS_DATA: ProjectVideo[] = [
  {
    id: 'viral-shorts-01',
    title: 'Viral Short-Form / IShowSpeed Style',
    date: '2026',
    videoUrl: 'https://i.imgur.com/aYp6QMo.mp4',
    category: 'shorts',
    tags: ['Short-Form Video', '2026'],
    description: 'Video made in IShowSpeed\'s viral style. Dynamic cuts, constant captions, sound effects, transitions, color grading… This one actually blew up. And yeah, I got scammed making it. So kids, stay away from "easy money" gigs on Discord.',
    skills: ['Subtitle Edit', 'Color Grading', 'Sound Design', 'AI Upscaling'],
    role: 'Video Editor & Motion Designer'
  },
  {
    id: 'animated-captions-01',
    title: 'Animated Captions Showcase',
    date: '2025',
    videoUrl: 'https://i.imgur.com/ZGVjMPL.mp4',
    category: 'shorts',
    tags: ['Motion Graphics', 'Talking', 'April, 2025'],
    description: 'An example of subtitles that are trending right now — no B-roll, pure typography. Built as a personal showcase of animated subtitle styles trending across Reels, Shorts, and TikTok. Text timing, keyword highlights, and typographic pacing synced tight to speech. Pair this with dynamic B-roll and you\'ve got the perfect recipe for content that actually gets watched.',
    skills: ['Animated Subtitles', 'Motion Typography', 'Social Media Content'],
    role: 'Motion Graphics Designer'
  },
  {
    id: 'retention-edit-01',
    title: 'Viral Retention Edit',
    date: '2026',
    videoUrl: 'https://i.imgur.com/0zy9NtL.mp4',
    category: 'shorts',
    tags: ['Short-Form Video', 'Shorts', 'All', 'June, 2026'],
    description: 'Pokemon card pull — built entirely around dopamine loops and retention hooks. Fast micro-cuts synced to sound effects, 2D/3D motion elements layered throughout, and constant visual stimuli designed to keep the viewer from scrolling. Every frame is a reason to stay.',
    skills: ['Animated Subtitles', 'Motion Graphics', 'Sound Design'],
    role: 'Video Editor & Motion Designer'
  },
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
    category: 'vlogs',
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
