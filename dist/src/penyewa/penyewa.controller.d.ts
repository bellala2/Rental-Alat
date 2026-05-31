import { PenyewaService } from './penyewa.service';
import { CreatePenyewaDto } from './dto/create-penyewa.dto';
import { UpdatePenyewaDto } from './dto/update-penyewa.dto';
export declare class PenyewaController {
    private readonly penyewaService;
    constructor(penyewaService: PenyewaService);
    create(dto: CreatePenyewaDto): Promise<{
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(search?: string): Promise<{
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findOne(id: string): Promise<{
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: string, dto: UpdatePenyewaDto): Promise<{
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: string): Promise<{
        no_hp: string;
        name: string;
        email: string | null;
        alamat: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
