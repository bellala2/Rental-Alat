import { PengembalianService } from './pengembalian.service';
export declare class PengembalianController {
    private readonly pengembalianService;
    constructor(pengembalianService: PengembalianService);
    create(body: any, file: any): Promise<{
        createdAt: Date;
        id: number;
        tanggalKembali: Date;
        totalDenda: number;
        foto_kembali: string | null;
        peminjamanId: number;
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
        };
    } & {
        createdAt: Date;
        id: number;
        tanggalKembali: Date;
        totalDenda: number;
        foto_kembali: string | null;
        peminjamanId: number;
    })[]>;
    findOne(id: string): Promise<{
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
        };
    } & {
        createdAt: Date;
        id: number;
        tanggalKembali: Date;
        totalDenda: number;
        foto_kembali: string | null;
        peminjamanId: number;
    }>;
}
