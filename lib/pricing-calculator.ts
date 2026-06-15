export type BusinessType = "tech-company" | "traditional-business" | "startup"
export type SoftwareType = "saas" | "b2b" | "social-network" | "integration"
export type TeamType = "small" | "base"

export type TeamMember = {
  profile: string
  regime: string
  rateMin: number
  rateMax: number
}

export type PriceEstimate = {
  label: string
  min: number
  max: number
}

export type PricingRecommendation = {
  service: string
  serviceDescription: string
  teamType: TeamType
  teamLabel: string
  teamComposition: TeamMember[]
  estimates: PriceEstimate[]
  summary: string
}

const TEAM_COMPOSITIONS: Record<TeamType, TeamMember[]> = {
  small: [
    { profile: "Junior Developer", regime: "Full-time", rateMin: 20, rateMax: 30 },
    { profile: "Product Owner", regime: "Part-time", rateMin: 50, rateMax: 60 },
  ],
  base: [
    { profile: "Junior Developer", regime: "Full-time", rateMin: 20, rateMax: 30 },
    { profile: "Mid/Senior Developer", regime: "Full-time", rateMin: 30, rateMax: 50 },
    { profile: "Product Owner", regime: "Part-time", rateMin: 50, rateMax: 60 },
  ],
}

const PROJECT_ESTIMATES: Record<TeamType, PriceEstimate[]> = {
  small: [
    { label: "MVP (3 months)", min: 20_000, max: 30_000 },
    { label: "First Year", min: 85_000, max: 120_000 },
  ],
  base: [
    { label: "MVP (3 months)", min: 30_000, max: 45_000 },
    { label: "First Year", min: 120_000, max: 180_000 },
  ],
}

const SERVICES = {
  "external-tech-team": {
    name: "External Tech Team",
    description:
      "A complete dedicated team with 100% time allocated to your business—from developers to project managers.",
  },
  "team-augmentation": {
    name: "Team Augmentation",
    description:
      "Outsourcing professionals tailored to your needs—from developers to product owners—to grow your existing team.",
  },
  "mvp-development": {
    name: "MVP Development",
    description:
      "A focused 3-month plan to bring your product to life quickly, validate your idea, and get to market.",
  },
  "tech-support": {
    name: "Tech Support",
    description:
      "Punctual work for integrations, custom scripts, bugfixes, and technical support for existing systems.",
  },
} as const

export const BUSINESS_OPTIONS: {
  id: BusinessType
  label: string
  description: string
}[] = [
  {
    id: "tech-company",
    label: "Tech Company",
    description: "You already have an in-house tech team and want to scale capacity.",
  },
  {
    id: "traditional-business",
    label: "Traditional Business",
    description: "No internal tech team—you need a partner to build and maintain software.",
  },
  {
    id: "startup",
    label: "Startup",
    description: "Early-stage company looking to launch or scale a new product fast.",
  },
]

export const SOFTWARE_OPTIONS: {
  id: SoftwareType
  label: string
  description: string
}[] = [
  {
    id: "saas",
    label: "SaaS Platform",
    description: "Subscription-based software product with user accounts and billing.",
  },
  {
    id: "b2b",
    label: "B2B Business",
    description: "Business-facing platform with workflows, dashboards, or portals.",
  },
  {
    id: "social-network",
    label: "Social Network",
    description: "Community platform with profiles, feeds, messaging, or user-generated content.",
  },
  {
    id: "integration",
    label: "Integration with Other Services",
    description: "Connect existing tools, APIs, or third-party services.",
  },
]

function getTeamType(business: BusinessType, software: SoftwareType): TeamType {
  if (software === "social-network") return "base"
  if (software === "integration") return "small"
  if (business === "startup") return "small"
  if (business === "tech-company" && software === "saas") return "small"
  return "base"
}

function getServiceKey(business: BusinessType, software: SoftwareType): keyof typeof SERVICES {
  if (software === "integration") return "tech-support"
  if (business === "tech-company") return "team-augmentation"
  if (business === "startup") return "mvp-development"
  return "external-tech-team"
}

function buildSummary(business: BusinessType, software: SoftwareType, serviceName: string, teamLabel: string): string {
  const businessLabel = BUSINESS_OPTIONS.find((option) => option.id === business)?.label ?? ""
  const softwareLabel = SOFTWARE_OPTIONS.find((option) => option.id === software)?.label ?? ""

  if (business === "tech-company" && software !== "integration") {
    return `As a ${businessLabel} building a ${softwareLabel}, we recommend ${serviceName} with our ${teamLabel}. You get flexible hourly professionals who integrate with your existing team.`
  }

  if (software === "integration") {
    return `For ${softwareLabel} work at a ${businessLabel}, ${serviceName} with our ${teamLabel} is the most efficient path—focused scope, faster delivery, and lower investment.`
  }

  if (business === "startup") {
    return `As a ${businessLabel} launching a ${softwareLabel}, ${serviceName} with our ${teamLabel} gives you a dedicated team and a clear 3-month roadmap to validate and ship.`
  }

  return `As a ${businessLabel} without an internal tech team, ${serviceName} with our ${teamLabel} provides the full-stack expertise you need to build a ${softwareLabel} from scratch.`
}

export function getPricingRecommendation(
  business: BusinessType,
  software: SoftwareType
): PricingRecommendation {
  const teamType = getTeamType(business, software)
  const serviceKey = getServiceKey(business, software)
  const service = SERVICES[serviceKey]
  const teamLabel = teamType === "small" ? "Small Team" : "Base Team"
  const isHourlyModel = business === "tech-company" && software !== "integration"

  return {
    service: service.name,
    serviceDescription: service.description,
    teamType,
    teamLabel,
    teamComposition: TEAM_COMPOSITIONS[teamType],
    estimates: isHourlyModel
      ? [
          {
            label: "Typical engagement (reference)",
            min: PROJECT_ESTIMATES[teamType][1].min,
            max: PROJECT_ESTIMATES[teamType][1].max,
          },
        ]
      : PROJECT_ESTIMATES[teamType],
    summary: buildSummary(business, software, service.name, teamLabel),
  }
}

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatEuroRange(min: number, max: number): string {
  return `${formatEuro(min)} – ${formatEuro(max)}`
}

export function formatHourlyRange(min: number, max: number): string {
  return `${min} – ${max} €`
}
