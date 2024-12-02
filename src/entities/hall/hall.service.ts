import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Hall } from './hall.entity';
import { Student } from '../student/student.entity';

@Injectable()
export class HallsService {
  constructor(
    @InjectRepository(Hall)
    private readonly hallsRepository: Repository<Hall>,
  ) {}

  findAll() {
    return this.hallsRepository.find({
      relations: ['lessons']
    });
  }

  findOne(id: number) {
    return this.hallsRepository.findOne({
      where: {
        id: id,
      },
      relations: ['students', 'teachers', 'lessons'],
    });
  }

  schedule(id: number) {
    return this.hallsRepository.findOne({
      where: {
        id: id,
      },
      relations: ['lessons'],
    });
  }

  create(hallData: Partial<Hall>) {
    const hall = this.hallsRepository.create(hallData);
    return this.hallsRepository.save(hall);
  }

 update(id: number, studentData: Partial<Student>) {
    return this.hallsRepository.update(id, studentData);
  }

  delete(id: number) {
    return this.hallsRepository.delete(id);
  }
}
