import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Group } from './group.entity';
import { UpdateGroupDto } from './updateGroup.dto';
import { Student } from '../student/student.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  findAll() {
    return this.groupsRepository.find({
      relations: ['students'],
    });
  }

  findOne(id: number) {
    return this.groupsRepository.findOne({
      where: {
        id: id,
      },
      relations: ['students', 'teachers', 'lessons'],
    });
  }

  schedule(id: number) {
    return this.groupsRepository.findOne({
      where: {
        id: id,
      },
      relations: ['lessons'],
    });
  }

  create(groupData: Partial<Group>) {
    const group = this.groupsRepository.create(groupData);
    return this.groupsRepository.save(group);
  }

  async update(groupId: number, groupData: UpdateGroupDto) {
    const { name, students } = groupData;

    // Обновляем основную информацию о группе
    const group = await this.groupsRepository.findOne({
      where: { id: groupId },
    });
    if (!group) {
      throw new Error('Group not found');
    }
    group.name = name;
    await this.groupsRepository.save(group);

    // Обновляем связь между группой и студентами
    if (students && students.length > 0) {
      const studentsObj = await this.studentsRepository.findBy({
        id: In(students), 
      });

      if (students.length !== students.length) {
        throw new Error('Some students not found');
      }

      group.students = studentsObj;
      await this.groupsRepository.save(group);
    } else {
      // Если studentIds пустой, отвязываем всех студентов
      group.students = [];
      await this.groupsRepository.save(group);
    }

    return group;
  }

  delete(id: number) {
    return this.groupsRepository.delete(id);
  }
}
