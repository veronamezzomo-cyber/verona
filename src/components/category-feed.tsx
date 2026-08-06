'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { X, Lock, Sparkles, Cpu, Layers, Zap, Activity, Terminal, Minus, Square } from 'lucide-react';
import { EditableVideo } from '@/components/editable-video';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useToast } from '@/hooks/use-toast';
import { VIDEOS_DATA, ProjectVideo } from '@/lib/videos-data';

interface CategoryFeedProps {
  category: string | null;
  onClose: () => void;
  cardElements: HTMLButtonElement[];
}

interface LineCoord {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface MetadataItemProps {
  label: string;
  value: string;
  icon: React.ElementType;
  xFactor: number;
  yFactor: number;
  mousePos: { x: number; y: number };
}

function MetadataItem({ label, value, icon: Icon, xFactor, yFactor, mousePos }: MetadataItemProps) {
  const shiftX = (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.03 * xFactor;
  const shiftY = (mousePos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * 0.03 * yFactor;

  return (
    <div 
      className="absolute z-[70] bg-background/40 backdrop-blur-xl border border-primary/20 p-3 rounded-lg flex items-center gap-3 pointer-events-none transition-transform duration-300 ease-out"
      style={{ 
        transform: `translate(${shiftX}px, ${shiftY}px)`,
        top: `${50 + yFactor * 28}%`,
        left: `${50 + xFactor * 38}%`,
      }}
    >
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="flex flex-col">
        <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground font-mono">{label}</span>
        <span className="text-[10px] uppercase font-bold text-foreground tracking-widest">{value}</span>
      </div>
    </div>
  );
}

function CyberTerminal({ text }: { text: string }) {
  const [display, setDisplay] = useState('');
  const [phase, setPhase] = useState<'hello' | 'cls' | 'typing'>('hello');

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (phase === 'hello') {
      setDisplay('HELLO WORLD');
      timeout = setTimeout(() => setPhase('cls'), 1200);
    } else if (phase === 'cls') {
      setDisplay('CLS');
      timeout = setTimeout(() => {
        setDisplay('');
        setPhase('typing');
      }, 400);
    } else if (phase === 'typing') {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          const content = text.substring(0, i);
          const placeholders = '_'.repeat(text.length - i);
          setDisplay(content + placeholders);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }

    return () => clearTimeout(timeout);
  }, [phase, text]);

  return (
    <div className="w-full bg-black/85 border border-primary/30 backdrop-blur-2xl font-mono relative overflow-hidden flex flex-col shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
      {/* Title Bar - Fake Window Controls */}
      <div className="flex items-center justify-between px-4 py-2 bg-primary/10 border-b border-primary/20 select-none">
        <div className="flex items-center gap-3">
          <Terminal className="w-3 h-3 text-primary animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.3em] text-primary font-bold">Verona_OS // Project_Terminal v4.0.2</span>
        </div>
        <div className="flex items-center gap-4">
          <Minus className="w-3 h-3 text-primary/40 hover:text-primary cursor-pointer transition-colors" />
          <Square className="w-2.5 h-2.5 text-primary/40 hover:text-primary cursor-pointer transition-colors" />
          <X className="w-3.5 h-3.5 text-primary/40 hover:text-primary cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Content Area - Min 19 lines space */}
      <div className="p-6 flex-1 min-h-[380px] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        
        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex items-start gap-4">
            <span className="text-primary/40 text-[10px] select-none shrink-0">$ root@verona:~/logs/</span>
            <div className="text-[11px] leading-relaxed tracking-wider text-foreground break-words uppercase max-w-[85%]">
              {display}
              <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
            </div>
          </div>

          {/* Fake history lines to fill vertical space */}
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="flex items-start gap-4 opacity-[0.05] select-none pointer-events-none">
               <span className="text-primary/40 text-[10px]">$</span>
               <div className="w-full h-[1px] bg-primary/20 mt-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-6 py-3 border-t border-primary/10 flex justify-between items-center bg-black/40">
        <div className="flex gap-6 text-[8px] uppercase tracking-[0.2em] text-primary/40">
          <span>Buffer: OK</span>
          <span>Ln: {Math.ceil(display.length / 50)}</span>
          <span>Col: {display.length % 50}</span>
          <span>Enc: UTF-8</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
          <span className="text-[8px] uppercase tracking-[0.3em] text-primary/60">System_Ready_</span>
        </div>
      </div>
    </div>
  );
}

export function CategoryFeed({ category, onClose, cardElements }: CategoryFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const connectorsRef = useRef<SVGSVGElement>(null);
  const activeLayerLabelRef = useRef<HTMLSpanElement>(null);
  const headerDividerRef = useRef<HTMLDivElement>(null);
  const pickStyleTextRef = useRef<HTMLDivElement>(null);
  const compactStatusRef = useRef<HTMLDivElement>(null);
  
  const [clickCount, setClickCount] = useState(0);
  const [lineCoords, setLineCoords] = useState<LineCoord[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectVideo | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { toast } = useToast();

  const isExpanded = !!category;
  const isVerticalFormat = category === 'shorts' || category === 'talking';

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (selectedProject) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  }, [selectedProject]);

