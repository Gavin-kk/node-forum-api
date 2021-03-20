const fs = require( 'fs' )
const path = require( 'path' )
const send = require( 'koa-send' )
const urllib = require( 'urllib' )
const errTypes = require( '../constants/err-types' )

const uploadService = require( '../service/upload.service' )
const { AVATAR_PATH } = require( '../constants/file-path' )

class UploadController {
    async fileController ( ctx, next ) {
        const { mimetype, originalname, size } = ctx.req.file
        const { id } = ctx.user
        // 将图像地址的数据保存到数据中
        await uploadService.createAvatar( mimetype, originalname, size, id )
        // 将图像地址保存到user表中
        const url = `http://localhost:8080/${ AVATAR_PATH }/${ originalname }`
        await uploadService.addAvatarURL( url, id )
        ctx.body = {
            status: 200,
            msg: 'ok'
        }
        // const result =
    }
    
    // 获取某位用户的头像接口
    async getUserAvatar ( ctx, next ) {
        const { userId } = ctx.params
        const result = await uploadService.queryUserAvatar( userId )
        // let file = await urllib.request('')
        // 设置响应头 告诉浏览器本次响应的是什么类型的文件 不设置这个会直接下载
        ctx.response.set( 'Content-Type', result.mimeType )
        // ctx.response.set('Content-disposition',`attachment;filename=${path.extname(result.filename)}`)
        // 提供头像信息
        ctx.body = fs.createReadStream( `${ AVATAR_PATH }/${ result.filename }` )
        
    }
    
    // 上传动态配图
    async uploadMomentPicture ( ctx, next ) {
        const { id } = ctx.user
        const { momentId } = ctx.query
        const files = ctx.req.files
        try {
            for ( let item of files ) {
                await uploadService.uploadMomentPicture(
                    item.originalname,
                    item.mimetype,
                    item.size, id,
                    momentId
                )
            }
            ctx.body = {
                status: 200,
                msg: 'ok'
            }
        } catch ( err ) {
            console.log( err.message )
        }
        
    }
}

module.exports = new UploadController()
