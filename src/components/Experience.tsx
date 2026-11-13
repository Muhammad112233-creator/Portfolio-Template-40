'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useGame } from '@/store/useGame';
import { useLenis } from '@/lib/useLenis';
import { useKeyboard } from '@/lib/useKeyboard';
import { useGamepad } from '@/lib/useGamepad';
import Cursor from './Cursor';
import Preloader from './Preloader';
import WantedPoster from './WantedPoster';
import StartScreen from './StartScreen';
import HUD from './HUD';
import Menu from './Menu';
import Chapters from './Chapters';

const VoyageScene = dynamic(() => import('./scene/VoyageScene'), { ssr: false });

export default function Experience() {
  const phase = useGame((s) => s.phase);
  const setIsTouch = useGame((s) => s.setIsTouch);
  const setReducedMotion = useGame((s) => s.setReducedMotion);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, [setIsTouch, setReducedMotion]);

  useLenis(phase === 'voyage' || phase === 'end');
  useKeyboard();
  useGamepad();

  const inVoyage = phase === 'voyage' || phase === 'end';

  return (
    <main className="relative min-h-screen">
      <Cursor />
      {phase === 'loading' && <Preloader />}
      {phase === 'poster' && <WantedPoster />}
      {phase === 'start' && <StartScreen />}
      {inVoyage && (
        <>
          <VoyageScene />
          <HUD />
          <Menu />
          <Chapters />
        </>
      )}
    </main>
  );
}
