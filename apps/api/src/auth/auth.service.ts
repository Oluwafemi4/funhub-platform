import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

async register(registerUserDto: RegisterUserDto) {
 const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
 
 const existingUser = await this.prisma.user.findUnique({
  where: {
    email: registerUserDto.email,
  },
});

if (existingUser) {
  throw new ConflictException('An account with this email already exists.');
}

 const user = await this.prisma.user.create({
  data: {
    firstName: registerUserDto.firstName,
    lastName: registerUserDto.lastName,
    email: registerUserDto.email,
    passwordHash: hashedPassword,
  },
});

return user;
}
}