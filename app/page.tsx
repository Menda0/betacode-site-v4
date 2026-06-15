import Hero from "./components/hero";
import { Services } from "./components/services";
import { VenturesPromo } from "./components/ventures-promo";
import { Feature } from "./components/feature";
import { CTA } from "./components/cta";
import { TraditionalBusinessIcon, TechCocampaniesIcon, StartupsIcon } from "./components/icons";
import { Clients } from "./components/clients";
import { Footer } from "./components/footer";
import { InsightsPreview } from "./components/insights-preview";
import { getBlogPosts } from "@/lib/blog-content";

const services = {
  "external-tech-team": {
    name: "External Tech Team",
    description: "A fully dedicated team — developers, designers, and project managers — working exclusively on your product. No shared attention, no rotating freelancers.",
  },
  "tech-consulting": {
    name: "Tech Consulting",
    description: "Turn your idea into a concrete plan. We help you choose the right stack, architecture, and infrastructure before a single line of code is written.",
  },
  "tech-support": {
    name: "Tech Support",
    description: "Targeted technical work when you need it: integrations, scripts, bug fixes, and maintenance for systems already in production.",
  },
  "tech-training": {
    name: "Tech Training",
    description: "Upskill your team on the languages, frameworks, and practices your product depends on — from one-on-one coaching to team workshops.",
  },
  "team-augmentation": {
    name: "Team Augmentation",
    description: "Add senior engineers, product owners, or specialists to your existing team — matched to your stack and working alongside your people from day one.",
  },
  "internalization": {
    name: "Team Internalization",
    description: "Try before you hire. Start with our people embedded in your team, then bring the best fit in-house when you're confident they're the right long-term match.",
  },
  "mvp-development": {
    name: "MVP Development",
    description: "A focused 3-month plan to get your product in front of real users — scoped, built, and shipped with a team that moves at startup speed.",
  },
}

const features = [
  {
    id: "traditional-business",
    title: "Traditional Business",
    subtitle: "Modernize without disrupting what already works",
    description: "You know your industry — we bring the engineering. We embed as your technology partner, building custom software around your existing operations so digital transformation doesn't slow the business down.",
    icon: <TraditionalBusinessIcon />,
    color: "orange",
    side: "left",
    services: [
      services["external-tech-team"],
      services["tech-consulting"],
      services["tech-support"],
      services["tech-training"],
    ],
    benefits:[
      "A dedicated team that learns your business, not just your codebase",
      "Software built around your workflows — not the other way around",
      "Flexible engagement models that fit established budgets",
      "Solutions that scale as your operations grow",
      "A long-term partner invested in your outcomes, not billable hours",
    ]
  },
  {
    id: "tech-companies",
    title: "Tech Companies",
    subtitle: "Move faster without compromising on quality",
    description: "Your product roadmap is ambitious and hiring takes months. We augment your team with senior talent who integrate from day one — and help you internalize the best people when the time is right.",
    icon: <TechCocampaniesIcon />,
    color: "indigo",
    side: "right",
    services: [
      services["team-augmentation"],
      services["internalization"],
      services["tech-consulting"],
      services["tech-training"],
    ],
    benefits:[
      "Senior engineers and product leads matched to your stack",
      "Seamless integration with your existing processes and tools",
      "Flexible pricing that scales with your needs",
      "A low-risk path to hiring — try before you commit",
      "Mentorship and knowledge transfer that raises the bar for your whole team",
    ]
  },

  {
    id: "startups",
    title: "Startups",
    subtitle: "From zero to users in three months",
    description: "Whether you're validating a new idea or scaling what already works, we bring the team, the technical direction, and the speed to get your product in front of real users — fast.",
    icon: <StartupsIcon />,
    color: "green",
    side: "left",
    services: [
      services["external-tech-team"],
      services["internalization"],
      services["tech-consulting"],
      services["mvp-development"],
    ],
    benefits:[
      "A dedicated team focused on shipping, not scoping meetings",
      "A 3-month roadmap from idea to a product you can put in users' hands",
      "Technical guidance on stack, architecture, and what to build first",
      "Flexible pricing designed for early-stage budgets",
      "A path to your own engineering team as you grow",
    ]
  },
]
export default function Home() {
  const insightPosts = getBlogPosts()

  return (
    <>
      <Hero />
      <Services />
      {features.map((feature, index) => (
        <Feature key={feature.title} feature={feature} variant={index % 2 === 0 ? "light" : "muted"} />
      ))}
      <VenturesPromo />
      <InsightsPreview posts={insightPosts} />
      {/* <Testimonials /> */}
      <Clients />
      
      <CTA />
      <Footer />
    </>
  );
}
