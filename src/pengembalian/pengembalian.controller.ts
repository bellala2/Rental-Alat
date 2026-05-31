import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PengembalianService } from './pengembalian.service';
import { CreatePengembalianDto } from './dto/create-pengembalian.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { user_role } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('Pengembalian')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('pengembalian')
export class PengembalianController {
  constructor(private readonly pengembalianService: PengembalianService) { }

  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Post()
  @ApiOperation({ summary: 'Proses pengembalian alat baru (ADMIN & PETUGAS)' })
  create(@Body() createPengembalianDto: CreatePengembalianDto) {
    return this.pengembalianService.create(createPengembalianDto);
  }

  @Get()
  findAll() {
    return this.pengembalianService.findAll();
  }
}