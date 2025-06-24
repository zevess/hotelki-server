import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { WishModule } from './wish/wish.module';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    WishModule,
    EventModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
