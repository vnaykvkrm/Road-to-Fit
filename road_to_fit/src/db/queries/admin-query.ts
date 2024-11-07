import { eq } from 'drizzle-orm'
import { db } from '..'
import { adminTable, InsertUser, SelectUser } from '../schema/admin'

// Create admin
export const createAdmin = async (data: InsertUser) => {
  await db.insert(adminTable).values(data)
}

// Delete admin
export const deleteAdmin = async (email: SelectUser['email']) => {
  await db.delete(adminTable).where(eq(adminTable.email, email))
}

// Get all admins
export const getAdmins = async () => {
  return await db.select().from(adminTable)
}

// get admin by id

export const getAdminById = async (id: SelectUser['id']) => {
  return await db.select().from(adminTable).where(eq(adminTable.id, id))
}

// update admin
export const updateAdmin = async (id: SelectUser['id'], data: InsertUser) => {
  await db.update(adminTable).set(data).where(eq(adminTable.id, id))
}
