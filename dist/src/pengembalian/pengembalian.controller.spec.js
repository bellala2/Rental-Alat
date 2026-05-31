"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const pengembalian_controller_1 = require("./pengembalian.controller");
const pengembalian_service_1 = require("./pengembalian.service");
describe('PengembalianController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [pengembalian_controller_1.PengembalianController],
            providers: [pengembalian_service_1.PengembalianService],
        }).compile();
        controller = module.get(pengembalian_controller_1.PengembalianController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=pengembalian.controller.spec.js.map