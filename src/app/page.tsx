'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { EditableVideo } from '@/components/editable-video';
import { EditableImage } from '@/components/editable-image';
import { CategoryFeed } from '@/components/category-feed';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Mail, 
  ArrowRight,
  Terminal as TerminalIcon,
  Quote,
  X,
  Minus
} from 'lucide-react';
import { VIDEOS_DATA } from '@/lib/videos-data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

const GLYPHS = '0123456789ABCDEF!@#$%^&*()_+<>?:';

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
      onUpdate: function() {
        setCount(Math.floor(this.targets()[0].val));
      }
    });
  }, { dependencies: [value] });

  return <span ref={ref}>{count}</span>;
}

const CyberText = ({ 
  text, 
  variant = 'decrypt', 
  delay = 500, 
  speed = 30, 
  className,
  corrupt = false,
  trigger = true
}: { 
  text: string, 
  variant?: 'type' | 'decrypt', 
  delay?: number, 
  speed?: number, 
  className?: string,
  corrupt?: boolean,
  trigger?: boolean
}) => {
  const [display, setDisplay] = useState('');
  const [isDone, setIsDone] = useState(false);
  const reducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  useEffect(() => {
    if (!trigger) return;
    if (reducedMotion) {
      setDisplay(text);
      setIsDone(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;
    
    setDisplay('');
    setIsDone(false);
    
    timeoutId = setTimeout(() => {
      if (variant === 'type') {
        let i = 0;
        intervalId = setInterval(() => {
          if (i <= text.length) {
            setDisplay(text.slice(0, i));
            i++;
          } else {
            clearInterval(intervalId);
            setIsDone(true);
          }
        }, speed);
      } else {
        let iterations = 0;
        intervalId = setInterval(() => {
          setDisplay(
            text.split('').map((char, index) => {
              if (index < iterations) return text[index];
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }).join('')
          );
          if (iterations >= text.length) {
            clearInterval(intervalId);
            setIsDone(true);
          }
          iterations += 1/3;
        }, speed);
      }
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, variant, delay, speed, trigger, reducedMotion]);

  useEffect(() => {
    if (corrupt && isDone && !reducedMotion) {
      const triggerCorruption = () => {
        const charIndex = Math.floor(Math.random() * text.length);
        const original = text;
        const corrupted = original.split('');
        corrupted[charIndex] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        setDisplay(corrupted.join(''));
        setTimeout(() => setDisplay(original), 150);
        setTimeout(triggerCorruption, 8000 + Math.random() * 7000);
      };
      const timer = setTimeout(triggerCorruption, 8000 + Math.random() * 7000);
      return () => clearTimeout(timer);
    }
  }, [corrupt, isDone, text, reducedMotion]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
};

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.27 4.73C17.78 4.05 16.2 3.56 14.53 3.32a.066.066 0 0 0-.07.03c-.2.36-.43.83-.58 1.18-1.77-.26-3.53-.26-5.26 0-.16-.35-.4-.82-.6-1.18a.066.066 0 0 0-.07-.03c-1.67.24-3.25.73-4.74 1.41a.067.067 0 0 0-.03.03C.32 8.52-.45 12.22.25 15.86a.07.07 0 0 0 .03.05c2.1 1.54 4.12 2.48 6.1 3.09a.07.07 0 0 0 .08-.02c.47-.64.88-1.32 1.23-2.04a.07.07 0 0 0-.04-.09c-.67-.26-1.3-.57-1.9-.94a.07.07 0 0 1-.01-.12c.13-.1.26-.2.38-.3a.07.07 0 0 1 .07-.01c3.94 1.8 8.19 1.8 12.09 0a.07.07 0 0 1 .07.01c.12.1.25.2.38.3a.07.07 0 0 1-.01.12c-.6.37-1.23.68-1.9.94a.07.07 0 0 0-.04-.09c.36.72.77 1.4 1.23 2.04a.07.07 0 0 0 .08-.02c1.99-.61 4.01-1.55 6.11-3.09a.07.07 0 0 0 .03-.05c.82-4.43-.39-8.1-.25-11.13a.067.067 0 0 0-.03-.03zM8.19 13.08c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.95-2.42 2.16-2.42 1.21 0 2.18 1.09 2.16 2.42 0 1.34-.95 2.42-2.16 2.42zm7.65 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.95-2.42 2.16-2.42 1.21 0 2.18 1.09 2.16 2.42 0 1.34-.95 2.42-2.16 2.42z"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
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

function DigitalClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      setTime(new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
      }).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col items-center md:items-start gap-1">
      <CyberText text="[ BRAZIL_TIME ]" variant="decrypt" delay={500} corrupt className="font-mono text-[8px] uppercase tracking-[0.4em] text-primary/60" />
      <span className="font-mono text-[11px] tracking-[0.2em] text-foreground/80 tabular-nums">{time || '00:00:00'}</span>
    </div>
  );
}

function MagneticCTA({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    const el = ref.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distance = Math.hypot(clientX - centerX, clientY - centerY);
      if (distance < 120) {
        xTo((clientX - centerX) * 0.35);
        yTo((clientY - centerY) * 0.35);
      } else {
        xTo(0); yTo(0);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: ref });
  return <div ref={ref} className={cn("inline-block", className)}>{children}</div>;
}

function LEDTicker({ text }: { text: string }) {
  const characters = (text.toUpperCase() + " ").split('');
  return (
    <div className="w-full bg-background py-2 overflow-hidden flex items-center border-t border-foreground/5 shadow-2xl" aria-hidden="true">
      <div className="animate-marquee whitespace-nowrap flex w-max shrink-0">
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex gap-4 md:gap-8 px-2 md:px-4 items-center shrink-0">
            {characters.map((char, charIndex) => (
              <div key={`${setIndex}-${charIndex}`} className="grid grid-cols-5 gap-[2px] md:gap-[4px] shrink-0">
                {(LED_BITMAPS[char] || LED_BITMAPS[' ']).map((row, rowIndex) => row.map((cell, colIndex) => (
                  <div key={`${rowIndex}-${colIndex}`} className={cn("w-[4px] h-[8px] md:w-[6px] md:h-[12px] rounded-full transition-all duration-300", cell ? "bg-foreground shadow-[0_0_12px_rgba(var(--foreground),0.4)]" : "bg-foreground/5")} />
                )))}
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
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeRef = useRef(0);
  const requestRef = useRef<number>(0);
  const [containerWidth, setContainerWidth] = useState(600);
  const expansionRef = useRef(0);
  const hoverFactorRef = useRef(1);
  const isHoveredRef = useRef(false);
  const currentFocusedIndexRef = useRef(0);
  const currentOffsetsRef = useRef(videos.map((_, i) => (i * 2 * Math.PI) / videos.length));
  const focalFactorsRef = useRef(videos.map((_, i) => ({ val: i === 0 ? 1 : 0 })));

  useEffect(() => {
    gsap.to(expansionRef, { current: 1, duration: 1.5, ease: "power2.out" });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => setContainerWidth(entries[0].contentRect.width));
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const prev = currentFocusedIndexRef.current;
      const next = (prev + 1) % videos.length;
      currentFocusedIndexRef.current = next;
      gsap.to(focalFactorsRef.current[prev], { val: 0, duration: 1.2, ease: "power2.inOut" });
      gsap.to(focalFactorsRef.current[next], { val: 1, duration: 1.2, ease: "power2.inOut" });
    }, 6000);
    return () => clearInterval(interval);
  }, [videos.length]);

  useEffect(() => {
    const TILT = 12 * (Math.PI / 180);
    const animate = () => {
      const targetHover = isHoveredRef.current ? 1.3 : 1;
      hoverFactorRef.current += (targetHover - hoverFactorRef.current) * 0.1;
      timeRef.current += (0.005 + Math.sin(timeRef.current * 0.1) * 0.0015) * hoverFactorRef.current;
      videoRefs.current.forEach((el, i) => {
        if (!el) return;
        const ff = focalFactorsRef.current[i].val;
        const targetOffset = i === currentFocusedIndexRef.current ? i * (2 * Math.PI / videos.length) : (i < currentFocusedIndexRef.current ? i : i - 1) * (2 * Math.PI / (videos.length - 1));
        currentOffsetsRef.current[i] += (targetOffset - currentOffsetsRef.current[i]) * 0.05;
        const angle = timeRef.current + currentOffsetsRef.current[i] + Math.sin(timeRef.current + currentOffsetsRef.current[i]) * 0.45;
        const visualDepth = Math.sin(angle);
        const rx = (containerWidth / 600 * 280) * (0.85 + (i % 3) * 0.1);
        const ry = (containerWidth / 600 * 160) * (0.85 + (i % 2) * 0.15);
        const orbitalX = (Math.cos(angle) * rx * Math.cos(TILT) - Math.sin(angle) * ry * Math.sin(TILT)) * expansionRef.current;
        const orbitalY = (Math.cos(angle) * rx * Math.sin(TILT) + Math.sin(angle) * ry * Math.cos(TILT)) * expansionRef.current;
        const scale = (0.9 + ((visualDepth + 1) / 2) * 0.25) * (1 - ff) + (1.25 * ff);
        el.style.transform = `translate3d(calc(-50% + ${orbitalX * (1 - ff)}px), calc(-50% + ${orbitalY * (1 - ff)}px), 0) scale(${scale})`;
        el.style.zIndex = Math.round((50 + visualDepth * 50) * (1 - ff) + (200 + i) * ff).toString();
        el.style.filter = (1 - (visualDepth + 1) / 2) * 4 * (1 - ff) > 0.5 ? `blur(${(1 - (visualDepth + 1) / 2) * 4 * (1 - ff)}px)` : 'none';
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [containerWidth, videos.length]);

  return (
    <div ref={containerRef} className="relative w-full h-[380px] sm:h-[450px] md:h-[550px] lg:h-[650px] overflow-visible" onMouseEnter={() => isHoveredRef.current = true} onMouseLeave={() => isHoveredRef.current = false}>
      <div className="absolute top-1/2 left-1/2 w-0 h-0">
        {videos.map((vid, i) => (
          <div key={vid.id} ref={el => { videoRefs.current[i] = el; }} className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-2xl overflow-hidden border border-foreground/10 bg-black shadow-2xl pointer-events-auto" style={{ transform: 'translate(-50%, -50%)' }}>
            <EditableVideo src={vid.videoUrl} storageKey={vid.id} fill className="object-cover" autoPlay muted loop playsInline hideControls startTime={vid.startTime} />
          </div>
        ))}
      </div>
    </div>
  );
}

const FAQ_DATA = [
  { q: "What is your average turnaround time?", a: "For short-form content (Reels/Shorts), expect a 24-48h turnaround. Long-form projects usually take 4-7 business days depending on complexity." },
  { q: "How many revisions are included?", a: "Every project includes two major revision rounds. Minor tweaks are unlimited until the final delivery feels perfect." },
  { q: "Which tech stack do you use?", a: "Premiere Pro & After Effects are my core tools, that's where 90% of the work happens." },
  { q: "Do you offer professional color grading?", a: "Yes, every project goes through a color grading pass to match the tone and mood you're going for." },
  { q: "Do you accept international payments?", a: "Yes, I work with clients worldwide. Payments are handled through Wise for international transfers." }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>('all');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const [poweredIcons, setPoweredIcons] = useState(ALL_TECH);
  const [winnerName, setWinnerName] = useState<string | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [faqHistory, setFaqHistory] = useState<{q: string, a: string}[]>([]);
  const [faqAvailableIndices, setFaqAvailableIndices] = useState<number[]>([0,1,2,3,4]);
  const [isBooting, setIsBooting] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const [isTerminalClosed, setIsTerminalClosed] = useState(false);
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const categoryBarRef = useRef<HTMLDivElement>(null);
  const techIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsSecretVisible(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 30);
    window.addEventListener('wheel', handleScroll, { passive: true });
    setTimeout(() => {
      const boot = setInterval(() => {
        setBootStep(s => {
          if (s >= 3) { clearInterval(boot); setIsBooting(false); return 4; }
          return s + 1;
        });
      }, 800);
    }, 1000);
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  useGSAP(() => {
    gsap.to(".hero-line", { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out" });
    gsap.to(".hud-reveal", { opacity: 1, duration: 1, delay: 1 });
    gsap.to(".scroll-indicator-ref", { opacity: 1, duration: 1, delay: 1.8 });
    const bar = categoryBarRef.current;
    if (bar) {
      gsap.to(bar, { height: 54, scrollTrigger: { trigger: "#works-section", start: "top 80px", end: "top top", scrub: true } });
      gsap.to(".category-card", { height: 54, scrollTrigger: { trigger: "#works-section", start: "top 80px", end: "top top", scrub: true } });
      gsap.to(".category-card img", { yPercent: 12, scrollTrigger: { trigger: "#works-section", start: "top 80px", end: "top top", scrub: true } });
    }
    gsap.utils.toArray<HTMLElement>('.stack-section').forEach((section, i, arr) => {
      if (i < arr.length - 1) {
        ScrollTrigger.create({
          trigger: section, start: 'top top', end: 'bottom top', scrub: true,
          onUpdate: self => gsap.set(section, { scale: 1 - self.progress * 0.05, filter: `brightness(${1 - self.progress * 0.4})` })
        });
      }
    });
    gsap.to(".testimonial-word", { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", scrollTrigger: { trigger: ".testimonial-trigger-ref", start: "top 80%", toggleActions: "play none none reverse" } });
    ScrollTrigger.create({
      trigger: "#contact-section", start: "top 20%", toggleActions: "play none none none",
      onEnter: () => {
        const tl = gsap.timeline();
        tl.fromTo(".contact-video-tile", { scale: 0, x: 0, y: 0, opacity: 0 }, { scale: 1, x: i => window.innerWidth < 768 ? 0 : Math.cos(i*60*Math.PI/180)*38+"vw", y: i => window.innerWidth < 768 ? 0 : Math.sin(i*60*Math.PI/180)*28+"vh", opacity: 0.2, duration: 1.5, stagger: 0.1, ease: "expo.out" });
        tl.fromTo(".contact-content-reveal", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=1");
      }
    });
  }, { scope: mainRef });

  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true); setWinnerName(null);
    const winner = ALL_TECH[Math.floor(Math.random() * ALL_TECH.length)];
    const sequence = Array.from({ length: 60 }, () => ALL_TECH[Math.floor(Math.random() * ALL_TECH.length)]);
    sequence[55] = winner;
    setPoweredIcons(sequence); setWinnerIndex(55);
    if (techIconsRef.current) {
      gsap.fromTo(techIconsRef.current, { x: 0 }, { x: 320/2 - (55*88+32), duration: 5, ease: "power4.out", onComplete: () => { setWinnerName(winner.name); setIsRolling(false); } });
    }
  };

  return (
    <div className="min-h-screen text-foreground bg-background relative overflow-x-clip">
      <header className="fixed top-0 w-full z-[100] border-b border-foreground/5 bg-background/80 backdrop-blur-md h-20">
        <div className="w-full px-6 md:px-12 h-full flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-lg font-bold font-serif italic">LV<span className="text-primary">.</span></Link>
            <div className="hidden lg:flex items-center gap-3 text-muted-foreground hud-reveal opacity-0">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <CyberText text="SYS_ONLINE // SOUTH BRAZIL" variant="decrypt" delay={800} corrupt className="tracking-[0.2em] font-mono text-[7.5px] uppercase" />
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
        <section className="stack-section sticky top-0 z-[10] h-screen w-full flex items-center justify-center bg-background overflow-hidden">
          <div className="w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="hud-reveal inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full opacity-0 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <CyberText text="[ 00 / EDITOR ]" variant="decrypt" delay={600} corrupt className="font-mono text-[8px] uppercase tracking-[0.3em] text-primary font-bold" />
              </div>
              <h1 className="font-serif font-bold text-[clamp(2rem,5.6vw,5.2rem)] leading-[0.9] tracking-tighter mb-8">
                <div className="overflow-hidden"><div className="hero-line translate-y-full opacity-0">CRAFTING</div></div>
                <div className="overflow-hidden"><div className="hero-line translate-y-full opacity-0">VISUAL</div></div>
                <div className="overflow-hidden"><div className="hero-line translate-y-full opacity-0">STORYTELLING<span className="text-primary">.</span></div></div>
              </h1>
              <Link href="#works-section" className="hud-reveal mt-6 flex items-center gap-6 opacity-0 group">
                <Button variant="link" className="p-0 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground hover:text-primary">
                  View Archive <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
            </div>
            <div className="lg:col-span-5 flex justify-center lg:justify-end animate-image-reveal overflow-visible">
              <FloatingVideoCluster videos={clusterVideos} />
            </div>
          </div>
          <div className="scroll-indicator-ref absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-0 pointer-events-none">
            <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-foreground/40">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent shadow-[0_0_8px_rgba(var(--primary),0.3)]" />
          </div>
        </section>

        <section id="works-section" className="stack-section sticky top-0 z-[20] min-h-screen w-full bg-background border-t border-foreground/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] isolate">
          <div ref={categoryBarRef} className="sticky top-20 w-full py-[10px] bg-background border-b border-foreground/5 shadow-sm z-[90] h-20 overflow-hidden flex items-center">
            <div className="w-full px-6 md:px-12 flex flex-wrap justify-center gap-4 md:gap-8">
              {categories.map(cat => (
                <button 
                  key={cat.id} 
                  onClick={() => { 
                    setActiveCategory(cat.id); 
                    setHasInteracted(true); 
                    gsap.to(window, { 
                      duration: 1, 
                      scrollTo: { y: "#works-section", offsetY: 0 }, 
                      ease: "power3.inOut" 
                    }); 
                  }} 
                  className={cn("category-card group relative overflow-hidden cursor-pointer w-full md:flex-1 h-20 max-w-[220px]", hasInteracted && activeCategory === cat.id && "ring-2 ring-primary")}
                >
                  <EditableImage src={catImages.find(i => i.id === cat.id)?.imageUrl || ''} storageKey={`cat-${cat.id}`} fill className={cn("object-cover", hasInteracted && activeCategory === cat.id && "scale-110")} alt={cat.label} />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <span className="absolute inset-0 flex items-center justify-center text-white font-serif font-bold text-[10px] uppercase tracking-widest z-20 hover-glitch" data-text={cat.label}>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
          <CategoryFeed category={activeCategory} onClose={() => setActiveCategory(null)} />
        </section>

        <section id="archive-section" className="stack-section sticky top-0 z-[30] h-screen w-full bg-background border-t border-foreground/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="w-full h-full pt-20 px-6 md:px-12 lg:px-24 flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-12 md:gap-32 items-center mb-6">
              {[ { l: 'Years', v: 6 }, { l: 'Clients', v: 12 }, { l: 'Projects', v: 80 } ].map(s => (
                <div key={s.l} className="flex flex-col items-center"><span className="text-[11px] font-mono uppercase tracking-[0.4em] text-primary/60 mb-1">{s.l}</span><span className="text-4xl font-bold font-mono tracking-tighter opacity-90">+<Counter value={s.v} /></span></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-start flex-1 mt-12">
              <div className="lg:col-span-7 testimonial-trigger-ref max-w-4xl">
                <Quote className="absolute -top-10 -left-6 w-16 h-12 text-foreground/5 -z-10" />
                <div className="text-3xl md:text-5xl font-serif italic leading-[1.1] mb-6">
                  {"Leonardo's edits kept people watching longer. Our retention improved right after he took over.".split(' ').map((w, i) => (
                    <span key={i} className="overflow-hidden inline-block mr-[0.25em]"><span className="testimonial-word inline-block translate-y-full opacity-0">{w.match(/edits|people|watching|longer|retention|improved/) ? <span className="text-primary">{w}</span> : w}</span></span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-primary" /><div className="flex flex-col"><CyberText text="JAMES HUANG" variant="decrypt" delay={800} className="font-mono text-[11px] uppercase tracking-widest font-bold" /><CyberText text="CREATIVE DIRECTOR @ VOID STUDIO" variant="decrypt" delay={1000} className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground/60" /></div>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-6 items-center">
                <div className="flex flex-col gap-4 items-center text-center w-full max-w-[350px]">
                  <CyberText text={winnerName ? `[ ENGINE: ${winnerName.toUpperCase()} ]` : "[ POWERED_BY ]"} variant="decrypt" delay={500} corrupt className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-bold" />
                  <div className="relative w-full h-24 overflow-hidden bg-foreground/[0.03] border border-foreground/10 flex items-center justify-center rounded-sm">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-primary/60 z-20" />
                    <div ref={techIconsRef} className="flex gap-6 absolute left-0 items-center">
                      {poweredIcons.map((tech, i) => (
                        <div key={i} className={cn("group w-16 h-16 flex items-center justify-center rounded-sm shadow-xl transition-all duration-700 shrink-0", !isRolling && winnerName && (tech.name === winnerName && i === winnerIndex ? "scale-110 z-30 ring-1 ring-primary" : "opacity-5 grayscale scale-75"))} style={{ backgroundColor: tech.bg }}>
                          <span className="font-sans font-bold text-lg flex items-center gap-2 px-2" style={{ color: tech.text }}>{tech.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className={cn("sparkle-button scale-90", isRolling && "opacity-50 pointer-events-none")} onClick={handleRoll} disabled={isRolling}>roll</button>
                </div>
                {!isTerminalClosed && (
                  <div className={cn("w-full transition-all duration-500", isTerminalMinimized ? "h-10 opacity-60" : "h-[220px]")}>
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden shadow-2xl h-full flex flex-col">
                      <div className="bg-[#1a1a1a] h-8 px-4 flex items-center justify-between border-b border-white/10 cursor-move">
                        <div className="flex items-center gap-2"><TerminalIcon className="w-3 h-3 text-white/60" /><span className="font-mono text-[10px] text-white/80">archive_console.exe</span></div>
                        <div className="flex"><button onClick={() => setIsTerminalMinimized(!isTerminalMinimized)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10"><Minus className="w-3 h-3 text-white" /></button><button onClick={() => setIsTerminalClosed(true)} className="w-8 h-8 flex items-center justify-center hover:bg-[#e81123]"><X className="w-3 h-3 text-white" /></button></div>
                      </div>
                      {!isTerminalMinimized && (
                        <div className="p-4 font-mono text-[11px] bg-black text-white overflow-y-auto flex-1 cyber-scrollbar">
                          {isBooting ? BOOT_LINES.slice(0, bootStep).map((l, i) => <div key={i} className="opacity-80">{l}</div>) : (
                            <div className="space-y-4">
                              {faqHistory.map((h, i) => <div key={i} className="animate-in fade-in slide-in-from-left-2"><div className="text-white/40"><span className="text-white/80">C:\VERONA\ARCHIVE&gt;</span> {h.q}</div><div className="text-white pl-4 border-l border-white/20 font-light">{h.a}</div></div>)}
                              <div className="space-y-1.5">{faqAvailableIndices.map(i => <div key={i} className="text-white/30 hover:text-white cursor-pointer group" onClick={() => { setFaqHistory(p => [...p, FAQ_DATA[i]]); setFaqAvailableIndices(p => p.filter(idx => idx !== i)); }}><span className="text-primary group-hover:translate-x-1 transition-transform">{'>'}</span> {FAQ_DATA[i].q}</div>)}</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 opacity-40 mt-auto pb-4"><CyberText text="[ ARCHIVE_STATS ]" variant="decrypt" delay={500} className="font-mono text-[9px] uppercase tracking-widest text-primary font-bold" /><div className="text-[8px] font-mono uppercase tracking-[0.2em]">VERONA_V3 // VIEWPORT_MODE</div></div>
          </div>
        </section>

        <section id="contact-section" className="stack-section sticky top-0 z-[40] h-screen flex flex-col items-center justify-center border-t border-foreground/5 bg-background shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {VIDEOS_DATA.slice(0, 6).map((vid, i) => (
              <div key={i} className="contact-video-tile absolute w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border border-primary/20 bg-black opacity-0">
                <EditableVideo src={vid.videoUrl} storageKey={`contact-${vid.id}`} fill className="object-cover grayscale brightness-50 contrast-125" autoPlay muted loop playsInline hideControls />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </div>
            ))}
            <div className="absolute inset-0 bg-radial-gradient(circle, transparent 20%, hsl(var(--background)) 80%) opacity-60" />
          </div>
          <div className="contact-content-reveal relative z-10 flex flex-col items-center justify-center text-center gap-14 opacity-0">
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-serif italic font-bold leading-[1.1]">Ready to tell<br />your story?</h2>
            <Link href="mailto:00mezzomo@gmail.com"><MagneticCTA><Button size="lg" className="rounded-none px-12 sm:px-16 h-16 sm:h-20 text-lg sm:text-xl font-bold bg-primary text-primary-foreground hover:bg-transparent hover:text-primary border-2 border-primary transition-all duration-300">Let's Talk</Button></MagneticCTA></Link>
          </div>
        </section>

        <div className="relative z-50 bg-background">
          <div className={cn("overflow-hidden transition-all duration-700 flex flex-col items-center justify-center", isSecretVisible ? "h-[140px] opacity-100" : "h-0 opacity-0")}><LEDTicker text="VERONA STUDIO" /></div>
          <footer className="py-8 md:py-12 w-full px-6 md:px-12 border-t border-foreground/5">
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
              <ul className="flex gap-4 items-center">
                {[ { id: 'discord', icon: <DiscordIcon className="h-5 w-5 relative z-10" />, color: '#7289da', link: 'https://discord.com/users/299338458231603202' }, { id: 'whatsapp', icon: <WhatsAppIcon className="h-5 w-5 relative z-10" />, color: '#25d366', link: '#' }, { id: 'email', icon: <Mail className="h-5 w-5 relative z-10" />, color: 'hsl(var(--primary))', link: 'mailto:00mezzomo@gmail.com' } ].map(s => (
                  <li key={s.id} className="relative group">
                    <Link href={s.link} className="relative overflow-hidden w-12 h-12 rounded-full bg-foreground/[0.05] border border-foreground/5 flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300">
                      <div className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 group-hover:h-full" style={{ backgroundColor: s.color }} />
                      {s.icon}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16"><DigitalClock /><CyberText text={`© ${new Date().getFullYear()} LEONARDO VERONA.`} variant="decrypt" delay={500} corrupt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground" /></div>
            </div>
          </footer>
        </div>
      </main>
      <style jsx global>{`
        .cyber-scrollbar::-webkit-scrollbar { width: 4px; }
        .cyber-scrollbar::-webkit-scrollbar-track { background: rgba(220, 38, 38, 0.05); }
        .cyber-scrollbar::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 10px; box-shadow: 0 0 10px #dc2626; }
      `}</style>
    </div>
  );
}

const categories = [ { id: 'all', label: 'All' }, { id: 'shorts', label: 'Shorts' }, { id: 'long', label: 'Long-Form' }, { id: 'motion', label: 'Motion' }, { id: 'talking', label: 'Talking Heads' }, { id: 'vlogs', label: 'Vlogs' } ];
const catImages = [ { id: 'all', imageUrl: 'https://i.imgur.com/lj2mU6F.png' }, { id: 'shorts', imageUrl: 'https://i.imgur.com/ehRTGR0.png' }, { id: 'long', imageUrl: 'https://i.imgur.com/jAja7gP.png' }, { id: 'motion', imageUrl: 'https://i.imgur.com/leLxq09.png' }, { id: 'talking', imageUrl: 'https://i.imgur.com/2u5rbjn.png' }, { id: 'vlogs', imageUrl: 'https://i.imgur.com/85wpzam.png' } ];
const clusterVideos = [ { id: 'grok', videoUrl: 'https://i.imgur.com/SRki5JL.mp4', startTime: 0 }, { id: 'intro', videoUrl: 'https://i.imgur.com/ND3kmsW.mp4', startTime: 0 }, { id: 'cook', videoUrl: 'https://i.imgur.com/cyxF01x.mp4', startTime: 0 }, { id: 'speed', videoUrl: 'https://i.imgur.com/aYp6QMo.mp4', startTime: 0 }, { id: 'pensen', videoUrl: 'https://i.imgur.com/2ss69QQ.mp4', startTime: 0 } ];
const BOOT_LINES = [ "[BOOT]: INITIALIZING VERONA_ENGINE...", "[INFO]: LOADING_CORE_MODULES [OK]", "[INFO]: SYNCING_ARCHIVE_DATA [OK]", "[INFO]: ESTABLISHING_SECURE_CONN [OK]" ];
