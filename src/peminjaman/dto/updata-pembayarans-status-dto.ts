import { IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { pembayaran_status } from '@prisma/client';

export class UpdatePembayaranStatusDto {
  @ApiProperty({ 
    example: 'DISETUJUI', 
    enum: pembayaran_status, 
    description: 'Pilihan status: MENUNGGU_VERIFIKASI, DISETUJUI, DITOLAK' 
  })
  @IsEnum(pembayaran_status)
  @IsNotEmpty()
  status_bayar: any;
}