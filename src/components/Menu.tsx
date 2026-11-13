'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useGame } from '@/store/useGame';
import { chapters, site, socials } from '@/lib/content';
import { scrollToChapter } from '@/lib/useKeyboard';
import { sfx } from '@/lib/audio';

export default function Menu() {
  const open = useGame((s) => s.menuOpen);
  const setMenu = useGame((s) => s.setMenu);
  const soundOn = useGame((s) => s.soundOn);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const go = (i: number) => {
    if (soundOn) sfx.select();
    setMenu(false);
    setTimeout(() => scrollToChapter(i), 250);
  };

  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-300 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-md" onClick={() => setMenu(false)} />
      <div className={`relative flex h-full flex-col px-page py-6 transition-transform duration-500 ${open ? 'translate-y-0' : '-translate-y-6'}`}>
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <span className="font-wanted-fine text-xs uppercase tracking-[0.4em] text-primary-200">Pause · Menu</span>
          <button onClick={() => { if (soundOn) sfx.back(); setMenu(false); }} className="group flex items-center gap-3 text-white/80 transition hover:text-white">
            <span className="key-cap">B</span>
            <span className="key-cap">Esc</span>
            <span className="text-sm">Close</span>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pt-8 md:pt-12">
          <ul className="flex flex-col gap-2">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <button
                  onClick={() => go(i)}
                  className="group flex w-full items-baseline gap-5 py-2 text-left transition hover:translate-x-2"
                >
                  <span className="font-wanted-fine text-sm text-primary-200">{c.index}</span>
                  <span className="font-headline text-[clamp(1.8rem,5vw,3.5rem)] leading-none text-white/85 transition group-hover:text-white">{c.label}</span>
                  <span className="ml-auto hidden text-peri-100/40 transition group-hover:text-peri-100 sm:block">→</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-2">
            <div>
              <p className="mb-3 font-wanted-fine text-[10px] uppercase tracking-[0.35em] text-peri-100/50">Elsewhere</p>
              <div className="flex flex-wrap gap-4">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="link-underline text-sm text-peri-100 hover:text-white">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 font-wanted-fine text-[10px] uppercase tracking-[0.35em] text-peri-100/50">Other versions</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link href="/simple" className="link-underline text-peri-100 hover:text-white">Simple website</Link>
                <Link href="/privacy" className="link-underline text-peri-100 hover:text-white">Privacy</Link>
                <Link href="/imprint" className="link-underline text-peri-100 hover:text-white">Imprint</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-peri-100/50">
          <span>© {site.year} {site.name}</span>
          <span className="font-wanted-fine uppercase tracking-[0.3em]">Player 1 · {site.alias}</span>
        </div>
      </div>
    </div>
  );
}
