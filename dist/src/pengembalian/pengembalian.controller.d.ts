import { PengembalianService } from './pengembalian.service';
import { CreatePengembalianDto } from './dto/create-pengembalian.dto';
export declare class PengembalianController {
    private readonly pengembalianService;
    constructor(pengembalianService: PengembalianService);
    create(createPengembalianDto: CreatePengembalianDto): Promise<{
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
    findOne(id: string): Promise<{
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
}
