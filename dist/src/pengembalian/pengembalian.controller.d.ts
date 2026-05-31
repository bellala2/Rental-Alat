import { PengembalianService } from './pengembalian.service';
import { CreatePengembalianDto } from './dto/create-pengembalian.dto';
export declare class PengembalianController {
    private readonly pengembalianService;
    constructor(pengembalianService: PengembalianService);
    create(createPengembalianDto: CreatePengembalianDto): Promise<{
        createdAt: Date;
        id: number;
        tanggalKembali: Date;
        peminjamanId: number;
        totalDenda: number;
    }>;
    findAll(): Promise<({
        peminjaman: {
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
        };
    } & {
        createdAt: Date;
        id: number;
        tanggalKembali: Date;
        peminjamanId: number;
        totalDenda: number;
    })[]>;
}
