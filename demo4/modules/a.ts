export namespace A{  // 通过namespace关键字声明命名空间  里面的变量 函数 类等默认是私有的
    interface Animal{  
        name:string
        eat(str:string):void
    }
    export class Dog implements Animal{ // implements 关键字 不是继承 表示实现类的接口
        public name:string
        constructor(name:string){
            this.name = name
        }
        eat():void{
            console.log(`${this.name}吃狗粮`)
        }
    }
    export class Cat implements Animal{
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
}

export namespace B{  // 里面的代码命名可以和A里面的一致 属于各自的命名空间 不会冲突
    interface Animal{  
        name:string
        eat(str:string):void
    }
    export class Dog implements Animal{ // implements 关键字 不是继承 表示实现类的接口
        public name:string
        constructor(name:string){
            this.name = name
        }
        eat():void{
            console.log(`${this.name}吃狗粮`)
        }
    }
    export class Cat implements Animal{
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
}