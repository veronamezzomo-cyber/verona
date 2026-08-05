'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { X, Lock, Sparkles } from 'lucide-react';
import { EditableVideo } from '@/components/editable-video';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useToast } from '@/hooks/use-toast';

interface CategoryFeedProps {
  category: string | null;
  onClose: () => void;
  onCategoryClick?: (label: string) => void;
}

interface FeedItem {
  id: string;
  title: string;
  videoUrl: string;
}

export function CategoryFeed({ category, onClose }: CategoryFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [clickCount, setClickCount] = useState(0);
  const scrollX = useRef(0);
  const { toast } = useToast();

  // Carrega créditos do sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem('verona_credits');
    if (saved) setClickCount(parseInt(saved));
  }, []);

  const isExpanded = !!category;

  // Animação de Expansão/Retração (GSAP)
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    if (isExpanded) {
      // Abre a gaveta
      gsap.to(containerRef.current, {
        height: '80vh',
        opacity: 1,
        duration: 1,
        ease: 'power3.inOut',
        overwrite: 'auto'
      });
      gsap.fromTo(contentRef.current, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: 'power2.out' }
      );
    } else {
      // Fecha a gaveta
      gsap.to(containerRef.current, {
        height: '100px',
        duration: 0.8,
        ease: 'power3.inOut',
        overwrite: 'auto'
      });
    }
  }, [isExpanded]);

  // Controle de Scroll Horizontal Local (Independente da Janela)
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!isExpanded || !trackRef.current) return;

    // Previne que o scroll da página aconteça enquanto navegamos nos vídeos
    // e o mouse estiver sobre o componente
    const track = trackRef.current;
    const maxScroll = track.scrollWidth - window.innerWidth * 0.8;
    
    // Sensibilidade do scroll local
    scrollX.current = Math.min(Math.max(scrollX.current + e.deltaY + e.deltaX, 0), maxScroll);

    gsap.to(track, {
      x: -scrollX.current,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }, [isExpanded]);

  const handleInteraction = () => {
    if (clickCount >= 3) {
      toast({
        title: "Interaction Limit Reached",
        description: "You've used your 3 interaction credits for this session.",
        variant: "destructive"
      });
      return;
    }
    const newCount = clickCount + 1;
    setClickCount(newCount);
    sessionStorage.setItem('verona_credits', newCount.toString());
  };

  const feedItems: FeedItem[] = [
    { id: '1', title: 'PROJ_01', videoUrl: 'https://i.imgur.com/i33VokI.mp4' },
    { id: '2', title: 'PROJ_02', videoUrl: 'https://i.imgur.com/EDMdRG8_lq.mp4' },
    { id: '3', title: 'PROJ_03', videoUrl: 'https://i.imgur.com/3r8dNuR_lq.mp4' },
    { id: '4', title: 'PROJ_04', videoUrl: 'https://i.imgur.com/p23vehx_lq.mp4' },
    { id: '5', title: 'PROJ_05', videoUrl: 'https://i.imgur.com/ND3kmsW.mp4' },
  ];

  return (
    <div 
      ref={containerRef}
      onWheel={handleWheel}
      className={cn(
        "relative w-full bg-background border-t border-b border-foreground/5 overflow-hidden transition-colors duration-700",
        isExpanded ? "z-[95]" : "z-10"
      )}
      style={{ height: '100px' }}
    >
      {/* ESTADO COMPACTO: Texto Pulsante + Conectores HUD */}
      {!isExpanded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-100 transition-opacity duration-500">
          {/* Conectores Visuais (Circuit Style) */}
          <svg className="absolute top-0 w-full h-full pointer-events-none opacity-20" aria-hidden="true">
            <path d="M 50% 0 L 50% 30 L 45% 45 M 50% 30 L 55% 45" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50%" cy="0" r="2" fill="currentColor" />
          </svg>
          
          <div className="flex flex-col items-center gap-2 animate-pulse">
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary font-bold">System Online</span>
            <h3 className="font-serif italic text-xl md:text-2xl text-foreground flex items-center gap-3">
              PICK YOUR STYLE <Sparkles className="h-4 w-4 text-primary" />
            </h3>
          </div>
        </div>
      )}

      {/* ESTADO EXPANDIDO: Galeria de Vídeos */}
      <div 
        ref={contentRef}
        className={cn(
          "w-full h-full flex flex-col transition-opacity duration-500",
          isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Header Interno do Feed */}
        <div className="flex items-center justify-between py-8 px-12 border-b border-foreground/5 shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary font-bold">Active Layer</span>
              <h2 className="font-serif text-3xl italic font-bold text-foreground lowercase">{category}</h2>
            </div>
            <div className="h-10 w-px bg-foreground/10 mx-4" />
            <div className="flex flex-col">
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Session Status</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div key={i} className={cn(
                      "w-2 h-2 rounded-full border border-primary/30 transition-colors duration-500",
                      i < clickCount ? "bg-primary border-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" : ""
                    )} />
                  ))}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-tighter text-foreground ml-2">Credits: {3 - clickCount}/3</span>
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="font-mono text-[10px] uppercase tracking-widest hover:text-primary gap-2 flex items-center transition-colors group px-6 py-3 border border-foreground/10 rounded-full"
          >
            Collapse Section <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
          </button>
        </div>

        {/* Trilho de Vídeos (Scroll Horizontal Local) */}
        <div className="flex-1 relative flex items-center overflow-hidden cursor-grab active:cursor-grabbing">
          {/* Instrução Tipográfica Discreta */}
          <div className="absolute left-12 top-10 z-10">
            <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-muted-foreground/40 vertical-text origin-top-left">
              Horizontal Navigation Required / Use Mouse Wheel
            </p>
          </div>

          <div 
            ref={trackRef}
            className="flex items-center gap-16 px-[10vw] will-change-transform"
          >
            {feedItems.map((item) => (
              <div key={item.id} className="flex flex-col gap-6 shrink-0 group">
                <div 
                  onClick={handleInteraction}
                  className={cn(
                    "w-[300px] md:w-[400px] h-[50vh] relative bg-muted overflow-hidden transition-all duration-700",
                    "[clip-path:polygon(0%_10%,10%_0%,100%_0%,100%_90%,90%_100%,0%_100%)]",
                    clickCount >= 3 ? "grayscale opacity-50 cursor-not-allowed" : "cursor-pointer"
                  )}
                >
                  <EditableVideo 
                    src={item.videoUrl} 
                    storageKey={`v2-feed-${item.id}`}
                    fill
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    hideControls
                  />
                  
                  {clickCount >= 3 && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-500">
                      <div className="flex flex-col items-center gap-2">
                        <Lock className="w-8 h-8 text-white opacity-40" />
                        <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">Access Denied</span>
                      </div>
                    </div>
                  )}

                  {/* Borda técnica em hover */}
                  <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/20 transition-colors pointer-events-none" />
                </div>
                
                <div className="flex items-center justify-between px-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground font-bold">{item.title}</span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/60">Layer.0{item.id}</span>
                </div>
              </div>
            ))}
            
            {/* Espaçador final */}
            <div className="w-[20vw] shrink-0" />
          </div>
        </div>

        {/* Footer do Feed */}
        <div className="py-6 px-12 border-t border-foreground/5 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/40">
          <div className="flex gap-8">
            <span>Status: Rendering</span>
            <span>Bitrate: High</span>
            <span>Codec: H.264 / AV1</span>
          </div>
          <div>© Verona Studio • Visual Engine v2.5</div>
        </div>
      </div>
    </div>
  );
}
