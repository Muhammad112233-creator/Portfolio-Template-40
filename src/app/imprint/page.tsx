import Link from 'next/link';
import { site } from '@/lib/content';

export default function Imprint() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-page py-24 text-peri-100">
      <Link href="/" className="text-sm text-primary-200 hover:text-white">← Back</Link>
      <h1 className="font-headline mt-6 text-4xl text-white">Imprint</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-peri-100/80">
        <p><strong className="text-white">{site.name}</strong><br />{site.role}<br />{site.location}</p>
        <p>Email: <a className="text-primary-200" href={`mailto:${site.email}`}>{site.email}</a></p>
        <p>Responsible for content according to applicable media law. Replace this block with your legal name, address and registration details where required.</p>
        <p>Design & code: Playmode portfolio template. 3D scene built with Three.js / React Three Fiber. Fonts served via Google Fonts.</p>
      </div>
    </main>
  );
}
