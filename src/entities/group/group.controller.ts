import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { GroupsService } from './group.service';
import { Group } from './group.entity';
import { UpdateGroupDto } from './updateGroup.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.groupsService.findOne(id);
  }

  @Get('/schedule/:id')
  getSchedule(@Param('id') id: number) {
    return this.groupsService.schedule(id);
  }

  @Post()
  create(@Body() groupData: Partial<Group>) {
    return this.groupsService.create(groupData);
  }

  @Put(':id')
  async updateGroup(
    @Param('id') id: number,
    @Body() groupData: UpdateGroupDto,
  ) {
    return this.groupsService.update(id, groupData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.groupsService.delete(id);
  }
}
