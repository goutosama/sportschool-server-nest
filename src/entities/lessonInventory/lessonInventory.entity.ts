import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { InventoryItem } from '../inventory/inventory.entity';
import { Lesson } from '../lesson/lesson.entity';

@Entity()
export class LessonInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.lessonInventories, { onDelete: 'CASCADE' })
  lesson: Lesson;

  @ManyToOne(() => InventoryItem, (inventoryItem) => inventoryItem.lessonInventories, { onDelete: 'CASCADE' })
  inventoryItem: InventoryItem;

  @Column('int')
  quantity: number;
}
