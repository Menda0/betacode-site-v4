import type ptPricing from '@/messages/pt/pricing.json'
import type { BizId, ServiceId, YesNo } from './rules'

export type PricingCopy = typeof ptPricing
export type TeamConfig = 'small' | 'base'

export type RateRow = { who: string; time: string; rate: string }
export type Figure = { label: string; value: string }

export type ServiceView = {
  id: ServiceId
  name: string
  model: string
  desc: string
  price: string
  priceL: string
  why: string[]
  inc: string[]
  figs: Figure[]
  rows: RateRow[]
  note: string
}

export type ServiceContext = { biz: BizId | null; q2: YesNo | null; cfg: TeamConfig }

/** Resolves the prototype's DEF + EXTRA service data for the current answers and team setup. */
export function buildService(id: ServiceId, ctx: ServiceContext, copy: PricingCopy): ServiceView {
  const s = copy.services
  const r = copy.rates
  const small = ctx.cfg !== 'base'
  const startup = ctx.biz === 'startup'
  // The prototype uses the same Q2 "yes" for "funded" (startups) and "has a tech team" (established).
  const funded = ctx.q2 === 'yes'
  const hasTeam = ctx.q2 === 'yes'

  switch (id) {
    case 'V':
      return {
        id,
        name: s.V.name,
        model: s.V.model,
        desc: s.V.desc,
        price: s.V.price,
        priceL: s.V.priceL,
        why: [s.V.why, startup && !funded ? s.V.whyUnfunded : s.V.whyOther],
        inc: s.V.inc,
        figs: s.V.figs,
        rows: s.V.rows,
        note: s.V.note,
      }
    case 'E':
      return {
        id,
        name: s.E.name,
        model: s.E.model,
        desc: s.E.desc,
        price: small ? s.E.priceSmall : s.E.priceBase,
        priceL: s.E.priceL,
        why: [s.E.why, !startup && !hasTeam ? s.E.whyNoTeam : s.E.whyOther],
        inc: [],
        figs: small ? s.E.figsSmall : s.E.figsBase,
        rows: small ? [r.jr, r.po] : [r.jr, r.mid, r.po],
        note: s.E.note,
      }
    case 'R':
      return {
        id,
        name: s.R.name,
        model: s.R.model,
        desc: s.R.desc,
        price: s.R.price,
        priceL: s.R.priceL,
        why: [s.R.why, hasTeam ? s.R.whyTeam : s.R.whyNoTeam],
        inc: s.R.inc,
        figs: s.R.figs,
        rows: [r.jr, r.mid, r.po],
        note: s.R.note,
      }
    case 'F':
      return { id, ...s.F, rows: [r.tr] }
    case 'S':
      return { id, ...s.S }
  }
}
