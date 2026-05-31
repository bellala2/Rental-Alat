import { IsOptional, IsNumber, IsString, Min } from 'class-validator';

export class UpdatePengembalianDto {
  @IsNumber()
  @IsOptional()
  peminjamanId?: number; 

  @IsNumber()
  @IsOptional()
  @Min(0)
  totalDenda?: number; 

  @IsString()
  @IsOptional()
  status?: `DIKEMBALIKAN`

  @IsString()
  @IsOptional()
  tanggalKembali?: Date;
}