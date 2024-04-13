import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { DatabaseModule } from 'src/utils/database/database.module';

@Module({
  providers: [AccountService],
  controllers: [AccountController],
  imports: [DatabaseModule],
})
export class AccountModule {}
