import { Module } from '@nestjs/common'

import { SessionParticipantsGateway } from './sessions/session-participants.gateway'

@Module({
  providers: [SessionParticipantsGateway],
  exports: [SessionParticipantsGateway],
})
export class WebSocketModule {}
