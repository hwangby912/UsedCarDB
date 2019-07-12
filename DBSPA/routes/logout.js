var express = require('express');
var router = express.Router()

router.get('/', (req, res, next) => {
    // get 방식으로 오는 경우 수행되며, 
    // session.email에 값이 있다면 session을 파기하고 
    // 요청 경로를 /로 재지정함
    if(req.session.userid) {
        req.session.destroy((err) => {
            res.redirect('/');
        });
    }
});

module.exports = router;