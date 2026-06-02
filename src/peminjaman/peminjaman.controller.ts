import { Controller, Get, Post, Body, Param, Put, Query, UseGuards, Req, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { PeminjamanService } from './peminjaman.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { user_role } from '@prisma/client'; 
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UpdatePembayaranStatusDto } from './dto/updata-pembayarans-status-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Peminjaman')
@Controller('peminjaman')
export class PeminjamanController {
  constructor(private readonly service: PeminjamanService) { }

  // 🌟 1. RUTE POST UNTUK ADMIN/PETUGAS INPUT MANUAL DI KASIR
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Post()
  @ApiOperation({ summary: 'Tambah peminjaman baru (ADMIN & PETUGAS) + Upload File' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        penyewaId: { type: 'number', description: 'ID customer yang menyewa' },
        alatId: { type: 'number', description: 'ID alat gunung yang disewa' },
        lama_sewa: { type: 'number', description: 'Berapa hari lama sewa' },
        bukti_pembayaran: {
          type: 'string',
          format: 'binary',
          description: 'Upload file bukti bayar dari customer',
        },
      },
      required: ['penyewaId', 'alatId', 'lama_sewa', 'bukti_pembayaran'],
    },
  })
  @UseInterceptors(
    FileInterceptor('bukti_pembayaran', {
      storage: diskStorage({
        destination: './uploads/pembayaran',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `admin-bayar-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new BadRequestException('Hanya boleh upload file gambar (jpg/jpeg/png)!'), false);
        }
        callback(null, true);
      },
    }),
  )
  create(@Body() body: any, @UploadedFile() file: any) {
    // Konversi paksa string form-data jadi number agar aman
    const penyewaIdNumber = Number(body.penyewaId);
    const alatIdNumber = Number(body.alatId);
    const lamaSewaNumber = Number(body.lama_sewa);
    const namaFoto = file ? file.filename : null;

    return this.service.create({
      penyewaId: penyewaIdNumber,
      alatId: alatIdNumber,
      lama_sewa: lamaSewaNumber,
      bukti_pembayaran: namaFoto,
    });
  }

  // 🌟 2. RUTE POST UNTUK CUSTOMER SEWA MANDIRI ONLINE
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard) 
  @Post('customer')
  @ApiOperation({ summary: 'Customer mengajukan sewa mandiri + upload bukti bayar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        alatId: { type: 'number', description: 'ID alat gunung yang mau disewa' },
        lama_sewa: { type: 'number', description: 'Berapa hari lama sewa' },
        bukti_pembayaran: {
          type: 'string',
          format: 'binary',
          description: 'Upload file foto bukti transfer pembayaran',
        },
      },
      required: ['alatId', 'lama_sewa', 'bukti_pembayaran'],
    },
  })
  @UseInterceptors(
    FileInterceptor('bukti_pembayaran', {
      storage: diskStorage({
        destination: './uploads/pembayaran',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `cust-bayar-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new BadRequestException('Hanya boleh upload file gambar (jpg/jpeg/png)!'), false);
        }
        callback(null, true);
      },
    }),
  )
  customerCreate(@Body() body: any, @Req() req: any, @UploadedFile() file: any) {
    const userId = Number(req.user.id);
    const alatIdNumber = Number(body.alatId);
    const lamaSewaNumber = Number(body.lama_sewa);
    const namaFoto = file ? file.filename : null;

    // Disusun rapi sesuai data yang dibutuhkan service kelompokmu
    const dtoData = {
      penyewaId: userId, // Otomatis mengunci pakai ID user yang sedang login
      alatId: alatIdNumber,
      lama_sewa: lamaSewaNumber,
      bukti_pembayaran: namaFoto,
    };

    return this.service.customerCreate(dtoData, userId);
  }

  // 3. RUTE GET DAN PUT (TIDAK BERUBAH - SUDAH BENAR)
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