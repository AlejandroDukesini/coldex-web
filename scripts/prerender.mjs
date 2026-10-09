// Inyecta el HTML renderizado por React en dist/index.html para que el
// contenido sea visible (y rastreable) antes de que cargue el JavaScript.
//   Se ejecuta automáticamente en `npm run build`.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const SSR_DIR = resolve('dist-ssr')
const { render } = await import(pathToFileURL(resolve(SSR_DIR, 'entry-server.js')).href)

const template = await readFile('dist/index.html', 'utf8')
if (!template.includes('<!--app-html-->')) throw new Error('No se encontró <!--app-html--> en dist/index.html')

await writeFile('dist/index.html', template.replace('<!--app-html-->', render()))
await rm(SSR_DIR, { recursive: true, force: true })
console.log('✓ dist/index.html prerenderizado')
