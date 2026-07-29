'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { Pencil, Check, X, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EditableImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  storageKey: string;
  containerClassName?: string;
}

export function EditableImage({ src: defaultSrc, storageKey, containerClassName, ...props }: EditableImageProps) {
  const [currentSrc, setCurrentSrc] = useState(defaultSrc);
  const [newUrl, setNewUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize from session storage if available
  useEffect(() => {
    const saved = sessionStorage.getItem(`img_${storageKey}`);
    if (saved) setCurrentSrc(saved);
  }, [storageKey]);

  const validateAndApply = async () => {
    if (!newUrl.trim()) return;
    
    setIsValidating(true);
    setError(null);

    try {
      // Basic URL validation
      const url = new URL(newUrl);
      
      // Attempt to load the image to verify it's valid
      const img = new window.Image();
      img.src = newUrl;
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('Invalid image source'));
      });

      setCurrentSrc(newUrl);
      sessionStorage.setItem(`img_${storageKey}`, newUrl);
      setIsOpen(false);
      setNewUrl('');
    } catch (e) {
      setError('Please provide a valid image URL');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className={cn("group relative w-full h-full", containerClassName)}>
      <Image {...props} src={currentSrc} />
      
      <div className="absolute top-2 right-2 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button 
              size="icon" 
              variant="secondary" 
              className="h-8 w-8 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 backdrop-blur-md shadow-xl"
            >
              <Pencil className="h-3.5 w-3.5 text-white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-3 bg-background border-foreground/10 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Edit Image Source</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Input 
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="Paste image URL..."
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
    </div>
  );
}
