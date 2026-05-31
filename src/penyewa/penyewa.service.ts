import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePenyewaDto } from './dto/create-penyewa.dto';
import { UpdatePenyewaDto } from './dto/update-penyewa.dto';

@Injectable()
export class PenyewaService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePenyewaDto) {
    return this.prisma.penyewa.create({ data: dto });
  }

  async findAll() {
    return this.prisma.penyewa.findMany({ orderBy: { id: 'desc' } });
  }

  async findOne(id: number) {
    const dataPenyewa = await this.prisma.penyewa.findUnique({ where: { id } });
    
    if (!dataPenyewa) throw new NotFoundException('Data penyewa tidak ditemukan');
    
    return dataPenyewa;
  }

  async update(id: number, dto: UpdatePenyewaDto) {
    await this.findOne(id);
    
    return this.prisma.penyewa.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    
    return this.prisma.penyewa.delete({ where: { id } });
  }
}