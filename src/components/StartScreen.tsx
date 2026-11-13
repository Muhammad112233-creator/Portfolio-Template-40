'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGame } from '@/store/useGame';
import { site } from '@/lib/content';
import { sfx } from '@/lib/audio';
import Logo from './Logo';

export default function StartScreen() {
  const start = useGame((s) => s.start);
  const soundOn = useGame((s) => s.soundOn);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.start-item', { opacity: 0, y: 26 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' });
    }, root);
    return () => ctx.revert();
  }, []);

  const onStart = () => {
    if (soundOn) sfx.start();
    start();
  };

  return (
    <div ref={root} className="fixed inset-0 z-[80] flex flex-col items-center justify-center overflow-hidden bg-navy-900 px-page text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(29,40,80,0.7),transparent_60%),radial-gradient(ellipse_at_50%_100%,rgba(232,80,138,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.4)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="start-item relative mb-8">
        <Logo className="h-16 w-16 sm:h-20 sm:w-20" />
      </div>
      <p className="start-item font-wanted-fine text-xs uppercase tracking-[0.5em] text-primary-200">{site.alias}</p>
      <h1 className="start-item font-headline mt-3 text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-tight">
        {site.name}
      </h1>
      <p className="start-item mt-4 max-w-xl text-balance text-sm text-peri-100/80 sm:text-lg">{site.role}</p>

      <button onClick={onStart} className="start-item btn-game mt-10 text-base sm:text-lg" data-cursor>
        Start voyage
        <span className="key-cap">ENTER</span>
      </button>

      <div className="start-item mt-8 flex flex-col items-center gap-3 text-xs text-peri-100/60 sm:flex-row sm:gap-6 sm:text-sm">
        <span>Not in the mood for games?</span>
        <Link href="/simple" className="link-underline text-peri-100 hover:text-white">Simple Website Version →</Link>
      </div>

      <div className="start-item absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-6 font-wanted-fine text-[10px] uppercase tracking-[0.3em] text-peri-100/50">
        <span className="flex items-center gap-2"><span className="key-cap">↕</span> Move</span>
        <span className="flex items-center gap-2"><span className="key-cap">A</span> Select</span>
        <span className="hidden items-center gap-2 sm:flex"><span className="key-cap">N</span> Menu</span>
      </div>
    </div>
  );
}
