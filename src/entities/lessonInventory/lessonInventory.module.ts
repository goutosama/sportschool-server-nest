import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonInventory } from './lessonInventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonInventory])],
  controllers: [],
  providers: [],
})
export class LessonInventoryModule {}