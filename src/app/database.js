const mysql = require( 'mysql2' )
const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD
} = require( './config' )

const pool = mysql.createPool( {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
} )
// 测试连接数据库是否成功连接
pool.getConnection( ( err, conn ) => {
    conn.connect( ( err ) => {
        if ( err ) {
            throw new Error( '连接失败' + err )
        } else {
            console.log( '数据库连接成功' )
        }
    } )
} )
// 以后可以直接使用 promise 了
module.exports = pool.promise()
