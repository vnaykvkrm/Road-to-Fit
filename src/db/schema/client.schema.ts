import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const clients = sqliteTable('clients', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  password: text('password').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  zip: text('zip').notNull(),
  address: text('address').notNull(),
  country: text('country').notNull(),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
})

export type InsertClients = typeof clients.$inferInsert
export type SelectClients = typeof clients.$inferSelect
