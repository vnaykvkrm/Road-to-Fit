import { eq } from 'drizzle-orm'
import { db } from '..'
import {
  trainerTable,
  InsertTrainer,
  SelectTrainer,
} from '../schema/trainers.schema'

type UpdateTrainer = Partial<InsertTrainer>

// Create trainer
export const createTrainer = async (
  trainerData: InsertTrainer
): Promise<SelectTrainer> => {
  try {
    const [newTrainer] = await db
      .insert(trainerTable)
      .values(trainerData)
      .returning()
    return newTrainer
  } catch (error) {
    console.error('error creating trainer:', error)
    throw new Error('failed to create trainer.')
  }
}

// Get all trainers
export const getAllTrainers = async (): Promise<SelectTrainer[]> => {
  try {
    let query = db.select().from(trainerTable)
    return await query.execute()
  } catch (error) {
    console.error('Error fetching trainers:', error)
    throw new Error('Failed to fetch trainers.')
  }
}

// Get a single trainer by ID
export const getTrainerById = async (
  id: number
): Promise<SelectTrainer | null> => {
  try {
    const [trainer] = await db
      .select()
      .from(trainerTable)
      .where(eq(trainerTable.id, id))
    return trainer || null
  } catch (error) {
    console.error(`Error fetching trainer with ID ${id}:`, error)
    throw new Error('Failed to fetch trainer.')
  }
}

// Update trainer by ID
export const updateTrainer = async (
  id: number,
  updateData: UpdateTrainer
): Promise<SelectTrainer | null> => {
  try {
    const [updatedTrainer] = await db
      .update(trainerTable)
      .set(updateData)
      .where(eq(trainerTable.id, id))
      .returning()
    return updatedTrainer || null
  } catch (error) {
    console.error(`error updating trainer with ID ${id}:`, error)
    throw new Error('failed to update trainer.')
  }
}

// Delete a trainer by ID
export const deleteTrainer = async (id: number): Promise<boolean> => {
  try {
    const result = await db
      .delete(trainerTable)
      .where(eq(trainerTable.id, id))
      .execute()
    return result.rowsAffected > 0
  } catch (error) {
    console.error(`Error deleting trainer with ID ${id}:`, error)
    throw new Error('failed to delete trainer.')
  }
}
