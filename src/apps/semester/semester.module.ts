import { Module } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { SemesterController } from './semester.controller';
import { DatabaseModule } from 'src/utils/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [SemesterService],
  controllers: [SemesterController],
})
export class SemesterModule {}
