jQuery(document).ready(function($) {

$('.layouts_width').click(function(){
    $("body").removeClass("layouts-box");
    $(this).addClass('selected').siblings().removeClass('selected');
    return false;
});
$('.layouts_box').click(function(){
    $("body").addClass("layouts-box");
    $(this).addClass('selected').siblings().removeClass('selected');
    return false;
});

//左侧栏
$(".sidectrl").click(function(){
	lC = $(this).width();
	lS = $("#lSidebar").width();
	if($("#lSidebar").hasClass("open")){
		$("#lSidebar").animate({left: (lC - lS) + "px"}).removeClass("open");
	}else{
		$("#lSidebar").animate({left:"0"}).addClass("open");
	}
});

//评论分页
$body=(window.opera)?(document.compatMode=="CSS1Compat"?$('html'):$('body')):$('html,body');
$('body').on('click', '#comment-nav-below a', function(e) {
    e.preventDefault();
    $.ajax({
        type: "GET",
        url: $(this).attr('href'),
        beforeSend: function(){
            $('#comment-nav-below').remove();
            $('.commentlist').remove();
            $('#loading-comments').slideDown();
            $body.animate({scrollTop: $('#comments-title').offset().top - 65}, 800 );
        },
        dataType: "html",
        success: function(out){
            result = $(out).find('.commentlist');
            nextlink = $(out).find('#comment-nav-below');
            $('#loading-comments').slideUp('fast');
            $('#loading-comments').after(result.fadeIn(500));
            $('.commentlist').after(nextlink);
        }
    });
});

//固定小工具
	var rw = $('.sidebar-contentWrapper').width();
	var rh = $('.rightbar').height();
	var bh = $('.main').height();
	$('#wrapper').css('min-height', rh + 100 + "px");

	if($(".rightbar aside").length>0){
		var documentHeight = 0;
		var topPadding = 15;
		$(function() {
			var offset = $(".rightbar aside:last").offset();
			documentHeight = $(document).height();
			$(window).scroll(function() {
				var sideBarHeight = $(".rightbar aside:last").height();
				if ($(window).scrollTop() > offset.top) {
					var newPosition = ($(window).scrollTop() - offset.top) + topPadding;
					var maxPosition = documentHeight - (sideBarHeight + 368);
					if (newPosition > maxPosition) {
						newPosition = maxPosition;
					}
					$(".rightbar aside:last").addClass("affix").css({width: rw});
				} else {
					$(".rightbar aside:last").removeClass("affix");
				};
			});
		});
	} else {}

//选项卡
(function ($) {
    $('.tabs_title').addClass('active').find('> li:eq(0)').addClass('current');
    $('.tabs_title li a').click(function (g) {
        var tab = $(this).closest('#widget-tab'),
            index = $(this).closest('li').index();
        tab.find('.tabs_title > li').removeClass('current');
        $(this).closest('li').addClass('current');
        tab.find('.tab_content').find('.tabs_item').not('.tabs_item:eq(' + index + ')').slideUp();
        tab.find('.tab_content').find('.tabs_item:eq(' + index + ')').slideDown();
        g.preventDefault();
    } );
})(jQuery);

//文章目录
    $(".index-box").append($(".content #article-index").clone());
	$('.index-box a[href^="#"]').click(function() {
		var _rel = jQuery(this).attr("href");
		var _targetTop = jQuery(_rel).offset().top;
		jQuery("html,body").animate({
			scrollTop: _targetTop - 50
		}, 700);
		return false
	});
    $('.page-template-custom-archive .navbar-ng a').click();


//图像CSS类
	$("#content img, .avatar").addClass('ajax_gif');
	$("#content img, .avatar").load(function() {
		$(this).removeClass('ajax_gif');
	});

//Tooltip
	$(".tagcloud a , .linkcat li a").each(function(i) {
		var formattedDate = $(this).attr('title');
		$(this).attr("data-tooltip", function(n, v) {
			return formattedDate;
		});
		$(this).removeAttr("title").addClass("with-tooltip");
	});

	$(".linkcat li a").each(function(i) {
		var linkhref = $(this).attr('href');
		$(this).prepend( '<img src="' + linkhref + 'favicon.ico">');
	});

	$('.linkcat li a img , .avatar').on('error', function () {
	  $(this).prop('src', '../wp-content/themes/Island/images/broken.jpg');
	});

//底部按钮
	$(window).scroll(function() {
		if ($(window).scrollTop() > 200) {
			$(".foot_btn").fadeIn(500);
		} else {
			$(".foot_btn").fadeOut(500);
		}
	});

	$(".scrolltotop").click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 1000);
		return false;
	});

	$(".comment_btn").click(function() {
		$("html,body").animate({
			scrollTop: $("#comment-jump").offset().top - 60
		}, 1000);
		return false;
	});

	$("#r-wx").mouseenter(function() {
		$("#fi-wx-show").css({
			display: "block"
		});
	});

	$("#r-wx").mouseleave(function() {
		$("#fi-wx-show").css({
			display: "none"
		});
	});

	$(".baidu_share").mouseenter(function() {
		$(".share_show").css({
			display: "block"
		});
	});

	$(".baidu_share").mouseleave(function() {
		$(".share_show").css({
			display: "none"
		});
	});


