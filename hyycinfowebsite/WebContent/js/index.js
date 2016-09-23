$(function(){
    $("img").lazyload({effect: "fadeIn",threshold : 200});//图片懒加载
    if(window.innerWidth<768){
        $('<span id="shownav"></span>').appendTo($('body'));
        $('#shownav').click(function(e){
            $('#nav').toggle();        
        });
        $('#nav li').click(function(){
            $('#nav').hide();
            $('#shownav').show();
        })
    }else{
        $('#shownav').remove();
    }
    window.onscroll=function(){//离开顶部触发
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        if( t>0 ){
            $('#arrow_up').fadeIn();
            if(window.innerWidth<1024 && window.innerWidth>768){
                $('#nav').css('top','0');
            }
        }else{
            $('#arrow_up').fadeOut();
            if(window.innerWidth<1024 && window.innerWidth>768){
                $('#nav').css('top','60px');
            }
        }
    }
    $('#arrow_up').click(function(){//返回到浏览器顶部
        $('html,body').animate({'scrollTop':0},300);
    });

    $('#code').hover(function(e){//显示二维码
        $('body').append( $('<div id="mycode"><img src="images/code.png" style="float: left;"></div>') );
        $('#mycode').css({
            'left': (e.pageX-220)+'px',
            'top': (e.pageY-220)+'px'
        }).show();
    },function(){
        $('#mycode').remove();
    });

    $('#code').mousemove(function(e){
        $('#mycode').css({
            'left': (e.pageX-220)+'px',
            'top': (e.pageY-220)+'px'
        });
    });

    $('#toggle_team span').mouseover(function(){//切换团队
        if( $(this).index() == 0){
            $(this).addClass('choice_team').siblings().removeClass('choice_team');
            $('#teacher_team').show();
            $('#manage_team').hide();
        }else{
            $(this).addClass('choice_team').siblings().removeClass('choice_team');
            $('#teacher_team').hide();
            $('#manage_team').show();
        }
    });

    $('#teacher_content ul li').hover(function(e) {//教师简介
        var thisid = $(this).attr('id');
        var parentoffset = $('#teacher_content').offset();
        $(this).find('#'+thisid+'_intro').css({
            'left': (e.pageX-parentoffset.left)-120,
            'top': (e.pageY-parentoffset.top)+30
        }).fadeIn('normal');
    },function(e) {
        var thisid = $(this).attr('id');
        $(this).find('#'+thisid+'_intro').hide();
    });
    $('#teacher_content ul li').mousemove(function(e) {
        var thisid = $(this).attr('id');
        var parentoffset = $('#teacher_content').offset();
        $(this).find('#'+thisid+'_intro').css({
            'left': (e.pageX-parentoffset.left)-120,
            'top': (e.pageY-parentoffset.top)+30
        });
    });

    $('#course_img').on('contextmenu',function(){
        return false;
    });

    $('#project ul li').hover(function(e) {//切换课程
        $('body').append($('<div id="showBigimg"></div>'));
        var imgname = $(this).find('img').attr('src').replace('.','_b.');
        var getleft = ( e.pageX - $(this).offset().left ) / $(this).width();
        var gettop = ( e.pageY - $(this).offset().top ) / $(this).height();
        if( e.pageX < $(document).width()*0.6 ){
            $('#showBigimg').css({
                'left': (e.pageX+10)+'px',
                'top': (e.pageY+10)+'px',
                'background': 'url("'+imgname+'") no-repeat',
                'background-position': (getleft*100)+'% '+(gettop*100)+'%'
            }).show('normal');
        }else{
            $('#showBigimg').css({
                'left': (e.pageX-260)+'px',
                'top': (e.pageY+10)+'px',
                'background': 'url("'+imgname+'") no-repeat',
                'background-position': (getleft*100)+'% '+(gettop*100)+'%'
            }).show('normal');
        }
    },function(e) {
        $('#showBigimg').remove();
    });
    $('#project ul li').mousemove(function(e){
        var imgname = $(this).find('img').attr('src').replace('.','_b.');
        var getleft = ( e.pageX - $(this).offset().left ) / $(this).width();
        var gettop = ( e.pageY - $(this).offset().top ) / $(this).height();
        if( e.pageX< $(document).width()*0.6 ){
            $('#showBigimg').css({
                'left': (e.pageX+10)+'px',
                'top': (e.pageY+10)+'px',
                'background': 'url("'+imgname+'") no-repeat',
                'background-position': (getleft*100)+'% '+(gettop*100)+'%'
            });
        }else{
            $('#showBigimg').css({
                'left': (e.pageX-260)+'px',
                'top': (e.pageY+10)+'px',
                'background': 'url("'+imgname+'") no-repeat',
                'background-position': (getleft*100)+'% '+(gettop*100)+'%'
            });
        }
    });

    $('#blog_content ul li').click(function(){
        var showname = $(this).attr('id')+'_show';
        $(this).addClass('current_article').siblings().removeClass('current_article');
        $('#blog_content div').hide();
        $('#'+showname).show();
    });

    //图片轮播
    var picTimer;
    var actwidth = $('#act_content ul li').length * $('#act_content ul li').innerWidth();
    $('#act_content ul')[0].innerHTML += $('#act_content ul').html();
    $('#act_content ul')[0].style.width = actwidth*2 + 'px';
    $('#act_content ul').hover(function(){
        clearInterval(picTimer);
    },function(){
        picTimer = setInterval(function(){
            $('#act_content ul')[0].style.left = $('#act_content ul')[0].offsetLeft -5 +'px';
            if($('#act_content ul')[0].offsetLeft <= -actwidth ){
                $('#act_content ul')[0].style.left = 0;
            }
        },50);
    }).trigger('mouseout');

    $('#course_content ul li').mouseover(function() {
        var imgsrc = $(this).find('span').text();
        $(this).addClass('course_current').siblings().removeClass('course_current');
        $('#course_img img')[0].src ='images/'+ imgsrc + '.png';
        $('#course_img img')[0].alt = imgsrc;
    });

});