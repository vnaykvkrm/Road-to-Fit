import { eq } from 'drizzle-orm'
import { db } from '..'
import { admin, InsertUser, SelectUser } from '../schema/admin.schema'

// Create admin
export const createAdmin = async (data: InsertUser) => {
  await db.insert(admin).values(data)
}

// Delete admin
export const deleteAdmin = async (email: SelectUser['email']) => {
  await db.delete(admin).where(eq(admin.email, email))
}

// Get all admins
export const getAdmins = async () => {
  return await db.select().from(admin)
}

// get admin by id

export const getAdminById = async (id: SelectUser['id']) => {
  return await db.select().from(admin).where(eq(admin.id, id))
}

// update admin
export const updateAdmin = async (id: SelectUser['id'], data: InsertUser) => {
  await db.update(admin).set(data).where(eq(admin.id, id))
}
