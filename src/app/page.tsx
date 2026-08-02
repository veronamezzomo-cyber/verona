
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ThemeToggle } from '@/components/theme-toggle';
import { EditableImage } from '@/components/editable-image';
import { CategoryFeed } from '@/components/category-feed';
import { cn } from '@/lib/utils';
import { 
  Mail, 
  ArrowRight
} from 'lucide-react';

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FloatingImageCluster = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [isGrouping, setIsGrouping] = useState(false);
  const clusterRef = useRef<HTMLDivElement>(null);
  
  const clusterImages = PlaceHolderImages.filter(i => i.id.startsWith('hero-cluster-'));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!clusterRef.current) return;
      const rect = clusterRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / 25,
        y: (e.clientY - rect.top - rect.height / 2) / 25,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMouseLeave = () => {
    setIsGrouping(true);
    setTimeout(() => setIsGrouping(false), 800);
  };

  const positions = [
    { top: '5%', left: '10%', zIndex: 10, scale: 1.1, anim: 'animate-float-1' },
    { top: '15%', left: '50%', zIndex: 20, scale: 1, anim: 'animate-float-2' },
    { top: '45%', left: '5%', zIndex: 30, scale: 1.2, anim: 'animate-float-3' },
    { top: '50%', left: '40%', zIndex: 25, scale: 0.9, anim: 'animate-float-1' },
    { top: '25%', left: '25%', zIndex: 15, scale: 1.15, anim: 'animate-float-2' },
  ];

  return (
    <div 
      ref={clusterRef}
      className="relative w-full h-full min-h-[500px] cursor-none"
      onMouseLeave={handleMouseLeave}
    >
      {clusterImages.map((img, idx) => {
        const pos = positions[idx % positions.length];
        const isActive = isHovered === idx;
        
        // Dynamic transform calculation
        const tx = isGrouping ? 0 : mousePos.x * (idx + 1) * 0.5;
        const ty = isGrouping ? 0 : mousePos.y * (idx + 1) * 0.5;
        const groupScale = isGrouping ? 0.8 : 1;

        return (
          <div
            key={img.id}
            onMouseEnter={() => setIsHovered(idx)}
            onMouseLeave={() => setIsHovered(null)}
            className={cn(
              "absolute transition-all duration-700 ease-out will-change-transform group",
              !isActive && !isGrouping && pos.anim,
              isGrouping && "duration-1000"
            )}
            style={{
              top: isGrouping ? '30%' : pos.top,
              left: isGrouping ? '30%' : pos.left,
              zIndex: pos.zIndex,
              width: '260px',
              height: '340px',
              transform: `translate3d(${tx}px, ${ty}px, 0) scale(${pos.scale * groupScale * (isActive ? 1.05 : 1)}) rotate(${isActive ? 0 : 0}deg)`,
              filter: isActive ? 'none' : 'grayscale(30%)',
              transitionTimingFunction: isActive ? 'cubic-bezier(0.23, 1, 0.32, 1)' : 'cubic-bezier(0.165, 0.84, 0.44, 1)'
            }}
          >
            <div className="relative w-full h-full border border-primary/20 bg-muted shadow-2xl overflow-hidden rounded-[2rem]">
              <EditableImage 
                src={img.imageUrl} 
                alt={img.description}
                storageKey={img.id}
                fill
                className={cn(
                  "object-cover duotone-primary transition-all duration-[2000ms]",
                  isActive ? "scale-105 saturate-150" : "scale-100"
                )}
                data-ai-hint={img.imageHint}
              />
              <div className="absolute inset-0 halftone-overlay pointer-events-none opacity-40" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'cat-all', label: 'all' },
    { id: 'cat-shorts', label: 'shorts' },
    { id: 'cat-podcast', label: 'podcast' },
    { id: 'cat-motion', label: 'motion' },
    { id: 'cat-talking', label: 'talking' },
    { id: 'cat-vlogs', label: 'vlogs' }
  ];
  
  const stats = [
    { value: '08+', label: 'Years of Experience' },
    { value: '150+', label: 'Clients Worldwide' },
    { value: '1.2k', label: 'Projects Delivered' },
    { value: '45M', label: 'Total Views' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        setIsScrolled(rect.top <= 80); 
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (label: string) => {
    const newValue = activeCategory === label ? null : label;

    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        setActiveCategory(newValue);
      });
    } else {
      setActiveCategory(newValue);
    }
  };

  const handleCloseFeed = () => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        setActiveCategory(null);
      });
    } else {
      setActiveCategory(null);
    }
  };

  const catImages = PlaceHolderImages.filter(i => i.id.startsWith('cat-'));

  return (
    <div className="min-h-screen text-foreground transition-colors duration-500 bg-transparent">
      {/* 1. HEADER */}
      <header className="fixed top-0 w-full z-[100] border-b border-foreground/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter font-serif italic text-foreground">
            LV<span className="text-primary">.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-mono text-[10px] uppercase tracking-widest">
            <Link href="#works" className="text-foreground/70 hover:text-foreground transition-all duration-300 border-b-2 border-transparent hover:border-primary">Works</Link>
            <Link href="#about" className="text-foreground/70 hover:text-foreground transition-all duration-300 border-b-2 border-transparent hover:border-primary">About</Link>
            <Link href="#contact" className="text-foreground/70 hover:text-foreground transition-all duration-300 border-b-2 border-transparent hover:border-primary">Contact</Link>
            <div className="flex items-center gap-4 border-l border-foreground/10 pl-8">
              <ThemeToggle />
            </div>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="font-mono text-[10px]">MENU</Button>
          </div>
        </div>
      </header>

      <main>
        {/* 2. HERO */}
        <section className="relative flex pt-28 pb-8 overflow-hidden min-h-[clamp(600px,85vh,950px)]">
          <div className="container mx-auto px-6 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 items-center h-full">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 lg:gap-5 lg:pr-12 lg:py-0 py-6 z-20">
                <div className="animate-slide-up [animation-delay:100ms]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-bold">
                    Video Editor • Brazil
                  </span>
                </div>
                
                <h1 className="font-serif font-bold text-[clamp(2rem,5.5vw,4.75rem)] leading-[0.95] tracking-tighter text-foreground animate-slide-up [animation-delay:200ms]">
                  CRAFTING<br />
                  VISUAL<br />
                  STORYTELLING<span className="text-primary">.</span>
                </h1>

                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 pt-2 animate-slide-up [animation-delay:400ms]">
                  <Button size="lg" className="rounded-none px-12 h-16 text-base font-bold bg-foreground text-background hover:opacity-90 transition-all duration-300 shadow-xl">
                    View Projects
                  </Button>
                  <Link href="#contact" className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] font-bold text-foreground hover:text-primary transition-colors">
                    Contact Me <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* CLUSTER OF FLOATING IMAGES */}
              <div className="relative h-[600px] lg:h-full animate-image-reveal z-10">
                <FloatingImageCluster />
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-reveal [animation-delay:800ms]">
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-primary font-bold">Scroll</span>
            <div className="w-[2px] h-8 bg-primary/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-primary animate-scroll-line shadow-[0_0_10px_rgba(139,30,46,0.5)]" />
            </div>
          </div>
        </section>

        {/* 2.5 STICKY CATEGORY GRID */}
        <section 
          id="works" 
          ref={gridRef}
          className="sticky top-20 z-40 bg-background/95 backdrop-blur-xl border-y border-foreground/5 shadow-2xl transition-all duration-500"
        >
          <div className="container mx-auto px-6 py-2">
            <div className={cn(
              "grid gap-[1px] relative overflow-hidden transition-all duration-500",
              isScrolled ? "grid-cols-6 h-12" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6 aspect-auto"
            )}>
              {categories.map((cat) => {
                const img = catImages.find(i => i.id === cat.id);
                const isActive = activeCategory === cat.label;
                
                return (
                  <div 
                    key={cat.id} 
                    role="button"
                    tabIndex={0}
                    onClick={() => handleCategoryClick(cat.label)}
                    className={cn(
                      "group relative overflow-hidden bg-background flex items-center justify-center transition-all duration-500 z-10 outline-none cursor-pointer",
                      isScrolled ? "h-full border-x border-foreground/5" : "aspect-square lg:aspect-[1/1.2]",
                      isActive ? "ring-2 ring-primary z-20" : "hover:bg-foreground/5"
                    )}
                  >
                    {!isScrolled && img && (
                      <EditableImage 
                        src={img.imageUrl} 
                        alt={cat.label} 
                        storageKey={`cat-${cat.id}`}
                        fill
                        className="object-cover duotone-primary opacity-90 transition-transform duration-500 group-hover:scale-110"
                        containerClassName="absolute inset-0"
                        data-ai-hint={img.imageHint}
                      />
                    )}
                    <div className={cn(
                      "absolute inset-0 transition-colors duration-200 z-10",
                      isActive ? "bg-primary/60" : (!isScrolled ? "bg-black/60 group-hover:bg-black/40" : "bg-transparent")
                    )} />
                    <span className={cn(
                      "relative z-30 font-serif font-bold text-white lowercase tracking-tighter text-center px-2 pointer-events-none transition-all duration-300",
                      isScrolled ? "text-[10px] uppercase font-mono tracking-widest text-foreground group-hover:text-primary" : "text-2xl lg:text-3xl",
                      isActive && isScrolled && "text-white"
                    )}>
                      {cat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. DYNAMIC CATEGORY FEED */}
        {activeCategory && (
          <CategoryFeed 
            category={activeCategory} 
            onClose={handleCloseFeed} 
          />
        )}

        {/* 4. STATS */}
        <section className="py-24 border-y border-foreground/5 bg-muted/20 animate-reveal">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="text-5xl md:text-7xl font-bold mb-2 font-mono tracking-tighter text-foreground">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CALL TO ACTION */}
        <section id="contact" className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 italic font-serif text-foreground">Ready to tell your story?</h2>
            <p className="text-muted-foreground mb-12 max-w-xl mx-auto font-mono text-sm uppercase tracking-widest">
              Available for freelance opportunities and long-term partnerships worldwide.
            </p>
            <Button size="lg" className="rounded-none px-12 h-16 text-lg font-bold bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300">
              Let&apos;s Talk
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        </section>
      </main>

      <footer className="py-12 border-t border-foreground/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <DiscordIcon className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <WhatsAppIcon className="h-5 w-5" />
            </Link>
            <Link href="mailto:contact@leonardoverona.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            © 2024 Leonardo Verona.
          </div>
          
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Built with <span className="text-primary italic">Next.js & Genkit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
