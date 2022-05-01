import { Socket } from 'socket.io';

export interface SocketInstance {
  socket: Socket;
  run: any;
}
export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}
// export interface ClientToServerEvents {
//   hello: () => void;
// }
export interface InterServerEvents {
  ping: () => void;
}
