
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
    // Entrance animation
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current, 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
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
      className="relative w-full h-[calc(100dvh-7.5rem)] flex flex-col bg-[hsl(var(--feed-bg))] border-y border-foreground/10 shadow-2xl z-30 overflow-hidden"
    >
      <div className="container mx-auto px-6 h-full flex flex-col">
        {/* Header inside the feed - Ultra Compact */}
        <div className="flex items-center justify-between py-1.5 border-b border-foreground/5 shrink-0">
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

        {/* Immersive Grid - Maximized height filling */}
        <div className="flex-1 flex flex-col h-full min-h-0">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 items-stretch flex-1 h-full min-h-0">
            
            {/* Left Column: Details */}
            <div className="flex flex-col gap-4 justify-center h-full min-h-0 overflow-hidden animate-reveal">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary font-bold block mb-1">
                  {currentItem.date}
                </span>
                <h3 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-[0.9] tracking-tighter mb-4 max-w-sm">
                  {currentItem.title}<span className="text-primary">.</span>
                </h3>
                <div className="space-y-4 max-w-sm">
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

            {/* Right Column: Video Container - Maximized to fill height */}
            <div className="flex justify-center items-center h-full min-h-0 relative overflow-hidden">
              <div 
                ref={scrollRef}
                className="relative h-full aspect-[9/16] overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black border-x border-foreground/10 shadow-2xl"
              >
                {feedItems.map((item, idx) => (
                  <div 
                    key={item.id} 
                    data-index={idx}
                    className="feed-item relative w-full h-full snap-start overflow-hidden group"
                  >
                    <EditableVideo 
                      src={item.videoUrl || undefined} 
                      storageKey={`feed-${category}-${item.id}`}
                      fill
                      className="object-contain h-full w-full transition-transform group-hover:scale-102"
                      style={{ transitionDuration: '2000ms' }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none z-20" />

                    {idx < feedItems.length - 1 && (
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 animate-bounce text-primary/80">
                        <ChevronDown className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Minimal Scroll Hint */}
        <div className="absolute bottom-4 left-8 hidden lg:block z-40">
          <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground opacity-60">
            Scroll vertically inside the feed to explore projects
          </p>
        </div>
      </div>
    </section>
  );
}
