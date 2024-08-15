import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(_client: Socket, payload: string): void {
    console.log('Received message:', payload);
    this.server.emit('message', payload);
  }

  @SubscribeMessage('ping')
  handlePing(client: Socket): void {
    console.log('Received ping from client');
    client.emit('pong', 'Server: Pong!');
  }
}
