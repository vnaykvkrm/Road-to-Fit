import { eq } from 'drizzle-orm'
import { db } from '..'
import {
  trainers,
  InsertTrainers,
  SelectTrainers,
} from '../schema/trainers.schema'
import hashPassword from '../../helpers/hashPassword'

type UpdateTrainer = Partial<InsertTrainers>
type SelectTrainersWithId = Partial<SelectTrainers>

// Create trainer
export const createTrainer = async (
  trainerData: InsertTrainers
): Promise<SelectTrainers> => {
  const hashedPassword = await hashPassword(trainerData.password)
  try {
    const [newTrainer] = await db
      .insert(trainers)
      .values({ ...trainerData, password: hashedPassword })
      .returning()
    return newTrainer
  } catch (error) {
    console.error('error creating trainer:', error)
    throw new Error('failed to create trainer.')
  }
}

// Get all trainers
export const getAllTrainers = async (): Promise<SelectTrainersWithId[]> => {
  try {
    let query = db
      .select({
        id: trainers.id,
        name: trainers.name,
        email: trainers.email,
        phone: trainers.phone,
        expertise: trainers.expertise,
        certifications: trainers.certifications,
        bio: trainers.bio,
        hourlyRate: trainers.hourlyRate,
        availability: trainers.availability,
        createdAt: trainers.createdAt,
      })
      .from(trainers)
    return await query.execute()
  } catch (error) {
    console.error('Error fetching trainers:', error)
    throw new Error('Failed to fetch trainers.')
  }
}

// Get a single trainer by ID
export const getTrainerById = async (
  id: number
): Promise<SelectTrainersWithId | null> => {
  try {
    const [trainer] = await db
      .select({
        id: trainers.id,
        name: trainers.name,
        email: trainers.email,
        phone: trainers.phone,
        expertise: trainers.expertise,
        certifications: trainers.certifications,
        bio: trainers.bio,
        hourlyRate: trainers.hourlyRate,
        availability: trainers.availability,
        createdAt: trainers.createdAt,
      })
      .from(trainers)
      .where(eq(trainers.id, id))
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
): Promise<SelectTrainers | null> => {
  try {
    const [updatedTrainer] = await db
      .update(trainers)
      .set(updateData)
      .where(eq(trainers.id, id))
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
      .delete(trainers)
      .where(eq(trainers.id, id))
      .execute()
    return result.rowsAffected > 0
  } catch (error) {
    console.error(`Error deleting trainer with ID ${id}:`, error)
    throw new Error('failed to delete trainer.')
  }
}
