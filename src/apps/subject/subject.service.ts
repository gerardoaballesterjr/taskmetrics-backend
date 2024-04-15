import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DatabaseService } from 'src/utils/database/database.service';

@Injectable()
export class SubjectService {
  constructor(
    @Inject(REQUEST) private readonly Request: Request,
    private readonly DatabaseService: DatabaseService,
  ) {}

  async list(name?: string) {
    const request: any = this.Request;
    if (name) {
      return await this.DatabaseService.subject.findMany({
        where: { name: { contains: name }, account: request.account.id },
        orderBy: [{ created_at: 'asc' }],
      });
    }
    return await this.DatabaseService.subject.findMany({
      where: { account: request.account.id },
      orderBy: [{ created_at: 'asc' }],
    });
  }

  async create(data: any) {
    const request: any = this.Request;
    data.account = request.account.id;
    return await this.DatabaseService.subject.create({ data: data });
  }

  async detail(id: string) {
    const request: any = this.Request;
    const result = await this.DatabaseService.subject.findUnique({
      where: {
        id: id,
        account: request.account.id,
      },
    });
    if (!result) throw new NotFoundException();
    return result;
  }

  async update(id: string, data: any) {
    const request: any = this.Request;
    const result = await this.DatabaseService.subject.findUnique({
      where: {
        id: id,
        account: request.account.id,
      },
    });
    if (!result) throw new NotFoundException();
    delete data.semester;
    return await this.DatabaseService.subject.update({
      where: { id: id },
      data: data,
    });
  }

  async delete(id: string) {
    const request: any = this.Request;
    const result = await this.DatabaseService.subject.findUnique({
      where: {
        id: id,
        account: request.account.id,
      },
    });
    if (!result) throw new NotFoundException();
    return await this.DatabaseService.subject.delete({ where: { id: id } });
  }
}
