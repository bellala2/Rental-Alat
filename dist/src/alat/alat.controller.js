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
exports.AlatController = void 0;
const common_1 = require("@nestjs/common");
const alat_service_1 = require("./alat.service");
const create_alat_dto_1 = require("./dto/create-alat.dto");
const update_alat_dto_1 = require("./dto/update-alat.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let AlatController = class AlatController {
    constructor(alatService) {
        this.alatService = alatService;
    }
    create(createAlatDto, file) {
        if (file) {
            createAlatDto.foto_alat = file.filename;
        }
        return this.alatService.create(createAlatDto);
    }
    findAll() {
        return this.alatService.findAll();
    }
    findOne(id) {
        return this.prismaServiceAlat(id);
    }
    update(id, updateAlatDto, file) {
        if (file) {
            updateAlatDto.foto_alat = file.filename;
        }
        return this.alatService.update(+id, updateAlatDto);
    }
    remove(id) {
        return this.alatService.remove(+id);
    }
    prismaServiceAlat(id) {
        return this.alatService.findOne(+id);
    }
};
exports.AlatController = AlatController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.user_role.ADMIN, client_1.user_role.PETUGAS),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('foto_alat', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/alat',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `alat-${uniqueSuffix}${ext}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return callback(new common_1.BadRequestException('Hanya boleh upload file gambar (jpg, jpeg, png)!'), false);
            }
            callback(null, true);
        },
    })),
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                nama_alat: { type: 'string' },
                harga_sewa: { type: 'number' },
                stok: { type: 'number' },
                foto_alat: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Tambah alat gunung baru beserta fotonya' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_alat_dto_1.CreateAlatDto, Object]),
    __metadata("design:returntype", void 0)
], AlatController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Melihat semua katalog alat gunung' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AlatController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Melihat detail satu alat gunung' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlatController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.user_role.ADMIN, client_1.user_role.PETUGAS),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('foto_alat', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/alat',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                callback(null, `alat-${uniqueSuffix}${ext}`);
            },
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return callback(new common_1.BadRequestException('Hanya boleh upload file gambar (jpg, jpeg, png)!'), false);
            }
            callback(null, true);
        },
    })),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                nama_alat: { type: 'string' },
                harga_sewa: { type: 'number' },
                stok: { type: 'number' },
                foto_alat: { type: 'string', format: 'binary' },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_alat_dto_1.UpdateAlatDto, Object]),
    __metadata("design:returntype", void 0)
], AlatController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.user_role.ADMIN, client_1.user_role.PETUGAS),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Menghapus alat gunung dari database' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlatController.prototype, "remove", null);
exports.AlatController = AlatController = __decorate([
    (0, common_1.Controller)('alat'),
    (0, swagger_1.ApiTags)('Alat'),
    (0, swagger_1.ApiBearerAuth)('bearer'),
    __metadata("design:paramtypes", [alat_service_1.AlatService])
], AlatController);
//# sourceMappingURL=alat.controller.js.map