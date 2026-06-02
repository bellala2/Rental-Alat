import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAlatDto } from './dto/create-alat.dto';
import { UpdateAlatDto } from './dto/update-alat.dto';

@Injectable()
export class AlatService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateAlatDto) {
    return this.prisma.alat.create({
      data: {
        nama_alat: dto.nama_alat,
        harga_sewa: Number(dto.harga_sewa),
        stok: Number(dto.stok),
        foto_alat: dto.foto_alat,
      },
    });
  }

  async findAll() {
    return this.prisma.alat.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const alat = await this.prisma.alat.findUnique({
      where: { id }
    });

    if (!alat) {
      throw new NotFoundException('Alat tidak ditemukan di database');
    }
    return alat;
  }

  async update(id: number, dto: UpdateAlatDto) {
    await this.findOne(id);

    return this.prisma.alat.update({
      where: { id },
      data: {
        nama_alat: dto.nama_alat,
        harga_sewa: dto.harga_sewa ? Number(dto.harga_sewa) : undefined,
        stok: dto.stok ? Number(dto.stok) : undefined,
        foto_alat: dto.foto_alat,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.alat.delete({
      where: { id }
    });
    return { message: `Alat dengan id ${id} berhasil dihapus` };
  }
}