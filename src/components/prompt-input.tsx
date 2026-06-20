"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

export function PromptInput({ onGenerate, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) onGenerate(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="relative group w-full max-w-2xl mx-auto">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      <div className="relative flex items-center bg-card/60 backdrop-blur-xl rounded-2xl border border-white/10 p-2 shadow-2xl">
        <Sparkles className="ml-3 text-primary h-5 w-5 glow-primary" />
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Descreva seu layout UI..."
          className="bg-transparent border-none focus-visible:ring-0 text-lg py-6 shadow-none placeholder:text-muted-foreground/30 font-medium"
        />
        <Button 
          type="submit" 
          disabled={isLoading || !prompt.trim()}
          className="ml-2 font-headline uppercase tracking-[0.2em] px-8 h-12 bg-primary hover:bg-primary/90 glow-primary transition-all duration-300"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Gerar"}
        </Button>
      </div>
    </form>
  );
}