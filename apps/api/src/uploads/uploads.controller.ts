import {
  BadRequestException,
  Controller,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UploadsService } from './uploads.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { memoryStorage } from 'multer';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
  ) {}

  @Post('business/:businessId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  @ApiBearerAuth('JWT')
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    name: 'type',
    required: true,
    enum: ['LOGO', 'COVER', 'GALLERY'],
  })
  @ApiOperation({
    summary: 'Upload an image for a business',
  })
  async uploadBusinessImage(
    @Req() req,
    @Param('businessId') businessId: string,
    @Query('type') type: 'LOGO' | 'COVER' | 'GALLERY',
    @UploadedFile() file: { buffer: Buffer },
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    if (!['LOGO', 'COVER', 'GALLERY'].includes(type)) {
      throw new BadRequestException(
        'Invalid image type. Use LOGO, COVER, or GALLERY',
      );
    }

    return this.uploadsService.uploadBusinessImage(
      businessId,
      req.user.userId,
      file.buffer,
      type,
    );
  }
}