import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto } from './dto/event.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Get()
  async getAll() {
    return this.eventService.getAll()
  }

  @Get('by-id/:eventId')
  async get(@Param('eventId') eventId: string) {
    return this.eventService.getById(eventId)
  }

  @Get('by-user/:userId')
  async getAllUserWishes(@Param('userId') userId: string) {
    return this.eventService.getByUserId(userId)
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  @Auth()
  async createEvent(@Body() dto: EventDto, @CurrentUser('id') id: string) {
    return this.eventService.create(dto, id)
  }

  @UsePipes(new ValidationPipe())
  @Patch('update/:eventId')
  @Auth()
  async updateEvent(@Body() dto: EventDto, @Param('eventId') eventId: string) {
    return this.eventService.update(dto, eventId)
  }

  @Delete('delete/:eventId')
  @Auth()
  async deleteEvent(@Param('eventId') eventId: string) {
    return this.eventService.delete(eventId)
  }

}
