import { Hono } from 'hono'
import { validator } from 'hono/validator'
import {
  createClient,
  deleteClient,
  getClientById,
  getClients,
  updateClient,
} from '../db/queries/client-query'

const client = new Hono()

const validateClient = validator('json', (data, c) => {
  const requiredFields = [
    'name',
    'email',
    'password',
    'phone',
    'city',
    'state',
    'zip',
    'address',
    'country',
  ]

  for (const field of requiredFields) {
    if (!data[field]) {
      return c.json({ error: `${field} is required` }, 400)
    }
  }

  return data
})

client.get('/', async (c) => {
  try {
    const clients = await getClients()
    return c.json(clients, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to get client' }, 500)
  }
})

// Create a new client
client.post('/create', validateClient, async (c) => {
  const data = c.req.valid('json')

  try {
    const newClient = await createClient({
      ...data,
      createdAt: new Date().toISOString(),
    })

    return c.json(
      { message: `Client created successfully`, client: newClient },
      201
    )
  } catch (error) {
    console.error('Client creation error:', error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

client.get('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    const client = await getClientById(id)
    return c.json(client, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to select client' }, 500)
  }
})

client.delete('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    const deleted = await deleteClient(id)
    return c.json(`client deleted: ${deleted}`, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to delete client' }, 500)
  }
})

// Update client by ID
client.put('update/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    const updateData = await c.req.json()
    const updatedClientId = await updateClient(id, updateData)
    return c.json({ success: `client updated: ${updatedClientId}` }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to update client' }, 500)
  }
})

export default client
