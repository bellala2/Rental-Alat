import { PeminjamanService } from './peminjaman.service';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
import { UpdatePembayaranStatusDto } from './dto/updata-pembayarans-status-dto';
export declare class PeminjamanController {
    private readonly service;
    constructor(service: PeminjamanService);
    create(body: any, file: any): Promise<{
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
    customerCreate(body: any, req: any, file: any): Promise<{
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
    findOne(id: string): Promise<{
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
    findMyPeminjaman(req: any): Promise<({
        alat: {
            id: number;
            nama_alat: string;
            harga_sewa: number;
            stok: number;
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
    update(id: string, dto: UpdatePeminjamanDto): Promise<{
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
    updateStatus(id: string, dto: UpdatePembayaranStatusDto): Promise<{
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
}
