import { Mysql } from './db'

// 操作用户表
class UserDb {
    public username:string
    public password:string
    constructor(param:{
        username:string,
        password:string
    }) {
        this.username = param.username
        this.password = param.password
    }
}

const Maq = new Mysql<UserDb>()

export {
    UserDb,
    Maq
}