"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeminjamanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PeminjamanService = class PeminjamanService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const penyewa = await this.prisma.penyewa.findUnique({ where: { id: dto.penyewaId } });
        if (!penyewa)
            throw new common_1.NotFoundException('Penyewa tidak ditemukan');
        const alat = await this.prisma.alat.findUnique({ where: { id: dto.alatId } });
        if (!alat)
            throw new common_1.NotFoundException('Alat tidak ditemukan');
        if (alat.stok <= 0) {
            throw new common_1.BadRequestException('Stok alat ini sudah habis/sedang disewa semua!');
        }
        const tglPinjam = new Date();
        const tglKembali = new Date();
        tglKembali.setDate(tglPinjam.getDate() + dto.lama_sewa);
        const totalHarga = Number(alat.harga_sewa) * dto.lama_sewa;
        return this.prisma.$transaction(async (tx) => {
            await tx.alat.update({
                where: { id: dto.alatId },
                data: { stok: alat.stok - 1 },
            });
            return tx.peminjaman.create({
                data: {
                    penyewaId: dto.penyewaId,
                    alatId: dto.alatId,
                    lama_sewa: dto.lama_sewa,
                    total_harga: totalHarga,
                    bukti_pembayaran: dto.bukti_pembayaran,
                    status_bayar: 'MENUNGGU_VERIFIKASI',
                    tanggalPinjam: tglPinjam,
                    tanggalKembali: tglKembali,
                    status: 'MENUNGGU_VERIFIKASI',
                }
            });
        });
    }
    async customerCreate(dto, userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { penyewa: true }
        });
        if (!user || !user.penyewa) {
            throw new common_1.NotFoundException('Profil data penyewa milik user ini tidak ditemukan!');
        }
        const alat = await this.prisma.alat.findUnique({ where: { id: Number(dto.alatId) } });
        if (!alat)
            throw new common_1.NotFoundException('Alat gunung tidak ditemukan!');
        if (alat.stok <= 0) {
            throw new common_1.BadRequestException('Maaf, stok alat ini sedang kosong!');
        }
        const tglPinjam = new Date();
        const tglKembali = new Date();
        tglKembali.setDate(tglPinjam.getDate() + Number(dto.lama_sewa));
        const totalHarga = Number(alat.harga_sewa) * Number(dto.lama_sewa);
        return this.prisma.$transaction(async (tx) => {
            await tx.alat.update({
                where: { id: Number(dto.alatId) },
                data: { stok: alat.stok - 1 },
            });
            return tx.peminjaman.create({
                data: {
                    penyewaId: user.penyewa.id,
                    alatId: Number(dto.alatId),
                    lama_sewa: Number(dto.lama_sewa),
                    total_harga: totalHarga,
                    tanggalPinjam: tglPinjam,
                    tanggalKembali: tglKembali,
                    bukti_pembayaran: dto.bukti_pembayaran,
                    status: 'MENUNGGU_VERIFIKASI',
                    status_bayar: 'MENUNGGU_VERIFIKASI'
                }
            });
        });
    }
    async updateStatus(id, statusBaru) {
        const peminjamanExist = await this.prisma.peminjaman.findUnique({ where: { id } });
        if (!peminjamanExist)
            throw new common_1.NotFoundException('Data transaksi peminjaman tidak ditemukan!');
        let peminjaman_status = peminjamanExist.status;
        if (statusBaru === 'DISETUJUI') {
            peminjaman_status = 'DISEWA';
        }
        else if (statusBaru === 'DITOLAK') {
            peminjaman_status = 'MENUNGGU_VERIFIKASI';
        }
        return await this.prisma.peminjaman.update({
            where: { id: id },
            data: {
                status_bayar: statusBaru,
                status: peminjaman_status
            }
        });
    }
    async findAll(tanggal) {
        const where = {};
        if (tanggal && tanggal.trim() !== '') {
            const startDate = new Date(tanggal);
            const endDate = new Date(tanggal);
            endDate.setDate(endDate.getDate() + 1);
            where.tanggalPinjam = {
                gte: startDate,
                lt: endDate,
            };
        }
        return this.prisma.peminjaman.findMany({
            where,
            include: {
                penyewa: true,
                alat: true,
            },
            orderBy: { id: 'asc' },
        });
    }
    async findOne(id) {
        const data = await this.prisma.peminjaman.findUnique({
            where: { id },
            include: { penyewa: true, alat: true },
        });
        if (!data)
            throw new common_1.NotFoundException('Data peminjaman tidak ditemukan');
        return data;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.peminjaman.update({
            where: { id },
            data: dto,
        });
    }
    async findManyByUser(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        return this.prisma.peminjaman.findMany({
            where: {
                penyewaId: user?.penyewaId || 0,
            },
            include: {
                alat: true,
            },
        });
    }
};
exports.PeminjamanService = PeminjamanService;
exports.PeminjamanService = PeminjamanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PeminjamanService);
//# sourceMappingURL=peminjaman.service.js.map