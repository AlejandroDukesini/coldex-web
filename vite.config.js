import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// Inserta la URL pública del sitio (SITE_URL en .env) en canonical/Open Graph
// y genera robots.txt y sitemap.xml. Sin SITE_URL se usan rutas relativas.
function seo(siteUrl) {
  const base = siteUrl.replace(/\/$/, '')

  return {
    name: 'coldex-seo',
    transformIndexHtml(html) {
      const canonical = base ? `<link rel="canonical" href="${base}/" />\n    <meta property="og:url" content="${base}/" />` : ''
      return html.replaceAll('%SITE_URL%', base).replace('<!--seo:canonical-->', canonical)
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', 'Disallow: /api/', base && `Sitemap: ${base}/sitemap.xml`]
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.filter(Boolean).join('\n') + '\n' })

      if (!base) return
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${base}/</loc><lastmod>${today}</lastmod><priority>1.0</priority></url>
</urlset>
`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiPort = env.PORT || 3001

  return {
    plugins: [react(), tailwindcss(), seo(env.SITE_URL ?? '')],
    server: {
      proxy: { '/api': `http://127.0.0.1:${apiPort}` },
    },
    preview: {
      proxy: { '/api': `http://127.0.0.1:${apiPort}` },
    },
  }
})
