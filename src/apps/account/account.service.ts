import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/utils/database/database.service';

@Injectable()
export class AccountService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  async list(email?: string) {
    if (email) {
      let result = await this.DatabaseService.account.findMany({
        where: { email: { contains: email } },
        orderBy: [{ created_at: 'asc' }],
      });
      return result.map(({ password, ...rest }) => rest);
    }
    let result = await this.DatabaseService.account.findMany({
      orderBy: [{ created_at: 'asc' }],
    });
    return result.map(({ password, ...rest }) => rest);
  }

  async updatestatus(id: string, data: any) {
    const result = await this.DatabaseService.account.findUnique({
      where: { id: id },
    });
    if (!result) throw new NotFoundException();
    let object = await this.DatabaseService.account.update({
      where: { id: id },
      data: data,
    });
    delete object.password;
    return object;
  }
}
