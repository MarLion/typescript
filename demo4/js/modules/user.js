"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maq = exports.UserDb = void 0;
var db_1 = require("./db");
// 操作用户表
var UserDb = /** @class */ (function () {
    function UserDb(param) {
        this.username = param.username;
        this.password = param.password;
    }
    return UserDb;
}());
exports.UserDb = UserDb;
var Maq = new db_1.Mysql();
exports.Maq = Maq;
