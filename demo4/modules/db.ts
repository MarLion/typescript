// export const url = 'xxxxxxx'

// export const getDta = ():string => {
//     console.log('获取数据')
//     return '111'
// }

// const url = 'xxxxxxx'
// const getDta = ():string => {
//     console.log('获取数据')
//     return '111'
// }
// export { url, getDta } 
// 暴露多个出去

/*
// export default 默认导出 每个模块有可以有一个default导出 默认导出使用default关键字标记 并且每个模块只能够有一个default导出 需要使用特殊的导入形式
export default getDta // 只能用一次
//  export { getDta }
*/

// 使用模块化封装DB库
// 定义接口
interface DBI<T>{
    add(info:T):boolean
    update(info:T,id:number):boolean
    delete(id:number):boolean
    get(id:number):any[]
}

// 操作Mysql的类
class Mysql<T> implements DBI<T>{
    add(info: T): boolean {
        console.log(info)
        return true
    }
    update(info: T, id: number): boolean {
        throw new Error("Method not implemented.")
    }
    delete(id: number): boolean {
        throw new Error("Method not implemented.")
    }
    get(id: number): any[] {
        throw new Error("Method not implemented.")
    }
    
}

// 操作Mongdb的类
class Mongdb<T> implements DBI<T>{
    add(info: T): boolean {
        throw new Error("Method not implemented.")
    }
    update(info: T, id: number): boolean {
        throw new Error("Method not implemented.")
    }
    delete(id: number): boolean {
        throw new Error("Method not implemented.")
    }
    get(id: number): any[] {
        throw new Error("Method not implemented.")
    }
    
}

// 操作Mssql的类
class Mssql<T> implements DBI<T>{
    add(info: T): boolean {
        throw new Error("Method not implemented.")
    }
    update(info: T, id: number): boolean {
        throw new Error("Method not implemented.")
    }
    delete(id: number): boolean {
        throw new Error("Method not implemented.")
    }
    get(id: number): any[] {
        throw new Error("Method not implemented.")
    }
    
}
export { Mysql, Mongdb, Mssql }