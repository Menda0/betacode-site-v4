import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '../betacode-website')
const OUT = path.resolve(import.meta.dirname, 'out')
fs.mkdirSync(OUT, { recursive: true })

class DCLogic {
  constructor(props) { this.props = props || {}; this.state = {} }
  setState(p) { this.state = { ...this.state, ...(typeof p === 'function' ? p(this.state) : p) } }
  forceUpdate() {}
}

function loadClass(file) {
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8')
  const m = html.match(/<script type="text\/x-dc-logic">([\s\S]*?)<\/script>/)
  if (!m) throw new Error('no logic in ' + file)
  // eslint-disable-next-line no-new-func
  return new Function('DCLogic', 'window', 'navigator', m[1] + '\n;return Component;')(DCLogic, { matchMedia: () => ({ matches: false }) }, {})
}

function clean(v, seen = new WeakSet()) {
  if (typeof v === 'function') return undefined
  if (Array.isArray(v)) return v.map((x) => clean(x, seen))
  if (v && typeof v === 'object') {
    if (seen.has(v)) return '[circular]'
    seen.add(v)
    const o = {}
    for (const [k, x] of Object.entries(v)) {
      const c = clean(x, seen)
      if (c !== undefined) o[k] = c
    }
    return o
  }
  return v
}

const pages = {
  home: 'index.html',
  pricing: 'pricing.html',
  ventures: 'betacode-ventures.html',
  insights: 'insights.html',
  contact: 'contact.html',
}

for (const [name, file] of Object.entries(pages)) {
  const C = loadClass(file)
  for (const lang of ['pt', 'en']) {
    for (const theme of ['light', 'dark']) {
      const c = new C({ lang, theme })
      const v = clean(c.renderVals())
      fs.writeFileSync(path.join(OUT, `${name}.${lang}.${theme}.json`), JSON.stringify(v, null, 2))
    }
  }
}

const A = loadClass('insights/the-agentic-era-of-software.html')
for (const slug of ['agentic', 'cofounder', 'stack', 'lean', 'legacy', 'mvp', 'ai']) {
  for (const lang of ['pt', 'en']) {
    for (const theme of ['light', 'dark']) {
      const c = new A({ slug, lang, theme })
      const v = clean(c.renderVals())
      fs.writeFileSync(path.join(OUT, `article-${slug}.${lang}.${theme}.json`), JSON.stringify(v, null, 2))
    }
  }
}
console.log('ok')
