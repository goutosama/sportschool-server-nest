import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersModule } from './entities/teacher/teacher.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupsModule } from './entities/group/group.module';
import { StudentsModule } from './entities/student/student.module';
import { LessonsModule } from './entities/lesson/lesson.module';
import { HallsModule } from './entities/hall/hall.module';
import { InventoryModule } from './entities/inventory/inventory.module';
import { LessonInventory } from './entities/lessonInventory/lessonInventory.entity';
import { LessonInventoryModule } from './entities/lessonInventory/lessonInventory.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  TeachersModule,
  GroupsModule,
  StudentsModule,
  LessonsModule,
  HallsModule,
  InventoryModule,
  LessonInventoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}