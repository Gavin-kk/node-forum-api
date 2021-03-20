const errTypes = require( '../constants/err-types' )
const { getUserByName } = require( '../service/user.service' )
const encryptPassword = require( '../utils/password.encrypt' )

const usernameVerification = async function ( ctx, next ) {
    console.log( ctx.request.body )
    // 判断用户是否输入了内容
    const { username, password } = ctx.request.body
    if ( !username || !password ) {
        const err = new Error( errTypes.NAME_OR_PASSWORD_IS_REQUIRED )
        return ctx.app.emit( 'error', err, ctx )
    }
    // 判断用户名是否已经注册过了
    const result = await getUserByName( username )
    if ( result.length ) {
        const err = new Error( errTypes.USER_ALREADY_EXISTS )
        return ctx.app.emit( 'error', err, ctx )
    }
    await next()
}
const encryptionPassword = async ( ctx, next ) => {
    const { password } = ctx.request.body
    // console.log(password)
    ctx.request.body.password = await encryptPassword( password )
    await next()
}

module.exports = {
    usernameVerification,
    encryptionPassword
}
