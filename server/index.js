import 'dotenv/config'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import { prisma } from './db.js'
import { createRateLimiter } from './rate-limit.js'

const PORT = Number(process.env.PORT ?? 3001)
const HOST = process.env.HOST ?? '127.0.0.1'
const DIST_DIR = fileURLToPath(new URL('../dist', import.meta.url))

const PROJECT_TYPES = ['regalo', 'landing', 'web', 'app', 'ecommerce', 'otro']
const BUDGETS = ['por-definir', 'basico', 'medio', 'alto']

// Detrás de un proxy (Nginx, Render, Railway…) pon TRUST_PROXY=true para que
// el rate limit use la IP real del visitante y no la del proxy.
const app = Fastify({ logger: true, bodyLimit: 16 * 1024, trustProxy: process.env.TRUST_PROXY === 'true' })
const isLimited = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 5 })

const leadSchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['name', 'email', 'projectType', 'message'],
    properties: {
      name: { type: 'string', minLength: 2, maxLength: 80 },
      email: { type: 'string', format: 'email', maxLength: 120 },
      projectType: { type: 'string', enum: PROJECT_TYPES },
      budget: { type: 'string', enum: BUDGETS },
      message: { type: 'string', minLength: 10, maxLength: 2000 },
      // Honeypot: un campo invisible que solo rellenan los bots.
      website: { type: 'string', maxLength: 200 },
    },
  },
}

app.get('/api/health', async () => ({ ok: true }))

app.post('/api/leads', { schema: leadSchema }, async (request, reply) => {
  const { website, ...lead } = request.body

  if (website) return reply.code(201).send({ ok: true })

  if (isLimited(request.ip)) {
    return reply.code(429).send({ ok: false, error: 'Demasiadas solicitudes. Inténtalo de nuevo en unos minutos.' })
  }

  const created = await prisma.lead.create({
    data: {
      name: lead.name.trim(),
      email: lead.email.trim().toLowerCase(),
      projectType: lead.projectType,
      budget: lead.budget ?? null,
      message: lead.message.trim(),
    },
    select: { id: true },
  })

  return reply.code(201).send({ ok: true, id: created.id })
})

app.setErrorHandler((error, request, reply) => {
  if (error.validation) {
    return reply.code(400).send({ ok: false, error: 'Revisa los campos del formulario.' })
  }
  request.log.error(error)
  return reply.code(500).send({ ok: false, error: 'No se pudo enviar el mensaje.' })
})

// En producción la misma API sirve el build de Vite.
if (existsSync(DIST_DIR)) {
  await app.register(fastifyStatic, {
    root: DIST_DIR,
    cacheControl: false,
    // Los archivos de /assets llevan hash en el nombre: se cachean para siempre.
    // @fastify/static v10 pasa el Reply de Fastify (no el `res` de Node).
    setHeaders(reply, filePath) {
      const normalized = filePath.replaceAll('\\', '/')
      if (normalized.endsWith('.html')) reply.header('cache-control', 'no-cache')
      else if (normalized.includes('/assets/')) reply.header('cache-control', 'public, max-age=31536000, immutable')
      else reply.header('cache-control', 'public, max-age=86400')
    },
  })
  app.setNotFoundHandler((request, reply) => {
    if (request.url.startsWith('/api/')) return reply.code(404).send({ ok: false, error: 'No encontrado' })
    return reply.sendFile('index.html')
  })
}

const shutdown = async () => {
  await app.close()
  await prisma.$disconnect()
  process.exit(0)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

await app.listen({ port: PORT, host: HOST })
