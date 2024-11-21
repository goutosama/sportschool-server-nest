import { Module } from '@nestjs/common';
import { LessonsController } from './lesson.controller';
import { LessonsService } from './lesson.service';
import { Lesson } from './lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson])],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}