import { db } from '..'
import { eq } from 'drizzle-orm'
import { clients, InsertClients } from '../schema/client.schema'

export const createClient = async (data: InsertClients) => {
  const hashedPassword = await Bun.password.hash(data.password)
  if (hashedPassword) {
    await db.insert(clients).values({ ...data, password: hashedPassword })
    return data.name
  } else {
    throw new Error('Failed to hash password')
  }
}

export const getClients = async () => {
  return await db
    .select({
      id: clients.id,
      name: clients.name,
      email: clients.email,
      phone: clients.phone,
      city: clients.city,
      state: clients.state,
      zip: clients.zip,
      address: clients.address,
      country: clients.country,
    })
    .from(clients)
}

export const getClientById = async (id: number) => {
  return await db
    .select({
      id: clients.id,
      name: clients.name,
      email: clients.email,
      phone: clients.phone,
      city: clients.city,
      state: clients.state,
      zip: clients.zip,
      address: clients.address,
      country: clients.country,
    })
    .from(clients)
    .where(eq(clients.id, id))
}

export const updateClient = async (id: number, data: InsertClients) => {
  if (data.password) {
    data.password = await Bun.password.hash(data.password)
  }
  await db
    .update(clients)
    .set({ ...data, password: data.password })
    .where(eq(clients.id, id))
    .returning()

  return data.id
}

export const deleteClient = async (id: number) => {
  await db.delete(clients).where(eq(clients.id, id))
}
