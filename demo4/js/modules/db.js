"use strict";
// export const url = 'xxxxxxx'
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mssql = exports.Mongdb = exports.Mysql = void 0;
// 操作Mysql的类
var Mysql = /** @class */ (function () {
    function Mysql() {
    }
    Mysql.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    Mysql.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    Mysql.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    Mysql.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    return Mysql;
}());
exports.Mysql = Mysql;
// 操作Mongdb的类
var Mongdb = /** @class */ (function () {
    function Mongdb() {
    }
    Mongdb.prototype.add = function (info) {
        throw new Error("Method not implemented.");
    };
    Mongdb.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    Mongdb.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    Mongdb.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    return Mongdb;
}());
exports.Mongdb = Mongdb;
// 操作Mssql的类
var Mssql = /** @class */ (function () {
    function Mssql() {
    }
    Mssql.prototype.add = function (info) {
        throw new Error("Method not implemented.");
    };
    Mssql.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    Mssql.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    Mssql.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    return Mssql;
}());
exports.Mssql = Mssql;
