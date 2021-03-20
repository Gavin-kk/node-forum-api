const pool = require( '../app/database' )

class LabelService {
    // 检查标签是否存在
    async isExists ( name ) {
        const sql = 'select * from label where name = ?'
        const [ result ] = await pool.execute( sql, [ name ] )
        return result[0]
    }
    
    // 创建标签
    async create ( name ) {
        const sql = 'insert into label (name) values (?)'
        const [ result ] = await pool.execute( sql, [ name ] )
        return result
    }
    
    // 获取所有标签
    async labelList () {
        const [ result ] = await pool.execute( 'select * from label' )
        return result
    }
    
}

module.exports = new LabelService()
