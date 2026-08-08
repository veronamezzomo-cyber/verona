'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { EditableImage } from '@/components/editable-image';
import { EditableVideo } from '@/components/editable-video';
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
  Minus,
  Square
} from 'lucide-react';

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
    if (!corrupt || !isDone || reducedMotion) return;
    
    const triggerCorruption = () => {
      const charIndex = Math.floor(Math.random() * text.length);
      const original = text;
      
      const corrupted = original.split('');
      corrupted[charIndex] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      setDisplay(corrupted.join(''));
      
      setTimeout(() => {
        setDisplay(original);
      }, 150);
      
      setTimeout(triggerCorruption, 8000 + Math.random() * 7000);
    };

    const timer = setTimeout(triggerCorruption, 8000 + Math.random() * 7000);
    return () => clearTimeout(timer);
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
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 1.25a18.27 18.27 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0-5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 1 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292.074.074 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
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
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center md:items-start gap-1">
      <CyberText 
        text="[ BRAZIL_TIME ]" 
        variant="decrypt" 
        delay={500} 
        corrupt 
        className="font-mono text-[8px] uppercase tracking-[0.4em] text-primary/60" 
      />
      <span className="font-mono text-[11px] tracking-[0.2em] text-foreground/80 tabular-nums">
        {time || '00:00:00'}
      </span>
    </div>
  );
}

