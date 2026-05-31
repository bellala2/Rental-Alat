import { PrismaService } from '../../prisma/prisma.service';
import { CreateAlatDto } from './dto/create-alat.dto';
import { UpdateAlatDto } from './dto/update-alat.dto';
export declare class AlatService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateAlatDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama_alat: string;
        harga_sewa: number;
        stok: number;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama_alat: string;
        harga_sewa: number;
        stok: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama_alat: string;
        harga_sewa: number;
        stok: number;
    }>;
    update(id: number, dto: UpdateAlatDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        nama_alat: string;
        harga_sewa: number;
        stok: number;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
