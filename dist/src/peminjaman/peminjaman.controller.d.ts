import { PeminjamanService } from './peminjaman.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
export declare class PeminjamanController {
    private readonly service;
    constructor(service: PeminjamanService);
    create(dto: CreatePeminjamanDto): Promise<{
        id: number;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        total_harga: number;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
        status: import(".prisma/client").$Enums.peminjaman_status;
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
        total_harga: number;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
        status: import(".prisma/client").$Enums.peminjaman_status;
    })[]>;
    findOne(id: string): Promise<{
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
        total_harga: number;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
        status: import(".prisma/client").$Enums.peminjaman_status;
    }>;
    findMyPeminjaman(req: any): Promise<({
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
        total_harga: number;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
        status: import(".prisma/client").$Enums.peminjaman_status;
    })[]>;
    update(id: string, dto: UpdatePeminjamanDto): Promise<{
        id: number;
        penyewaId: number;
        alatId: number;
        lama_sewa: number;
        total_harga: number;
        tanggalPinjam: Date;
        tanggalKembali: Date | null;
        status: import(".prisma/client").$Enums.peminjaman_status;
    }>;
}
