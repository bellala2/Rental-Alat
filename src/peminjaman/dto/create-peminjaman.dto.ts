import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer'; // 🌟 Tambahkan import ini

export class CreatePeminjamanDto {
  @ApiProperty({ example: 1, description: 'ID dari Penyewa', required: false })
  @IsNumber()
  @IsOptional() 
  @Type(() => Number) 
  penyewaId?: number;

  @ApiProperty({ example: 1, description: 'ID dari Alat yang disewa' })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number) 
  alatId: number;

  @ApiProperty({ example: 2, description: 'Lama sewa dalam hitungan hari' })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  lama_sewa: number;

  @ApiProperty({ example: 'https://link-bukti.com/transfer.jpg', description: 'Link URL bukti pembayaran', required: false })
  @IsString()
  @IsOptional()
  bukti_pembayaran?: string;
}