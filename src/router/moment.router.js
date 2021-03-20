const Router = require( 'koa-router' )

const { verifyAuth, verifyPermissions } = require( '../middleware/auth.middleware' )
const {
    create,
    getUserDynamic,
    getList,
    deleteMoment,
    modify,
    addMomentLabel,
    getPicture
} = require( '../controller/moment.controller' )
const { checkLabel } = require( '../middleware/label.middleware' )
const momentRouter = new Router( { prefix: '/moment' } )

momentRouter.post( '/', verifyAuth, create )
// 获取所有的内容 分页展示
momentRouter.get( '/', getList )
// 获取某条动态信息 及其相关评论
momentRouter.get( '/:momentId', getUserDynamic )
// 删除动态
momentRouter.delete( '/:momentId', verifyAuth, verifyPermissions, deleteMoment )
// 修改动态
momentRouter.patch( '/:momentId', verifyAuth, verifyPermissions, modify )
// 给动态添加 标签
momentRouter.post( '/:momentId/label', verifyAuth, verifyPermissions, checkLabel, addMomentLabel )

// 查询动态图片
momentRouter.get( '/images/:picture', getPicture)
module.exports = momentRouter
