import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Mendaftarkan user baru oleh Admin' })
    register(@Body() dto: RegisterDto) {
        const roleYgLogin = 'ADMIN';
        return this.authService.register(dto, roleYgLogin);
    }

    @Post('register-pembeli')
    @ApiOperation({ summary: 'Pembeli melakukan pendaftaran mandiri' })
    registerPembeli(@Body() dto: any) { 
        return this.authService.registerPembeliMandiri(dto);
    }

    @Post('login')
    @ApiOperation({ summary: 'User / Admin melakukan login' })
    login(@Body() dto: LoginDto) {
        console.log('--- DEBUG LOGIN ---');
        console.log('Isi DTO:', dto);
        console.log('Username:', dto.username);
        return this.authService.login(dto.username, dto.password);
    }
}