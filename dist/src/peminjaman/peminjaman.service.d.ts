import { PrismaService } from '../../prisma/prisma.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
import { pembayaran_status } from '@prisma/client';
export declare class PeminjamanService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePeminjamanDto): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.peminjaman_status;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        total_harga: number;
        bukti_pembayaran: string | null;
        status_bayar: import(".prisma/client").$Enums.pembayaran_status;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
    }>;
    customerCreate(dto: any, userId: number): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.peminjaman_status;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        total_harga: number;
        bukti_pembayaran: string | null;
        status_bayar: import(".prisma/client").$Enums.pembayaran_status;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
    }>;
    updateStatus(id: number, statusBaru: pembayaran_status): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.peminjaman_status;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        total_harga: number;
        bukti_pembayaran: string | null;
        status_bayar: import(".prisma/client").$Enums.pembayaran_status;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
    }>;
    findAll(tanggal?: string): Promise<({
        penyewa: {
            no_hp: string;
            name: string;
            email: string | null;
            alamat: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
        alat: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            nama_alat: string;
            harga_sewa: number;
            stok: number;
            foto_alat: string | null;
        };
    } & {
        id: number;
        status: import(".prisma/client").$Enums.peminjaman_status;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        total_harga: number;
        bukti_pembayaran: string | null;
        status_bayar: import(".prisma/client").$Enums.pembayaran_status;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
    })[]>;
    findOne(id: number): Promise<{
        penyewa: {
            no_hp: string;
            name: string;
            email: string | null;
            alamat: string;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
        alat: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            nama_alat: string;
            harga_sewa: number;
            stok: number;
            foto_alat: string | null;
        };
    } & {
        id: number;
        status: import(".prisma/client").$Enums.peminjaman_status;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        total_harga: number;
        bukti_pembayaran: string | null;
        status_bayar: import(".prisma/client").$Enums.pembayaran_status;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
    }>;
    update(id: number, dto: UpdatePeminjamanDto): Promise<{
        id: number;
        status: import(".prisma/client").$Enums.peminjaman_status;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        total_harga: number;
        bukti_pembayaran: string | null;
        status_bayar: import(".prisma/client").$Enums.pembayaran_status;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
    }>;
}
