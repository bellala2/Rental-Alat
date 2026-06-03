import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePengembalianDto } from './dto/create-pengembalian.dto';
import { UpdatePengembalianDto } from './dto/update-pengembalian.dto'; 

@Injectable()
export class PengembalianService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePengembalianDto & { foto_kembali?: string }) {
    const peminjamanExist = await this.prisma.peminjaman.findUnique({ 
      where: { id: Number(dto.peminjamanId) } 
    });
    
    if (!peminjamanExist) {
      throw new NotFoundException('Data peminjaman tidak ditemukan!');
    }
    
    if (peminjamanExist.status === ('DIKEMBALIKAN' as any)) {
      throw new BadRequestException('Alat pada transaksi ini sudah berstatus dikembalikan!');
    }

    // ─── 🧮 LOGIKA DENDA (OTOMATIS / MANUAL) ───
    let dendaFinal = dto.totalDenda ? Number(dto.totalDenda) : 0;

    // Jika admin tidak menginput denda (atau diisi 0), sistem hitung otomatis berdasarkan hari telat
    if (dendaFinal === 0) {
      const tanggalSeharusnyaKembali = new Date(peminjamanExist.tanggalKembali);
      const tanggalHariIni = new Date(); 

      tanggalSeharusnyaKembali.setHours(0, 0, 0, 0);
      tanggalHariIni.setHours(0, 0, 0, 0);

      if (tanggalHariIni > tanggalSeharusnyaKembali) {
        const selisihWaktu = tanggalHariIni.getTime() - tanggalSeharusnyaKembali.getTime();
        const selisihHari = Math.ceil(selisihWaktu / (1000 * 3600 * 24)); 

        const TARIF_DENDA_PER_HARI = 10000; // Ubah tarif sesuai kebutuhan kelompokmu
        dendaFinal = selisihHari * TARIF_DENDA_PER_HARI;
      }
    }

    return this.prisma.$transaction(async (tx) => {
      const dataPengembalian = await tx.pengembalian.create({
        data: {
          peminjamanId: Number(dto.peminjamanId),
          totalDenda: dendaFinal, 
          foto_kembali: dto.foto_kembali || null, 
          tanggalKembali: new Date(),
        }
      });

      await tx.alat.update({
        where: { id: peminjamanExist.alatId },
        data: { stok: { increment: 1 } }
      });

      await tx.peminjaman.update({
        where: { id: Number(dto.peminjamanId) },
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

}