  const updateLines = useCallback(() => {
    if (!connectorsRef.current || !containerRef.current || !cardElements.length) return;

    const svgRect = connectorsRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const destX = (containerRect.left + containerRect.width / 2) - svgRect.left;
    const destY = 0;

    const coords = cardElements.map(card => {
      const cardRect = card.getBoundingClientRect();
      const label = card.querySelector('span')?.textContent?.toLowerCase().trim() || '';
      return {
        id: label,
        x1: (cardRect.left + cardRect.width / 2) - svgRect.left,
        y1: cardRect.bottom - svgRect.top,
        x2: destX,
        y2: destY
      };
    });

    setLineCoords(coords);
  }, [cardElements]);

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        updateLines();
      }, 1050);
      return () => clearTimeout(timer);
    }
  }, [isExpanded, category, updateLines]);

  useEffect(() => {
    window.addEventListener('resize', updateLines);
    return () => window.removeEventListener('resize', updateLines);
  }, [updateLines]);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    if (isExpanded) {
      gsap.to(containerRef.current, {
        height: '85vh',
        opacity: 1,
        duration: 1.2,
        ease: 'expo.inOut',
        overwrite: 'auto'
      });
      
      gsap.fromTo(contentRef.current, 
        { y: 60, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, delay: 0.5, ease: 'power4.out' }
      );
    } else {
      gsap.to(containerRef.current, {
        height: '120px',
        duration: 0.8,
        ease: 'power3.inOut',
        overwrite: 'auto'
      });
      setSelectedProject(null);
    }
  }, [isExpanded, category]);

  const handleInteraction = (item: ProjectVideo) => {
    if (clickCount >= 8) {
      toast({
        title: "Interaction Limit Reached",
        description: "You've used your 8 interaction credits for this session.",
        variant: "destructive"
      });
      return;
    }
    setClickCount(prev => prev + 1);
    setSelectedProject(item);
  };

  const closeTheater = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProject(null);
  };

  return (
    <div className="relative" onMouseMove={handleMouseMove}>
      <svg 
        ref={connectorsRef}
        className="absolute top-0 left-0 w-full pointer-events-none overflow-visible z-[95]"
        style={{ height: '120px' }} 
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
              strokeDasharray={isActive ? "10 100" : "4 4"}
              className={cn(
                "transition-all duration-500",
                isActive ? "opacity-100" : "opacity-40"
              )}
              style={{ 
                filter: isActive ? 'url(#glow-line)' : 'none',
                animation: isActive ? 'energy-pulse 2s ease-in-out infinite' : 'dash-pulse 20s linear infinite'
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
        style={{ height: '120px' }}
      >
        <div className="absolute top-4 left-6 md:left-12 flex flex-col gap-2 z-20 pointer-events-none">
          <div className="flex flex-col gap-1">
            <span 
              ref={activeLayerLabelRef}
              className={cn(
                "font-mono text-[9px] uppercase tracking-[0.4em] text-primary font-bold",
                isExpanded && "animate-active-layer-blink"
              )}
            >
              Active Layer
            </span>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-2xl md:text-3xl italic font-bold text-foreground lowercase leading-none">
                {category || 'none'}
              </h2>
              {category && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)]" />}
            </div>
          </div>
          
          <div className="flex flex-col gap-1 mt-1">
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Session Status</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                  <div key={i} className={cn(
                    "w-1.5 h-1.5 rounded-full border border-primary/30 transition-colors",
                    i < clickCount ? "bg-primary border-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" : ""
                  )} />
                ))}
              </div>
              <span className="font-mono text-[9px] uppercase tracking-tighter text-foreground ml-1">Credits: {8 - clickCount}/8</span>
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
          <div 
            ref={headerDividerRef}
            className="flex items-center justify-end py-10 px-12 border-b border-foreground/5 shrink-0"
          >
            <button 
              onClick={onClose}
              className="font-mono text-[10px] uppercase tracking-widest hover:text-primary gap-2 flex items-center transition-all group px-8 py-4 border border-foreground/10 rounded-full pointer-events-auto hover:bg-primary/5 hover:border-primary/20 hover:shadow-[0_0_15px_rgba(var(--primary),0.2)]"
            >
              Collapse Section <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
            </button>
          </div>

          <div className="flex-1 relative overflow-y-auto scrollbar-hide pointer-events-auto pb-20 px-6 md:px-12 lg:px-24">
            <div 
              className={cn(
                "grid gap-12 md:gap-16 lg:gap-24 max-w-[1600px] mx-auto pt-12 transition-all duration-700",
                selectedProject ? "opacity-10 blur-xl scale-95" : "opacity-100 blur-0 scale-100",
                isVerticalFormat 
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
                  : "grid-cols-1 md:grid-cols-2"
              )}
            >
              {VIDEOS_DATA.map((item, index) => (
                <div 
                  key={item.id} 
                  className={cn(
                    "flex flex-col gap-6 group transform transition-all duration-700",
                    isExpanded ? "animate-slide-up opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div 
                    onClick={() => handleInteraction(item)}
                    className={cn(
                      "relative bg-muted overflow-hidden transition-all duration-700 border border-foreground/5 shadow-2xl",
                      isVerticalFormat 
                        ? "aspect-[2/3]" 
                        : "aspect-[16/9]",
                      clickCount >= 8 ? "grayscale opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/30"
                    )}
                  >
                    <EditableVideo 
                      src={item.videoUrl} 
                      storageKey={`v3-feed-grid-${item.id}`}
                      fill
                      className="object-cover scale-[1.02] group-hover:scale-100 transition-transform duration-[1.5s] ease-out"
                      autoPlay
                      muted
                      loop
                      playsInline
                      hideControls
                    />
                    
                    {clickCount >= 8 && (
                      <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-2">
                          <Lock className="w-8 h-8 text-white opacity-40" />
                          <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">Access Denied</span>
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                  
                  <div className="flex items-center justify-between px-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground font-bold border-b border-transparent group-hover:border-primary transition-colors">
                      {item.title}
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/60">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedProject && (
            <div 
              className="absolute inset-0 z-50 flex items-center justify-center p-6 md:p-12 animate-in fade-in zoom-in-95 duration-500"
              onClick={closeTheater}
            >
              <div className="absolute inset-0 bg-background/60 backdrop-blur-md" />
              
              <div 
                className={cn(
                  "relative z-[60] flex flex-col gap-0",
                  isVerticalFormat ? "w-full max-w-[400px]" : "w-full max-w-[1000px]"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={cn(
                  "relative shadow-[0_0_100px_rgba(var(--primary),0.2)] border border-primary/30 bg-black overflow-visible",
                  isVerticalFormat ? "aspect-[2/3]" : "aspect-[16/9]"
                )}>
                  <EditableVideo 
                    src={selectedProject.videoUrl} 
                    storageKey={`theater-${selectedProject.id}`}
                    fill
                    className="object-cover"
                    autoPlay
                    controls
                  />

                  <MetadataItem label="Software" value="After Effects" icon={Cpu} xFactor={-1} yFactor={-1} mousePos={mousePos} />
                  <MetadataItem label="Grade" value="DaVinci Resolve" icon={Activity} xFactor={1} yFactor={-1} mousePos={mousePos} />
                  <MetadataItem label="Master" value="4K / 60FPS" icon={Layers} xFactor={-1} yFactor={1} mousePos={mousePos} />
                  <MetadataItem label="Engine" value="ProRes 422" icon={Zap} xFactor={1} yFactor={1} mousePos={mousePos} />

                  <button 
                    onClick={closeTheater}
                    className="absolute -top-12 right-0 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground hover:text-primary transition-colors"
                  >
                    Close Archive <X className="w-4 h-4" />
                  </button>
                </div>

                <CyberTerminal text={selectedProject.description || 'HELLO WORLD'} />
              </div>
            </div>
          )}

          <div className="py-6 pl-24 pr-12 border-t border-foreground/5 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/40 shrink-0">
            <div className="flex gap-8">
              <span className="flex items-center gap-2">
                Status: <span className="animate-pulse text-foreground/60">Simultaneous Processing</span>
              </span>
              <span>Buffer: Dynamic Grid</span>
              <span>V-Sync: Active</span>
            </div>
            <div>© Verona Studio • Visual Engine v3.0 // LUXURY EDITION</div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes dash-pulse {
          to { stroke-dashoffset: -100; }
        }
        @keyframes energy-pulse {
          from { stroke-dashoffset: 110; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          to { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes active-layer-blink {
          0%, 80%, 100% { opacity: 0.4; filter: none; }
          90% { opacity: 1; filter: drop-shadow(0 0 4px hsl(var(--primary))); }
        }
        .animate-active-layer-blink {
          animation: active-layer-blink 2s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
