import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('register')
  register(@Body(ValidationPipe) data: CreateAccountDto) {
    return this.AuthService.register(data);
  }

  @Post('login')
  login(@Body(ValidationPipe) data: LoginDto) {
    return this.AuthService.login(data);
  }

  @Post('refresh')
  refresh(@Body(ValidationPipe) data: RefreshDto) {
    return this.AuthService.refresh(data);
  }
}
