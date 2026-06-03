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
exports.PeminjamanController = void 0;
const common_1 = require("@nestjs/common");
const peminjaman_service_1 = require("./peminjaman.service");
const update_peminjaman_dto_1 = require("./dto/update-peminjaman.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const updata_pembayarans_status_dto_1 = require("./dto/updata-pembayarans-status-dto");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_1 = require("cloudinary");
const streamifier = require("streamifier");
cloudinary_1.v2.config({
    cloud_name: 'dxkqfjggn',
    api_key: '744226821154857',
    api_secret: 'MEDraFtAfC7C030URUcpAfmDlco',
});
const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const cld_upload_stream = cloudinary_1.v2.uploader.upload_stream({
            folder: 'rental_bukti_pembayaran',
            resource_type: 'image'
        }, (error, result) => {
            if (result)
                resolve(result);
            else
                reject(error);
        });
        streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
    });
};
let PeminjamanController = class PeminjamanController {
    constructor(service) {
        this.service = service;
    }
    async create(body, file) {
        const penyewaIdNumber = Number(body.penyewaId);
        const alatIdNumber = Number(body.alatId);
        const lamaSewaNumber = Number(body.lama_sewa);
        let urlFoto = null;
        if (file) {
            const cloudinaryResult = await uploadToCloudinary(file);
            urlFoto = cloudinaryResult.secure_url;
        }
        return this.service.create({
            penyewaId: penyewaIdNumber,
            alatId: alatIdNumber,
            lama_sewa: lamaSewaNumber,
            bukti_pembayaran: urlFoto,
        });
    }
    async customerCreate(body, req, file) {
        const userId = Number(req.user.id);
        const alatIdNumber = Number(body.alatId);
        const lamaSewaNumber = Number(body.lama_sewa);
        let urlFoto = null;
        if (file) {
            const cloudinaryResult = await uploadToCloudinary(file);
            urlFoto = cloudinaryResult.secure_url;
        }
        const dtoData = {
            penyewaId: userId,
            alatId: alatIdNumber,
            lama_sewa: lamaSewaNumber,
            bukti_pembayaran: urlFoto,
        };
        return this.service.customerCreate(dtoData, userId);
    }
    findAll(tanggal) {
        return this.service.findAll(tanggal);
    }
    findOne(id) {
        return this.service.findOne(Number(id));
    }
    update(id, dto) {
        return this.service.update(Number(id), dto);
    }
    updateStatus(id, dto) {
        return this.service.updateStatus(Number(id), dto.status_bayar);
    }
};
exports.PeminjamanController = PeminjamanController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.user_role.ADMIN, client_1.user_role.PETUGAS),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tambah peminjaman baru (ADMIN & PETUGAS) + Upload File' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                penyewaId: { type: 'number', description: 'ID customer yang menyewa' },
                alatId: { type: 'number', description: 'ID alat gunung yang disewa' },
                lama_sewa: { type: 'number', description: 'Berapa hari lama sewa' },
                bukti_pembayaran: {
                    type: 'string',
                    format: 'binary',
                    description: 'Upload file bukti bayar dari customer',
                },
            },
            required: ['penyewaId', 'alatId', 'lama_sewa', 'bukti_pembayaran'],
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('bukti_pembayaran', {
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
], PeminjamanController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('customer'),
    (0, swagger_1.ApiOperation)({ summary: 'Customer mengajukan sewa mandiri + upload bukti bayar' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                alatId: { type: 'number', description: 'ID alat gunung yang mau disewa' },
                lama_sewa: { type: 'number', description: 'Berapa hari lama sewa' },
                bukti_pembayaran: {
                    type: 'string',
                    format: 'binary',
                    description: 'Upload file foto bukti transfer pembayaran',
                },
            },
            required: ['alatId', 'lama_sewa', 'bukti_pembayaran'],
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('bukti_pembayaran', {
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return callback(new common_1.BadRequestException('Hanya boleh upload file gambar (jpg/jpeg/png)!'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PeminjamanController.prototype, "customerCreate", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.user_role.ADMIN, client_1.user_role.PETUGAS),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lihat semua data peminjaman atau filter per tanggal' }),
    (0, swagger_1.ApiQuery)({ name: 'tanggal', required: false, description: 'Format: YYYY-MM-DD. Kosongkan untuk ambil semua data.' }),
    __param(0, (0, common_1.Query)('tanggal')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeminjamanController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lihat detail peminjaman berdasarkan ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeminjamanController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.user_role.ADMIN, client_1.user_role.PETUGAS),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update data peminjaman' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_peminjaman_dto_1.UpdatePeminjamanDto]),
    __metadata("design:returntype", void 0)
], PeminjamanController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.user_role.ADMIN, client_1.user_role.PETUGAS),
    (0, common_1.Put)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Admin / Petugas mengubah status verifikasi pembayaran' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updata_pembayarans_status_dto_1.UpdatePembayaranStatusDto]),
    __metadata("design:returntype", void 0)
], PeminjamanController.prototype, "updateStatus", null);
exports.PeminjamanController = PeminjamanController = __decorate([
    (0, swagger_1.ApiTags)('Peminjaman'),
    (0, common_1.Controller)('peminjaman'),
    __metadata("design:paramtypes", [peminjaman_service_1.PeminjamanService])
], PeminjamanController);
//# sourceMappingURL=peminjaman.controller.js.map