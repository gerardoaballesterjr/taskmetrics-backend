import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/utils/database/database.service';

@Injectable()
export class SemesterService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  async list(name?: string) {
    if (name) {
      return await this.DatabaseService.semester.findMany({
        where: { name: { contains: name } },
        orderBy: [{ created_at: 'asc' }],
      });
    }
    return await this.DatabaseService.semester.findMany({
      orderBy: [{ created_at: 'asc' }],
    });
  }

  async create(data: any) {
    return await this.DatabaseService.semester.create({ data: data });
  }

  async detail(id: string) {
    const result = await this.DatabaseService.semester.findUnique({
      where: { id: id },
    });
    if (!result) throw new NotFoundException();
    return result;
  }

  async update(id: string, data: any) {
    const result = await this.DatabaseService.semester.findUnique({
      where: { id: id },
    });
    if (!result) throw new NotFoundException();
    return await this.DatabaseService.semester.update({
      where: { id: id },
      data: data,
    });
  }

  async delete(id: string) {
    const result = await this.DatabaseService.semester.findUnique({
      where: { id: id },
    });
    if (!result) throw new NotFoundException();
    return await this.DatabaseService.semester.delete({ where: { id: id } });
  }
}
