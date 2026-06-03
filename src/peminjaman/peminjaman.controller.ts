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
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

cloudinary.config({
  cloud_name: 'dxkqfjggn',
  api_key: '744226821154857',
  api_secret: 'MEDraFtAfC7C030URUcpAfmDlco',
});

const uploadToCloudinary = (file: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const cld_upload_stream = cloudinary.uploader.upload_stream(
      { 
        folder: 'rental_bukti_pembayaran', 
        resource_type: 'image'
      }, 
      (error: any, result: any) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
  });
};

@ApiTags('Peminjaman')
@Controller('peminjaman')
export class PeminjamanController {
  constructor(private readonly service: PeminjamanService) { }

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
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new BadRequestException('Hanya boleh upload file gambar (jpg/jpeg/png)!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async create(@Body() body: CreatePeminjamanDto, @UploadedFile() file: any) {
    const penyewaIdNumber = Number(body.penyewaId);
    const alatIdNumber = Number(body.alatId);
    const lamaSewaNumber = Number(body.lama_sewa);
    
    let urlFoto = null;

    if (file) {
      const cloudinaryResult = await uploadToCloudinary(file);
      urlFoto = cloudinaryResult.secure_url;
    }

    return this.service.create({
      penyewaId: penyewaIdNumber,
      alatId: alatIdNumber,
      lama_sewa: lamaSewaNumber,
      bukti_pembayaran: urlFoto, 
    });
  }

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
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new BadRequestException('Hanya boleh upload file gambar (jpg/jpeg/png)!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async customerCreate(@Body() body: CreatePeminjamanDto, @Req() req: any, @UploadedFile() file: any) {
    const userId = Number(req.user.id);
    const alatIdNumber = Number(body.alatId);
    const lamaSewaNumber = Number(body.lama_sewa);
    
    let urlFoto = null;

    if (file) {
      const cloudinaryResult = await uploadToCloudinary(file);
      urlFoto = cloudinaryResult.secure_url;
    }

    const dtoData = {
      penyewaId: userId, 
      alatId: alatIdNumber,
      lama_sewa: lamaSewaNumber,
      bukti_pembayaran: urlFoto, 
    };

    return this.service.customerCreate(dtoData, userId);
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

  @Get(':id')
  @ApiOperation({ summary: 'Lihat detail peminjaman berdasarkan ID' })
  findOne(@Param('id') id: string) {
    const idNumber = Number(id);
    
    if (isNaN(idNumber)) {
      throw new BadRequestException('ID yang dimasukkan harus berupa angka valid!');
    }
    
    return this.service.findOne(idNumber);
  }
}