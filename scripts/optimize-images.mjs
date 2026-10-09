// Convierte las capturas fuente (assets-src/projects/*.png) en WebP
// recortados a 16:10 y en dos anchos para srcset. Idempotente.
//   npm run optimize:images
import { readdir, mkdir } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const SRC = 'assets-src/projects'
const OUT = 'public/projects'
const WIDTHS = [640, 1200]
const RATIO = 10 / 16

await mkdir(OUT, { recursive: true })

for (const file of await readdir(SRC)) {
  if (!file.endsWith('.png')) continue
  const { name } = parse(file)

  for (const width of WIDTHS) {
    const output = join(OUT, `${name}-${width}.webp`)
    const info = await sharp(join(SRC, file))
      .resize({ width, height: Math.round(width * RATIO), fit: 'cover', position: 'top' })
      .webp({ quality: 78, effort: 6 })
      .toFile(output)
    console.log(`${output}  ${(info.size / 1024).toFixed(1)} KB`)
  }
}
