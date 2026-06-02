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
const create_peminjaman_dto_1 = require("./dto/create-peminjaman.dto");
const update_peminjaman_dto_1 = require("./dto/update-peminjaman.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const updata_pembayarans_status_dto_1 = require("./dto/updata-pembayarans-status-dto");
let PeminjamanController = class PeminjamanController {
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    customerCreate(dto, req) {
        const userId = Number(req.user.id);
        return this.service.customerCreate(dto, userId);
    }
    findAll(tanggal) {
        return this.service.findAll(tanggal);
    }
    findOne(id) {
        return this.service.findOne(Number(id));
    }
    findMyPeminjaman(req) {
        return this.service.findManyByUser(Number(req.user.id));
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
    (0, swagger_1.ApiOperation)({ summary: 'Tambah peminjaman baru (ADMIN & PETUGAS)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_peminjaman_dto_1.CreatePeminjamanDto]),
    __metadata("design:returntype", void 0)
], PeminjamanController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('customer'),
    (0, swagger_1.ApiOperation)({ summary: 'Customer mengajukan sewa mandiri + kirim link bukti bayar' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
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
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Melihat semua riwayat peminjaman pembeli sendiri' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PeminjamanController.prototype, "findMyPeminjaman", null);
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