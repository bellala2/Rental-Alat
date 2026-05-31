import { PrismaService } from '../../prisma/prisma.service';
import { CreatePenyewaDto } from './dto/create-penyewa.dto';
import { UpdatePenyewaDto } from './dto/update-penyewa.dto';
export declare class PenyewaService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePenyewaDto): Promise<{
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, dto: UpdatePenyewaDto): Promise<{
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
