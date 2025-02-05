import { Hono } from 'hono'
import {
  CreateProgramme,
  DeleteProgramme,
  GetProgrammeById,
  UpdateProgramme,
  GetProgrammesByTrainerId,
} from '../db/queries/training-programmes-query'

const programmes = new Hono()

programmes.get('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    const programme = await GetProgrammeById(id)
    return c.json(programme, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to select programme' }, 500)
  }
})

programmes.get('/trainer/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    const programmes = await GetProgrammesByTrainerId(id)
    return c.json(programmes, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to select programmes' }, 500)
  }
})

programmes.put('update/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    const updateData = await c.req.json()
    const updatedProgramme = await UpdateProgramme(id, updateData)
    return c.json(
      { success: `Programme updated: ${updatedProgramme?.name}` },
      200
    )
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to update programme' }, 500)
  }
})

programmes.post('/create', async (c) => {
  try {
    const data = await c.req.json()
    const newProgramme = await CreateProgramme(data)
    return c.json({ success: newProgramme }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to create programme' }, 500)
  }
})

programmes.delete('/delete/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'))
    const deletedMessage = await DeleteProgramme(id)
    return c.json({ success: deletedMessage }, 200)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to delete programme' }, 500)
  }
})

export default programmes
