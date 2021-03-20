const {
    postAComment,
    queryComments,
    queryAllComments,
    editComment,
    deleteComment,
    replyToComments
} = require( '../service/comment.service' )
const errTypes = require( '../constants/err-types' )

class CommentController {
    // 发布评论
    async create ( ctx, next ) {
        const { id } = ctx.user
        const { content, momentId } = ctx.request.body
        try {
            const result = await postAComment( id, content, momentId )
            ctx.body = result
        }catch ( error ){
            const err = new Error(errTypes.INSUFFICIENT_PERMISSIONS)
            ctx.app.emit( 'error', err, ctx )
        }
    }
    
    // 回复评论
    async reply ( ctx, next ) {
        const { id } = ctx.user
        const { momentId, commentId, content } = ctx.request.body
        try {
            const result = await replyToComments( id, momentId, commentId, content )
            ctx.body = result
        } catch ( error ) {
            const err = new Error( errTypes.NO_SUCH_MOMENT )
            ctx.app.emit( 'error', err, ctx )
        }
        
    }
    
    // 查询某一条动态的评论
    async checkComments ( ctx, next ) {
        const { momentId } = ctx.params
        const result = await queryComments( momentId )
        ctx.body = result
    }
    
    // 查询自己所有的评论
    async checkAllComments ( ctx, next ) {
        const { id } = ctx.user
        const result = await queryAllComments( id )
        ctx.body = result
    }
    
    // 修改自己的评论
    async editComment ( ctx, next ) {
        const { content } = ctx.request.body
        if ( !content ) {
            const err = new Error( errTypes.COMMENT_CANNOT_BE_EMPTY )
            return ctx.app.emit( 'error', err, ctx )
        }
        const { commentId } = ctx.params
        const result = await editComment( content, commentId )
        ctx.body = result
    }
    
    // 删除自己的评论
    async removeComment ( ctx, next ) {
        const { commentId } = ctx.params
        const result = await deleteComment( commentId )
        ctx.body = result
    }
}

module.exports = new CommentController()
