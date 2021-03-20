const pool = require('../app/database')

class UserService {
    async create(user) {
        // user 参数是 用户json传来的数据
        const {username, password} = user
        // 将这个 user 存储到数据库中
        const sql = 'insert into users (username,password) values (?,?);'
        const result = await pool.execute(sql, [username, password])

        return result
    }

    async getUserByName(name) {
        const sql = `select username from users where username = ?`
        const result = await pool.execute(sql, [name])
        return result[0]
    }
}

module.exports = new UserService()
