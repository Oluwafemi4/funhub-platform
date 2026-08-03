import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    ownerId: string,
    createBusinessDto: CreateBusinessDto,
  ) {
    return this.prisma.business.create({
      data: {
        ...createBusinessDto,
        ownerId,
      },
    });
  }

  async findAll() {
    return this.prisma.business.findMany({
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            profilePhoto: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.business.findUnique({
      where: {
        id,
      },
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            profilePhoto: true,
          },
        },
      },
    });
  }

  async update(
    id: string,
    ownerId: string,
    updateBusinessDto: UpdateBusinessDto,
  ) {
    const business = await this.prisma.business.findUnique({
      where: {
        id,
      },
    });

    if (!business) {
      throw new NotFoundException('Business not found');
    }

    if (business.ownerId !== ownerId) {
      throw new ForbiddenException(
        'You are not allowed to update this business',
      );
    }

    return this.prisma.business.update({
      where: {
        id,
      },
      data: updateBusinessDto,
    });
  }

  async delete(
    id: string,
    ownerId: string,
  ) {
    const business = await this.prisma.business.findUnique({
      where: {
        id,
      },
    });

    console.log('business from DB:', business);
    console.log('Business owner:', business?.ownerId);
    console.log('Logged in user:', ownerId);
    console.log('Business ID:', id);

    if (!business) {
      throw new NotFoundException('Business not found');
    }

    if (business.ownerId !== ownerId) {
      throw new ForbiddenException(
        'You are not allowed to delete this business',
      );
    }

    return this.prisma.business.delete({
      where: {
        id,
      },
    });
  }
}