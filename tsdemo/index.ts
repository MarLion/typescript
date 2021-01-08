/*
 tsc --init 创建tsconfig.json配置文件  终端运行tsc监视任务 自动将ts编译为es5
*/

/* ts中的数据类型 */ 

// 布尔类型 boolean     true false

const tar:boolean = true
 
// 数值类型(number)

const a:number = 1
 
// 字符串类型(string)

const str:string = 'this is ts'

// 数组类型(array)  有两种定义数组的方式

 // 第一种
 
 let arr1:number[] = [1,2,3] // 数组元素只能是number类型 其他类型会报错 []前面的类型指定了数组元素的类型

 // 第二种

 let arr2:Array<number> = [1,2,3] // <>里指定元素类型

 // 元祖类型(tuple) 属于数组的一种 可以指定数组中每个元素的类型

 let arr3:[string,number,boolean] = ['1',1,true]

 // 枚举类型(enum) 主要是用来定义标识符

 enum Flag {nopay=1,paying=2,paied=3} // 先定义一个枚举类型 1 未支付 2 支付中 3 已支付
 let f:Flag = Flag.nopay //定义了各个值得含义
 console.log(f) // 输出1

 enum Color {red,bule,orage}
 let c:Color = Color.red
 console.log(c) //输出为0 没有指定值的话 默认输出索引值

 enum Exc {red,bule=1,orage}
 let z:Exc = Exc.orage
 console.log(z) //Color.red输出为0 Color.bule输出为5 Color.orage输出为6 在bule的基础上加1
 
 enum Exo {red,bule="1",orage="2"}
 let n:Exo = Exo.orage
 console.log(z) //如果bule的值是string 后续的枚举也要具有表达式

 // 任意类型(any)

 let sany:any = 1
 sany = '123' // 重新赋值时可以赋值不同的类型 不会报错

// null 和 undefined

// let num:number
// console.log(num) // 会报错

// let num:undefined
// console.log(num) // 正确

let num:number | undefined // 定义的时候不指定值 不会报错 
num = 1 // 未赋值则输出undefined
console.log(num)

// 空类型(null类型) 也是一样

// void 类型 表示没有任何类型 一般用于定义方法的时候方法没有返回值
function run():void{ //没有返回值
  console.log('run')
}
function count():number{ //指定返回值类型
  return 123
}

// never 类型：是其他类型（包含null 和 undefined）的子类型 代表重不会出现的值 声明never的变量只能被never类型赋值

let e:never //基本用不到
e=(() => {
  throw new Error('错误')
})()