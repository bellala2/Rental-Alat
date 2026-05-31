"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const penyewa_module_1 = require("./penyewa/penyewa.module");
const penyewa_controller_1 = require("./penyewa/penyewa.controller");
const penyewa_service_1 = require("./penyewa/penyewa.service");
const alat_module_1 = require("./alat/alat.module");
const peminjaman_module_1 = require("./peminjaman/peminjaman.module");
const pengembalian_module_1 = require("./pengembalian/pengembalian.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, penyewa_module_1.PenyewaModule, alat_module_1.AlatModule, peminjaman_module_1.PeminjamanModule, pengembalian_module_1.PengembalianModule, auth_module_1.AuthModule],
        controllers: [penyewa_controller_1.PenyewaController],
        providers: [penyewa_service_1.PenyewaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map