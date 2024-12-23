type Message = { sessionId: string; participantId: string }
type Subscriber = (message: Message) => void

class JoiningSessionPubSub {
  private channels: Record<string, Subscriber[]> = {}

  subscribe(sessionId: string, subscriber: Subscriber) {
    if (!this.channels[sessionId]) {
      this.channels[sessionId] = []
    }

    this.channels[sessionId].push(subscriber)
  }

  publish(sessionId, message: Message) {
    if (!this.channels[sessionId]) {
      return
    }

    for (const subscriber of this.channels[sessionId]) {
      subscriber(message)
    }
  }
}

export const joining = new JoiningSessionPubSub()
