'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { 
  Mail, 
  ArrowUpRight
} from 'lucide-react';

// Custom Brand Icons as SVG components
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function PortfolioPage() {
  const categories = ['All', 'Shorts', 'Podcasts', 'Motion', 'Talking', 'Vlogs'];
  
  const stats = [
    { value: '08+', label: 'Years of Experience' },
    { value: '150+', label: 'Clients Worldwide' },
    { value: '1.2k', label: 'Projects Delivered' },
    { value: '45M', label: 'Total Views' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* 1. HEADER */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter font-serif italic">
            LV<span className="text-primary">.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <Link href="#works" className="hover:text-primary transition-colors">Works</Link>
            <Link href="#about" className="hover:text-primary transition-colors">About</Link>
            <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="font-mono text-[10px]">MENU</Button>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* 2. HERO - RECONSTRUCTED COMPACT BLOCK */}
        <section className="container mx-auto px-6 py-24 md:py-40 flex flex-col items-center justify-center">
          <div className="w-full flex flex-col items-center text-center">
            {/* Label */}
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Leonardo Verona — Video Editor
            </div>
            
            {/* Headline Block - Compressed Stacking */}
            <h1 className="flex flex-col items-center mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <span className="text-[clamp(2.5rem,8vw,6.5rem)] font-serif italic font-light leading-none mb-[-0.25em] z-10 text-white/90">
                CRAFTING
              </span>
              <span className="text-[clamp(3.5rem,15vw,13rem)] font-black leading-[0.8] tracking-tighter flex flex-col md:flex-row items-center md:gap-[0.1em]">
                <span className="text-outline uppercase">VISUAL</span>
                <span className="uppercase">NARRATIVES.</span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 font-mono uppercase tracking-tight">
              Transforming raw footage into high-impact digital experiences. Specialized in fast-paced storytelling and cinematic motion graphics.
            </p>

            {/* CTA Button */}
            <Button size="lg" className="rounded-full px-10 h-16 text-base font-bold group transition-all hover:scale-105 bg-white text-black hover:bg-primary hover:text-white">
              View Projects
              <ArrowUpRight className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </section>

        {/* 3. SELECTED WORKS */}
        <section id="works" className="py-24 bg-white/[0.02]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-2">Portfolio</span>
                <h2 className="text-4xl md:text-5xl font-bold font-serif">Selected Works</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Badge 
                    key={cat} 
                    variant={cat === 'All' ? 'default' : 'outline'} 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all font-mono text-[9px] px-4 py-1.5 uppercase tracking-tighter"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PlaceHolderImages.map((work, index) => (
                <Card key={work.id || index} className="group relative overflow-hidden bg-transparent border-white/5 transition-all hover:border-primary/50">
                  <CardContent className="p-0 relative aspect-video overflow-hidden">
                    <Image 
                      src={work.imageUrl} 
                      alt={work.description}
                      width={800}
                      height={600}
                      className="object-cover w-full h-full duotone-primary transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
                      data-ai-hint={work.imageHint}
                    />
                    <div className="absolute inset-0 halftone-overlay pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-primary mb-1">Project {index + 1}</span>
                      <h3 className="text-xl font-bold text-white">{work.description}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 4. STATS */}
        <section className="py-24 border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="text-5xl md:text-7xl font-bold mb-2 font-mono tracking-tighter text-white">
                    {stat.value}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CALL TO ACTION */}
        <section id="contact" className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 italic font-serif">Ready to tell your story?</h2>
            <p className="text-muted-foreground mb-12 max-w-xl mx-auto font-mono text-sm uppercase tracking-widest">
              Available for freelance opportunities and long-term partnerships.
            </p>
            <Button size="lg" variant="default" className="rounded-full px-12 h-16 text-lg font-bold">
              Let&apos;s Talk
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        </section>
      </main>

      {/* 6. FOOTER */}
      <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <DiscordIcon className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <WhatsAppIcon className="h-5 w-5" />
            </Link>
            <Link href="mailto:contact@leonardoverona.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            © 2024 Leonardo Verona. All rights reserved.
          </div>
          
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Built with <span className="text-primary italic">Next.js & Genkit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
