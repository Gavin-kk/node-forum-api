const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const errorHandler = require('../app/error-handle')
const useRouter = require('../router')
const app = new Koa()

app.useRouter = useRouter

app.use(bodyParser())
app.useRouter()
app.on('error', errorHandler)

module.exports = app

