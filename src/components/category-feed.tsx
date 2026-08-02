'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditableVideo } from '@/components/editable-video';

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

  // Mock data for the feed items based on category
  const feedItems: FeedItem[] = [
    { 
      id: '1', 
      title: `${category.toUpperCase()} PROJECT 01`, 
      date: 'OCT 2023',
      notes: 'Exploration of high-contrast visual rhythm and experimental color grading techniques for high-end digital media.',
      imgId: 'feed-1',
      videoUrl: category === 'shorts' ? 'https://i.imgur.com/6lrRPzC.mp4' : undefined
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

  // Automatic scroll to this section when category changes
  useEffect(() => {
    if (category && sectionRef.current) {
      sectionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, [category]);

  // Observer to track which item is active during scroll
  useEffect(() => {
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
      className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center bg-[hsl(var(--feed-bg))] animate-reveal border-y border-foreground/10 shadow-2xl py-12 md:py-16 transition-all duration-500 z-30 scroll-mt-20 overflow-hidden"
    >
      <div className="container mx-auto px-6 h-full flex flex-col">
        {/* Header inside the inline section */}
        <div className="flex items-center justify-between mb-8 border-b border-foreground/5 pb-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">Selected Works</span>
            <h2 className="font-serif text-4xl italic font-bold text-foreground lowercase">{category}</h2>
          </div>
          <div 
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClose();
              }
            }}
            className="font-mono text-[10px] uppercase tracking-widest hover:text-primary gap-2 cursor-pointer flex items-center transition-colors"
          >
            Close Feed <X className="h-4 w-4" />
          </div>
        </div>

        {/* Two Column Layout centered vertically */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center flex-1 w-full max-w-7xl mx-auto">
          
          {/* Left Column: Details */}
          <div className="flex flex-col gap-8">
            <div className="animate-reveal" key={currentItem.id}>
              <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary font-bold block mb-4">
                {currentItem.date}
              </span>
              <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[0.9] tracking-tighter mb-8 max-w-sm">
                {currentItem.title}<span className="text-primary">.</span>
              </h3>
              <div className="space-y-4 max-w-xs">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground leading-relaxed">
                  {currentItem.notes}
                </p>
                <div className="pt-8 border-t border-foreground/10 flex items-center gap-4">
                   <div className="h-1 flex-1 bg-foreground/5 relative">
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

          {/* Right Column: Centered Vertical Snap Feed */}
          <div className="flex justify-center items-center w-full h-full max-h-[85vh]">
            <div 
              ref={scrollRef}
              className="relative h-full w-auto aspect-[9/16] overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black border border-foreground/10 shadow-2xl"
            >
              {feedItems.map((item, idx) => {
                return (
                  <div 
                    key={item.id} 
                    data-index={idx}
                    className="feed-item relative w-full h-full snap-start overflow-hidden group"
                  >
                    <EditableVideo 
                      src={item.videoUrl || ""} 
                      storageKey={`feed-${category}-${item.id}`}
                      fill
                      className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none z-20" />

                    {/* Scroll Indicator for Desktop */}
                    {idx < feedItems.length - 1 && (
                      <div className="absolute bottom-8 right-8 z-30 animate-bounce text-primary/80">
                        <ChevronDown className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Footer info for feed */}
        <div className="mt-8 text-center border-t border-foreground/5 pt-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            Scroll vertically inside the black area to explore projects • Use keyboard arrows to snap
          </p>
        </div>
      </div>
    </section>
  );
}
