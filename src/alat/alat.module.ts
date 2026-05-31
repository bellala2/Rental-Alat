import { Module } from '@nestjs/common';
import { AlatService } from './alat.service';
import { AlatController } from './alat.controller';
import { PrismaModule} from '../../prisma/prisma.module';
@Module({
  controllers: [AlatController],
  providers: [AlatService],
  imports: [PrismaModule]
})
export class AlatModule {}
