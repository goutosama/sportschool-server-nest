import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  findAll() {
    return this.studentsRepository.find();
  }

  create(studentData: Partial<Student>) {
    const student = this.studentsRepository.create(studentData);
    return this.studentsRepository.save(student);
  }

  update(id: number, studentData: Partial<Student>) {
    return this.studentsRepository.update(id, studentData);
  }

  delete(id: number) {
    return this.studentsRepository.delete(id);
  }
}
