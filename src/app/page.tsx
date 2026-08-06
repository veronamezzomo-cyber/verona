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
  Minus,
  X
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
  const isMountedRef = useRef(true);
  const [containerWidth, setContainerWidth] = useState(600);
  const orbitParamsRef = useRef<any[]>([]);
  
  const focalFactorsRef = useRef<number[]>([0, 0, 0, 0, 0]);
  const currentFocusedIndexRef = useRef<number>(-1);

  useEffect(() => {
    isMountedRef.current = true;
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      isMountedRef.current = false;
    };
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
      if (!isMountedRef.current) return;
      timeRef.current += 0.006;
      const expansion = expansionRef.current;

      itemRefs.current.filter(Boolean).forEach((el, i) => {
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
      if (!isMountedRef.current) return;
      const nextIndex = (currentFocusedIndexRef.current + 1) % videos.length;
      const prevIndex = currentFocusedIndexRef.current;

      if (prevIndex !== -1) {
        gsap.to(focalFactorsRef.current, {
          [prevIndex]: 0,
          duration: 1.5,
          ease: 'expo.out'
        });
      }

      gsap.to(focalFactorsRef.current, {
        [nextIndex]: 1,
        duration: 1.5,
        ease: 'expo.out'
      });

      currentFocusedIndexRef.current = nextIndex;
    };

    const timer = setTimeout(() => {
      if (!isMountedRef.current) return;
      hasStartedRef.current = true;
      requestRef = requestAnimationFrame(animate);

      gsap.to(expansionRef, {
        current: 1,
        duration: 1.2,
        ease: 'power2.out',
        onComplete: () => {
          if (!isMountedRef.current) return;
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
    <div className="relative w-full h-[380px] sm:h-[450px] md:h-[550px] lg:h-[650px] flex items-center justify-center pointer-events-none px-6 sm:px-10 lg:px-16">
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
            startTime={(vid as any).startTime}
          />
        </div>
      ))}
    </div>
  );
}

const TypewriterText = ({ text, delay = 18 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);

  return <span>{displayedText}</span>;
};

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const [reachedBottom, setReachedBottom] = useState(false);
  const [year] = useState(new Date().getFullYear());
  const [isMounted, setIsMounted] = useState(false);
  
  // Interactive FAQ Terminal State
  const [faqHistory, setFaqHistory] = useState<{q: string, a: string}[]>([]);
  const [faqAvailableIndices, setFaqAvailableIndices] = useState([0, 1, 2, 3, 4]);
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const [hoverFaqIndex, setHoverFaqIndex] = useState<number | null>(null);
  const [isTerminalFocused, setIsTerminalFocused] = useState(false);
  
  // Draggable FAQ State
  const [faqPos, setFaqPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Refs for Animations
  const mainRef = useRef<HTMLDivElement>(null);
  const heroLineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hudRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);
  const statusBlockRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  // Pinned Section Refs
  const pinnedSectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsValuesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const toolsRef = useRef<HTMLDivElement>(null);
  const toolsItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => [
    { id: 'cat-all', label: 'all' },
    { id: 'cat-shorts', label: 'shorts' },
    { id: 'cat-long', label: 'long' },
    { id: 'cat-motion', label: 'motion' },
    { id: 'cat-talking', label: 'talking' },
    { id: 'cat-vlogs', label: 'vlogs' }
  ], []);

  const faqData = [
    { q: "TURNAROUND MÉDIO?", a: "Shorts: 24-48h. Long-Form: 5-7 dias úteis." },
    { q: "TECH STACK?", a: "Premiere Pro, After Effects, Photoshop, Illustrator." },
    { q: "REVISÕES?", a: "2 rodadas inclusas para ajuste de pacing e ritmo." },
    { q: "COLOR GRADING?", a: "Tratamento profissional incluso em todos os pacotes." },
    { q: "PAGAMENTO?", a: "50% antecipado / 50% na aprovação final." }
  ];

  const handleTerminalAction = () => {
    if (faqAvailableIndices.length === 0) return;
    const qIndex = faqAvailableIndices[activeFaqIndex];
    setFaqHistory(prev => [...prev, faqData[qIndex]]);
    setFaqAvailableIndices(prev => prev.filter((_, i) => i !== activeFaqIndex));
    setActiveFaqIndex(0);
    setHoverFaqIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (faqAvailableIndices.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveFaqIndex(prev => (prev + 1) % faqAvailableIndices.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveFaqIndex(prev => (prev - 1 + faqAvailableIndices.length) % faqAvailableIndices.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleTerminalAction();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - faqPos.x,
      y: e.clientY - faqPos.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = e.clientX - dragStartRef.current.x;
      const newY = e.clientY - dragStartRef.current.y;
      const constrainedY = Math.max(-window.innerHeight * 0.4, Math.min(window.innerHeight * 0.4, newY));
      setFaqPos({ x: newX, y: constrainedY });
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
  }, [isDragging]);

  const clusterVideos = useMemo(() => PlaceHolderImages.filter(i => i.id.startsWith('hero-cluster-')), []);
  const catImages = useMemo(() => PlaceHolderImages.filter(i => i.id.startsWith('cat-')), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(() => {
    if (!isMounted || typeof window === 'undefined') return;

    const heroLines = heroLineRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const tl = gsap.timeline({ delay: 0.5 });

    // FASE A (Boot)
    tl.to([hudRef.current, coordsRef.current, statusBlockRef.current], {
      opacity: 1,
      duration: 0.1,
      ease: "none",
      stagger: 0.05
    }, 0);

    tl.to(statusBlockRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut"
    }, 1.5);

    // FASE B (Reveal)
    if (heroLines.length > 0) {
      tl.fromTo(heroLines, 
        { y: '100%' }, 
        { 
          y: '0%', 
          duration: 1.2, 
          ease: "expo.out", 
          stagger: 0.18 
        }, 0.3);
    }

    // FASE C (Context)
    tl.fromTo(ctaRef.current,
      { y: 12, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power2.out',
        onComplete: () => {
          if (scrollIndicatorRef.current) {
            gsap.fromTo(scrollIndicatorRef.current,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 1 }
            );
            gsap.to(scrollIndicatorRef.current, {
              opacity: 0.35,
              duration: 2.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
        }
      }, 0.9);

    // PINNED SECTION IMPLEMENTATION - MASTER TIMELINE
    if (pinnedSectionRef.current && statsRef.current && toolsRef.current && testimonialRef.current && faqRef.current) {
      const supportTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedSectionRef.current,
          start: "top 80px",
          end: "+=400%",
          pin: true,
          scrub: 1,
          markers: false,
        }
      });

      // Initial state reset
      gsap.set([toolsRef.current, testimonialRef.current, faqRef.current], { opacity: 0, pointerEvents: 'none' });
      gsap.set(statsRef.current, { opacity: 1, pointerEvents: 'auto' });
      gsap.set(faqRef.current, { scale: 0.95 });

      supportTl
        // 1. Stats Counter
        .to(statsValuesRef.current, { innerHTML: 0, duration: 0.01, snap: { innerHTML: 1 } }, 0)
        .from(statsValuesRef.current, { innerHTML: 0, duration: 5, snap: { innerHTML: 1 }, stagger: 0.5, ease: 'power2.out' }, 0)
        .to({}, { duration: 8 }) // Pause on stats
        
        // 2. Transition Stats -> Tools (OVERLAP)
        .to(statsRef.current, { opacity: 0, pointerEvents: 'none', duration: 5 }, "stats-out")
        .to(toolsRef.current, { opacity: 1, pointerEvents: 'auto', duration: 5 }, "stats-out")
        .from(toolsItemsRef.current, { y: 40, opacity: 0, stagger: 0.2, duration: 4, ease: 'power3.out' }, "stats-out+=2")
        .to({}, { duration: 8 }) // Pause on tools
        
        // 3. Transition Tools -> Testimonial (OVERLAP)
        .to(toolsRef.current, { opacity: 0, pointerEvents: 'none', duration: 5 }, "tools-out")
        .to(testimonialRef.current, { opacity: 1, pointerEvents: 'auto', duration: 5 }, "tools-out")
        .from(testimonialRef.current.querySelector('p'), { y: 20, opacity: 0, duration: 4, ease: 'power2.out' }, "tools-out+=2")
        .to({}, { duration: 8 }) // Pause on testimonial
        
        // 4. Transition Testimonial -> FAQ (OVERLAP)
        .to(testimonialRef.current, { opacity: 0, pointerEvents: 'none', duration: 5 }, "test-out")
        .to(faqRef.current, { opacity: 1, scale: 1, pointerEvents: 'auto', duration: 5 }, "test-out")
        .to({}, { duration: 15 }); // Final pause on FAQ
    }

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
                <div 
                  ref={hudRef}
                  className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full opacity-0"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
                    [ 00 / EDITOR ]
                  </span>
                </div>
                <span 
                  ref={coordsRef}
                  className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40 hidden sm:block opacity-0"
                >
                  COORDINATES: 23.5505° S, 46.6333° W
                </span>
              </div>

              <h1 className="font-serif font-bold text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.9] tracking-tighter text-foreground mb-8">
                <div className="overflow-hidden">
                  <div ref={(el) => { heroLineRefs.current[0] = el; }} className="translate-y-full">CRAFTING</div>
                </div>
                <div className="overflow-hidden">
                  <div ref={(el) => { heroLineRefs.current[1] = el; }} className="translate-y-full">VISUAL</div>
                </div>
                <div className="overflow-hidden">
                  <div ref={(el) => { heroLineRefs.current[2] = el; }} className="translate-y-full">
                    STORYTELLING<span className="text-primary">.</span>
                  </div>
                </div>
              </h1>

              <div className="max-w-md">
                <div 
                  ref={ctaRef}
                  className="mt-6 flex items-center gap-6 opacity-0"
                >
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
          
          <div 
            ref={statusBlockRef}
            className="absolute bottom-10 left-10 pointer-events-none hidden md:block opacity-0"
          >
            <div className="font-mono text-[8px] uppercase tracking-[0.4em] flex flex-col gap-1">
              <span>System: Active</span>
              <span>Buffer: Locked</span>
              <span>Layer: 01_Hero</span>
            </div>
          </div>

          <div 
            ref={scrollIndicatorRef}
            className="absolute bottom-10 left-10 sm:left-1/2 sm:-translate-x-1/2 flex flex-col items-center gap-4 opacity-0 pointer-events-none z-10"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-foreground/40">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent shadow-[0_0_8px_rgba(var(--primary),0.3)]" />
          </div>
          
          <div className="absolute top-32 right-10 pointer-events-none hidden md:block opacity-20">
            <Maximize2 className="w-4 h-4 text-foreground mb-2" />
            <div className="font-mono text-[8px] uppercase tracking-[0.4em] [writing-mode:vertical-rl]">
              Visual_Archive_v3.0
            </div>
          </div>
        </section>

        <div className="relative z-10 flex flex-col bg-background transition-all duration-500">
          <section id="works" className="w-full py-12 sticky top-20 z-[90] bg-background border-b border-t border-foreground/5 shadow-sm">
            <div className="container mx-auto px-6 md:px-12 flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
              {categories.map((cat, index) => {
                const img = catImages.find(i => i.id === cat.id);
                return (
                  <button 
                    key={cat.label} 
                    ref={(el) => { categoryRefs.current[index] = el; }}
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

        {/* PINNED SUPPORT EXPERIENCE SECTION */}
        <section 
          ref={pinnedSectionRef} 
          className="relative z-20 h-[calc(100vh-5rem)] bg-background border-t border-foreground/5 overflow-hidden"
        >
          <div className="container mx-auto px-6 md:px-12 h-full relative">
            
            {/* 1. STATS BLOCK */}
            <div ref={statsRef} className="absolute inset-0 flex flex-col items-center justify-center pt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 text-center w-full max-w-5xl">
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary mb-1">[ EXP ]</span>
                  <span className="text-5xl md:text-7xl font-mono font-bold tracking-tighter leading-none">
                    +<span ref={(el) => { statsValuesRef.current[0] = el; }}>6</span>Y
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary mb-1">[ CLN ]</span>
                  <span className="text-5xl md:text-7xl font-mono font-bold tracking-tighter leading-none">
                    +<span ref={(el) => { statsValuesRef.current[1] = el; }}>12</span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary mb-1">[ PRJ ]</span>
                  <span className="text-5xl md:text-7xl font-mono font-bold tracking-tighter leading-none">
                    +<span ref={(el) => { statsValuesRef.current[2] = el; }}>80</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 2. TECH STACK BLOCK */}
            <div ref={toolsRef} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary mb-12">[ TECH_STACK ]</span>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {[
                  { name: "Premiere Pro", label: "Pr", bg: "#00005B", text: "#9999FF" },
                  { name: "After Effects", label: "Ae", bg: "#2C005E", text: "#D191FF" },
                  { name: "Photoshop", label: "Ps", bg: "#001E36", text: "#31A8FF" },
                  { name: "Illustrator", label: "Ai", bg: "#330000", text: "#FF9A00" }
                ].map((tool, i) => (
                  <div 
                    key={tool.name} 
                    ref={(el) => { toolsItemsRef.current[i] = el; }}
                    className="flex flex-col items-center gap-4 group"
                  >
                    <div 
                      className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-lg shadow-2xl border border-white/5 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: tool.bg }}
                    >
                      <span className="font-sans font-bold text-3xl md:text-4xl" style={{ color: tool.text }}>
                        {tool.label}
                      </span>
                    </div>
                    <span className="font-serif italic text-sm text-muted-foreground opacity-60">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. TESTIMONIAL BLOCK */}
            <div ref={testimonialRef} className="absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none px-4">
              <div className="max-w-3xl text-center md:text-left">
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary mb-8 block">[ CLIENT_FEEDBACK ]</span>
                <div className="relative">
                  <Quote className="absolute -top-10 -left-10 w-16 h-16 text-foreground/5 -z-10" />
                  <p className="text-2xl md:text-4xl font-serif italic leading-snug text-foreground mb-8">
                    &quot;Leonardo has an eye for pacing that is rare to find. He transformed our raw footage into a cinematic experience.&quot;
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <div className="w-12 h-px bg-primary" />
                    <div className="flex flex-col">
                      <span className="font-mono text-[11px] uppercase tracking-widest font-bold">James Huang</span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">Creative Director @ Void Studio</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. FAQ TERMINAL BLOCK */}
            <div ref={faqRef} className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none">
              <div className="w-full max-w-4xl relative">
                <div className="flex flex-col mb-4 items-center">
                  <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary mb-2">[ ARCHIVE_FAQ ]</span>
                </div>

                <div 
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                  onFocus={() => setIsTerminalFocused(true)}
                  onBlur={() => setIsTerminalFocused(false)}
                  style={{ transform: `translate(${faqPos.x}px, ${faqPos.y}px)` }}
                  className="bg-[#0a0a0a] text-[#f0f0f0] font-mono shadow-2xl relative overflow-hidden outline-none border border-white/10 rounded-md select-none group"
                >
                  {/* Title Bar */}
                  <div 
                    onMouseDown={handleMouseDown}
                    className="h-8 bg-[#1a1a1a] flex items-center justify-between px-4 cursor-grab active:cursor-grabbing border-b border-white/5"
                  >
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40">ROOT@VERONA // ARCHIVE_CLI</span>
                    <div className="flex gap-3 text-white/20">
                      <Minus className="w-3.5 h-3.5" />
                      <X className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Terminal Body */}
                  <div className="p-8 space-y-6 h-[400px] overflow-y-auto scrollbar-hide relative">
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] animate-rolling-scanlines" />
                    
                    {!isTerminalFocused && faqAvailableIndices.length > 0 && (
                      <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[1px] flex items-center justify-center cursor-pointer pointer-events-none">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-[#33ff33] opacity-60 animate-pulse">
                          [ click to activate terminal ]
                        </span>
                      </div>
                    )}

                    {faqHistory.map((item, i) => (
                      <div key={i} className="animate-in fade-in duration-300">
                        <div className="flex items-center gap-2 text-[#33ff33]/60 mb-1">
                          <span>ROOT@VERONA:~/FAQ$</span>
                          <span className="text-white">{item.q}</span>
                        </div>
                        <div className="pl-4 text-[#33ff33] text-sm leading-relaxed mb-4">
                          <TypewriterText text={item.a} />
                        </div>
                      </div>
                    ))}

                    {faqAvailableIndices.length > 0 ? (
                      <div className="mt-8 border-t border-white/5 pt-6">
                        <div className="text-[10px] uppercase tracking-widest text-white/20 mb-4 flex items-center gap-2">
                          Select Query (Arrows + Enter)
                        </div>
                        <div className="space-y-3">
                          {faqAvailableIndices.map((qIdx, i) => (
                            <div 
                              key={qIdx}
                              onClick={() => {
                                setActiveFaqIndex(i);
                                handleTerminalAction();
                              }}
                              onMouseEnter={() => setHoverFaqIndex(i)}
                              onMouseLeave={() => setHoverFaqIndex(null)}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors border border-transparent",
                                activeFaqIndex === i ? "bg-[#33ff33]/10 border-[#33ff33]/20 text-[#33ff33]" : 
                                hoverFaqIndex === i ? "bg-white/5 text-white/80" : "text-white/30"
                              )}
                            >
                              <span className="w-4 shrink-0">{activeFaqIndex === i ? ">" : " "}</span>
                              <span className="text-xs uppercase tracking-tight flex items-center">
                                {faqData[qIdx].q}
                                {activeFaqIndex === i && <span className="w-1.5 h-4 bg-[#33ff33] ml-2 animate-cursor-blink" />}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-12 text-center py-8 border border-white/5 bg-white/[0.02]">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-[#33ff33]/40">System Nominal. All queries executed.</span>
                      </div>
                    )}
                  </div>

                  {/* Status Bar */}
                  <div className="px-6 py-3 bg-[#1a1a1a] border-t border-white/5 flex justify-between items-center opacity-40">
                    <span className="text-[8px] tracking-[0.4em] flex items-center">
                      ROOT@VERONA:~/FAQ$ <span className="w-1.5 h-3 bg-[#33ff33] ml-1 animate-cursor-blink" />
                    </span>
                    <TerminalIcon className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

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
