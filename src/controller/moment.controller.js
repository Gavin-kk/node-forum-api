const momentService = require( '../service/moment.service' )
const errTypes = require( '../constants/err-types' )
const fs = require( 'fs' )
const path = require( 'path' )

const { PICTURE_PATH } = require( '../constants/file-path' )

class MomentController {
    async create ( ctx, next ) {
        const { id } = ctx.user// user的id
        const { content } = ctx.request.body
        if ( !content ) {
            const err = new Error( errTypes.CONTENT_IS_EMPTY )
            return ctx.app.emit( 'error', err, ctx )
        }
        // const result = await momentService.create( id, content )
        ctx.body = await momentService.create( id, content )
    }
    
    async getUserDynamic ( ctx, next ) {
        const momentId = ctx.params.momentId
        ctx.body = await momentService.queryUserDynamics( momentId )
    }
    
    async getList ( ctx, next ) {
        const { offset, size } = ctx.request.query
        if ( !offset || !size ) {
            const err = new Error( errTypes.PARAMETER_CANNOT_BE_EMPTY )
            return ctx.app.emit( 'error', err, ctx )
        }
        const result = await momentService.pagingQuery( offset, size )
        ctx.body = result
    }
    
    // 删除动态
    async deleteMoment ( ctx, next ) {
        const { momentId } = ctx.params
        const result = await momentService.deleteMoment( momentId )
        ctx.body = result
    }
    
    // 修改动态
    async modify ( ctx, next ) {
        const { content } = ctx.request.body
        const { momentId } = ctx.params
        const result = await momentService.modifyMoment( momentId, content )
        ctx.body = result
    }
    
    // 给 moment 添加标签
    async addMomentLabel ( ctx, next ) {
        const newLabel = ctx.newLabel
        const { momentId } = ctx.params
        for ( let item of newLabel ) {
            try {
                const result = await momentService.isThereIsARelationship( momentId, item.id )
                if ( !result.length ) {
                    await momentService.addRelationship( momentId, item.id )
                }
            } catch ( err ) {
                console.log( err.message )
            }
        }
        ctx.status = 200
        ctx.body = '添加动态成功'
    }
    
    // 查询动态图片
    async getPicture ( ctx, next ) {
        const { picture } = ctx.params
        const types = [ 'large', 'middle', 'small' ]
        const { type } = ctx.query
        let pictureName = ''
        if ( type ) {
            if ( types.some( item => item === type ) ) {
                const suffix = path.extname( picture )
                pictureName += picture + '-' + type + suffix
            } else {
                const err = new Error( errTypes.PARAMETER_ERROR )
                return ctx.app.emit( 'error', err, ctx )
            }
        }
        try {
            const result = await momentService.getPicture( picture )
            ctx.set( 'Content-Type', `${ result.mimeType }` )
            ctx.body = fs.createReadStream( `${ PICTURE_PATH }/${ pictureName }` )
        } catch ( error ) {
            console.log( error.message )
        }
            
            }
}

module.exports = new MomentController()
