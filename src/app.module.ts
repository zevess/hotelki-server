import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WishModule } from './wish/wish.module';
import { EventModule } from './event/event.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    WishModule,
    EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
