import type { BlogAuthor } from './blog-authors'
import { blogAuthors } from './blog-authors'

export type ContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; content: string; level?: 2 | 3 }
  | { type: 'list'; items: string[]; ordered?: boolean }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  author: BlogAuthor
  category: string
  readingTimeMinutes: number
  content: ContentBlock[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-transform-legacy-software-into-a-modern-product',
    title: 'How to Transform Legacy Software Into a Modern Product',
    excerpt:
      'A practical playbook for companies stuck on outdated code and infrastructure — break the monolith, ship in slices, and use modern tooling to migrate without stopping the business.',
    publishedAt: '2026-06-15',
    author: blogAuthors.marcoMendao,
    category: 'Engineering',
    readingTimeMinutes: 11,
    content: [
      {
        type: 'paragraph',
        content:
          'Most companies don\'t set out to run on legacy software. It happens gradually — a platform built five or ten years ago still powers the business, but every new feature takes longer, every deployment feels risky, and hiring developers who want to work on it gets harder every year. The technology isn\'t just old; the infrastructure around it often is too.',
      },
      {
        type: 'paragraph',
        content:
          'The instinct is to rewrite everything from scratch. That almost never works. Big-bang rewrites take years, cost a fortune, and leave you with two systems to maintain while users wait. There\'s a better way: evolve the product piece by piece, use infrastructure as a bridge between old and new, and stay lean enough to ship value at every step.',
      },
      {
        type: 'heading',
        content: 'When your software and infrastructure are both behind',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Legacy isn\'t just an old framework or a language nobody wants to touch anymore. It\'s the full stack — application code, database schemas, deployment pipelines, servers, networking, and the operational habits that grew around all of it.',
      },
      {
        type: 'list',
        items: [
          'Application layer: monolithic codebases, outdated dependencies, no automated tests, features tightly coupled so nothing can change in isolation',
          'Data layer: schemas designed years ago, missing indexes, business logic buried in stored procedures',
          'Infrastructure: bare-metal or early cloud setups, manual deployments, no staging environments that mirror production',
          'Operations: on-call teams firefighting instead of improving, releases scheduled quarterly because each one is terrifying',
        ],
      },
      {
        type: 'paragraph',
        content:
          'If this sounds familiar, you\'re not alone. Traditional businesses, scale-ups, and even tech companies hit this wall. The product still works — customers depend on it — but the cost of change keeps climbing. Modernizing isn\'t a luxury; it\'s how you stay competitive, retain talent, and respond to what the market actually needs.',
      },
      {
        type: 'heading',
        content: 'Breaking the monolith into manageable parts',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'A monolith isn\'t evil. It got you here. The problem is that when everything lives in one codebase with shared database tables and implicit dependencies, you can\'t modernize one area without risking the whole system.',
      },
      {
        type: 'paragraph',
        content:
          'The goal isn\'t microservices for the sake of microservices. It\'s identifying bounded contexts — coherent areas of your product that can be owned, deployed, and evolved independently. Billing. User management. Reporting. A specific workflow your customers use daily. Each of these is a candidate to peel off.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Map the system: document what exists, who uses it, and where the pain is highest',
          'Find natural seams: look for modules with few dependencies on the rest of the codebase',
          'Extract one slice at a time: start with something valuable but isolated — not the core engine on day one',
          'Define clear interfaces: APIs, events, or shared contracts between old and new so teams aren\'t blocked on each other',
          'Keep the monolith running: the legacy system stays live while new services take over specific responsibilities',
        ],
      },
      {
        type: 'paragraph',
        content:
          'We\'ve applied this pattern with Next.js and Nest.js — a modern frontend decoupled from backend services — but the principle holds regardless of stack. What matters is drawing boundaries that match how your business actually works, not how the original developers organized folders.',
      },
      {
        type: 'heading',
        content: 'Refactor old features, build new ones on modern tech',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'Modernization isn\'t copy-paste. Users don\'t want the same clunky experience in a new framework — they want something better. That means two things happening in parallel: remaking existing features so they work correctly and feel current, and adding new capabilities that weren\'t possible on the old stack.',
      },
      {
        type: 'heading',
        content: 'Refactoring what already exists',
        level: 3,
      },
      {
        type: 'paragraph',
        content:
          'When you rebuild a legacy feature, treat it as a product decision, not just a code translation. Question every screen, every field, every step. What do users actually need today? What can you remove? Coach ID went through exactly this — eight years of market feedback condensed into a v2 that kept what worked and dropped what didn\'t.',
      },
      {
        type: 'list',
        items: [
          'Interview users and support teams before writing a single line',
          'Simplify workflows — legacy UIs accumulate cruft over years of "just add one more field"',
          'Write tests for the new version so you never regress',
          'Run old and new side by side until you\'re confident in parity',
        ],
      },
      {
        type: 'heading',
        content: 'Evolving with cutting-edge technology',
        level: 3,
      },
      {
        type: 'paragraph',
        content:
          'The new platform is your chance to adopt tools that unlock speed and capability — cloud-native hosting, modern frontend frameworks, API-first design, CI/CD pipelines, observability, and AI-assisted features where they genuinely help. But stay disciplined: choose technology that your team can operate in production, not whatever launched last week on Hacker News.',
      },
      {
        type: 'paragraph',
        content:
          'The sweet spot is proven, well-documented tools that solve real bottlenecks in your migration. A Progressive Web App instead of a desktop-only legacy client. Managed databases instead of self-hosted servers nobody maintains. Automated deployments instead of manual FTP uploads.',
      },
      {
        type: 'heading',
        content: 'Use infrastructure as the bridge',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'This is where migrations succeed or fail. You need both systems running simultaneously for months — sometimes longer. Infrastructure is what makes that invisible to users.',
      },
      {
        type: 'list',
        items: [
          'Reverse proxies (nginx, Traefik, Cloudflare): route traffic to legacy or new services based on URL path, feature flag, or user segment — users hit one domain, you decide what serves the request',
          'Load balancers: distribute traffic across old and new instances, enable zero-downtime deploys, and roll back instantly if something breaks',
          'Cloud hosting (AWS, GCP, Azure, Vercel): spin up new environments in minutes, scale independently from legacy servers, and pay for what you use during the transition',
          'API gateways: centralize authentication, rate limiting, and routing so new microservices plug in without changing the client',
          'Message queues and event buses: let legacy and new systems communicate asynchronously without tight coupling',
          'Feature flags: gradually roll out new functionality to a percentage of users before full cutover',
        ],
      },
      {
        type: 'paragraph',
        content:
          'The pattern is often called the strangler fig — the new system slowly wraps around and replaces the old one, branch by branch. Reverse proxies are the mechanism that makes it work at the network level. Your users keep using the same URL. Behind the scenes, more and more requests land on the modern stack.',
      },
      {
        type: 'heading',
        content: 'Divide and conquer — but stay lean',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'The biggest mistake in legacy modernization is trying to do too much at once. A 24-month roadmap with fifteen workstreams and a steering committee that meets monthly will deliver nothing useful until month eighteen — if it delivers at all.',
      },
      {
        type: 'paragraph',
        content:
          'Instead, think fast to market for each slice. Pick one piece of the product. Define what "done" looks like in weeks, not quarters. Ship it. Get feedback. Move to the next piece. This is the same lean mindset we use for MVPs, applied to modernization.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Choose the highest-impact, lowest-risk slice first — something users feel every day but that doesn\'t touch the core transaction engine',
          'Set a hard deadline: 4–8 weeks to get the first slice live behind the proxy',
          'Keep the team small and focused — a dedicated squad, not a rotation of whoever is available',
          'Measure outcomes, not lines of code: deployment frequency, incident rate, user satisfaction, time to ship the next feature',
          'Celebrate each cutover — every piece that moves off legacy is real progress, not "phase 2 planning"',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Divide and conquer doesn\'t mean fragment your attention across twenty initiatives. It means sequential conquest — one territory at a time, fully secured before you advance. The lean part is what keeps momentum: each release proves the approach works and builds organizational confidence to keep going.',
      },
      {
        type: 'heading',
        content: 'Where to start',
        level: 2,
      },
      {
        type: 'paragraph',
        content:
          'If you\'re staring at a legacy platform and wondering whether to patch, rewrite, or migrate piece by piece — start with an honest audit. What\'s costing you the most? Slow releases? Developer attrition? Customer complaints about UX? Infrastructure bills? Pick the pain point that maps to one isolatable slice of the product, and build the bridge.',
      },
      {
        type: 'paragraph',
        content:
          'At Betacode, we\'ve helped traditional businesses and tech companies modernize without stopping the business — from breaking down monoliths to standing up the cloud infrastructure that lets old and new coexist. If you want a second pair of eyes on your migration plan, our Tech Consulting and External Tech Team services are built for exactly this.',
      },
    ],
  },
  {
    slug: 'how-to-build-an-mvp-in-3-months',
    title: 'How to Build an MVP in 3 Months',
    excerpt:
      'A practical roadmap for founders who need to go from idea to a working product fast — without cutting corners on what actually matters.',
    publishedAt: '2025-11-12',
    author: blogAuthors.pedroGorrao,
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
    author: blogAuthors.marcoMendao,
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
    author: blogAuthors.marcoMendao,
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
