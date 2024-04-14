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
import { TypeService } from './type.service';
import { LoginRequiredGuard } from 'src/utils/guard/login-required.guard';
import { Roles } from 'src/utils/roles.decorator';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Controller('type')
@UseGuards(LoginRequiredGuard)
export class TypeController {
  constructor(private readonly TypeService: TypeService) {}

  @Get()
  list(@Query('semester') semester?: string) {
    return this.TypeService.list(semester);
  }

  @Post()
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  create(@Body(ValidationPipe) data: CreateTypeDto) {
    return this.TypeService.create(data);
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.TypeService.detail(id);
  }

  @Put(':id')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body(ValidationPipe) data: UpdateTypeDto) {
    return this.TypeService.update(id, data);
  }

  @Delete(':id')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  delete(@Param('id') id: string) {
    return this.TypeService.delete(id);
  }
}
