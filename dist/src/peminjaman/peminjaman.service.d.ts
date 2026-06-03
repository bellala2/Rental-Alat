import { PrismaService } from '../../prisma/prisma.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
import { pembayaran_status } from '@prisma/client';
export declare class PeminjamanService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePeminjamanDto): Promise<{
        id: number;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        total_harga: number;
        bukti_pembayaran: string | null;
        status_bayar: import(".prisma/client").$Enums.pembayaran_status;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
        status: import(".prisma/client").$Enums.peminjaman_status;
    }>;
    customerCreate(dto: any, userId: number): Promise<{
        id: number;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        total_harga: number;
        bukti_pembayaran: string | null;
        status_bayar: import(".prisma/client").$Enums.pembayaran_status;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
        status: import(".prisma/client").$Enums.peminjaman_status;
    }>;
    updateStatus(id: number, statusBaru: pembayaran_status): Promise<{
        id: number;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        total_harga: number;
        bukti_pembayaran: string | null;
        status_bayar: import(".prisma/client").$Enums.pembayaran_status;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
        status: import(".prisma/client").$Enums.peminjaman_status;
    }>;
    findAll(tanggal?: string): Promise<({
        penyewa: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            no_hp: string;
            email: string | null;
            alamat: string;
        };
        alat: {
            id: number;
            nama_alat: string;
            harga_sewa: number;
            stok: number;
            foto_alat: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        total_harga: number;
        bukti_pembayaran: string | null;
        status_bayar: import(".prisma/client").$Enums.pembayaran_status;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
        status: import(".prisma/client").$Enums.peminjaman_status;
    })[]>;
    findOne(id: number): Promise<{
        penyewa: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            no_hp: string;
            email: string | null;
            alamat: string;
        };
        alat: {
            id: number;
            nama_alat: string;
            harga_sewa: number;
            stok: number;
            foto_alat: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        total_harga: number;
        bukti_pembayaran: string | null;
        status_bayar: import(".prisma/client").$Enums.pembayaran_status;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
        status: import(".prisma/client").$Enums.peminjaman_status;
    }>;
    update(id: number, dto: UpdatePeminjamanDto): Promise<{
        id: number;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        total_harga: number;
        bukti_pembayaran: string | null;
        status_bayar: import(".prisma/client").$Enums.pembayaran_status;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
        status: import(".prisma/client").$Enums.peminjaman_status;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
