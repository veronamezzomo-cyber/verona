'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Pencil, Check, X, Loader2, Volume2, VolumeX } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
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
  autoPlay, // Destructured here to prevent it from going into ...props Rest
  ...props 
}: EditableVideoProps) {
  const [currentSrc, setCurrentSrc] = useState(defaultSrc);
  const [newUrl, setNewUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize from session storage if available
  useEffect(() => {
    const saved = sessionStorage.getItem(`vid_${storageKey}`);
    if (saved) setCurrentSrc(saved);
  }, [storageKey]);

  // Precise startTime management
  useEffect(() => {
    const video = videoRef.current;
    if (!video || startTime === undefined) return;

    const seekAndPlay = async () => {
      try {
        video.pause();
        video.currentTime = startTime;
        await video.play();
      } catch (e) {
        // Autoplay policy might block play() if not muted or no interaction
        // but for portfolio muted previews it should work fine
      }
    };

    if (video.readyState >= 2) {
      seekAndPlay();
    } else {
      video.addEventListener('loadeddata', seekAndPlay, { once: true });
    }

    // Custom loop logic: prevent resetting to 0:00
    const handleTimeUpdate = () => {
      if (video.loop && video.currentTime < startTime - 1) {
        video.currentTime = startTime;
      }
    };
    
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadeddata', seekAndPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentSrc, startTime]);

  const validateAndApply = async () => {
    if (!newUrl.trim()) return;
    
    setIsValidating(true);
    setError(null);

    try {
      new URL(newUrl);
      setCurrentSrc(newUrl);
      sessionStorage.setItem(`vid_${storageKey}`, newUrl);
      setIsOpen(false);
      setNewUrl('');
    } catch (e) {
      setError('Please provide a valid video URL');
    } finally {
      setIsValidating(false);
    }
  };

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
        loop={props.loop}
        playsInline
        preload="auto"
        aria-hidden="true"
        controls={props.controls}
        {...(startTime === undefined ? { autoPlay: true } : {})}
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

          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <div 
                role="button"
                tabIndex={0}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "icon" }),
                  "h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 backdrop-blur-md shadow-xl cursor-pointer"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Pencil className="h-3.5 w-3.5 text-white" />
              </div>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-3 bg-background border-foreground/10 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col gap-3" suppressHydrationWarning>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Edit Video Source</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="Paste video URL (mp4, webm)..."
                    className="h-9 text-xs bg-muted/50"
                  />
                  <Button 
                    size="sm" 
                    onClick={validateAndApply} 
                    disabled={isValidating || !newUrl.trim()}
                  >
                    {isValidating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
                  </Button>
                </div>
                {error && <p className="text-[10px] text-destructive font-medium">{error}</p>}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
