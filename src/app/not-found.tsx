import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-navy-900 px-6 text-center">
      <div>
        <p className="font-wanted-fine text-xs uppercase tracking-[0.5em] text-primary-200">Error 404</p>
        <h1 className="font-headline mt-4 text-[clamp(3rem,12vw,8rem)] leading-none rainbow-text">GAME OVER</h1>
        <p className="mt-4 text-peri-100/70">This island is not on the map.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-game">Continue? <span className="key-cap">A</span></Link>
          <Link href="/simple" className="rounded-full border border-white/20 px-6 py-3 text-sm hover:border-white/50">Simple version</Link>
        </div>
      </div>
    </main>
  );
}
