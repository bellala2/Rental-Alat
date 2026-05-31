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
exports.PenyewaController = void 0;
const common_1 = require("@nestjs/common");
const penyewa_service_1 = require("./penyewa.service");
const create_penyewa_dto_1 = require("./dto/create-penyewa.dto");
const update_penyewa_dto_1 = require("./dto/update-penyewa.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
let PenyewaController = class PenyewaController {
    constructor(penyewaService) {
        this.penyewaService = penyewaService;
    }
    create(dto) {
        return this.penyewaService.create(dto);
    }
    findAll() {
        return this.penyewaService.findAll();
    }
    findOne(id) {
        return this.penyewaService.findOne(Number(id));
    }
    update(id, dto) {
        return this.penyewaService.update(Number(id), dto);
    }
    remove(id) {
        return this.penyewaService.remove(Number(id));
    }
};
exports.PenyewaController = PenyewaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_penyewa_dto_1.CreatePenyewaDto]),
    __metadata("design:returntype", void 0)
], PenyewaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PenyewaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PenyewaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_penyewa_dto_1.UpdatePenyewaDto]),
    __metadata("design:returntype", void 0)
], PenyewaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PenyewaController.prototype, "remove", null);
exports.PenyewaController = PenyewaController = __decorate([
    (0, swagger_1.ApiTags)('Penyewa'),
    (0, swagger_1.ApiBearerAuth)('bearer'),
    (0, common_1.Controller)('penyewa'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.user_role.ADMIN),
    __metadata("design:paramtypes", [penyewa_service_1.PenyewaService])
], PenyewaController);
//# sourceMappingURL=penyewa.controller.js.map