import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import { SmoothScroll } from '@/components/smooth-scroll';
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
  preload: true,
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portfolio | Leonardo Verona - Video Editor',
  description: 'Selected works and professional portfolio of Leonardo Verona, specialized in cinematic storytelling and motion design.',
  keywords: ['Video Editor', 'Motion Design', 'Color Grading', 'Portfolio', 'Leonardo Verona', 'Cinematic', 'Visual Storytelling'],
  authors: [{ name: 'Leonardo Verona' }],
  icons: {
    icon: [
      { url: 'https://i.imgur.com/dbHLAzR.png', sizes: '32x32', type: 'image/png' },
      { url: 'https://i.imgur.com/dbHLAzR.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: 'https://i.imgur.com/dbHLAzR.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Leonardo Verona | Video Editor Portfolio',
    description: 'Expert cinematic visual storytelling and video editing.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Leonardo Verona Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leonardo Verona | Video Editor',
    description: 'Expert video editing and motion design portfolio.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-primary selection:text-primary-foreground overflow-x-clip" suppressHydrationWarning>
        <SmoothScroll />
        <div className="fixed inset-0 pointer-events-none z-[9997] mix-blend-soft-light opacity-[0.03] bg-white hidden dark:block" suppressHydrationWarning aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
