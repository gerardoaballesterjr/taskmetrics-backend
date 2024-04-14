import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { DatabaseModule } from 'src/utils/database/database.module';

@Module({
  providers: [SubjectService],
  controllers: [SubjectController],
  imports: [DatabaseModule],
})
export class SubjectModule {}
