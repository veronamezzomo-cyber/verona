'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  imgId: string;
  videoUrl?: string;
}

export function CategoryFeed({ category, onClose }: CategoryFeedProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const feedItems: FeedItem[] = [
    { 
      id: '1', 
      title: `${category.toUpperCase()} PROJECT 01`, 
      date: 'OCT 2023',
      notes: 'Exploration of high-contrast visual rhythm and experimental color grading techniques for high-end digital media.',
      imgId: 'feed-1',
      videoUrl: 'https://i.imgur.com/6lrRPzC.mp4'
    },
    { 
      id: '2', 
      title: `${category.toUpperCase()} PROJECT 02`, 
      date: 'AUG 2023',
      notes: 'Technical breakdown of motion graphics integration within raw footage, focusing on seamless transitions.',
      imgId: 'feed-2',
      videoUrl: 'https://i.imgur.com/EDMdRG8_lq.mp4'
    },
    { 
      id: '3', 
      title: `${category.toUpperCase()} PROJECT 03`, 
      date: 'MAY 2023',
      notes: 'Sound-driven editorial piece where every cut responds to auditory frequencies and sub-bass impacts.',
      imgId: 'feed-3',
      videoUrl: 'https://i.imgur.com/3r8dNuR_lq.mp4'
    },
    { 
      id: '4', 
      title: `${category.toUpperCase()} PROJECT 04`, 
      date: 'JAN 2023',
      notes: 'Narrative-heavy short form content designed for maximum engagement within the first 3 seconds.',
      imgId: 'feed-4',
      videoUrl: 'https://i.imgur.com/p23vehx_lq.mp4'
    },
  ];

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [category]);

  const currentItem = feedItems[activeIndex];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[calc(100dvh-7.5rem)] flex flex-col bg-background z-30 overflow-hidden"
    >
      {/* Header - Fixed to minimal space */}
      <div className="flex items-center justify-between py-2 px-6 border-b border-foreground/5 shrink-0 bg-background">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[8px] uppercase tracking-widest text-primary font-bold">Archive</span>
          <h2 className="font-serif text-lg italic font-bold text-foreground lowercase">{category}</h2>
        </div>
        <div 
          role="button"
          tabIndex={0}
          onClick={onClose}
          className="font-mono text-[8px] uppercase tracking-widest hover:text-primary gap-1.5 cursor-pointer flex items-center transition-colors"
        >
          Close <X className="h-3 w-3" />
        </div>
      </div>

      {/* Content - Full Viewport Width */}
      <div className="flex-1 flex min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] w-full h-full">
          
          {/* Left Col: Details */}
          <div className="flex flex-col justify-center px-8 lg:px-12 py-8 bg-background border-r border-foreground/5 z-20">
            <div className="animate-slide-up" key={activeIndex}>
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary font-bold block mb-1">
                {currentItem.date}
              </span>
              <h3 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-[0.9] tracking-tighter mb-4">
                {currentItem.title}<span className="text-primary">.</span>
              </h3>
              <div className="space-y-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground leading-relaxed">
                  {currentItem.notes}
                </p>
                <div className="pt-4 border-t border-foreground/10 flex items-center gap-4">
                   <div className="h-0.5 flex-1 bg-foreground/5 relative">
                      <div 
                        className="absolute h-full bg-primary transition-all duration-500" 
                        style={{ width: `${((activeIndex + 1) / feedItems.length) * 100}%` }}
                      />
                   </div>
                   <span className="font-mono text-[10px] text-muted-foreground">
                    0{activeIndex + 1} / 0{feedItems.length}
                   </span>
                </div>
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-primary/60 pt-2">
                  Explore the 9:16 mobile-first grid
                </p>
              </div>
            </div>
          </div>

          {/* Right Col: Immersive 2x2 Mobile Grid Visualization */}
          <div className="relative h-full w-full bg-black/95 overflow-hidden grid grid-cols-2 grid-rows-2 p-6 gap-6">
            {feedItems.map((item, idx) => (
              <div 
                key={item.id} 
                onMouseEnter={() => setActiveIndex(idx)}
                className={cn(
                  "relative w-full h-full flex items-center justify-center transition-all duration-700 ease-out cursor-crosshair",
                  activeIndex === idx ? "opacity-100 z-10" : "opacity-40 grayscale-[50%] hover:opacity-70"
                )}
              >
                {/* 9:16 "Phone" Container */}
                <div className={cn(
                  "relative aspect-[9/16] h-full max-h-full rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-500 bg-black",
                  activeIndex === idx ? "ring-4 ring-primary/20 scale-[1.02]" : "scale-100"
                )}>
                  <EditableVideo 
                    src={item.videoUrl || undefined} 
                    storageKey={`feed-${category}-${item.id}`}
                    fill
                    className={cn(
                      "object-cover w-full h-full transition-transform duration-1000",
                      activeIndex === idx ? "scale-105" : "scale-100"
                    )}
                    autoPlay
                    muted
                    loop
                    playsInline
                    hideControls
                  />
                  
                  {/* Cinematic Overlay per "Phone" */}
                  <div className={cn(
                    "absolute inset-0 transition-opacity duration-500 pointer-events-none",
                    activeIndex === idx ? "bg-primary/5" : "bg-black/30"
                  )} />
                </div>

                {/* Index Indicator */}
                <div className="absolute top-0 left-0 p-2">
                  <span className={cn(
                    "font-mono text-[8px] transition-colors duration-500",
                    activeIndex === idx ? "text-primary font-bold" : "text-white/20"
                  )}>
                    PRJ_0{idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
