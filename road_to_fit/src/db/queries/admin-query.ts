import { eq } from 'drizzle-orm'
import { db } from '..'
import { admin, InsertUser, SelectUser } from '../schema/admin.schema'
import hashPassword from '../../helpers/hashPassword'

// Create admin
export const createAdmin = async (data: InsertUser) => {
  const hashedPassword = await hashPassword(data.password)
  if (hashedPassword) {
    await db.insert(admin).values({ ...data, password: hashedPassword })
  }
}

// Delete admin
export const deleteAdmin = async (email: SelectUser['email']) => {
  await db.delete(admin).where(eq(admin.email, email))
}

// Get all admins
export const getAdmins = async () => {
  return await db
    .select({ id: admin.id, name: admin.name, email: admin.email })
    .from(admin)
}

// get admin by id

export const getAdminById = async (id: SelectUser['id']) => {
  return await db.select().from(admin).where(eq(admin.id, id))
}

// update admin
export const updateAdmin = async (id: SelectUser['id'], data: InsertUser) => {
  await db.update(admin).set(data).where(eq(admin.id, id))
}
