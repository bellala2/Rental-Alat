import { Module } from '@nestjs/common';
import { PengembalianService } from './pengembalian.service';
import { PengembalianController } from './pengembalian.controller';

@Module({
  controllers: [PengembalianController],
  providers: [PengembalianService],
})
export class PengembalianModule {}
