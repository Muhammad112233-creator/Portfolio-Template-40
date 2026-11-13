export default function Logo({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-label="Playmode logo" role="img">
      <defs>
        <linearGradient id="pm-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fea0c0" />
          <stop offset="1" stopColor="#5be0ff" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="16" fill="#121a33" stroke="url(#pm-g)" strokeWidth="2" />
      <path d="M26 20 L46 32 L26 44 Z" fill="url(#pm-g)" />
      <circle cx="20" cy="32" r="3" fill="#f2c94c" />
    </svg>
  );
}
