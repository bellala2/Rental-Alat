import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePeminjamanDto {
  @ApiProperty({ example: 1, description: 'ID dari Penyewa' })
  @IsNumber()
  @IsNotEmpty()
  penyewaId: number;

  @ApiProperty({ example: 1, description: 'ID dari Alat yang disewa' })
  @IsNumber()
  @IsNotEmpty()
  alatId: number;

  @ApiProperty({ example: 2, description: 'Lama sewa dalam hitungan hari' })
  @IsNumber()
  @IsNotEmpty()
  lama_sewa: number;
}