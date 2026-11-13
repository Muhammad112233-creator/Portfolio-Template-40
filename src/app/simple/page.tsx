'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { chapters, clients, keynotes, services, site, socials } from '@/lib/content';
import Logo from '@/components/Logo';
import { asset } from '@/lib/asset';

gsap.registerPlugin(ScrollTrigger);

export default function SimplePage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 32 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-white/5 bg-navy-900/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-page py-4">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-8 w-8" />
            <span className="font-wanted-fine text-xs uppercase tracking-[0.35em]">{site.alias}</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-peri-100/80 md:flex">
            {chapters.map((c) => <a key={c.id} href={`#${c.id}`} className="link-underline hover:text-white">{c.label}</a>)}
          </nav>
          <Link href="/" className="rounded-full border border-white/15 px-4 py-2 text-xs text-peri-100 hover:border-white/40">Game version →</Link>
        </div>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden px-page pb-20 pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(29,40,80,0.8),transparent_55%),radial-gradient(ellipse_at_90%_100%,rgba(232,80,138,0.16),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl">
          <p data-reveal className="font-wanted-fine text-xs uppercase tracking-[0.5em] text-primary-200">{site.name} · {site.alias}</p>
          <h1 data-reveal className="font-headline mt-4 max-w-4xl text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95] tracking-tight">
            {site.tagline}
          </h1>
          <p data-reveal className="mt-6 max-w-2xl text-lg text-peri-100/80">{site.role}. Keynotes, workshops and gamification concepts for teams, products and stages.</p>
          <div data-reveal className="mt-8 flex flex-wrap gap-4">
            <a href={`mailto:${site.email}`} className="btn-game">Work with me</a>
            <a href="#services" className="rounded-full border border-white/20 px-6 py-3 text-sm hover:border-white/50">See services</a>
          </div>
        </div>
      </section>

      {/* marquee */}
      <div className="overflow-hidden border-y border-white/5 py-4">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-wanted-fine text-xs uppercase tracking-[0.35em] text-peri-100/50">
          {[...clients, ...clients].map((c, i) => <span key={i}>{c} <span className="ml-12 text-primary-200">✦</span></span>)}
        </div>
      </div>

      {/* about */}
      <section className="px-page py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_1fr]">
          <div data-reveal>
            <p className="font-wanted-fine text-xs uppercase tracking-[0.4em] text-primary-200">About</p>
            <h2 className="font-headline mt-3 text-3xl sm:text-4xl">Immersed in play, product and the psychology of coming back.</h2>
            <p className="mt-5 text-peri-100/80">I help teams channel passion, value and emotion into the things they build. With a background in creative technology and gamification, I design experiences that feel less like software and more like a game worth finishing.</p>
          </div>
          <dl data-reveal className="grid gap-4 self-end text-sm">
            {[
              ['Roles', 'Creative technology · Gamification · Keynotes'],
              ['Languages', 'English · Portuguese'],
              ['Book', 'Press Start — The Playful Product Playbook'],
              ['Community', `${site.community} on Instagram & LinkedIn`],
              ['Base', site.location],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 border-b border-white/10 pb-3">
                <dt className="text-peri-100/50">{k}</dt><dd className="text-right text-peri-100">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* services */}
      <section id="services" className="px-page py-24">
        <div className="mx-auto max-w-6xl">
          <p data-reveal className="font-wanted-fine text-xs uppercase tracking-[0.4em] text-primary-200">Work with me</p>
          <h2 data-reveal className="font-headline mt-3 text-3xl sm:text-5xl">Three ways to team up.</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {services.map((s) => (
              <article key={s.n} data-reveal className="chapter-card flex flex-col rounded-3xl p-7">
                <p className="font-wanted-fine text-[10px] uppercase tracking-[0.3em] text-primary-200">{s.n} · {s.kind} · {s.duration}</p>
                <h3 className="font-headline mt-3 text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm text-peri-100/75">{s.body}</p>
                <ul className="mt-5 space-y-2 text-sm text-peri-100/65">
                  {s.bullets.map((b) => <li key={b}>— {b}</li>)}
                </ul>
                <p className="mt-5 text-xs text-peri-100/50"><span className="text-peri-100/80">Formats</span> · {s.formats}</p>
                <a href={`mailto:${site.email}?subject=${encodeURIComponent(s.cta)}`} className="btn-game mt-6 self-start px-5 py-2.5 text-sm">{s.cta}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* keynotes */}
      <section id="keynotes" className="px-page py-24">
        <div className="mx-auto max-w-6xl">
          <p data-reveal className="font-wanted-fine text-xs uppercase tracking-[0.4em] text-cyan-glow">Keynotes</p>
          <h2 data-reveal className="font-headline mt-3 text-3xl sm:text-5xl">Talks that make work feel like play.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {keynotes.map((k) => (
              <article key={k.n} data-reveal className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
                <p className="font-wanted-fine text-[10px] uppercase tracking-[0.3em] text-cyan-glow">Keynote {k.n} · 30–60 min · Stage or remote</p>
                <h3 className="mt-2 text-2xl font-bold">{k.title}</h3>
                <p className="text-sm text-peri-100/60">{k.subtitle}</p>
                <p className="mt-4 text-sm text-peri-100/80">{k.body}</p>
                {k.quote && <blockquote className="mt-4 border-l-2 border-primary-200 pl-4 italic text-primary-100">“{k.quote}”</blockquote>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* book */}
      <section id="books" className="px-page py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[280px_1fr]">
          <Image data-reveal src={asset('/images/book-cover.webp')} alt="Press Start book cover" width={640} height={800} className="w-full rounded-2xl shadow-2xl" />
          <div data-reveal>
            <p className="font-wanted-fine text-xs uppercase tracking-[0.4em] text-gold">Books</p>
            <h2 className="font-headline mt-3 text-3xl sm:text-5xl">Press Start — The Playful Product Playbook.</h2>
            <p className="mt-5 text-peri-100/80">Gamification without the gimmicks. A practical guide to motivation, loops, rewards and the psychology of coming back — for product teams, HR and learning designers.</p>
            <div id="book" className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}?subject=Press%20Start%20book`} className="btn-game">Order the book</a>
              <a href={`mailto:${site.email}?subject=Chapter%20one`} className="rounded-full border border-white/20 px-6 py-3 text-sm hover:border-white/50">Read chapter one</a>
            </div>
          </div>
        </div>
      </section>

      {/* content */}
      <section id="content" className="px-page py-24">
        <div className="mx-auto max-w-6xl">
          <p data-reveal className="font-wanted-fine text-xs uppercase tracking-[0.4em] text-lime">Content Creation</p>
          <h2 data-reveal className="font-headline mt-3 text-3xl sm:text-5xl">Content that levels up.</h2>
          <p data-reveal className="mt-5 max-w-2xl text-peri-100/80">Short, useful videos on play, product and the future of work — made for a community of {site.community}. Available for collaborations, sponsored deep-dives and conference takeovers.</p>
          <div data-reveal className="mt-8 flex flex-wrap gap-3">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="btn-game">Instagram</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-6 py-3 text-sm hover:border-white/50">LinkedIn</a>
          </div>
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="px-page py-28">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-white/10 bg-[linear-gradient(160deg,rgba(18,26,51,0.9),rgba(7,11,22,0.9))] p-10 text-center sm:p-16">
          <p data-reveal className="font-wanted-fine text-xs uppercase tracking-[0.5em] text-primary-200">Contact</p>
          <h2 data-reveal className="font-headline mt-4 text-[clamp(2.2rem,6vw,4.5rem)] leading-none">Ready, Player Two?</h2>
          <p data-reveal className="mx-auto mt-5 max-w-xl text-peri-100/80">Got a team to motivate, a product to gamify or a stage to fill? Let’s start the game together.</p>
          <div data-reveal className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={`mailto:${site.email}`} className="btn-game">{site.email}</a>
            {socials.filter((s) => s.label !== 'Email').map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-underline text-sm text-peri-100 hover:text-white">{s.label}</a>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 px-page py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-peri-100/50 sm:flex-row">
          <span>© {site.year} {site.name}</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/imprint" className="hover:text-white">Imprint</Link>
            <Link href="/" className="hover:text-white">Game version</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
