var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', (req, res, next) => {
    // get 방식으로 오는 경우, login.ejs file로 객체의 값들을 넘겨줌
    res.render('login', {
        loginState : req.session.loginState,
        loginID : req.session.userid,
        loginPW : req.session.userpw,
        loginName : req.session.name,
        loginEmail : req.session.email,
        loginPhone : req.session.phone,
    });
});

router.post('/', (req, res, next) => {
    const result = {
        txt : ''
    };

    const con = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'root',
        database : 'enrollment'
    });

    con.connect((err) => {
        if(err) {
            return console.error(err.message);
        }
        console.log('DB Connect: ', req.body.userid);
        // sql injection에 취약하다는 단점이 있음.
        const sql = 
        `select * from member where id = '${req.body.userid}'`;
        console.log(sql);
        con.query(sql, (err, rs, fields) => {
            if(err) {
                console.error(err.message);
                result.txt = '다시 로그인해주세요';
                res.json(JSON.stringify(result));
            } else {
                if(rs[0] && rs[0].name) {
                    console.log(rs[0].name);
                    req.session.userid = req.body.userid;
                    req.session.name = rs[0].name;
                    req.session.loginState = true;
                    res.redirect('/');
                } else {
                    result.txt = '다시 로그인해주세요';
                    res.json(JSON.stringify(result));
                }
            }
            con.end((err) => {
                if(err) {
                    return console.error(err.message);
                }
                console.log('con close');
            });
        });
    });

    /* DB 없이 Project를 했을때 썻던 code
    // session에 담긴 userid와 userpw 2개와 사용자가 입력한 userid와 userpw가 같은지 확인함
    // 맞는 경우 loginState 값을 true로 한 뒤, 요청 경로를 /로 재지정함
    if((req.session.userid === req.body.userid) && (req.session.userpw === req.body.userpw)) {
        req.session.loginState = true;
        res.redirect('/');
    } else {
    // 틀린 경우 result.txt에 2개 중 하나가 틀렸다고 값을 넣어준 뒤,
    // result를 JSON 형태로 변경한 뒤 호출된 곳으로 넘겨줌
        result.txt = 'ID 혹은 PW가 틀렸습니다. 다시 로그인 해주십시오. ';
        res.json(JSON.stringify(result));
    }
    */
});

module.exports = router;