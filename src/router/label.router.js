const Router = require( 'koa-router' )
const { verifyAuth } = require( '../middleware/auth.middleware' )
const { create, labelList } = require( '../controller/label.controller' )
const { checkLabel } = require( '../middleware/label.middleware' )
const labelRouter = new Router( { prefix: '/label' } )

labelRouter.post( '/', verifyAuth, checkLabel, create )
// 获取所有标签列表
labelRouter.get( '/', labelList )

module.exports = labelRouter
