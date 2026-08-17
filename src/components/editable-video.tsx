'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EditableVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  storageKey: string;
  containerClassName?: string;
  fill?: boolean;
  hideControls?: boolean;
  startTime?: number;
}

export function EditableVideo({ 
  src: defaultSrc, 
  storageKey, 
  containerClassName, 
  fill, 
  className,
  hideControls = false,
  startTime,
  autoPlay: autoPlayProp = true,
  preload = "metadata",
  ...props 
}: EditableVideoProps) {
  const [currentSrc, setCurrentSrc] = useState(defaultSrc);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasSeekedRef = useRef(false);

  // Check if this is the theater mode instance
  const isTheaterMode = storageKey.startsWith('theater-');

  useEffect(() => {
    const saved = sessionStorage.getItem(`vid_${storageKey}`);
    if (saved) {
      setCurrentSrc(saved);
      hasSeekedRef.current = false;
    }
  }, [storageKey]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isTheaterMode) {
      video.muted = false;
      video.volume = 0.3;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  }, [isTheaterMode, currentSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || startTime === undefined || isNaN(startTime) || hasSeekedRef.current) return;

    const seekAndPlay = async () => {
      try {
        if (!video.duration || isNaN(video.duration) || hasSeekedRef.current) return;

        let finalStart = startTime;
        const duration = video.duration;
        
        if (finalStart < 0) {
          while (finalStart < 0) {
            finalStart += duration;
          }
        } else {
          finalStart = finalStart % duration;
        }

        video.currentTime = finalStart;
        hasSeekedRef.current = true;
        
        if (video.paused && (video.muted || autoPlayProp)) {
          await video.play().catch(() => {});
        }
      } catch (e) {}
    };

    if (video.readyState >= 1) {
      seekAndPlay();
    }

    const onLoadedMetadata = () => seekAndPlay();
    const onCanPlay = () => seekAndPlay();

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('canplay', onCanPlay);

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('canplay', onCanPlay);
    };
  }, [currentSrc, startTime, autoPlayProp]);

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
            {isMuted ? <VolumeX className="h-3.5 w-3.5 text-white" /> : <Volume2 className="h-3.5 w-3.5 text-white" />}
          </div>
        </div>
      )}
    </div>
  );
}
