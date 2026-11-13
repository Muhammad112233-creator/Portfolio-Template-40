export const site = {
  name: 'Nova D. Reyes',
  alias: 'PLAYMODE',
  handle: '@novadreyes',
  role: 'Creative Technologist, Gamification Designer & Speaker',
  tagline: 'Turning ordinary products into experiences people want to play.',
  email: 'hello@playmode.dev',
  location: 'Lisbon · Working worldwide',
  bounty: '$ 0,000,000,000-',
  wantedFor:
    'WANTED FOR TURNING BORING PRODUCTS INTO PLAYABLE EXPERIENCES, DESIGNING INTERFACES PEOPLE ACTUALLY ENJOY AND STEALING THE SHOW ON STAGE.',
  report: 'ANYONE WITH INFORMATION ON THEIR WHEREABOUTS, REPORT AT ONCE.',
  community: "18'000+",
  year: new Date().getFullYear(),
};

export type Chapter = {
  id: string;
  index: string;
  label: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  external?: boolean;
  accent: string;
};

export const chapters: Chapter[] = [
  {
    id: 'services',
    index: '01',
    label: 'Services',
    title: 'Design, play and code — three ways to team up.',
    body: 'From a 45-minute keynote to a workshop that cracks a real problem through play, to a full product concept shipped with your team.',
    cta: 'See the services',
    href: '#services-detail',
    accent: '#fea0c0',
  },
  {
    id: 'keynotes',
    index: '02',
    label: 'Keynotes',
    title: 'Talks that make work feel like play.',
    body: 'What teams and brands can learn from the generation that grew up with a controller in hand — told with stories, demos and a little chaos.',
    cta: 'Explore the keynotes',
    href: '#keynotes-detail',
    accent: '#5be0ff',
  },
  {
    id: 'books',
    index: '03',
    label: 'Books',
    title: 'Press Start — The Playful Product Playbook.',
    body: 'A field guide to gamification without the gimmicks: motivation, loops, rewards and the psychology of coming back. Read chapter one or order it.',
    cta: 'Get the book',
    href: '#book-detail',
    accent: '#f2c94c',
  },
  {
    id: 'content',
    index: '04',
    label: 'Content Creation',
    title: 'Content that levels up.',
    body: `Short, useful videos on play, product and the future of work — made for a community of ${site.community} on Instagram and LinkedIn.`,
    cta: 'Follow & collaborate',
    href: '#content-detail',
    accent: '#9cbd0f',
  },
  {
    id: 'contact',
    index: '05',
    label: 'Contact',
    title: 'Ready, Player Two?',
    body: 'Got a team to motivate, a product to gamify or a stage to fill? Grab a controller — let’s start the game together.',
    cta: 'Start a project',
    href: `mailto:${site.email}?subject=Ready%2C%20Player%20Two`,
    external: true,
    accent: '#e8508a',
  },
];

export const services = [
  {
    n: '01',
    kind: 'Keynote',
    duration: '30–60 min',
    title: 'Keynote',
    body: 'The generation that grew up playing now runs the market — as customers, employees and fans. A high-energy talk on what brands and leaders can learn from the world’s most engaging industry.',
    bullets: [
      'For conferences, summits and internal company events',
      '30–60 min, on stage or remote, in English or Portuguese',
      'Add a workshop to turn insights into action',
      'Spoken at product, design and HR stages across Europe',
    ],
    formats: 'Press Start · Boss Fights · Side Quests · Custom for your industry',
    cta: 'Book a keynote',
  },
  {
    n: '02',
    kind: 'Workshop & Serious Game',
    duration: 'Half or full day',
    title: 'Workshop & Serious Game',
    body: 'Half a day or a full day where your team solves a real question through play — as an escape game, role-play or a gamified method sprint.',
    bullets: [
      'For businesses, HR, teams and universities',
      '2–30 participants, on site or remote',
      'Your question, my game design',
      'Leave with decisions, not just sticky notes',
    ],
    formats: 'Escape game · Role-play · Gamified method sprint',
    cta: 'Plan a workshop',
  },
  {
    n: '03',
    kind: 'Gamification Concept',
    duration: '2–8 weeks',
    title: 'Gamification Concept',
    body: 'A concept that applies game mechanics to your product, service or internal programme: goals, loops, rewards, onboarding — and the reasons people come back.',
    bullets: [
      'For product teams, HR and learning',
      '2–8 weeks, workshops to prototype',
      'Hand-over to your designers and developers',
      'Built with your stack, not against it',
    ],
    formats: 'Product gamification · Learning & onboarding · Loyalty & community',
    cta: 'Start a concept',
  },
];

export const keynotes = [
  {
    n: '01',
    title: 'Press Start',
    subtitle: 'Why play is the new productivity',
    body: 'Play is not a distraction from work — it is how humans learn, bond and solve hard problems. This talk shows how to bring the psychology of games into real teams and products.',
    quote: 'We must relearn how to play — because play is not a distraction, it’s a strategy.',
  },
  {
    n: '02',
    title: 'Boss Fights',
    subtitle: 'Turning hard problems into game loops',
    body: 'Every big challenge is a boss fight: unclear rules, low motivation, no feedback. Learn to design loops, checkpoints and rewards that keep people moving.',
  },
  {
    n: '03',
    title: 'Side Quests',
    subtitle: 'How curiosity builds better teams',
    body: 'The best ideas rarely come from the main quest. A talk about curiosity, nerd culture and the side projects that quietly become the next big thing.',
  },
  {
    n: '04',
    title: 'Made to measure',
    subtitle: 'Tailored to your stage',
    body: 'Gamification applied to your industry, your audience and your goals — written from scratch after a short discovery call.',
  },
];

export const socials = [
  { label: 'Email', href: `mailto:${site.email}`, key: 'A' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', key: 'B' },
  { label: 'Instagram', href: 'https://www.instagram.com/', key: 'C' },
  { label: 'GitHub', href: 'https://github.com/', key: 'D' },
];

export const clients = [
  'Product Summit',
  'Design Matters',
  'Future of Work',
  'Playful Conf',
  'HR Innovation',
  'DevFest',
  'UX Lisbon',
  'Game Thinking',
];
