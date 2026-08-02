import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateBusinessDto {
  @IsString()
  name!: string;

  @IsString()
  category!: string;

  @IsString()
  description!: string;

  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsPhoneNumber()
  phoneNumber!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  website?: string;
}