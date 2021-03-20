const errTypes = require( '../constants/err-types' )
const contentCheck = async function ( ctx, next ) {
    const { content, momentId } = ctx.request.body
    // 验证用户输入内容
    if ( !content ) {
        const err = new Error( errTypes.COMMENT_CANNOT_BE_EMPTY )
        return ctx.app.emit( 'error', err, ctx )
    }
    if ( !momentId ) {
        const err = new Error( errTypes.COMMENT_CANNOT_BE_EMPTY )
        return ctx.app.emit( 'error', err, ctx )
    }
    await next()
}

module.exports = {
    contentCheck: contentCheck
}
