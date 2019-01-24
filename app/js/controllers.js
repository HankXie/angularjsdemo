'use strict';

/* Controllers */


function LoginCtrl($scope,Conf,$http,HttpRq,$location,Storage) {
    $(function(){
        //得到焦点
        $("#password").focus(function(){
            $("#left_hand").animate({
                left: "150",
                top: " -38"
            },{step: function(){
                    if(parseInt($("#left_hand").css("left"))>140){
                        $("#left_hand").attr("class","left_hand");
                    }
                }}, 2000);
            $("#right_hand").animate({
                right: "-64",
                top: "-38px"
            },{step: function(){
                    if(parseInt($("#right_hand").css("right"))> -70){
                        $("#right_hand").attr("class","right_hand");
                    }
                }}, 2000);
        });
        //失去焦点
        $("#password").blur(function(){
            $("#left_hand").attr("class","initial_left_hand");
            $("#left_hand").attr("style","left:100px;top:-12px;");
            $("#right_hand").attr("class","initial_right_hand");
            $("#right_hand").attr("style","right:-112px;top:-12px");
        });
    });

    $scope.userinfo={
        name:"",
        password:""
    };
    var tokeninfo=Storage.get("token");
    if(tokeninfo!=null&&tokeninfo!=undefined){
        $scope.userinfo=tokeninfo;
    }

    $scope.login = function () {
        var parm={
            name:$scope.userinfo.name,
            password:$scope.userinfo.password
        };
        userLogin(parm);
    };

    $scope.register = function () {
        alert("注册");
    };

    $scope.forget = function () {
        alert("忘记密码");
    };


    function userLogin(opt) {
        HttpRq.post(Conf.API.MYHOST+'/authentication',opt,
            function(res){
                var result = typeof res == 'string' ? JSON.parse(res) : res;
                var data = result.data;
                if(result.flag==0){
                    var token={
                        name:data.user.name,
                        password:opt.password,
                        token:data.token};
                    Storage.set('token',token);
                    alert('登陆成功');
                    $location.path('/home');
                }else{
                    alert('登陆失败：'+result.error);
                }
            }, function(err){
                alert('登陆失败');
            });
    }

}


function HomeCtrl($scope,$location,HttpRq,$http) {
    $scope.title="南京小电年会抽奖系统";

    var xinm = new Array();
    var phone = new Array();
    var pcount=0;//参加人数
    $http.get('file/employeejson.json').success(function(data) {
        for(var i=0;i<data.length;i++){
            xinm[i]="img/employee/"+data[i].imgname;
            phone[i]=data[i].name;
        }
        pcount = xinm.length;//参加人数
        $(function () {
            nametxt.css('background-image','url('+xinm[0]+')');
            phonetxt.html(phone[0]);
        });
    });

    var nametxt = $('.slot');
    var phonetxt = $('.name');
    var runing = true;
    var trigger = true;
    var inUser = (Math.floor(Math.random() * 10000)) % 2 + 1;
    var num = 0;
    var Lotterynumber = 1; //设置单次抽奖人数
    var t=0;
    var stopTime=0;

    //开始抽奖
    $scope.startlucky=function () {
        start();
    };

// 开始停止
    function start() {

        if (runing) {

            if ( pcount <= Lotterynumber ) {
                alert("抽奖人数不足1人");
            }else{
                runing = false;
                $('#start').text('停止');
                startNum()
            }

        } else {
            //$('#start').text('自动抽取中('+ Lotterynumber+')');
            $('#start').text('自动抽取中');
            zd();
        }

    }

// 开始抽奖

    function startLuck() {
        runing = false;
        $('#btntxt').removeClass('start').addClass('stop');
        startNum()
    }

// 循环参加名单
    function startNum() {
        num = Math.floor(Math.random() * pcount);
        nametxt.css('background-image','url('+xinm[num]+')');
        phonetxt.html(phone[num]);
        t = setTimeout(startNum, 0);
    }

// 停止跳动
    function stop() {
        pcount = xinm.length-1;
        clearInterval(t);
        t = 0;
    }

// 打印中奖人

    function zd() {
        if (trigger) {

            trigger = false;
            var i = 0;

            if ( pcount >= Lotterynumber ) {
                stopTime = window.setInterval(function () {
                    if (runing) {
                        runing = false;
                        $('#btntxt').removeClass('start').addClass('stop');
                        startNum();
                    } else {
                        runing = true;
                        $('#btntxt').removeClass('stop').addClass('start');
                        stop();

                        i++;
                        Lotterynumber--;

                        //$('#start').text('自动抽取中('+ Lotterynumber+')');
                        $('#start').text('自动抽取中');

                        if ( i == 1 ) {
                            console.log("抽奖结束");
                            window.clearInterval(stopTime);
                            $('#start').text("开始");
                            Lotterynumber = 1;
                            trigger = true;
                        };

                        /*if ( Lotterynumber == inUser) {
                            // 指定中奖人
                            nametxt.css('background-image','url(img/10.jpg)');
                            phonetxt.html('幽兰');
                            $('.luck-user-list').prepend("<li><div class='portrait' style='background-image:url(img/10.jpg)'></div><div class='luckuserName'>幽兰</div></li>");
                            $('.modality-list ul').append("<li><div class='luck-img' style='background-image:url(img/10.jpg)'></div><p>幽兰</p></li>");
                            inUser = 9999;
                        }else{*/
                        //打印中奖者名单
                        $('.luck-user-list').prepend("<li><div class='portrait' style='background-image:url("+xinm[num]+")'></div><div class='luckuserName'>"+phone[num]+"</div></li>");
                        $('.modality-list ul').append("<li><div class='luck-img' style='background-image:url("+xinm[num]+")'></div><p>"+phone[num]+"</p></li>");
                        //将已中奖者从数组中"删除",防止二次中奖
                        xinm.splice($.inArray(xinm[num], xinm), 1);
                        phone.splice($.inArray(phone[num], phone), 1);
                        //};
                    }
                },1000);
            };
        }
    }

}


function DetailCtrl($scope,Conf,$http,HttpRq,$location) {
    $scope.text='detail页面';
}