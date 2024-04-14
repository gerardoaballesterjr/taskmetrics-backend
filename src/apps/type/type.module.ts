import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { DatabaseModule } from 'src/utils/database/database.module';

@Module({
  providers: [TypeService],
  controllers: [TypeController],
  imports: [DatabaseModule],
})
export class TypeModule {}
