import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import {ApiBearerAuth } from '@nestjs/swagger';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Controller('business')
export class BusinessController {

  constructor(
    private readonly businessService: BusinessService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  create(
    @Req() req,
    @Body() createBusinessDto: CreateBusinessDto,
  ) {

    const ownerId = req.user.userId;

    return this.businessService.create(
      ownerId,
      createBusinessDto,
    );
  }

  @Get()
  findAll() {
    return this.businessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(id);
  }
@Patch(':id')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
update(
  @Req() req,
  @Param('id') id: string,
  @Body() updateBusinessDto: UpdateBusinessDto,
) {
 
 console.log('Authenticated user:', req.user);
  return this.businessService.update(
    id,
    req.user.userId,
    updateBusinessDto,
  );
}
}