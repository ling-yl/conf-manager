const express = require('express')
const passport = require('passport')
const { notAuthenticated } = require('../config/auth')
const { ensureAuthenticated } = require('../config/auth')
const editUser = require('../handler/editUser')

const router = express.Router()

// 登入頁面
router.get('/login', notAuthenticated, (req, res) => {
    res.render('login', {
        title: '登入'
    })
})

// 登入
router.post('/login', passport.authenticate('local', { // 使用 passport 做登入驗證
    successRedirect: '/', // 登入成功，前往會議列表
    failureRedirect: '/users/login' // 登入失敗，前往登入頁
}))

// 登出
router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success', '您已成功登出！')
    res.redirect('/users/login')
    console.log(req.session)
    console.log('User', req.user)
})

// 會員資訊頁
router.get('/info', ensureAuthenticated, (req, res) => {

    const { _id, staffId, name, position, email, password } = req.user

    res.render('userInfo', {
        title: '會員中心',
        name: name,
        user: { _id, staffId, position, email, password }
    })
})

// 修改會員資料
router.post('/info', ensureAuthenticated, (req, res) => {
    // console.log(req.body.name)
    editUser(req.user._id, req.body).then((data) => {
        if (data) {
            req.flash('success', '您已成功修改個人資料')
        } else {
            req.flash('warning', '修改失敗，請再試一次')
        }
        res.redirect(`/users/info`)
    })
})

module.exports = router