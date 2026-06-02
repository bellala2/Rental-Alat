import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterPembeliDto } from './dto/register-pembeli.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

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