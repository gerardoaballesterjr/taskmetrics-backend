import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/utils/database/database.service';
import { Account } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly DatabaseService: DatabaseService) {}

  async register(data: any) {
    data.password = await bcrypt.hash(data.password, 12);
    let result = await this.DatabaseService.account.create({ data: data });
    delete result.password;
    return result;
  }

  async login(data: any) {
    const account = await this.DatabaseService.account.findUnique({
      where: { email: data.email },
    });
    if (
      !account ||
      (account &&
        !(await bcrypt.compare(data.password, (await account).password)))
    )
      throw new UnauthorizedException('Invalid credentials.');
    return this.createtoken(account);
  }

  async refresh(data: any) {
    return await jsonwebtoken.verify(
      data.token,
      process.env.SECRET_KEY,
      async (error, decoded) => {
        if (error || decoded.type !== 'refresh')
          throw new UnauthorizedException('Invalid refresh token.');
        const account = await this.DatabaseService.account.findUnique({
          where: { id: decoded.account.id },
        });
        return this.createtoken(account);
      },
    );
  }

  async createtoken(account: Account) {
    if (!account)
      throw new UnauthorizedException('This account does not exists.');
    if (!account.active)
      throw new UnauthorizedException('This account is not active.');
    delete account.password;
    return {
      access: await jsonwebtoken.sign(
        { type: 'access', account: account },
        process.env.SECRET_KEY,
        { expiresIn: '30d' },
      ),
      refresh: await jsonwebtoken.sign(
        { type: 'refresh', account: account },
        process.env.SECRET_KEY,
        { expiresIn: '30d' },
      ),
    };
  }
}
