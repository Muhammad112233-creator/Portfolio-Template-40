'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGame } from '@/store/useGame';
import { site } from '@/lib/content';
import { sfx } from '@/lib/audio';
import { asset } from '@/lib/asset';

export default function WantedPoster() {
  const setPhase = useGame((s) => s.setPhase);
  const soundOn = useGame((s) => s.soundOn);
  const root = useRef<HTMLDivElement>(null);
  const poster = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(poster.current, { y: 80, rotate: -3, opacity: 0, scale: 0.92 }, { y: 0, rotate: -1.2, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' });
      gsap.fromTo('.poster-line', { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.08, delay: 0.5, duration: 0.6, ease: 'power2.out' });
      gsap.fromTo('.poster-stamp', { scale: 2.4, opacity: 0, rotate: -25 }, { scale: 1, opacity: 0.85, rotate: -12, delay: 1.2, duration: 0.45, ease: 'back.out(2)' });
    }, root);
    return () => ctx.revert();
  }, []);

  const proceed = () => {
    if (soundOn) sfx.select();
    gsap.to(poster.current, {
      y: -120, opacity: 0, scale: 1.06, rotate: 2, duration: 0.6, ease: 'power2.in',
      onComplete: () => setPhase('start'),
    });
  };

  return (
    <div ref={root} className="fixed inset-0 z-[90] grid place-items-center overflow-hidden bg-navy-950 px-4 py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.75)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-scan bg-primary-200/20" />
      <button
        ref={poster as unknown as React.RefObject<HTMLButtonElement>}
        onClick={proceed}
        className="poster-paper poster-border grain relative block px-6 pb-6 pt-5 text-center transition-transform duration-300 hover:scale-[1.015] focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-glow sm:px-8 sm:pb-7 sm:pt-6"
        style={{ width: 'min(92vw, 440px, 50svh)' }}
        aria-label="Continue to start screen"
      >
        <p className="poster-line font-wanted-condensed text-[clamp(2.6rem,9vw,4.4rem)] leading-[0.9] tracking-[0.06em]">WANTED</p>
        <p className="poster-line font-wanted-serif text-[clamp(0.9rem,2.6vw,1.25rem)] font-bold tracking-[0.28em]">DEAD OR ALIVE</p>

        <div className="poster-line relative mx-auto my-3 aspect-[4/4.1] w-full overflow-hidden border-[3px] border-parchment-ink bg-parchment-dark/20">
          <Image src={asset('/images/wanted-portrait.webp')} alt="Wanted portrait" fill className="object-cover sepia-[0.35] contrast-[1.05]" priority sizes="(max-width: 640px) 90vw, 460px" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(74,52,38,0.55)_100%)]" />
          <span className="poster-stamp absolute bottom-3 right-3 grid h-16 w-16 place-items-center rounded-full border-[3px] border-primary-800 font-wanted-fine text-[10px] font-bold uppercase leading-tight text-primary-800">
            Play<br />Mode
          </span>
        </div>

        <p className="poster-line font-wanted-serif text-[clamp(1.5rem,5vw,2.4rem)] font-bold leading-none tracking-[0.04em]">
          {site.name.toUpperCase().replace(/ /g, '·')}
        </p>
        <p className="poster-line mt-1 font-wanted-fine text-xs uppercase tracking-[0.5em] text-parchment-ink/80">The Creative Guild</p>

        <p className="poster-line mx-auto mt-3 max-w-[34ch] font-wanted-serif text-[clamp(0.72rem,1.9vw,0.9rem)] font-bold uppercase leading-snug tracking-[0.06em]">
          {site.wantedFor}
        </p>

        <p className="poster-line mt-4 font-wanted-bounty text-[clamp(1.6rem,5.5vw,2.6rem)] leading-none tracking-[0.02em]">
          <span className="text-[0.7em]">B</span>
          {site.bounty.replace('$ ', '')}
        </p>

        <p className="poster-line mt-3 font-wanted-serif text-[clamp(0.6rem,1.6vw,0.72rem)] uppercase tracking-[0.12em] text-parchment-ink/80">
          {site.report}
        </p>

        <div className="poster-line mt-4 flex items-center justify-center gap-3 font-wanted-fine text-[11px] uppercase tracking-[0.3em] text-parchment-ink">
          <span className="key-cap" style={{ background: 'rgba(58,42,30,0.15)', color: '#3a2a1e' }}>A</span>
          <span className="animate-blink">Press to continue</span>
        </div>
      </button>
    </div>
  );
}
