import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UploadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async uploadBusinessImage(
    businessId: string,
    ownerId: string,
    file: Buffer,
    type: 'LOGO' | 'COVER' | 'GALLERY',
  ) {
    const business = await this.prisma.business.findUnique({
      where: {
        id: businessId,
      },
    });

    if (!business) {
      throw new NotFoundException('Business not found');
    }

    if (business.ownerId !== ownerId) {
      throw new ForbiddenException(
        'You are not allowed to upload images to this business',
      );
    }

    const result = await this.cloudinaryService.uploadImage(
      file,
      `funhub/businesses/${businessId}`,
    );

    return this.prisma.businessImage.create({
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        type,
        businessId,
      },
    });
  }
}