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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(username, password) {
        const user = await this.prisma.user.findUnique({
            where: { username },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Username tidak ditemukan');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new common_1.UnauthorizedException('Password salah');
        }
        const payload = {
            sub: user.id,
            id: user.id,
            username: user.username,
            role: user.role,
            penyewaId: user.penyewaId,
        };
        return {
            message: 'Login berhasil',
            access_token: this.jwtService.sign(payload),
        };
    }
    async register(data, currentUserRole) {
        const role = data.role ?? 'PEMBELI';
        if ((role === 'ADMIN' || role === 'PETUGAS') && currentUserRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('Hanya ADMIN yang boleh membuat akun ini');
        }
        if (role === 'PEMBELI' && !data.penyewaId) {
            throw new common_1.BadRequestException('penyewaId wajib diisi untuk role MEMBER');
        }
        const hashed = await bcrypt.hash(data.password, 10);
        return this.prisma.user.create({
            data: {
                username: data.username,
                password: hashed,
                role,
                penyewaId: role === 'PEMBELI' ? data.penyewaId : null,
            },
        });
    }
    async registerPembeliMandiri(dto) {
        const userExist = await this.prisma.user.findUnique({
            where: { username: dto.username },
        });
        if (userExist) {
            throw new common_1.BadRequestException('Username sudah digunakan!');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const penyewaBaru = await this.prisma.penyewa.create({
            data: {
                name: dto.name,
                email: dto.email,
                no_hp: dto.no_hp,
                alamat: dto.alamat,
            },
        });
        const userBaru = await this.prisma.user.create({
            data: {
                username: dto.username,
                password: hashedPassword,
                role: 'PEMBELI',
                penyewaId: penyewaBaru.id,
            },
        });
        return {
            statusCode: 201,
            message: 'Registrasi akun pembeli berhasil!',
            data: userBaru,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map