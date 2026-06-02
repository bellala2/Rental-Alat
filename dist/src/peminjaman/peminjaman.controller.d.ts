import { PeminjamanService } from './peminjaman.service';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
import { UpdatePembayaranStatusDto } from './dto/updata-pembayarans-status-dto';
export declare class PeminjamanController {
    private readonly service;
    constructor(service: PeminjamanService);
    create(body: any, file: any): Promise<{
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
    customerCreate(body: any, req: any, file: any): Promise<{
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
    update(id: string, dto: UpdatePeminjamanDto): Promise<{
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
    updateStatus(id: string, dto: UpdatePembayaranStatusDto): Promise<{
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
