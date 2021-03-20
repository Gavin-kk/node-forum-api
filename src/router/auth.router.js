const Router = require( 'koa-router' )

const { login, success } = require( '../controller/auth.controller' )
const { loginCheck, verifyAuth } = require( '../middleware/auth.middleware' )

const authRouter = new Router()


authRouter.post( '/login', loginCheck, login )

authRouter.get( '/test', verifyAuth, success )

module.exports = authRouter
