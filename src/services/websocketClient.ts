import { WS_URL } from '../config/env';
import { IncomingMessage, OutgoingMessage } from '../types/location';

type Listener = (message: IncomingMessage) => void;

class WebSocketClient {
  private socket: WebSocket | null = null;
  private listeners = new Set<Listener>();
  private queue: OutgoingMessage[] = [];

  connect() {
    if (this.socket) {
      return;
    }

    const socket = new WebSocket(WS_URL);
    this.socket = socket;

    socket.onopen = () => {
      this.queue.forEach((message) => socket.send(JSON.stringify(message)));
      this.queue = [];
    };

    socket.onmessage = (event) => {
      const message: IncomingMessage = JSON.parse(event.data);
      this.listeners.forEach((listener) => listener(message));
    };

    socket.onclose = () => {
      this.socket = null;
    };
  }

  send(message: OutgoingMessage) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      this.queue.push(message);
      this.connect();
    }
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const websocketClient = new WebSocketClient();
