import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { AlatService } from './alat.service';
import { CreateAlatDto } from './dto/create-alat.dto';
import { UpdateAlatDto } from './dto/update-alat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { user_role } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiConsumes } from '@nestjs/swagger';
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
      { folder: 'rental_alat' }, // Nama folder di Cloudinary kamu nanti
      (error: any, result: any) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
  });
};

@Controller('alat')
@ApiTags('Alat')
@ApiBearerAuth('bearer')
export class AlatController {
  constructor(private readonly alatService: AlatService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @UseInterceptors(FileInterceptor('foto_alat')) // 🌟 Tanpa diskStorage lokal, langsung tangkap di memory
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nama_alat: { type: 'string' },
        harga_sewa: { type: 'number' },
        stok: { type: 'number' },
        foto_alat: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiOperation({ summary: 'Tambah alat gunung baru beserta fotonya' })
  async create(@Body() createAlatDto: CreateAlatDto, @UploadedFile() file: any) {
    if (file) {
      // 🌟 Upload ke Cloudinary dan ambil URL-nya
      const cloudinaryResult = await uploadToCloudinary(file);
      createAlatDto.foto_alat = cloudinaryResult.secure_url; // Menyimpan link URL utuh (https://...)
    }
    return this.alatService.create(createAlatDto);
  }

  @Get()
  @ApiOperation({ summary: 'Melihat semua katalog alat gunung' })
  findAll() {
    return this.alatService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Melihat detail satu alat gunung' })
  findOne(@Param('id') id: string) {
    return this.alatService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @UseInterceptors(FileInterceptor('foto_alat'))
  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nama_alat: { type: 'string' },
        harga_sewa: { type: 'number' },
        stok: { type: 'number' },
        foto_alat: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiOperation({ summary: 'Mengedit data alat gunung beserta fotonya' })
  async update(@Param('id') id: string, @Body() updateAlatDto: UpdateAlatDto, @UploadedFile() file: any) {
    if (file) {
      // 🌟 Upload ke Cloudinary dan ambil URL-nya
      const cloudinaryResult = await uploadToCloudinary(file);
      updateAlatDto.foto_alat = cloudinaryResult.secure_url; // Menyimpan link URL utuh (https://...)
    }
    return this.alatService.update(+id, updateAlatDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus alat gunung dari database' })
  remove(@Param('id') id: string) {
    return this.alatService.remove(+id);
  }
}