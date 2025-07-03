import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from './dto/event.dto';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return this.eventService.getAll()
  }

  @Get('by-id/:eventId')
  @HttpCode(HttpStatus.OK)
  async get(@Param('eventId') eventId: string) {
    return this.eventService.getById(eventId)
  }

  @Get('by-user/:userId')
  @HttpCode(HttpStatus.OK)
  async getAllUserWishes(@Param('userId') userId: string) {
    return this.eventService.getByUserId(userId)
  }

  @Get('by-user/:userId/:slug')
  @HttpCode(HttpStatus.OK)
  async getAllUserWishesBySlug(@Param('userId') userId: string, @Param('slug') slug?: string) {
    return this.eventService.getByUserId(userId, slug)
  }


  @Authorization()
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createEvent(@Body() dto: EventDto, @Authorized('id') id: string) {
    return this.eventService.create(dto, id)
  }

  @Authorization()
  @Patch('update/:eventId')
  @HttpCode(HttpStatus.OK)
  async updateEvent(@Body() dto: EventDto, @Param('eventId') eventId: string) {
    return this.eventService.update(dto, eventId)
  }


  @Authorization()
  @Delete('delete/:eventId')
  @HttpCode(HttpStatus.CREATED)
  async deleteEvent(@Param('eventId') eventId: string) {
    return this.eventService.delete(eventId)
  }

}
