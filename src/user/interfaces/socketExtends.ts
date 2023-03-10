import { Socket } from 'socket.io';
import { IUser } from './user.interface';

export class SocketExtends extends Socket {
    user: IUser;
}
