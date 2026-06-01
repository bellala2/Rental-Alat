import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.user_role;
        createdAt: Date;
        id: number;
        penyewaId: number | null;
    }>;
    registerPembeli(dto: any): Promise<{
        statusCode: number;
        message: string;
        data: {
            username: string;
            password: string;
            role: import(".prisma/client").$Enums.user_role;
            createdAt: Date;
            id: number;
            penyewaId: number | null;
        };
    }>;
    login(dto: LoginDto): Promise<{
        message: string;
        access_token: string;
    }>;
}
