import { Module } from '@nestjs/common';
import { WishService } from './wish.service';
import { WishController } from './wish.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [WishController],
  providers: [WishService, PrismaService],
})
export class WishModule { }
