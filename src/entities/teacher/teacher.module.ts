import { Module } from '@nestjs/common';
import { TeachersController } from './teacher.controller';
import { TeachersService } from './teacher.service';
import { Teacher } from './teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}