import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portfolio | Leonardo Verona',
  description: 'Selected works and professional portfolio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased selection:bg-primary selection:text-primary-foreground overflow-x-hidden" suppressHydrationWarning>
        {/* Cinematic Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[9997] mix-blend-soft-light opacity-[0.03] bg-white hidden dark:block" />
        {children}
      </body>
    </html>
  );
}
