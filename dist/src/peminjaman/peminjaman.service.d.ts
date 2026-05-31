import { PrismaService } from '../../prisma/prisma.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
export declare class PeminjamanService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePeminjamanDto): Promise<{
        id: number;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        status: import(".prisma/client").$Enums.peminjaman_status;
        total_harga: number;
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
        };
    } & {
        id: number;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        status: import(".prisma/client").$Enums.peminjaman_status;
        total_harga: number;
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
        };
    } & {
        id: number;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        status: import(".prisma/client").$Enums.peminjaman_status;
        total_harga: number;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
    }>;
    update(id: number, dto: UpdatePeminjamanDto): Promise<{
        id: number;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        status: import(".prisma/client").$Enums.peminjaman_status;
        total_harga: number;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
    }>;
}
