// Utilidad de consola para revisar las solicitudes recibidas:
//   npm run leads
import { prisma } from './db.js'

const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 50 })
console.table(
  leads.map(({ createdAt, name, email, projectType, budget, status }) => ({
    fecha: createdAt.toISOString().slice(0, 16).replace('T', ' '),
    nombre: name,
    email,
    tipo: projectType,
    presupuesto: budget ?? '—',
    estado: status,
  })),
)
await prisma.$disconnect()
