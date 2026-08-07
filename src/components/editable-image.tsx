'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface EditableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  storageKey: string;
  containerClassName?: string;
  fill?: boolean;
  priority?: boolean;
}

export function EditableImage({ 
  src: defaultSrc, 
  storageKey, 
  containerClassName, 
  fill, 
  priority,
  className,
  alt,
  ...props 
}: EditableImageProps) {
  const [currentSrc, setCurrentSrc] = useState(defaultSrc);

  useEffect(() => {
    const saved = sessionStorage.getItem(`img_${storageKey}`);
    if (saved) setCurrentSrc(saved);
  }, [storageKey]);

  return (
    <div className={cn(
      "group relative overflow-hidden", 
      fill ? "absolute inset-0 w-full h-full" : "w-full h-full",
      containerClassName
    )} suppressHydrationWarning>
      <Image 
        src={currentSrc} 
        alt={alt || "Portfolio visual"}
        fill={fill}
        width={!fill ? Number(props.width) || 800 : undefined}
        height={!fill ? Number(props.height) || 600 : undefined}
        className={cn(
          className,
          fill ? "object-cover" : "object-cover"
        )}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        data-ai-hint={props['data-ai-hint']}
      />
    </div>
  );
}
