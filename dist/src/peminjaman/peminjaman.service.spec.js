"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const peminjaman_service_1 = require("./peminjaman.service");
describe('PeminjamanService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [peminjaman_service_1.PeminjamanService],
        }).compile();
        service = module.get(peminjaman_service_1.PeminjamanService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=peminjaman.service.spec.js.map