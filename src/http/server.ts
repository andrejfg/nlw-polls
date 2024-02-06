import fastify from 'fastify'
import { createPoll } from './routes/create-poll'

const app = fastify()

app.register(createPoll).get('/', () => {
  return {
    msg: 'Server working!',
  }
})

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server runinng on http://localhost:3333')
})
