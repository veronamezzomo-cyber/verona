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
  },
  {
    id: 'intro-video-01',
    title: 'Me in 1 min',
    description: "My 20's Upwork introduction video. Cringe? Maybe. A masterpiece? Absolutely. One of my earliest pieces, and still one of my favorites. Raw, honest, and a good reminder of how far the craft has come. Project developed with the goal of introducing myself, as well as my perspective about content creation and audience retention. The piece aims to showcase different and simple ways of working with 2D and 3D elements, combined with audio treatment, alternating music, and engaging sound effects.",
    date: '2023',
    videoUrl: 'https://i.imgur.com/ND3kmsW.mp4',
    category: ['motion', 'vlogs']
  }
];
