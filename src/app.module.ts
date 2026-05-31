import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PenyewaModule } from './penyewa/penyewa.module';
import { PenyewaController } from './penyewa/penyewa.controller';
import { PenyewaService } from './penyewa/penyewa.service';
import { AlatModule } from './alat/alat.module';
import { PeminjamanModule } from './peminjaman/peminjaman.module';
import { PengembalianModule } from './pengembalian/pengembalian.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, PenyewaModule, AlatModule, PeminjamanModule, PengembalianModule, AuthModule],
  controllers: [PenyewaController],
  providers: [PenyewaService],
})
export class AppModule {}
