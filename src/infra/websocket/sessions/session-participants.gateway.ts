import { Logger } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/sessions' })
export class SessionParticipantsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(SessionParticipantsGateway.name)

  @WebSocketServer()
  server!: Server

  afterInit(server: any) {
    this.logger.log('FOI ESSA PORRA!')
  }

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.server.sockets

    this.logger.log(`clientId: ${client.id}`)
    // this.logger.debug(sockets.size)
  }

  handleDisconnect(client: any) {
    this.logger.log('DESCONECTOU ESSE CARAI')
  }

  @SubscribeMessage('joinParticipants')
  handleJoinParticipants(
    @MessageBody() data: { sessionId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { sessionId } = data
    this.logger.log(sessionId)

    if (!sessionId) {
      client.emit('error', { message: 'Session ID is required.' })
      return
    }

    const room = `/sessions/${sessionId}/participants`

    client.join(room)

    client.emit('joinedParticipants', {
      sessionId,
    })
  }
}
