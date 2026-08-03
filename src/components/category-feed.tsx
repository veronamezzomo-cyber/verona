'use client';

import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { EditableVideo } from '@/components/editable-video';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

interface CategoryFeedProps {
  category: string;
  onClose: () => void;
}

interface FeedItem {
  id: string;
  title: string;
  date: string;
  notes: string;
  videoUrl?: string;
}

export function CategoryFeed({ category, onClose }: CategoryFeedProps) {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const feedItems: FeedItem[] = [
    { 
      id: '1', 
      title: `${category.toUpperCase()} PROJECT 01`, 
      date: 'OCT 2023',
      notes: 'Exploration of high-contrast visual rhythm and experimental color grading techniques for high-end digital media.',
      videoUrl: 'https://i.imgur.com/i33VokI.mp4'
    },
    { 
      id: '2', 
      title: `${category.toUpperCase()} PROJECT 02`, 
      date: 'AUG 2023',
      notes: 'Technical breakdown of motion graphics integration within raw footage, focusing on seamless transitions.',
      videoUrl: 'https://i.imgur.com/EDMdRG8_lq.mp4'
    },
    { 
      id: '3', 
      title: `${category.toUpperCase()} PROJECT 03`, 
      date: 'MAY 2023',
      notes: 'Sound-driven editorial piece where every cut responds to auditory frequencies and sub-bass impacts.',
      videoUrl: 'https://i.imgur.com/3r8dNuR_lq.mp4'
    },
    { 
      id: '4', 
      title: `${category.toUpperCase()} PROJECT 04`, 
      date: 'JAN 2023',
      notes: 'Narrative-heavy short form content designed for maximum engagement within the first 3 seconds.',
      videoUrl: 'https://i.imgur.com/p23vehx_lq.mp4'
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / scrollHeight, 0), 1);
      
      const trackWidth = trackRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const maxMove = trackWidth - windowWidth;
      
      gsap.to(trackRef.current, {
        x: -(progress * maxMove),
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ProjectText = ({ item }: { item: FeedItem }) => (
    <div className="w-[300px] md:w-[400px] flex flex-col justify-center px-8">
      <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary font-bold mb-2">
        {item.date}
      </span>
      <h3 className="font-serif text-3xl md:text-5xl font-bold text-black leading-[0.9] tracking-tighter mb-4">
        {item.title}<span className="text-primary">.</span>
      </h3>
      <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 leading-relaxed max-w-[280px]">
        {item.notes}
      </p>
    </div>
  );

  const ProjectVideo = ({ item }: { item: FeedItem }) => (
    <div className="w-[300px] md:w-[350px] aspect-[9/16] relative bg-neutral-100 rounded-sm overflow-hidden shadow-2xl border border-neutral-200 group">
      <EditableVideo 
        src={item.videoUrl || undefined} 
        storageKey={`feed-${category}-${item.id}`}
        fill
        className="object-cover"
        autoPlay
        muted
        loop
        playsInline
        hideControls
      />
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[400vh] bg-white z-30"
    >
      {/* Sticky Content Wrapper */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col">
        
        {/* Decorative Background Art */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] flex justify-between px-20">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-full w-px bg-black relative">
              <span className="absolute top-24 left-2 font-mono text-[10px] font-bold">0{i + 1}</span>
            </div>
          ))}
        </div>

        {/* Header - Remains Fixed at top of sticky container */}
        <div className="flex items-center justify-between py-6 px-12 border-b border-neutral-100 shrink-0 bg-white/80 backdrop-blur-md z-50">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">Project Archive</span>
            <div className="h-px w-12 bg-primary/20" />
            <h2 className="font-serif text-2xl italic font-bold text-black lowercase">{category}</h2>
          </div>
          <button 
            onClick={onClose}
            className="font-mono text-[10px] uppercase tracking-widest hover:text-primary gap-1.5 flex items-center transition-colors group"
          >
            Close Archive <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
          </button>
        </div>

        {/* Horizontal Moving Track */}
        <div 
          ref={trackRef}
          className="flex-1 flex items-center px-[10vw] relative z-20 will-change-transform"
        >
          <div className="flex gap-20 items-center h-full py-20">
            {/* Column 1: P1 Text / P2 Video */}
            <div className="flex flex-col gap-32">
              <ProjectText item={feedItems[0]} />
              <div className="mt-12">
                <ProjectVideo item={feedItems[1]} />
              </div>
            </div>

            {/* Column 2: P1 Video / P2 Text */}
            <div className="flex flex-col gap-32">
              <ProjectVideo item={feedItems[0]} />
              <div className="mt-12">
                <ProjectText item={feedItems[1]} />
              </div>
            </div>

            {/* Column 3: P3 Text / P4 Video */}
            <div className="flex flex-col gap-32">
              <ProjectText item={feedItems[2]} />
              <div className="mt-12">
                <ProjectVideo item={feedItems[3]} />
              </div>
            </div>

            {/* Column 4: P3 Video / P4 Text */}
            <div className="flex flex-col gap-32">
              <ProjectVideo item={feedItems[2]} />
              <div className="mt-12">
                <ProjectText item={feedItems[3]} />
              </div>
            </div>

            {/* Final Spacer */}
            <div className="w-[20vw]" />
          </div>
        </div>

        {/* Bottom Progress Indicator */}
        <div className="absolute bottom-12 left-12 right-12 flex items-center justify-between font-mono text-[8px] uppercase tracking-widest text-neutral-400">
          <div className="flex items-center gap-4">
            <span>Scroll vertically to navigate</span>
            <div className="w-12 h-px bg-neutral-200" />
          </div>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={cn("w-1.5 h-1.5 rounded-full border border-neutral-300", i === 0 && "bg-primary border-primary")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
