import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TeachersService } from './teacher.service';
import { Teacher } from './teacher.entity';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @Post()
  create(@Body() teacherData: Partial<Teacher>) {
    return this.teachersService.create(teacherData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() teacherData: Partial<Teacher>) {
    return this.teachersService.update(id, teacherData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.teachersService.delete(id);
  }
}
