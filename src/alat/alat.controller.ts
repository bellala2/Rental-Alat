import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { AlatService } from './alat.service';
import { CreateAlatDto } from './dto/create-alat.dto';
import { UpdateAlatDto } from './dto/update-alat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { user_role } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'; 

@Controller('alat')
@ApiTags('Alat') 
@ApiBearerAuth('bearer')
@Controller('alat')
export class AlatController {
  constructor(private readonly alatService: AlatService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Post()
  create(@Body() createAlatDto: CreateAlatDto) {
    return this.alatService.create(createAlatDto);
  }

  @Get()
  findAll() {
    return this.alatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alatService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlatDto: UpdateAlatDto) {
    return this.alatService.update(+id, updateAlatDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(user_role.ADMIN, user_role.PETUGAS)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alatService.remove(+id);
  }
}
