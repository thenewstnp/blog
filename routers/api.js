const express = require("express");

const router = express.Router();

const User = require("../models/User");

var responseData;

router.use(function(req, res, next) {
    responseData = {
        code: 0,
        message: ""
    }
    next();
})


/**
 * 用户注册
 */
router.post("/user/register", function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    User.findOne({
        username: username
    }).then(function(userInfo) {
        if(userInfo){
            responseData.code = 2;
            responseData.message = "用户已存在";
            res.json(responseData);
            return false;
        } else {
            var user = new User({
                username: username,
                password: password
            });
            return user.save();
        }
    }).then(function (newUserInfo) {
        // console.log(newUserInfo);
        responseData.code = 0;
        responseData.message = "注册成功";
        res.json(responseData);
    })
})

/**
 * 用户登录
 */
router.post("/user/login", function(req, res, next){

    var username = req.body.username;
    var password = req.body.password;

    User.findOne({
        username: username,
        password: password
    }).then(function(userInfo) {
        // console.log(userInfo);
        if(!userInfo){
            responseData.code = 1;
            responseData.message = "用户名或密码错误";
            res.json(responseData);
            return;
        }
        responseData.code = 0;
        responseData.userInfo = {
            _id: userInfo._id,
            username: userInfo.username
        }
        req.cookies.set("userInfo", JSON.stringify({
            _id: userInfo._id,
            username: userInfo.username
        }));
        responseData.message = "登陆成功";
        res.json(responseData);
        return;
    })

})

/**
 * 用户退出
 */
router.get("/user/logout", function(req, res, next) {
    req.cookies.set("userInfo", null);
    res.json(responseData);
})

module.exports = router;
