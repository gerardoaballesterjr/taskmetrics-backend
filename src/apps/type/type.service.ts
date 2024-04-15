import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/utils/database/database.service';

@Injectable()
export class TypeService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  async list(semester?: string) {
    if (semester) {
      return await this.DatabaseService.type.findMany({
        where: { semester: semester },
        orderBy: [{ created_at: 'asc' }],
      });
    }
    return await this.DatabaseService.type.findMany({
      orderBy: [{ created_at: 'asc' }],
    });
  }

  async create(data: any) {
    return await this.DatabaseService.type.create({ data: data });
  }

  async detail(id: string) {
    const result = await this.DatabaseService.type.findUnique({
      where: { id: id },
    });
    if (!result) throw new NotFoundException();
    return result;
  }

  async update(id: string, data: any) {
    const result = await this.DatabaseService.type.findUnique({
      where: { id: id },
    });
    if (!result) throw new NotFoundException();
    delete data.semester;
    return await this.DatabaseService.type.update({
      where: { id: id },
      data: data,
    });
  }

  async delete(id: string) {
    const result = await this.DatabaseService.type.findUnique({
      where: { id: id },
    });
    if (!result) throw new NotFoundException();
    return await this.DatabaseService.type.delete({ where: { id: id } });
  }
}
