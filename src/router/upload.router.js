const Router = require( 'koa-router' )
const { verifyAuth } = require( '../middleware/auth.middleware' )
const { avatarHandler, pictureHandler, modifyPictureSize } = require( '../middleware/upload.middleware' )
const { fileController, getUserAvatar, getExcel, uploadMomentPicture } = require( '../controller/upload.controller' )
const uploadRouter = new Router( { prefix: '/upload' } )

// 添加头像接口
uploadRouter.post( '/avatar', verifyAuth, avatarHandler, fileController )

// 动态图片 picture 上传
uploadRouter.post( '/prcture', verifyAuth, pictureHandler, modifyPictureSize, uploadMomentPicture )

module.exports = uploadRouter
