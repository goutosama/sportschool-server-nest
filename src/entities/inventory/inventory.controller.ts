import { Controller, Get, Post, Patch, Param, Body, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryItem } from './inventory.entity';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body() body: { name: string; totalQuantity: number;}) {
    return this.inventoryService.create(body.name, body.totalQuantity );
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryService.findById(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<InventoryItem>) {
    return this.inventoryService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryService.delete(id);
  }

}
