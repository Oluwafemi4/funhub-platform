import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
@Get('profile')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
getProfile() {
  return {
    message: 'This is a protected profile route',
  };
}

constructor(
    private usersService: UsersService,
  ) {}

  @Post('register')
  createUser(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

}