import { Hono } from 'hono'
import admin from './end-points/admin-controller'
import trainer from './end-points/trainers-controller'
import programmes from './end-points/training-programmes.controller'
import client from './end-points/clients-controller'

const app = new Hono()

app.route('/admin', admin)
app.route('/trainer', trainer)
app.route('/programme', programmes)
app.route('/client', client)
export default app
