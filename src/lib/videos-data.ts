/**
 * @fileOverview Conteúdo curado do portfólio.
 * Centraliza os metadados dos vídeos reais com suporte a múltiplas categorias.
 */

export interface ProjectVideo {
  id: string;
  title: string;
  description: string;
  date: string;
  videoUrl: string;
  category: string[];
}

export const VIDEOS_DATA: ProjectVideo[] = [
  {
    id: 'viral-shorts-01',
    title: 'Viral Short-Form / IShowSpeed Style',
    description: 'Video made in IShowSpeed\'s viral style. Dynamic cuts, constant captions, sound effects, transitions, color grading… This one actually blew up. And yeah, I got scammed making it. So kids, stay away from "easy money" gigs on Discord.',
    date: '2026',
    videoUrl: 'https://i.imgur.com/aYp6QMo.mp4',
    category: ['shorts']
  },
  {
    id: 'animated-captions-01',
    title: 'Animated Captions Showcase',
    description: 'An example of subtitles that are trending right now — no B-roll, pure typography. Built as a personal showcase of animated subtitle styles trending across Reels, Shorts, and TikTok. Text timing, keyword highlights, and typographic pacing synced tight to speech. Pair this with dynamic B-roll and you\'ve got the perfect recipe for content that actually gets watched.',
    date: '2025',
    videoUrl: 'https://i.imgur.com/ZGVjMPL.mp4',
    category: ['shorts', 'talking']
  },
  {
    id: 'retention-edit-01',
    title: 'Viral Retention Edit',
    description: 'Pokemon card pull — built entirely around dopamine loops and retention hooks. Fast micro-cuts synced to sound effects, 2D/3D motion elements layered throughout, and constant visual stimuli designed to keep the viewer from scrolling. Every frame is a reason to stay.',
    date: '2026',
    videoUrl: 'https://i.imgur.com/0zy9NtL.mp4',
    category: ['shorts']
  }
];
