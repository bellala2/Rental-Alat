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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PengembalianController = void 0;
const common_1 = require("@nestjs/common");
const pengembalian_service_1 = require("./pengembalian.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let PengembalianController = class PengembalianController {
    constructor(pengembalianService) {
        this.pengembalianService = pengembalianService;
    }
    async create(body, file) {
        const peminjamanIdNumber = Number(body.peminjamanId);
        const totalDendaNumber = body.totalDenda ? Number(body.totalDenda) : 0;
        const namaFoto = file ? file.filename : null;
        return this.pengembalianService.create({
            peminjamanId: peminjamanIdNumber,
            totalDenda: totalDendaNumber,
            foto_kembali: namaFoto,
        });
    }
    findAll() {
        return this.pengembalianService.findAll();
    }
    findOne(id) {
        return this.pengembalianService.findOne(Number(id));
    }
};
exports.PengembalianController = PengembalianController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.user_role.ADMIN, client_1.user_role.PETUGAS),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Menambahkan verifikasi pengembalian barang + foto (ADMIN & PETUGAS)' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                peminjamanId: { type: 'number', description: 'ID dari transaksi peminjaman' },
                totalDenda: { type: 'number', description: 'Total denda jika ada (opsional)', default: 0 },
                foto_kembali: {
                    type: 'string',
                    format: 'binary',
                    description: 'Foto bukti kondisi alat saat dikembalikan',
                },
            },
            required: ['peminjamanId', 'foto_kembali'],
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('foto_kembali', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/pengembalian',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `kembali-${uniqueSuffix}${ext}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return callback(new common_1.BadRequestException('Hanya boleh upload file gambar (jpg/jpeg/png)!'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PengembalianController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.user_role.ADMIN, client_1.user_role.PETUGAS),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Melihat semua riwayat pengembalian (ADMIN & PETUGAS)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PengembalianController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Melihat detail satu data pengembalian' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PengembalianController.prototype, "findOne", null);
exports.PengembalianController = PengembalianController = __decorate([
    (0, swagger_1.ApiTags)('Pengembalian'),
    (0, common_1.Controller)('pengembalian'),
    __metadata("design:paramtypes", [pengembalian_service_1.PengembalianService])
], PengembalianController);
//# sourceMappingURL=pengembalian.controller.js.map