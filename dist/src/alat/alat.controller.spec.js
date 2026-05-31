"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const alat_controller_1 = require("./alat.controller");
const alat_service_1 = require("./alat.service");
describe('AlatController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [alat_controller_1.AlatController],
            providers: [alat_service_1.AlatService],
        }).compile();
        controller = module.get(alat_controller_1.AlatController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=alat.controller.spec.js.map