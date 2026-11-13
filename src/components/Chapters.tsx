'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { chapters, services, keynotes, site } from '@/lib/content';
import { useGame } from '@/store/useGame';
import { sfx } from '@/lib/audio';
import { asset } from '@/lib/asset';

gsap.registerPlugin(ScrollTrigger);

function DetailModal({ id, onClose }: { id: string | null; onClose: () => void }) {
  const soundOn = useGame((s) => s.soundOn);
  useEffect(() => {
    if (!id) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' || e.key.toLowerCase() === 'b') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [id, onClose]);

  if (!id) return null;
  const ch = chapters.find((c) => c.id === id);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="chapter-card relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-3xl p-6 sm:p-10 animate-fade-up">
        <button onClick={() => { if (soundOn) sfx.back(); onClose(); }} className="absolute right-5 top-5 flex items-center gap-2 text-sm text-peri-100/70 hover:text-white">
          <span className="key-cap">B</span> Close
        </button>
        <p className="font-wanted-fine text-xs uppercase tracking-[0.4em]" style={{ color: ch?.accent }}>{ch?.index} · {ch?.label}</p>
        <h3 className="font-headline mt-2 text-3xl sm:text-4xl">{ch?.title}</h3>

        {id === 'services' && (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <article key={s.n} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="font-wanted-fine text-[10px] uppercase tracking-[0.3em] text-primary-200">{s.n} · {s.duration}</p>
                <h4 className="mt-2 text-lg font-bold">{s.title}</h4>
                <p className="mt-2 text-sm text-peri-100/75">{s.body}</p>
                <ul className="mt-4 space-y-1 text-xs text-peri-100/60">
                  {s.bullets.map((b) => <li key={b}>— {b}</li>)}
                </ul>
                <a href={`mailto:${site.email}?subject=${encodeURIComponent(s.cta)}`} className="btn-game mt-5 px-4 py-2 text-xs">{s.cta}</a>
              </article>
            ))}
          </div>
        )}

        {id === 'keynotes' && (
          <div className="mt-8 space-y-5">
            {keynotes.map((k) => (
              <article key={k.n} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="font-wanted-fine text-[10px] uppercase tracking-[0.3em] text-cyan-glow">Keynote {k.n} · 30–60 min</p>
                <h4 className="mt-1 text-xl font-bold">{k.title} <span className="text-peri-100/60">— {k.subtitle}</span></h4>
                <p className="mt-2 text-sm text-peri-100/75">{k.body}</p>
                {k.quote && <blockquote className="mt-3 border-l-2 border-primary-200 pl-3 text-sm italic text-primary-100">“{k.quote}”</blockquote>}
              </article>
            ))}
            <a href={`mailto:${site.email}?subject=Book%20a%20keynote`} className="btn-game">Book a keynote <span className="key-cap">A</span></a>
          </div>
        )}

        {id === 'books' && (
          <div className="mt-8 grid items-center gap-8 md:grid-cols-[200px_1fr]">
            <Image src={asset('/images/book-cover.webp')} alt="Press Start book cover" width={640} height={800} className="w-full rounded-xl shadow-2xl" />
            <div>
              <p className="text-peri-100/80">A 220-page field guide to designing products people want to return to — without dark patterns. Covers motivation loops, reward design, onboarding quests and community mechanics.</p>
              <ul className="mt-4 space-y-1 text-sm text-peri-100/60">
                <li>— Paperback & e-book</li>
                <li>— English edition</li>
                <li>— Free first chapter</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`mailto:${site.email}?subject=Press%20Start%20book`} className="btn-game">Order the book <span className="key-cap">A</span></a>
                <Link href="/simple#book" className="rounded-full border border-white/20 px-5 py-3 text-sm text-peri-100 hover:border-white/50">Read chapter one</Link>
              </div>
            </div>
          </div>
        )}

        {id === 'content' && (
          <div className="mt-8">
            <p className="text-peri-100/80">Weekly short-form video and newsletter on play, product and the future of work. Collaborations, sponsored deep-dives and conference takeovers.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { n: site.community, l: 'Community' },
                { n: '120+', l: 'Videos shipped' },
                { n: 'Weekly', l: 'Newsletter' },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
                  <p className="font-headline text-3xl text-lime">{s.n}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-peri-100/60">{s.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="btn-game">Instagram <span className="key-cap">A</span></a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-5 py-3 text-sm hover:border-white/50">LinkedIn</a>
            </div>
          </div>
        )}

        {id === 'contact' && (
          <div className="mt-8">
            <p className="text-peri-100/80">Tell me about your team, product or stage. I reply within two working days.</p>
            <a href={`mailto:${site.email}`} className="btn-game mt-6">{site.email} <span className="key-cap">A</span></a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Chapters() {
  const setActive = useGame((s) => s.setActiveChapter);
  const setProgress = useGame((s) => s.setProgress);
  const setPhase = useGame((s) => s.setPhase);
  const soundOn = useGame((s) => s.soundOn);
  const [modal, setModal] = useState<string | null>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      chapters.forEach((c, i) => {
        const el = document.getElementById(`chapter-${c.id}`);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
        gsap.fromTo(el.querySelectorAll('.reveal'), { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 65%', toggleActions: 'play none none reverse' },
        });
      });
      ScrollTrigger.create({
        trigger: wrap.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => setProgress(self.progress),
      });
      const end = document.getElementById('voyage-end');
      if (end) {
        ScrollTrigger.create({
          trigger: end, start: 'top 60%',
          onEnter: () => setPhase('end'),
          onLeaveBack: () => setPhase('voyage'),
        });
      }
    }, wrap);
    return () => ctx.revert();
  }, [setActive, setProgress, setPhase]);

  const open = (id: string, external?: boolean, href?: string) => {
    if (soundOn) sfx.select();
    if (external && href) { window.location.href = href; return; }
    setModal(id);
  };

  return (
    <div ref={wrap} className="relative z-10">
      {chapters.map((c, i) => (
        <section
          key={c.id}
          id={`chapter-${c.id}`}
          className={`flex min-h-[100svh] items-center px-page py-24 ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
        >
          <div className={`chapter-card w-full max-w-xl rounded-3xl p-7 sm:p-10 ${i % 2 === 0 ? '' : 'text-right'}`}>
            <p className="reveal font-wanted-fine text-xs uppercase tracking-[0.45em]" style={{ color: c.accent }}>
              {c.index} · {c.label}
            </p>
            <h2 className="reveal font-headline mt-3 text-[clamp(1.8rem,4.5vw,3.2rem)] leading-[1.02] tracking-tight">{c.title}</h2>
            <p className="reveal mt-4 text-balance text-sm leading-relaxed text-peri-100/80 sm:text-base">{c.body}</p>
            <div className={`reveal mt-7 flex ${i % 2 === 0 ? '' : 'justify-end'}`}>
              <button onClick={() => open(c.id, c.external, c.href)} className="btn-game" data-cta>
                {c.cta}
                <span className="key-cap">A</span>
              </button>
            </div>
          </div>
        </section>
      ))}

      <section id="voyage-end" className="flex min-h-[100svh] flex-col items-center justify-center px-page text-center">
        <p className="reveal font-wanted-fine text-xs uppercase tracking-[0.5em] text-primary-200">The voyage continues</p>
        <h2 className="reveal font-headline mt-4 text-[clamp(2.2rem,7vw,5.5rem)] leading-none">THANKS FOR<br />PLAYING</h2>
        <p className="reveal mt-5 max-w-md text-peri-100/75">Next stop: your project? Grab a controller and let’s build something people want to come back to.</p>
        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href={`mailto:${site.email}?subject=Set%20sail`} className="btn-game">Get in touch <span className="key-cap">A</span></a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-6 py-3 text-sm hover:border-white/50">LinkedIn <span className="key-cap ml-2">B</span></a>
        </div>
        <button onClick={() => { if (soundOn) sfx.start(); useGame.getState().restart(); window.scrollTo({ top: 0 }); }} className="reveal mt-10 animate-blink font-wanted-fine text-[11px] uppercase tracking-[0.4em] text-peri-100/60 hover:text-white">
          Press start to continue
        </button>
        <p className="reveal mt-12 text-xs text-peri-100/40">© {site.year} {site.name} · Made with play</p>
      </section>

      <DetailModal id={modal} onClose={() => setModal(null)} />
    </div>
  );
}
