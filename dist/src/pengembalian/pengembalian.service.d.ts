import { PrismaService } from '../../prisma/prisma.service';
import { CreatePengembalianDto } from './dto/create-pengembalian.dto';
import { UpdatePengembalianDto } from './dto/update-pengembalian.dto';
export declare class PengembalianService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePengembalianDto & {
        foto_kembali?: string;
    }): Promise<{
        tanggalKembali: Date;
        totalDenda: number;
        foto_kembali: string | null;
        createdAt: Date;
        id: number;
        peminjamanId: number;
    }>;
    findAll(): Promise<({
        peminjaman: {
            penyewa: {
                createdAt: Date;
                id: number;
                name: string;
                no_hp: string;
                email: string | null;
                alamat: string;
                updatedAt: Date;
            };
            alat: {
                createdAt: Date;
                id: number;
                updatedAt: Date;
                nama_alat: string;
                harga_sewa: number;
                stok: number;
            };
        } & {
            tanggalKembali: Date | null;
            id: number;
            penyewaId: number;
            alatId: number;
            lama_sewa: number;
            total_harga: number;
            bukti_pembayaran: string | null;
            status_bayar: import(".prisma/client").$Enums.pembayaran_status;
            tanggalPinjam: Date;
            status: import(".prisma/client").$Enums.peminjaman_status;
        };
    } & {
        tanggalKembali: Date;
        totalDenda: number;
        foto_kembali: string | null;
        createdAt: Date;
        id: number;
        peminjamanId: number;
    })[]>;
    findOne(id: number): Promise<{
        peminjaman: {
            penyewa: {
                createdAt: Date;
                id: number;
                name: string;
                no_hp: string;
                email: string | null;
                alamat: string;
                updatedAt: Date;
            };
            alat: {
                createdAt: Date;
                id: number;
                updatedAt: Date;
                nama_alat: string;
                harga_sewa: number;
                stok: number;
            };
        } & {
            tanggalKembali: Date | null;
            id: number;
            penyewaId: number;
            alatId: number;
            lama_sewa: number;
            total_harga: number;
            bukti_pembayaran: string | null;
            status_bayar: import(".prisma/client").$Enums.pembayaran_status;
            tanggalPinjam: Date;
            status: import(".prisma/client").$Enums.peminjaman_status;
        };
    } & {
        tanggalKembali: Date;
        totalDenda: number;
        foto_kembali: string | null;
        createdAt: Date;
        id: number;
        peminjamanId: number;
    }>;
    update(id: number, dto: UpdatePengembalianDto): Promise<{
        tanggalKembali: Date;
        totalDenda: number;
        foto_kembali: string | null;
        createdAt: Date;
        id: number;
        peminjamanId: number;
    }>;
    remove(id: number): Promise<{
        tanggalKembali: Date;
        totalDenda: number;
        foto_kembali: string | null;
        createdAt: Date;
        id: number;
        peminjamanId: number;
    }>;
}
