/** ts 函数学习 */

// 函数的定义

// 1 函数声明法
function run():string{ // 指定了函数返回的类型必须为字符串 为其他类型会报错
    return 'run'
}

// 2 匿名函数法
const fun2 = function():number{
    return 1
}

const fun3 = ():string => {
    return '123'
}

/* 方法传参 */
function getInfo(name:string,age:number):string{
    return `${name}的年龄是${age}`
}
getInfo('张三',20) //传入的参数类型要跟定义的时候一致

// 匿名函数也是一样的
const info2 = function(name:string,age:number):string{
    return `${name}的年龄是${age}`
}
const infp3 = (name:string,age:20):string => {
    return `${name}的年龄是${age}`
}

// 没有返回值的函数
function run3():void{
    console.log('run')
}

// 可选参数 es5的实参和形参可以不一致 ts中必须一致 若要不传需配置可选参数
function getMes(name:string,age?:number):string{
    if(age) {
        return `${name}的年龄是${age}`
    } else {
        return `${name}的年龄未知`
    }
}
getMes('zhangsan') //参数后面加?表示该参数可传可不穿 都不会报错  注意 可选参数必须配置到参数的最后面
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
function getMes2(name:string,age:number=20):string{  // 默认参数放前面后面都可以
    if(age) {
        return `${name}的年龄是${age}`
    } else {
        return `${name}的年龄未知`
    }
}
getMes2('zhangsan') // 指定了参数的默认值 即使不传也不会报错  这里返回的age为默认的20

// 剩余参数 使用es6的拓展运算符
function sun(...result:number[]):number{
  return result.reduce((prve:number, current:number) => {
      return prve+current
  })
}
console.log(sun(1,2,3,4,5))

function sum1(a:number,b:number,...result:number[]){
    var sum = result.reduce((prve:number, current:number) => {
        return prve+current
    })
    return a+b+sum
}
sum1(1,2,3,4,5) // a等于1 b等于2 剩下的为剩余参数

//函数的重载

// java中的重载是指 多个同名函数 参数不一样 会出现函数重载
// ts 通过为同一个函数提供多个函数类型定义来实现多种功能

// es5 中出现同名的方法 下面的会覆盖上面的方法
// ts中的重载
function getPerson(name:string):string
function getPerson(age:number):string
function getPerson(str:any):any{
    if (typeof str === 'string') {
        return `名字是${str}`
    } else {
        return `年龄是${str}`
    }
}
//  getPerson('zhanagsan')  正确
//  getPerson(20) 正确
//  getPerson(true) 报错    虽然传入any 但是只是定义前面只定义了string和number

function person2(name:string):string
function person2(name:string,age:number):string
function person2(name:any,age?:any):any{
    if(age) {
        return `年龄是${age}`
    } else {
        return `名字是${name}`
    }
}
// person2('zhangsan') //正确
// person2('zhangsan',20) //正确
// person2('zhangsan'. true) //编译报错 布尔类型在重载中没有定义


/*
  ts 类的学习 定义 继承 修饰符
*/

// 1 定义 和es6相似
 class Person{
     public name:string // 属性 
     // name:string  可以省略前面的public关键词
     constructor(name:string){
         this.name = name // 构造函数 实例化类的时候触发的方法
     }
     getName():string{
         return this.name
     }
     setName(name:string):void{
         this.name = name
     }
     run():string{
         return `${this.name}在运动`
     }
 }
 const p = new Person('zhangsan')
 console.log(p.getName()) // zhangsan 
 p.setName('lisi')
 console.log(p.getName()) // lisi

 // 2 实现继承 extends super 两个关键字
class Web extends Person{  // 通过extends 关键字来继承父类
    constructor(name:string){ // 构造函数里 通过super 关键字来传递参数
        super(name) // super 表示调用父类的构造函数
    }
    webRun():string{
        return `${this.name}在webRun`  // 虽然Web类里没有name属性 但是它继承了父类Person的name属性
    }
    run():string{
        return `${this.name}在运动-子类`
    }
} // 里面可以有自己的属性和方法
const web = new Web('李四')
console.log(web.run()) // 当子类和父类具有同样的方法时 （会调用子类自己的run方法  会先在子类自己中找 没有再去父类中找）

// 3 类的修饰符 ts类里定义属性的时候提供了三种修饰符
/*
  public ： 公有 在类里面 子类里 以及类外面都可以访问
  protected  ： 保护类型  在类里面 子类里可以访问 类外部不能访问
  private  ： 私有 在类里面可以访问 在子类和类外部不能访问

  属性如果不加修饰符 默认是public
*/
const pn = new Person('xiaoming')
pn.name // 公有属性 在外部可以访问到

// 4 静态方法 静态属性
class Bus{
    public name:string
    public age:number=20
    static sex:string='男' // 静态属性
    constructor(name:string,age:number){
        this.name = name // 
        this.age = age
    }
    run():void{  // 实例方法 先实例化再调用
        console.log(`${this.name}在坐车`)
    }
    static work():void{ // 静态方法 不能调用类的属性 可以调用类的静态属性
        console.log(`开车`)
        // console.log(`${this.age}`) 会报错 undefined
        console.log(this.sex) // 调用静态属性
    }
}
Bus.work()
Bus.sex // 外部调用静态属性

// 5 多态 ： 父类定义一个方法不去实现 让继承它的子类去实现 每一个子类有不同的表现 （同一个方法有多个状态） 也是继承的一种
class Animal {
    public name:string
    constructor(name:string) {
        this.name = name
    }
    eat(){ // 动物具有吃的方法 具体吃什么不知道 继承它的子类去体现 每一个子类的体现不一样（吃的不一样） 就是多态
        console.log('吃')
    }
}
class Dog extends Animal {
    constructor(name:string) {
        super(name)
    }
    eat(){
        return `${this.name}吃狗粮`
    }
}
class Cat extends Animal {
    constructor(name:string) {
        super(name)
    }
    eat(){
        return `${this.name}吃猫粮`
    }
}

// 6 抽象类 抽象方法

// 抽象类 是提供其他类继承的基类 不能直接被实例化
// 抽象方法 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现
// 用abstract关键字定义抽象类和抽象方法  abstract抽象方法智能放在抽象类里边
// 抽象类和抽象方法用来定义标准

// 改写Animal的例子 要求他的子类必须包含eat方法
abstract class Animal1 { // 可以有抽象方法和非抽象方法
    public name:string
    constructor(name:string){
        this.name = name
    }
    abstract eat():any
    run():void{
        console.log('run')
    }
}
// const a = new Animal1() 不能被实例化 会报错

class Bird extends Animal1 {
    // 必须要实现父类的抽象方法
    constructor(name:string) {
        super(name)
    }
    eat():void{
        console.log(`${this.name}吃虫子`)
    } // 不实现会报错
}

const b = new Bird('燕子')
b.eat()
b.run()