import { Module } from '@nestjs/common';
import { LessonsController } from './lesson.controller';
import { LessonsService } from './lesson.service';
import { Lesson } from './lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryItem } from '../inventory/inventory.entity';
import { InventoryService } from '../inventory/inventory.service';
import { InventoryModule } from '../inventory/inventory.module';
import { LessonInventory } from '../lessonInventory/lessonInventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, LessonInventory, InventoryItem]), InventoryModule],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}