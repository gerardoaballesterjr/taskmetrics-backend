import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SemesterService } from './semester.service';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { LoginRequiredGuard } from 'src/utils/guard/login-required.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/roles.decorator';

@Controller('semester')
@UseGuards(LoginRequiredGuard)
export class SemesterController {
  constructor(private readonly SemesterService: SemesterService) {}

  @Get()
  list(@Query('name') name?: string) {
    return this.SemesterService.list(name);
  }

  @Post()
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  create(@Body(ValidationPipe) data: CreateSemesterDto) {
    return this.SemesterService.create(data);
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.SemesterService.detail(id);
  }

  @Put(':id')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) data: UpdateSemesterDto,
  ) {
    return this.SemesterService.update(id, data);
  }

  @Delete(':id')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  delete(@Param('id') id: string) {
    return this.SemesterService.delete(id);
  }
}
