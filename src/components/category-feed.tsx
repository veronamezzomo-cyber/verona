'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { X, Lock, Sparkles, Terminal, Minus, Square, Maximize2 } from 'lucide-react';
import { EditableVideo } from '@/components/editable-video';
import { EditableImage } from '@/components/editable-image';
import { cn } from '@/lib/utils';
import gsap_real from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useToast } from '@/hooks/use-toast';
import { VIDEOS_DATA, ProjectVideo } from '@/lib/videos-data';

if (typeof window !== 'undefined') {
  gsap_real.registerPlugin(ScrollTrigger);
}

interface CategoryFeedProps {
  category: string | null;
  onClose: () => void;
}

interface CyberTerminalProps {
  text: string;
  onClose: () => void;
  onMinimize: () => void;
  isMinimized?: boolean;
}

const GLYPHS = '0123456789ABCDEF!@#$%^&*()_+<>?:';

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

function CyberTerminal({ text, onClose, onMinimize, isMinimized }: CyberTerminalProps) {
  const [history, setHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory([
      `>> INITIATING SOURCE READ...`,
      `[PROJECT_DESCRIPTION]:`,
      text,
      `----------------------------------------`,
      `[SYSTEM_READY]: CONNECTION_STABLE`,
      `[PROMPT]: TYPE "HELP" FOR COMMANDS`
    ]);
  }, [text]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const onMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.terminal-header') || isMinimized) return;
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const cmd = inputValue.toLowerCase().trim();
    let response = '';

    switch (cmd) {
      case 'help':
        response = 'AVAILABLE: HELP, CLS, STATUS, ABOUT, EXIT';
        break;
      case 'cls':
        setHistory([]);
        setInputValue('');
        return;
      case 'status':
        response = 'SYSTEM_STATUS: NOMINAL | UPTIME: 1024h | LATENCY: 2ms';
        break;
      case 'about':
        response = 'VERONA STUDIO ENGINE V3.0 - BUILT FOR PERFORMANCE.';
        break;
      case 'exit':
        onClose();
        return;
      default:
        response = `Command "${cmd}" not recognized. Check "help".`;
    }

    setHistory(prev => [...prev, `C:\\Users\\Guest> ${inputValue}`, response, '']);
    setInputValue('');
  };

  if (isMinimized) return null;

  return (
    <div 
      className="w-full bg-card border border-primary/30 backdrop-blur-2xl font-mono relative overflow-hidden flex flex-col shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] cursor-auto select-text z-[70]"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onClick={(e) => {
        e.stopPropagation();
        inputRef.current?.focus();
      }}
    >
      <div 
        onMouseDown={onMouseDown}
        className="terminal-header flex items-center justify-between px-4 py-2 bg-muted border-b border-primary/10 select-none cursor-move active:bg-muted/80"
      >
        <div className="flex items-center gap-3">
          <X 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3.5 h-3.5 text-primary/60 hover:text-primary cursor-pointer transition-colors" 
          />
          <Minus 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-3.5 h-3.5 text-primary/60 hover:text-primary cursor-pointer transition-colors" 
          />
          <Square className="w-2.5 h-2.5 text-primary/10 cursor-not-allowed" />
        </div>

        <div className="flex items-center gap-2 pointer-events-none opacity-60">
          <span className="text-[9px] uppercase tracking-[0.3em] text-primary font-bold">Verona_OS // Cmd_Console</span>
          <Terminal className="w-3 h-3 text-primary animate-pulse" />
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="p-6 flex-1 h-[380px] md:h-[250px] relative overflow-y-auto cyber-scrollbar"
      >
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        
        <div className="flex flex-col relative z-10">
          {history.map((line, i) => {
            const isMeta = line.startsWith('>') || line.startsWith('[');
            const isDivider = line.startsWith('---');
            const isPath = line.includes('C:\\');
            const isBody = !isMeta && !isDivider && !isPath;

            return (
              <div key={i} className={cn(
                "text-[10px] md:text-[11px] tracking-[0.1em] break-words uppercase",
                isMeta ? "text-primary/30 font-bold mb-2 mt-4 first:mt-0" : "text-primary/90",
                isBody ? "text-primary/90 leading-relaxed mb-6 normal-case font-light pl-3 border-l-2 border-primary/10 italic" : "",
                isDivider ? "opacity-20 my-4" : "",
                isPath ? "text-primary/50 mt-4 font-bold" : ""
              )}>
                {line}
              </div>
            );
          })}
          
          <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4 pt-4 border-t border-primary/5">
            <span className="text-primary/40 text-[10px] shrink-0 font-bold">C:\Users\Guest&gt;</span>
            <input
              ref={inputRef}
              type="text"
              className="bg-transparent border-none outline-none text-primary text-[11px] w-full p-0 uppercase placeholder:text-primary/10"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
              placeholder="Waiting for input..."
            />
          </form>
        </div>
      </div>

      <div className="px-6 py-3 border-t border-primary/10 flex justify-between items-center bg-background/60 select-none">
        <div className="flex gap-6 text-[8px] uppercase tracking-[0.2em] text-primary/40">
          <span>Mode: Interactive</span>
          <span>Ln: {history.length}</span>
          <span>I/O: Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
          <span className="text-[8px] uppercase tracking-[0.3em] text-primary/60">Ready_</span>
        </div>
      </div>
    </div>
  );
}

