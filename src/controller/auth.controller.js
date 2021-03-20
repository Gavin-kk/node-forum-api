const { PUBLIC_KEY, PRIVATE_KEY } = require( '../app/config' )
const jwt = require( 'jsonwebtoken' )

class AuthMiddleware {
    async login ( ctx, next ) {
        
        const [ { id, username } ] = ctx.user
        
        const token = await jwt.sign( { id, username }, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24,
            algorithm: 'RS256'
        } )
        
        ctx.body = {
            id,
            username,
            token
        }
    }
    
    async success ( ctx, next ) {
        ctx.body = '验证成功'
    }
}

module.exports = new AuthMiddleware()
