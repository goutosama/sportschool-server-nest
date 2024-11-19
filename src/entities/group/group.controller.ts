import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { GroupsService } from './group.service';
import { Group } from './group.entity';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Post()
  create(@Body() groupData: Partial<Group>) {
    return this.groupsService.create(groupData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() groupData: Partial<Group>) {
    return this.groupsService.update(id, groupData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.groupsService.delete(id);
  }
}
