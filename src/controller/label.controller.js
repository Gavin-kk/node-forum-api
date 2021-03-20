const labelService = require( '../service/label.service' )
const errTypes = require( '../constants/err-types' )

class LabelController {
    async create ( ctx, next ) {
        const { name } = ctx.request.body
        try {
            const result = await labelService.create( name )
            ctx.body = result
        } catch ( error ) {
            console.log( error )
            const err = new Error( errTypes.REQUEST_ERROR )
            ctx.app.emit( 'error', err, ctx )
        }
    }
    // 获取所有标签
    async labelList(ctx,next){
        const result = await labelService.labelList()
        ctx.body = result
    }
}

module.exports = new LabelController()
