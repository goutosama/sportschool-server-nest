import { Module } from '@nestjs/common';
import { GroupsController } from './group.controller';
import { GroupsService } from './group.service';
import { Group } from './group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}