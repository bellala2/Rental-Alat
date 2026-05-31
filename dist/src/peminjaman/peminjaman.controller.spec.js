"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const peminjaman_controller_1 = require("./peminjaman.controller");
const peminjaman_service_1 = require("./peminjaman.service");
describe('PeminjamanController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [peminjaman_controller_1.PeminjamanController],
            providers: [peminjaman_service_1.PeminjamanService],
        }).compile();
        controller = module.get(peminjaman_controller_1.PeminjamanController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=peminjaman.controller.spec.js.map