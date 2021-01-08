"use strict";
/** ts 函数学习 */
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
// 函数的定义
// 1 函数声明法
function run() {
    return 'run';
}
// 2 匿名函数法
var fun2 = function () {
    return 1;
};
var fun3 = function () {
    return '123';
};
/* 方法传参 */
function getInfo(name, age) {
    return name + "\u7684\u5E74\u9F84\u662F" + age;
}
getInfo('张三', 20); //传入的参数类型要跟定义的时候一致
// 匿名函数也是一样的
var info2 = function (name, age) {
    return name + "\u7684\u5E74\u9F84\u662F" + age;
};
var infp3 = function (name, age) {
    return name + "\u7684\u5E74\u9F84\u662F" + age;
};
// 没有返回值的函数
function run3() {
    console.log('run');
}
// 可选参数 es5的实参和形参可以不一致 ts中必须一致 若要不传需配置可选参数
function getMes(name, age) {
    if (age) {
        return name + "\u7684\u5E74\u9F84\u662F" + age;
    }
    else {
        return name + "\u7684\u5E74\u9F84\u672A\u77E5";
    }
}
getMes('zhangsan'); //参数后面加?表示该参数可传可不穿 都不会报错  注意 可选参数必须配置到参数的最后面
/*
function getMes(name?:string,age:number):string{ //将name配置成可选参数会报错
    if(age) {
        return `${name}的年龄是${age}`
    } else {
        return `${name}的年龄未知`
    }
}
*/
// 默认参数 es5没法配置默认参数 ts和es6可以
function getMes2(name, age) {
    if (age === void 0) { age = 20; }
    if (age) {
        return name + "\u7684\u5E74\u9F84\u662F" + age;
    }
    else {
        return name + "\u7684\u5E74\u9F84\u672A\u77E5";
    }
}
getMes2('zhangsan'); // 指定了参数的默认值 即使不传也不会报错  这里返回的age为默认的20
// 剩余参数 使用es6的拓展运算符
function sun() {
    var result = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        result[_i] = arguments[_i];
    }
    return result.reduce(function (prve, current) {
        return prve + current;
    });
}
console.log(sun(1, 2, 3, 4, 5));
function sum1(a, b) {
    var result = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        result[_i - 2] = arguments[_i];
    }
    var sum = result.reduce(function (prve, current) {
        return prve + current;
    });
    return a + b + sum;
}
sum1(1, 2, 3, 4, 5); // a等于1 b等于2 剩下的为剩余参数
function getPerson(str) {
    if (typeof str === 'string') {
        return "\u540D\u5B57\u662F" + str;
    }
    else {
        return "\u5E74\u9F84\u662F" + str;
    }
}
function person2(name, age) {
    if (age) {
        return "\u5E74\u9F84\u662F" + age;
    }
    else {
        return "\u540D\u5B57\u662F" + name;
    }
}
// person2('zhangsan') //正确
// person2('zhangsan',20) //正确
// person2('zhangsan'. true) //编译报错 布尔类型在重载中没有定义
/*
  ts 类的学习 定义 继承 修饰符
*/
// 1 定义 和es6相似
var Person = /** @class */ (function () {
    // name:string  可以省略前面的public关键词
    function Person(name) {
        this.name = name; // 构造函数 实例化类的时候触发的方法
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    Person.prototype.setName = function (name) {
        this.name = name;
    };
    Person.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8";
    };
    return Person;
}());
var p = new Person('zhangsan');
console.log(p.getName()); // zhangsan 
p.setName('lisi');
console.log(p.getName()); // lisi
// 2 实现继承 extends super 两个关键字
var Web = /** @class */ (function (_super) {
    __extends(Web, _super);
    function Web(name) {
        return _super.call(this, name) || this; // super 表示调用父类的构造函数
    }
    Web.prototype.webRun = function () {
        return this.name + "\u5728webRun"; // 虽然Web类里没有name属性 但是它继承了父类Person的name属性
    };
    Web.prototype.run = function () {
        return this.name + "\u5728\u8FD0\u52A8-\u5B50\u7C7B";
    };
    return Web;
}(Person)); // 里面可以有自己的属性和方法
var web = new Web('李四');
console.log(web.run()); // 当子类和父类具有同样的方法时 （会调用子类自己的run方法  会先在子类自己中找 没有再去父类中找）
// 3 类的修饰符 ts类里定义属性的时候提供了三种修饰符
/*
  public ： 公有 在类里面 子类里 以及类外面都可以访问
  protected  ： 保护类型  在类里面 子类里可以访问 类外部不能访问
  private  ： 私有 在类里面可以访问 在子类和类外部不能访问

  属性如果不加修饰符 默认是public
*/
var pn = new Person('xiaoming');
pn.name; // 公有属性 在外部可以访问到
// 4 静态方法 静态属性
var Bus = /** @class */ (function () {
    function Bus(name, age) {
        this.age = 20;
        this.name = name; // 
        this.age = age;
    }
    Bus.prototype.run = function () {
        console.log(this.name + "\u5728\u5750\u8F66");
    };
    Bus.work = function () {
        console.log("\u5F00\u8F66");
        // console.log(`${this.age}`) 会报错 undefined
        console.log(this.sex); // 调用静态属性
    };
    Bus.sex = '男'; // 静态属性
    return Bus;
}());
Bus.work();
Bus.sex; // 外部调用静态属性
// 5 多态 ： 父类定义一个方法不去实现 让继承它的子类去实现 每一个子类有不同的表现 （同一个方法有多个状态） 也是继承的一种
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.eat = function () {
        console.log('吃');
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name) {
        return _super.call(this, name) || this;
    }
    Dog.prototype.eat = function () {
        return this.name + "\u5403\u72D7\u7CAE";
    };
    return Dog;
}(Animal));
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        return _super.call(this, name) || this;
    }
    Cat.prototype.eat = function () {
        return this.name + "\u5403\u732B\u7CAE";
    };
    return Cat;
}(Animal));
// 6 抽象类 抽象方法
// 抽象类 是提供其他类继承的基类 不能直接被实例化
// 抽象方法 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现
// 用abstract关键字定义抽象类和抽象方法  abstract抽象方法智能放在抽象类里边
// 抽象类和抽象方法用来定义标准
// 改写Animal的例子 要求他的子类必须包含eat方法
var Animal1 = /** @class */ (function () {
    function Animal1(name) {
        this.name = name;
    }
    return Animal1;
}());
// const a = new Animal1() 不能被实例化 会报错
var Bird = /** @class */ (function (_super) {
    __extends(Bird, _super);
    // 必须要实现父类的抽象方法
    function Bird(name) {
        return _super.call(this, name) || this;
    }
    Bird.prototype.eat = function () {
        console.log(this.name + "\u5403\u866B\u5B50");
    }; // 不是想会报错
    return Bird;
}(Animal1));
var b = new Bird('燕子');
b.eat();
