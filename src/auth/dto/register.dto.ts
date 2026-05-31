import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'bella_putri' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiPropertyOptional({ enum: ['ADMIN', 'PETUGAS', 'PEMBELI'], example: 'PEMBELI' })
    @IsOptional()
    @IsEnum(['ADMIN', 'PETUGAS', 'PEMBELI'])
    role?: 'ADMIN' | 'PETUGAS' | 'PEMBELI';

}