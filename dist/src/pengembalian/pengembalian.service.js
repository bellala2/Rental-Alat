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
        const peminjamanExist = await this.prisma.peminjaman.findUnique({
            where: { id: dto.peminjamanId }
        });
        if (!peminjamanExist) {
            throw new common_1.NotFoundException('Data peminjaman tidak ditemukan!');
        }
        if (peminjamanExist.status === 'DIKEMBALIKAN') {
            throw new common_1.BadRequestException('Alat pada transaksi ini sudah berstatus dikembalikan!');
        }
        return this.prisma.$transaction(async (tx) => {
            const dataPengembalian = await tx.pengembalian.create({
                data: {
                    peminjamanId: dto.peminjamanId,
                    totalDenda: dto.totalDenda || 0,
                    foto_kembali: dto.foto_kembali || null,
                    tanggalKembali: new Date(),
                }
            });
            await tx.alat.update({
                where: { id: peminjamanExist.alatId },
                data: { stok: { increment: 1 } }
            });
            await tx.peminjaman.update({
                where: { id: dto.peminjamanId },
                data: {
                    status: 'DIKEMBALIKAN'
                }
            });
            return dataPengembalian;
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