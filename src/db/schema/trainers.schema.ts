import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const trainers = sqliteTable('trainers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  phone: text('phone').unique(),
  password: text('password').notNull(),
  expertise: text('expertise').notNull(),
  certifications: text('certifications'),
  bio: text('bio'),
  hourlyRate: real('hourly_rate'),
  availability: text('availability'),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
})

export type InsertTrainers = typeof trainers.$inferInsert
export type SelectTrainers = typeof trainers.$inferSelect
