import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './utils/database/database.module';
import { AuthModule } from './apps/auth/auth.module';
import { SemesterModule } from './apps/semester/semester.module';
import { AccountModule } from './apps/account/account.module';
import { TypeModule } from './apps/type/type.module';
import { SubjectModule } from './apps/subject/subject.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    SemesterModule,
    AccountModule,
    TypeModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
