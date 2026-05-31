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
exports.AlatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AlatService = class AlatService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.alat.create({
            data: dto
        });
    }
    async findAll() {
        return this.prisma.alat.findMany({
            orderBy: {
                id: 'asc',
            },
        });
    }
    async findOne(id) {
        const alat = await this.prisma.alat.findUnique({
            where: { id }
        });
        if (!alat) {
            throw new common_1.NotFoundException('Alat tidak ditemukan di database');
        }
        return alat;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.alat.update({
            where: { id },
            data: dto
        });
    }
    async remove(id) {
        await this.findOne(id);
        await this.prisma.alat.delete({
            where: { id }
        });
        return { message: `Alat dengan id ${id} berhasil dihapus` };
    }
};
exports.AlatService = AlatService;
exports.AlatService = AlatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AlatService);
//# sourceMappingURL=alat.service.js.map