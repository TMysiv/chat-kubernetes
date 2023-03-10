import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
      ChatModule,
      UserModule,
      MessageModule,
      ConfigModule.forRoot({ envFilePath: '.env' }),
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'docs'),
        serveRoot: '/docs',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
