import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  findAll() {
    return this.groupsRepository.find();
  }

  create(groupData: Partial<Group>) {
    const group = this.groupsRepository.create(groupData);
    return this.groupsRepository.save(group);
  }

  update(id: number, groupData: Partial<Group>) {
    return this.groupsRepository.update(id, groupData);
  }

  delete(id: number) {
    return this.groupsRepository.delete(id);
  }
}
