import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const adminTable = sqliteTable('admin', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  role: text('role', { enum: ['admin', 'user'] }).notNull(),
})

export type InsertUser = typeof adminTable.$inferInsert
export type SelectUser = typeof adminTable.$inferSelect
