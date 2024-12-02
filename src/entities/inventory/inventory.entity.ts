import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LessonInventory } from '../lessonInventory/lessonInventory.entity';

@Entity()
export class InventoryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int', { default: 0 })
  totalQuantity: number;

  @Column('int', { default: 0 })
  availableQuantity: number;

  @OneToMany(() => LessonInventory, (lessonInventory) => lessonInventory.inventoryItem)
  lessonInventories: LessonInventory[];
}