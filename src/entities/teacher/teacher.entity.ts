import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Lesson } from '../lesson/lesson.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({nullable: true})
  patronym: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @OneToMany(() => Lesson, (lesson) => lesson.teacher)
  lessons: Lesson[];
}
