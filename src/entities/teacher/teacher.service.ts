import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
  ) {}

  findAll() {
    return this.teachersRepository.find();
  }

  create(TeacherData: Partial<Teacher>) {
    const Teacher = this.teachersRepository.create(TeacherData);
    return this.teachersRepository.save(Teacher);
  }

  update(id: number, TeacherData: Partial<Teacher>) {
    return this.teachersRepository.update(id, TeacherData);
  }

  delete(id: number) {
    return this.teachersRepository.delete(id);
  }
}
