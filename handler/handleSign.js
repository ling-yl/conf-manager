const Conf = require('../models/schema/conference')
const ChairSign = require('../models/schema/chairSign')
const RoomSign = require('../models/schema/roomSign')


// 處理主持人簽核
async function handleChairSign(confId, isSign) {
    if (isSign === '1') { // 核准→不可再次審核
        try {
            await Conf.updateOne({ _id: confId }, { isChairSign: 1 }) // 更新會議主檔
            await ChairSign.updateOne({ confId: confId }, { isSign: 1 }) // 更新主持人簽核檔
            return { isSuccess: true, isAllow: true }
        } catch (error) {
            return { isSuccess: false }
        }

    } else { // 駁回→可修改後再次審核
        try {
            await Conf.updateOne({ _id: confId }, { isChairSign: 2 }) // 更新會議主檔
            await ChairSign.updateOne({ confId: confId }, { isSign: 2 }) // 更新主持人簽核檔
            return { isSuccess: true, isAllow: false }
        } catch (error) {
            return { isSuccess: false }
        }
    }
}

// 處理空間負責人簽核
async function handleRoomSign(confId, isSign) {

    if (isSign === '1') { // 核准→不可再次審核
        try {
            await Conf.updateOne({ _id: confId }, { isRoomSign: 1 }) // 更新會議主檔
            await RoomSign.updateOne({ confId: confId }, { isSign: 1 }) // 更新會議室簽核檔
            return { isSuccess: true, isAllow: true }
        } catch (error) {
            return { isSuccess: false }
        }

    } else { // 駁回→可修改後再次審核
        try {
            await Conf.updateOne({ _id: confId }, { isRoomSign: 2 }) // 更新會議主檔
            await RoomSign.updateOne({ confId: confId }, { isSign: 2 }) // 更新會議室簽核檔
            return { isSuccess: true, isAllow: false }
        } catch (error) {
            return { isSuccess: false }
        }
    }
}


module.exports = { handleChairSign, handleRoomSign }