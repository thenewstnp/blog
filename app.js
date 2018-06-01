const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const Cookies = require("cookies");

const exphbs = require("express-handlebars");

const app = express();

const User = require("./models/User");

app.use("/public", express.static(__dirname + "/public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  req.cookies = new Cookies(req, res);
  req.userInfo = {};
  if(req.cookies.get("userInfo")) {
    try {
      req.userInfo = JSON.parse(req.cookies.get("userInfo"));
      User.findById(req.userInfo._id).then(function(userInfo) {
        req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
        next();
      })
    }catch(e) {
      next();
    }
  }else {
    next();
  }
})

app.use("/admin", require("./routers/admin"));
app.use("/api", require("./routers/api"));
app.use("/", require("./routers/main"));


mongoose.connect("mongodb://localhost/blog", err => {
  if (err) {
    console.log("数据库连接失败");
  } else {
    console.log("数据库连接成功");
    const port = 3000;
    app.listen(port, () => {
      console.log(`服务器启动成功，地址:http://localhost:` + port);
    });
  }
});

