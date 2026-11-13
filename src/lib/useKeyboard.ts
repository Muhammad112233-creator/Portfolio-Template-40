'use client';

import { useEffect } from 'react';
import { useGame } from '@/store/useGame';
import { chapters } from '@/lib/content';
import { getLenis } from '@/lib/useLenis';
import { sfx } from '@/lib/audio';

export function scrollToChapter(i: number) {
  const el = document.getElementById(`chapter-${chapters[i]?.id}`);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

export function useKeyboard() {
  const phase = useGame((s) => s.phase);
  const menuOpen = useGame((s) => s.menuOpen);
  const soundOn = useGame((s) => s.soundOn);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      const g = useGame.getState();
      const play = (fn: () => void) => g.soundOn && fn();

      if (e.key === 'Enter' || e.key.toLowerCase() === 'a') {
        if (g.phase === 'poster') {
          e.preventDefault();
          play(sfx.select);
          g.setPhase('start');
        } else if (g.phase === 'start') {
          e.preventDefault();
          play(sfx.start);
          g.start();
        } else if (g.phase === 'end') {
          e.preventDefault();
          play(sfx.start);
          g.restart();
        } else if (g.phase === 'voyage' && !g.menuOpen) {
          const ch = chapters[g.activeChapter];
          if (ch) {
            play(sfx.select);
            if (ch.external) window.location.href = ch.href;
            else document.querySelector<HTMLElement>(`#chapter-${ch.id} [data-cta]`)?.click();
          }
        }
      }
      if (e.key === 'Escape' || e.key.toLowerCase() === 'b') {
        if (g.menuOpen) {
          e.preventDefault();
          play(sfx.back);
          g.setMenu(false);
        }
      }
      if (e.key.toLowerCase() === 'n' || e.key.toLowerCase() === 'm') {
        if (g.phase === 'voyage' || g.phase === 'start') {
          e.preventDefault();
          play(sfx.select);
          g.setMenu(!g.menuOpen);
        }
      }
      if (g.phase === 'voyage' && !g.menuOpen) {
        if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
          e.preventDefault();
          scrollToChapter(Math.min(chapters.length - 1, g.activeChapter + 1));
        }
        if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
          e.preventDefault();
          scrollToChapter(Math.max(0, g.activeChapter - 1));
        }
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= chapters.length) scrollToChapter(num - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, menuOpen, soundOn]);
}
