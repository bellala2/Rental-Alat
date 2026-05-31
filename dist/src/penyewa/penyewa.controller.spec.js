"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const penyewa_controller_1 = require("./penyewa.controller");
describe('PenyewaController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [penyewa_controller_1.PenyewaController],
        }).compile();
        controller = module.get(penyewa_controller_1.PenyewaController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=penyewa.controller.spec.js.map