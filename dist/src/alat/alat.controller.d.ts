import { AlatService } from './alat.service';
import { CreateAlatDto } from './dto/create-alat.dto';
import { UpdateAlatDto } from './dto/update-alat.dto';
export declare class AlatController {
    private readonly alatService;
    constructor(alatService: AlatService);
    create(createAlatDto: CreateAlatDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        nama_alat: string;
        harga_sewa: number;
        stok: number;
    }>;
    findAll(): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        nama_alat: string;
        harga_sewa: number;
        stok: number;
    }[]>;
    findOne(id: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        nama_alat: string;
        harga_sewa: number;
        stok: number;
    }>;
    update(id: string, updateAlatDto: UpdateAlatDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        nama_alat: string;
        harga_sewa: number;
        stok: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
