const jwt = require( 'jsonwebtoken' )

const {
    NAME_OR_PASSWORD_IS_REQUIRED,
    USER_DOES_NOT_EXISTS,
    WRONG_USER_NAME_OR_PASSWORD,
    UNAUTHORISED,
    INSUFFICIENT_PERMISSIONS,
    COMMENT_CANNOT_BE_EMPTY
} = require( '../constants/err-types' )

const { PUBLIC_KEY } = require( '../app/config' )

const encryptPassword = require( '../utils/password.encrypt' )
const authService = require( '../service/auth.service' )
const momentService = require( '../service/moment.service' )

const loginCheck = async ( ctx, next ) => {
    const { username, password } = ctx.request.body
    // 判断用户名和密码是否为空
    if ( !username || !password ) {
        const err = new Error( NAME_OR_PASSWORD_IS_REQUIRED )
        return ctx.app.emit( 'error', err, ctx )
    }
    // 校验数据库内是否有这个用户
    const userresult = await authService.getUserName( username )
    if ( !userresult.length ) {
        const err = new Error( USER_DOES_NOT_EXISTS )
        return ctx.app.emit( 'error', err, ctx )
    }
    
    // 给密码加密
    const passwordEncrypt = await encryptPassword( password ) === userresult[0].password
    if ( !passwordEncrypt ) {
        const err = new Error( WRONG_USER_NAME_OR_PASSWORD )
        return ctx.app.emit( 'error', err, ctx )
    }
    
    ctx.user = userresult
    
    // 校验用户名和密码是否正确
    await next()
}

// 验证 token 是否有效
const verifyAuth = async function ( ctx, next ) {
    const authorization = ctx.headers.authorization
    if ( !authorization ) {
        const err = new Error( UNAUTHORISED )
        return ctx.app.emit( 'error', err, ctx )
    }
    const token = authorization.replace( 'Bearer ', '' )
    try {
        // 从请求中取出 token
        const result = jwt.verify( token, PUBLIC_KEY, {
            algorithm: 'RS256'
        } )
        ctx.user = result
        await next()
    } catch ( error ) {
        // console.log(1)
        console.log(error.message)
        const err = new Error( UNAUTHORISED )
        ctx.app.emit( 'error', err, ctx )
    }
}

// 验证用户权限  发布修改动态权限
const verifyPermissions = async function ( ctx, next ) {
    // 以数组的形式返回 ctx.params 内的属性名
    const [ resourceKes ] = Object.keys( ctx.params )
    // 把 属性名后面的 Id 去掉 当做表名使用
    const tableName = resourceKes.replace( 'Id', '' )
    // 获取的是 ctx.params 内resourceKes的值 也就是 id 值
    const resourceId = ctx.params[resourceKes]
    const userid = ctx.user.id
    // 查询数据库中 要删除的moment 是否是该user发布的
    
    try {
        const result = await authService.verify_permissions( tableName, userid, resourceId )
        if ( !result.length ) throw new Error()
    } catch ( error ) {
        const err = new Error( INSUFFICIENT_PERMISSIONS )
        return ctx.app.emit( 'error', err, ctx )
    }
    await next()
}

// 验证用户权限, 是否修改的是自己的评论

module.exports = {
    loginCheck,
    verifyAuth,
    verifyPermissions
}

