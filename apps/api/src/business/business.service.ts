import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBusinessDto } from './dto/create-business.dto';

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
}
