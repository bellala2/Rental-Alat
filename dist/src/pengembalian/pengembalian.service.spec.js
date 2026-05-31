"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const pengembalian_service_1 = require("./pengembalian.service");
describe('PengembalianService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [pengembalian_service_1.PengembalianService],
        }).compile();
        service = module.get(pengembalian_service_1.PengembalianService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=pengembalian.service.spec.js.map