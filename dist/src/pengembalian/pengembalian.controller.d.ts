import { PengembalianService } from './pengembalian.service';
export declare class PengembalianController {
    private readonly pengembalianService;
    constructor(pengembalianService: PengembalianService);
    create(body: any, file: any): Promise<{
        foto_kembali: string | null;
        tanggalKembali: Date;
        totalDenda: number;
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
                foto_alat: string | null;
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
        foto_kembali: string | null;
        tanggalKembali: Date;
        totalDenda: number;
        createdAt: Date;
        id: number;
        peminjamanId: number;
    })[]>;
    findOne(id: string): Promise<{
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
                foto_alat: string | null;
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
        foto_kembali: string | null;
        tanggalKembali: Date;
        totalDenda: number;
        createdAt: Date;
        id: number;
        peminjamanId: number;
    }>;
    update(id: string, body: any): Promise<{
        foto_kembali: string | null;
        tanggalKembali: Date;
        totalDenda: number;
        createdAt: Date;
        id: number;
        peminjamanId: number;
    }>;
    remove(id: string): Promise<{
        foto_kembali: string | null;
        tanggalKembali: Date;
        totalDenda: number;
        createdAt: Date;
        id: number;
        peminjamanId: number;
    }>;
}
