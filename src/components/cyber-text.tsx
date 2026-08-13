'use client';

import React, { useState, useEffect } from 'react';

const GLYPHS = '0123456789ABCDEF!@#$%^&*()_+<>?:';

interface CyberTextProps {
  text: string;
  variant?: 'type' | 'decrypt';
  delay?: number;
  speed?: number;
  className?: string;
  corrupt?: boolean;
  trigger?: boolean;
}

export const CyberText = ({ 
  text, 
  variant = 'decrypt', 
  delay = 500, 
  speed = 30, 
  className,
  corrupt = false,
  trigger = true
}: CyberTextProps) => {
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
