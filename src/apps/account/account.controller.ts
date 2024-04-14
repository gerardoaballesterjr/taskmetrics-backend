import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { LoginRequiredGuard } from 'src/utils/guard/login-required.guard';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/roles.decorator';
import { UpdateAccountStatusDto } from './dto/update-account-status.dto';

@Controller('account')
@UseGuards(LoginRequiredGuard)
export class AccountController {
  constructor(private readonly AccountService: AccountService) {}

  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  @Get()
  list(@Query('email') email?: string) {
    return this.AccountService.list(email);
  }

  @Put('update-status/:id')
  @Roles(['Admin'])
  @UseGuards(RolesGuard)
  updatestatus(
    @Param('id') id: string,
    @Body(ValidationPipe) data: UpdateAccountStatusDto,
  ) {
    return this.AccountService.updatestatus(id, data);
  }
}
