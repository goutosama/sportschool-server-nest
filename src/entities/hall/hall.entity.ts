import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Lesson } from '../lesson/lesson.entity';

@Entity()
export class Hall {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Lesson, (lesson) => lesson.hall)
  lessons: Lesson[];
}

