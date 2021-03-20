const service = require('../service/user.service')

class UserController {
    async create(ctx, next) {
        // 获取用户请求
        const user = ctx.request.body
        // 查询数据 所有处理数据库的操作 都放在 service 里
        const result = await service.create(user)
        // 返回数据

        ctx.body = result
    }
}

module.exports = new UserController()
