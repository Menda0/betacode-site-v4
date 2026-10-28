import type { OutcomeId } from '@/lib/types/contact'

export type BizId = 'startup' | 'est'
export type YesNo = 'yes' | 'no'
export type StartupGoal = 'mvp' | 'team' | 'support' | 'unsure'
export type EstGoal = 'new' | 'modern' | 'aug' | 'support' | 'unsure'
export type GoalId = StartupGoal | EstGoal

/** Service letters used by the prototype: Ventures, tEams, Reforço, Formação, Suporte. */
export type ServiceId = 'V' | 'E' | 'R' | 'F' | 'S'

export type IconId =
  | 'rocket'
  | 'building'
  | 'yes'
  | 'no'
  | 'box'
  | 'users'
  | 'plus'
  | 'refresh'
  | 'wrench'
  | 'compass'

export type WizardAnswers = { biz: BizId | null; q2: YesNo | null; goal: GoalId | null }

/** Copy keys in `messages/<locale>/pricing.json` → `questions`. */
export type QuestionKey = 'biz' | 'funding' | 'techTeam' | 'goalStartup' | 'goalEst'

export type QuestionDef = {
  /** State slot the answer is stored in. */
  id: keyof WizardAnswers
  key: QuestionKey
  opts: { v: string; i: IconId; wide?: boolean }[]
}

const Q1: QuestionDef = {
  id: 'biz',
  key: 'biz',
  opts: [
    { v: 'startup', i: 'rocket' },
    { v: 'est', i: 'building' },
  ],
}
const Q2s: QuestionDef = {
  id: 'q2',
  key: 'funding',
  opts: [
    { v: 'yes', i: 'yes' },
    { v: 'no', i: 'no' },
  ],
}
const Q2e: QuestionDef = { ...Q2s, key: 'techTeam' }
const unsure = { v: 'unsure', i: 'compass', wide: true } as const
const support = { v: 'support', i: 'wrench' } as const
const Q3s: QuestionDef = {
  id: 'goal',
  key: 'goalStartup',
  opts: [{ v: 'mvp', i: 'box' }, { v: 'team', i: 'users' }, support, unsure],
}
const Q3e: QuestionDef = {
  id: 'goal',
  key: 'goalEst',
  opts: [{ v: 'new', i: 'box' }, { v: 'modern', i: 'refresh' }, { v: 'aug', i: 'plus' }, support, unsure],
}

/** The three question steps for the current branch (Q2/Q3 depend on the business type). */
export function getQuestions(biz: BizId | null): [QuestionDef, QuestionDef, QuestionDef] {
  return biz === 'est' ? [Q1, Q2e, Q3e] : [Q1, Q2s, Q3s]
}

/** Recommended services per path; the first letter is the recommendation. */
export const RULES: Record<BizId, Record<YesNo, Partial<Record<GoalId, string>>>> = {
  startup: { no: { mvp: 'VE', team: 'VE', support: 'S', unsure: 'V' }, yes: { mvp: 'E', team: 'VER', support: 'S', unsure: 'VERF' } },
  est: { yes: { support: 'S', aug: 'RF', modern: 'ERF', new: 'ER', unsure: 'ERF' }, no: { support: 'S', aug: 'ER', modern: 'E', new: 'E', unsure: 'E' } },
}

export function getOutcomes({ biz, q2, goal }: WizardAnswers): ServiceId[] {
  if (!biz || !q2 || !goal) return []
  return (RULES[biz][q2][goal] ?? '').split('') as ServiceId[]
}

export const OUTCOME_IDS: Record<ServiceId, OutcomeId> = {
  V: 'betacode-ventures',
  E: 'self-managed-tech-teams',
  R: 'team-augmentation',
  F: 'training',
  S: 'support',
}

/** Insights shown on the success screen ("While you wait"), in copy order. */
export const SUCCESS_READ_SLUGS = [
  'how-to-build-an-mvp-in-3-months',
  'why-startups-need-a-technical-co-founder',
  'how-to-transform-legacy-software-into-a-modern-product',
] as const
