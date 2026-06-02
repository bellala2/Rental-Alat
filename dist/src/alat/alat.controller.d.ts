import { AlatService } from './alat.service';
import { CreateAlatDto } from './dto/create-alat.dto';
import { UpdateAlatDto } from './dto/update-alat.dto';
export declare class AlatController {
    private readonly alatService;
    constructor(alatService: AlatService);
    create(createAlatDto: CreateAlatDto, file: any): Promise<{
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
    findOne(id: string): Promise<{
        nama_alat: string;
        harga_sewa: number;
        stok: number;
        foto_alat: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: string, updateAlatDto: UpdateAlatDto, file: any): Promise<{
        nama_alat: string;
        harga_sewa: number;
        stok: number;
        foto_alat: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
