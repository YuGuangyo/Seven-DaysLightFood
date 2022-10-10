fontSize();
$(window).resize(function () {
    fontSize();
});

function fontSize() {
    var size;
    var winW = $(window).width();

	if (winW <= 1750 && winW > 1280) {
	    size = Math.round(winW / 17.5);
	} else if(winW <= 1280 && winW > 1025){
		size = Math.round(winW / 14.5); 
	} else if ( winW <= 1025) {
		size = Math.round(winW / 7.5);
		if (size < 80) {
			size = 80;
		}
	} else {
		size = 100;
	}
	if(size>100){
		size = 100;
	}
	$('html').css('font-size', size + "px");
}


$(function () {
	var w = document.body.clientWidth;
    document.body.addEventListener("touchstart",function(){ });
	
	//$(".footerpage").load("footer.html", function (responseTxt, statusTxt, xhr) {
	    //if (statusTxt == "success") { 
			
			$(document).on("click", ".slidetop", function () {  //回顶部
			    $('body,html').animate({scrollTop: 0}, 400);
			    return false;
			});
	    //}
	//});
	
	//$(".headerpage").load("header.html", function (responseTxt, statusTxt, xhr) {
	    //if (statusTxt == "success") {
			// **菜单**
			$(".navs li").click(function(){
				$(this).addClass("act").siblings().removeClass("act");
			})
			$(".subnav li").click(function(){
				$(this).addClass("active").siblings().removeClass("active");
			})
			if (w > 991) {
				$(".navs li").hover(function(){
					$(this).find(".subnav").stop().slideToggle();
				});
			}
			
			// **搜索**
			$(".search").click(function(){
				$(this).addClass("s_input").siblings(".navs").hide();
				if(w <= 991){
					$(".nav-abbreviation").removeClass("nav-abbreviation-act")
				}
			})
			$(".closeput").click(function(event){
				event.stopPropagation();
				$(".search").removeClass("s_input");
				if(w > 991){
					$(".navs").show("slow")
				}
			})
	    //}
	//});
	
	$(document).on("click", ".nav-abbreviation", function () {
	    $(".navs").stop().slideToggle("act");
	    $(this).toggleClass("nav-abbreviation-act");
		$(".search").removeClass("s_input");
	});
	
	
	ScrollReveal().reveal('.counter-value', {
		   reset: false,//离开时重置
		   delay: 100,//延迟
		   mobile: false,//手机端禁用
		   desktop: true,//pc端启用
		   distance: '40px',//距离
		   duration: 1000, //持续时间
		   interval: 400,//下一个触发时间
		   opacity: 1,//默认隐藏值
		   origin: 'top',//指定方向
		   opacity: "0",
		   useDelay: 'onload',//页面加载时应用延迟
		   useDelay: 'once',//应用延迟
		   useDelay: 'always',//总是应用延迟
		   viewFactor: 0.2,//超过底部多少是触发
	});
	ScrollReveal().reveal('.counter-valuet', {
		   reset: false,//离开时重置
		   delay: 0,//延迟
		   mobile: false,//手机端禁用
		   desktop: true,//pc端启用
		   distance: '40px',//距离
		   duration: 1600, //持续时间
		   interval: 600,//下一个触发时间
		   opacity: 1,//默认隐藏值
		   origin: 'bottom',//指定方向
		   opacity: "0",
		   viewFactor: 0,//超过底部多少是触发
	});
	ScrollReveal().reveal('.counter-valuer', {
		   reset: false,//离开时重置
		   delay: 0,//延迟
		   mobile: false,//手机端禁用
		   desktop: true,//pc端启用
		   distance: '40px',//距离
		   duration: 1600, //持续时间
		   interval: 600,//下一个触发时间
		   opacity: 1,//默认隐藏值
		   origin: 'right',//指定方向
		   opacity: "0",
		   viewFactor: 0,//超过底部多少是触发
	});
	ScrollReveal().reveal('.counter-valuel', {
		   reset: false,//离开时重置
		   delay: 0,//延迟
		   mobile: false,//手机端禁用
		   desktop: true,//pc端启用
		   distance: '40px',//距离
		   duration: 800, //持续时间
		   interval: 300,//下一个触发时间
		   opacity: 1,//默认隐藏值
		   origin: 'left',//指定方向
		   opacity: "0",
		   viewFactor: 0,//超过底部多少是触发
	});
	ScrollReveal().reveal('.counter-valueb', {
		   reset: false,//离开时重置
		   delay: 0,//延迟
		   mobile: false,//手机端禁用
		   desktop: true,//pc端启用
		   distance: '40px',//距离
		   duration: 1000, //持续时间
		   interval: 400,//下一个触发时间
		   opacity: 1,//默认隐藏值
		   origin: 'top',//指定方向
		   opacity: "0",
		   viewFactor: 0,//超过底部多少是触发
	});
	
});
