import { Controller, Post, Get, Body, Param, Req, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('business')
export class BusinessController {

  constructor(
    private readonly businessService: BusinessService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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
}