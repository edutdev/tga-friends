import { io } from 'socket.io-client'

const socket = io('http://localhost:3333/sessions')

socket.emit('joinParticipants', { sessionId: 'abc123' })

// socket.on('joinedParticipants', (data) => {
//   console.log('Joined Room:', data)
// })

// socket.on('participantJoined', (data) => {
//   console.log('Participant Joined:', data)
// })

// socket.on('error', (error) => {
//   console.log('Error:', error)
// })
