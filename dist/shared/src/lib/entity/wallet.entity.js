"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Wallet = class Wallet {
};
exports.Wallet = Wallet;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Wallet.prototype, "walletId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false }),
    tslib_1.__metadata("design:type", String)
], Wallet.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: String, default: "NGN" }),
    tslib_1.__metadata("design:type", String)
], Wallet.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", user_entity_1.User)
], Wallet.prototype, "user", void 0);
exports.Wallet = Wallet = tslib_1.__decorate([
    (0, typeorm_1.Entity)("Wallet")
], Wallet);
//# sourceMappingURL=wallet.entity.js.map