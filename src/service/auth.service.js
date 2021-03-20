const pool = require( '../app/database' )

// 权限相关验证
class AuthService {
    async getUserName ( name ) {
        const sql = 'select * from users where username = ?'
        const result = await pool.execute( sql, [ name ] )
        return result[0]
    }
    
    // 验证权限
    async verify_permissions ( tableName, userId, id ) {
        const sql = `select * from ${ tableName } where id = ? and user_id = ?;`
        const result = await pool.execute( sql, [ id, userId ] )
        return result[0]
    }
    
}

module.exports = new AuthService()
