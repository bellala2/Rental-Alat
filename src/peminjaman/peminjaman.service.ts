import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
import { peminjaman_status, pembayaran_status } from '@prisma/client';

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
          penyewaId: dto.penyewaId,
          alatId: dto.alatId,
          lama_sewa: dto.lama_sewa,
          total_harga: totalHarga,
          bukti_pembayaran: dto.bukti_pembayaran,
          status_bayar: 'MENUNGGU_VERIFIKASI',
          tanggalPinjam: tglPinjam,
          tanggalKembali: tglKembali,
          status: 'MENUNGGU_VERIFIKASI' as peminjaman_status,
        }
      });
    });
  }

  async customerCreate(dto: any, userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { penyewa: true }
    });

    if (!user || !user.penyewa) {
      throw new NotFoundException('Profil data penyewa milik user ini tidak ditemukan!');
    }

    const alat = await this.prisma.alat.findUnique({ where: { id: Number(dto.alatId) } });
    if (!alat) throw new NotFoundException('Alat gunung tidak ditemukan!');

    if (alat.stok <= 0) {
      throw new BadRequestException('Maaf, stok alat ini sedang kosong!');
    }

    const tglPinjam = new Date();
    const tglKembali = new Date();
    tglKembali.setDate(tglPinjam.getDate() + Number(dto.lama_sewa));
    const totalHarga = Number(alat.harga_sewa) * Number(dto.lama_sewa);

    return this.prisma.$transaction(async (tx) => {
      await tx.alat.update({
        where: { id: Number(dto.alatId) },
        data: { stok: alat.stok - 1 },
      });

      return tx.peminjaman.create({
        data: {
          penyewaId: user.penyewa.id,
          alatId: Number(dto.alatId),
          lama_sewa: Number(dto.lama_sewa),
          total_harga: totalHarga,
          tanggalPinjam: tglPinjam,
          tanggalKembali: tglKembali,
          bukti_pembayaran: dto.bukti_pembayaran,
          status: 'MENUNGGU_VERIFIKASI' as peminjaman_status ,
          status_bayar: 'MENUNGGU_VERIFIKASI' 
        }
      });
    });
  }

  async updateStatus(id: number, statusBaru: pembayaran_status) { 
    const peminjamanExist = await this.prisma.peminjaman.findUnique({ where: { id } });
    if (!peminjamanExist) throw new NotFoundException('Data transaksi peminjaman tidak ditemukan!');

    let peminjaman_status = peminjamanExist.status as any; 
    
    if (statusBaru === 'DISETUJUI' as pembayaran_status) {
      peminjaman_status = 'DISEWA'; 
    } else if (statusBaru === 'DITOLAK' as pembayaran_status) {
      peminjaman_status = 'MENUNGGU_VERIFIKASI'; 
    }

    return await this.prisma.peminjaman.update({
      where: { id: id },
      data: { 
        status_bayar: statusBaru,
        status: peminjaman_status 
      }
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
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    return this.prisma.peminjaman.findMany({
      where: {
        penyewaId: user?.penyewaId || 0,
      },
      include: {
        alat: true,
      },
    });
  }
}