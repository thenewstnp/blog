const express = require("express");

const router = express.Router();

router.use(function(req, res, next) {
    if(!req.userInfo.isAdmin) {
        res.send("<h2>只有管理员才可以进入后台管理系统</h2>");
        return;
    }
    next();
})

router.get("/", function(req, res, next) {
    res.render('admin/index');
})

module.exports = router;