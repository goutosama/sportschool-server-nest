import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from './inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryItem)
    private readonly inventoryRepository: Repository<InventoryItem>,
  ) {}

  async adjustQuantity(inventoryId: number, adjustment: number): Promise<void> {
    const inventory = await this.inventoryRepository.findOne({
      where: { id: inventoryId },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    }

    inventory.availableQuantity += adjustment;

    if (inventory.availableQuantity < 0) {
      throw new HttpException('Not enough inventory available', HttpStatus.BAD_REQUEST);
    }

    await this.inventoryRepository.save(inventory);
  }

  async findAll(): Promise<InventoryItem[]> {
    return await this.inventoryRepository.find();
  }

  async findById(id: number): Promise<InventoryItem> {
    return await this.inventoryRepository.findOne({where: { id: id}})
  }

  async create( name: string, totalQuantity: number ): Promise<InventoryItem> {
    const inventory = this.inventoryRepository.create({
      name: name,
      availableQuantity: totalQuantity,
      totalQuantity: totalQuantity,
    });

    return this.inventoryRepository.save(inventory);
  }

  async update(id: number, data: Partial<InventoryItem>): Promise<InventoryItem> {
    const inventory = await this.inventoryRepository.findOne({ where: { id } });

    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    }

    if (data.totalQuantity !== undefined) {
      const adjustment = data.totalQuantity - inventory.totalQuantity;
      inventory.availableQuantity += adjustment;
      if (inventory.availableQuantity < 0) {
        throw new Error('Cannot reduce totalQuantity below reserved inventory');
      }
    }

    return this.inventoryRepository.save({ ...inventory, ...data });
  }

  async delete(id: number): Promise<void> {
    const inventory = await this.inventoryRepository.findOne({ where: { id: id } });

    if (!inventory) {
      throw new NotFoundException('Inventory item not found');
    }

    if (inventory.availableQuantity < inventory.totalQuantity) {
      throw new Error('Cannot delete inventory in use');
    }

    await this.inventoryRepository.delete(id);
  }
}
