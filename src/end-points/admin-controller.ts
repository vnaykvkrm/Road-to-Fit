import { Hono } from 'hono'
import { createAdmin, deleteAdmin, getAdmins } from '../db/queries/admin-query'

const admin = new Hono()

// Select an admin

admin.get('/', async (c) => {
  try {
    const admins = await getAdmins()
    return c.json(admins, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to select admin' }, 500)
  }
})

// Create a new admin
admin.post('/create', async (c) => {
  const { name, email, password, role } = await c.req.json()

  if (!name || !email || !password || !role) {
    return c.json({ error: 'All fields are required' }, 400)
  }

  if (role !== 'admin' && role !== 'user') {
    return c.json({ error: 'Invalid role' }, 401)
  }

  try {
    await createAdmin({ name, email, password, role })
    return c.json({ message: `Admin ${email} created successfully` }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to create admin' }, 500)
  }
})

// Delete an admin
admin.delete('/delete', async (c) => {
  const { email } = await c.req.json()
  if (!email) {
    return c.json({ error: 'Email is required' }, 400)
  }
  try {
    await deleteAdmin(email)
    return c.json({ message: `Admin ${email} deleted successfully` }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to delete admin' }, 500)
  }
})

export default admin
