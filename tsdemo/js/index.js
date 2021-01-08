"use strict";
/*
 tsc --init 创建tsconfig.json配置文件  终端运行tsc监视任务 自动将ts编译为es5
*/
/* ts中的数据类型 */
// 布尔类型 boolean     true false
var tar = true;
// 数值类型(number)
var a = 1;
// 字符串类型(string)
var str = 'this is ts';
// 数组类型(array)  有两种定义数组的方式
// 第一种
var arr1 = [1, 2, 3]; // 数组元素只能是number类型 其他类型会报错 []前面的类型指定了数组元素的类型
// 第二种
var arr2 = [1, 2, 3]; // <>里指定元素类型
// 元祖类型(tuple) 属于数组的一种 可以指定数组中每个元素的类型
var arr3 = ['1', 1, true];
// 枚举类型(enum) 主要是用来定义标识符
var Flag;
(function (Flag) {
    Flag[Flag["nopay"] = 1] = "nopay";
    Flag[Flag["paying"] = 2] = "paying";
    Flag[Flag["paied"] = 3] = "paied";
})(Flag || (Flag = {})); // 先定义一个枚举类型 1 未支付 2 支付中 3 已支付
var f = Flag.nopay; //定义了各个值得含义
console.log(f); // 输出1
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["bule"] = 1] = "bule";
    Color[Color["orage"] = 2] = "orage";
})(Color || (Color = {}));
var c = Color.red;
console.log(c); //输出为0 没有指定值的话 默认输出索引值
var Exc;
(function (Exc) {
    Exc[Exc["red"] = 0] = "red";
    Exc[Exc["bule"] = 1] = "bule";
    Exc[Exc["orage"] = 2] = "orage";
})(Exc || (Exc = {}));
var z = Exc.orage;
console.log(z); //Color.red输出为0 Color.bule输出为5 Color.orage输出为6 在bule的基础上加1
var Exo;
(function (Exo) {
    Exo[Exo["red"] = 0] = "red";
    Exo["bule"] = "1";
    Exo["orage"] = "2";
})(Exo || (Exo = {}));
var n = Exo.orage;
console.log(z); //如果bule的值是string 后续的枚举也要具有表达式
// 任意类型(any)
var sany = 1;
sany = '123'; // 重新赋值时可以赋值不同的类型 不会报错
// null 和 undefined
// let num:number
// console.log(num) // 会报错
// let num:undefined
// console.log(num) // 正确
var num; // 定义的时候不指定值 不会报错 
num = 1; // 未赋值则输出undefined
console.log(num);
// 空类型(null类型) 也是一样
// void 类型 表示没有任何类型 一般用于定义方法的时候方法没有返回值
function run() {
    console.log('run');
}
function count() {
    return 123;
}
// never 类型：是其他类型（包含null 和 undefined）的子类型 代表重不会出现的值 声明never的变量只能被never类型赋值
var e; //基本用不到
e = (function () {
    throw new Error('错误');
})();
