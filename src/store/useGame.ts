'use client';

import { create } from 'zustand';

export type Phase = 'loading' | 'poster' | 'start' | 'voyage' | 'end';

type GameState = {
  phase: Phase;
  menuOpen: boolean;
  activeChapter: number;
  progress: number;
  soundOn: boolean;
  reducedMotion: boolean;
  isTouch: boolean;
  setPhase: (p: Phase) => void;
  setMenu: (open: boolean) => void;
  setActiveChapter: (i: number) => void;
  setProgress: (p: number) => void;
  toggleSound: () => void;
  setReducedMotion: (v: boolean) => void;
  setIsTouch: (v: boolean) => void;
  start: () => void;
  restart: () => void;
};

export const useGame = create<GameState>((set) => ({
  phase: 'loading',
  menuOpen: false,
  activeChapter: 0,
  progress: 0,
  soundOn: false,
  reducedMotion: false,
  isTouch: false,
  setPhase: (phase) => set({ phase }),
  setMenu: (menuOpen) => set({ menuOpen }),
  setActiveChapter: (activeChapter) => set({ activeChapter }),
  setProgress: (progress) => set({ progress }),
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setIsTouch: (isTouch) => set({ isTouch }),
  start: () => set({ phase: 'voyage', menuOpen: false }),
  restart: () => set({ phase: 'start', activeChapter: 0, progress: 0, menuOpen: false }),
}));
