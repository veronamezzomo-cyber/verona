'use client';

import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ThemeToggle } from '@/components/theme-toggle';
import { EditableImage } from '@/components/editable-image';
import { EditableVideo } from '@/components/editable-video';
import { CategoryFeed } from '@/components/category-feed';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  ArrowRight
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0-5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292.074.074 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const LED_BITMAPS: Record<string, number[][]> = {
  'V': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,1,0,1,0],[0,0,1,0,0]],
  'E': [[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  'R': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,1,0],[1,0,0,0,1],[1,0,0,0,1]],
  'O': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'N': [[1,0,0,0,1],[1,1,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1]],
  'A': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'S': [[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,0]],
  'T': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  'U': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'D': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
  'I': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],
  ' ': [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
};

function LEDTicker({ text }: { text: string }) {
  const characters = (text.toUpperCase() + " ").split('');
  
  return (
    <div className="w-full bg-background py-2 overflow-hidden flex items-center border-t border-foreground/5 shadow-2xl" aria-hidden="true">
      <div className="animate-marquee whitespace-nowrap flex w-max shrink-0">
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex gap-4 md:gap-8 px-2 md:px-4 items-center shrink-0">
            {characters.map((char, charIndex) => (
              <div key={`${setIndex}-${charIndex}`} className="grid grid-cols-5 gap-[2px] md:gap-[4px] shrink-0">
                {(LED_BITMAPS[char] || LED_BITMAPS[' ']).map((row, rowIndex) => (
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={cn(
                        "w-[4px] h-[8px] md:w-[6px] md:h-[12px] rounded-full transition-all duration-300",
                        cell 
                          ? "bg-foreground shadow-[0_0_12px_rgba(var(--foreground),0.4)]" 
                          : "bg-foreground/5"
                      )}
                    />
                  ))
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingVideoCluster({ videos }: { videos: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeRef = useRef(0);
  const expansionRef = useRef(0);
  const hasStartedRef = useRef(false);
  const [containerWidth, setContainerWidth] = useState(600);
  const orbitParamsRef = useRef<any[]>([]);
  
  const focalFactorsRef = useRef<number[]>([0, 0, 0, 0, 0]);
  const currentFocusedIndexRef = useRef<number>(-1);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const orbitScale = Math.min(containerWidth / 600, 1);
  
  const orbitParams = useMemo(() => videos.map((_, i) => ({
    rx: (220 + Math.sin(i * 1.5) * 50) * orbitScale,
    ry: (160 + Math.cos(i * 2.2) * 40) * orbitScale,
    offset: (i * (Math.PI * 2)) / videos.length
  })), [videos, orbitScale]);

  useEffect(() => {
    orbitParamsRef.current = orbitParams;
  }, [orbitParams]);

  useEffect(() => {
    if (hasStartedRef.current) return;

    let requestRef: number;
    let focusInterval: NodeJS.Timeout;

    const animate = () => {
      timeRef.current += 0.006;
      const expansion = expansionRef.current;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;

        const p = orbitParamsRef.current[i];
        if (!p) return;
        
        const ff = focalFactorsRef.current[i] || 0;
        const angle = timeRef.current + p.offset;
        
        const ox = Math.cos(angle) * p.rx;
        const oy = Math.sin(angle) * p.ry;
        const cx = i * 8;
        const cy = i * -8;

        const baseX = ox * expansion + cx * (1 - expansion);
        const baseY = oy * expansion + cy * (1 - expansion);

        const tx = baseX * (1 - ff);
        const ty = baseY * (1 - ff);

        const depth = Math.sin(angle);
        const normalZ = Math.floor(50 + depth * 40);
        const zIndex = Math.floor(normalZ * (1 - ff) + 150 * ff);
        const currentScale = 0.9 + (0.5 * ff);
        const blur = (depth < 0 ? Math.abs(depth) * 4 : 0) * (1 - ff);

        el.style.transform = `translate3d(calc(-50% + ${tx}px), calc(-50% + ${ty}px), 0) scale(${currentScale})`;
        el.style.zIndex = zIndex.toString();
        el.style.filter = `blur(${blur}px)`;
        el.style.opacity = '1';
      });

      requestRef = requestAnimationFrame(animate);
    };

    const rotateFocus = () => {
      const nextIndex = (currentFocusedIndexRef.current + 1) % videos.length;
      const prevIndex = currentFocusedIndexRef.current;

      if (prevIndex !== -1) {
        gsap.to(focalFactorsRef.current, {
          [prevIndex]: 0,
          duration: 1.5,
          ease: 'power2.inOut'
        });
      }

      gsap.to(focalFactorsRef.current, {
        [nextIndex]: 1,
        duration: 1.5,
        ease: 'power2.inOut'
      });

      currentFocusedIndexRef.current = nextIndex;
    };

    const timer = setTimeout(() => {
      hasStartedRef.current = true;
      requestRef = requestAnimationFrame(animate);

      gsap.to(expansionRef, {
        current: 1,
        duration: 1.2,
        ease: 'power2.out',
        onComplete: () => {
          rotateFocus();
          focusInterval = setInterval(rotateFocus, 6000);
        }
      });
    }, 300);

    return () => {
      if (requestRef) cancelAnimationFrame(requestRef);
      if (focusInterval) clearInterval(focusInterval);
      clearTimeout(timer);
    };
  }, [videos]);

  return (
    <div ref={containerRef} className="relative w-full h-[380px] sm:h-[450px] md:h-[550px] lg:h-[650px] flex items-center justify-center pointer-events-none px-6 sm:px-10 lg:px-16">
      <div className="absolute inset-0 pointer-events-auto" />
      {videos.map((vid, i) => (
        <div 
          key={vid.id}
          ref={(el) => { itemRefs.current[i] = el; }}
          className="absolute top-1/2 left-1/2 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden border border-foreground/10 bg-black shadow-2xl pointer-events-none"
          style={{ 
            transform: `translate3d(calc(-50% + ${i * 8}px), calc(-50% + ${i * -8}px), 0) scale(0.9)`,
            zIndex: 50 + i,
            opacity: 1
          }}
        >
          {vid.imageUrl.endsWith('.mp4') ? (
            <EditableVideo 
              src={vid.imageUrl} 
              storageKey={vid.id}
              fill
              className="object-cover"
              autoPlay
              muted
              loop
              playsInline
              hideControls
            />
          ) : (
             <EditableImage 
              src={vid.imageUrl} 
              storageKey={vid.id}
              fill
              className={cn(
                "object-cover object-center transition-transform duration-500",
                "group-hover:scale-105"
              )}
              data-ai-hint={vid.imageHint}
              priority={true} 
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const [reachedBottom, setReachedBottom] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isMounted, setIsMounted] = useState(false);

  // Refs for Animations
  const heroLineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  
  const worksContainerRef = useRef<HTMLDivElement>(null);
  const worksTriggerRef = useRef<HTMLDivElement>(null);
  const aboutWrapperRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  const aboutWords = useMemo(() => 
    "Behind every great story is someone obsessed with its details.".split(" "), 
  []);

  const categories = useMemo(() => [
    { id: 'cat-all', label: 'all' },
    { id: 'cat-shorts', label: 'shorts' },
    { id: 'cat-podcast', label: 'podcast' },
    { id: 'cat-motion', label: 'motion' },
    { id: 'cat-talking', label: 'talking' },
    { id: 'cat-vlogs', label: 'vlogs' }
  ], []);

  const clusterVideos = useMemo(() => PlaceHolderImages.filter(i => i.id.startsWith('hero-cluster-')), []);
  const catImages = useMemo(() => PlaceHolderImages.filter(i => i.id.startsWith('cat-')), []);
  
  // Initialization
  useLayoutEffect(() => {
    setIsMounted(true);
  }, []);

  // GSAP Context Management
  useLayoutEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // 1. Hero Entrance
      const heroLines = heroLineRefs.current.filter((el): el is HTMLDivElement => el !== null);
      if (heroLines.length > 0) {
        gsap.timeline({ delay: 0.5 })
          .fromTo(heroLines, 
            { y: '100%' }, 
            { y: '0%', duration: 1.2, ease: 'expo.out', stagger: 0.18 }
          );
      }

      // 2. Works Section Scrub
      const cards = categoryRefs.current.filter((el): el is HTMLButtonElement => el !== null);
      if (worksContainerRef.current && worksTriggerRef.current && cards.length > 0) {
        gsap.timeline({
          scrollTrigger: {
            trigger: worksTriggerRef.current,
            start: "top bottom-=200", 
            end: "top top+=80",       
            scrub: true,
          }
        }).to(worksContainerRef.current, { paddingTop: 8, paddingBottom: 8 })
          .to(cards, { height: 64 }, 0);
      }

      // 3. About Section Animation (FAILING CONTEXT)
      const targetWords = wordRefs.current 
        ? Array.from(wordRefs.current).filter((el): el is HTMLSpanElement => el !== null)
        : null;

      if (targetWords && targetWords.length > 0 && lightRef.current && aboutWrapperRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutWrapperRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });

        tl.fromTo(targetWords, 
          { 
            x: 40, 
            opacity: 0, 
            filter: 'blur(8px)',
            textShadow: "0 0 0px hsl(var(--primary)/0)"
          },
          { 
            x: 0, 
            opacity: 1, 
            filter: 'blur(0px)',
            textShadow: "0 0 20px hsl(var(--primary)/0.5)",
            stagger: 0.1, 
            duration: 0.8, 
            ease: 'power2.out' 
          }
        );

        tl.to(lightRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: 'sine.inOut'
        }, ">-0.4");
      }
    });

    return () => ctx.revert();
  }, [isMounted, aboutWords]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const atBottom = (currentScrollY + winHeight) >= docHeight - 20;
      setReachedBottom(atBottom);
      if (!atBottom) setIsSecretVisible(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!reachedBottom) return;
      if (e.deltaY > 0) setIsSecretVisible(true);
      else if (e.deltaY < 0) setIsSecretVisible(false);
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [reachedBottom]);

  const handleCategoryClick = (label: string) => {
    setActiveCategory(label === activeCategory ? null : label);
  };

  const handleCloseFeed = () => {
    setActiveCategory(null);
  };

  return (
    <div className="min-h-screen text-foreground transition-colors duration-500 bg-background relative">
      <header className="fixed top-0 w-full z-[100] border-b border-foreground/5 bg-background/80 backdrop-blur-md h-20">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-xl font-bold tracking-tighter font-serif italic text-foreground">
              LV<span className="text-primary">.</span>
            </Link>
            <div className="hidden lg:flex items-center gap-3 text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="tracking-[0.2em] font-mono text-[10px] uppercase">CURRENT LOCATION: BRAZIL</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-mono text-[10px] uppercase tracking-widest">
            <Link href="#works" className="text-foreground/70 hover:text-foreground">Works</Link>
            <Link href="#about" className="text-foreground/70 hover:text-foreground">About</Link>
            <Link href="#contact" className="text-foreground/70 hover:text-foreground">Contact</Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="relative">
        <section className="sticky top-0 z-0 flex flex-col items-center justify-center h-screen pt-20 bg-background container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full flex-1">
            <div className="flex flex-col gap-8 pl-4">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-bold">Video Editor</span>
                <div className="w-16 h-px bg-primary/30" />
              </div>
              <h1 className="font-serif font-bold text-[clamp(2.5rem,5vw,5.5rem)] leading-tight tracking-tighter text-foreground">
                <div className="overflow-hidden"><div ref={(el) => { heroLineRefs.current[0] = el; }}>CRAFTING</div></div>
                <div className="overflow-hidden"><div ref={(el) => { heroLineRefs.current[1] = el; }}>VISUAL</div></div>
                <div className="overflow-hidden"><div ref={(el) => { heroLineRefs.current[2] = el; }}>STORYTELLING<span className="text-primary">.</span></div></div>
              </h1>
            </div>
            <div className="relative animate-image-reveal">
              <FloatingVideoCluster videos={clusterVideos} />
            </div>
          </div>
        </section>

        <div className="relative z-10 flex flex-col bg-background transition-all duration-500">
          <div ref={worksTriggerRef} id="works-trigger" className="h-0 w-full" />
          <section ref={worksContainerRef} id="works" className="w-full py-12 sticky top-20 z-[90] bg-background border-b border-t border-foreground/5 shadow-sm">
            <div className="container mx-auto px-6 flex flex-wrap justify-center gap-12">
              {categories.map((cat, index) => {
                const img = catImages.find(i => i.id === cat.id);
                return (
                  <button 
                    key={cat.label} 
                    ref={(el) => { categoryRefs.current[index] = el; }}
                    onClick={() => handleCategoryClick(cat.label)}
                    className={cn(
                      "category-card group relative overflow-hidden cursor-pointer w-full max-w-[140px] md:flex-1 h-16",
                      activeCategory === cat.label && "ring-2 ring-primary"
                    )}
                  >
                    {img && (
                      <EditableImage 
                        src={img.imageUrl} 
                        alt={cat.label} 
                        storageKey={`cat-${cat.id}`}
                        fill
                        className={cn("object-cover", activeCategory === cat.label && "scale-110")}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20" />
                    <span className="absolute inset-0 flex items-center justify-center text-white font-serif font-bold text-[10px] uppercase tracking-widest z-20">
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
          <CategoryFeed category={activeCategory} onClose={handleCloseFeed} />
        </div>

        <div ref={aboutWrapperRef} id="about-wrapper" className="relative h-[200vh] z-20">
          <section id="about" className="sticky top-0 h-screen flex flex-col items-center justify-center bg-background border-t border-foreground/5 px-6 overflow-hidden">
            <div 
              ref={lightRef}
              className="about-light absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[140%] h-[60%] bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.2)_0%,transparent_70%)] blur-[120px] opacity-0 pointer-events-none z-0" 
            />
            
            <div className="max-w-5xl text-center relative z-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-12 block">Layer 02 // Digital Craftsman</span>
              <h2 className="text-[clamp(2rem,6vw,5rem)] font-serif italic font-bold leading-[1.2] tracking-tight flex flex-wrap justify-center gap-x-[0.4em] gap-y-[0.2em]">
                {aboutWords?.map((word, i) => (
                  <span 
                    key={i} 
                    ref={(el) => { wordRefs.current[i] = el; }}
                    className="about-word opacity-0 inline-block"
                  >
                    {word}
                  </span>
                )) ?? null}
              </h2>
            </div>
          </section>
        </div>

        <section id="contact" className="sticky top-0 z-[30] min-h-screen flex flex-col border-t border-foreground/5 bg-background">
          <div className="flex-1 flex flex-col justify-center items-center text-center px-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-6">Layer 03 // Final Call</span>
            <h2 className="text-6xl md:text-8xl font-serif italic font-bold mb-12">Ready to tell<br />your story?</h2>
            <Button size="lg" className="rounded-none px-16 h-20 text-xl font-bold bg-primary text-primary-foreground">Let&apos;s Talk</Button>
          </div>
          <div className="relative overflow-hidden">
             <div className={cn(
                  "overflow-hidden transition-all duration-700 ease-in-out bg-background flex flex-col items-center justify-center",
                  isSecretVisible ? "h-[140px] opacity-100" : "h-0 opacity-0"
                )}>
                <LEDTicker text="VERONA STUDIO" />
              </div>
              <footer className="py-12 px-6 bg-background/95 border-t border-foreground/5 shrink-0">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex gap-8">
                    <Link href="#" className="text-muted-foreground hover:text-primary"><DiscordIcon className="h-5 w-5" /></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><WhatsAppIcon className="h-5 w-5" /></Link>
                    <Link href="mailto:contact@veronastudio.com" className="text-muted-foreground hover:text-primary"><Mail className="h-5 w-5" /></Link>
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">© {year} Leonardo Verona.</p>
                </div>
              </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
