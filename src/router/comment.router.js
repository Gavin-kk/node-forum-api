const Router = require( 'koa-router' )

const { verifyAuth, verifyPermissions } = require( '../middleware/auth.middleware' )
const { contentCheck } = require( '../middleware/comment.middleware' )
const {
    create,
    reply,
    checkComments,
    checkAllComments,
    editComment,
    removeComment
} = require( '../controller/comment.controller' )

const commentRouter = new Router( { prefix: '/comment' } )
// 添加评论
commentRouter.post( '/', verifyAuth, contentCheck, create )
// 回复评论
commentRouter.post( '/reply', verifyAuth, contentCheck, reply )
// 根据 momentId 查询其所有的评论
commentRouter.get( '/:momentId', checkComments )
// 查询自己的所有评论
commentRouter.get( '/', verifyAuth, checkAllComments )
// 修改评论
commentRouter.patch( '/:commentId', verifyAuth, verifyPermissions, editComment )
// 删除评论
commentRouter.delete( '/:commentId', verifyAuth, verifyPermissions, removeComment )

module.exports = commentRouter
