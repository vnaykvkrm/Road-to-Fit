import { Hono } from 'hono'
import {
  createTrainer,
  deleteTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainer,
} from '../db/queries/trainers-query'

const trainer = new Hono()

trainer.get('/', async (c) => {
  try {
    const trainers = await getAllTrainers()
    return c.json(trainers, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to select trainer' }, 500)
  }
})

// Create a new trainer
trainer.post('/create', async (c) => {
  const {
    name,
    email,
    phone,
    expertise,
    certifications,
    bio,
    hourlyRate,
    availability,
    password,
  } = await c.req.json()

  if (
    !name ||
    !email ||
    !expertise ||
    !certifications ||
    !bio ||
    !hourlyRate ||
    !availability ||
    !password
  ) {
    return c.json({ error: 'All fields are required' }, 400)
  }

  try {
    const newTrainer = await createTrainer({
      name,
      email,
      phone,
      expertise,
      certifications,
      bio,
      hourlyRate,
      availability,
      password,
      city: '',
      state: '',
      zip: '',
      address: '',
      country: '',
    })
    return c.json(`Trainer created: ${newTrainer.name}`, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to create trainer' }, 500)
  }
})

trainer.get('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    const trainer = await getTrainerById(id)
    return c.json(trainer, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to select trainer' }, 500)
  }
})

trainer.delete('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    const deleted = await deleteTrainer(id)
    return c.json(`Trainer deleted: ${deleted}`, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to delete trainer' }, 500)
  }
})

// Update trainer by ID
trainer.put('update/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    const updateData = await c.req.json()
    const updatedTrainer = await updateTrainer(id, updateData)
    return c.json({ success: `Trainer updated: ${updatedTrainer?.name}` }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to update trainer' }, 500)
  }
})

export default trainer
