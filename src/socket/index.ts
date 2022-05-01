import { Server, Socket } from 'socket.io';

export default class SocketServer {
  public io = new Server();
  constructor(arrFn: any[]) {
    this.io.on('connection', socket => this.runFunction(arrFn, socket));
  }
  runFunction(func: Array<any>, socket: Socket) {
    func.forEach(it => {
      new it(socket, this.io).run();
    });
  }
}
export const listen = (event: string, fn: any, socket: Socket) => {
  socket.on(event, (data: any) => fn(data));
};
export const emit = (event: string, data: any, socket: Socket) => {
  socket.emit(event, data);
};
