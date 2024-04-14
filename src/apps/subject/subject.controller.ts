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
import { SubjectService } from './subject.service';
import { LoginRequiredGuard } from 'src/utils/guard/login-required.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/roles.decorator';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subject')
@UseGuards(LoginRequiredGuard)
export class SubjectController {
  constructor(private readonly SubjectService: SubjectService) {}

  @Get()
  @Roles(['Professor'])
  @UseGuards(RolesGuard)
  list(@Query('name') name?: string) {
    return this.SubjectService.list(name);
  }

  @Post()
  @Roles(['Professor'])
  @UseGuards(RolesGuard)
  create(@Body(ValidationPipe) data: CreateSubjectDto) {
    return this.SubjectService.create(data);
  }

  @Get(':id')
  @Roles(['Professor'])
  @UseGuards(RolesGuard)
  detail(@Param('id') id: string) {
    return this.SubjectService.detail(id);
  }

  @Put(':id')
  @Roles(['Professor'])
  @UseGuards(RolesGuard)
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) data: UpdateSubjectDto,
  ) {
    return this.SubjectService.update(id, data);
  }

  @Delete(':id')
  @Roles(['Professor'])
  @UseGuards(RolesGuard)
  delete(@Param('id') id: string) {
    return this.SubjectService.delete(id);
  }
}
