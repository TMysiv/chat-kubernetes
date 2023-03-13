import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {
    }

    async getUserById(userId: string) {
        return this.prismaService.userProfile.findFirst({
            where: {
                id: userId,
            },
        }).catch(() => {
            throw new BadRequestException('Something went wrong');
        });
    }
}
