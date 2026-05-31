import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreatePengembalianDto {
  @IsNumber()
  @IsNotEmpty()
  peminjamanId: number; 

  @IsNumber()
  @IsOptional()
  @Min(0)
  totalDenda: number; 
  
}