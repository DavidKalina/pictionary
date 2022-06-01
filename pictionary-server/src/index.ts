import express from 'express'

const app = express()

import http from 'http'
const server = http.createServer(app)

import { Server } from 'socket.io'
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', socket => {
  console.log('a user connected')

  socket.on('path', ({ x, y }: { x: number; y: number }) => {
    io.emit('draw', { x, y })
  })
})

server.listen(4000, () => {
  console.log('listening on *:4000')
})
