// Dev-only helper: converts prototype templates to JSX drafts and page CSS to scoped CSS.
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(path.resolve(import.meta.dirname, '../../package.json'))
const postcss = require('postcss')

const ROOT = path.resolve(import.meta.dirname, '../betacode-website')
const OUT = path.resolve(import.meta.dirname, 'jsx')
const CSS_OUT = path.resolve(import.meta.dirname, '../../app/styles/pages')
fs.mkdirSync(OUT, { recursive: true })
fs.mkdirSync(CSS_OUT, { recursive: true })

const FONT = (s) =>
  s
    .replace(/'Montserrat'/g, 'var(--font-montserrat)')
    .replace(/'Inter'/g, 'var(--font-inter)')
    .replace(/'JetBrains Mono'/g, 'var(--font-jetbrains)')

const VOID = new Set(['img', 'input', 'br', 'hr', 'meta', 'link', 'source'])
const ATTR_MAP = {
  class: 'className', for: 'htmlFor', tabindex: 'tabIndex', novalidate: 'noValidate', maxlength: 'maxLength',
  minlength: 'minLength', autocomplete: 'autoComplete', readonly: 'readOnly', colspan: 'colSpan', inputmode: 'inputMode',
  enterkeyhint: 'enterKeyHint', spellcheck: 'spellCheck', 'xlink:href': 'xlinkHref', autofocus: 'autoFocus',
  'accept-charset': 'acceptCharset', srcset: 'srcSet', crossorigin: 'crossOrigin', frameborder: 'frameBorder',
  onclick: 'onClick', oninput: 'onInput', onchange: 'onChange', onsubmit: 'onSubmit',
}
const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())

function expr(e) {
  return e.trim()
}

function interpText(s) {
  // returns JSX children text
  let out = ''
  let last = 0
  const re = /\{\{([^{}]+)\}\}/g
  let m
  while ((m = re.exec(s))) {
    out += esc(s.slice(last, m.index))
    out += '{' + expr(m[1]) + '}'
    last = re.lastIndex
  }
  out += esc(s.slice(last))
  return out
}
function esc(t) {
  return t.replace(/[{}]/g, (c) => `{'${c}'}`).replace(/>/g, '{">"}').replace(/&amp;/g, '&').replace(/&nbsp;/g, '\u00a0')
}

