import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { StudentsService } from './student.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Post()
  create(@Body() studentData: Partial<Student>) {
    return this.studentsService.create(studentData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() studentData: Partial<Student>) {
    return this.studentsService.update(id, studentData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.studentsService.delete(id);
  }
}
