const app = require('./app')
const config = require('./app/config')
// 为了知道数据库是否连接成功 所以在这里导入一下 database.js 让他输出是否连接数据库成功
require('./app/database')

app.listen(config.APP_PORT, () => {
    console.log('服务已启动,启动端口号为: ' + config.APP_PORT)
})
