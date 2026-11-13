import Link from 'next/link';
import { site } from '@/lib/content';

export default function Privacy() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-page py-24 text-peri-100">
      <Link href="/" className="text-sm text-primary-200 hover:text-white">← Back</Link>
      <h1 className="font-headline mt-6 text-4xl text-white">Data & Privacy</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-peri-100/80">
        <p>This portfolio is a static website. It does not set tracking cookies, run analytics, or collect personal data automatically.</p>
        <p>If you contact me by email, the information you send (name, email address, message) is used only to reply to your request and is not shared with third parties.</p>
        <p>External links (LinkedIn, Instagram, GitHub) are governed by the privacy policies of those platforms.</p>
        <p>You may request deletion of any correspondence at any time by writing to <a className="text-primary-200" href={`mailto:${site.email}`}>{site.email}</a>.</p>
        <p className="text-peri-100/50">Template note: replace this page with a privacy policy that matches your jurisdiction and any tools you add.</p>
      </div>
    </main>
  );
}
