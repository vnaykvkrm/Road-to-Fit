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
    return newProgramme
  } catch (error) {
    console.error('error creating trainer:', error)
    throw new Error('failed to create trainer.')
  }
}
