var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', (req, res, next) => {
    // get 방식으로 오는 경우, signup.ejs file로 객체의 값들을 넘겨줌
    res.render('signup', {
        loginState : req.session.loginState,
        loginID : req.session.userid,
        loginPW : req.session.userpw,
        loginName : req.session.name,
        loginEmail : req.session.email,
        loginPhone : req.session.phone,
    });
});

router.post('/', (req, res, next) => {
    // post 방식으로 오는 경우, req.body 안에 담긴 값들을 req.session 에 매칭되는 곳으로 넘겨줌
    req.session.userid = req.body.userid;
    req.session.userpw = req.body.userpw;
    req.session.name = req.body.name;
    req.session.email = req.body.email;
    req.session.phone = req.body.phone;

    const result = {
        txt : '회원 가입 오류'
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
        console.log('DB Connection', `${req.body.userid} : ${req.body.userpw} : ${req.body.name} : ${req.body.email} : ${req.body.phone}`);
        const sql = `insert into member(id, password, name, email, phone) values('${req.body.userid}', '${req.body.userpw}', '${req.body.name}', '${req.body.email}', '${req.body.phone}')`;
        console.log(sql);
        con.query(sql, (err, results, fields) => {
            if(err) {
                console.error(err.message);
                res.json(JSON.stringify(results));
            } else {
                console.log(results, fields);
                result.txt = `회원 가입을 축하드립니다. ${req.body.name}님`;
                res.json(JSON.stringify(result));
            }
            con.end((err) => {
                if(err) {
                    return console.error(err.message);
                }
            });
        });
    });
});

module.exports = router;