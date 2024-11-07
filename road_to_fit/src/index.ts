import { Hono } from 'hono'
import {
  createAdmin,
  deleteAdmin,
  getAdminById,
  getAdmins,
  updateAdmin,
} from './db/queries/admin-query'

const app = new Hono()

// Create a new admin
app.post('/admin/create', async (c) => {
  const { name, email, password, role } = await c.req.json()
  console.log({ name, email, password, role }, 'admin data')

  if (!name || !email || !password || !role) {
    return c.json({ error: 'All fields are required' }, 400)
  }

  if (role !== 'admin' && role !== 'user') {
    return c.json({ error: 'Invalid role' }, 401)
  }

  try {
    await createAdmin({ name, email, password, role })
    return c.json({ message: 'Admin created successfully' }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to create admin' }, 500)
  }
})

// Delete an admin
app.delete('/admin/delete', async (c) => {
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

// Select an admin

app.get('/admin', async (c) => {
  try {
    const admins = await getAdmins()
    return c.json(admins, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to select admin' }, 500)
  }
})

app.get('/admin/:id', async (c) => {
  const { id } = c.req.param()
  try {
    const admin = await getAdminById(Number(id))
    return c.json(admin, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to select admin' }, 500)
  }
})

app.put('/admin/update/:adminId', async (c) => {
  const { adminId } = c.req.param()
  const { id, name, email, password, role } = await c.req.json()
  try {
    await updateAdmin(Number(adminId), { id, name, email, password, role })
    return c.json({ message: 'Admin updated successfully' }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to update admin' }, 500)
  }
})
export default app
