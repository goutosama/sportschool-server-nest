import { Module } from '@nestjs/common';
import { HallsController } from './hall.controller';
import { HallsService } from './hall.service';
import { Hall } from './hall.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Hall])],
  controllers: [HallsController],
  providers: [HallsService],
})
export class HallsModule {}