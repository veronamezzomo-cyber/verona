'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { EditableVideo } from './editable-video';
import gsap from 'gsap';

export function FloatingVideoCluster({ videos }: { videos: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeRef = useRef(0);
  const requestRef = useRef<number>(0);
  const [containerWidth, setContainerWidth] = useState(600);
  
  const expansionRef = useRef(0);
  const hoverFactorRef = useRef(1);
  const isHoveredRef = useRef(false);
  const currentFocusedIndexRef = useRef(0);
  const currentOffsetsRef = useRef(videos.map((_, i) => (i * 2 * Math.PI) / videos.length));
  const focalFactorsRef = useRef(videos.map((_, i) => ({ val: i === 0 ? 1 : 0 })));

  useEffect(() => {
    gsap.to(expansionRef, { current: 1, duration: 1.5, ease: "power2.out" });
  }, []);

  const orbitParams = useMemo(() => {
    const factor = containerWidth / 600;
    return {
      rx: Math.max(180, 280 * factor),
      ry: Math.max(100, 160 * factor)
    };
  }, [containerWidth]);

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

  useEffect(() => {
    const rotateFocus = () => {
      const prev = currentFocusedIndexRef.current;
      const next = (prev + 1) % videos.length;
      currentFocusedIndexRef.current = next;

      gsap.to(focalFactorsRef.current[prev], { val: 0, duration: 1.2, ease: "power2.inOut" });
      gsap.to(focalFactorsRef.current[next], { val: 1, duration: 1.2, ease: "power2.inOut" });
    };

    const interval = setInterval(rotateFocus, 6000);
    return () => clearInterval(interval);
  }, [videos.length]);

  useEffect(() => {
    const TILT = 12 * (Math.PI / 180); 
    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);
    const PARALLAX_INTENSITY = 0.45; 
    
    const animate = () => {
      const focusIdx = currentFocusedIndexRef.current;
      const targetHover = isHoveredRef.current ? 1.3 : 1;
      hoverFactorRef.current += (targetHover - hoverFactorRef.current) * 0.1;

      const breathing = Math.sin(timeRef.current * 0.1) * 0.0015;
      const step = (0.005 + breathing) * hoverFactorRef.current;
      timeRef.current += step;

      videoRefs.current.forEach((el, i) => {
        if (!el) return;
        
        const { rx: baseRx, ry: baseRy } = orbitParams;
        const ff = focalFactorsRef.current[i].val; 
        
        let targetOffset;
        if (i === focusIdx) {
          targetOffset = i * (2 * Math.PI / videos.length);
        } else {
          const rank = i < focusIdx ? i : i - 1;
          targetOffset = rank * (2 * Math.PI / (videos.length - 1));
        }
        
        currentOffsetsRef.current[i] += (targetOffset - currentOffsetsRef.current[i]) * 0.05;
        
        const baseAngle = timeRef.current + currentOffsetsRef.current[i];
        const effectiveAngle = baseAngle + Math.sin(baseAngle) * PARALLAX_INTENSITY;
        const visualDepth = Math.sin(effectiveAngle); 
        
        const rx = baseRx * (0.85 + (i % 3) * 0.1);
        const ry = baseRy * (0.85 + (i % 2) * 0.15);
        
        const rawX = Math.cos(effectiveAngle) * rx;
        const rawY = Math.sin(effectiveAngle) * ry;
        
        const orbitalX = (rawX * cosT - rawY * sinT) * expansionRef.current;
        const orbitalY = (rawX * sinT + rawY * cosT) * expansionRef.current;

        const x = orbitalX * (1 - ff);
        const y = orbitalY * (1 - ff);

        const baseScale = 0.9 + ((visualDepth + 1) / 2) * 0.25;
        const scale = baseScale * (1 - ff) + (1.25 * ff);
        
        const baseBlur = (1 - (visualDepth + 1) / 2) * 4;
        const blur = baseBlur * (1 - ff);
        
        const baseZIndex = 50 + Math.round(visualDepth * 50);
        const zIndex = Math.round(baseZIndex * (1 - ff) + (200 + i) * ff);

        el.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale})`;
        el.style.zIndex = zIndex.toString();
        el.style.filter = blur > 0.5 ? `blur(${blur}px)` : 'none';
        
        const shadowOp = (Math.max(0, visualDepth + 0.5) * 0.4) * (1 - ff) + 0.6 * ff;
        el.style.boxShadow = `0 ${20 * shadowOp}px ${40 * shadowOp}px -10px rgba(0,0,0,${0.5 * shadowOp})`;
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [orbitParams, videos.length]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[380px] sm:h-[450px] md:h-[550px] lg:h-[650px] overflow-visible"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      <div className="absolute inset-0 pointer-events-auto" />
      
      <div className="absolute top-1/2 left-1/2 w-0 h-0">
        {videos.map((vid, i) => (
          <div 
            key={vid.id}
            ref={(el) => { videoRefs.current[i] = el; }}
            className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-2xl overflow-hidden border border-foreground/10 bg-black shadow-2xl pointer-events-auto transition-shadow duration-300"
            style={{ 
              transform: 'translate(-50%, -50%)',
              opacity: 1,
              willChange: 'transform, filter'
            }}
          >
            <EditableVideo 
              src={vid.videoUrl} 
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
