'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { X, Lock, Sparkles } from 'lucide-react';
import { EditableVideo } from '@/components/editable-video';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useToast } from '@/hooks/use-toast';
import { VIDEOS_DATA } from '@/lib/videos-data';

interface CategoryFeedProps {
  category: string | null;
  onClose: () => void;
  onCategoryClick?: (label: string) => void;
}

interface LineCoord {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function CategoryFeed({ category, onClose }: CategoryFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const connectorsRef = useRef<SVGSVGElement>(null);
  const pickStyleTextRef = useRef<HTMLDivElement>(null);
  const compactStatusRef = useRef<HTMLDivElement>(null);
  
  const [clickCount, setClickCount] = useState(0);
  const [lineCoords, setLineCoords] = useState<LineCoord[]>([]);
  const scrollX = useRef(0);
  const { toast } = useToast();

  const isExpanded = !!category;
  const isVerticalFormat = category === 'shorts' || category === 'talking';

  const updateLines = useCallback(() => {
    if (!connectorsRef.current || !containerRef.current) return;

    const svgRect = connectorsRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const cards = document.querySelectorAll('.category-card');

    if (cards.length === 0) return;

    const startX = (containerRect.left + containerRect.width / 2) - svgRect.left;
    const startY = 0; 

    const coords = Array.from(cards).map(card => {
      const cardRect = card.getBoundingClientRect();
      const label = card.querySelector('span')?.textContent?.toLowerCase().trim() || '';
      return {
        id: label,
        x1: startX,
        y1: startY,
        x2: (cardRect.left + cardRect.width / 2) - svgRect.left,
        y2: cardRect.bottom - svgRect.top
      };
    });

    setLineCoords(coords);
  }, []);

  useEffect(() => {
    let rafId: number;
    let attempts = 0;

    const tryUpdate = () => {
      const cards = document.querySelectorAll('.category-card');
      if (cards.length > 0) {
        updateLines();
      } else if (attempts < 30) {
        attempts++;
        rafId = requestAnimationFrame(tryUpdate);
      }
    };

    tryUpdate();
    window.addEventListener('resize', updateLines);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateLines);
    };
  }, [updateLines]);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !trackRef.current) return;

    if (isExpanded) {
      const initialOffset = window.innerWidth / 3;
      scrollX.current = 0;
      
      gsap.set(trackRef.current, { x: initialOffset });

      gsap.to(containerRef.current, {
        height: '80vh',
        opacity: 1,
        duration: 1,
        ease: 'power3.inOut',
        overwrite: 'auto'
      });
      
      gsap.fromTo(contentRef.current, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: 'power2.out' }
      );
    } else {
      gsap.to(containerRef.current, {
        height: '100px',
        duration: 0.8,
        ease: 'power3.inOut',
        overwrite: 'auto'
      });
    }
  }, [isExpanded, category]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!isExpanded || !trackRef.current) return;
    const track = trackRef.current;
    
    if (track.scrollWidth === 0) return;

    const initialOffset = window.innerWidth / 3;
    const calculatedMax = track.scrollWidth + initialOffset - window.innerWidth;
    const maxScroll = Math.max(0, calculatedMax);

    scrollX.current = Math.min(Math.max(scrollX.current + e.deltaY + e.deltaX, 0), maxScroll);

    gsap.to(track, {
      x: initialOffset - scrollX.current,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }, [isExpanded, category]);

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

  return (
    <div className="relative">
      <svg 
        ref={connectorsRef}
        className="absolute top-0 left-0 w-full pointer-events-none overflow-visible z-[95]"
        style={{ height: '1px' }} 
        aria-hidden="true"
      >
        <defs>
          <filter id="glow-line">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {lineCoords.map((line, i) => {
          const isActive = category === line.id;
          return (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="hsl(var(--primary))"
              strokeWidth={isActive ? "2" : "1"}
              strokeDasharray={isActive ? "6 10" : "4 4"}
              className={cn(
                "transition-all duration-500",
                isActive ? "opacity-100" : "opacity-40"
              )}
              style={{ 
                filter: isActive ? 'url(#glow-line)' : 'none',
                animation: isActive ? 'energy-flow 1s linear infinite' : 'dash-pulse 20s linear infinite'
              }}
            />
          );
        })}
      </svg>

      <div 
        ref={containerRef}
        className={cn(
          "relative w-full bg-background border-t border-b border-foreground/5 overflow-hidden transition-colors duration-700",
          isExpanded ? "z-[95]" : "z-10"
        )}
        style={{ height: '100px' }}
      >
        <div className="absolute top-6 left-6 md:left-12 flex flex-col gap-6 z-20 pointer-events-none">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary font-bold">Active Layer</span>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-2xl md:text-3xl italic font-bold text-foreground lowercase leading-none">
                {category || 'none'}
              </h2>
              {category && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]" />}
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Session Status</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className={cn(
                    "w-1.5 h-1.5 rounded-full border border-primary/30 transition-colors",
                    i < clickCount ? "bg-primary border-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" : ""
                  )} />
                ))}
              </div>
              <span className="font-mono text-[9px] uppercase tracking-tighter text-foreground ml-1">Credits: {3 - clickCount}/3</span>
            </div>
          </div>
        </div>

        {!isExpanded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            <div ref={compactStatusRef} className="flex flex-col items-center gap-1 mb-1">
              <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-primary/60 font-bold">System Online</span>
            </div>
            
            <div ref={pickStyleTextRef} className="flex flex-col items-center gap-2 animate-pulse">
              <h3 className="font-serif italic text-xl md:text-2xl text-foreground flex items-center gap-3">
                PICK YOUR STYLE <Sparkles className="h-4 w-4 text-primary" />
              </h3>
            </div>
          </div>
        )}

        <div 
          ref={contentRef}
          className={cn(
            "w-full h-full flex flex-col",
            isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex items-center justify-end py-10 px-12 border-b border-foreground/5 shrink-0">
            <button 
              onClick={onClose}
              className="font-mono text-[10px] uppercase tracking-widest hover:text-primary gap-2 flex items-center transition-all group px-8 py-4 border border-foreground/10 rounded-full pointer-events-auto hover:bg-primary/5 hover:border-primary/20 hover:shadow-[0_0_15px_rgba(var(--primary),0.2)]"
            >
              Collapse Section <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
            </button>
          </div>

          <div 
            onWheel={handleWheel}
            className="flex-1 relative flex items-center overflow-hidden cursor-grab active:cursor-grabbing pointer-events-auto pb-12"
          >
            <div 
              ref={trackRef}
              className={cn(
                "flex items-center pr-[10vw] will-change-transform",
                isVerticalFormat ? "gap-20" : "gap-16"
              )}
            >
              {VIDEOS_DATA.map((item, index) => (
                <div key={item.id} className="flex flex-col gap-6 shrink-0 group">
                  <div 
                    onClick={handleInteraction}
                    className={cn(
                      "relative bg-muted overflow-hidden transition-all duration-700",
                      isVerticalFormat 
                        ? "h-[45vh] aspect-[9/16] w-auto" 
                        : "w-[300px] md:w-[400px] h-[50vh]",
                      "[clip-path:polygon(0%_10%,10%_0%,100%_0%,100%_90%,90%_100%,0%_100%)]",
                      clickCount >= 3 ? "grayscale opacity-50 cursor-not-allowed" : "cursor-pointer"
                    )}
                  >
                    <EditableVideo 
                      src={item.videoUrl} 
                      storageKey={`v2-feed-${item.id}`}
                      fill
                      className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s]"
                      autoPlay
                      muted
                      loop
                      playsInline
                      hideControls
                    />
                    
                    {clickCount >= 3 && (
                      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-2">
                          <Lock className="w-8 h-8 text-white opacity-40" />
                          <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">Access Denied</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between px-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground font-bold">VÍDEO 0{index + 1} — {item.title}</span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/60">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-6 pl-24 pr-12 border-t border-foreground/5 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/40">
            <div className="flex gap-8">
              <span className="flex items-center gap-2">
                Status: <span className="animate-pulse text-foreground/60">Rendering</span>
              </span>
              <span>Bitrate: High</span>
              <span>Codec: H.264 / AV1</span>
            </div>
            <div>© Verona Studio • Visual Engine v2.5</div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes dash-pulse {
          to { stroke-dashoffset: -100; }
        }
        @keyframes energy-flow {
          from { stroke-dashoffset: 20; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
