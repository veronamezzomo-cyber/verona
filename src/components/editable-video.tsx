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

  // Handle startTime
  useEffect(() => {
    const video = videoRef.current;
    if (video && startTime !== undefined) {
      const handleMetadata = () => {
        video.currentTime = startTime;
      };
      
      if (video.readyState >= 1) {
        handleMetadata();
      } else {
        video.addEventListener('loadedmetadata', handleMetadata);
      }
      
      return () => video.removeEventListener('loadedmetadata', handleMetadata);
    }
  }, [currentSrc, startTime]);

  const validateAndApply = async () => {
    if (!newUrl.trim()) return;
    
    setIsValidating(true);
    setError(null);

    try {
      // Basic URL validation
      new URL(newUrl);
      
      // Update state and storage
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
        {...props} 
        ref={videoRef}
        src={currentSrc || undefined} 
        className={cn(
          className,
          fill && "absolute inset-0 w-full h-full object-cover"
        )}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      
      {!hideControls && (
        <div className="absolute top-2 right-2 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2" suppressHydrationWarning>
          <div 
            role="button"
            tabIndex={0}
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMute(e as any);
              }
            }}
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
                aria-label="Edit video source"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "icon" }),
                  "h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 backdrop-blur-md shadow-xl cursor-pointer"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(true);
                  }
                }}
              >
                <Pencil className="h-3.5 w-3.5 text-white" />
              </div>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-3 bg-background border-foreground/10 shadow-2xl backdrop-blur-xl">
              <div className="flex flex-col gap-3" suppressHydrationWarning>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Edit Video Source</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)} aria-label="Close popover">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="Paste video URL (mp4, webm)..."
                    className="h-9 text-xs bg-muted/50"
                    onKeyDown={(e) => e.key === 'Enter' && validateAndApply()}
                  />
                  <Button 
                    size="sm" 
                    onClick={validateAndApply} 
                    disabled={isValidating || !newUrl.trim()}
                    className="h-9 px-3 bg-primary hover:bg-primary/90"
                  >
                    {isValidating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
                  </Button>
                </div>
                
                {error && <p className="text-[10px] text-destructive font-medium">{error}</p>}
                
                <p className="text-[9px] text-muted-foreground italic">
                  Changes are temporary and stored in your session.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
