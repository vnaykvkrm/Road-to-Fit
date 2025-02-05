import { eq } from 'drizzle-orm'
import { db } from '..'
import {
  InsertTrainingProgramme,
  programmes,
} from '../schema/training-programmes.schema'

export const CreateProgramme = async (
  trainingProgrammes: InsertTrainingProgramme
) => {
  try {
    const [newProgramme] = await db
      .insert(programmes)
      .values({ ...trainingProgrammes })
      .returning()
    return `Programme created: ${newProgramme.name} for trainer ${newProgramme.trainer}`
  } catch (error) {
    console.error('error creating trainer:', error)
    throw new Error('failed to create trainer.')
  }
}

export const DeleteProgramme = async (id: number) => {
  try {
    const result = await db
      .delete(programmes)
      .where(eq(programmes.id, id))
      .execute()
    const programmeRemovedMessage = `Programme removed: ${id}`
    return programmeRemovedMessage
  } catch (error) {
    console.error(`Error deleting trainer with ID ${id}:`, error)
    throw new Error('failed to delete trainer.')
  }
}

export const UpdateProgramme = async (
  id: number,
  updateData: InsertTrainingProgramme
) => {
  try {
    const [updatedProgramme] = await db
      .update(programmes)
      .set(updateData)
      .where(eq(programmes.id, id))
      .returning()
    return updatedProgramme
  } catch (error) {
    console.error(`error updating trainer with ID ${id}:`, error)
    throw new Error('failed to update trainer.')
  }
}

export const GetAllProgrammes = async () => {
  try {
    const trainingProgrammes = await db.select().from(programmes).all()
    return trainingProgrammes
  } catch (error) {
    console.error('error getting trainers:', error)
    throw new Error('failed to get trainers.')
  }
}

export const GetProgrammeById = async (id: number) => {
  try {
    const [trainingProgramme] = await db
      .select()
      .from(programmes)
      .where(eq(programmes.id, id))
      .all()
    return trainingProgramme
  } catch (error) {
    console.error(`error getting trainer with ID ${id}:`, error)
    throw new Error('failed to get trainer.')
  }
}

export const GetProgrammesByTrainerId = async (trainerId: number) => {
  try {
    const trainingProgrammes = await db
      .select()
      .from(programmes)
      .where(eq(programmes.trainerId, trainerId))
      .all()
    return trainingProgrammes
  } catch (error) {
    console.error(`error getting trainer with ID ${trainerId}:`, error)
    throw new Error('failed to get trainer.')
  }
}
