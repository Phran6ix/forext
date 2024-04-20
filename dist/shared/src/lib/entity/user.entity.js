"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let User = class User {
};
exports.User = User;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], User.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: String }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: String }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: String, unique: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: String, unique: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: String }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: Date, nullable: true }),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: Date, default: new Date() }),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
exports.User = User = tslib_1.__decorate([
    (0, typeorm_1.Entity)("User")
], User);
//# sourceMappingURL=user.entity.js.map