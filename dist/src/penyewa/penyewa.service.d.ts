import { PrismaService } from '../../prisma/prisma.service';
import { CreatePenyewaDto } from './dto/create-penyewa.dto';
import { UpdatePenyewaDto } from './dto/update-penyewa.dto';
export declare class PenyewaService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePenyewaDto): Promise<{
        id: number;
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, dto: UpdatePenyewaDto): Promise<{
        id: number;
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
