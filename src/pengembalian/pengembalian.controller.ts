import { Controller, Get, Post, Body, UseGuards, Param, UseInterceptors, UploadedFile, BadRequestException, Put, Delete } from '@nestjs/common';
import { PengembalianService } from './pengembalian.service';
import { CreatePengembalianDto } from './dto/create-pengembalian.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { user_role } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Pengembalian')
@Controller('pengembalian')
export class PengembalianController {
  constructor(private readonly pengembalianService: PengembalianService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Post()
  @ApiOperation({ summary: 'Menambahkan verifikasi pengembalian barang + foto (ADMIN & PETUGAS)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        peminjamanId: { type: 'number', description: 'ID dari transaksi peminjaman' },
        totalDenda: { type: 'number', description: 'Total denda jika ada (opsional)', default: 0 },
        foto_kembali: {
          type: 'string',
          format: 'binary',
          description: 'Foto bukti kondisi alat saat dikembalikan',
        },
      },
      required: ['peminjamanId', 'foto_kembali'],
    },
  })
  @UseInterceptors(
    FileInterceptor('foto_kembali', {
      storage: diskStorage({
        destination: './uploads/pengembalian',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `kembali-${uniqueSuffix}${ext}`);
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
  
  async create(
    @Body() body: any, 
    @UploadedFile() file: any, 
  ) {
    const peminjamanIdNumber = Number(body.peminjamanId);
    const totalDendaNumber = body.totalDenda ? Number(body.totalDenda) : 0;
    const namaFoto = file ? file.filename : null;

    return this.pengembalianService.create({
      peminjamanId: peminjamanIdNumber,
      totalDenda: totalDendaNumber,
      foto_kembali: namaFoto,
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Get()
  @ApiOperation({ summary: 'Melihat semua riwayat pengembalian (ADMIN & PETUGAS)' })
  findAll() {
    return this.pengembalianService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Melihat detail satu data pengembalian' })
  findOne(@Param('id') id: string) {
    return this.pengembalianService.findOne(Number(id));
  }
  
@ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN) 
  @Put(':id')
  @ApiOperation({ summary: 'Admin mengubah data riwayat pengembalian (Formalitas CRUD)' })
  async update(@Param('id') id: string, @Body() body: any) {
    const dataUpdate: any = {};
    
    if (body.peminjamanId) dataUpdate.peminjamanId = Number(body.peminjamanId);
    if (body.totalDenda !== undefined) dataUpdate.totalDenda = Number(body.totalDenda);
    
    return this.pengembalianService.update(Number(id), dataUpdate);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN) 
  @Delete(':id')
  @ApiOperation({ summary: 'Admin menghapus data riwayat pengembalian (Formalitas CRUD)' })
  async remove(@Param('id') id: string) {
    return this.pengembalianService.remove(Number(id));
  }
}