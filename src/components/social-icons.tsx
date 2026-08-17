'use client';

import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.27 4.73C17.78 4.05 16.2 3.56 14.53 3.32a.066.066 0 0 0-.07.03c-.2.36-.43.83-.58 1.18-1.77-.26-3.53-.26-5.26 0-.16-.35-.4-.82-.6-1.18a.066.066 0 0 0-.07-.03c-1.67.24-3.25.73-4.74 1.41a.067.067 0 0 0-.03.03C.32 8.52-.45 12.22.25 15.86a.07.07 0 0 0 .03.05c2.1 1.54 4.12 2.48 6.1 3.09a.07.07 0 0 0 .08-.02c.47-.64.88-1.32 1.23-2.04a.07.07 0 0 0-.04-.09c-.67-.26-1.3-.57-1.9-.94a.07.07 0 0 1-.01-.12c.13-.1.26-.2.38-.3a.07.07 0 0 1 .07-.01c3.94 1.8 8.19 1.8 12.09 0a.07.07 0 0 1 .07.01c.12.1.25.2.38.3a.07.07 0 0 1-.01.12c-.6.37-1.23.68-1.9.94a.07.07 0 0 0-.04.09c.36.72.77 1.4 1.23 2.04a.07.07 0 0 0 .08.02c1.99-.61 4.01-1.55 6.11-3.09a.07.07 0 0 0 .03-.05c.82-4.43-.39-8.1-.25-11.13a.067.067 0 0 0-.03-.03zM8.19 13.08c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.95-2.42 2.16-2.42 1.21 0 2.18 1.09 2.16 2.42 0 1.34-.95 2.42-2.16 2.42zm7.65 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.95-2.42 2.16-2.42 1.21 0 2.18 1.09 2.16 2.42 0 1.34-.95 2.42-2.16 2.42z"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

export function SocialIcons() {
  return (
    <ul className="flex gap-4 items-center">
      <li className="relative group icon-content">
        <div className="tooltip absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-12 transition-all duration-300 bg-[#7289da] text-white px-3 py-1.5 rounded-md text-[11px] font-mono uppercase tracking-widest z-20 pointer-events-none">Discord</div>
        <Link href="https://discord.com/users/299338458231603202" className="relative overflow-hidden w-12 h-12 rounded-full bg-foreground/[0.05] border border-foreground/5 flex items-center justify-center text-muted-foreground transition-all duration-300 group hover:text-white" data-social="discord">
          <div className="filled absolute bottom-0 left-0 w-full h-0 bg-[#7289da] transition-all duration-300 group-hover:h-full"></div>
          <DiscordIcon className="h-5 w-5 relative z-10" />
        </Link>
      </li>
      <li className="relative group icon-content">
        <div className="tooltip absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-12 transition-all duration-300 bg-[#25d366] text-white px-3 py-1.5 rounded-md text-[11px] font-mono uppercase tracking-widest z-20 pointer-events-none">WhatsApp</div>
        <Link href="#" className="relative overflow-hidden w-12 h-12 rounded-full bg-foreground/[0.05] border border-foreground/5 flex items-center justify-center text-muted-foreground transition-all duration-300 group hover:text-white" data-social="whatsapp">
          <div className="filled absolute bottom-0 left-0 w-full h-0 bg-[#25d366] transition-all duration-300 group-hover:h-full"></div>
          <WhatsAppIcon className="h-5 w-5 relative z-10" />
        </Link>
      </li>
      <li className="relative group icon-content">
        <div className="tooltip absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-12 transition-all duration-300 bg-primary text-white px-3 py-1.5 rounded-md text-[11px] font-mono uppercase tracking-widest z-20 pointer-events-none">Email</div>
        <Link href="mailto:00mezzomo@gmail.com" className="relative overflow-hidden w-12 h-12 rounded-full bg-foreground/[0.05] border border-foreground/5 flex items-center justify-center text-muted-foreground transition-all duration-300 group hover:text-white" data-social="email">
          <div className="filled absolute bottom-0 left-0 w-full h-0 bg-primary transition-all duration-300 group-hover:h-full"></div>
          <Mail className="h-5 w-5 relative z-10" />
        </Link>
      </li>
    </ul>
  );
}
