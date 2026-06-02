import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterPembeliDto {
  @ApiProperty({ example: 'bela123', description: 'Username untuk login' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'password123', description: 'Password minimal 6 karakter' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Bela Amelia', description: 'Nama lengkap penyewa' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'bela@gmail.com', description: 'Email aktif' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '081234567890', description: 'Nomor HP aktif' })
  @IsNotEmpty()
  @IsString()
  no_hp: string;

  @ApiProperty({ example: 'Jl. Malioboro No. 4', description: 'Alamat rumah' })
  @IsNotEmpty()
  @IsString()
  alamat: string;
}