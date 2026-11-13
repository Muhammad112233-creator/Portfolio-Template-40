'use client';

import { useEffect, useState } from 'react';
import { useGame } from '@/store/useGame';

export default function Preloader() {
  const setPhase = useGame((s) => s.setPhase);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(100, v + Math.random() * 14 + 4);
      setPct(Math.round(v));
      if (v >= 100) {
        clearInterval(id);
        setTimeout(() => setPhase('poster'), 450);
      }
    }, 120);
    return () => clearInterval(id);
  }, [setPhase]);

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-navy-900">
      <div className="flex w-64 flex-col items-center gap-6">
        <div className="relative h-12 w-12 [perspective:600px]">
          <div className="absolute inset-0 animate-coin rounded-full border-4 border-gold bg-gold/30 [transform-style:preserve-3d]" />
        </div>
        <div className="w-full">
          <div className="mb-2 flex justify-between font-wanted-fine text-xs uppercase tracking-[0.3em] text-peri-100/70">
            <span>Loading…</span>
            <span>{pct}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-primary-200 transition-[width] duration-150" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <p className="animate-blink font-wanted-fine text-[10px] uppercase tracking-[0.35em] text-peri-100/50">Insert coin</p>
      </div>
    </div>
  );
}
