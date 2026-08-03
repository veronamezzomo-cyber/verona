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
  onCategoryClick?: (label: string) => void;
}

interface FeedItem {
  id: string;
  title: string;
  date: string;
  notes: string;
  videoUrl?: string;
}

export function CategoryFeed({ category, onClose, onCategoryClick }: CategoryFeedProps) {
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
      
      if (rect.top > 80 && onClose) {
        onClose();
        return;
      }

      gsap.to(trackRef.current, {
        x: -(progress * maxMove),
        duration: 0.2,
        ease: 'none',
        overwrite: 'auto'
      });

      gsap.to(bgLinesRef.current, {
        x: -(progress * maxMove * 0.4),
        duration: 0.3,
        ease: 'none',
        overwrite: 'auto'
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onClose]);

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
    <div className="w-[300px] md:w-[400px] flex flex-col justify-center px-8 z-20" suppressHydrationWarning>
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

  const ProjectVideo = ({ item, type }: { item: FeedItem, type: 'up' | 'down' }) => (
    <div 
      onClick={handleInteraction}
      className={cn(
        "w-[350px] md:w-[450px] h-[70vh] relative bg-neutral-200 overflow-hidden group cursor-pointer transition-all z-10",
        type === 'up' 
          ? "[clip-path:polygon(0%_100%,0%_0%,85%_0%,100%_15%,100%_100%)]" 
          : "[clip-path:polygon(0%_15%,15%_0%,100%_0%,100%_100%,0%_100%)]",
        clickCount >= 3 && "grayscale opacity-80 cursor-not-allowed"
      )}
      suppressHydrationWarning
    >
      <EditableVideo 
        src={item.videoUrl || ""} 
        storageKey={`feed-${category}-${item.id}`}
        fill
        className="object-cover object-center scale-110 group-hover:scale-100 transition-transform duration-[2s]"
        autoPlay
        muted
        loop
        playsInline
        hideControls
      />
      {clickCount >= 3 && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]" suppressHydrationWarning>
          <Lock className="w-8 h-8 text-white opacity-50" />
        </div>
      )}
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" suppressHydrationWarning />
    </div>
  );

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[150vh] bg-white z-30"
      suppressHydrationWarning
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col" suppressHydrationWarning>
        
        {/* Header */}
        <div className="flex items-center justify-between py-6 px-12 border-neutral-100 shrink-0 bg-white/80 backdrop-blur-md z-50" suppressHydrationWarning>
          <div className="flex items-center gap-4" suppressHydrationWarning>
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">Project Archive</span>
            <div className="h-px w-12 bg-primary/20" />
            <h2 className="font-serif text-2xl italic font-bold text-black lowercase">{category}</h2>
            <div className="ml-4 px-2 py-0.5 rounded-full border border-neutral-200 font-mono text-[8px] uppercase tracking-tighter" suppressHydrationWarning>
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
          suppressHydrationWarning
        >
          {[...Array(30)].map((_, i) => (
            <div key={i} className="h-full w-px bg-black relative flex-shrink-0 mx-[250px]" suppressHydrationWarning>
              <span className="absolute top-24 left-2 font-mono text-[10px] font-bold">L-{i + 1}</span>
            </div>
          ))}
        </div>

        {/* Foreground Content Track */}
        <div 
          ref={trackRef}
          className="flex-1 flex items-center px-[10vw] relative z-20 will-change-transform"
          suppressHydrationWarning
        >
          <div className="flex gap-0 items-center h-full py-0" suppressHydrationWarning>
            <div className="flex flex-col justify-between h-[80vh] py-10" suppressHydrationWarning>
              <ProjectText item={feedItems[0]} />
              <ProjectVideo item={feedItems[1]} type="down" />
            </div>

            <div className="flex flex-col justify-between h-[80vh] py-10 ml-20" suppressHydrationWarning>
              <ProjectVideo item={feedItems[0]} type="up" />
              <ProjectText item={feedItems[1]} />
            </div>

            <div className="flex flex-col justify-between h-[80vh] py-10 ml-20" suppressHydrationWarning>
              <ProjectText item={feedItems[2]} />
              <ProjectVideo item={feedItems[3]} type="down" />
            </div>

            <div className="flex flex-col justify-between h-[80vh] py-10 ml-20" suppressHydrationWarning>
              <ProjectVideo item={feedItems[2]} type="up" />
              <ProjectText item={feedItems[3]} />
            </div>

            <div className="w-[30vw]" suppressHydrationWarning />
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-12 left-12 right-12 flex items-center justify-between font-mono text-[8px] uppercase tracking-widest text-neutral-400 z-50" suppressHydrationWarning>
          <div className="flex items-center gap-4" suppressHydrationWarning>
            <span>Geometric Masking Active</span>
            <div className="w-12 h-px bg-neutral-200" />
            <span>01 / 04</span>
          </div>
          <div className="flex gap-2 items-center" suppressHydrationWarning>
            <span className="mr-2">Scroll vertically to reveal masks</span>
            {[0, 1, 2].map(i => (
              <div key={i} className={cn(
                "w-1.5 h-1.5 rounded-full border transition-colors", 
                i < clickCount ? "bg-primary border-primary" : "border-neutral-300"
              )} suppressHydrationWarning />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
