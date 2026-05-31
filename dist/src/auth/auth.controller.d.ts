import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        createdAt: Date;
        id: number;
        penyewaId: number | null;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.user_role;
    }>;
    login(dto: LoginDto): Promise<{
        message: string;
        access_token: string;
    }>;
}
