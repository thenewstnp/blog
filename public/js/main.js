// project util.js
$(function(){

    // 登录注册切换
    $('.j_userTab span').on('click',function(){
        var _index = $(this).index();
        $(this).addClass('user_cur').siblings().removeClass('user_cur');
        $('.user_login,.user_register').hide();
        if( _index==0 ){
            $('.user_login').css('display','inline-block');
            $('.user_register').hide();
        }else{
            $('.user_login').hide();
            $('.user_register').css('display','inline-block');
        }
    });

    // 登录校验
    var reg = /^[^<>"'$\|?~*&@(){}]*$/;
    var $login = $('#login');
    var $register = $('#register');
    $('.user_login_btn').on('click',function(){
        if( $login.find('.user_input').eq(0).find('input').val().trim() == '' ){
            $login.find('.user_err span').text('用户名不能为空').show();
            return false;
        }
        if( !reg.test($login.find('.user_input').eq(0).find('input').val().trim()) ){
            $login.find('.user_err span').text('用户名不能含有特殊字符').show();
            return false;
        }
        if( $login.find('.user_input').eq(1).find('input').val().trim() == '' ){
            $login.find('.user_err span').text('密码不能为空').show();
            return false;
        }
        if( !reg.test($login.find('.user_input').eq(1).find('input').val().trim()) ){
            $login.find('.user_err span').text('密码不能含有特殊字符').show();
            return false;
        }
        $login.find('.user_err span').text('').hide();
        $.ajax({
            url: "/api/user/login",
            type: "post",
            dataType:"json",
            data:{
                username: $("#login").find('[name="username"]').val(),
                password: $("#login").find('[name="password"]').val()
            }
            }).then(function(data){
                // console.log(data);
                $login.find('.user_err span').text(data.message).show();
                if(data.code == 0){
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000)
                }
        });
    });

    $('.user_logined').on('click', '.user_loginOut', function() {
       $.ajax({
           url: "/api/user/logout"
       }).then(function(data) {
            if(!data.code) {
                window.location.reload();
            }
       })
    })

    $('.user_register_btn').on('click',function(){
        if( $register.find('.user_input').eq(0).find('input').val().trim() == '' ){
            $register.find('.user_err span').text('用户名不能为空').show();
            return false;
        }
        if( !reg.test($register.find('.user_input').eq(0).find('input').val().trim()) ){
            $register.find('.user_err span').text('用户名不能含有特殊字符').show();
            return false;
        }
        if( $register.find('.user_input').eq(1).find('input').val().trim() == '' ){
            $register.find('.user_err span').text('密码不能为空').show();
            return false;
        }
        if( !reg.test($register.find('.user_input').eq(1).find('input').val().trim()) ){
            $register.find('.user_err span').text('密码不能含有特殊字符').show();
            return false;
        }
        if( $register.find('.user_input').eq(1).find('input').val().trim() != $register.find('.user_input').eq(2).find('input').val().trim()){
            $register.find('.user_err span').text('两次输入的密码不一致').show();
            return false;
        }
        $register.find('.user_err span').text('').hide();
        $.ajax({
            url: "/api/user/register",
            type: "post",
            dataType:"json",
            data:{
                username: $("#register").find('[name="username"]').val(),
                password: $("#register").find('[name="password"]').val(),
                repassword: $("#register").find('[name="repassword"]').val()
            }
            }).then(function(data){
                $register.find('.user_err span').text(data.message).show();
                if(data.code == 0){
                    setTimeout(function() {
                    $('.user_login').css('display','inline-block');
                    $('.user_register').hide();
                    $(".user_tab span").eq(0).addClass("user_cur");
                    $(".user_tab span").eq(1).removeClass("user_cur");
                },1000)
            }
        });
    });

    // 打字效果
    var str = 'hello world';
    var i = 0;
    function typing(){
        var divTyping = $('.banner h2');
        if (i <= str.length) {
            divTyping.text( str.slice(0, i++) + '_' );
            setTimeout(function(){typing()}, 200);
        }else{
            divTyping.text( str );
        }
    }
    typing();
});