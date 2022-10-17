$(document).ready(function(){
    // function isIpad() {
    //     return navigator.userAgent.match(/iPad/i) != null;
    // }
	function setContentSize() {
        var ww = $(window).width();
        var dw = $(document).width();
        var wh = $(window).height();


        $(".main-content .block-wall .hot-list h5, .main-content .block-wall .hot-list li").css({
            height: $(".main-content .block-wall .hot-list").height()/6,
            lineHeight: $(".main-content .block-wall .hot-list").height()/6 + 'px'
        });



        $(".cmsMainBox .double-list ul li").css({width: ($(".cmsMainBox").width()-20)/2});
        $(".cmsPage .gallery .cms-swiper .swiper-slide .pic").css({height: $(".cmsMainBox").width()*0.67});
        $(".cmsPage .gallery .cms-button-prev,  .cmsPage .gallery .cms-button-next").css({top: ($(".cmsMainBox").width()*0.67 - 112)/2});
        $(".cmsPage .gallery .full-screen").css({top: $(".cmsMainBox").width()*0.67});
        $(".main-content.announcement").css({height: 'auto'});
        $(".food-iframe-box iframe").css({height: wh});
        $('.media-box.full .inner').css({height: ww*0.66*9/16 + 55});
        $('.media-box.full .inner.tencent').css({height: ww*0.66*9/16 + 92});
        if ((ww>768)&&(ww!=1024)) {
            $(".cmsPage iframe, .cmsPage embed, cmsPage .youku").css({height: $(".cmsMainBox").width()*9/16+41});
        }
        if(ww==768) {
            $(".full-banner img").css({height: wh, width:'auto'});
            $(".comming-soon .map").css({height: wh-110});
            $(".main-content.map, .main-content.map .map-wrap, .main-content.map .map-wrap #baiduMap").css({width: ww, height: wh-53});
        }
        if ((ww<=768)||(ww==1024)) {
            $(".cmsPage iframe, .cmsPage embed, cmsPage .youku").css({height: $(".cmsMainBox").width()*9/16});
        }
        if(ww>750) {
            $(".recommend-list.mayLike li a .pic").css({height: (ww-80)/3})
        }
        if(ww>768) {
            $(".brace").css({height: wh-60});
            // $(".page-wrap.hasAd").css({top: wh-60});
            $(".full-banner").css({height: wh-60});
            // $(".full-banner button").css({top: wh-86-60});

            if(ww/(wh-60) > (1440/743)) {
                $(".full-banner img").css({width: ww, height:'auto'});
            }
            if(ww/(wh-60) < (1440/743)) {
                $(".full-banner img").css({height: wh-60, width:'auto'});
            }
            $(".cmsMainBox .double-list").css({width: $(".cmsMainBox").width() + 80});
            $(".image-news-slide .swiper-container, .image-news-slide .swiper-container .swiper-slide").css({height: wh-275, width: ww});
            $(".sidebar").css({height: 'auto'});
            $("header .main-nav").css({height: 'auto'});
            $(".related-news-swiper .swiper-slide").css({width: ($(".related-news-swiper").width()-60)/4});
            $(".pswp").css({height: wh-148});
            $(".comming-soon .map").css({width: ww, height: wh-120});
            $(".main-content.map, .main-content.map .map-wrap, .main-content.map .map-wrap #baiduMap").css({width: ww, height: wh-120});
            if(ww/(wh-120) > (1440/675)) {
                $(".comming-soon .map img").css({width: ww, height:'auto'});
            }
            if(ww/(wh-120) < (1440/675)) {
                $(".comming-soon .map img").css({height: wh-120, width:'auto'});
            }
            $(".block-wall .col-md-3.col-sm-4 .inner, .related-box .food-safety .inner").css({height: 341});
        }
        if(ww>970) {
            $(".recommend-list.mayLike li a .pic").css({height: (ww-100)/4});
        }
        if(ww>1159) {
            $(".image-news-slide .image-news-button-prev").css({left: ($(".image-news-slide").width()-1120)/2});
            $(".image-news-slide .image-news-button-next").css({right: ($(".image-news-slide").width()-1120)/2});
            $(".recommend-list.mayLike li a .pic").css({height: 265});
        }

        if(ww<1160) {
            $(".image-news-slide .image-news-button-prev").css({left: 20});
            $(".image-news-slide .image-news-button-next").css({right: 20});
        }
        if(ww<769) {
            $(".cmsMainBox .double-list").css({width: $(".cmsMainBox").width()});
            $(".image-news-slide .swiper-container, .image-news-slide .swiper-container .swiper-slide").css({height: (ww-30)*2/3, width: ww-30});
            $(".image-news-slide .image-news-button-prev").css({left: 15});
            $(".image-news-slide .image-news-button-next").css({right: 15});

            $(".sidebar").css({height: 0});
            $("header .main-nav").css({height: 0});

            $(".related-news-swiper .swiper-slide").css({width: ww-40});
            $(".main-content.announcement").css({height: wh - $("header").height() - $("footer").height()});
        }
        if(ww<768) {
            $(".pswp").css({height: wh});
            $(".full-banner img").css({height: 'auto', width:ww});
            $(".comming-soon .map").css({height: wh-53});
            $(".main-content.map .search-bar .input-box .result-box").css({width: ww});
            $(".main-content.map").css({width: ww, height: wh-53-54});
            $(".main-content.map .map-wrap, .main-content.map .map-wrap #baiduMap").css({width: ww, height: wh-53-60-54});
            $(".block-wall .col-md-3.col-sm-4 .inner, .related-box .food-safety .inner, .related-box .food-video .inner, .related-box .food-img-text .inner, .related-box .food-text .inner").css({height: (ww-20)*341/265});
            $('.media-box.full .inner').css({
                height: (ww-20)*9/16,
                width: ww-20
            });
            $('.classified-table table td.expand').click(function() {
                $(this).parents('table').siblings('table.sm').show();
            });
        }
        if(ww<750) {
            $(".recommend-list.mayLike li a .pic").css({height: (ww-40)/2});
        }
        if(ww<685) {
            $(".food-list .pic").css({height: (ww-60)/2});
        }

        // $(".block-wall .block").each(function(){
        //     $(this).height($(".block-wall .block:first").height());
        // });


        $(".image-news-slide .swiper-slide").each(function(){
            var _img = $(this).find("img");
            if(_img.width() / _img.height() > $(this).width() / $(this).height()) {
                _img.css({
                    width: $(this).width(),
                    height: "auto"
                });
            }
            else {
                _img.css({
                    width: "auto",
                    height: $(this).height()
                });
            }
        });

        //横屏
        if((ww/wh)>(1362/750)) {
            $("#landscape img").css({width: '100%', height: 'auto'});
        }
        if((ww/wh)<(1362/750)) {
            // $("#landscape img").css({height: '100%', width: 'auto'});
            $("#landscape img").css({width: '100%', height: 'auto'});
        }

        // if(($(".event-image-news").width()/$(".event-image-news").height()) > (640/398)) {
        //     $(".event-image-news img").css({width: '100%', height: 'auto'});
        // }
        // if(($(".event-image-news").width()/$(".event-image-news").height()) < (640/398)) {
        //     $(".event-image-news img").css({height: '100%', width: 'auto'});
        // }



    };
    setContentSize();




    //顶部菜单
    $(window).scroll(function() {
        if($(document).scrollTop()>0){
			$('header').addClass('shrink');
        }
        else{
            $('header').removeClass('shrink');
        }
    });


    function menuShow() {
        if($(window).width() < 769) {
            $(".menu-toggle").click(function(){
                $("header .main-nav").css({height: $(window).height()});
                $("header .main-nav").show();
                $("header .main-nav").addClass("show");
                $("html").addClass("lock");
            });
            $("header .main-nav .close").click(function(){
                $("header .main-nav").removeClass("show");
                $("html").removeClass("lock");
            });

            $("header .main-nav > ul > li").click(function(evt) {
                if($(this).find(".submenu").hasClass("show")){
                    $(this).addClass("show");
                    $(this).siblings("li").removeClass("show");
                    $(this).siblings("li").find(".submenu").removeClass("show");
                    $(this).siblings("li").find(".submenu").slideUp(500);
                    if (!$(evt.target).parents.hasClass("submenu")) {
                        $("header .main-nav > ul").animate({scrollTop:$(this).offset().top-50},500);
                    }
                }
                else {
                    $(this).removeClass("show");
                }
            });

            $("header .main-nav > ul > li.menu-1 > a, header .main-nav > ul > li.menu-2 > a, header .main-nav > ul > li.menu-3 > a, header .main-nav > ul > li.menu-4 > a").click(function(){
                if ($(this).parent("li").find(".submenu").hasClass("show")){
                    $(this).parent("li").find(".submenu").slideUp();
                    $(this).parent("li").find(".submenu").removeClass("show");
                }
                else {
                    $(this).parent("li").find(".submenu").slideDown();
                    $(this).parent("li").find(".submenu").addClass("show");
                }
            });
            $("header .main-nav > ul > li .submenu .sub-inner > ul > li > span").click(function(){
                if ($(this).hasClass("show")){
                    $(this).siblings("ul").slideUp();
                    $(this).removeClass("show");
                }
                else {
                    $(this).siblings("ul").slideDown();
                    $(this).addClass("show");
                }
            });

            $(".other-toggle").click(function(){
                $(".sidebar").css({height: $(window).height()});
                $(".sidebar").show();
                $(".sidebar").addClass("show");
                $("html").addClass("lock");
            });
            $(".sidebar .close").click(function(){
                $(".sidebar").removeClass("show");
                $("html").removeClass("lock");
            });
        };

        if($(window).width()==1024) {
            $("header .main-nav > ul > li").click(function() {
                $(this).toggleClass("show");
                $(this).siblings("li").removeClass("show");
            });
            $(document).on('touchmove', function(){
                $("header .main-nav > ul > li").removeClass("show");
            });
            $(".main-content").click(function(){
                $("header .main-nav > ul > li").removeClass("show");
            });
        }
    };
    menuShow();


    $(window).resize(function(){
        setContentSize();
    }).resize();

    //ipad rotation
    $(window).bind('orientationchange', function(event) {
        setContentSize();
        menuShow();
    });


    //底部
    $("footer .back a").click(function(){
        $("html,body").animate({scrollTop:$("header").offset().top-50},1000);
    });

    water_flow = function() {
        var first_box = $(".block-wall .block:first");
        if (first_box.hasClass('image-news')) {
            first_box.find('.inner').css('height',(first_box.find('.inner').width()*0.62));
        } else {
            first_box.find('.inner').css('height',(first_box.find('.inner').width()*1.298));
        }

        $(".block-wall .block").each(function(k,v){
            $(v).find('.inner').css('height',first_box.find('.inner').height());
        });

        $('.block-wall .row').isotope({
            itemSelector: '.block',
            masonry: {
                columnWidth: 1
            }
        });
    };

    /*滚动条宽度*/
    // function getScrollWidth() {
    //     var noScroll, scroll, oDiv = document.createElement("DIV");
    //     oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
    //     noScroll = document.body.appendChild(oDiv).clientWidth;
    //     oDiv.style.overflowY = "scroll";
    //     scroll = oDiv.clientWidth;
    //     document.body.removeChild(oDiv);
    //     return noScroll-scroll;
    // }

    //cms gallery
    setPaginationWidth = function() {
        var _size = $(".cmsPage .gallery .pagination span").length;
        var _width = $(".cmsPage .gallery .pagination").width();
        $(".cmsPage .gallery .pagination span").css({width: _width/_size});
    };




    //筛选框
    $(".filter .select-box .option li").click(function(){
        var _content = $(this).html();
        $(this).parents(".select-box").find("span").html(_content + '<i class="iconfont arrow">&#xe628;</i>');
        $(".filter .select-box").removeClass("show");
    });

    // if($(window).width()<769) {
        $(".filter .select-box span").click(function(){
            if($(".filter .select-box").hasClass("show")) {
                $(".filter .select-box").removeClass("show");
            }
            else {
                $(".filter .select-box").addClass("show");
            }
        });
    // }

    $(".block-wall .hot-list h5 a").click(function(){
        var _index = $(this).index();
        $(this).addClass("active");
        $(this).siblings("a").removeClass("active");
        $(this).parents(".hot-list").find(".switch").find("ul").hide();
        $(this).parents(".hot-list").find(".switch").find("ul").eq(_index).show();
    });

    //单页相关
    $(".related-slide-list .list-nav li").click(function(){
        var _index = $(this).index();
        $(this).addClass("active");
        $(this).siblings("li").removeClass("active");
        $(".related-swiper-wrap .related-swiper").removeClass("active")
        $(".related-swiper-wrap .related-swiper").eq(_index).addClass("active");
    });


    //产品
    $(".classified-table .table-nav li").click(function(){
        var _index = $(this).index();
        $(this).addClass("active");
        $(this).siblings("li").removeClass("active");
        $(".classified-table .table-box .table-wrap").hide();
        $(".classified-table .table-box .table-wrap").eq(_index).show();
    });

    $(".classified-table .table-nav .prev").click(function(){
        var _count = $(".table-nav li").length;
        var _index = $(".table-nav li.active").index();
        if(_index > 0) {
            $(".classified-table .table-nav .next").removeClass("disabled");
            $(".table-nav li").removeClass("active");
            $(".table-nav li").eq(_index-1).addClass("active");
            $(".classified-table .table-box .table-wrap").hide();
            $(".classified-table .table-box .table-wrap").eq(_index-1).show();
        }
        else {
            $(".classified-table .table-nav .prev").addClass("disabled");
        }
    });

    $(".classified-table .table-nav .next").click(function(){
        var _count = $(".table-nav li").length;
        var _index = $(".table-nav li.active").index();
        if(_index < (_count-1)) {
            $(".classified-table .table-nav .prev").removeClass("disabled");
            $(".table-nav li").removeClass("active");
            $(".table-nav li").eq(_index+1).addClass("active");
            $(".classified-table .table-box .table-wrap").hide();
            $(".classified-table .table-box .table-wrap").eq(_index+1).show();
        }
        else {
            $(".classified-table .table-nav .next").addClass("disabled");
        }
    });

    $("footer .wechat").click(function(){
        $(".wechat-box").fadeIn();
    });
    $(".wechat-box .close").click(function(){
        $(".wechat-box").fadeOut();
    });

    swiperMove = function(className,swiperName) {

        var _prev = className.find('.prev');
        var _next = className.find('.next');
        var _sildeNum = className.find('.swiper-slide').size();

        if (_prev.size()) {
            _prev.live('click',function() {
                console.log(1);
                swiperName.swipePrev();
                if (swiperName.activeIndex == 0) {
                    _prev.addClass('disabled');
                }
                _next.removeClass('disabled');
            });

            _next.live('click',function() {
                swiperName.swipeNext();
                console.log(_sildeNum  - swiperName.params.slidesPerView);
                console.log(swiperName.activeIndex);

                if (swiperName.activeIndex == _sildeNum  - swiperName.params.slidesPerView) {
                    _next.addClass('disabled');
                }
                _prev.removeClass('disabled');
            });
        }
    };

    $(".gallery .full-screen").click(function(){
        $(".full-gallery-box").fadeIn();
    });
    $(".full-gallery-box .close").click(function(){
        $(".full-gallery-box").fadeOut();
    });


    //点赞
    $(".title-box .bdsharebuttonbox button, .product-cover .like, .food-list .like, .bottom-share.bdsharebuttonbox button").click(function(){
        $(this).addClass("active");
    });

    //loading测试
    $(".loadMore").click(function(){
        $(this).toggleClass("loading");
    });

    //wifi
    $(".wifi-box .close").click(function(){
        $(".wifi-box").animate({
            top: -50
        },500);
    });

    //百度分享
    window._bd_share_config = {
        "common": {
            "bdSnsKey": {},
            "bdText": "",
            "bdMini": "2",
            "bdMiniList": false,
            "bdPic": "",
            "bdStyle": "2",
            "bdSize": "32"
        },
        "share": {}
    };
    with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];



    // function isIos(){
    //     var u = navigator.userAgent, app = navigator.appVersion;
    //     var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    //     var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //     if (isAndroid) {
    //        //这个是安卓操作系统
    //     }
    //     if (isIOS) {

    //     }
    // }








});