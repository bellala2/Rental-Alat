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
exports.PengembalianService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PengembalianService = class PengembalianService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const pinjaman = await this.prisma.peminjaman.findUnique({
            where: { id: dto.peminjamanId },
            include: { pengembalian: true }
        });
        if (!pinjaman)
            throw new common_1.NotFoundException('Data peminjaman tidak ditemukan!');
        if (pinjaman.status === 'DIKEMBALIKAN' || pinjaman.pengembalian) {
            throw new common_1.BadRequestException('Alat ini sudah dikembalikan sebelumnya!');
        }
        const tanggalHariIni = new Date();
        const deadlineKembali = new Date(pinjaman.tanggalKembali);
        let totalDenda = 0;
        const TARIF_DENDA = 5000;
        if (tanggalHariIni > deadlineKembali) {
            const selisihWaktu = tanggalHariIni.getTime() - deadlineKembali.getTime();
            const jumlahHariTelat = Math.ceil(selisihWaktu / (1000 * 60 * 60 * 24));
            if (jumlahHariTelat > 0) {
                totalDenda = jumlahHariTelat * TARIF_DENDA;
            }
        }
        return this.prisma.$transaction(async (tx) => {
            const alat = await tx.alat.findUnique({ where: { id: pinjaman.alatId } });
            if (!alat)
                throw new common_1.NotFoundException('Data alat tidak ditemukan!');
            await tx.alat.update({
                where: { id: pinjaman.alatId },
                data: { stok: alat.stok + 1 },
            });
            await tx.peminjaman.update({
                where: { id: dto.peminjamanId },
                data: {
                    status: 'DIKEMBALIKAN',
                },
            });
            return tx.pengembalian.create({
                data: {
                    peminjamanId: dto.peminjamanId,
                    totalDenda: totalDenda,
                },
            });
        });
    }
    async findAll() {
        return this.prisma.pengembalian.findMany({
            include: { peminjaman: { include: { alat: true, penyewa: true } } },
        });
    }
    async findOne(id) {
        const data = await this.prisma.pengembalian.findUnique({
            where: { id },
            include: { peminjaman: { include: { alat: true, penyewa: true } } },
        });
        if (!data)
            throw new common_1.NotFoundException(`Data pengembalian dengan ID ${id} tidak ditemukan!`);
        return data;
    }
    async update(id, dto) {
        const cekPengembalian = await this.prisma.pengembalian.findUnique({
            where: { id },
        });
        if (!cekPengembalian)
            throw new common_1.NotFoundException('Data pengembalian tidak ditemukan!');
        return this.prisma.pengembalian.update({
            where: { id },
            data: {
                totalDenda: dto.totalDenda !== undefined ? dto.totalDenda : cekPengembalian.totalDenda
            },
        });
    }
    async remove(id) {
        const data = await this.prisma.pengembalian.findUnique({ where: { id } });
        if (!data)
            throw new common_1.NotFoundException('Data tidak ditemukan!');
        return this.prisma.pengembalian.delete({ where: { id } });
    }
};
exports.PengembalianService = PengembalianService;
exports.PengembalianService = PengembalianService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PengembalianService);
//# sourceMappingURL=pengembalian.service.js.map