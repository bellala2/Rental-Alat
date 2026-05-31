import { Body, Controller, Delete, Get, Post, Put, Param, UseGuards } from '@nestjs/common';
import { PenyewaService } from './penyewa.service';
import { CreatePenyewaDto } from './dto/create-penyewa.dto';
import { UpdatePenyewaDto } from './dto/update-penyewa.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { user_role } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Penyewa')
@ApiBearerAuth('bearer')
@Controller('penyewa') 
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(user_role.ADMIN)
export class PenyewaController {
  constructor(private readonly penyewaService: PenyewaService) {}

  @Post()
  create(@Body() dto: CreatePenyewaDto) {
    return this.penyewaService.create(dto);
  }

  @Get()
  findAll() {
    return this.penyewaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.penyewaService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePenyewaDto) {
    return this.penyewaService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.penyewaService.remove(Number(id));
  }
}

//get by name
//put by name
//delete by name