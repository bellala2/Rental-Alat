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
    registerPembeliMandiri(dto: any): Promise<{
        statusCode: number;
        message: string;
        data: {
            id: number;
            username: string;
            penyewaId: number | null;
            password: string;
            role: import(".prisma/client").$Enums.user_role;
            createdAt: Date;
        };
    }>;
}
