import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAlatDto {
  @IsString()
  @IsNotEmpty()
  nama_alat: string;

  @IsNotEmpty()
  harga_sewa: number; 

  @IsNotEmpty()
  stok: number;

  @IsString()
  @IsOptional() 
  foto_alat?: string;
}