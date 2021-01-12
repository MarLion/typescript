"use strict";
/**
 * ts 模块化学习
 * 模块的概念（官方）：“内部模块”现在称做“命名空间”，“外部模块”则简称为“模块”，模块在其自身的作用域里执行
 * 而不是在全局作用域里执行 这意味着定义在一个模块里的变量 函数 类等等在模块外部是不可见的 除非明确的使用export形式之一
 * 导出它们，如果想使用其他模块导出的变量 函数 类等等必须导入它们 使用import形式之一
 *
 * 自己理解：我们可以把一些公共的功能单独的抽离为一个文件作为一个模块，
 * 模块里面的变量 函数 类等都是私有的，如果我们要在外部访问模块里面的数据（变量 函数 类等）
 * 我们需要通过export暴露它们，然后通过import引入模块
*/
Object.defineProperty(exports, "__esModule", { value: true });
/*
  模块化
*/
// import { getDta } from './modules/db'
// getDta() // 直接在浏览器运行不了 要借助node.js 或者webpack这种构建工具
// import { getDta as get } from './modules/db' // 使用as重新命名
// get()
// 使用默认导出后的引入方式 不需要花括号了
// import getData from './modules/db'
// getData()
// import { Mysql, Mongdb, Mssql } from './modules/db'
// // 操作用户表
// class UserDb { 用户公共类 可继续封装
//     public username:string
//     public password:string
//     constructor(param:{
//         username:string,
//         password:string
//     }) {
//         this.username = param.username
//         this.password = param.password
//     }
// }
// const u = new UserDb({
//     username: 'zhangsan',
//     password: '123456'
// })
// const sq = new Mysql<UserDb>()
// sq.add(u)
var user_1 = require("./modules/user");
var u = new user_1.UserDb({
    username: 'zhangsan',
    password: '123456'
});
user_1.Maq.add(u);
/* 命名空间 */
// 在代码量较大的情况下 为了避免各种变量命名冲突 可将功能相似的变量 函数 接口等放置到命名空间内
// ts的命名空间将代码包裹起来 只对外暴露在外部需要访问的对象 通过export暴露
/**
 * 命名空间 ： 内部模块 主要用于组织代码 避免命名冲突
 * 模块：外部模块的简称，侧重代码的复用，一个模块可以有多个命名空间给
 *
*/
var a_1 = require("./modules/a");
var d = new a_1.A.Dog('小黑');
d.eat();
var g = new a_1.B.Dog('小黄');
g.eat();
