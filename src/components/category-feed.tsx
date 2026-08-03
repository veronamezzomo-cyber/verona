'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
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
  const scrollRef = useRef<HTMLDivElement>(null);
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
      imgId: 'feed-2' 
    },
    { 
      id: '3', 
      title: `${category.toUpperCase()} PROJECT 03`, 
      date: 'MAY 2023',
      notes: 'Sound-driven editorial piece where every cut responds to auditory frequencies and sub-bass impacts.',
      imgId: 'feed-3' 
    },
    { 
      id: '4', 
      title: `${category.toUpperCase()} PROJECT 04`, 
      date: 'JAN 2023',
      notes: 'Narrative-heavy short form content designed for maximum engagement within the first 3 seconds.',
      imgId: 'feed-4' 
    },
  ];

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.6, root: scrollRef.current }
    );

    const items = scrollRef.current?.querySelectorAll('.feed-item');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [category]);

  const currentItem = feedItems[activeIndex];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[calc(100dvh-7.5rem)] flex flex-col bg-background z-30 overflow-hidden"
    >
      {/* Header - Fixed to minimal space */}
      <div className="flex items-center justify-between py-2 px-6 border-b border-foreground/5 shrink-0">
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
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] w-full h-full">
          
          {/* Left Col: Details */}
          <div className="flex flex-col justify-center px-8 lg:px-12 py-8 bg-background border-r border-foreground/5">
            <div className="animate-slide-up">
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
              </div>
            </div>
          </div>

          {/* Right Col: Immersive Video Player - Horizontal Fill */}
          <div className="relative h-full w-full bg-black overflow-hidden flex items-stretch">
            <div 
              ref={scrollRef}
              className="relative w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
            >
              {feedItems.map((item, idx) => (
                <div 
                  key={item.id} 
                  data-index={idx}
                  className="feed-item relative w-full h-full snap-start overflow-hidden"
                >
                  <EditableVideo 
                    src={item.videoUrl || undefined} 
                    storageKey={`feed-${category}-${item.id}`}
                    fill
                    className="object-cover w-full h-full"
                    style={{ transitionDuration: '1000ms' }}
                  />
                  
                  {/* Cinematic Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none z-20" />

                  {/* Vertical Scroll Hint Overlay */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none">
                    <div className="flex flex-col items-center gap-2">
                      <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/60">
                        {idx < feedItems.length - 1 ? "Scroll down to next project" : "End of archive"}
                      </p>
                      {idx < feedItems.length - 1 && (
                        <ChevronDown className="h-4 w-4 text-primary animate-bounce" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
