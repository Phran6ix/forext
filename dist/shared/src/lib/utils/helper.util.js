"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const bcrypt_1 = require("bcrypt");
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
//# sourceMappingURL=helper.util.js.map