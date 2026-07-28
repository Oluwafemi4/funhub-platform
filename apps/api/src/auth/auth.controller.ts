import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  @Post('register')
  register(@Body() registeruserDto: RegisterUserDto) {

  }
}