import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { trainers } from './trainers.schema'

export const programmes = sqliteTable('training_programmes', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  trainerId: integer('trainer_id')
    .notNull()
    .references(() => trainers.id),
  trainer: text('trainer').notNull(),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
})

export type InsertTrainingProgramme = typeof programmes.$inferInsert
export type SelectTrainingProgramme = typeof programmes.$inferSelect
