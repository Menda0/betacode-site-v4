import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const ROOT = path.resolve(import.meta.dirname, '..')
const PUBLIC = path.join(ROOT, 'public')
const LOGO_LIGHT = path.join(PUBLIC, 'images/logo-light.svg')
const BRAND_COLOR = '#eb5648'
const TAGLINE = 'Dedicated software teams for businesses and startups'

async function renderLogoPng(
  width: number,
  height: number,
  padding = 0.12,
  background: string | null = '#ffffff'
) {
  const svg = await readFile(LOGO_LIGHT, 'utf8')
  const innerWidth = Math.round(width * (1 - padding * 2))
  const innerHeight = Math.round(height * (1 - padding * 2))

  const logo = await sharp(Buffer.from(svg))
    .resize(innerWidth, innerHeight, { fit: 'inside' })
    .png()
    .toBuffer()

  const bg = background ?? { r: 255, g: 255, b: 255, alpha: 0 }

  return sharp({
    create: {
      width,
      height,
      channels: 4,
      background: bg,
    },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toBuffer()
}

async function generateFavicons() {
  const sizes = [16, 32, 180, 192, 512] as const
  const outputs: Record<number, Buffer> = {}

  for (const size of sizes) {
    outputs[size] = await renderLogoPng(size, size, 0.1)
  }

  await writeFile(path.join(PUBLIC, 'favicon-16x16.png'), outputs[16])
  await writeFile(path.join(PUBLIC, 'favicon-32x32.png'), outputs[32])
  await writeFile(path.join(PUBLIC, 'apple-touch-icon.png'), outputs[180])
  await writeFile(path.join(PUBLIC, 'android-chrome-192x192.png'), outputs[192])
  await writeFile(path.join(PUBLIC, 'android-chrome-512x512.png'), outputs[512])

  const ico = await pngToIco([outputs[16], outputs[32]])
  await writeFile(path.join(PUBLIC, 'favicon.ico'), ico)
}

async function generateOgImage() {
  const width = 1200
  const height = 630
  const logo = await renderLogoPng(720, 180, 0, null)

  const taglineSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${BRAND_COLOR}"/>
      <text
        x="600"
        y="520"
        text-anchor="middle"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="28"
        fill="#ffffff"
        opacity="0.95"
      >${TAGLINE}</text>
    </svg>
  `

  const background = await sharp(Buffer.from(taglineSvg)).png().toBuffer()

  const og = await sharp(background)
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toBuffer()

  await mkdir(path.join(PUBLIC, 'images'), { recursive: true })
  await writeFile(path.join(PUBLIC, 'images/betacode-facebook.png'), og)
}

async function main() {
  console.log('Generating SEO assets...')
  await generateFavicons()
  await generateOgImage()
  console.log('Done.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
