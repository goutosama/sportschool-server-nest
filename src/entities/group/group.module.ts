import { Module } from '@nestjs/common';
import { GroupsController } from './group.controller';
import { GroupsService } from './group.service';
import { Group } from './group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from '../student/student.module';
import { Student } from '../student/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Student])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}