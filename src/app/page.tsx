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
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Mail, 
  ArrowRight,
  Maximize2,
  Terminal as TerminalIcon,
  Quote,
  X,
  Minus,
  Square
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 18.27 18.27 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0-5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 1 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292.074.074 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
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
  
  // Refs para controle de foco/roleta
  const focalFactorsRef = useRef(videos.map((_, i) => ({ val: i === 0 ? 1 : 0 })));
  const currentFocusedIndexRef = useRef(0);

  // Geração de parâmetros orbitais estáveis
  const orbitParams = useMemo(() => {
    const factor = containerWidth / 600;
    return videos.map((_, i) => ({
      rx: 260 * factor,
      ry: 140 * factor,
      offset: (i * 2 * Math.PI) / videos.length
    }));
  }, [videos.length, containerWidth]);

  const orbitParamsRef = useRef(orbitParams);
  useEffect(() => {
    orbitParamsRef.current = orbitParams;
  }, [orbitParams]);

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

  // Lógica de Troca de Foco (Roleta 10s)
  useEffect(() => {
    const rotateFocus = () => {
      const prev = currentFocusedIndexRef.current;
      const next = (prev + 1) % videos.length;
      currentFocusedIndexRef.current = next;

      // Transição suave dos fatores de foco via GSAP
      gsap.to(focalFactorsRef.current[prev], { val: 0, duration: 1.5, ease: "expo.out" });
      gsap.to(focalFactorsRef.current[next], { val: 1, duration: 1.5, ease: "expo.out" });
    };

    const interval = setInterval(rotateFocus, 10000);
    return () => clearInterval(interval);
  }, [videos.length]);

  // Motor de Animação rAF
  useEffect(() => {
    // Constantes para Órbita 3D Diagonal
    const TILT = 20 * (Math.PI / 180); // 20 graus de inclinação
    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);

    const animate = () => {
      timeRef.current += 0.0045; // Velocidade angular base ajustada
      
      videoRefs.current.forEach((el, i) => {
        if (!el || !orbitParamsRef.current[i]) return;
        
        const { rx, ry, offset } = orbitParamsRef.current[i];
        const baseAngle = timeRef.current + offset;
        const depth = Math.sin(baseAngle); // -1 (atrás) a 1 (frente)
        const ff = focalFactorsRef.current[i].val; // Fator de foco atual
        
        // Variação de velocidade por profundidade (Parallax)
        // O item acelera 15% na frente e desacelera atrás
        const effectiveAngle = baseAngle + depth * 0.15;
        
        // Coordenadas elípticas base 2D
        let ox = Math.cos(effectiveAngle) * rx;
        let oy = Math.sin(effectiveAngle) * ry;

        // APLICAÇÃO DE ÓRBITA 3D DIAGONAL (Rotação de Eixos)
        const ox_rotated = ox * cosT - oy * sinT;
        const oy_rotated = ox * sinT + oy * cosT;
        
        // Reforço 3D: Deslocamento vertical extra baseado no depth
        ox = ox_rotated;
        oy = oy_rotated + (depth * 15);
        
        // POSICIONAMENTO FINAL: Interpolação total entre órbita e centro exato (0,0)
        // Se ff = 1, a posição resultante é 0,0. Se ff = 0, a posição é orbital
        ox = ox * (1 - ff);
        oy = oy * (1 - ff);
        
        // ESCALA: Interpola entre a escala de profundidade (0.75-1.25) e o foco (1.2)
        const baseScale = 1.0 + depth * 0.25; 
        const scale = baseScale * (1 - ff) + (1.2 * ff);
        
        // BLUR: Elimina o blur conforme o foco aumenta
        const baseBlur = depth < 0 ? Math.abs(depth) * 6 : 0;
        const blur = baseBlur * (1 - ff);
        
        // Z-INDEX: Interpolação contínua para evitar saltos
        const baseZIndex = Math.round(50 + depth * 50);
        const zIndex = Math.round(baseZIndex * (1 - ff) + (200 + i) * ff);

        // Aplicação direta via style para performance
        el.style.transform = `translate3d(calc(-50% + ${ox}px), calc(-50% + ${oy}px), 0) scale(${scale})`;
        el.style.zIndex = zIndex.toString();
        el.style.filter = blur > 0 ? `blur(${blur}px)` : 'none';
        
        // Sombra dinâmica contínua: combina profundidade natural e destaque focal
        const shadowIntensity = Math.max(0, depth) * 0.6 + ff * 0.4;
        el.style.boxShadow = `0 ${20 * shadowIntensity}px ${40 * shadowIntensity}px -10px rgba(0, 0, 0, ${0.5 * shadowIntensity})`;
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Dependência vazia para manter o loop contínuo

  return (
    <div ref={containerRef} className="relative w-full h-[380px] sm:h-[450px] md:h-[550px] lg:h-[650px] pointer-events-none px-6 sm:px-10 lg:px-16 overflow-visible">
      <div className="absolute inset-0 pointer-events-auto" />
      
      {/* Container de Ancoragem Central */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0">
        {videos.map((vid, i) => (
          <div 
            key={vid.id}
            ref={(el) => { videoRefs.current[i] = el; }}
            className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-2xl overflow-hidden border border-foreground/10 bg-black shadow-2xl pointer-events-none transition-transform duration-700 hover:scale-105"
            style={{ 
              transform: 'translate(-50%, -50%)',
              opacity: 1,
              willChange: 'transform, filter'
            }}
          >
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
              startTime={vid.startTime}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

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
    
    return () => clearTimeout(timeoutId);
  }, [text, speed, onComplete]);

  return (
    <span className="whitespace-pre-wrap">
      {displayedText}
      {showCursor && <span className="w-2 h-4 bg-white inline-block ml-0.5 align-middle animate-cursor-blink" />}
    </span>
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

export default function PortfolioPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const [reachedBottom, setReachedBottom] = useState(false);
  const [year] = useState(new Date().getFullYear());
  const [isMounted, setIsMounted] = useState(false);
  
  const [faqHistory, setFaqHistory] = useState<{q: string, a: string}[]>([]);
  const [faqAvailableIndices, setFaqAvailableIndices] = useState<number[]>([0, 1, 2, 3, 4]);
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

  const categories = useMemo(() => [
    { id: 'cat-all', label: 'all' },
    { id: 'cat-shorts', label: 'shorts' },
    { id: 'cat-long', label: 'long' },
    { id: 'cat-motion', label: 'motion' },
    { id: 'cat-talking', label: 'talking' },
    { id: 'cat-vlogs', label: 'vlogs' }
  ], []);

  const clusterVideos = useMemo(() => {
    const raw = PlaceHolderImages.filter(i => 
      ['hero-grok', 'hero-me-in-one-min', 'hero-cook', 'hero-speed', 'hero-pensen'].includes(i.id)
    );
    
    const TIMINGS: Record<string, { focus: number; apice: number }> = {
      'hero-grok': { focus: 0, apice: 0 },
      'hero-me-in-one-min': { focus: 10, apice: 13 },
      'hero-cook': { focus: 20, apice: 0 },
      'hero-speed': { focus: 30, apice: 0 },
      'hero-pensen': { focus: 40, apice: 5 },
    };

    return raw.map(vid => ({
      ...vid,
      startTime: TIMINGS[vid.id] ? TIMINGS[vid.id].apice - TIMINGS[vid.id].focus : 0
    }));
  }, []);

  const catImages = useMemo(() => PlaceHolderImages.filter(i => i.id.startsWith('cat-')), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  useGSAP(() => {
    if (!isMounted || typeof window === 'undefined' || !mainRef.current) return;

    const heroLineRefs = document.querySelectorAll('.hero-line');
    const hudRef = document.querySelector('.hud-ref');
    const coordsRef = document.querySelector('.coords-ref');
    const statusBlockRef = document.querySelector('.status-block-ref');
    const ctaRef = document.querySelector('.cta-ref');
    const scrollIndicatorRef = document.querySelector('.scroll-indicator-ref');
    const statsBarRef = document.querySelector('.stats-bar-ref');
    const contentBlockRef = document.querySelector('.content-block-ref');
    const termRef = document.querySelector('.terminal-reveal-ref');

    const tl = gsap.timeline({ delay: 0.5 });

    tl.to([hudRef, coordsRef, statusBlockRef], {
      opacity: 1,
      duration: 0.1,
      ease: "none",
      stagger: 0.05
    }, 0);

    tl.to(statusBlockRef, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut"
    }, 1.5);

    if (heroLineRefs.length > 0) {
      tl.fromTo(heroLineRefs, 
        { y: '100%' }, 
        { 
          y: '0%', 
          duration: 1.2, 
          ease: "expo.out", 
          stagger: 0.18 
        }, 0.3);
    }

    tl.fromTo(ctaRef,
      { y: 12, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power2.out',
        onComplete: () => {
          if (scrollIndicatorRef) {
            gsap.fromTo(scrollIndicatorRef,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 1 }
            );
          }
        }
      }, 0.9);

    const sectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: statsBarRef,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    sectionTl.from(statsBarRef, { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" })
             .from(contentBlockRef, { opacity: 0, y: 30, duration: 1, ease: "power2.out" }, "-=0.4")
             .fromTo(termRef, 
                { opacity: 0, scale: 0.98 },
                { 
                  opacity: 1, 
                  scale: 1, 
                  duration: 1, 
                  ease: "power3.out",
                  onComplete: () => {
                    setTimeout(() => setCanStartBoot(true), 1000);
                  }
                }, "-=0.6");

  }, { dependencies: [isMounted], scope: mainRef });

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

  const handleTerminalAction = () => {
    if (faqAvailableIndices.length === 0 || typedQuestionsCount < faqAvailableIndices.length) return;
    const qIdx = faqAvailableIndices[activeFaqIndex];
    const item = FAQ_DATA[qIdx];
    setFaqHistory(prev => [...prev, item]);
    setFaqAvailableIndices(prev => prev.filter((_, i) => i !== activeFaqIndex));
    setActiveFaqIndex(0);
    setTypedQuestionsCount(0);
    setIsHeaderTyped(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isBooting || !isHeaderTyped || typedQuestionsCount < faqAvailableIndices.length) return;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveFaqIndex(prev => (prev > 0 ? prev - 1 : Math.max(0, faqAvailableIndices.length - 1)));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveFaqIndex(prev => (prev < faqAvailableIndices.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'Enter') {
      handleTerminalAction();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - faqPos.x, y: e.clientY - faqPos.y });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !terminalRef.current) return;
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      terminalRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isDragging) return;
      const rect = terminalRef.current?.getBoundingClientRect();
      if (rect) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        setFaqPos({ x: dx, y: dy });
      }
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div className="min-h-screen text-foreground transition-colors duration-500 bg-background relative">
      <header className="fixed top-0 w-full z-[100] border-b border-foreground/5 bg-background/80 backdrop-blur-md h-20">
        <div className="container mx-auto px-6 md:px-12 h-full flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-xl font-bold tracking-tighter font-serif italic text-foreground">
              LV<span className="text-primary">.</span>
            </Link>
            <div className="hidden lg:flex items-center gap-3 text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="tracking-[0.2em] font-mono text-[10px] uppercase">SYS_ONLINE // BRAZIL</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-mono text-[10px] uppercase tracking-widest">
            <Link href="#works" className="text-foreground/70 hover:text-foreground">Works</Link>
            <Link href="#contact" className="text-foreground/70 hover:text-foreground">Contact</Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main ref={mainRef} className="relative">
        <section className="relative z-0 h-screen w-full flex items-center justify-center bg-background overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="flex items-center gap-4 mb-6">
                <div className="hud-ref flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full opacity-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
                    [ 00 / EDITOR ]
                  </span>
                </div>
                <span className="coords-ref font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40 hidden sm:block opacity-0">
                  COORDINATES: 23.5505° S, 46.6333° W
                </span>
              </div>

              <h1 className="font-serif font-bold text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.9] tracking-tighter text-foreground mb-8">
                <div className="overflow-hidden">
                  <div className="hero-line translate-y-full">CRAFTING</div>
                </div>
                <div className="overflow-hidden">
                  <div className="hero-line translate-y-full">VISUAL</div>
                </div>
                <div className="overflow-hidden">
                  <div className="hero-line translate-y-full">
                    STORYTELLING<span className="text-primary">.</span>
                  </div>
                </div>
              </h1>

              <div className="max-w-md">
                <div className="cta-ref mt-6 flex items-center gap-6 opacity-0">
                  <Button variant="link" className="p-0 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground hover:text-primary group">
                    View Archive <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover:translate-x-2" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center lg:justify-end animate-image-reveal lg:-mr-12">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.05)_0%,transparent_70%)] pointer-events-none" />
              <FloatingVideoCluster videos={clusterVideos} />
            </div>
          </div>
          
          <div className="status-block-ref absolute bottom-10 left-10 pointer-events-none hidden md:block opacity-0">
            <div className="font-mono text-[8px] uppercase tracking-[0.4em] flex flex-col gap-1">
              <span>System: Active</span>
              <span>Buffer: Locked</span>
              <span>Layer: 01_Hero</span>
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
          <section id="works" className="w-full py-12 sticky top-20 z-[90] bg-background border-b border-t border-foreground/5 shadow-sm">
            <div className="container mx-auto px-6 md:px-12 flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
              {categories.map((cat) => {
                const img = catImages.find(i => i.id === cat.id);
                return (
                  <button 
                    key={cat.label} 
                    onClick={() => handleCategoryClick(cat.label)}
                    className={cn(
                      "category-card group relative overflow-hidden cursor-pointer w-full md:flex-1 h-20 max-w-full md:max-w-[220px]",
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
          <CategoryFeed 
            category={activeCategory} 
            onClose={handleCloseFeed} 
          />
        </div>

        <section className="py-24 bg-background overflow-hidden border-t border-foreground/5">
          <div className="container mx-auto px-6 md:px-12">
            
            <div className="stats-bar-ref flex justify-center border-b border-foreground/5 pb-10 mb-20">
              <div className="flex flex-wrap gap-12 md:gap-24 items-center">
                <div className="flex flex-col items-center">
                  <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-primary mb-1">[ YEARS ]</span>
                  <span className="text-2xl font-bold font-mono tracking-tighter opacity-80">+6</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-primary mb-1">[ CLIENTS ]</span>
                  <span className="text-2xl font-bold font-mono tracking-tighter opacity-80">+12</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-primary mb-1">[ PROJECTS ]</span>
                  <span className="text-2xl font-bold font-mono tracking-tighter opacity-80">+80</span>
                </div>
              </div>
            </div>

            <div className="content-block-ref grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-end">
              <div className="lg:col-span-9">
                <div className="relative">
                  <Quote className="absolute -top-12 -left-8 w-24 h-24 text-foreground/5 pointer-events-none -z-10" />
                  <p className="text-3xl md:text-6xl font-serif italic leading-[1.05] text-foreground mb-8">
                    &quot;Leonardo has an eye for pacing that is rare to find. He transformed our raw footage into a cinematic experience.&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-px bg-primary" />
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] uppercase tracking-widest font-bold">James Huang</span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">Creative Director @ Void Studio</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 flex flex-col gap-8 items-center lg:items-end">
                <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-primary">[ POWERED_BY ]</span>
                <div className="flex flex-col gap-6 w-full lg:w-auto">
                  {[
                    { name: 'Premiere Pro', label: 'Pr', bg: '#00005B', text: '#9999FF' },
                    { name: 'After Effects', label: 'Ae', bg: '#2C005E', text: '#D191FF' },
                    { name: 'Photoshop', label: 'Ps', bg: '#001E36', text: '#31A8FF' },
                    { name: 'Illustrator', label: 'Ai', bg: '#330000', text: '#FF9A00' }
                  ].map((tech) => (
                    <div key={tech.name} className="flex items-center gap-4 group justify-center lg:justify-end">
                      <span className="font-serif italic text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">{tech.name}</span>
                      <div 
                        className="w-14 h-14 flex items-center justify-center rounded shadow-xl transition-transform group-hover:scale-110"
                        style={{ backgroundColor: tech.bg }}
                      >
                        <span className="font-sans font-bold text-xl" style={{ color: tech.text }}>{tech.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {!isTerminalClosed && (
              <div 
                className={cn(
                  "mx-auto transition-all duration-500 terminal-reveal-ref",
                  isTerminalMinimized ? "h-10 opacity-60 w-80" : "opacity-100 h-auto w-fit"
                )}
              >
                <div 
                  ref={terminalRef} 
                  className={cn(
                    "bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 w-fit mx-auto",
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
        </section>

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
                <div className="container mx-auto md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
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
