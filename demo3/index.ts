/**
 * ts 接口学习
 * 作用： 在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里，接口起到一种限制和规范作用。接口定义了
 * 某一批类所需遵守的规范，接口不关心这些类的内部数据状态，也不关心这些类里的方法的实现细节，它只规定这批类里必须提供某些方法，提供
 * 这些方法的类就可以满足实际的需要。 ts中的接口类似于java，同时还增加了更加灵活的接口类型，包括属性、函数、可索引和类等。
*/

// 1 属性接口  
// ts自定义方法传入参数 对json的约束 单个方法
function printLabel(labelInfo:{label:string}):void{
    console.log(labelInfo.label)
}
printLabel({label:'zhangsan'}) // 对参数labelInfo 进行约束

// 对批量方法传参进行约束

// 定义接口 通过 interface 关键字来定义

interface FullName{ // 对传入对象的约束 也就是属性接口
    firstName:string;  // 以分好结束 或者不加 不能以逗号结束
    secondName:string;
} // 有多个函数需要这样的参数时 调用这个接口即可 不必每个方法都去约束
function printName(name:FullName):void{
    // 必须传入对象 firstName secondName
    console.log(name.firstName + name.secondName)
}
function printInfo(name:FullName):void{
    // 必须传入对象 firstName secondName
    console.log(name.firstName + name.secondName)
}
// printName({firstName:'zhang',secondName:'san'}) //正确 必须传入接口中约定的属性 缺少或者增加都不行
// 将对象定义到外部 对象中包含约定的属性就行 但是对于约定的属性不能缺少
const obj = { // 即只能多不能少  但是在方法中获取多余的属性会报错 建议严格按照接口定义的约束来
    firstName:'zhang',
    secondName:'san',
    age:20
}
printName(obj) //正确  属性的顺序可以不一样
printInfo(obj)

// 可选参数 和函数的可选参数一样 后面加上 ? 
interface FullSex{
    boy:string
    girl?:string
}
function printSex(obj:FullSex):void{
    if(obj.girl){
        console.log(obj.girl)
    }else{
        console.log(obj.boy)
    }
}
printSex({boy:'男'})

// 原生js封装ajax  不谦容ie6
interface Config{
    type:string
    url:string
    data?:string
    dataType:string
}
function ajax(config:Config):void{
    const xhr = new XMLHttpRequest()
    xhr.open(config.type, config.url, true)
    xhr.send(config.data)
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200) {
           if (config.dataType === 'json') {
              console.log(JSON.parse(xhr.responseText))
           }else{
              console.log(xhr.responseText)
           }
        }
    }
}
ajax({ // data 可传可不传
    type:'get',  
    url:'http://www.bai.com',
    dataType:'json'
})

// 2 函数类型接口 对方法传入的参数以及返回值进行约束
interface encrypt{
    (key:string,value:string):string
}

const md5:encrypt = function(name:string,value:string):string{
    return `${name}的值是${value}`
}
md5('语文','95')

// 3 可索引接口 数组和对象的约束 （不常用）

// ts 中定义数组 
const arr1:number[] = [1,2,3]
const arr2:Array<string> = ['1','2','3']

// 实现接口
interface UserArr{
    [index:number]:string
}
const arr3:UserArr = ['1','2','3']

// 对象可索引 更不常用
interface UserObj{
    [index:string]:any
}
const objn:UserObj = {name:'zhangsan',age:20}

// 4 类 类型接口 对类的约束 和 抽象类有点相似
interface Animal{ 
    name:string
    eat(str:string):void
}
class Dog implements Animal{ // implements 关键字 不是继续 表示实现类的接口
    public name:string
    constructor(name:string){
        this.name = name
    }
    eat():void{
        console.log(`${this.name}吃狗粮`)
    }
}
const dog = new Dog('小黑')
dog.eat()

class Cat implements Animal{
    name:string
    constructor(name:string){
        this.name = name
    }
    eat(food:string):void{
        console.log(`${this.name}吃${food}`)
    }
    run():void{
        console.log(`${this.name}在运动`)
    }
}
const cat = new Cat('小花')
cat.eat('猫粮')
cat.run()

// 5 接口扩展： 接口的继承
interface Person extends Animal{  // 继承了Animal接口
    work():void
}

class Programmer {
    name:string
    constructor(name:string) {
        this.name = name
    }
    coding(code:string):void{
        console.log(`${this.name}写${code}`)
    }
}

// 实现接口时 不仅要实现Person接口 还要实现Animal接口
class Web extends Programmer implements Person{  // 继承了Programmer父类
    constructor(name:string){
       super(name)  // 调用父类的构造函数
    }
    eat():void{
        console.log(`${this.name}喜欢吃面条`)
    }
    work():void{
        console.log(`${this.name}在工作`)
    }
}
const p = new Web('小王')
p.work()
p.coding('typscript')


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
function getData<T>(value:T):T{  // 保证三个大写字母一致
    return value
}
getData<number>(1)
getData<string>('1')

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
class MinClass<T> {  //类的泛型
    public list:T[]
    constructor(list:T[]) {
        this.list = list
    }
    min():T{
        let minNum = this.list[0]
        for(let i = 0; i< this.list.length; i++) {
            if(minNum > this.list[i]) {
                minNum = this.list[i];
            }
        }
        return minNum
    }
}
const mi = new MinClass<number>([1,2,5,4,6]) // 实例化类 并且指定T代表的数组元素的类型是number
const mi2 = new MinClass<string>(['f','r','d','b']) // 实例化类 并且指定T代表的数组元素的类型是string   使用对应的ASCII码做对比
console.log(mi.min())
console.log(mi2.min())
// 同一个类 可以传入不同的类型数据