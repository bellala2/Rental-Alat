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

  async update(id: number, updateAlatDto: UpdateAlatDto) {
    const alatLama = await this.prisma.alat.findUnique({
      where: { id },
    });

    if (!alatLama) {
      throw new NotFoundException(`Alat dengan ID ${id} tidak ditemukan`);
    }
    return this.prisma.alat.update({
      where: { id },
      data: {
        nama_alat: updateAlatDto.nama_alat,
        harga_sewa: updateAlatDto.harga_sewa ? +updateAlatDto.harga_sewa : undefined,
        stok: updateAlatDto.stok ? +updateAlatDto.stok : undefined,
        
        foto_alat: updateAlatDto.foto_alat !== undefined ? updateAlatDto.foto_alat : alatLama.foto_alat,
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