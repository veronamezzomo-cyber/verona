'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { EditableImage } from '@/components/editable-image';
import { CategoryFeed } from '@/components/category-feed';
import { CyberText } from '@/components/cyber-text';
import { DigitalClock } from '@/components/digital-clock';
import { LEDTicker } from '@/components/led-ticker';
import { FloatingVideoCluster } from '@/components/floating-video-cluster';
import { MagneticCTA } from '@/components/magnetic-cta';
import { SocialIcons } from '@/components/social-icons';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  ArrowRight,
  Terminal as TerminalIcon,
  Quote,
  X,
  Minus
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

const ALL_TECH = [
  { id: 'pr', name: 'Premiere Pro', label: 'Pr', bg: '#00005B', text: '#9999FF' },
  { id: 'ae', name: 'After Effects', label: 'Ae', bg: '#2C005E', text: '#D191FF' },
  { id: 'ps', name: 'Photoshop', label: 'Ps', bg: '#001E36', text: '#31A8FF' },
  { id: 'ai', name: 'Illustrator', label: 'Ai', bg: '#330000', text: '#FF9A00' }
];

function Counter({ value, duration = 2 }: { value: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useGSAP(() => {
    gsap.to({ val: 0 }, {
      val: value,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 95%",
      },
      onUpdate: function(this: any) {
        setCount(Math.floor(this.targets()[0].val));
      }
    });
  }, { dependencies: [value] });

  return <span ref={ref}>{count}</span>;
}

const FAQ_DATA = [
  { q: "What is your average turnaround time?", a: "For short-form content (Reels/Shorts), expect a 24-48h turnaround. Long-form projects usually take 4-7 business days depending on complexity." },
  { q: "How many revisions are included?", a: "Every project includes two major revision rounds. Minor tweaks are unlimited until the final delivery feels perfect." },
  { q: "Which tech stack do you use?", a: "Premiere Pro & After Effects are my core tools, that's where 90% of the work happens. I also have experience with DaVinci Resolve and CapCut, but I stick to my core workflow for consistency and speed. For sound, I run on an Epidemic Sound subscription, so every project gets copyright-free music and SFX." },
  { q: "Do you offer professional color grading?", a: "Yes, every project goes through a color grading pass to match the tone and mood you're going for, cinematic, warm, moody, whatever fits the story best." },
  { q: "Do you accept international payments?", a: "Yes, I work with clients worldwide. Payments are handled through Wise for international transfers, keeping fees low and everything transparent on both ends." }
];

const BOOT_LINES = [
  "[BOOT]: INITIALIZING VERONA_ENGINE...",
  "[INFO]: LOADING_CORE_MODULES [OK]",
  "[INFO]: SYNCING_ARCHIVE_DATA [OK]",
  "[INFO]: ESTABLISHING_SECURE_CONN [OK]"
];

