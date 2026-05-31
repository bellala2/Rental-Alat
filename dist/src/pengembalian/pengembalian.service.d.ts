import { PrismaService } from '../../prisma/prisma.service';
import { CreatePengembalianDto } from './dto/create-pengembalian.dto';
import { UpdatePengembalianDto } from './dto/update-pengembalian.dto';
export declare class PengembalianService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePengembalianDto): Promise<{
        id: number;
        peminjamanId: number;
        tanggalKembali: Date;
        totalDenda: number;
        createdAt: Date;
    }>;
    findAll(): Promise<({
        peminjaman: {
            penyewa: {
                name: string;
                id: number;
                createdAt: Date;
                no_hp: string;
                email: string | null;
                alamat: string;
                updatedAt: Date;
            };
            alat: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                nama_alat: string;
                harga_sewa: number;
                stok: number;
            };
        } & {
            id: number;
            tanggalKembali: Date | null;
            penyewaId: number;
            alatId: number;
            lama_sewa: number;
            total_harga: number;
            tanggalPinjam: Date;
            status: import(".prisma/client").$Enums.peminjaman_status;
        };
    } & {
        id: number;
        peminjamanId: number;
        tanggalKembali: Date;
        totalDenda: number;
        createdAt: Date;
    })[]>;
    findOne(id: number): Promise<{
        peminjaman: {
            penyewa: {
                name: string;
                id: number;
                createdAt: Date;
                no_hp: string;
                email: string | null;
                alamat: string;
                updatedAt: Date;
            };
            alat: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                nama_alat: string;
                harga_sewa: number;
                stok: number;
            };
        } & {
            id: number;
            tanggalKembali: Date | null;
            penyewaId: number;
            alatId: number;
            lama_sewa: number;
            total_harga: number;
            tanggalPinjam: Date;
            status: import(".prisma/client").$Enums.peminjaman_status;
        };
    } & {
        id: number;
        peminjamanId: number;
        tanggalKembali: Date;
        totalDenda: number;
        createdAt: Date;
    }>;
    update(id: number, dto: UpdatePengembalianDto): Promise<{
        id: number;
        peminjamanId: number;
        tanggalKembali: Date;
        totalDenda: number;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        peminjamanId: number;
        tanggalKembali: Date;
        totalDenda: number;
        createdAt: Date;
    }>;
}
