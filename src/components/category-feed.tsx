'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { X, Lock, Sparkles, Terminal, Minus, Square, Maximize2 } from 'lucide-react';
import { EditableVideo } from '@/components/editable-video';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useToast } from '@/hooks/use-toast';
import { VIDEOS_DATA, ProjectVideo } from '@/lib/videos-data';

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
      'VERONA_OS [Version 10.0.19045.4291]',
      '(c) Verona Corporation. All rights reserved.',
      '',
      'Initializing secure connection to archive...',
      'Connection established. Status: encrypted.',
      '',
      `[ARCHIVE_LOG]: ${text}`,
      '',
      'Type "help" for a list of available commands.',
      ''
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
      className="w-full bg-[#0a0a0a] border border-red-900/50 backdrop-blur-2xl font-mono relative overflow-hidden flex flex-col shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] cursor-auto select-text z-[70]"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onClick={(e) => {
        e.stopPropagation();
        inputRef.current?.focus();
      }}
    >
      <div 
        onMouseDown={onMouseDown}
        className="terminal-header flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-red-900/30 select-none cursor-move active:bg-[#222]"
      >
        <div className="flex items-center gap-3">
          <X 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3.5 h-3.5 text-red-600/40 hover:text-red-600 cursor-pointer transition-colors" 
          />
          <Minus 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-3.5 h-3.5 text-red-600/40 hover:text-red-600 cursor-pointer transition-colors" 
          />
          <Square className="w-2.5 h-2.5 text-red-600/10 cursor-not-allowed" />
        </div>

        <div className="flex items-center gap-2 pointer-events-none opacity-60">
          <span className="text-[9px] uppercase tracking-[0.3em] text-red-600 font-bold">Verona_OS // Cmd_Console</span>
          <Terminal className="w-3 h-3 text-red-600 animate-pulse" />
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="p-6 flex-1 h-[380px] md:h-[450px] relative overflow-y-auto scrollbar-hide"
      >
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        
        <div className="flex flex-col relative z-10">
          {history.map((line, i) => (
            <div key={i} className="text-[11px] leading-snug tracking-wider text-red-500/80 break-words mb-1 uppercase">
              {line}
            </div>
          ))}
          
          <form onSubmit={handleCommand} className="flex items-center gap-2">
            <span className="text-red-600/60 text-[11px] shrink-0">C:\Users\Guest&gt;</span>
            <input
              ref={inputRef}
              type="text"
              className="bg-transparent border-none outline-none text-red-500 text-[11px] w-full p-0 uppercase"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
          </form>
        </div>
      </div>

      <div className="px-6 py-3 border-t border-red-900/10 flex justify-between items-center bg-black/60 select-none">
        <div className="flex gap-6 text-[8px] uppercase tracking-[0.2em] text-red-600/40">
          <span>Mode: Interactive</span>
          <span>Ln: {history.length}</span>
          <span>I/O: Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-600/40 animate-pulse" />
          <span className="text-[8px] uppercase tracking-[0.3em] text-red-600/60">Ready_</span>
        </div>
      </div>
    </div>
  );
}

export function CategoryFeed({ category, onClose }: CategoryFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const activeLayerLabelRef = useRef<HTMLSpanElement>(null);
  const headerDividerRef = useRef<HTMLDivElement>(null);
  const pickStyleTextRef = useRef<HTMLDivElement>(null);
  const compactStatusRef = useRef<HTMLDivElement>(null);
  
  const [clickCount, setClickCount] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectVideo | null>(null);
  const [terminalStatus, setTerminalStatus] = useState<'open' | 'minimized' | 'closed'>('open');
  const { toast } = useToast();

  const isExpanded = !!category;
  const isShorts = category === 'shorts';
  const isAll = category === 'all';
  
  const verticalCategories = ['shorts', 'talking'];
  const isVerticalFormat = category ? verticalCategories.includes(category) : false;

  const filteredVideos = useMemo(() => {
    if (!category || category === 'all') return VIDEOS_DATA;
    return VIDEOS_DATA.filter(video => video.category.includes(category));
  }, [category]);

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
    setTerminalStatus('open');
  };

  const closeTheater = () => {
    setSelectedProject(null);
    setTerminalStatus('closed');
  };

  return (
    <div className="relative">
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
                "transition-all duration-700",
                selectedProject ? "opacity-10 blur-xl scale-95" : "opacity-100 blur-0 scale-100",
                isShorts 
                  ? "flex flex-nowrap overflow-x-auto gap-8 pb-10 pt-12 px-4 scroll-smooth cyber-scrollbar" 
                  : cn(
                      "grid max-w-[1600px] mx-auto pt-12",
                      isAll
                        ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
                        : cn(
                            "gap-12 md:gap-16 lg:gap-24",
                            isVerticalFormat 
                              ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
                              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                          )
                    )
              )}
            >
              {filteredVideos.map((item, index) => {
                const itemIsVertical = item.category.some(c => verticalCategories.includes(c));
                return (
                  <div 
                    key={item.id} 
                    className={cn(
                      "flex flex-col gap-6 group transform transition-all duration-700",
                      isExpanded ? "animate-slide-up opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                      isShorts && "min-w-[185px] md:min-w-[235px] lg:min-w-[265px] shrink-0"
                    )}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div 
                      onClick={() => handleInteraction(item)}
                      className={cn(
                        "relative bg-muted overflow-hidden transition-all duration-700 border border-foreground/5 shadow-2xl rounded-none",
                        itemIsVertical
                          ? "aspect-[2/3]" 
                          : "aspect-[16/9]",
                        clickCount >= 8 ? "grayscale opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/30"
                      )}
                    >
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
                      <span className="font-mono text-[10px] uppercase tracking-widest text-foreground font-bold border-b border-transparent group-hover:border-primary transition-colors truncate">
                        {item.title}
                      </span>
                      <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/60 shrink-0">{item.date}</span>
                    </div>
                  </div>
                );
              })}
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
                  "relative z-[60] flex flex-col-reverse md:flex-row items-center justify-center gap-8 w-full",
                  selectedProject.category.some(c => verticalCategories.includes(c)) ? "max-w-[1000px]" : "max-w-[1400px]"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {terminalStatus === 'minimized' && (
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      setTerminalStatus('open');
                    }}
                    className="absolute bottom-10 left-10 z-[100] flex items-center gap-4 bg-black/80 border border-red-900/40 px-4 py-3 rounded-md cursor-pointer hover:bg-red-900/10 transition-all animate-in slide-in-from-bottom-5"
                  >
                    <Terminal className="w-4 h-4 text-red-600" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-red-500">Cmd_Console (Minimized)</span>
                    <Maximize2 className="w-3 h-3 text-red-600/40" />
                  </div>
                )}

                <div 
                  className="w-full max-w-[450px] shrink-0 self-center"
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
                    "relative shadow-[0_0_100px_rgba(var(--primary),0.2)] border border-primary/30 bg-black shrink-0",
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
                    Close Archive <X className="w-4 h-4" />
                  </button>
                </div>
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
        
        /* Custom scrollbar for horizontal sections */
        .cyber-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .cyber-scrollbar::-webkit-scrollbar-track {
          background: rgba(var(--primary), 0.05);
          border-radius: 10px;
        }
        .cyber-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary));
          border-radius: 10px;
          box-shadow: 0 0 10px hsl(var(--primary));
        }
        .cyber-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary));
          height: 6px;
        }
      `}</style>
    </div>
  );
}
