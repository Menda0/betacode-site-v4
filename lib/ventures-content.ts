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
  whatYouGet: {
    title: 'What you get',
    subtitle: 'We show up as your technical co-founder — here\'s what that means in practice.',
    items: [
      'A dedicated technical co-founder — not a rotating bench of freelancers. One team, fully committed to your product from day one.',
      'MVP live in ~3 months — from zero to a functional product you can put in front of real users and start validating your value proposition.',
      'Full-stack execution — architecture, backend, frontend, infrastructure, and deployment handled end to end, so you stay focused on the business.',
      'Technical guidance you can trust — we advise on stack, scalability, and trade-offs as owners, not as consultants billing by the hour.',
      'Launch-ready foundations — payments, admin dashboards, analytics, and the infrastructure early customers expect — not a prototype that breaks under pressure.',
      'A path to your own team — when the time is right, we help you hire and internalize the talent that already knows your product.',
    ],
  },
  partnershipAsk: {
    title: 'What we ask',
    subtitle: 'We invest our team upfront — here\'s what we need from you to make it work.',
    items: [
      'No fees or invoices — we don\'t charge for development. Our upside is tied to the product we build together.',
      'Equity in your company — a stake that reflects the role we play as your technical co-founder, not a vendor on retainer.',
      'Your domain expertise — you know the market, the users, and the problem. We need you in the room for the decisions that matter.',
      'Commitment to move fast — a 3-month build only works with quick feedback, clear priorities, and founders who can unblock us.',
      'Transparency on traction — share user feedback, metrics, and customer conversations so we ship what the market actually wants.',
      'Ambition with substance — we partner on ideas with a real path to users and revenue, not open-ended experiments.',
    ],
  },
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
  built: [
    'MVP 0–100% in 3 months',
    'Technical co-founder that advises you on the best technical solutions',
    'Payment gateway ready and functional',
    'Admin dashboard to monitor and receive feedback from users',
    'Progressive Web App for desktop, tablet, and mobile',
    'AI virtual assistant',
  ],
  results: [
    '100+ clients in the first week',
    'Real user feedback',
    '10+ paying customers in the first week',
    'Functional application that validates your value proposition',
    'Free exercise editor driving organic sign-ups without paid ads',
    'Platform ready to scale with subscription plans and team onboarding',
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
