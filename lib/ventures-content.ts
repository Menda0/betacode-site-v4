export const CALENDAR_URL = 'https://calendar.app.google/1kXGjsszjPB3eFGr7'

export type Testimonial = {
  quote: string
  name: string
  role: string
  companyLogo?: string
  avatar?: string
}

export const venturesHero = {
  eyebrow: 'Betacode Ventures',
  headline: 'Your technical co-founder, from 0 to 100%',
  subheadline:
    'We partner with founders who have the vision but need a technical leader to validate ideas, build the product, and scale — without hiring a full engineering team on day one.',
  primaryCta: 'Apply now',
  secondaryCta: 'See our first project',
}

export const venturesOverview = {
  title: 'How Betacode Ventures works',
  subtitle: 'More than outsourcing — a true technical partnership',
  description:
    'We embed as your technical co-founder: shaping the roadmap, building the MVP, and staying through launch and iteration.',
  steps: [
    {
      title: 'Validate & plan',
      description:
        'We work with you to stress-test the idea, define scope, and create a 3-month roadmap to get your product to market.',
    },
    {
      title: 'Build & launch',
      description:
        'A dedicated full-stack team handles architecture, development, and deployment — you stay focused on the business.',
    },
    {
      title: 'Iterate & scale',
      description:
        'Post-launch, we gather feedback, ship improvements, and help you grow the team — including hiring key talent in-house.',
    },
  ],
  benefits: [
    'Technical co-founder partnership, not just a dev shop',
    'Dedicated team from MVP to market in ~3 months',
    'Full-stack coverage: architecture, build, and iterate',
    'Path to internalize the best talent onto your team',
  ],
}

export type ProductPreview = {
  number: string
  title: string
  description: string
  highlight?: string
}

export const coachidCaseStudy = {
  id: 'coachid',
  name: 'Coach ID',
  website: 'https://coachidapp.com/',
  tagline: 'Our first Betacode Ventures project',
  headline: 'The first platform that thinks like a football coach',
  description:
    'Coach ID helps football coaches plan, create, execute, and monitor their team\'s weekly work — built by coaches, for coaches. After 8 years on the market and feedback from thousands of coaches at clubs worldwide, the team rebuilt the platform from scratch as a modern v2 product.',
  highlights: [
    '8 years of market experience',
    'Built by UEFA-licensed coaches',
    'Thousands of coaches at clubs worldwide',
    'Progressive Web App — works on any device',
  ],
  productAreas: [
    {
      number: '01',
      title: 'Plan',
      description:
        'Organise the training week with daily, weekly, or monthly views. See session focus, intensity, game phases, and upcoming opponents on one page — with automatic period summaries for tactical validation.',
    },
    {
      number: '02',
      title: 'Create',
      description:
        'Full exercise editor to design training tasks — static or animated. Categorise by game phase, define space, equipment, and player count. Save to a filterable library, or use the editor as a free tactical board.',
      highlight: 'The exercise editor is free today, and always will be.',
    },
    {
      number: '03',
      title: 'Execute',
      description:
        'Build training sessions from your exercise library with duration, recovery, and repetitions per drill. Track player availability with automatic attendance charts, and generate PSE and Well-Being questionnaires.',
    },
    {
      number: '04',
      title: 'Monitor',
      description:
        'Collect Subjective Perception of Effort (PSE) and player readiness data via validated scientific questionnaires. Correlate all metrics with an AI virtual assistant so nothing slips through on athlete condition.',
    },
  ] satisfies ProductPreview[],
  built: [
    'Coach ID v2 — rebuilt from the ground up as a modern SaaS platform',
    'Training calendar, exercise editor, and session builder',
    'Player monitoring with PSE and Well-Being questionnaires',
    'AI virtual assistant for athlete metrics correlation',
    'Subscription billing with Stripe (Individual & Organisation plans)',
    'Progressive Web App for desktop, tablet, and mobile',
  ],
  results: [
    'Launched a full v2 platform with four integrated product areas',
    'Free exercise editor available without registration',
    '7-day trial with full platform access, no credit card required',
    'Early adopter pricing for the first 500 subscribers',
    'GDPR-compliant data hosted on European servers',
  ],
  logo: '/images/clients/coachid.png',
}

export const coachidTestimonials: Testimonial[] = [
  {
    quote:
      'Betacode Ventures felt like having a technical co-founder from day one. They helped us rebuild Coach ID v2 from scratch — a platform shaped by 8 years of coach feedback, now ready for the next decade.',
    name: 'João Daniel Rico',
    role: 'Co-founder, Coach ID',
    companyLogo: '/images/clients/coachid.png',
  },
  {
    quote:
      'From planning sessions to monitoring athlete readiness with AI — we needed a team that understood both the domain and the technology. Betacode shipped a product coaches can actually use every week.',
    name: 'Acácio Santos',
    role: 'Co-founder, Coach ID',
    companyLogo: '/images/clients/coachid.png',
  },
]

export const venturesCta = {
  headline: 'Ready to build your startup with a technical co-founder?',
  description:
    'Tell us about your idea and let\'s explore whether Betacode Ventures is the right fit. Book a call — no commitment required.',
  buttonLabel: 'Apply for Betacode Ventures',
}
