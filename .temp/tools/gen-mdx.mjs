// Dev-only: generates content/insights/<slug>.<locale>.mdx from the prototype ART data.
import fs from 'node:fs'
import path from 'node:path'

const OUT = path.resolve(import.meta.dirname, 'out')
const DEST = path.resolve(import.meta.dirname, '../../content/insights')
fs.mkdirSync(DEST, { recursive: true })

const META = {
  agentic: { slug: 'the-agentic-era-of-software', cat: 'eng', by: 'marco', date: '2026-10-28' },
  cofounder: { slug: 'why-startups-need-a-technical-co-founder', cat: 'ven', by: 'pedro', date: '2025-10-28' },
  stack: { slug: 'building-applications-with-javascript-typescript-as-the-backbone', cat: 'eng', by: 'marco', date: '2026-06-17' },
  lean: { slug: 'why-lean-startup-is-the-rosetta-stone-of-betacode', cat: 'biz', by: 'pedro', date: '2026-06-16' },
  legacy: { slug: 'how-to-transform-legacy-software-into-a-modern-product', cat: 'eng', by: 'marco', date: '2026-06-15' },
  mvp: { slug: 'how-to-build-an-mvp-in-3-months', cat: 'start', by: 'pedro', date: '2025-11-12' },
  ai: { slug: 'how-ai-can-help-you-create-your-next-project', cat: 'eng', by: 'marco', date: '2025-09-15' },
}
const REL = {
  agentic: ['ai', 'stack'], cofounder: ['mvp', 'lean'], stack: ['ai', 'legacy'], lean: ['mvp', 'cofounder'],
  legacy: ['stack', 'lean'], mvp: ['cofounder', 'ai'], ai: ['agentic', 'stack'],
}

const esc = (s) => s.replace(/[\\`*_{}[\]<>|~]/g, (c) => '\\' + c).replace(/^([#+-]|\d+\.)(\s)/, '\\$1$2')
const yaml = (s) => JSON.stringify(s)

for (const [key, m] of Object.entries(META)) {
  for (const lang of ['pt', 'en']) {
    const v = JSON.parse(fs.readFileSync(path.join(OUT, `article-${key}.${lang}.light.json`), 'utf8'))
    const ins = JSON.parse(fs.readFileSync(path.join(OUT, `insights.${lang}.light.json`), 'utf8'))
    const card = [ins.feat, ...ins.rest].find((x) => x.title === v.a.title)
    const fm = [
      '---',
      `slug: ${m.slug}`,
      `title: ${yaml(v.a.title)}`,
      `lead: ${yaml(v.a.lead)}`,
      ...(card && card.ex !== v.a.lead ? [`excerpt: ${yaml(card.ex)}`] : []),
      `category: ${m.cat}`,
      `author: ${m.by}`,
      `date: ${m.date}`,
      `readingTime: ${parseInt(v.a.mins, 10)}`,
      'takeaways:',
      ...v.a.take.map((x) => `  - ${yaml(x)}`),
      `glyph: ${yaml(v.a.glyph)}`,
      `coverCode: ${yaml(v.a.code)}`,
      'related:',
      ...REL[key].map((r) => `  - ${META[r].slug}`),
      '---',
      '',
    ]
    const body = []
    for (const b of v.blocks) {
      if (b.t === 'p') body.push(esc(b.x))
      else if (b.t === 'h') body.push('## ' + esc(b.x))
      else if (b.t === 'ul') body.push(b.items.map((x) => '- ' + esc(x)).join('\n'))
      else if (b.t === 'ol') body.push(b.items.map((x, i) => `${i + 1}. ` + esc(x)).join('\n'))
      else if (b.t === 'q') body.push('> ' + esc(b.x))
      else if (b.t === 'note') {
        const todo = /Coach ID/.test(b.h) && key === 'agentic'
          ? '{/* TODO(betacode): confirm or remove the next step of the Coach ID assistant (IMPLEMENTATION.md §10, point 5). */}\n'
          : ''
        body.push(`${todo}<Note title=${yaml(b.h)}>\n${esc(b.x)}\n</Note>`)
      } else throw new Error('unknown block ' + b.t)
    }
    fs.writeFileSync(path.join(DEST, `${m.slug}.${lang}.mdx`), fm.join('\n') + body.join('\n\n') + '\n')
  }
}
console.log('ok')
