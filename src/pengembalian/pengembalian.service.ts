import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePengembalianDto } from './dto/create-pengembalian.dto';
import { UpdatePengembalianDto } from './dto/update-pengembalian.dto'; 

@Injectable()
export class PengembalianService {
  constructor(private prisma: PrismaService) {}

  async create(dto: { peminjamanId: number; totalDenda?: number; foto_kembali?: string }) {
    const peminjamanExist = await this.prisma.peminjaman.findUnique({ 
      where: { id: dto.peminjamanId } 
    });
    
    if (!peminjamanExist) {
      throw new NotFoundException('Data peminjaman tidak ditemukan!');
    }
    
    if (peminjamanExist.status === ('DIKEMBALIKAN' as any)) {
      throw new BadRequestException('Alat pada transaksi ini sudah berstatus dikembalikan!');
    }

    return this.prisma.$transaction(async (tx) => {
      const dataPengembalian = await tx.pengembalian.create({
        data: {
          peminjamanId: dto.peminjamanId,
          totalDenda: dto.totalDenda || 0,
          foto_kembali: dto.foto_kembali || null, 
          tanggalKembali: new Date(),
        }
      });

      await tx.alat.update({
        where: { id: peminjamanExist.alatId },
        data: { stok: { increment: 1 } }
      });

      await tx.peminjaman.update({
        where: { id: dto.peminjamanId },
        data: {
          status: 'DIKEMBALIKAN' as any 
        }
      });

      return dataPengembalian;
    });
  }
  
  async findAll() {
    return this.prisma.pengembalian.findMany({
      include: { peminjaman: { include: { alat: true, penyewa: true } } },
    });
  }

  async findOne(id: number) {
    const data = await this.prisma.pengembalian.findUnique({
      where: { id },
      include: { peminjaman: { include: { alat: true, penyewa: true } } },
    });
    if (!data) throw new NotFoundException(`Data pengembalian dengan ID ${id} tidak ditemukan!`);
    return data;
  }

  async update(id: number, dto: UpdatePengembalianDto) {
    const cekPengembalian = await this.prisma.pengembalian.findUnique({
      where: { id },
    });
    if (!cekPengembalian) throw new NotFoundException('Data pengembalian tidak ditemukan!');

    return this.prisma.pengembalian.update({
      where: { id },
      data: {
        totalDenda: dto.totalDenda !== undefined ? dto.totalDenda : cekPengembalian.totalDenda
      },
    });
  }

  async remove(id: number) {
    const data = await this.prisma.pengembalian.findUnique({ where: { id } });
    if (!data) throw new NotFoundException('Data tidak ditemukan!');
    
    return this.prisma.pengembalian.delete({ where: { id } });
  }
}