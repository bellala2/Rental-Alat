import { IsEnum, IsOptional } from 'class-validator';
import { peminjaman_status } from '@prisma/client';

export class UpdatePeminjamanDto {
    @IsEnum(peminjaman_status)
    @IsOptional()
    status!: peminjaman_status;

    
}

