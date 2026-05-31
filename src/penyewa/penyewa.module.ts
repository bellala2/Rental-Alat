import { Module } from '@nestjs/common';
import {PenyewaService} from './penyewa.service';
import {PenyewaController} from './penyewa.controller';

@Module({ 
  controllers: [PenyewaController],
  providers: [PenyewaService],
})
export class PenyewaModule {}