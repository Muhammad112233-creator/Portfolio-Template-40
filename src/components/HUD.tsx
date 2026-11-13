'use client';

import Link from 'next/link';
import { useGame } from '@/store/useGame';
import { chapters, site } from '@/lib/content';
import { scrollToChapter } from '@/lib/useKeyboard';
import { sfx } from '@/lib/audio';
import Logo from './Logo';

export default function HUD() {
  const active = useGame((s) => s.activeChapter);
  const progress = useGame((s) => s.progress);
  const setMenu = useGame((s) => s.setMenu);
  const menuOpen = useGame((s) => s.menuOpen);
  const soundOn = useGame((s) => s.soundOn);
  const toggleSound = useGame((s) => s.toggleSound);
  const isTouch = useGame((s) => s.isTouch);

  const ping = (fn: () => void) => soundOn && fn();

  return (
    <>
      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-page py-5">
        <Link href="/" className="flex items-center gap-3 text-white/90 transition hover:text-white" aria-label="Home">
          <Logo className="h-9 w-9" />
          <span className="hidden font-wanted-fine text-xs uppercase tracking-[0.35em] sm:block">{site.alias}</span>
        </Link>

        <div className="hidden items-center gap-5 text-sm text-peri-100/80 lg:flex">
          {chapters.map((c, i) => (
            <button
              key={c.id}
              onClick={() => { ping(sfx.hover); scrollToChapter(i); }}
              className={`link-underline transition ${i === active ? 'text-white' : 'hover:text-white'}`}
            >
              <span className="mr-1 font-wanted-fine text-[10px] text-primary-200">{c.index}</span>
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { toggleSound(); ping(sfx.coin); }}
            className="hud-ring text-xs" style={{ width: '2.5rem', height: '2.5rem' }}
            aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
            title={soundOn ? 'Sound on' : 'Sound off'}
          >
            {soundOn ? '♪' : '×'}
          </button>
          <button
            onClick={() => { ping(sfx.select); setMenu(!menuOpen); }}
            className="hud-ring animate-menu-glow font-wanted-fine text-sm" style={{ width: '2.75rem', height: '2.75rem' }}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            N
          </button>
        </div>
      </header>

      {/* side chapter dots */}
      <nav className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-4 md:flex" aria-label="Chapters">
        {chapters.map((c, i) => (
          <button
            key={c.id}
            onClick={() => { ping(sfx.hover); scrollToChapter(i); }}
            className="group flex items-center justify-end gap-3"
            aria-label={`Go to ${c.label}`}
          >
            <span className={`font-wanted-fine text-[10px] uppercase tracking-widest transition ${i === active ? 'text-primary-200 opacity-100' : 'text-peri-100/50 opacity-0 group-hover:opacity-100'}`}>
              {c.label}
            </span>
            <span className={`block rounded-full transition-all ${i === active ? 'h-3 w-3 bg-primary-200 shadow-[0_0_14px_#fea0c0]' : 'h-2 w-2 bg-white/30 group-hover:bg-white/60'}`} />
          </button>
        ))}
      </nav>

      {/* bottom HUD */}
      <footer className="fixed inset-x-0 bottom-0 z-30 flex items-end justify-between px-page pb-5 text-shadow-hud">
        <div className="flex items-center gap-5 font-wanted-fine text-[10px] uppercase tracking-[0.3em] text-peri-100/60">
          {!isTouch && (
            <>
              <span className="flex items-center gap-2"><span className="key-cap">↕</span> Move</span>
              <span className="flex items-center gap-2"><span className="key-cap">A</span> Select</span>
              <span className="hidden items-center gap-2 sm:flex"><span className="key-cap">B</span> Back</span>
            </>
          )}
          {isTouch && <span>Swipe to sail</span>}
        </div>

        <div className="flex flex-col items-center gap-2 text-peri-100/60">
          <span className="font-wanted-fine text-[10px] uppercase tracking-[0.35em]">Scroll to continue</span>
          <span className="block h-6 w-px animate-pulse-soft bg-current" />
        </div>

        <div className="flex items-center gap-3 font-wanted-fine text-[10px] uppercase tracking-[0.3em] text-peri-100/60">
          <span>{String(active + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}</span>
          <span className="relative h-1 w-20 overflow-hidden rounded-full bg-white/10">
            <span className="absolute inset-y-0 left-0 bg-primary-200 transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
          </span>
        </div>
      </footer>
    </>
  );
}
