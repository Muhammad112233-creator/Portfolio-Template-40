'use client';

import { useEffect, useRef, useState } from 'react';
import { useGame } from '@/store/useGame';

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);
  const isTouch = useGame((s) => s.isTouch);

  useEffect(() => {
    if (isTouch) return;
    document.body.classList.add('custom-cursor');
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVisible(true);
      const t = e.target as HTMLElement;
      setHover(!!t.closest('a,button,[role=button],input,textarea,[data-cursor]'));
    };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${hover ? 1.6 : down ? 0.8 : 1})`;
      raf = requestAnimationFrame(loop);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', () => setDown(true));
    window.addEventListener('mouseup', () => setDown(false));
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    raf = requestAnimationFrame(loop);
    return () => {
      document.body.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      cancelAnimationFrame(raf);
    };
  }, [isTouch, hover, down]);

  if (isTouch) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]" style={{ opacity: visible ? 1 : 0 }}>
      <div
        ref={ring}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-primary-200/80 transition-[border-color,background-color] duration-200"
        style={{ borderColor: hover ? '#5be0ff' : 'rgba(254,160,192,0.8)', background: hover ? 'rgba(91,224,255,0.08)' : 'transparent' }}
      />
      <div ref={dot} className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-primary-200" />
    </div>
  );
}
