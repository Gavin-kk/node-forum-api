const pool = require( '../app/database' )

const baseSql = `select comment.content, comment.createAt,comment.updateAt,
                        JSON_OBJECT('id',users.id,'username',users.username) user
                        from comment left join users on comment.user_id = users.id `

class CommentService {
    // 新建评论
    async postAComment ( userid, content, momentId ) {
        const sql = 'insert into comment (content,user_id,moment_id) values (?,?,?)'
        return pool.execute( sql, [ content, userid, momentId ] )
    }
    
    // 回复评论
    async replyToComments ( userId, momentId, commentId, content ) {
        const sql = 'insert into comment (content,user_id,moment_id,comment_id) values (?,?,?,?)'
        return pool.execute( sql, [ content, userId, momentId, commentId ] )
    }
    
    // 查询某条动态的评论
    async queryComments ( momentId ) {
        const sql = `select c.id , c.content, c.moment_id, c.comment_id, c.createAt, c.updateAt,
                            JSON_OBJECT('id',users.id,'name',users.username) user from comment c left join users
                            on users.id = c.user_id
                            where c.moment_id = ?;`
        const [ result ] = await pool.execute( sql, [ momentId ] )
        return result
    }
    
    // 查询所有评论
    async queryAllComments ( userId ) {
        const sql = `${ baseSql } where comment.user_id = ?`
        const [ result ] = await pool.execute( sql, [ userId ] )
        return result
    }
    
    // 修改评论内容
    async editComment ( content, commentId ) {
        const sql = 'update comment set content = ? where id = ?'
        return pool.execute( sql, [ content, commentId ] )
    }
    
    // 删除评论内容
    async deleteComment ( commentId ) {
        const sql = 'delete from comment where id = ?;'
        return pool.execute( sql, [ commentId ] )
    }
    
}

module.exports = new CommentService()
