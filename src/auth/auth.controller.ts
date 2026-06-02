import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'; 
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterPembeliDto } from './dto/register-pembeli.dto'; 

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register-pembeli')
    @ApiOperation({ summary: 'Pembeli melakukan pendaftaran mandiri' })
    @ApiBody({ type: RegisterPembeliDto }) 
    registerPembeli(@Body() dto: RegisterPembeliDto) { 
        return this.authService.registerPembeliMandiri(dto);
    }

    @Post('login')
    @ApiOperation({ summary: 'User / Admin melakukan login' })
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto.username, dto.password);
    }
}