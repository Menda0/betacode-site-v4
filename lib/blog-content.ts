export type ContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; content: string; level?: 2 | 3 }
  | { type: 'list'; items: string[]; ordered?: boolean }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  author: { name: string; role: string }
  category: string
  readingTimeMinutes: number
  content: ContentBlock[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-build-an-mvp-in-3-months',
    title: 'How to Build an MVP in 3 Months',
    excerpt:
      'A practical roadmap for founders who need to go from idea to a working product fast — without cutting corners on what actually matters.',
    publishedAt: '2025-11-12',
    author: { name: 'Betacode Team', role: 'Software Development' },
    category: 'Startups',
    readingTimeMinutes: 6,
    content: [
      {
        type: 'paragraph',
        content:
          'Most founders don\'t fail because their idea is bad. They fail because they spend six months building the wrong thing — or twelve months building something nobody asked for. A focused 3-month MVP sprint changes that equation.',
      },
      {
        type: 'heading',
        content: 'Month 1: Validate and define scope',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'The first month is about narrowing, not building. Talk to potential users, map the core workflow, and define the smallest version of your product that delivers real value. If you can\'t explain what you\'re building in one sentence, you\'re not ready to write code.',
      },
      {
        type: 'list',
        items: [
          'Identify the single problem your MVP must solve',
          'Create user stories for the happy path only — edge cases come later',
          'Choose a tech stack that your team can ship with quickly',
          'Set a hard launch date and work backwards',
        ],
      },
      {
        type: 'heading',
        content: 'Month 2: Build the core loop',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'This is where development happens. Focus exclusively on the core user journey: sign up, complete the main action, get value. Skip the admin dashboards, skip the integrations, skip the polish. You need something real enough to put in front of users.',
      },
      {
        type: 'heading',
        content: 'Month 3: Launch and learn',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Ship to a small group of early users — not the whole world. Gather feedback, fix the critical bugs, and measure whether people come back. The goal isn\'t perfection; it\'s evidence that your value proposition holds up.',
      },
      {
        type: 'paragraph',
        content:
          'At Betacode, we\'ve helped startups follow this exact cadence through our MVP Development service and Betacode Ventures partnerships. The pattern works because it forces discipline: build less, learn faster.',
      },
    ],
  },
  {
    slug: 'why-startups-need-a-technical-co-founder',
    title: 'Why Startups Need a Technical Co-Founder',
    excerpt:
      'Hiring freelancers or outsourcing to an agency can get you code — but it won\'t get you a partner who thinks about the product like an owner.',
    publishedAt: '2025-10-28',
    author: { name: 'Betacode Team', role: 'Betacode Ventures' },
    category: 'Ventures',
    readingTimeMinutes: 5,
    content: [
      {
        type: 'paragraph',
        content:
          'Every successful startup has someone who owns the technology — not just writes it. That person makes architecture decisions, pushes back on bad ideas, and stays when the first version breaks at 2 AM. Without them, founders end up managing vendors instead of building a company.',
      },
      {
        type: 'heading',
        content: 'The freelancer trap',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Freelancers are great for discrete tasks. They\'re a poor substitute for a co-founder. They don\'t know your users, they don\'t care about your runway, and they\'ll disappear when a better gig comes along. You get deliverables, not ownership.',
      },
      {
        type: 'heading',
        content: 'What a technical co-founder actually does',
        level: 2,
      },
      {
        type: 'list',
        items: [
          'Shapes the product roadmap alongside the business founder',
          'Makes stack and architecture decisions with long-term scale in mind',
          'Ships the MVP and iterates based on real user feedback',
          'Helps hire and mentor the first in-house engineers',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Betacode Ventures was built for founders who have the vision and domain expertise but need that technical partner from day one. We invest our team upfront — no dev fees — in exchange for equity, because we\'re building the product with you, not for you.',
      },
      {
        type: 'paragraph',
        content:
          'Our first Ventures project, Coach ID, went from zero to a live platform in three months. That only worked because we showed up as co-founders, not contractors.',
      },
    ],
  },
  {
    slug: 'choosing-the-right-tech-stack',
    title: 'Choosing the Right Tech Stack for Your Product',
    excerpt:
      'The best technology isn\'t the newest or the most popular — it\'s the one your team can ship, maintain, and scale with confidence.',
    publishedAt: '2025-09-15',
    author: { name: 'Betacode Team', role: 'Tech Consulting' },
    category: 'Engineering',
    readingTimeMinutes: 7,
    content: [
      {
        type: 'paragraph',
        content:
          'Founders often ask us: "Should we use React or Vue? Python or Node? Postgres or Mongo?" The honest answer is that it depends — on your team, your timeline, your budget, and what you\'re actually building.',
      },
      {
        type: 'heading',
        content: 'Optimize for speed to market',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Early-stage products should prioritize frameworks and languages your team already knows. A boring, proven stack shipped in six weeks beats a cutting-edge architecture that takes six months. You can always refactor once you have users and revenue.',
      },
      {
        type: 'heading',
        content: 'Questions to ask before you commit',
        level: 2,
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Does our team have production experience with this stack?',
          'Can we hire for this technology in our market?',
          'Does the ecosystem have libraries for our core features (payments, auth, etc.)?',
          'Will this scale to 10x our expected load without a rewrite?',
          'What\'s the total cost of hosting and maintenance?',
        ],
      },
      {
        type: 'heading',
        content: 'Our default recommendations',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'For most web products we build at Betacode, we reach for Next.js on the frontend, a Python or Node backend depending on the domain, and PostgreSQL for data. It\'s not exciting — and that\'s the point. These tools are battle-tested, well-documented, and easy to hire for.',
      },
      {
        type: 'paragraph',
        content:
          'Need help choosing? Our Tech Consulting service is designed exactly for this — we review your requirements, assess your team, and recommend an architecture you can grow with.',
      },
    ],
  },
]

export function getBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function formatBlogDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