function TypewriterText({ text, onComplete, speed = 15, showCursor = true }: { text: string, onComplete?: () => void, speed?: number, showCursor?: boolean }) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    let timeoutId: NodeJS.Timeout;
    let currentText = '';

    const type = () => {
      if (i < text.length) {
        const char = text[i];
        currentText += char;
        
        let delay = speed;
        if (char === '.' && i < text.length - 1) {
          delay = 500;
          currentText += '\n';
          if (text[i + 1] === ' ') {
            i++;
          }
        }
        
        setDisplayedText(currentText);
        i++;
        timeoutId = setTimeout(type, delay);
      } else {
        if (onComplete) onComplete();
      }
    };

    setDisplayedText('');
    type();
    
    return () => timeoutId && clearTimeout(timeoutId);
  }, [text, speed, onComplete]);

  return (
    <span className="whitespace-pre-wrap">
      {displayedText}
      {showCursor && <span className="w-2 h-4 bg-white inline-block ml-0.5 align-middle animate-cursor-blink" />}
    </span>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>('all');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [year, setYear] = useState<number>(2024);
  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  
  const [faqHistory, setFaqHistory] = useState<{q: string, a: string}[]>([]);
  const [faqAvailableIndices, setFaqAvailableIndices] = useState<number[]>(FAQ_DATA.map((_, i) => i));
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const [isTerminalFocused, setIsTerminalFocused] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const [canStartBoot, setCanStartBoot] = useState(false);
  const [isTerminalClosed, setIsTerminalClosed] = useState(false);
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const [faqPos, setFaqPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const terminalRef = useRef<HTMLDivElement>(null);

  const [poweredIcons, setPoweredIcons] = useState(ALL_TECH);
  const [winnerName, setWinnerName] = useState<string | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const techIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
    const timer = setTimeout(() => setCanStartBoot(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setHasInteracted(true);
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: "#works-section", offsetY: 80 },
      ease: "power3.inOut"
    });
  };

  const handleCloseFeed = () => {
    setActiveCategory(null);
  };

  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);
    setWinnerName(null);
    setWinnerIndex(null);

    const winner = ALL_TECH[Math.floor(Math.random() * ALL_TECH.length)];
    const sequenceSize = 60;
    const sequence = Array.from({ length: sequenceSize }, () => ALL_TECH[Math.floor(Math.random() * ALL_TECH.length)]);
    
    const wIdx = sequenceSize - 5;
    sequence[wIdx] = winner;
    
    setPoweredIcons(sequence);
    setWinnerIndex(wIdx);
    
    const iconStep = 88; 
    const containerWidth = 320;
    const targetX = (containerWidth / 2) - (wIdx * iconStep + 32);

    if (techIconsRef.current) {
      gsap.fromTo(techIconsRef.current, 
        { x: 0 },
        {
          x: targetX,
          duration: 5,
          ease: "power4.out",
          onComplete: () => {
            setWinnerName(winner.name);
            setIsRolling(false);
          }
        }
      );
    }
  };

  const handleTerminalAction = (index: number) => {
    const qIdx = faqAvailableIndices[index];
    setFaqHistory(prev => [...prev, FAQ_DATA[qIdx]]);
    setFaqAvailableIndices(prev => prev.filter((_, i) => i !== index));
    setActiveFaqIndex(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTerminalMinimized) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - faqPos.x,
      y: e.clientY - faqPos.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setFaqPos({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, faqPos]);

  useEffect(() => {
    const handleScrollIntent = (e: WheelEvent) => {
      const scrollPos = window.innerHeight + window.scrollY;
      const bottomLimit = document.documentElement.scrollHeight - 30;
      const isAtBottom = scrollPos >= bottomLimit;
      if (isAtBottom && e.deltaY > 0) {
        setIsSecretVisible(true);
      } else if (e.deltaY < 0) {
        setIsSecretVisible(false);
      }
    };
    window.addEventListener('wheel', handleScrollIntent, { passive: true });
    return () => window.removeEventListener('wheel', handleScrollIntent);
  }, []);

  useGSAP(() => {
    gsap.to(".hero-line", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out"
    });
    gsap.to(".hud-reveal", { opacity: 1, duration: 1, delay: 1 });
    gsap.to(".scroll-indicator-ref", { opacity: 1, duration: 1, delay: 1.8 });

    const sections = gsap.utils.toArray<HTMLElement>('.stack-section');
    sections.forEach((section, i) => {
      const isLast = i === sections.length - 1;
      
      if (!isLast) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(section, {
              scale: 1 - progress * 0.05,
              filter: `brightness(${1 - progress * 0.4})`,
            });
          }
        });
      }
    });

    gsap.to(".testimonial-word", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".testimonial-trigger-ref",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isReduced) {
      const skewTargets = ".skew-text-ref";
      const updateSkew = () => {
        const velocity = ScrollTrigger.create({ trigger: "body" }).getVelocity() / 3000;
        const clampedSkew = Math.max(-0.5, Math.min(0.5, velocity));
        gsap.to(skewTargets, {
          skewY: clampedSkew,
          duration: 0.4,
          overwrite: "auto",
          ease: "power3.out"
        });
      };
      ScrollTrigger.addEventListener("refresh", updateSkew);
      gsap.ticker.add(updateSkew);
      return () => {
        ScrollTrigger.removeEventListener("refresh", updateSkew);
        gsap.ticker.remove(updateSkew);
      };
    }
  }, { scope: mainRef });

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'shorts', label: 'Shorts' },
    { id: 'long', label: 'Long-Form' },
    { id: 'motion', label: 'Motion' },
    { id: 'talking', label: 'Talking Heads' },
    { id: 'vlogs', label: 'Vlogs' }
  ];

  const catImages = [
    { id: 'all', imageUrl: 'https://i.imgur.com/lj2mU6F.png' },
    { id: 'shorts', imageUrl: 'https://i.imgur.com/ehRTGR0.png' },
    { id: 'long', imageUrl: 'https://i.imgur.com/jAja7gP.png' },
    { id: 'motion', imageUrl: 'https://i.imgur.com/leLxq09.png' },
    { id: 'talking', imageUrl: 'https://i.imgur.com/2u5rbjn.png' },
    { id: 'vlogs', imageUrl: 'https://i.imgur.com/85wpzam.png' }
  ];

  const clusterVideos = [
    { id: 'grok', videoUrl: 'https://i.imgur.com/SRki5JL.mp4', startTime: 0 },
    { id: 'intro', videoUrl: 'https://i.imgur.com/ND3kmsW.mp4', startTime: 0 },
    { id: 'cook', videoUrl: 'https://i.imgur.com/cyxF01x.mp4', startTime: 0 },
    { id: 'speed', videoUrl: 'https://i.imgur.com/aYp6QMo.mp4', startTime: 0 },
    { id: 'pensen', videoUrl: 'https://i.imgur.com/2ss69QQ.mp4', startTime: 0 }
  ];

  return (
    <div className="min-h-screen text-foreground transition-colors duration-500 bg-background relative overflow-x-clip">
      <header className="fixed top-0 w-full z-[100] border-b border-foreground/5 bg-background/80 backdrop-blur-md h-20">
        <div className="w-full px-6 md:px-12 h-full flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-lg font-bold tracking-tighter font-serif italic text-foreground">
              LV<span className="text-primary">.</span>
            </Link>
            <div className="hidden lg:flex items-center gap-3 text-muted-foreground hud-reveal opacity-0">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <CyberText 
                text="SYS_ONLINE // SOUTH BRAZIL" 
                variant="decrypt" 
                delay={800} 
                corrupt 
                className="tracking-[0.2em] font-mono text-[7.5px] uppercase" 
              />
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 font-mono text-[8px] uppercase tracking-widest">
            <Link href="#works-section" className="text-foreground/70 hover:text-foreground">Works</Link>
            <Link href="#contact-section" className="text-foreground/70 hover:text-foreground">Contact</Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main ref={mainRef} className="relative">
        <section className="stack-section sticky top-0 z-[10] h-screen w-full flex items-center justify-center bg-background overflow-hidden will-change-transform">
          <div className="w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="flex items-center gap-4 mb-6">
                <div className="hud-reveal flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full opacity-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <CyberText 
                    text="[ 00 / EDITOR ]" 
                    variant="decrypt" 
                    delay={600} 
                    corrupt 
                    className="font-mono text-[8px] uppercase tracking-[0.3em] text-primary font-bold" 
                  />
                </div>
              </div>

              <h1 className="font-serif font-bold text-[clamp(2rem,5.6vw,5.2rem)] leading-[0.9] tracking-tighter text-foreground mb-8">
                <div className="overflow-hidden">
                  <div className="hero-line translate-y-full opacity-0">CRAFTING</div>
                </div>
                <div className="overflow-hidden">
                  <div className="hero-line translate-y-full opacity-0">VISUAL</div>
                </div>
                <div className="overflow-hidden">
                  <div className="hero-line translate-y-full opacity-0">
                    STORYTELLING<span className="text-primary">.</span>
                  </div>
                </div>
              </h1>

              <div className="max-w-md">
                <Link href="#works-section" className="hud-reveal mt-6 flex items-center gap-6 opacity-0">
                  <Button variant="link" className="p-0 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground hover:text-primary group">
                    View Archive <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center lg:justify-end animate-image-reveal overflow-visible">
              <FloatingVideoCluster videos={clusterVideos} />
            </div>
          </div>
          
          <div className="scroll-indicator-ref absolute bottom-10 left-10 sm:left-1/2 sm:-translate-x-1/2 flex flex-col items-center gap-4 opacity-0 pointer-events-none z-10">
            <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-foreground/40">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent shadow-[0_0_8px_rgba(var(--primary),0.3)]" />
          </div>
        </section>

        <section id="works-section" className="stack-section sticky top-0 z-[20] min-h-screen w-full bg-background border-t border-foreground/5 will-change-transform shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <div className="sticky top-20 w-full py-[10px] bg-background border-b border-foreground/5 shadow-sm z-[90]">
            <div className="w-full px-6 md:px-12 flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
              {categories.map((cat) => {
                const img = catImages.find(i => i.id === cat.id);
                return (
                  <button 
                    key={cat.id} 
                    onClick={() => handleCategoryClick(cat.id)}
                    className={cn(
                      "category-card group relative overflow-hidden cursor-pointer w-full md:flex-1 h-20 max-w-full md:max-w-[220px]",
                      hasInteracted && activeCategory === cat.id && "ring-2 ring-primary"
                    )}
                  >
                    {img && (
                      <EditableImage 
                        src={img.imageUrl} 
                        alt={cat.label} 
                        storageKey={`cat-${cat.id}`}
                        fill
                        className={cn("object-cover", hasInteracted && activeCategory === cat.id && "scale-110")}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20" />
                    <span className="absolute inset-0 flex items-center justify-center text-white font-serif font-bold text-[10px] uppercase tracking-widest z-20 hover-glitch" data-text={cat.label}>
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <CategoryFeed category={activeCategory} onClose={handleCloseFeed} />
        </section>

        <section id="archive-section" className="stack-section sticky top-0 z-[30] h-screen w-full bg-background border-t border-foreground/5 will-change-transform shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="w-full h-full pt-20 px-6 md:px-12 lg:px-24 flex flex-col items-center pb-8">
            <div className="flex flex-col items-center gap-4 mb-6 shrink-0 w-full animate-in fade-in slide-in-from-top-4 duration-1000">
              <div className="flex flex-wrap justify-center gap-12 md:gap-32 items-center">
                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-primary/60 mb-1">Years</span>
                  <span className="text-4xl font-bold font-mono tracking-tighter opacity-90">+<Counter value={6} /></span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-primary/60 mb-1">Clients</span>
                  <span className="text-4xl font-bold font-mono tracking-tighter opacity-90">+<Counter value={12} /></span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-mono uppercase tracking-[0.4em] text-primary/60 mb-1">Projects</span>
                  <span className="text-4xl font-bold font-mono tracking-tighter opacity-90">+<Counter value={80} /></span>
                </div>
              </div>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-start flex-1">
              <div className="lg:col-span-7 flex flex-col justify-center h-full">
                <div className="relative testimonial-trigger-ref max-w-4xl">
                  <Quote className="absolute -top-10 -left-6 w-16 h-12 text-foreground/5 pointer-events-none -z-10" />
                  <div className="text-3xl md:text-5xl font-serif italic leading-[1.1] text-foreground mb-6 skew-text-ref">
                    <div className="flex flex-wrap items-baseline">
                      {"Leonardo's edits kept people watching longer.".split(' ').map((word, i) => (
                        <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
                          <span className="testimonial-word inline-block translate-y-full opacity-0">
                            {word.match(/edits|people|watching|longer/) ? <span className="text-primary">{word}</span> : word}
                          </span>
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-baseline mt-2">
                      {"Our retention improved right after he took over.".split(' ').map((word, i) => (
                        <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
                          <span className="testimonial-word inline-block translate-y-full opacity-0">
                            {word.match(/retention|improved/) ? <span className="text-primary">{word}</span> : word}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-px bg-primary" />
                    <div className="flex flex-col">
                      <CyberText text="JAMES HUANG" variant="decrypt" delay={800} className="font-mono text-[11px] uppercase tracking-widest font-bold" />
                      <CyberText text="CREATIVE DIRECTOR @ VOID STUDIO" variant="decrypt" delay={1000} className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground/60" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4 h-full items-center">
                <div className="flex flex-col gap-4 items-center text-center w-full max-w-[350px]">
                  <div className="flex flex-col gap-1 items-center">
                    <CyberText text={winnerName ? `[ ENGINE: ${winnerName.toUpperCase()} ]` : "[ POWERED_BY ]"} variant="decrypt" delay={500} corrupt={!isRolling} className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-bold" />
                    <div className="w-10 h-px bg-primary" />
                  </div>
                  
                  <div className="relative w-full h-24 overflow-hidden bg-foreground/[0.03] border border-foreground/10 flex items-center justify-center rounded-sm">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-primary/60 z-20" />
                    <div ref={techIconsRef} className="flex gap-6 absolute left-0 items-center will-change-transform">
                      {poweredIcons.map((tech, i) => (
                        <div 
                          key={`${tech.id}-${i}`} 
                          className={cn(
                            "group w-16 h-16 flex items-center justify-center rounded-sm shadow-xl transition-all duration-700 shrink-0", 
                            !isRolling && winnerName 
                              ? (tech.name === winnerName && i === winnerIndex 
                                  ? "scale-110 z-30 ring-1 ring-primary bg-opacity-100" 
                                  : "opacity-5 grayscale scale-75") 
                              : "opacity-100 scale-100"
                          )} 
                          style={{ backgroundColor: tech.bg }}
                        >
                          <span className="font-sans font-bold text-lg flex items-center gap-2 px-2" style={{ color: tech.text }}>
                            {tech.label}
                            <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-500 whitespace-nowrap opacity-0 group-hover:opacity-100 text-[10px] uppercase tracking-tighter">
                              {tech.name}
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <button className={cn("sparkle-button scale-90 group", isRolling && "opacity-50 pointer-events-none")} onClick={handleRoll} disabled={isRolling}>
                      <span className="text-[11px]">{isRolling ? "Syncing..." : "roll"}</span>
                      <svg className={cn("star-1 transition-opacity duration-300 opacity-0", !isRolling && "group-hover:opacity-100")} viewBox="0 0 24 24" fill="none"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/></svg>
                      <svg className={cn("star-2 transition-opacity duration-300 opacity-0", !isRolling && "group-hover:opacity-100")} viewBox="0 0 24 24" fill="none"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/></svg>
                    </button>
                  </div>
                </div>

                {!isTerminalClosed && (
                  <div className={cn("w-full transition-all duration-500", isTerminalMinimized ? "h-10 opacity-60" : "opacity-100")}>
                    <div ref={terminalRef} className={cn("bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden shadow-2xl w-full h-[220px] flex flex-col", isDragging && "transition-none")} style={{ transform: `translate(${faqPos.x}px, ${faqPos.y}px)` }}>
                      <div onMouseDown={handleMouseDown} className="bg-[#1a1a1a] h-8 px-4 flex items-center justify-between border-b border-white/10 cursor-move select-none shrink-0">
                        <div className="flex items-center gap-2">
                          <TerminalIcon className="w-3 h-3 text-white/60" />
                          <span className="font-mono text-[10px] text-white/80">archive_console.exe</span>
                        </div>
                        <div className="flex h-full">
                          <button onClick={(e) => { e.stopPropagation(); setIsTerminalMinimized(!isTerminalMinimized); }} className="w-8 h-8 flex items-center justify-center hover:bg-white/10"><Minus className="w-3 h-3 text-white" /></button>
                          <button onClick={(e) => { e.stopPropagation(); setIsTerminalClosed(true); }} className="w-8 h-8 flex items-center justify-center hover:bg-[#e81123]"><X className="w-3 h-3 text-white" /></button>
                        </div>
                      </div>
                      {!isTerminalMinimized && (
                        <div tabIndex={0} onFocus={() => setIsTerminalFocused(true)} onBlur={() => setIsTerminalFocused(false)} className="p-4 font-mono text-[11px] relative outline-none bg-black text-white overflow-y-auto flex-1 cyber-scrollbar">
                          {isBooting ? (
                            <div className="space-y-1">
                              {BOOT_LINES.slice(0, bootStep).map((line, idx) => (<div key={idx} className="opacity-80">{line}</div>))}
                              {canStartBoot && bootStep < BOOT_LINES.length && (<TypewriterText text={BOOT_LINES[bootStep]} speed={10} onComplete={() => setTimeout(() => { if (bootStep === BOOT_LINES.length - 1) setIsBooting(false); else setBootStep(s => s + 1); }, 100)} />)}
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {faqHistory.map((item, i) => (
                                <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-500">
                                  <div className="text-white/40 mb-1 flex items-center gap-2"><span className="text-white/80">C:\VERONA\ARCHIVE&gt;</span> {item.q}</div>
                                  <div className="text-white leading-relaxed pl-4 border-l border-white/20 font-light"><TypewriterText text={item.a} speed={10} /></div>
                                </div>
                              ))}
                              <div className="mt-0 pt-0">
                                <div className="text-[9px] uppercase tracking-widest text-white/20 mb-3 font-bold">Select Inquiry:</div>
                                <div className="space-y-1.5">
                                  {faqAvailableIndices.map((qIdx, i) => (
                                    <div key={qIdx} className={cn("transition-all flex items-start gap-2 py-0.5 cursor-pointer group", activeFaqIndex === i ? "text-white" : "text-white/30 hover:text-white/60")} onClick={() => handleTerminalAction(i)}>
                                      <span className="text-primary group-hover:translate-x-1 transition-transform">{'>'}</span>
                                      <span className="uppercase text-[11px] tracking-wider">{FAQ_DATA[qIdx].q}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-1 opacity-40 mt-auto shrink-0">
              <CyberText text="[ ARCHIVE_STATS ]" variant="decrypt" delay={500} className="font-mono text-[9px] uppercase tracking-widest text-primary font-bold" />
              <div className="text-[8px] font-mono text-muted-foreground uppercase tracking-[0.2em]">VERONA_V3 // VIEWPORT_MODE</div>
            </div>
          </div>
        </section>

        <section id="contact-section" className="stack-section sticky top-0 z-[40] min-h-screen flex flex-col justify-end border-t border-foreground/5 bg-background shadow-[0_-20px_50px_rgba(0,0,0,0.5)] will-change-transform pb-0">
          <div className="flex-1 flex flex-col justify-end items-center text-center px-6 pt-20 pb-20">
            <h2 className="text-6xl md:text-8xl font-serif italic font-bold mb-12 skew-text-ref">Ready to tell<br />your story?</h2>
            <Link href="mailto:00mezzomo@gmail.com">
              <MagneticCTA>
                <Button size="lg" className="rounded-none px-16 h-20 text-xl font-bold bg-primary text-primary-foreground hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-shadow">
                  Let's Talk
                </Button>
              </MagneticCTA>
            </Link>
          </div>
          
          <div className="relative overflow-hidden shrink-0 w-full">
             <div className={cn("overflow-hidden transition-all duration-700 ease-in-out bg-background flex flex-col items-center justify-center", isSecretVisible ? "h-[140px] opacity-100" : "h-0 opacity-0")}>
                <LEDTicker text="VERONA STUDIO" />
              </div>
              <footer className="py-12 w-full px-6 md:px-12 bg-background/95 border-t border-foreground/5">
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
                  <SocialIcons />
                  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    <DigitalClock />
                    <CyberText text={`© ${year} LEONARDO VERONA.`} variant="decrypt" delay={500} corrupt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground" />
                  </div>
                </div>
              </footer>
          </div>
        </section>
      </main>

      <style jsx global>{`
        .cyber-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .cyber-scrollbar::-webkit-scrollbar-track {
          background: rgba(220, 38, 38, 0.05);
        }
        .cyber-scrollbar::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 10px;
          box-shadow: 0 0 10px #dc2626;
        }
      `}</style>
    </div>
  );
}
