import { Injectable, UnauthorizedException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('Username tidak ditemukan');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Password salah');
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

  async registerPembeliMandiri(dto: any) {
    const userExist = await this.prisma.user.findUnique({
        where: { username: dto.username },
    });

    if (userExist) {
        throw new BadRequestException('Username sudah digunakan!');
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
}