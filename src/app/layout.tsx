import type { Metadata, Viewport } from 'next';
import { Inter, Archivo_Black, Tinos, Stint_Ultra_Condensed, Questrial, Oswald } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const archivo = Archivo_Black({ subsets: ['latin'], weight: '400', variable: '--font-archivo', display: 'swap' });
const tinos = Tinos({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-tinos', display: 'swap' });
const stint = Stint_Ultra_Condensed({ subsets: ['latin'], weight: '400', variable: '--font-stint', display: 'swap' });
const questrial = Questrial({ subsets: ['latin'], weight: '400', variable: '--font-questrial', display: 'swap' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald', display: 'swap' });

export const metadata: Metadata = {
  title: 'Nova D. Reyes — Creative Technologist, Gamification Designer & Speaker',
  description: 'A gamified 3D portfolio: wanted poster intro, island voyage and game-style navigation. Turning ordinary products into experiences people want to play.',
  keywords: ['portfolio', 'gamification', 'creative technologist', 'keynote speaker', '3D portfolio', 'Next.js'],
  authors: [{ name: 'Nova D. Reyes' }],
  openGraph: {
    title: 'Nova D. Reyes — Playmode Portfolio',
    description: 'Press start. A gamified 3D portfolio template.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#070b16',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} ${tinos.variable} ${stint.variable} ${questrial.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-navy-900 text-white">{children}</body>
    </html>
  );
}
