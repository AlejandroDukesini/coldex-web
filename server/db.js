import 'dotenv/config'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import prismaPkg from './generated/prisma/index.js'

const { PrismaClient } = prismaPkg

// Prisma 7 se conecta a SQLite a través de un driver adapter.
const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? 'file:./prisma/dev.db' })

export const prisma = new PrismaClient({ adapter })
