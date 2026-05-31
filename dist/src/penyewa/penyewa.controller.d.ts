import { PenyewaService } from './penyewa.service';
import { CreatePenyewaDto } from './dto/create-penyewa.dto';
import { UpdatePenyewaDto } from './dto/update-penyewa.dto';
export declare class PenyewaController {
    private readonly penyewaService;
    constructor(penyewaService: PenyewaService);
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
    findOne(id: string): Promise<{
        id: number;
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdatePenyewaDto): Promise<{
        id: number;
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
