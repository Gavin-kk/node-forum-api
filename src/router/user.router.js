const Router = require( 'koa-router' )

const { create } = require( '../controller/user.controller' )
const {
    usernameVerification,
    encryptionPassword
} = require( '../middleware/user.middleware' )
const { getUserAvatar } = require( '../controller/upload.controller' )

const userRouter = new Router( { prefix: '/user' } )

userRouter.post( '/', encryptionPassword, usernameVerification, create )

// 获取某位用户头像接口
userRouter.get( '/:userId/avatar', getUserAvatar )
module.exports = userRouter
