import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class MessageService {
    constructor(private prismaService: PrismaService) {
    }

    async createMessage(message: string, roomId: string, userId: string) {
        return this.prismaService.messages.create({
            data: {
                text: message,
                chat_id: roomId,
                user_id: userId,
            },
        });
    }

    async getChatsMessages(roomId: string) {
        return this.prismaService.messages.findMany({
            where: {
                chat_id: roomId,
            },
        });
    }
}
