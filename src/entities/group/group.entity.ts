import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Student } from '../student/student.entity';
import { Teacher } from '../teacher/teacher.entity';
import { Lesson } from '../lesson/lesson.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Student, (student) => student.group)
  students: Student[];

  @ManyToMany(() => Teacher, (teacher) => teacher.groups)
  teachers: Teacher[];

  @OneToMany(() => Lesson, (lesson) => lesson.group)
  lessons: Lesson[];
}

