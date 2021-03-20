const pool = require( '../app/database' )
const basesql = ``

class MomentService {
    async create ( id, content ) {
        const sql = `insert into moment (content,user_id) values (?,?)`
        const [ result ] = await pool.execute( sql, [ content, id ] )
        return result
    }
    
    async queryUserDynamics ( momentId ) {
        // 解决查询重复的问题
        const sql = `select m.id, m.content, m.createAt, m.updateAt,
                            json_object('id',users.id,'name',users.username) user,
                            (select if(count(c.id),
                            json_arrayagg(
                                json_object(
                                    'id',c.id,'content',c.content,'momentId',c.moment_id,
                                    'commentId',c.comment_id,
                                    'user',json_object('id',cu.id,'name',cu.username),
                                    'createAt',c.createAt,'updateAt',c.updateAt)
                            ) ,null) from comment c
                            left join users cu on cu.id = c.user_id
                            where m.id = c.moment_id) comments,
                            if(count(label.id),
                            json_arrayagg(json_object('id',label.id,'name',label.name)),null )  labels,
                            (select json_arrayagg(CONCAT('http://localhost:8080/moment/images/',file.filename))  from file where
                            file.moment_id =  m.id) files
                            from moment m
                            left join  users on users.id = m.user_id
                            left join moment_label ml on ml.moment_id = m.id
                            left join label on ml.label_id = label.id
                            where m.id = ?
                            group by m.id;`
        try {
            const [ result ] = await pool.execute( sql, [ momentId ] )
            return result
        } catch ( err ) {
            console.log( err.message )
        }
    }
    
    // 分页查询
    async pagingQuery ( offset, size ) {
        const sql = `select m.id, m.content, m.createAt, m.updateAt,
                            JSON_OBJECT('id',users.id,'username',users.username) user,
                            (select count(*) from comment where comment.moment_id = m.id ) commentCount,
                            (select count(*) from moment_label ml where ml.moment_id = m.id) tableCount,
                            (select json_arrayagg(concat('http://localhost:8080',file.filename)) from file where m.id = file.moment_id) images
                            from moment m left join users on m.user_id = users.id
                            limit ?,?;`
        const result = await pool.execute( sql, [ offset, size ] )
        return result[0]
    }
    
    // 删除数据
    async deleteMoment ( momentId ) {
        const sql = 'delete from moment where id = ?;'
        const result = await pool.execute( sql, [ momentId ] )
        return result
    }
    
    // 修改动态
    async modifyMoment ( momentId, content ) {
        const sql = 'update moment set content = ? where id = ?'
        const result = await pool.execute( sql, [ content, momentId ] )
        return result
    }
    
    // 查看是否已经存在 moment 和 label 的关系
    async isThereIsARelationship ( momentId, labelId ) {
        const sql = 'select * from moment_label where moment_id = ? and label_id = ?'
        const [ result ] = await pool.execute( sql, [ momentId, labelId ] )
        return result
    }
    
    // 添加 moment 和 label 的关系
    async addRelationship ( momentId, labelId ) {
        const sql = 'insert into moment_label (moment_id,label_id) values (?,?)'
        const [ result ] = await pool.execute( sql, [ momentId, labelId ] )
        return result
    }
    
    // 查询动态图片
    async getPicture ( picture ) {
        const sql = 'select * from file where filename = ?'
        const [ result ] = await pool.execute( sql, [ picture ] )
        return result[0]
    }
}

module.exports = new MomentService()
