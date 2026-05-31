import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';

@Injectable()
export class PeminjamanService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreatePeminjamanDto) {
    const penyewa = await this.prisma.penyewa.findUnique({ where: { id: dto.penyewaId } });
    if (!penyewa) throw new NotFoundException('Penyewa tidak ditemukan');

    const alat = await this.prisma.alat.findUnique({ where: { id: dto.alatId } });
    if (!alat) throw new NotFoundException('Alat tidak ditemukan');

    if (alat.stok <= 0) {
      throw new BadRequestException('Stok alat ini sudah habis/sedang disewa semua!');
    }

    const tglPinjam = new Date();
    const tglKembali = new Date();

    tglKembali.setDate(tglPinjam.getDate() + dto.lama_sewa);

    const totalHarga = Number(alat.harga_sewa) * dto.lama_sewa;

    return this.prisma.$transaction(async (tx) => {
      await tx.alat.update({
        where: { id: dto.alatId },
        data: { stok: alat.stok - 1 },
      });

      return tx.peminjaman.create({
        data: {
          penyewa: {
            connect: { id: dto.penyewaId }
          },
          alat: {
            connect: { id: dto.alatId }
          },
          lama_sewa: dto.lama_sewa,
          total_harga: totalHarga,
          tanggalPinjam: tglPinjam,
          tanggalKembali: tglKembali,
          status: 'DISEWA',
        }
      });
    });
  }

  async findAll(tanggal?: string) {
    const where: any = {};

    if (tanggal && tanggal.trim() !== '') {
      const startDate = new Date(tanggal);
      const endDate = new Date(tanggal);
      endDate.setDate(endDate.getDate() + 1);

      where.tanggalPinjam = {
        gte: startDate,
        lt: endDate,
      };
    }

    return this.prisma.peminjaman.findMany({
      where,
      include: {
        penyewa: true,
        alat: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const data = await this.prisma.peminjaman.findUnique({
      where: { id },
      include: { penyewa: true, alat: true },
    });
    if (!data) throw new NotFoundException('Data peminjaman tidak ditemukan');
    return data;
  }

  async update(id: number, dto: UpdatePeminjamanDto) {
    await this.findOne(id);

    return this.prisma.peminjaman.update({
      where: { id },
      data: dto,
    });
  }
  async findManyByUser(userId: number) {
    return this.prisma.peminjaman.findMany({
      where: {
        penyewaId: userId, 
      },
      include: {
        alat: true, 
      },
    });
  }
}