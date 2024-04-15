import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { DatabaseModule } from 'src/utils/database/database.module';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  imports: [DatabaseModule],
})
export class TaskModule {}
