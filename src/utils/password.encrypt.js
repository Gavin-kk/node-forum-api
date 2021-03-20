const crypto = require('crypto')
const encryptPassword = async function (password) {
    const md5 = crypto.createHash('md5')
    const result = await md5.update(password).digest('hex')
    return result
}
module.exports = encryptPassword
