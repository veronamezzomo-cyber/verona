'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square, Terminal, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CyberTerminalProps {
  text: string;
  onClose: () => void;
  onMinimize: () => void;
  isMinimized?: boolean;
}

export function CyberTerminal({ text, onClose, onMinimize, isMinimized }: CyberTerminalProps) {
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
