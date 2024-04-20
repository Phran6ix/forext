/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(5);
const entity_1 = __webpack_require__(6);
const jwt_1 = __webpack_require__(9);
const user_service_1 = __webpack_require__(10);
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([entity_1.User]),
            jwt_1.JwtModule.register({
                global: true,
                secret: "SECRET_PLACEHOLDER",
                signOptions: { expiresIn: "15m" }
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: "mongodb",
                host: "localhost",
                port: 27017,
                database: "fx-mrk-user"
            }),
        ],
        providers: [user_service_1.UserService],
        controllers: []
    })
], UserModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(7), exports);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(8);
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
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: Date, default: new Date() }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "createdAt", void 0);
exports.User = User = tslib_1.__decorate([
    (0, typeorm_1.Entity)("User")
], User);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__(4);
const utils_1 = __webpack_require__(11);
const entity_1 = __webpack_require__(6);
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(8);
const microservices_1 = __webpack_require__(14);
const grpc_js_1 = __webpack_require__(15);
const user_interface_1 = __webpack_require__(16);
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async CreateUser(data, metadata, call) {
        const userExist = await this.userRepository.exists({
            where: [{
                    email: data.email,
                }, { username: data.username }]
        });
        if (userExist) {
            throw new common_1.HttpException("User with credentials already exists", common_1.HttpStatus.CONFLICT);
        }
        console.log("TTHE");
        const hashedPassword = await utils_1.Helper.HashString(data.password);
        const user = new entity_1.User();
        user.username = data.username;
        user.firstname = data.firstname;
        user.lastname = data.lastname;
        user.password = hashedPassword;
        user.email = data.email;
        this.userRepository.create(user);
        return;
    }
    async GetUserById(data, metadata, call) {
        const user = await this.userRepository.findOne({
            where: {
                userId: data.userId
            }
        });
        if (!user) {
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async GetUserByEmail(data, metadata, call) {
        const user = await this.userRepository.findOne({
            where: {
                email: data.email
            }
        });
        if (!user) {
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
};
exports.UserService = UserService;
tslib_1.__decorate([
    (0, microservices_1.GrpcMethod)("UserService", "CreateUser"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof user_interface_1.CreateUserPayload !== "undefined" && user_interface_1.CreateUserPayload) === "function" ? _b : Object, typeof (_c = typeof grpc_js_1.Metadata !== "undefined" && grpc_js_1.Metadata) === "function" ? _c : Object, typeof (_d = typeof grpc_js_1.ServerUnaryCall !== "undefined" && grpc_js_1.ServerUnaryCall) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserService.prototype, "CreateUser", null);
tslib_1.__decorate([
    (0, microservices_1.GrpcMethod)("UserService", "GetUserById"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof user_interface_1.GetUserByIdPayload !== "undefined" && user_interface_1.GetUserByIdPayload) === "function" ? _f : Object, typeof (_g = typeof grpc_js_1.Metadata !== "undefined" && grpc_js_1.Metadata) === "function" ? _g : Object, typeof (_h = typeof grpc_js_1.ServerUnaryCall !== "undefined" && grpc_js_1.ServerUnaryCall) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], UserService.prototype, "GetUserById", null);
tslib_1.__decorate([
    (0, microservices_1.GrpcMethod)("UserService", "GetUserByEmail"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof user_interface_1.GetUserByEmailPayload !== "undefined" && user_interface_1.GetUserByEmailPayload) === "function" ? _k : Object, typeof (_l = typeof grpc_js_1.Metadata !== "undefined" && grpc_js_1.Metadata) === "function" ? _l : Object, typeof (_m = typeof grpc_js_1.ServerUnaryCall !== "undefined" && grpc_js_1.ServerUnaryCall) === "function" ? _m : Object]),
    tslib_1.__metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], UserService.prototype, "GetUserByEmail", null);
exports.UserService = UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(entity_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UserService);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(12), exports);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Helper = void 0;
const bcrypt_1 = __webpack_require__(13);
class Helper {
    static async HashString(inputString) {
        const salt = await (0, bcrypt_1.genSalt)();
        const hashedString = (0, bcrypt_1.hash)(inputString, salt);
        return hashedString;
    }
    static async CompareHashedStrings(inputString, hashedString) {
        return await (0, bcrypt_1.compare)(inputString, hashedString);
    }
}
exports.Helper = Helper;


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("@grpc/grpc-js");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const user_module_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(14);
const path_1 = __webpack_require__(17);
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(user_module_1.UserModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            url: "0.0.0.0:6001",
            package: "user",
            protoPath: (0, path_1.join)(__dirname, "../../../proto/user/user.proto")
        }
    });
    await app.listen();
    common_1.Logger.log(`🚀 Application is running on: http://localhost:`);
}
bootstrap();

})();

/******/ })()
;