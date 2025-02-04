import { Hono } from 'hono'
import admin from './end-points/admin-controller'
import trainer from './end-points/trainers-controller'

const app = new Hono()

app.route('/admin', admin)
app.route('/trainer', trainer)
export default app
