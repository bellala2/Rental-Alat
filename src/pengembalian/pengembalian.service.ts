import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePengembalianDto } from './dto/create-pengembalian.dto';
import { UpdatePengembalianDto } from './dto/update-pengembalian.dto'; 

@Injectable()
export class PengembalianService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePengembalianDto) {
    const pinjaman = await this.prisma.peminjaman.findUnique({
      where: { id: dto.peminjamanId },
      include: { pengembalian: true }
    });
    if (!pinjaman) throw new NotFoundException('Data peminjaman tidak ditemukan!');
    
    if (pinjaman.status === 'DIKEMBALIKAN' || pinjaman.pengembalian) {
      throw new BadRequestException('Alat ini sudah dikembalikan sebelumnya!');
    }
    const tanggalHariIni = new Date();
    const deadlineKembali = new Date(pinjaman.tanggalKembali);
    let totalDenda = 0;
    const TARIF_DENDA = 5000;

    if (tanggalHariIni > deadlineKembali) {
      const selisihWaktu = tanggalHariIni.getTime() - deadlineKembali.getTime();
      const jumlahHariTelat = Math.ceil(selisihWaktu / (1000 * 60 * 60 * 24));
      
      if (jumlahHariTelat > 0) {
        totalDenda = jumlahHariTelat * TARIF_DENDA;
      }
    }

    return this.prisma.$transaction(async (tx) => {
      const alat = await tx.alat.findUnique({ where: { id: pinjaman.alatId } });
      if (!alat) throw new NotFoundException('Data alat tidak ditemukan!');

      await tx.alat.update({
        where: { id: pinjaman.alatId },
        data: { stok: alat.stok + 1 },
      });

      await tx.peminjaman.update({
        where: { id: dto.peminjamanId },
        data: {
          status: 'DIKEMBALIKAN', 
        },
      });

      return tx.pengembalian.create({
        data: {
          peminjamanId: dto.peminjamanId,
          totalDenda: totalDenda, 
        },
      });
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