import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class LoginRequiredGuard implements CanActivate {
  constructor(
    @Inject(DatabaseService) private DatabaseService: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext) {
    let request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) throw new UnauthorizedException('Authorization is required.');

    await jsonwebtoken.verify(
      token,
      process.env.SECRET_KEY,
      async (error, decoded) => {
        if (error || decoded.type !== 'access')
          throw new UnauthorizedException('Invalid access token.');
        const account = await this.DatabaseService.account.findUnique({
          where: { id: decoded.account.id },
        });
        if (!account)
          throw new UnauthorizedException('This account does not exists.');
        if (!account.active)
          throw new UnauthorizedException('This account is not active.');
        request.account = decoded.account;
      },
    );

    return true;
  }
}
