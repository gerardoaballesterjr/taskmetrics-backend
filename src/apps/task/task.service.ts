import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DatabaseService } from 'src/utils/database/database.service';

@Injectable()
export class TaskService {
  constructor(
    @Inject(REQUEST) private readonly Request: Request,
    private readonly DatabaseService: DatabaseService,
  ) {}

  async list(subject: string, name?: string) {
    const request: any = this.Request;
    if (
      await this.DatabaseService.subject.findUnique({
        where: { id: subject, account: request.account.id },
      })
    ) {
      if (name) {
        return await this.DatabaseService.task.findMany({
          where: { name: { contains: name }, subject: subject },
          orderBy: [{ created_at: 'asc' }],
        });
      }
      return await this.DatabaseService.task.findMany({
        where: { subject: subject },
        orderBy: [{ created_at: 'asc' }],
      });
    }
    throw new NotFoundException();
  }

  async create(data: any) {
    return []
  }
  async detail(id: string) {
    return []
  }
  async update(id: string, data: any) {
    return []
  }
  async delete(id: string) {
    return []
  }
}
