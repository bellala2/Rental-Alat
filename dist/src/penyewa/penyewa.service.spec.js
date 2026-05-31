"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const penyewa_service_1 = require("./penyewa.service");
describe('PenyewaService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [penyewa_service_1.PenyewaService],
        }).compile();
        service = module.get(penyewa_service_1.PenyewaService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=penyewa.service.spec.js.map