function attrValue(v) {
  const whole = v.match(/^\s*\{\{([^{}]+)\}\}\s*$/)
  if (whole) return '{' + expr(whole[1]) + '}'
  if (/\{\{/.test(v)) return '{`' + v.replace(/`/g, '\\`').replace(/\{\{([^{}]+)\}\}/g, (_, e) => '${' + expr(e) + '}') + '`}'
  return JSON.stringify(v.replace(/&amp;/g, '&'))
}

function styleValue(v) {
  const whole = v.match(/^\s*\{\{([^{}]+)\}\}\s*$/)
  if (whole) return '{css(' + expr(whole[1]) + ')}'
  const parts = []
  let buf = ''
  let depth = 0
  for (const ch of v) {
    if (ch === '(') depth++
    if (ch === ')') depth--
    if (ch === ';' && depth === 0) { parts.push(buf); buf = '' } else buf += ch
  }
  parts.push(buf)
  const props = []
  for (const p of parts) {
    const i = p.indexOf(':')
    if (i < 0) continue
    let k = p.slice(0, i).trim()
    let val = FONT(p.slice(i + 1).trim())
    if (!k) continue
    const key = k.startsWith('--') ? JSON.stringify(k) : camel(k)
    let jsVal
    if (/\{\{/.test(val)) jsVal = '`' + val.replace(/`/g, '\\`').replace(/\{\{([^{}]+)\}\}/g, (_, e) => '${' + expr(e) + '}') + '`'
    else jsVal = JSON.stringify(val)
    props.push(`${key}: ${jsVal}`)
  }
  return '{{ ' + props.join(', ') + ' }}'
}

function convertAttrs(tag, raw) {
  const attrs = []
  const re = /([^\s=\/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g
  let m
  while ((m = re.exec(raw))) {
    let [, name, a, b, c] = m
    const val = a ?? b ?? c
    const lname = name.toLowerCase()
    if (lname === 'style' && val != null) { attrs.push(['style', styleValue(val)]); continue }
    let jsx = ATTR_MAP[lname] || ATTR_MAP[name] || name
    if (!ATTR_MAP[lname] && !/^(aria|data)-/.test(name) && name.includes('-')) jsx = camel(name)
    if (val == null) { attrs.push([jsx, null]); continue }
    if (jsx === 'src' && /^(\.\.\/)?assets\//.test(val)) { attrs.push([jsx, JSON.stringify('/' + val.replace(/^\.\.\//, ''))]); continue }
    attrs.push([jsx, attrValue(val)])
  }
  return attrs
}

function convertTemplate(html) {
  let out = ''
  const stack = []
  const re = /<!--([\s\S]*?)-->|<\/([a-zA-Z0-9-]+)\s*>|<([a-zA-Z0-9-]+)((?:\s+[^\s=\/>]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>/g
  let last = 0
  let m
  while ((m = re.exec(html))) {
    const text = html.slice(last, m.index)
    if (text) out += interpText(text)
    last = re.lastIndex
    if (m[1] !== undefined) { out += `{/* ${m[1].trim()} */}`; continue }
    if (m[2]) {
      const tag = m[2]
      const open = stack.pop()
      if (open?.kind === 'for') out += '</Fragment>\n))}'
      else if (open?.kind === 'if') out += '</>\n)}'
      else if (open?.kind === 'skip') out += '*/}'
      else if (open?.kind === 'link') out += '</Link>'
      else out += `</${tag}>`
      continue
    }
    const tag = m[3]
    const raw = m[4] || ''
    const selfClose = m[5] === '/' || VOID.has(tag)
    const attrs = convertAttrs(tag, raw)
    const get = (n) => attrs.find((x) => x[0] === n)?.[1]
    if (tag === 'sc-for') {
      const list = get('list').replace(/^\{|\}$/g, '')
      const as = JSON.parse(get('as'))
      out += `{${list}.map((${as}, ${as}I) => (\n<Fragment key={${as}I}>`
      stack.push({ kind: 'for' })
      continue
    }
    if (tag === 'sc-if') {
      const v = get('value').replace(/^\{|\}$/g, '').trim()
      if (v === 'false') { out += '{/* sc-if false: '; stack.push({ kind: 'skip' }); continue }
      out += `{${v} && (\n<>`
      stack.push({ kind: 'if' })
      continue
    }
    let name = tag
    const href = get('href')
    if (tag === 'a' && href && /^\{(links\.|base\b)/.test(href)) name = 'Link'
    const attrStr = attrs
      .filter(([k]) => !k.startsWith('hint-'))
      .map(([k, v]) => (v == null ? ` ${k}` : ` ${k}=${v}`))
      .join('')
    if (selfClose) out += `<${name}${attrStr} />`
    else { out += `<${name}${attrStr}>`; stack.push({ kind: name === 'Link' ? 'link' : 'tag' }) }
  }
  out += interpText(html.slice(last))
  return out
}

function scopeCss(css, page) {
  const prefix = `pg-${page}`
  const root = postcss.parse(FONT(css))
  const frames = new Set()
  root.walkAtRules('keyframes', (r) => { frames.add(r.params); r.params = `${prefix}-${r.params}` })
  root.walkAtRules('font-face', (r) => r.remove())
  root.walkRules((rule) => {
    if (rule.parent?.type === 'atrule' && rule.parent.name === 'keyframes') return
    const sels = rule.selectors
      .map((s) => s.trim())
      .filter((s) => !/^(body|html|html,body)$/.test(s))
      .filter((s) => !/\.(blogo|bm-|bw-d)/.test(s))
      .map((s) => (s.startsWith('.site') ? `.site:where(.${prefix})${s.slice(5)}` : `:where(.${prefix}) ${s}`))
    if (!sels.length) rule.remove()
    else rule.selectors = sels
  })
  root.walkDecls(/^animation(-name)?$/, (d) => {
    d.value = d.value.replace(/[A-Za-z0-9_-]+/g, (w) => (frames.has(w) ? `${prefix}-${w}` : w))
  })
  return root.toString()
}

const pages = {
  home: 'index.html', pricing: 'pricing.html', ventures: 'betacode-ventures.html',
  insights: 'insights.html', contact: 'contact.html', article: 'insights/the-agentic-era-of-software.html',
}
for (const [page, file] of Object.entries(pages)) {
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8')
  const tpl = html.match(/<template id="dc-tpl">([\s\S]*?)<\/template>/)[1]
  fs.writeFileSync(path.join(OUT, `${page}.jsx`), convertTemplate(tpl))
  const styles = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((x) => x[1]).filter((s) => !s.includes('#root{'))
  fs.writeFileSync(path.join(CSS_OUT, `${page}.css`), `/* Scoped port of the prototype stylesheet (${file}). */\n` + scopeCss(styles.join('\n'), page) + '\n')
}
console.log('ok')
