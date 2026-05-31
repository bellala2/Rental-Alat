import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(username: string, password: string): Promise<{
        message: string;
        access_token: string;
    }>;
    register(data: {
        username: string;
        password: string;
        role?: 'ADMIN' | 'PETUGAS' | 'PEMBELI';
        penyewaId?: number;
    }, currentUserRole?: string): Promise<{
        id: number;
        createdAt: Date;
        penyewaId: number | null;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.user_role;
    }>;
}
