import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Group } from '../group/group.entity';

@Entity()
export class Lesson{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()  // From 1 to 7 for convineince
  weekDay: number;

  @ManyToOne(() => Group, (group) => group.lessons)
  group: Group;
}
