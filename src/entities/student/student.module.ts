import { Module } from '@nestjs/common';
import { StudentsController } from './student.controller';
import { StudentsService } from './student.service';
import { Student } from './student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}