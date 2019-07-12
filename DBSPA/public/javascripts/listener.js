$(document).ready(() => {
    // id = 'signupBtn'인 객체가 눌리면 다음 일을 수행
    $('#signupBtn').click(() => {
        const userid = $('#signupID').val(); 
        const userpw = $('#signupPW').val();
        const name = $('#signupName').val();
        const email = $('#signupEmail').val();
        const phone = $('#signupPhone').val();

        // 하나라도 입력을 안하는 경우, alert창을 띄우고 이벤트 종료
        if(userid === '') {
            alert('ID를 입력해주세요.');
        } else if(userpw === '') {
            alert('비밀번호를 입력해주세요. ');
        } else if(name === '') {
            alert('이름를 입력해주세요. ');
        } else if(email === '') {
            alert('Email을 입력해주세요. ');
        } else if(phone === '') {
            alert('핸드폰 번호를 입력해주세요. ');
        } else {
            // 모두 입력한 경우, 입력한 것을 객체의 key와 value로 만듬
            sendParams = {
                userid,
                userpw,
                name,
                email,
                phone
            };
            // 해당 객체를 post 방식으로 전송하며, app.js -> routes/signup.js로 가게 되고,
            // 해당 결과를 객체 형태로 변환하여 parsedData에 넣음
            $.post('/signup', sendParams, (data, status) => {
                const parsedData = JSON.parse(data);
                $('#signupMain').html(`<h2>${parsedData.txt}<br>`);
            });
        }
    });

    // id = 'loginBtn'인 객체가 눌리면 다음 일을 수행
    $('#loginBtn').click(() => {
        const userid = $('#loginID').val();
        const userpw = $('#loginPW').val();
        
        // 하나라도 입력을 안하는 경우, alert창을 띄우고 이벤트 종료
        if(userid === '') {
            alert('ID를 입력해주세요.');
        } else if(userpw === '') {
            alert('비밀번호를 입력해주세요. ');
        } else {
            // 모두 입력한 경우, 입력한 것을 객체의 key와 value로 만듬
            sendParams = {
                userid,
                userpw,
            };

            // 해당 객체를 post 방식으로 전송하며, app.js -> routes/login.js로 가게 되고,
            // 해당 결과를 객체 형태로 변환하여 parsedData에 넣음
            $.post('/login', sendParams, (data, status) => {
                // try block 안에 해당한다면, catch block을 수행하게 함
                try {
                    userid = '';
                    userpw = '';
                    alert(JSON.parse(data).txt);
                } catch(err) {
                    window.location.reload(true);
                }
            });
        }
    });

    // id = 'searchBtn'인 객체가 눌리면 다음 일을 수행
    $('#searchBtn').click(() => {
        const searchValue = $('#searchValue').val();
        sendParams = {
            searchValue
        }
        
        // 해당 객체를 post 방식으로 전송하며, app.js -> routes/search.js로 가게 됨
        $.post('/search', sendParams, (data, status) => {
            // try block 안에 해당한다면, catch block을 수행하게 함
            try {
                searchValue = '';
            } catch(err) {
                window.location.reload(true);
            }
        });
    });

    // id = 'signupClearBtn'인 객체가 눌리면 다음 일을 수행 
    $('#signupClearBtn').click(() => {
        // 해당하는 id들의 값들을 모두 ''로 만듬
        $('#signupID').val('');
        $('#signupPW').val('');
        $('#signupName').val('');
        $('#signupEmail').val('');
        $('#signupPhone').val('');
    });
    
    // id = 'loginClearBtn'인 객체가 눌리면 다음 일을 수행
    $('#loginClearBtn').click(() => {
        // 해당하는 id들의 값들을 모두 ''로 만듬
        $('#loginID').val('');
        $('#loginPW').val('');
    });
    
    // id = 'logoutBtn'인 객체가 눌리면 다음 일을 수행
    $('#logoutBtn').click(() => {
        // 2번째 인자를 get 방식으로 전송하며, app.js -> routes/logout.js로 가게 됨
        $.get('/logout', '',(data, status) => {
            location.reload(true);
        });
    });
});