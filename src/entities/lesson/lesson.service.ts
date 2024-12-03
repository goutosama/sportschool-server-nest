import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { InventoryService } from '../inventory/inventory.service';
import { LessonInventory } from '../lessonInventory/lessonInventory.entity';
import { UpdateLessonDto } from './lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
    @InjectRepository(LessonInventory)
    private readonly lessonInventoryRepository: Repository<LessonInventory>,
    private readonly inventoryService: InventoryService,
  ) {}

  findAll() {
    return this.lessonsRepository.find({
      relations: {
        group: true,
        teacher: true,
        hall: true,
        lessonInventories: {
          inventoryItem: true
        } 
        },
    });
  }
//'group', 'teacher', 'hall', 'lessonInventories'
  getTeacherSchedule(id: number) {
    return this.lessonsRepository.find({
      where: {
        teacher: {
          id: id,
        },
      },
      relations: ['group', 'teacher', 'hall'],
    });
  }

  getGroupSchedule(id: number) {
    return this.lessonsRepository.find({
      where: {
        group: {
          id: id,
        },
      },
      relations: ['group', 'teacher', 'hall'],
    });
  }

  getHallSchedule(id: number) {
    return this.lessonsRepository.find({
      where: {
        group: {
          id: id
        }
      },
      relations: ['group', 'teacher', 'hall']
    }) 
  }

  async create(
    lessonData: Partial<Lesson>,
    inventoryAssignments: { inventoryId: number; quantity: number }[],
  ): Promise<Lesson> {
    const lesson = this.lessonsRepository.create(lessonData);
    const savedLesson = await this.lessonsRepository.save(lesson);

    for (const assignment of inventoryAssignments) {
      await this.lessonInventoryRepository.save({
        lesson: savedLesson,
        inventoryItem: { id: assignment.inventoryId },
        quantity: assignment.quantity,
      });

      await this.inventoryService.adjustQuantity(
        assignment.inventoryId,
        -assignment.quantity,
      );
    }

    return savedLesson;
  }

  async update(lessonId: number, lessonData: UpdateLessonDto): Promise<Lesson> {
    const { ...lessonDetails } = lessonData;
    const inventoryAssignments = lessonData.inventoryAssignments;

    const lesson = await this.lessonsRepository.findOne({
      where: { id: lessonId },
    });
    if (!lesson) {
      throw new HttpException('Lesson not found', HttpStatus.BAD_REQUEST);
    }

    if (inventoryAssignments) {
      const existingAssignments = await this.lessonInventoryRepository.find({
        where: { lesson: { id: lessonId } },
        relations: ['inventoryItem'],
      });

      // Revert previous inventory adjustments
      for (const assignment of existingAssignments) {
        await this.inventoryService.adjustQuantity(
          assignment.inventoryItem.id,
          assignment.quantity,
        );
      }

      // Delete old assignments
      await this.lessonInventoryRepository.delete({ lesson: { id: lessonId } });

      // Add new assignments
      for (const assignment of inventoryAssignments) {
        await this.lessonInventoryRepository.save({
          lesson,
          inventoryItem: { id: assignment.inventoryId },
          quantity: assignment.quantity,
        });

        await this.inventoryService.adjustQuantity(
          assignment.inventoryId,
          -assignment.quantity,
        );
      }
    }

    return this.lessonsRepository.save({ ...lesson, ...lessonDetails });
  }

  async delete(lessonId: number): Promise<void> {
    const lessonInventories = await this.lessonInventoryRepository.find({
      where: { lesson: { id: lessonId } },
      relations: ['inventoryItem'],
    });

    for (const lessonInventory of lessonInventories) {
      await this.inventoryService.adjustQuantity(
        lessonInventory.inventoryItem.id,
        lessonInventory.quantity,
      );
    }

    await this.lessonInventoryRepository.delete({ lesson: { id: lessonId } });
    await this.lessonsRepository.delete(lessonId);
  }
}
