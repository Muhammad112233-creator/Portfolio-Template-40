'use client';

import { useEffect } from 'react';
import { useGame } from '@/store/useGame';
import { chapters } from '@/lib/content';
import { scrollToChapter } from '@/lib/useKeyboard';
import { sfx } from '@/lib/audio';

export function useGamepad() {
  useEffect(() => {
    let raf = 0;
    let prev: boolean[] = [];
    const loop = () => {
      const pads = navigator.getGamepads?.() ?? [];
      const pad = Array.from(pads).find(Boolean);
      if (pad) {
        const g = useGame.getState();
        const play = (fn: () => void) => g.soundOn && fn();
        const pressed = (i: number) => !!pad.buttons[i]?.pressed && !prev[i];
        if (pressed(0)) {
          // A / cross
          if (g.phase === 'poster') g.setPhase('start');
          else if (g.phase === 'start') g.start();
          else if (g.phase === 'end') g.restart();
          else if (g.phase === 'voyage' && !g.menuOpen) {
            const ch = chapters[g.activeChapter];
            if (ch?.external) window.location.href = ch.href;
            else document.querySelector<HTMLElement>(`#chapter-${ch?.id} [data-cta]`)?.click();
          }
          play(sfx.select);
        }
        if (pressed(1) && g.menuOpen) {
          g.setMenu(false);
          play(sfx.back);
        }
        if (pressed(9)) {
          g.setMenu(!g.menuOpen);
          play(sfx.select);
        }
        if (g.phase === 'voyage' && !g.menuOpen) {
          if (pressed(13)) scrollToChapter(Math.min(chapters.length - 1, g.activeChapter + 1));
          if (pressed(12)) scrollToChapter(Math.max(0, g.activeChapter - 1));
        }
        prev = pad.buttons.map((b) => b.pressed);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
}
