import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LessonsService } from './lesson.service';
import { Lesson } from './lesson.entity';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Post()
  create(@Body() LessonData: Partial<Lesson>) {
    return this.lessonsService.create(LessonData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() LessonData: Partial<Lesson>) {
    return this.lessonsService.update(id, LessonData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.lessonsService.delete(id);
  }
}
