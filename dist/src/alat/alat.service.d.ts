import { PrismaService } from '../../prisma/prisma.service';
import { CreateAlatDto } from './dto/create-alat.dto';
import { UpdateAlatDto } from './dto/update-alat.dto';
export declare class AlatService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateAlatDto): Promise<{
        nama_alat: string;
        harga_sewa: number;
        stok: number;
        foto_alat: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        nama_alat: string;
        harga_sewa: number;
        stok: number;
        foto_alat: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        nama_alat: string;
        harga_sewa: number;
        stok: number;
        foto_alat: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, updateAlatDto: UpdateAlatDto): Promise<{
        nama_alat: string;
        harga_sewa: number;
        stok: number;
        foto_alat: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