function MagneticCTA({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    
    if (isReduced || isTouch) return;

    const el = ref.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      const distance = Math.hypot(distanceX, distanceY);
      const threshold = 120;

      if (distance < threshold) {
        xTo(distanceX * 0.35);
        yTo(distanceY * 0.35);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: ref });

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      {children}
    </div>
  );
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
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeRef = useRef(0);
  const requestRef = useRef<number>(0);
  const [containerWidth, setContainerWidth] = useState(600);
  
  const expansionRef = useRef(0);
  const hoverFactorRef = useRef(1);
  const isHoveredRef = useRef(false);
  const startTimeRef = useRef(Date.now());
  
  const focalFactorsRef = useRef(videos.map((_, i) => ({ val: i === 0 ? 1 : 0 })));
  const currentFocusedIndexRef = useRef(0);
  const currentOffsetsRef = useRef(videos.map((_, i) => (i * 2 * Math.PI) / videos.length));

  const orbitParams = useMemo(() => {
    const factor = containerWidth / 600;
    return {
      rx: Math.max(180, 280 * factor),
      ry: Math.max(100, 160 * factor)
    };
  }, [containerWidth]);

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

  useEffect(() => {
    const rotateFocus = () => {
      const prev = currentFocusedIndexRef.current;
      const next = (prev + 1) % videos.length;
      currentFocusedIndexRef.current = next;

      gsap.to(focalFactorsRef.current[prev], { val: 0, duration: 1.2, ease: "power2.inOut" });
      gsap.to(focalFactorsRef.current[next], { val: 1, duration: 1.2, ease: "power2.inOut" });
    };

    const interval = setInterval(rotateFocus, 6000);
    return () => clearInterval(interval);
  }, [videos.length]);

  useEffect(() => {
    const EXPANSION_DURATION = 800;
    const TILT = 12 * (Math.PI / 180); 
    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);
    const PARALLAX_INTENSITY = 0.45; 
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      const focusIdx = currentFocusedIndexRef.current;
      
      const expansionProgress = Math.min(1, elapsed / EXPANSION_DURATION);
      expansionRef.current = 1 - Math.pow(1 - expansionProgress, 2); 

      const targetHover = isHoveredRef.current ? 1.3 : 1;
      hoverFactorRef.current += (targetHover - hoverFactorRef.current) * 0.1;

      const breathing = Math.sin(timeRef.current * 0.1) * 0.0015;
      const step = (0.005 + breathing) * hoverFactorRef.current;
      timeRef.current += step;

      videoRefs.current.forEach((el, i) => {
        if (!el) return;
        
        const { rx: baseRx, ry: baseRy } = orbitParams;
        const ff = focalFactorsRef.current[i].val; 
        
        let targetOffset;
        if (i === focusIdx) {
          targetOffset = i * (2 * Math.PI / videos.length);
        } else {
          const rank = i < focusIdx ? i : i - 1;
          targetOffset = rank * (2 * Math.PI / (videos.length - 1));
        }
        
        currentOffsetsRef.current[i] += (targetOffset - currentOffsetsRef.current[i]) * 0.05;
        
        const baseAngle = timeRef.current + currentOffsetsRef.current[i];
        const effectiveAngle = baseAngle + Math.sin(baseAngle) * PARALLAX_INTENSITY;
        const visualDepth = Math.sin(effectiveAngle); 
        
        const rx = baseRx * (0.85 + (i % 3) * 0.1);
        const ry = baseRy * (0.85 + (i % 2) * 0.15);
        
        const rawX = Math.cos(effectiveAngle) * rx;
        const rawY = Math.sin(effectiveAngle) * ry;
        
        const orbitalX = rawX * cosT - rawY * sinT;
        const orbitalY = rawX * sinT + rawY * cosT;
        
        const initialX = i * 15;
        const initialY = i * 15;

        const currentOrbitalX = initialX * (1 - expansionRef.current) + orbitalX * expansionRef.current;
        const currentOrbitalY = initialY * (1 - expansionRef.current) + orbitalY * expansionRef.current;

        const x = currentOrbitalX * (1 - ff);
        const y = currentOrbitalY * (1 - ff);

        const baseScale = 0.9 + ((visualDepth + 1) / 2) * 0.25;
        const scale = baseScale * (1 - ff) + (1.25 * ff);
        
        const baseBlur = (1 - (visualDepth + 1) / 2) * 4;
        const blur = baseBlur * (1 - ff);
        
        const baseZIndex = 50 + Math.round(visualDepth * 50);
        const zIndex = Math.round(baseZIndex * (1 - ff) + (200 + i) * ff);

        el.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale})`;
        el.style.zIndex = zIndex.toString();
        el.style.filter = blur > 0.5 ? `blur(${blur}px)` : 'none';
        
        const shadowOp = (Math.max(0, visualDepth + 0.5) * 0.4) * (1 - ff) + 0.6 * ff;
        el.style.boxShadow = `0 ${20 * shadowOp}px ${40 * shadowOp}px -10px rgba(0,0,0,${0.5 * shadowOp})`;
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [orbitParams, videos.length]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[380px] sm:h-[450px] md:h-[550px] lg:h-[650px] overflow-visible"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      <div className="absolute inset-0 pointer-events-auto" />
      
      <div className="absolute top-1/2 left-1/2 w-0 h-0">
        {videos.map((vid, i) => (
          <div 
            key={vid.id}
            ref={(el) => { videoRefs.current[i] = el; }}
            className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-2xl overflow-hidden border border-foreground/10 bg-black shadow-2xl pointer-events-auto transition-shadow duration-300"
            style={{ 
              transform: 'translate(-50%, -50%)',
              opacity: 1,
              willChange: 'transform, filter'
            }}
          >
            <EditableVideo 
              src={vid.videoUrl} 
              storageKey={vid.id}
              fill
              className="object-cover"
              autoPlay
              muted
              loop
              playsInline
              hideControls
              startTime={vid.startTime}
            />
          </div>
        ))}
      </div>
    </div>
  );
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
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [year, setYear] = useState<number>(2024);
  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  
  const [faqHistory, setFaqHistory] = useState<{q: string, a: string}[]>([]);
  const [faqAvailableIndices, setFaqAvailableIndices] = useState<number[]>(FAQ_DATA.map((_, i) => i));
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const [typedQuestionsCount, setTypedQuestionsCount] = useState(0);
  const [isHeaderTyped, setIsHeaderTyped] = useState(false);
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

  const [poweredIcons, setPoweredIcons] = useState(ALL_TECH.slice(0, 8));
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
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: "#works", offsetY: 80 },
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
    
    const iconStep = 88; // 64 (w-16) + 24 (gap-6)
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
    { id: 'intro', videoUrl: 'https://i.imgur.com/ND3kmsW.mp4', startTime: 13 },
    { id: 'cook', videoUrl: 'https://i.imgur.com/cyxF01x.mp4', startTime: 0 },
    { id: 'speed', videoUrl: 'https://i.imgur.com/aYp6QMo.mp4', startTime: 0 },
    { id: 'pensen', videoUrl: 'https://i.imgur.com/2ss69QQ.mp4', startTime: 0 }
  ];

  const handleTerminalAction = (index: number) => {
    const qIdx = faqAvailableIndices[index];
    setFaqHistory(prev => [...prev, FAQ_DATA[qIdx]]);
    setFaqAvailableIndices(prev => prev.filter((_, i) => i !== index));
    setActiveFaqIndex(0);
    setTypedQuestionsCount(0);
    setIsHeaderTyped(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isTerminalFocused || isBooting) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveFaqIndex(prev => (prev + 1) % faqAvailableIndices.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveFaqIndex(prev => (prev - 1 + faqAvailableIndices.length) % faqAvailableIndices.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (faqAvailableIndices.length > 0) {
        handleTerminalAction(activeFaqIndex);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTerminalMinimized) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - faqPos.x,
      y: e.clientY - dragStart.y
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
  }, [isDragging, dragStart]);

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

    gsap.to(".testimonial-line", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".testimonial-trigger-ref",
        start: "top 85%",
        once: true
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

  return (
    <div className="min-h-screen text-foreground transition-colors duration-500 bg-background relative">
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
            <Link href="#works" className="text-foreground/70 hover:text-foreground">Works</Link>
            <Link href="#contact" className="text-foreground/70 hover:text-foreground">Contact</Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main ref={mainRef} className="relative">
        <section className="relative z-0 h-screen w-full flex items-center justify-center bg-background overflow-hidden">
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
                <CyberText 
                  text="COORDINATES: 23.5505° S, 46.6333° W" 
                  variant="decrypt" 
                  delay={1000} 
                  corrupt 
                  className="hud-reveal opacity-0 font-mono text-[7.5px] uppercase tracking-[0.2em] text-muted-foreground/40 hidden sm:block" 
                />
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
                <Link href="#works" className="hud-reveal mt-6 flex items-center gap-6 opacity-0">
                  <Button variant="link" className="p-0 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground hover:text-primary group">
                    View Archive <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center lg:justify-end animate-image-reveal overflow-visible">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.05)_0%,transparent_70%)] pointer-events-none" />
              <FloatingVideoCluster videos={clusterVideos} />
            </div>
          </div>
          
          <div className="hud-reveal absolute bottom-10 left-10 pointer-events-none hidden md:block opacity-0">
            <div className="font-mono text-[8px] uppercase tracking-[0.4em] flex flex-col gap-1">
              <CyberText text="System: Active" variant="decrypt" delay={1200} corrupt />
              <CyberText text="Buffer: Locked" variant="decrypt" delay={1300} />
              <CyberText text="Layer: 01_Hero" variant="decrypt" delay={1400} />
            </div>
          </div>

          <div className="scroll-indicator-ref absolute bottom-10 left-10 sm:left-1/2 sm:-translate-x-1/2 flex flex-col items-center gap-4 opacity-0 pointer-events-none z-10">
            <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-foreground/40">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent shadow-[0_0_8px_rgba(var(--primary),0.3)]" />
          </div>
        </section>

        <div className="relative z-10 flex flex-col bg-background transition-all duration-500">
          <section id="works" className="w-full py-[10px] sticky top-20 z-[90] bg-background border-b border-t border-foreground/5 shadow-sm">
            <div className="w-full px-6 md:px-12 flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
              {categories.map((cat) => {
                const img = catImages.find(i => i.id === cat.id);
                return (
                  <button 
                    key={cat.id} 
                    onClick={() => handleCategoryClick(cat.id)}
                    className={cn(
                      "category-card group relative overflow-hidden cursor-pointer w-full md:flex-1 h-20 max-w-full md:max-w-[220px]",
                      activeCategory === cat.id && "ring-2 ring-primary"
                    )}
                  >
                    {img && (
                      <EditableImage 
                        src={img.imageUrl} 
                        alt={cat.label} 
                        storageKey={`cat-${cat.id}`}
                        fill
                        className={cn("object-cover", activeCategory === cat.id && "scale-110")}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20" />
                    <span 
                      className="absolute inset-0 flex items-center justify-center text-white font-serif font-bold text-[10px] uppercase tracking-widest z-20 hover-glitch"
                      data-text={cat.label}
                    >
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
          <CategoryFeed 
            category={activeCategory} 
            onClose={handleCloseFeed} 
          />
        </div>

        <section className="py-[10px] bg-background overflow-hidden border-t border-foreground/5">
          <div className="w-full px-6 md:px-12">
            
            <div className="flex justify-center border-b border-foreground/5 py-[10px] mb-12">
              <div className="flex flex-wrap gap-16 md:gap-32 items-center">
                <div className="flex flex-col items-center">
                  <CyberText text="[ YEARS ]" variant="decrypt" delay={500} corrupt className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary mb-1" />
                  <span className="text-3xl font-bold font-mono tracking-tighter opacity-80 skew-text-ref">+6</span>
                </div>
                <div className="flex flex-col items-center">
                  <CyberText text="[ CLIENTS ]" variant="decrypt" delay={600} corrupt className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary mb-1" />
                  <span className="text-3xl font-bold font-mono tracking-tighter opacity-80 skew-text-ref">+12</span>
                </div>
                <div className="flex flex-col items-center">
                  <CyberText text="[ PROJECTS ]" variant="decrypt" delay={700} corrupt className="font-mono text-[11px] uppercase tracking-[0.4em] text-primary mb-1" />
                  <span className="text-3xl font-bold font-mono tracking-tighter opacity-80 skew-text-ref">+80</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-12 mb-32">
              <div className="relative testimonial-trigger-ref">
                <Quote className="absolute -top-12 -left-8 w-24 h-24 text-foreground/5 pointer-events-none -z-10" />
                <div className="text-3xl md:text-6xl font-serif italic leading-[1.05] text-foreground mb-8 skew-text-ref">
                  <div className="flex flex-wrap items-baseline">
                    <span className="overflow-hidden inline-block mr-[0.25em]"><span className="testimonial-line inline-block translate-y-full opacity-0">"Leonardo's</span></span>
                    <span className="overflow-hidden inline-block mr-[0.25em]"><span className="testimonial-line inline-block translate-y-full opacity-0">edits</span></span>
                    <span className="overflow-hidden inline-block mr-[0.25em]"><span className="testimonial-line inline-block translate-y-full opacity-0 text-primary">kept</span></span>
                    <span className="overflow-hidden inline-block mr-[0.25em]"><span className="testimonial-line inline-block translate-y-full opacity-0 text-primary">people</span></span>
                    <span className="overflow-hidden inline-block mr-[0.25em]"><span className="testimonial-line inline-block translate-y-full opacity-0 text-primary">watching</span></span>
                    <span className="overflow-hidden inline-block mr-[0.25em]"><span className="testimonial-line inline-block translate-y-full opacity-0 text-primary">longer.</span></span>
                  </div>
                  <div className="flex flex-wrap items-baseline mt-2">
                    <span className="overflow-hidden inline-block mr-[0.25em]"><span className="testimonial-line inline-block translate-y-full opacity-0">Our</span></span>
                    <span className="overflow-hidden inline-block mr-[0.25em]"><span className="testimonial-line inline-block translate-y-full opacity-0 text-primary">retention</span></span>
                    <span className="overflow-hidden inline-block mr-[0.25em]"><span className="testimonial-line inline-block translate-y-full opacity-0 text-primary">improved</span></span>
                    <span className="overflow-hidden inline-block mr-[0.25em]"><span className="testimonial-line inline-block translate-y-full opacity-0">right</span></span>
                    <span className="overflow-hidden inline-block mr-[0.25em]"><span className="testimonial-line inline-block translate-y-full opacity-0">after</span></span>
                    <span className="overflow-hidden inline-block mr-[0.25em]"><span className="testimonial-line inline-block translate-y-full opacity-0">he</span></span>
                    <span className="overflow-hidden inline-block mr-[0.25em]"><span className="testimonial-line inline-block translate-y-full opacity-0">took</span></span>
                    <span className="overflow-hidden inline-block"><span className="testimonial-line inline-block translate-y-full opacity-0">over."</span></span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-primary" />
                  <div className="flex flex-col">
                    <CyberText text="JAMES HUANG" variant="decrypt" delay={800} className="font-mono text-[10px] uppercase tracking-widest font-bold" />
                    <CyberText text="CREATIVE DIRECTOR @ VOID STUDIO" variant="decrypt" delay={1000} className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 w-full">
                <div className="flex flex-col gap-8 items-center text-center flex-1 w-full max-w-lg">
                  <CyberText 
                    text={winnerName ? `[ POWERED_BY: ${winnerName.toUpperCase()} ]` : "[ POWERED_BY ]"} 
                    variant="decrypt" 
                    delay={500} 
                    corrupt={!isRolling} 
                    className="font-mono text-[8px] uppercase tracking-[0.4em] text-primary" 
                  />
                  
                  <div className="relative w-full max-w-[320px] h-24 overflow-hidden bg-foreground/[0.02] border-x border-foreground/10 flex items-center justify-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-primary/40 z-20" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent z-10" />

                    <div 
                      ref={techIconsRef} 
                      className="flex gap-6 absolute left-0 items-center will-change-transform"
                    >
                      {poweredIcons.map((tech, i) => (
                        <div 
                          key={`${tech.id}-${i}`} 
                          className={cn(
                            "w-16 h-16 flex items-center justify-center rounded-full shadow-2xl transition-all duration-700 shrink-0",
                            !isRolling && winnerName ? (tech.name === winnerName && i === winnerIndex ? "scale-125 z-30 ring-4 ring-primary" : "opacity-10 grayscale scale-75") : "opacity-100 scale-100"
                          )}
                          style={{ backgroundColor: tech.bg }}
                        >
                          <span className="font-sans font-bold text-xl" style={{ color: tech.text }}>{tech.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button 
                      className={cn("sparkle-button", isRolling && "opacity-50 pointer-events-none")} 
                      onClick={handleRoll}
                      disabled={isRolling}
                    >
                      <span>{isRolling ? "Rolling..." : "Roll Archive"}</span>
                      <svg className="star-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
                      </svg>
                      <svg className="star-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
                      </svg>
                      <svg className="star-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
                      </svg>
                      <svg className="star-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
                      </svg>
                      <svg className="star-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
                      </svg>
                      <svg className="star-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {!isTerminalClosed && (
                  <div 
                    className={cn(
                      "flex-1 w-full max-w-lg transition-all duration-500 terminal-reveal-ref",
                      isTerminalMinimized ? "h-10 opacity-60" : "opacity-100 h-auto"
                    )}
                  >
                    <div 
                      ref={terminalRef} 
                      className={cn(
                        "bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 w-full",
                        isDragging && "transition-none"
                      )}
                      style={{ transform: `translate(${faqPos.x}px, ${faqPos.y}px)` }}
                    >
                      <div 
                        onMouseDown={handleMouseDown}
                        className="bg-[#1a1a1a] h-8 px-3 flex items-center justify-between border-b border-white/10 cursor-move select-none"
                      >
                        <div className="flex items-center gap-2">
                          <TerminalIcon className="w-4 h-4 text-white/60" />
                          <span className="font-mono text-xs text-white/80">Command Prompt - Archive Console</span>
                        </div>
                        <div className="flex h-full">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setIsTerminalMinimized(!isTerminalMinimized); }}
                            className="w-10 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5 text-white" />
                          </button>
                          <button className="w-10 h-8 flex items-center justify-center hover:bg-white/10 transition-colors">
                            <Square className="w-3 h-3 text-white" />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setIsTerminalClosed(true); }}
                            className="w-10 h-8 flex items-center justify-center hover:bg-[#e81123] transition-colors group"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>

                      {!isTerminalMinimized && (
                        <div 
                          onKeyDown={handleKeyDown}
                          tabIndex={0}
                          onFocus={() => setIsTerminalFocused(true)}
                          onBlur={() => setIsTerminalFocused(false)}
                          className="p-8 font-mono text-sm relative outline-none group bg-black text-white h-auto"
                        >
                          {isBooting ? (
                            <div className="space-y-1">
                              {BOOT_LINES.slice(0, bootStep).map((line, idx) => (
                                <div key={idx} className="opacity-80">{line}</div>
                              ))}
                              {canStartBoot && bootStep < BOOT_LINES.length && (
                                <TypewriterText 
                                  text={BOOT_LINES[bootStep]} 
                                  onComplete={() => {
                                    setTimeout(() => {
                                      if (bootStep === BOOT_LINES.length - 1) {
                                        setIsBooting(false);
                                      } else {
                                        setBootStep(s => s + 1);
                                      }
                                    }, 150);
                                  }} 
                                />
                              )}
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="space-y-2">
                                {faqHistory.map((item, i) => (
                                  <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-500">
                                    <div className="text-white/40 mb-1 flex items-center gap-2">
                                      <span className="text-white/80">C:\VERONA\ARCHIVE&gt;</span> {item.q}
                                    </div>
                                    <div className="text-white leading-relaxed pl-4 border-l border-white/20">
                                      <TypewriterText text={item.a} />
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {faqAvailableIndices.length > 0 && (
                                <div className="mt-0">
                                  <div className="text-[10px] uppercase tracking-widest text-white/20 mb-2">
                                    <TypewriterText 
                                      text="Available Queries" 
                                      onComplete={() => setIsHeaderTyped(true)}
                                      speed={10}
                                      showCursor={false}
                                    />
                                  </div>
                                  {isHeaderTyped && (
                                    <div className="space-y-1">
                                      {faqAvailableIndices.map((qIdx, i) => (
                                        <div 
                                          key={qIdx}
                                          className={cn(
                                            "transition-colors flex items-start gap-2 py-0.5 outline-none",
                                            activeFaqIndex === i ? "text-white font-bold" : "text-white/30"
                                          )}
                                        >
                                          {i <= typedQuestionsCount ? (
                                            <>
                                              <span className={cn("shrink-0", activeFaqIndex === i ? "text-white" : "text-white/20")}>
                                                {'>'}
                                              </span>
                                              <span className="uppercase text-xs tracking-tight">
                                                {i === typedQuestionsCount ? (
                                                  <TypewriterText 
                                                    text={FAQ_DATA[qIdx].q}
                                                    speed={5}
                                                    showCursor={false}
                                                    onComplete={() => setTypedQuestionsCount(prev => prev + 1)}
                                                  />
                                                ) : (
                                                  <span>
                                                    {FAQ_DATA[qIdx].q}
                                                    {activeFaqIndex === i && (
                                                      <span className="w-2 h-4 bg-white inline-block ml-1 align-middle animate-cursor-blink" />
                                                    )}
                                                  </span>
                                                )}
                                              </span>
                                            </>
                                          ) : null}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}

                              {faqAvailableIndices.length === 0 && (
                                <div className="text-center py-4 text-white/20 italic border border-white/5 bg-white/[0.02] rounded">
                                  --- SYSTEM NOMINAL. ALL QUERIES EXECUTED ---
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {!isTerminalMinimized && (
                        <div className="bg-[#1a1a1a] h-8 px-6 flex items-center justify-between border-t border-white/5 opacity-40">
                           <span className="text-[8px] tracking-[0.4em] text-white">C:\VERONA\ARCHIVE&gt; <span className="w-2 h-0.5 bg-white inline-block ml-0.5 align-baseline animate-cursor-blink" /></span>
                           <span className="text-[8px] tracking-[0.4em] text-white">STATUS: NOMINAL</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="sticky top-0 z-[30] min-h-screen flex flex-col justify-between border-t border-foreground/5 bg-background">
          <div className="flex-1 flex flex-col justify-center items-center text-center px-6">
            <h2 className="text-6xl md:text-8xl font-serif italic font-bold mb-12 skew-text-ref">Ready to tell<br />your story?</h2>
            <Link href="mailto:00mezzomo@gmail.com">
              <MagneticCTA>
                <Button size="lg" className="rounded-none px-16 h-20 text-xl font-bold bg-primary text-primary-foreground hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-shadow">
                  Let's Talk
                </Button>
              </MagneticCTA>
            </Link>
          </div>
          <div className="relative overflow-hidden">
             <div className={cn(
                  "overflow-hidden transition-all duration-700 ease-in-out bg-background flex flex-col items-center justify-center",
                  isSecretVisible ? "h-[140px] opacity-100" : "h-0 opacity-0"
                )}>
                <LEDTicker text="VERONA STUDIO" />
              </div>
              <footer className="py-12 w-full px-6 md:px-12 bg-background/95 border-t border-foreground/5 shrink-0">
                <div className="w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex gap-8">
                    <Link href="https://discord.com/users/299338458231603202" className="text-muted-foreground hover:text-primary"><DiscordIcon className="h-5 w-5" /></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><WhatsAppIcon className="h-5 w-5" /></Link>
                    <Link href="mailto:00mezzomo@gmail.com" className="text-muted-foreground hover:text-primary"><Mail className="h-5 w-5" /></Link>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    <DigitalClock />
                    <CyberText text={`© ${year} LEONARDO VERONA.`} variant="decrypt" delay={500} corrupt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground" />
                  </div>
                </div>
              </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
