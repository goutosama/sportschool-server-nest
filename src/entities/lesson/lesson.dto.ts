import { IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class InventoryAssignmentDto {
  @IsInt()
  inventoryId: number;

  @IsInt()
  quantity: number;
}

export class CreateLessonDto {
  @IsString()
  name: string;

  @IsInt()
  weekDay: number;

  @IsString()
  startTime: string;

  @IsInt()
  duration: number;

  @ValidateNested({ each: true })
  @Type(() => InventoryAssignmentDto)
  inventoryAssignments: InventoryAssignmentDto[];
}

export class UpdateLessonDto {
  @IsString()
  name?: string;

  @IsInt()
  weekDay?: number;

  @IsString()
  startTime?: string;

  @IsInt()
  duration?: number;

  @ValidateNested({ each: true })
  @Type(() => InventoryAssignmentDto)
  inventoryAssignments?: InventoryAssignmentDto[];
}
