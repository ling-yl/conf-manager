const User = require('../models/schema/user')

module.exports = async (userId, editData) => {

    // 生成更新資料
    const updateItem = { name: editData.name }

    try {
        await User.updateOne({ _id: userId }, updateItem) // 更新員工檔
        return true // 回傳true

    } catch (error) { // 如果發生錯誤
        console.log(error)
        return false // 回傳false
    }
}

