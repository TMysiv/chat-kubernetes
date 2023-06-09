import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../services/prisma.service';
import { IJoinRoom } from './interfaces/join-room.interface';

@Injectable()
export class ChatService {
    constructor(private prismaService: PrismaService) {
    }

    async getUserChats(userId: string) {
        return this.prismaService.chats.findMany({
            where: {
                members: {
                    has: userId,
                },
            },
        }).catch(() => {
            throw new BadRequestException('Something went wrong');
        });
    }

    async createChat(data: IJoinRoom, userId: string) {
        const id = uuidv4();
        return this.prismaService.chats.create({
            data: {
                id,
                members: [userId, data.replyTo],
            },
        }).catch(() => {
            throw new BadRequestException('Something went wrong');
        });
    }

    async checkIfUserInChat(userId: string, roomId: string) {
        return this.prismaService.chats.findFirst({
            where: {
                id: roomId,
                members: {
                    has: userId,
                },
            },
        }).catch(() => {
            throw new BadRequestException('Something went wrong');
        });
    }

    async enterToChat(userId: string, roomId: string) {
        return this.prismaService.chats.update({
            where: {
                id: roomId,
            },
            data: {
                members: {
                    push: userId,
                },
            },
        }).catch(() => {
            throw new BadRequestException('Something went wrong');
        });
    }

    async deleteUserFromChat(roomId: string, userId: string) {
        const users = await this.getUsersInChat(roomId);

        if (!users) {
            throw new BadRequestException('room not found');
        }

        return this.prismaService.chats.update({
            where: {
                id: roomId,
            },
            data: {
                members: {
                    set: users.members.filter((user) => user !== userId),
                },
            },
        }).catch(() => {
            throw new BadRequestException('Something went wrong');
        });
    }

    async getUsersInChat(roomId: string) {
        return this.prismaService.chats.findFirst({
            where: {
                id: roomId,
            },
        }).catch(() => {
            throw new BadRequestException('Something went wrong');
        });
    }
}
