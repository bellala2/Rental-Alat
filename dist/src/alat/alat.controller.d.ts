import { AlatService } from './alat.service';
import { CreateAlatDto } from './dto/create-alat.dto';
import { UpdateAlatDto } from './dto/update-alat.dto';
export declare class AlatController {
    private readonly alatService;
    constructor(alatService: AlatService);
    create(createAlatDto: CreateAlatDto): Promise<{
        id: number;
        nama_alat: string;
        harga_sewa: number;
        stok: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        nama_alat: string;
        harga_sewa: number;
        stok: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        nama_alat: string;
        harga_sewa: number;
        stok: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateAlatDto: UpdateAlatDto): Promise<{
        id: number;
        nama_alat: string;
        harga_sewa: number;
        stok: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
