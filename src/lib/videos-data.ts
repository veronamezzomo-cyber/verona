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
  startTime?: number;
  coverImage?: string;
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
    category: ['motion', 'vlogs'],
    startTime: 13
  },
  {
    id: 'iamcooklo-humor-edit',
    title: 'iamcooklo — Humor Edit',
    description: 'Video made for YouTube creator @iamcooklo — the only piece I keep public on my resume. Fast-paced humor edit built around dynamic subtitles, layered motion graphics, parallax effects, and a soundtrack that drives every cut. Color correction and visual effects throughout to keep the energy high from frame one.',
    date: '2025',
    videoUrl: 'https://i.imgur.com/cyxF01x.mp4',
    category: ['motion', 'long']
  },
  {
    id: 'grok-motion-showcase',
    title: 'Grok Motion Showcase',
    description: 'A love letter to clean kinetic typography. A self-initiated piece built around Grok\'s brand. No client, no brief, just an excuse to play. Simple by design: clean kinetic typography, light 2D/3D blending. Not the most technically ambitious thing in the portfolio, but it\'s a solid snapshot of pacing instincts and how much "feel" you can pack into a short, minimal piece.',
    date: '2024',
    videoUrl: 'https://i.imgur.com/SRki5JL.mp4',
    category: ['motion']
  },
  {
    id: 'dentistry-01',
    title: 'Dentistry',
    description: "Complex topics? Simplified. Boring lectures? Never. Transforming complex dental procedures into accessible visual storytelling through 2D motion graphics and synchronized captions. Technical content doesn't have to be dry. Built for a lay audience with retention-focused editing rhythm using Adobe Premiere and After Effects — attention from start to finish.",
    date: '2026',
    videoUrl: 'https://i.imgur.com/HMSGIZG.mp4',
    category: ['shorts']
  }
];