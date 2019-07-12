var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    // get 방식으로 오는 경우, search.ejs file로 객체의 값들을 넘겨줌
    res.render('search', {
        loginState : req.session.loginState,
        loginID : req.session.userid,
        loginPW : req.session.userpw,
        loginName : req.session.name,
        loginEmail : req.session.email,
        loginPhone : req.session.phone,
        searchValue : req.session.searchValue,
    });
});

router.post('/', (req, res, next) => {
    const result = {
        txt : ''
    };

    // 사용자가 검색창에 입력을 한 경우에 해당하며
    // session.searchValue에 사용자가 입력한 값을 넣어줌
    // 그 후, 요청 경로를 /로 재지정함
    if(req.body.searchValue) {
        req.session.searchValue = req.body.searchValue;
        res.redirect('/');
    } else {
    // 사용자가 검색창에 입력을 안 한 경우에 해당하며
    // session.searchValue에 아무것도 없는 값을 준 뒤, 
    // 다시 검색을 요청한다는 txt를 넣고,
    // result를 JSON 형태로 변경한 뒤 호출된 곳으로 넘겨줌        
        req.session.searchValue = '';
        result.txt = '검색어 입력을 해주십시오. ';
        res.json(JSON.stringify(result));
    }
}); 

module.exports = router;