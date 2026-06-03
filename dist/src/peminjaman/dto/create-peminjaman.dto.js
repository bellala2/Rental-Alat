"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePeminjamanDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreatePeminjamanDto {
}
exports.CreatePeminjamanDto = CreatePeminjamanDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID dari Penyewa', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreatePeminjamanDto.prototype, "penyewaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID dari Alat yang disewa' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreatePeminjamanDto.prototype, "alatId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Lama sewa dalam hitungan hari' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreatePeminjamanDto.prototype, "lama_sewa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://link-bukti.com/transfer.jpg', description: 'Link URL bukti pembayaran', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePeminjamanDto.prototype, "bukti_pembayaran", void 0);
//# sourceMappingURL=create-peminjaman.dto.js.map