const errTypes = require( '../constants/err-types' )

const errorHandle = function ( err, ctx ) {
    let status, message
    switch ( err.message ) {
        case errTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400
            message = '用户名或密码不能为空~'
            break
        case errTypes.USER_ALREADY_EXISTS:
            status = 409
            message = '用户名已存在~'
            break
        case errTypes.USER_DOES_NOT_EXISTS:
            status = 400
            message = '用户名不存在~'
            break
        case errTypes.WRONG_USER_NAME_OR_PASSWORD:
            status = 400
            message = '用户名或密码错误~'
            break
        case errTypes.UNAUTHORISED:
            status = 401
            message = '无效的token~'
            break
        case errTypes.CONTENT_IS_EMPTY:
            status = 400
            message = '发布内容不得为空~'
            break
        case errTypes.INSUFFICIENT_PERMISSIONS:
            status = 403
            message = '权限不足~'
            break
        case errTypes.COMMENT_CANNOT_BE_EMPTY:
            status = 400
            message = '评论内容不能为空~'
            break
        case errTypes.COMMENT_ACTIVITY_CANNOT_BE_EMPTY:
            status = 400
            message = '评论的动态不能为空~'
            break
        case errTypes.NO_SUCH_MOMENT:
            status = 400
            message = '不能评论不存在的动态~'
            break
        case errTypes.PARAMETER_CANNOT_BE_EMPTY:
            status = 400
            message = '参数不能为空~'
            break
        case errTypes.LABEL_ALREADY_EXISTS:
            status = 400
            message = '标签已存在,请勿重复创建~'
            break
        case errTypes.PARAMETER_ERROR:
            status = 400
            message = '参数出错'
            break
        default:
            status = 404
            message = 'NOT FOUND'
    }
    ctx.status = status
    ctx.body = message
}
module.exports = errorHandle
