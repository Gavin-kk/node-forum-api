const pool = require( '../app/database' )

class UploadService {
    async createAvatar ( mimetype, filename, size, userId ) {
        const sql = 'insert into avatar (filename,mimetype,size,user_id) values (?,?,?,?);'
        const [ result ] = await pool.execute( sql, [ filename, mimetype, size, userId ] )
        return result
    }
    
    // 查询某个用户的头像
    async queryUserAvatar ( userId ) {
        const sql = 'select * from avatar where user_id = ?'
        const [ result ] = await pool.execute( sql, [ userId ] )
        return result[0]
    }
    
    // 把图像url插入到 user 表中
    async addAvatarURL ( url, userId ) {
        const sql = 'update users set avatar_url = ? where id = ?'
        const [ result ] = await pool.execute( sql, [ url, userId ] )
        return result
    }
    
    // 添加动态的配图
    async uploadMomentPicture ( filename, mimetype, size, userId, momentId ) {
        const sql = 'insert into file (filename, mimetype, size, user_id, moment_id) values (?,?,?,?,?)'
        const [ result ] = await pool.execute( sql, [ filename, mimetype, size, userId, momentId ] )
        return result
    }
    
}

module.exports = new UploadService()
