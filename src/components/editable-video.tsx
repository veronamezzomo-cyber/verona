'use client';

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Volume2, VolumeX } from 'volume-2'; // Note: corrected volume icons if needed, but keeping existing logic
import { Volume2 as Vol2, VolumeX as VolX } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EditableVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  storageKey: string;
  containerClassName?: string;
  fill?: boolean;
  hideControls?: boolean;
  startTime?: number;
  forcePause?: boolean;
}

export const EditableVideo = forwardRef<HTMLVideoElement, EditableVideoProps>(({ 
  src: defaultSrc, 
  storageKey, 
  containerClassName, 
  fill, 
  className,
  hideControls = false,
  startTime,
  autoPlay: autoPlayProp = true,
  preload = "metadata",
  forcePause = false,
  ...props 
}, ref) => {
  const [currentSrc, setCurrentSrc] = useState(defaultSrc);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasSeekedRef = useRef(false);

  useImperativeHandle(ref, () => videoRef.current!);

  const isTheaterMode = storageKey.startsWith('theater-');

  // Load from session storage
  useEffect(() => {
    const saved = sessionStorage.getItem(`vid_${storageKey}`);
    if (saved) {
      setCurrentSrc(saved);
      hasSeekedRef.current = false;
    } else if (defaultSrc !== currentSrc) {
      setCurrentSrc(defaultSrc);
      hasSeekedRef.current = false;
    }
  }, [storageKey, defaultSrc]);

  // Handle intersection for automatic pausing when off-screen
  // Increased rootMargin to 600px to allow earlier buffering and smoother transitions
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.01,
        rootMargin: '600px 0px 600px 0px' 
      }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  // Sync mute state and theater mode volume
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isTheaterMode) {
      video.muted = false;
      video.volume = 0.5;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  }, [isTheaterMode, currentSrc]);

  // Master Control: Play/Pause based on Visibility and external ForcePause
  // Implemented staggered play with robust error handling and readyState check
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (forcePause || !isVisible) {
      video.pause();
    } else if (isVisible && autoPlayProp) {
      // Small staggered delay based on a random factor to prevent GPU congestion
      // when multiple videos (like in the "All" grid) become visible at once.
      const playTimeout = setTimeout(() => {
        if (!video) return;
        
        // Only attempt play if metadata is loaded and video is ready
        if (video.readyState >= 2) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Ignore play-interrupt errors common during navigation or zoom
            });
          }
        }
      }, 50 + Math.random() * 150);

      return () => clearTimeout(playTimeout);
    }
  }, [isVisible, forcePause, autoPlayProp, currentSrc]);

  // Handle StartTime and initial seek (Fixes the "jump/reload" bug)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || startTime === undefined || isNaN(startTime) || hasSeekedRef.current) return;

    const seekAndPlay = () => {
      if (!video.duration || isNaN(video.duration) || hasSeekedRef.current) return;

      try {
        let finalStart = startTime;
        const duration = video.duration;
        
        if (finalStart < 0) {
          while (finalStart < 0) finalStart += duration;
        } else {
          finalStart = finalStart % duration;
        }

        // Only seek once per source change to prevent flickering on re-renders
        video.currentTime = finalStart;
        hasSeekedRef.current = true;
      } catch (e) {
        console.warn("Seeking failed:", e);
      }
    };

    if (video.readyState >= 1) {
      seekAndPlay();
    }

    video.addEventListener('loadedmetadata', seekAndPlay);
    return () => video.removeEventListener('loadedmetadata', seekAndPlay);
  }, [currentSrc, startTime]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMuteState = !videoRef.current.muted;
      videoRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
    }
  };

  return (
    <div className={cn("group relative w-full h-full", containerClassName)} suppressHydrationWarning>
      <video 
        ref={videoRef}
        src={currentSrc || undefined} 
        className={cn(
          className,
          fill && "absolute inset-0 w-full h-full object-cover"
        )}
        muted={isMuted}
        playsInline
        autoPlay={autoPlayProp}
        loop={props.loop}
        preload={preload}
        aria-hidden="true"
        controls={props.controls}
      />
      
      {!hideControls && (
        <div className="absolute top-2 right-2 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2" suppressHydrationWarning>
          <div 
            role="button"
            tabIndex={0}
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className={cn(
              buttonVariants({ variant: "secondary", size: "icon" }),
              "h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 backdrop-blur-md shadow-xl cursor-pointer"
            )}
          >
            {isMuted ? <VolX className="h-3.5 w-3.5 text-white" /> : <Vol2 className="h-3.5 w-3.5 text-white" />}
          </div>
        </div>
      )}
    </div>
  );
});

EditableVideo.displayName = 'EditableVideo';