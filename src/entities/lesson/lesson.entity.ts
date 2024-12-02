import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Group } from '../group/group.entity';
import { Teacher } from '../teacher/teacher.entity';
import { Hall } from '../hall/hall.entity';
import { OneToMany } from 'typeorm';
import { LessonInventory } from '../lessonInventory/lessonInventory.entity';

@Entity()
export class Lesson{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int8')  // From 1 to 7 for convineince
  weekDay: number;

  @Column('time')
  startTime: string;

  @Column()
  duration: number;

  @ManyToOne(() => Hall, (hall) => hall.lessons)
  hall: Hall;

  @ManyToOne(() => Group, (group) => group.lessons)
  group: Group;

  @ManyToOne(() => Teacher, (teacher) => teacher.lessons)
  teacher: Teacher;

  @OneToMany(() => LessonInventory, (lessonInventory) => lessonInventory.lesson)
  lessonInventories: LessonInventory[];
}
