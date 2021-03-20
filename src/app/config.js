const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

// 直接调用 把根目录的 env文件里的内容写入 process.env 内
dotenv.config()
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,'./Kes/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,'./Kes/public.key'))

// 通过解构赋值的形式 从 process.env 中取出 APP_PORT 的内容
module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY
