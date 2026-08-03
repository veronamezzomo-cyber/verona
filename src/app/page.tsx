
'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import { 
  Mail, 
  ArrowRight
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

// LED Bitmap Library for 5x7 Grid
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
  const characters = text.toUpperCase().split('');
  
  return (
    <div className="w-full bg-background py-12 overflow-hidden flex items-center border-t border-foreground/5 shadow-2xl" suppressHydrationWarning>
      <div className="animate-marquee whitespace-nowrap flex" suppressHydrationWarning>
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex gap-16 md:gap-24 px-8 md:px-12 items-center" suppressHydrationWarning>
            {characters.map((char, charIndex) => (
              <div key={`${setIndex}-${charIndex}`} className="grid grid-cols-5 gap-[2px] md:gap-[4px] shrink-0" suppressHydrationWarning>
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
                      suppressHydrationWarning
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

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" suppressHydrationWarning>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0-5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" suppressHydrationWarning>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

function FloatingVideoCluster({ videos }: { videos: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const timeRef = useRef(0);
  const currentSpeedRef = useRef(0.2);
  
  const focalFactorsRef = useRef(videos.map((_, i) => (i === 0 ? 1 : 0)));
  const morphFactorRef = useRef({ value: 1 });
  const activeIndexRef = useRef(0);
  
  const orbitParams = useMemo(() => videos.map((_, i) => ({
    rx: 240 + Math.sin(i * 1.5) * 60,
    ry: 180 + Math.cos(i * 2.2) * 40,
    offset: (i * (Math.PI * 2)) / videos.length
  })), [videos]);

  useEffect(() => {
    gsap.delayedCall(0.5, () => {
      gsap.to(morphFactorRef.current, {
        value: 0,
        duration: 1.5,
        ease: 'power2.out'
      });
    });

    const focusInterval = setInterval(() => {
      const prev = activeIndexRef.current;
      const next = (prev + 1) % videos.length;
      activeIndexRef.current = next;

      gsap.to(focalFactorsRef.current, {
        [prev]: 0,
        duration: 1.2,
        ease: 'sine.inOut'
      });
      gsap.to(focalFactorsRef.current, {
        [next]: 1,
        duration: 1.2,
        ease: 'sine.inOut'
      });
    }, 7000);

    let requestRef: number;
    const animate = () => {
      timeRef.current += 0.01 * currentSpeedRef.current;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;

        const p = orbitParams[i];
        const ff = focalFactorsRef.current[i];
        const morph = morphFactorRef.current.value;
        
        const angle = timeRef.current + p.offset;
        const ox = Math.cos(angle) * p.rx;
        const oy = Math.sin(angle) * p.ry;
        const depth = Math.sin(angle);

        let tx = ox * (1 - ff);
        let ty = oy * (1 - ff);

        const sx = i * -15;
        const sy = i * -15;
        tx = tx * (1 - morph) + sx * morph;
        ty = ty * (1 - morph) + sy * morph;

        const baseScale = 0.9 + (1 + depth) * 0.05;
        const focalScale = 1.4;
        const targetScale = baseScale + (focalScale - baseScale) * ff;
        const scale = targetScale * (1 - morph) + 1.0 * morph;
        
        const zIndex = morph > 0.5 
          ? (100 - i)
          : (ff > 0.5 ? 120 : Math.floor(50 + depth * 40));
        
        const blur = (1 - ff) * (depth < 0 ? Math.abs(depth) * 4 : 0);

        el.style.transform = `translate3d(calc(-50% + ${tx}px), calc(-50% + ${ty}px), 0) scale(${scale})`;
        el.style.zIndex = zIndex.toString();
        el.style.filter = `blur(${blur}px)`;
        el.style.opacity = '1';
      });

      requestRef = requestAnimationFrame(animate);
    };

    requestRef = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestRef);
      clearInterval(focusInterval);
    };
  }, [videos, orbitParams]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[650px] flex items-center justify-center pointer-events-none"
      suppressHydrationWarning
    >
      <div className="absolute inset-0 pointer-events-auto" suppressHydrationWarning />
      {videos.map((vid, i) => (
        <div 
          key={vid.id}
          ref={(el) => { itemRefs.current[i] = el; }}
          className="absolute top-1/2 left-1/2 w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-foreground/10 bg-black shadow-2xl pointer-events-none"
          style={{ 
            opacity: 1,
            transform: 'translate(-50%, -50%)' 
          }}
          suppressHydrationWarning
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
              className="object-cover"
              data-ai-hint={vid.imageHint}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const experienceRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      // Traditional pinning logic for the works grid
      if (experienceRef.current) {
        const expRect = experienceRef.current.getBoundingClientRect();
        setIsPinned(expRect.top <= 80);
      }

      // Secret Reveal Logic:
      // Trigger when scrolling deep into the spacer area (natural end + 50px)
      // Hide immediately on scroll up
      const extraSpacerHeight = window.innerHeight * 0.5;
      const naturalEnd = docHeight - extraSpacerHeight;
      const isAtBottom = (currentScrollY + winHeight) > (naturalEnd + 50);
      const isScrollingUp = currentScrollY < lastScrollY;

      if (isScrollingUp) {
        setIsSecretVisible(false);
      } else if (isAtBottom) {
        setIsSecretVisible(true);
      }

      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleCategoryClick = (label: string) => {
    setActiveCategory(label);
    setTimeout(() => {
      if (experienceRef.current) {
        const target = experienceRef.current.getBoundingClientRect().top + window.scrollY;
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: target, offsetY: 80 },
          ease: 'power3.inOut'
        });
      }
    }, 50);
  };

  const handleCloseFeed = () => {
    setActiveCategory(null);
  };

  return (
    <div className="min-h-screen text-foreground transition-colors duration-500 bg-background overflow-x-hidden" suppressHydrationWarning>
      <header className="fixed top-0 w-full z-[100] border-b border-foreground/5 bg-background/80 backdrop-blur-md" suppressHydrationWarning>
        <div className="container mx-auto px-6 h-20 flex items-center justify-between" suppressHydrationWarning>
          <Link href="/" className="text-xl font-bold tracking-tighter font-serif italic text-foreground" suppressHydrationWarning>
            LV<span className="text-primary">.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-mono text-[10px] uppercase tracking-widest" suppressHydrationWarning>
            <Link href="#works" className="text-foreground/70 hover:text-foreground">Works</Link>
            <Link href="#about" className="text-foreground/70 hover:text-foreground">About</Link>
            <Link href="#contact" className="text-foreground/70 hover:text-foreground">Contact</Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="relative" suppressHydrationWarning>
        <section className="flex flex-col items-center justify-center min-h-screen pt-20 px-6 container mx-auto" suppressHydrationWarning>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full" suppressHydrationWarning>
            <div className="flex flex-col gap-6 animate-slide-up" suppressHydrationWarning>
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-bold">Video Editor • Brazil</span>
              <h1 className="font-serif font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-tight tracking-tighter text-foreground">
                CRAFTING<br />VISUAL<br />STORYTELLING<span className="text-primary">.</span>
              </h1>
              <div className="flex gap-6 mt-4" suppressHydrationWarning>
                <Button size="lg" className="rounded-none px-12 h-16 bg-foreground text-background" onClick={() => handleCategoryClick('all')}>View Projects</Button>
                <Link href="#contact" className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest">Contact Me <ArrowRight className="h-3 w-3" /></Link>
              </div>
            </div>
            <div className="relative animate-image-reveal" suppressHydrationWarning>
              <FloatingVideoCluster videos={clusterVideos} />
            </div>
          </div>
        </section>

        <div className="relative z-10 bg-background" suppressHydrationWarning>
          <div ref={experienceRef} className="relative min-h-screen flex flex-col" suppressHydrationWarning>
            <section 
              id="works" 
              className={cn(
                "z-40 transition-all duration-500 w-full",
                isPinned ? "sticky top-20 bg-background/95 backdrop-blur-xl border-y border-foreground/5" : "py-12"
              )}
              suppressHydrationWarning
            >
              <div className={cn(
                "grid transition-all duration-500 container mx-auto px-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
              )} suppressHydrationWarning>
                {categories.map((cat) => {
                  const img = catImages.find(i => i.id === cat.id);
                  const isActive = activeCategory === cat.label;
                  return (
                    <div 
                      key={cat.label} 
                      onClick={() => handleCategoryClick(cat.label)}
                      className={cn(
                        "group relative aspect-square overflow-hidden cursor-pointer transition-all duration-300",
                        isActive && "ring-2 ring-primary"
                      )}
                      suppressHydrationWarning
                    >
                      {img && (
                        <EditableImage 
                          src={img.imageUrl} 
                          alt={cat.label} 
                          storageKey={`cat-${cat.id}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" suppressHydrationWarning />
                      <span className="absolute inset-0 flex items-center justify-center text-white font-serif font-bold text-xs md:text-sm uppercase tracking-widest z-20 pointer-events-none">
                        {cat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {activeCategory && <CategoryFeed category={activeCategory} onClose={handleCloseFeed} onCategoryClick={handleCategoryClick} />}
          </div>

          {/* Contact Section - Normal Flow */}
          <section id="contact" className="relative min-h-screen flex flex-col justify-center items-center container mx-auto text-center px-6 border-t border-foreground/5" suppressHydrationWarning>
            <h2 className="text-6xl md:text-8xl font-serif italic font-bold mb-12">Ready to tell<br />your story?</h2>
            <Button size="lg" className="rounded-none px-16 h-20 text-xl font-bold bg-primary text-primary-foreground">Let&apos;s Talk</Button>
          </section>

          {/* Easter Egg Panel - Collapsible Accordion-style in Normal Flow */}
          <div 
            className={cn(
              "overflow-hidden transition-all duration-700 ease-in-out bg-background",
              isSecretVisible ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            )}
            suppressHydrationWarning
          >
            <LEDTicker text="VERONA STUDIO" />
          </div>
          
          {/* Footer - Normal Flow, last element in the content area */}
          <footer className="py-12 px-6 bg-background/95 border-t border-foreground/5" suppressHydrationWarning>
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6" suppressHydrationWarning>
              <div className="flex gap-8" suppressHydrationWarning>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><DiscordIcon className="h-5 w-5" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><WhatsAppIcon className="h-5 w-5" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Mail className="h-5 w-5" /></Link>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground" suppressHydrationWarning>© 2024 Leonardo Verona. Digital Craftsman</p>
            </div>
          </footer>
        </div>

        {/* Bottom Spacer - Allows "over-scrolling" past the footer to trigger the panel */}
        <div className="h-[50vh] bg-background" suppressHydrationWarning />
      </main>
    </div>
  );
}
