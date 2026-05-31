"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const alat_service_1 = require("./alat.service");
describe('AlatService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [alat_service_1.AlatService],
        }).compile();
        service = module.get(alat_service_1.AlatService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=alat.service.spec.js.map