export function CategoryFeed({ category, onClose }: CategoryFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [clickCount, setClickCount] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectVideo | null>(null);
  const [terminalStatus, setTerminalStatus] = useState<'open' | 'minimized' | 'closed'>('open');
  const { toast } = useToast();

  const isExpanded = !!category;
  const verticalCategories = ['shorts', 'talking'];

  const filteredVideos = useMemo(() => {
    if (!category || category === 'all') return VIDEOS_DATA;
    return VIDEOS_DATA.filter(video => video.category.includes(category));
  }, [category]);

  const closeTheater = useCallback(() => {
    setSelectedProject(null);
    setTerminalStatus('closed');
  }, []);

  useEffect(() => {
    setSelectedProject(null);
    setTerminalStatus('open');
  }, [category]);

  useGSAP(() => {
    if (!containerRef.current || !contentRef.current) return;

    if (isExpanded) {
      gsap_real.to(containerRef.current, {
        height: '85vh',
        opacity: 1,
        scrollTrigger: {
          trigger: "#works-section",
          start: "top 80px",
          end: "top top",
          scrub: true,
          invalidateOnRefresh: true,
        }
      });
      
      gsap_real.fromTo(contentRef.current, 
        { y: 60, opacity: 0, filter: 'blur(10px)' },
        { 
          y: 0, 
          opacity: 1, 
          filter: 'blur(0px)', 
          duration: 1, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: "#works-section",
            start: "top 80px",
            toggleActions: "play none none reverse"
          }
        }
      );
    } else {
      gsap_real.to(containerRef.current, {
        height: '120px',
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        overwrite: 'auto'
      });
      setSelectedProject(null);
    }
  }, { dependencies: [isExpanded, category], scope: containerRef });

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
    setTerminalStatus('open');
  };

  return (
    <div className="relative">
      <div 
        ref={containerRef}
        className={cn(
          "relative w-full bg-background border-t border-b border-foreground/5 overflow-hidden transition-colors duration-700",
          isExpanded ? "z-[45]" : "z-10"
        )}
        style={{ height: '120px' }}
      >
        <div className={cn("absolute left-6 md:left-12 flex flex-col gap-2 z-20 pointer-events-none transition-all duration-700", isExpanded ? "top-6" : "top-6")}>
          <div className="flex flex-col gap-1">
            <CyberText 
              text="Active Layer" 
              variant="decrypt" 
              delay={500} 
              corrupt 
              className={cn(
                "font-mono text-[9px] uppercase tracking-[0.4em] text-primary font-bold",
                isExpanded && "animate-active-layer-blink"
              )}
            />
            <div className="flex items-center gap-2">
              <CyberText 
                text={category || 'none'} 
                variant="type" 
                delay={500} 
                speed={40}
                className="font-serif text-2xl md:text-3xl italic font-bold text-foreground lowercase leading-none" 
              />
              {category && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.5)]" />}
            </div>
          </div>
          
          <div className="flex flex-col gap-1 mt-1">
            <CyberText text="Session Status" variant="decrypt" delay={700} className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                  <div key={i} className={cn(
                    "w-1.5 h-1.5 rounded-full border border-primary/30 transition-colors",
                    i < clickCount ? "bg-primary border-primary shadow-[0_0_8px_rgba(220,38,38,0.5)]" : ""
                  )} />
                ))}
              </div>
              <span className="font-mono text-[9px] uppercase tracking-tighter text-foreground ml-1">Credits: {8 - clickCount}/8</span>
            </div>
          </div>
        </div>

        {!isExpanded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            <div className="flex flex-col items-center gap-1 mb-1">
              <CyberText text="System Online" variant="decrypt" delay={500} corrupt className="font-mono text-[8px] uppercase tracking-[0.4em] text-primary/60 font-bold" />
            </div>
            
            <div className="flex flex-col items-center gap-2 animate-pulse">
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
          <div className="grid grid-cols-1 md:grid-cols-3 w-full items-center py-3 pt-6 px-12 border-b border-foreground/5 shrink-0 gap-6">
            <div className="hidden md:block" />

            <div className="flex flex-col gap-1.5 items-center text-center">
               <CyberText text="[ PORTFOLIO_LOAD: 22% ]" variant="decrypt" delay={500} corrupt className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-bold" />
               <div className="w-full max-w-[300px] h-1.5 bg-foreground/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20" />
                  <div className="absolute top-0 left-0 bottom-0 bg-primary w-[22%] shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
               </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <button 
                onClick={onClose}
                className="font-mono text-[10px] uppercase tracking-widest hover:text-primary gap-2 flex items-center transition-all group px-8 py-4 border border-foreground/10 rounded-full pointer-events-auto hover:bg-primary/5 hover:border-primary/20 hover:shadow-[0_0_15px_rgba(220,38,38,0.2)]"
              >
                Collapse Section <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
              </button>
            </div>
          </div>

          <div className="flex-1 relative overflow-y-auto pointer-events-auto pb-10 px-6 md:px-12 lg:px-24 cyber-scrollbar">
            <div 
              className={cn(
                "transition-all duration-700",
                selectedProject ? "opacity-10 blur-xl scale-95" : "opacity-100 blur-0 scale-100",
                category === 'shorts' 
                  ? "flex flex-nowrap overflow-x-auto gap-4 pb-6 pt-12 px-4 scroll-smooth" 
                  : cn(
                      "grid max-w-[1600px] mx-auto pt-12",
                      category === 'all'
                        ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
                        : cn(
                            "gap-10 md:gap-12 lg:gap-16",
                            category && verticalCategories.includes(category)
                              ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-5" 
                              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                          )
                    )
              )}
            >
              {filteredVideos.map((item, index) => {
                const itemIsVertical = item.category.some(c => verticalCategories.includes(c));
                const isShortOrTalking = item.category.some(c => ['shorts', 'talking'].includes(c));
                
                return (
                  <div 
                    key={item.id} 
                    className={cn(
                      "flex flex-col gap-4 group transform transition-all duration-700",
                      isExpanded ? "animate-slide-up opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                      category === 'shorts' && "flex-shrink-0 w-[180px] sm:w-[200px] md:w-[240px]"
                    )}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div 
                      onClick={() => handleInteraction(item)}
                      className={cn(
                        "relative bg-muted overflow-hidden transition-all duration-700 border border-foreground/5 shadow-2xl rounded-none",
                        itemIsVertical ? "aspect-[2/3]" : "aspect-[16/9]",
                        clickCount >= 8 ? "grayscale opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/30",
                        isShortOrTalking && "scale-95"
                      )}
                    >
                      {item.coverImage ? (
                        <EditableImage 
                          src={item.coverImage} 
                          storageKey={`v3-feed-cover-${item.id}`}
                          fill
                          className="object-cover scale-[1.02] group-hover:scale-100 transition-transform duration-[1.5s] depth-shadow"
                          alt={item.title}
                        />
                      ) : (
                        <EditableVideo 
                          src={item.videoUrl} 
                          storageKey={`v3-feed-grid-${item.id}`}
                          fill
                          className="object-cover scale-[1.02] group-hover:scale-100 transition-transform duration-[1.5s] depth-shadow"
                          autoPlay
                          muted
                          loop
                          playsInline
                          hideControls
                          startTime={item.startTime}
                        />
                      )}
                      
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
                      <CyberText 
                        text={item.title} 
                        variant="decrypt" 
                        delay={800 + index * 50} 
                        className="font-mono text-[10px] uppercase tracking-widest text-foreground font-bold border-b border-transparent group-hover:border-primary transition-colors truncate" 
                      />
                      <CyberText 
                        text={item.date} 
                        variant="decrypt" 
                        delay={1000 + index * 50} 
                        corrupt 
                        className="font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/60 shrink-0" 
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="h-7 shrink-0 py-1 px-6 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/40 gap-6 overflow-hidden">
              <div className="flex gap-8 flex-wrap justify-center">
                <span className="flex items-center gap-2">
                  Status: <CyberText text="Simultaneous Processing" variant="decrypt" delay={500} />
                </span>
                <CyberText text="Buffer: Dynamic Grid" variant="decrypt" delay={600} />
                <CyberText text="V-Sync: Active" variant="decrypt" delay={700} />
              </div>
              <CyberText text="© VERONA STUDIO • VISUAL ENGINE V3.0 // LUXURY EDITION" variant="decrypt" delay={500} corrupt />
            </div>
          </div>
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center animate-in fade-in duration-500">
          <div 
            className="absolute inset-0 bg-background/95 backdrop-blur-2xl cursor-pointer" 
            onClick={closeTheater}
          />
          
          <div 
            className={cn(
              "relative z-[210] flex flex-col-reverse md:flex-row items-center justify-center gap-8 w-full p-6 md:p-12 pointer-events-none",
              selectedProject.category.some(c => verticalCategories.includes(c)) ? "max-w-[1000px]" : "max-w-[1400px]"
            )}
          >
            {terminalStatus === 'minimized' && (
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  setTerminalStatus('open');
                }}
                className="absolute bottom-10 left-10 z-[220] flex items-center gap-4 bg-background/80 border border-primary/40 px-4 py-3 rounded-md cursor-pointer hover:bg-primary/10 transition-all animate-in slide-in-from-bottom-5 pointer-events-auto"
              >
                <Terminal className="w-4 h-4 text-primary" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-primary">Cmd_Console (Minimized)</span>
                <Maximize2 className="w-3 h-3 text-primary/40" />
              </div>
            )}

            <div 
              className="w-full max-w-[450px] shrink-0 self-center pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {terminalStatus === 'open' && (
                <CyberTerminal 
                  text={selectedProject.description || 'HELLO WORLD'} 
                  onClose={() => setTerminalStatus('closed')}
                  onMinimize={() => setTerminalStatus('minimized')}
                />
              )}
            </div>

            <div 
              className={cn(
                "relative shadow-[0_0_100px_rgba(var(--primary),0.3)] border border-primary/30 bg-black shrink-0 pointer-events-auto",
                selectedProject.category.some(c => verticalCategories.includes(c)) ? "w-full max-w-[400px] aspect-[2/3]" : "w-full max-w-[900px] aspect-[16/9]"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <EditableVideo 
                src={selectedProject.videoUrl} 
                storageKey={`theater-${selectedProject.id}`}
                fill
                className="object-cover"
                autoPlay
                controls
                startTime={selectedProject.startTime}
              />

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  closeTheater();
                }}
                className="absolute -top-12 right-0 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              >
                Close Archive <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes active-layer-blink {
          0%, 80%, 100% { opacity: 0.4; filter: none; }
          90% { opacity: 1; filter: drop-shadow(0 0 4px hsl(var(--primary))); }
        }
        .animate-active-layer-blink {
          animation: active-layer-blink 2s ease-in-out infinite;
        }
        
        .cyber-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .cyber-scrollbar::-webkit-scrollbar-track {
          background: rgba(var(--primary), 0.05);
          border-radius: 10px;
        }
        .cyber-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary));
          border-radius: 10px;
          box-shadow: 0 0 10px hsla(var(--primary), 0.5);
        }
        .cyber-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary));
        }
      `}</style>
    </div>
  );
}
