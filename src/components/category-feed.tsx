'use client';

import React from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditableImage } from '@/components/editable-image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface CategoryFeedProps {
  category: string;
  onClose: () => void;
}

export function CategoryFeed({ category, onClose }: CategoryFeedProps) {
  // Mock data for the feed items based on category
  const feedItems = [
    { id: '1', title: `${category.toUpperCase()} PROJECT 01`, desc: 'Advanced color grading and rhythmic pacing.', imgId: 'feed-1' },
    { id: '2', title: `${category.toUpperCase()} PROJECT 02`, desc: 'Dynamic motion graphics integration.', imgId: 'feed-2' },
    { id: '3', title: `${category.toUpperCase()} PROJECT 03`, desc: 'Audio-driven visual storytelling.', imgId: 'feed-3' },
    { id: '4', title: `${category.toUpperCase()} PROJECT 04`, desc: 'High-impact narrative editing.', imgId: 'feed-4' },
  ];

  return (
    <section className="relative w-full bg-background animate-reveal">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8 border-b border-foreground/5 pb-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">Now Viewing</span>
            <h2 className="font-serif text-3xl italic font-bold text-foreground lowercase">{category}</h2>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="rounded-full hover:bg-primary/10 hover:text-primary transition-all"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Vertical Snap Feed */}
        <div className="relative h-[85vh] w-full max-w-4xl mx-auto overflow-y-scroll snap-y snap-mandatory scrollbar-hide border-x border-foreground/5 bg-black rounded-none shadow-2xl">
          {feedItems.map((item, idx) => {
            const img = PlaceHolderImages.find(p => p.id === item.imgId);
            return (
              <div 
                key={item.id} 
                className="relative w-full h-full snap-start overflow-hidden group"
              >
                {/* Background Image with Duotone */}
                {img && (
                  <EditableImage 
                    src={img.imageUrl} 
                    alt={item.title}
                    storageKey={`feed-${category}-${item.id}`}
                    fill
                    className="object-cover duotone-primary opacity-60 transition-transform duration-[2000ms] group-hover:scale-105"
                    data-ai-hint={img.imageHint}
                  />
                )}
                
                {/* Overlay Textures */}
                <div className="absolute inset-0 halftone-overlay pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-20" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-4 block">
                    0{idx + 1} / 0{feedItems.length}
                  </span>
                  <h3 className="font-serif text-4xl md:text-6xl font-bold text-white leading-none tracking-tighter mb-4">
                    {item.title}<span className="text-primary">.</span>
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-white/60 max-w-md">
                    {item.desc}
                  </p>
                </div>

                {/* Scroll Indicator (Inside Feed) */}
                {idx < feedItems.length - 1 && (
                  <div className="absolute bottom-8 right-8 z-30 animate-bounce hidden md:block">
                    <ChevronDown className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Footer info for feed */}
        <div className="mt-6 text-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            Scroll vertically to explore • Click X to close
          </p>
        </div>
      </div>
    </section>
  );
}