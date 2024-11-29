import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { HallsService } from './hall.service';
import { Hall } from './hall.entity';

@Controller('halls')
export class HallsController {
  constructor(private readonly hallsService: HallsService) {}

  @Get()
  findAll() {
    return this.hallsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.hallsService.findOne(id);
  }

  @Get('/schedule/:id')
  getSchedule(@Param('id') id: number) {
    return this.hallsService.schedule(id);
  }

  @Post()
  create(@Body() hallData: Partial<Hall>) {
    return this.hallsService.create(hallData);
  }

  @Put(':id')
  async updatehall(
    @Param('id') id: number,
    @Body() hallData: Partial<Hall>,
  ) {
    return this.hallsService.update(id, hallData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.hallsService.delete(id);
  }
}
