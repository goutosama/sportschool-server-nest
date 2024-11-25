import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
  ) {}

  findAll() {
    return this.lessonsRepository.find({
      relations: ['group']
    });
  }

  create(LessonData: Partial<Lesson>) {
    const Lesson = this.lessonsRepository.create(LessonData);
    return this.lessonsRepository.save(Lesson);
  }

  update(id: number, LessonData: Partial<Lesson>) {
    return this.lessonsRepository.update(id, LessonData);
  }

  delete(id: number) {
    return this.lessonsRepository.delete(id);
  }
}
