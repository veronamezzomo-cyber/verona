'use client';

import React, { useRef, useEffect, useState } from 'react';
import { X, Lock } from 'lucide-react';
import { EditableVideo } from '@/components/editable-video';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useToast } from '@/hooks/use-toast';

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
  const bgLinesRef = useRef<HTMLDivElement>(null);
  const [clickCount, setClickCount] = useState(0);
  const { toast } = useToast();

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
      if (!containerRef.current || !trackRef.current || !bgLinesRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / scrollHeight, 0), 1);
      
      const trackWidth = trackRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const maxMove = trackWidth - windowWidth;
      
      // CAMADA 1: Conteúdo Principal (Movimento Standard)
      gsap.to(trackRef.current, {
        x: -(progress * maxMove),
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      // CAMADA 2: Efeito PARALLAX (Linhas de Fundo movem-se mais devagar para criar profundidade)
      gsap.to(bgLinesRef.current, {
        x: -(progress * maxMove * 0.4),
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInteraction = () => {
    if (clickCount >= 3) {
      toast({
        title: "Interaction Limit Reached",
        description: "You've used your 3 interaction credits for this session.",
        variant: "destructive"
      });
      return;
    }
    setClickCount(prev => prev + 1);
  };

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
    <div 
      onClick={handleInteraction}
      className={cn(
        "w-[300px] md:w-[350px] aspect-[9/16] relative bg-neutral-100 rounded-sm overflow-hidden shadow-2xl border border-neutral-200 group cursor-pointer transition-all",
        clickCount >= 3 && "grayscale opacity-80 cursor-not-allowed"
      )}
    >
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
      {clickCount >= 3 && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <Lock className="w-8 h-8 text-white opacity-50" />
        </div>
      )}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[400vh] bg-white z-30"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between py-6 px-12 border-b border-neutral-100 shrink-0 bg-white/80 backdrop-blur-md z-50">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">Project Archive</span>
            <div className="h-px w-12 bg-primary/20" />
            <h2 className="font-serif text-2xl italic font-bold text-black lowercase">{category}</h2>
            <div className="ml-4 px-2 py-0.5 rounded-full border border-neutral-200 font-mono text-[8px] uppercase tracking-tighter">
              Credits: {3 - clickCount}/3
            </div>
          </div>
          <button 
            onClick={onClose}
            className="font-mono text-[10px] uppercase tracking-widest hover:text-primary gap-1.5 flex items-center transition-colors group"
          >
            Close Archive <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
          </button>
        </div>

        {/* Parallax Background Layer */}
        <div 
          ref={bgLinesRef}
          className="absolute inset-0 pointer-events-none opacity-[0.05] flex justify-between px-20 z-10 will-change-transform"
        >
          {[...Array(30)].map((_, i) => (
            <div key={i} className="h-full w-px bg-black relative flex-shrink-0 mx-[250px]">
              <span className="absolute top-24 left-2 font-mono text-[10px] font-bold">L-{i + 1}</span>
            </div>
          ))}
        </div>

        {/* Foreground Content Track */}
        <div 
          ref={trackRef}
          className="flex-1 flex items-center px-[10vw] relative z-20 will-change-transform"
        >
          <div className="flex gap-20 items-center h-full py-20">
            {/* Column 1 */}
            <div className="flex flex-col gap-32">
              <ProjectText item={feedItems[0]} />
              <div className="mt-12">
                <ProjectVideo item={feedItems[1]} />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-32">
              <ProjectVideo item={feedItems[0]} />
              <div className="mt-12">
                <ProjectText item={feedItems[1]} />
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-32">
              <ProjectText item={feedItems[2]} />
              <div className="mt-12">
                <ProjectVideo item={feedItems[3]} />
              </div>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-32">
              <ProjectVideo item={feedItems[2]} />
              <div className="mt-12">
                <ProjectText item={feedItems[3]} />
              </div>
            </div>

            <div className="w-[20vw]" />
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-12 left-12 right-12 flex items-center justify-between font-mono text-[8px] uppercase tracking-widest text-neutral-400">
          <div className="flex items-center gap-4">
            <span>Side-scrolling Parallax Active</span>
            <div className="w-12 h-px bg-neutral-200" />
          </div>
          <div className="flex gap-2 items-center">
            <span className="mr-2">Interaction Quota</span>
            {[0, 1, 2].map(i => (
              <div key={i} className={cn(
                "w-1.5 h-1.5 rounded-full border transition-colors", 
                i < clickCount ? "bg-primary border-primary" : "border-neutral-300"
              )} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
