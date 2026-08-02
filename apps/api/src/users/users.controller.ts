import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('users')
export class UsersController {

  @Get('profile')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
getProfile(@Request() req) {
  return this.usersService.getProfile(req.user.userId);
}

@Patch('profile')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
updateProfile(
  @Request() req,
  @Body() updateUserDto: UpdateUserDto,
) {
  return this.usersService.updateProfile(
    req.user.userId,
    updateUserDto,
  );
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