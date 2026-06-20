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
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
      <div className="relative flex items-center bg-card rounded-lg border border-border/50 p-2 shadow-2xl">
        <Sparkles className="ml-3 text-secondary h-5 w-5" />
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your UI layout (e.g., 'Modern chatbot with blue accents')..."
          className="bg-transparent border-none focus-visible:ring-0 text-lg py-6 shadow-none placeholder:text-muted-foreground/50 font-medium"
        />
        <Button 
          type="submit" 
          disabled={isLoading || !prompt.trim()}
          className="ml-2 font-headline uppercase tracking-wider px-6 h-12"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Forge Layout"}
        </Button>
      </div>
    </form>
  );
}
