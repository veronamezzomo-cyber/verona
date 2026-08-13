'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

export function MagneticCTA({ children, className }: { children: React.ReactNode, className?: string }) {
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
