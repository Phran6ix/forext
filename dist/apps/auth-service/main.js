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
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_service_1 = __webpack_require__(5);
const auth_controller_1 = __webpack_require__(7);
const microservices_1 = __webpack_require__(6);
const path_1 = __webpack_require__(10);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: "USER_PACKAGE",
                    transport: microservices_1.Transport.GRPC,
                    options: {
                        package: "user",
                        protoPath: (0, path_1.join)(__dirname + "../../../../proto/user/user.proto")
                    }
                }
            ])
        ],
        providers: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController]
    })
], AuthModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(6);
let AuthService = class AuthService {
    constructor(userClient) {
        this.userClient = userClient;
    }
    onModuleInit() {
        this.userService = this.userClient.getService("UserService");
    }
    async UserSignUp(data) {
        return this.userService.CreateUser({ ...data });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)("USER_PACKAGE")),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientGrpc !== "undefined" && microservices_1.ClientGrpc) === "function" ? _a : Object])
], AuthService);
// export class AuthService {
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//     private jwtService: JwtService,
//     private configService: ConfigService
//   ) { }
//
//   async UserSignUp(payload: CreateUserDTO): Promise<{ user: User }> {
//     const userExist = await this.userRepository.exists({
//       where: { email: payload.email }
//     })
//
//     if (userExist) {
//       throw new HttpException("User with Email already exists", HttpStatus.CONFLICT)
//     }
//
//     const newUser = new User()
//     newUser.email = payload.email
//     newUser.firstname = payload.firstname
//     newUser.lastname = payload.lastname
//     let password = await Helper.HashString(payload.password)
//     newUser.password = password
//     newUser.username = payload.username
//
//     this.userRepository.create(newUser)
//     return { user: newUser }
//   }
//
//   async UserSignIn(payload: UserSignInDTO): Promise<{ user: User, token: string }> {
//     const user = await this.userRepository.findOne({
//       where: {
//         username: payload.username
//       }
//     })
//
//     if (!user) {
//       throw new HttpException("Account with username not found", HttpStatus.NOT_FOUND)
//     }
//
//     const isPasswordCorrect = await Helper.CompareHashedStrings(payload.password, user.password)
//     if (!isPasswordCorrect) {
//       throw new HttpException("Invalid password", HttpStatus.BAD_REQUEST)
//     }
//     console.log("JWT", this.configService.get("JWT_SERVICE"))
//     const token = this.jwtService.sign({ id: user.userId })
//
//     return { user, token }
//   }
//
// }


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_service_1 = __webpack_require__(5);
const auth_validation_1 = __webpack_require__(8);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async UserSignUp(body) {
        const data = await this.authService.UserSignUp(body);
        return { message: "User has been created successfully", data };
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, common_1.Post)("/sign-up"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof auth_validation_1.UserSignUpDTO !== "undefined" && auth_validation_1.UserSignUpDTO) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "UserSignUp", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, common_1.Controller)("auth"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSignUpDTO = void 0;
const tslib_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(9);
class UserSignUpDTO {
}
exports.UserSignUpDTO = UserSignUpDTO;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], UserSignUpDTO.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UserSignUpDTO.prototype, "firstname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UserSignUpDTO.prototype, "lastname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UserSignUpDTO.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UserSignUpDTO.prototype, "username", void 0);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 10 */
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
const auth_module_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(6);
const path_1 = __webpack_require__(10);
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(auth_module_1.AuthModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            package: "auth",
            url: "0.0.0.0:6002",
            protoPath: (0, path_1.join)(__dirname, "../../../proto/auth/auth.proto")
        }
    });
    const globalPrefix = 'api';
    const port = process.env.PORT || 3000;
    await app.listen();
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;