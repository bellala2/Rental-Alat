import { Controller, Get, Post, Body, Param, Put, Query, UseGuards, Req } from '@nestjs/common';
import { PeminjamanService } from './peminjaman.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { user_role, peminjaman_status } from '@prisma/client'; 
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { UpdatePembayaranStatusDto } from './dto/updata-pembayarans-status-dto';

@ApiTags('Peminjaman')
@Controller('peminjaman')
export class PeminjamanController {
  constructor(private readonly service: PeminjamanService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Post()
  @ApiOperation({ summary: 'Tambah peminjaman baru (ADMIN & PETUGAS)' })
  create(@Body() dto: CreatePeminjamanDto) {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) 
  @Post('customer')
  @ApiOperation({ summary: 'Customer mengajukan sewa mandiri + kirim link bukti bayar' })
  customerCreate(@Body() dto: any, @Req() req: any) {
    const userId = Number(req.user.id);
    return this.service.customerCreate(dto, userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Get()
  @ApiOperation({ summary: 'Lihat semua data peminjaman atau filter per tanggal' })
  @ApiQuery({ name: 'tanggal', required: false, description: 'Format: YYYY-MM-DD. Kosongkan untuk ambil semua data.' })
  findAll(@Query('tanggal') tanggal?: string) {
    return this.service.findAll(tanggal);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lihat detail peminjaman berdasarkan ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('me')
  @ApiOperation({ summary: 'Melihat semua riwayat peminjaman pembeli sendiri' })
  findMyPeminjaman(@Req() req: any) {
    return this.service.findManyByUser(Number(req.user.id));
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Put(':id')
  @ApiOperation({ summary: 'Update data peminjaman' })
  update(@Param('id') id: string, @Body() dto: UpdatePeminjamanDto) {
    return this.service.update(Number(id), dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Put(':id/status')
  @ApiOperation({ summary: 'Admin / Petugas mengubah status verifikasi pembayaran' })
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdatePembayaranStatusDto
  ) {
    return this.service.updateStatus(Number(id), dto.status_bayar); 
  }
}