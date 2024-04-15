import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { LoginRequiredGuard } from 'src/utils/guard/login-required.guard';
import { Roles } from 'src/utils/roles.decorator';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
@UseGuards(LoginRequiredGuard)
export class TaskController {
  constructor(private readonly TaskService: TaskService) {}

  @Get()
  list(@Query('subject') subject: string, @Query('name') name?: string) {
    return this.TaskService.list(subject, name);
  }

  @Post()
  @Roles(['Professor'])
  @UseGuards(RolesGuard)
  create(@Body(ValidationPipe) data: CreateTaskDto) {
    return this.TaskService.create(data);
  }

  @Get(':id')
  @Roles(['Professor'])
  @UseGuards(RolesGuard)
  detail(@Param('id') id: string) {
    return this.TaskService.detail(id);
  }

  @Put(':id')
  @Roles(['Professor'])
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body(ValidationPipe) data: UpdateTaskDto) {
    return this.TaskService.update(id, data);
  }

  @Delete(':id')
  @Roles(['Professor'])
  @UseGuards(RolesGuard)
  delete(@Param('id') id: string) {
    return this.TaskService.delete(id);
  }
}
