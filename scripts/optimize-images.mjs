// Convierte las capturas fuente (assets-src/projects/*.png) en WebP en tres
// anchos para srcset. Se conserva la proporción original: cada tarjeta del
// portafolio decide su recorte con `media.ratio` y `media.focus` (projects.js),
// así una captura no pierde la barra lateral o el menú. Idempotente.
//   npm run optimize:images
import { readdir, mkdir } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const SRC = 'assets-src/projects'
const OUT = 'public/projects'
const WIDTHS = [640, 1200, 1440]

await mkdir(OUT, { recursive: true })

for (const file of await readdir(SRC)) {
  if (!file.endsWith('.png')) continue
  const { name } = parse(file)

  for (const width of WIDTHS) {
    const output = join(OUT, `${name}-${width}.webp`)
    const info = await sharp(join(SRC, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(output)
    console.log(`${output}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(1)} KB`)
  }
}
