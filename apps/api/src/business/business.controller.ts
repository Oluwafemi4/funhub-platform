import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Business')
@Controller('business')
export class BusinessController {
  constructor(
    private readonly businessService: BusinessService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
 @ApiOperation({ summary: 'Create a new business' })
  @ApiResponse({ status: 201, description: 'The business has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
 
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

  @ApiOperation({ summary: 'Get all businesses' })
  @ApiResponse({ status: 200, description: 'Return all businesses.' })

    @Get()
  findAll() {
    return this.businessService.findAll();
  }

  @ApiOperation({ summary: 'Get a business by ID' })
  @ApiResponse({ status: 200, description: 'Return the business with the specified ID.' })
  @ApiResponse({ status: 404, description: 'Business not found.' })
  
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.businessService.findOne(id);
  }

 @ApiOperation({
  summary: 'Update your business',
})
@ApiResponse({
  status: 200,
  description: 'Business updated successfully',
})
@ApiResponse({
  status: 401,
  description: 'Unauthorized',
})
@ApiResponse({
  status: 403,
  description: 'You are not allowed to update this business',
})
@ApiResponse({
  status: 404,
  description: 'Business not found',
})
 
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

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  
  @ApiOperation({ summary: 'Delete a business' })
  @ApiResponse({ status: 200, description: 'Business deleted successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'You are not allowed to delete this business.' })
  @ApiResponse({ status: 404, description: 'Business not found.' })
  delete(
  
    @Req() req,
    @Param('id') id: string,
  ) {
    const ownerId = req.user.userId;

    return this.businessService.delete(
      id,
      ownerId,
    );
  }
}