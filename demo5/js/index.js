"use strict";
/**
 * ts 装饰器学习
 *
 * 装饰器是一种特殊类型的声明 它能够被附加到类声明 属性 方法或者参数上 可以修改类的行为
 *
 * 通俗的讲装饰器就是一个方法 可以注入到类 方法 属性参数上 来扩展类 属性 方法 参数的功能
 *
 * 常见的装饰器有：类装饰器 属性装饰器 方法装饰器 参数装饰器
 *
 * 装饰器的写法：普通装饰器（无法传参） 装饰器工厂（可传参）
 *
 * 装饰器是过去几年中js最大的成就之一 已是ES7的标准特性之一
 *
 *  */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// 1 类装饰器：类装饰器在类声明之前被声明（紧靠着类声明） 类装饰器应用于类构造函数，可以用来监视 修改或者替换类定义 传入一个参数
// 定义装饰器
function logclass(params) {
    // console.log(params) // params就是调用该装饰器的类
    params.prototype.url = 'xxxxxxx'; // 通过装饰器动态扩展的属性 没有去修改类
    params.prototype.run = function () {
        console.log('run');
    };
}
// 使用@来调用装饰器
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.getData = function () {
    };
    HttpClient = __decorate([
        logclass
    ], HttpClient);
    return HttpClient;
}());
var h = new HttpClient();
console.log(h.url);
h.run();
// 装饰器工厂 可传参
function logClass1(params) {
    return function (target) {
        console.log(params);
        target.prototype.say = params;
    };
}
var HttpClient1 = /** @class */ (function () {
    function HttpClient1() {
    }
    HttpClient1.prototype.getData = function () {
    };
    HttpClient1 = __decorate([
        logClass1('hello')
    ], HttpClient1);
    return HttpClient1;
}());
// 类装饰器 重载构造函数
// 装饰器表达式会在运行时当做函数被调用  类的构造函数作为其唯一的参数
// 如果装饰器返回一个值 它会使用提供的构造函数替换类的声明
function logClass2(target) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.url = '222222';
            return _this;
        }
        class_1.prototype.getData = function () {
            console.log('修改后' + this.url);
        };
        return class_1;
    }(target));
}
var HttpClient2 = /** @class */ (function () {
    function HttpClient2() {
        this.url = '1111111';
    }
    HttpClient2.prototype.getData = function () {
        console.log(this.url);
    };
    HttpClient2 = __decorate([
        logClass2
    ], HttpClient2);
    return HttpClient2;
}());
var u2 = new HttpClient2();
u2.getData();
// 2 属性装饰器  属性装饰器表达式会在运行时当做函数被调用 传入2个参数：1.对于静态成员来说是类的构造函数，对于实力成员是类的原型对象  2.成员的名字
// 类装饰器
function logClass3(params) {
    return function (target) {
        console.log(params);
        target.prototype.say = params;
    };
}
// 属性装饰器
function logProperty(params) {
    return function (target, attr) {
        target[attr] = params; // 所以相当于类装饰器的 target.prototype.say = params
    };
}
function logPath(params) {
    return function (target, attr) {
        target[attr] = params;
    };
}
var HttpClient3 = /** @class */ (function () {
    function HttpClient3() {
    }
    /*
    constructor(url:string,path:string){  // 如果在构造函数中给属性赋值 实例化类时传入的参数会覆盖装饰器的值
        this.url = url
        this.path = path
    }
    */
    HttpClient3.prototype.getData = function () {
        console.log(this.url);
        console.log(this.path);
    };
    __decorate([
        logProperty('给url赋值') // 可以看做是给默认值
    ], HttpClient3.prototype, "url", void 0);
    __decorate([
        logPath('给path赋值')
    ], HttpClient3.prototype, "path", void 0);
    HttpClient3 = __decorate([
        logClass1('hello')
    ], HttpClient3);
    return HttpClient3;
}());
var u33 = new HttpClient3();
u33.getData();
// 3.方法装饰器
/*
    它会被应用到方法的属性描述符上 可以用来监视 修改或者替换方法定义

    运行时会传入下列3个参数：
        1.对于静态成员来说是类的构造函数，对于实力成员是类的原型对象
        2.成员的名字
        3.成员的属性描述符
*/
function updateGet(params) {
    return function (target, methodsName, desc) {
        //例子 修改getData方法 将参数类型修改为string
        var origin = desc.value;
        desc.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            args = args.map(function (ele) {
                return String(ele);
            });
            // 这一步是在修改的函数里去应用原方法 达到修改而不是覆盖
            origin.apply(this, args);
            console.log(args);
        };
    };
}
var HttpClient4 = /** @class */ (function () {
    function HttpClient4() {
    }
    HttpClient4.prototype.getData = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log('原来的方法');
    };
    __decorate([
        updateGet('123')
    ], HttpClient4.prototype, "getData", null);
    return HttpClient4;
}());
var u4 = new HttpClient4();
u4.getData(1, 2, '3');
// 4 方法参数装饰器   用的不是特别多
/*
    参数装饰器会在运行时当作函数被调用 为类的原型增加一些元素数据 传入以下3个参数：
    1.对于静态成员来说是类的构造函数，对于实力成员是类的原型对象
    2.方法的名字
    3.参数在函数参数列表中的索引
*/
function logParam(params) {
    return function (target, methodName, paramsIndex) {
        console.log(target);
        console.log(methodName);
        console.log(paramsIndex);
        target.say = params;
    };
}
var HttpClient5 = /** @class */ (function () {
    function HttpClient5() {
    }
    HttpClient5.prototype.getData = function (uuid) {
        console.log(uuid);
    };
    __decorate([
        __param(0, logParam('uuid'))
    ], HttpClient5.prototype, "getData", null);
    return HttpClient5;
}());
var uuid = new HttpClient5();
uuid.getData('123456');
console.log(uuid.say);
/**
 * 装饰器的执行顺序
 *
 * 属性 > 方法 > 方法参数 > 类装饰器
 * 如果有多个同类的装饰器 从后往前执行 先执行后面的
 * */ 