//登录面板

	$(".login-toggle").toggle(function() {
		$(".login_bg").slideToggle(300);
		return false;
	}, function() {
		$(".login_bg").slideToggle(300);
		return false;
	});

//自适应菜单
	$("#menu-toggle").click(function() {
		$(".mobile-nav , #menu-toggle").toggleClass("open-nav");
	});

//Modal
	$(".modal-close").click(function() {
		$(".modal-bg").addClass("hide").removeClass("show");
	});


//登录面板
    var $form_modal = $('.cd-user-modal');
    $(".navbar-btn").click(function(){
        $form_modal.toggleClass("is-visible");
    });

	//关闭modal
	$('.cd-user-modal').on('click', function(event){
		if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
			$form_modal.removeClass('is-visible');
		}
	});
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$form_modal.removeClass('is-visible');
	    }
    });

//下载盒子
	$(".dl-link a").click(function() {
		$(".download-bg").addClass("show").removeClass("hide");
		var dlLink = $(this).attr('data-dl');
		var dlCode = $(this).attr('data-code');
		$(".dl-btn a").attr("href",dlLink);
		$(".dl-tqcode span").text(dlCode);
	});

//手风琴
    var headers = ["H1"];
    $(".accordion").click(function(e) {
      var target = e.target,
          name = target.nodeName.toUpperCase();

      if($.inArray(name,headers) > -1) {
        var subItem = $(target).next();
        var depth = $(subItem).parents().length;
        var allAtDepth = $(".accordion div").filter(function() {
          if($(this).parents().length >= depth && this !== subItem.get(0)) {
            return true;
          }
        });
        $(allAtDepth).slideUp("fast");
            subItem.slideToggle("fast",function() {
            $(".accordion :visible:last").css("border-radius","0");
        });
            $(target).toggleClass("open").siblings().removeClass("open");
            $(target).children().toggleClass("fa-minus");
            $(target).siblings().children().removeClass("fa-minus");
      }
    });

	//公告条
	bulletin();
	setInterval('bulletin()', 6000);
});


// 图像懒加载
echo.init({
	offset: 100,
	throttle: 250,
	unload: false,
});

// 作品模板
(function(){
minigrid('.grid', '.grid-item');

window.addEventListener('resize', function(){
  minigrid('.grid', '.grid-item');
});
})();

// Banner + 读者墙提示文本
MouseTooltip.init();

//公告条
var b_i = 0,
	b_span_arr = 0;
laodao_span_num = 0;
function bulletin() {
	if(b_span_arr==0){
		b_span_arr = jQuery(".bulletin_list").children("li");
		b_span_num = b_span_arr.length - 1;
	}
	if (b_i > b_span_num) {b_i = 0;}
	jQuery('.bulletin_list li:eq('+b_i+')').fadeIn(1500);
	setTimeout(function() {jQuery('.bulletin_list li:eq('+b_i+')').fadeOut(1500);b_i++;},4500);
};