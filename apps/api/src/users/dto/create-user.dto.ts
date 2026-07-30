import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  firstName !: string;

  @IsString()
  @IsNotEmpty()
  lastName !: string;

  @IsEmail()
  email !: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsString()
  @MinLength(6)
  password !: string;

}