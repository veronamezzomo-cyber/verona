'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  Mail, 
  ArrowRight
} from 'lucide-react';

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

  const profileImage = PlaceHolderImages.find(i => i.id === 'hero-profile');
  const projectImages = PlaceHolderImages.filter(i => i.id !== 'hero-profile');

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* 1. HEADER */}
      <header className="fixed top-0 w-full z-50 border-b border-foreground/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter font-serif italic text-foreground">
            LV<span className="text-primary">.</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <Link href="#works" className="hover:text-primary transition-colors">Works</Link>
            <Link href="#about" className="hover:text-primary transition-colors">About</Link>
            <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Avatar className="h-8 w-8 border border-foreground/10">
              <AvatarImage src={profileImage?.imageUrl} alt="Leonardo Verona" className="object-cover" />
              <AvatarFallback className="font-mono text-[10px]">LV</AvatarFallback>
            </Avatar>
            <div className="md:hidden">
              <Button variant="ghost" size="sm" className="font-mono text-[10px]">MENU</Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* 2. SPLIT HERO */}
        <section className="relative min-h-screen lg:min-h-[90vh] flex items-center pt-20 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-0 items-center">
              {/* Left Content */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8 py-12 lg:py-0 lg:pr-12">
                <div className="animate-slide-up [animation-delay:100ms]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-bold">
                    Video Editor • Brazil
                  </span>
                </div>
                
                <h1 className="font-serif font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tighter text-foreground animate-slide-up [animation-delay:200ms]">
                  CRAFTING<br />
                  VISUAL<br />
                  STORYTELLING<span className="text-primary">.</span>
                </h1>

                <p className="text-muted-foreground text-lg max-w-md font-mono uppercase tracking-tight animate-slide-up [animation-delay:300ms]">
                  Transforming raw concepts into cinematic digital experiences with precision and pace.
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 pt-4 animate-slide-up [animation-delay:400ms]">
                  <Button size="lg" className="rounded-none px-10 h-16 text-base font-bold bg-foreground text-background hover:opacity-90 transition-all duration-300 shadow-xl">
                    View Projects
                  </Button>
                  <Link href="#contact" className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] font-bold text-foreground hover:text-primary transition-colors">
                    Contact Me <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right Image (Poster Style) */}
              <div className="p-6 lg:p-12 animate-image-reveal">
                <div className="relative aspect-[3/4] lg:aspect-auto lg:h-[75vh] group overflow-hidden border border-foreground/5 bg-muted shadow-2xl">
                  {profileImage && (
                    <Image 
                      src={profileImage.imageUrl} 
                      alt={profileImage.description}
                      fill
                      className="object-cover duotone-primary transition-transform duration-1000 group-hover:scale-105"
                      priority
                      data-ai-hint={profileImage.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 halftone-overlay pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-reveal [animation-delay:800ms]">
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-primary font-bold">Scroll</span>
            <div className="w-[2px] h-12 bg-primary/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-primary animate-scroll-line shadow-[0_0_10px_rgba(139,30,46,0.5)]" />
            </div>
          </div>
        </section>

        {/* 3. SELECTED WORKS */}
        <section id="works" className="py-24 border-t border-foreground/5">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-2 font-bold">Portfolio</span>
                <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground">Selected Works</h2>
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-2">
                {categories.map((cat) => (
                  <Badge 
                    key={cat} 
                    variant={cat === 'All' ? 'default' : 'outline'} 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all font-mono text-[9px] px-4 py-1.5 uppercase tracking-tighter rounded-none"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectImages.map((work, index) => (
                <Card key={work.id || index} className="group relative overflow-hidden bg-transparent border-foreground/5 rounded-none transition-all hover:border-primary/50">
                  <CardContent className="p-0 relative aspect-video overflow-hidden">
                    <Image 
                      src={work.imageUrl} 
                      alt={work.description}
                      width={800}
                      height={600}
                      className="object-cover w-full h-full duotone-primary grayscale transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
                      data-ai-hint={work.imageHint}
                    />
                    <div className="absolute inset-0 halftone-overlay pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-primary mb-1 font-bold">Project {index + 1}</span>
                      <h3 className="text-xl font-bold text-foreground">{work.description}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 4. STATS */}
        <section className="py-24 border-y border-foreground/5 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="text-5xl md:text-7xl font-bold mb-2 font-mono tracking-tighter text-foreground">
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
            <h2 className="text-5xl md:text-7xl font-bold mb-8 italic font-serif text-foreground">Ready to tell your story?</h2>
            <p className="text-muted-foreground mb-12 max-w-xl mx-auto font-mono text-sm uppercase tracking-widest">
              Available for freelance opportunities and long-term partnerships worldwide.
            </p>
            <Button size="lg" className="rounded-none px-12 h-16 text-lg font-bold bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300">
              Let&apos;s Talk
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        </section>
      </main>

      {/* 6. FOOTER */}
      <footer className="py-12 border-t border-foreground/5">
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
            © 2024 Leonardo Verona.
          </div>
          
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Built with <span className="text-primary italic">Next.js & Genkit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
