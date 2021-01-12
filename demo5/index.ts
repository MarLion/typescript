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

 // 1 类装饰器：类装饰器在类声明之前被声明（紧靠着类声明） 类装饰器应用于类构造函数，可以用来监视 修改或者替换类定义 传入一个参数
 // 定义装饰器
 function logclass(params:any){ // 普通装饰器 无法传参
     // console.log(params) // params就是调用该装饰器的类
     params.prototype.url = 'xxxxxxx' // 通过装饰器动态扩展的属性 没有去修改类
     params.prototype.run = ():void => {
         console.log('run')
     }
 }
// 使用@来调用装饰器
 @logclass
 class HttpClient{
     constructor(){

     }
     getData():void{

     }
 }
 const h:any = new HttpClient()
 console.log(h.url)
 h.run()

 // 装饰器工厂 可传参
 function logClass1(params:string){ // params是传入的参数    装饰器不仅可以扩展属性和方法 还可以修改构造函数
     return function(target:any){ // target就是当前类
         console.log(params)
         target.prototype.say = params
     }
 }
 @logClass1('hello')
 class HttpClient1{
     constructor(){

     }
     getData():void{

     }
 }

 // 类装饰器 重载构造函数
 // 装饰器表达式会在运行时当做函数被调用  类的构造函数作为其唯一的参数
 // 如果装饰器返回一个值 它会使用提供的构造函数替换类的声明
 function logClass2(target:any){
   return class extends target{
        url = '222222'
        getData() {
            console.log('修改后'+this.url)
        }
   }
}
@logClass2
class HttpClient2{
    public url:string | undefined
    constructor(){
        this.url = '1111111'
    }
    getData():void{
        console.log(this.url)
    }
}
const u2 = new HttpClient2()
u2.getData()

// 2 属性装饰器  属性装饰器表达式会在运行时当做函数被调用 传入2个参数：1.对于静态成员来说是类的构造函数，对于实力成员是类的原型对象  2.成员的名字
// 类装饰器
function logClass3(params:string){
    return function(target:any){
        console.log(params)
        target.prototype.say = params
    }
}
// 属性装饰器
function logProperty(params:string){  // params 传入的参数
    return function(target:any,attr:any){ // target : 类的原型对象  attr:属性
        target[attr] = params    // 所以相当于类装饰器的 target.prototype.say = params
    }
}
function logPath(params:string){
    return function(target:any,attr:any){
        target[attr] = params
    }
}
@logClass1('hello')
class HttpClient3{
    @logProperty('给url赋值') // 可以看做是给默认值
    public url:string | undefined
    @logPath('给path赋值')
    public path:string | undefined
    constructor(){
       
    }
    /*
    constructor(url:string,path:string){  // 如果在构造函数中给属性赋值 实例化类时传入的参数会覆盖装饰器的值
        this.url = url 
        this.path = path
    }
    */
    getData():void{
        console.log(this.url)
        console.log(this.path)
    }
}
const u33 = new HttpClient3()
u33.getData()

// 3.方法装饰器
/*
    它会被应用到方法的属性描述符上 可以用来监视 修改或者替换方法定义

    运行时会传入下列3个参数：
        1.对于静态成员来说是类的构造函数，对于实力成员是类的原型对象  
        2.成员的名字
        3.成员的属性描述符
*/
function updateGet(params:string){
    return function(target:any,methodsName:any,desc:any){ // target:原型对象  methodsName:方法名 desc：方法  desc.value：方法具体的值
        //例子 修改getData方法 将参数类型修改为string
        const origin = desc.value
        desc.value = function(...args:any[]){
        args = args.map((ele) => {
                return String(ele)
            })
            // 这一步是在修改的函数里去应用原方法 达到修改而不是覆盖
            origin.apply(this,args)
            console.log(args)
        }
    }
}
class HttpClient4{
    public url:string | undefined
    @updateGet('123')
    getData(...args:any[]):void{
        console.log('原来的方法')
    }
}
const u4 = new HttpClient4()
u4.getData(1,2,'3')