'use client';

import React, { useState, useEffect } from 'react';
import { CyberText } from './cyber-text';

export function DigitalClock() {
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
