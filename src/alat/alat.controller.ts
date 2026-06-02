import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { AlatService } from './alat.service';
import { CreateAlatDto } from './dto/create-alat.dto';
import { UpdateAlatDto } from './dto/update-alat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { user_role } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('alat')
@ApiTags('Alat')
@ApiBearerAuth('bearer')
export class AlatController {
  constructor(private readonly alatService: AlatService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @UseInterceptors(
    FileInterceptor('foto_alat', {
      storage: diskStorage({
        destination: './uploads/alat',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `alat-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new BadRequestException('Hanya boleh upload file gambar (jpg, jpeg, png)!'), false);
        }
        callback(null, true);
      },
    }),
  )
  @Post()
  @ApiOperation({ summary: 'Tambah alat gunung baru beserta fotonya' })
  create(
    @Body() createAlatDto: CreateAlatDto,
    @UploadedFile() file: any // 🌟 Ditambahkan biar rute POST bisa nangkep file gambar
  ) {
    if (file) {
      createAlatDto.foto_alat = file.filename;
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
  @UseInterceptors(
    FileInterceptor('foto_alat', {
      storage: diskStorage({
        destination: './uploads/alat',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `alat-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new BadRequestException('Hanya boleh upload file gambar (jpg, jpeg, png)!'), false);
        }
        callback(null, true);
      },
    }),
  )
  @Put(':id')
  @ApiOperation({ summary: 'Mengubah data / mengupdate foto alat gunung' })
  update(
    @Param('id') id: string,
    @Body() updateAlatDto: UpdateAlatDto,
    @UploadedFile() file: any
  ) {
    console.log('ISI BODY:', updateAlatDto);
    console.log('ISI FILE YANG DIUPLOAD:', file);
    if (file) {
      updateAlatDto.foto_alat = file.filename;
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