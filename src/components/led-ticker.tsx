'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const LED_BITMAPS: Record<string, number[][]> = {
  'V': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,1,0,1,0],[0,0,1,0,0]],
  'E': [[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  'R': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,1,0],[1,0,0,0,1],[1,0,0,0,1]],
  'O': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'N': [[1,0,0,0,1],[1,1,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1]],
  'A': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'S': [[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,0]],
  'T': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  'U': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'D': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
  'I': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],
  ' ': [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
};

export function LEDTicker({ text }: { text: string }) {
  const characters = (text.toUpperCase() + " ").split('');
  
  return (
    <div className="w-full bg-background py-2 overflow-hidden flex items-center border-t border-foreground/5 shadow-2xl" aria-hidden="true">
      <div className="animate-marquee whitespace-nowrap flex w-max shrink-0">
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex gap-4 md:gap-8 px-2 md:px-4 items-center shrink-0">
            {characters.map((char, charIndex) => (
              <div key={`${setIndex}-${charIndex}`} className="grid grid-cols-5 gap-[2px] md:gap-[4px] shrink-0">
                {(LED_BITMAPS[char] || LED_BITMAPS[' ']).map((row, rowIndex) => (
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={cn(
                        "w-[4px] h-[8px] md:w-[6px] md:h-[12px] rounded-full transition-all duration-300",
                        cell 
                          ? "bg-foreground shadow-[0_0_12px_rgba(var(--foreground),0.4)]" 
                          : "bg-foreground/5"
                      )}
                    />
                  ))
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
