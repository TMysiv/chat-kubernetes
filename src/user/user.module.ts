import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../services/prisma.service';

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService],
  controllers: [],
})
export class UserModule {}
