var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // get 방식으로 오는 경우, index.ejs file로 객체의 값들을 넘겨줌
  res.render('index', {
    loginState : req.session.loginState,
    loginID : req.session.userid,
    loginPW : req.session.userpw,
    loginName : req.session.name,
    loginEmail : req.session.email,
    loginPhone : req.session.phone,
  });
});

module.exports = router;
