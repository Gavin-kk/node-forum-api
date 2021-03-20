const labelService = require( '../service/label.service' )
const errTypes = require( '../constants/err-types' )
// 检查标签是否存在
const checkLabel = async function ( ctx, next ) {
    const { name } = ctx.request.body
    if ( !name ) {
        const { labels } = ctx.request.body
        const newLabels = []
        for ( let item of labels ) {
            const label = {
                name: item
            }
            const result = await labelService.isExists( item )
            if ( !result ) {
                const createTable = await labelService.create( item )
                label.id = createTable.insertId
            } else {
                label.id = result.id
            }
            newLabels.push( label )
        }
        ctx.newLabel = newLabels
    } else {
        const result = await labelService.isExists( name )
        if ( result ) {
            const err = new Error( errTypes.LABEL_ALREADY_EXISTS )
            return ctx.app.emit( 'error', err, ctx )
        }
    }
    
    await next()
}

module.exports = {
    checkLabel: checkLabel
}


