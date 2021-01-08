"use strict";
/**
 * ts 接口学习
 * 作用： 在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里，接口起到一种限制和规范作用。接口定义了
 * 某一批类所需遵守的规范，接口不关心这些类的内部数据状态，也不关心这些类里的方法的实现细节，它只规定这批类里必须提供某些方法，提供
 * 这些方法的类就可以满足实际的需要。 ts中的接口类似于java，同时还增加了更加灵活的接口类型，包括属性、函数、可索引和类等。
*/
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
// 1 属性接口  
// ts自定义方法传入参数 对json的约束 单个方法
function printLabel(labelInfo) {
    console.log(labelInfo.label);
}
printLabel({ label: 'zhangsan' }); // 对参数labelInfo 进行约束
function printName(name) {
    // 必须传入对象 firstName secondName
    console.log(name.firstName + name.secondName);
}
function printInfo(name) {
    // 必须传入对象 firstName secondName
    console.log(name.firstName + name.secondName);
}
// printName({firstName:'zhang',secondName:'san'}) //正确 必须传入接口中约定的属性 缺少或者增加都不行
// 将对象定义到外部 对象中包含约定的属性就行 但是对于约定的属性不能缺少
var obj = {
    firstName: 'zhang',
    secondName: 'san',
    age: 20
};
printName(obj); //正确  属性的顺序可以不一样
printInfo(obj);
function printSex(obj) {
    if (obj.girl) {
        console.log(obj.girl);
    }
    else {
        console.log(obj.boy);
    }
}
printSex({ boy: '男' });
function ajax(config) {
    var xhr = new XMLHttpRequest();
    xhr.open(config.type, config.url, true);
    xhr.send(config.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (config.dataType === 'json') {
                console.log(JSON.parse(xhr.responseText));
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
}
ajax({
    type: 'get',
    url: 'http://www.bai.com',
    dataType: 'json'
});
var md5 = function (name, value) {
    return name + "\u7684\u503C\u662F" + value;
};
md5('语文', '95');
// 3 可索引接口 数组和对象的约束 （不常用）
// ts 中定义数组 
var arr1 = [1, 2, 3];
var arr2 = ['1', '2', '3'];
var arr3 = ['1', '2', '3'];
var objn = { name: 'zhangsan', age: 20 };
var Dog = /** @class */ (function () {
    function Dog(name) {
        this.name = name;
    }
    Dog.prototype.eat = function () {
        console.log(this.name + "\u5403\u72D7\u7CAE");
    };
    return Dog;
}());
var dog = new Dog('小黑');
dog.eat();
var Cat = /** @class */ (function () {
    function Cat(name) {
        this.name = name;
    }
    Cat.prototype.eat = function (food) {
        console.log(this.name + "\u5403" + food);
    };
    Cat.prototype.run = function () {
        console.log(this.name + "\u5728\u8FD0\u52A8");
    };
    return Cat;
}());
var cat = new Cat('小花');
cat.eat('猫粮');
cat.run();
var Programmer = /** @class */ (function () {
    function Programmer(name) {
        this.name = name;
    }
    Programmer.prototype.coding = function (code) {
        console.log(this.name + "\u5199" + code);
    };
    return Programmer;
}());
// 实现接口时 不仅要实现Person接口 还要实现Animal接口
var Web = /** @class */ (function (_super) {
    __extends(Web, _super);
    function Web(name) {
        return _super.call(this, name) || this; // 调用父类的构造函数
    }
    Web.prototype.eat = function () {
        console.log(this.name + "\u559C\u6B22\u5403\u9762\u6761");
    };
    Web.prototype.work = function () {
        console.log(this.name + "\u5728\u5DE5\u4F5C");
    };
    return Web;
}(Programmer));
var p = new Web('小王');
p.work();
p.coding('typscript');
/**
 * ts 泛型的学习
 * 泛型： 在软件工程中 我们不仅要创建一致的定义良好的API 同时也要考虑可重用性。  组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型
 * 这在创建大型系统时提供了非常灵活的功能
 *
 * 像C#和java这样的语言中 可以使用泛型来创建可以重用的组件 一个组件可以支持多种类型的数据 这样用户就可以以自己的数据类型来使用组件
 *
 * 通俗来讲 泛型就是解决类 接口 方法的复用性， 以及对不特定数据类型的支持
*/
// 只能返回string类型
// function getData(value:string):string{
//     return value
// }
// 同时返回string 和 number
// function getData(value:any):any{ //实际上是任意类型 放弃了类型检查 传入的参数和返回的参数可以不一致
//     return value
// }
// 要求传入的参数和返回的参数一样
// 定义泛型 T 表示泛型，具体表示什么类型由调用方法的时候决定 （任意大写字母都可以表示泛型 一般用T表示）
// 调用同一个方法 可以传入不特定的数据类型
// 泛型函数
function getData(value) {
    return value;
}
getData(1);
getData('1');
// function getData1<T>(value:T):any{  // 返回任意类型
//     return '111'
// }
// getData1<number>(1)
// getData1<string>('1')
// 泛型类
// 比如有个最小对算法 需要同时支持返回数字和字符串两种类型
/*class MinNumber {   // 只能传入数字类型
    public list:number[]
    constructor(list:number[]) {
        this.list = list
    }
    min():number{
        let minNum = this.list[0]
        for(let i = 0; i< this.list.length; i++) {
            if(minNum > this.list[i]) {
                minNum = this.list[i];
            }
        }
        return minNum
    }
}
const m = new MinNumber([5,6,3,0,7,4,1,5,2])
console.log(m.min())
*/
var MinClass = /** @class */ (function () {
    function MinClass(list) {
        this.list = list;
    }
    MinClass.prototype.min = function () {
        var minNum = this.list[0];
        for (var i = 0; i < this.list.length; i++) {
            if (minNum > this.list[i]) {
                minNum = this.list[i];
            }
        }
        return minNum;
    };
    return MinClass;
}());
var mi = new MinClass([1, 2, 5, 4, 6]); // 实例化类 并且指定T代表的数组元素的类型是number
var mi2 = new MinClass(['f', 'r', 'd', 'b']); // 实例化类 并且指定T代表的数组元素的类型是string   使用对应的ASCII码做对比
console.log(mi.min());
console.log(mi2.min());
// 同一个类 可以传入不同的类型数据
