const path = require( 'path' )

const jimp = require( 'jimp' )
const multer = require( 'koa-multer' )
const { AVATAR_PATH, PICTURE_PATH } = require( '../constants/file-path' )

const avatarStorage = multer.diskStorage( {
    destination: `${ AVATAR_PATH }`,
    filename: ( ctx, file, cb ) => {
        const extname = path.extname( file.originalname )
        const name = path.basename( file.originalname, extname )
        const filename = name + extname
        cb( null, filename )
    }
} )

const avatarUpload = multer( { storage: avatarStorage } )
const avatarHandler = avatarUpload.single( 'avatar' )

const pictureStorage = multer.diskStorage( {
    destination: `${ PICTURE_PATH }`,
    filename: ( ctx, file, cb ) => {
        const extname = path.extname( file.originalname )
        const name = path.basename( file.originalname, extname )
        const filename = name + extname
        cb( null, filename )
    }
} )
const pictureUpload = multer( { storage: pictureStorage } )
const pictureHandler = pictureUpload.array( 'picture', 9 )

// 修改图片大小
const modifyPictureSize = async ( ctx, next ) => {
    // 1. 获取所有的图像信息
    const files = ctx.req.files
    for ( let item of files ) {
        const destPath = path.join( item.destination, item.originalname )
        const suffix = path.extname( item.originalname )
        // 使用 jimp 库读取上传的文件 返回 promise 处理图片需要时间 所以最好使用 promise 方式
        jimp.read( item.path ).then( image => {
            // jimp.auto 是宽度1200 高度 自适应 write 写入 地址
            image.resize( 1200, jimp.AUTO ).write( `${ destPath }-large${ suffix }` )
            image.resize( 640, jimp.AUTO ).write( `${ destPath }-middle${ suffix }` )
            image.resize( 320, jimp.AUTO ).write( `${ destPath }-small${ suffix }` )
        } )
    }
    await next()
}
module.exports = {
    avatarHandler,
    pictureHandler,
    modifyPictureSize
}

