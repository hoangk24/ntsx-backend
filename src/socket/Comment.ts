import { Request as RoomRequest } from '@/interfaces/comment.interface';
import { SocketInstance } from '@/interfaces/socket.interface';
import CommentService from '@/services/comment.service';
import { Socket } from 'socket.io';

export default class Comment implements SocketInstance {
  socket: Socket<any>;
  io: any;
  commentService = new CommentService();
  constructor(sc: Socket, io: any) {
    this.socket = sc;
    this.io = io;
  }
  run() {
    this.joinRoom();
    this.leaveRoom();
    this.createComment();
    this.removeComment();
  }
  emitSuccess(room: string) {
    this.io.to(room).emit('comments/success');
  }
  joinRoom() {
    this.socket.on('joinRoom', (id: string) => {
      this.socket.join(id);
    });
  }
  leaveRoom() {
    this.socket.on('leaveRoom', (id: string) => {
      this.socket.leave(id);
    });
  }
  createComment() {
    this.socket.on('createComment', async (data: RoomRequest) => {
      await this.commentService.addComment(data.comment);
      this.emitSuccess(data?.room);
    });
  }
  removeComment() {
    this.socket.on('removeComment', async (data: RoomRequest) => {
      await this.commentService.removeComment(data.id);
      this.emitSuccess(data?.room);
    });
  }
}
