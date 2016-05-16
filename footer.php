<?php
 // 获取选项
error_reporting(0);
$switcher = cs_get_option( 'i_switcher' );
$edit = cs_get_option( 'i_footer_edit' );
$copyright = cs_get_option( 'i_foot_copyright' );  
$gotop = cs_get_option( 'i_gotop' );  
$qrcode = cs_get_option( 'i_qrcode' );  
$qrcodeimg = cs_get_option( 'i_qrcode_image' );  
$loadmore = cs_get_option( 'i_ajax_loading' );  
$loadend = cs_get_option( 'i_ajax_end' ); 
$loadnum = cs_get_option( 'i_ajax_num' ); 
$pagination = cs_get_option('i_pagination'); 	
$comment = cs_get_option( 'i_comment_switch' ); 
$player_id = cs_get_option( 'i_player_id' ); 
$player = cs_get_option('i_player');
$player_mobi = cs_get_option('i_player_mobi');
$share = cs_get_option( 'i_share' ); 
$share_img = cs_get_option( 'i_share_img' ); 
$share_word = cs_get_option( 'i_share_word' ); 
$tongji = cs_get_option( 'i_js_tongji' );
$notice = cs_get_option( 'i_notice' ); 
$notice_title = cs_get_option( 'i_notice_title' ); 
$notice_main = cs_get_option( 'i_notice_main' ); 
$shengming = cs_get_option( 'i_download_shengming' ); 
$layout = cs_get_option( 'i_layout' );
$sliders = cs_get_option( 'i_slider' );
$login = cs_get_option( 'i_login' ); 
$login_img = cs_get_option( 'i_login_image' );
$sidebar = cs_get_option( 'i_sidebar' );
$topbar = cs_get_option( 'i_topbar' );
$meta_data = get_post_meta( get_the_ID(), 'standard_options', true );
$download = $meta_data['i_download'];
$index = $meta_data['i_index'];
?> 
	
	<footer id="footer">

		<div class="footer-inner">
			<div class="container clearfix">
				<?php echo $edit ?>
			</div>
		</div>

        <div class="footer-end">
            <div class="container clearfix">
                <?php if( ! empty( $copyright ) ){ echo ''.$copyright.'';}else{
                    echo'&copy; '.date("Y").' All Rights Reserved.';
                } ?>	

                <a href="http://zhw-island.com/" target="_blank"> Theme by Island</a>

                <?php if( ! empty( $tongji ) ){ echo '<script>'.$tongji.'</script>';}else{
                    echo' ';
                } ?>			
            </div>
        </div>
	</footer>

    <?php if (!is_mobile()) { ?>
		<div id="footer_btn">
			<ul>
				<?php if ($gotop == true) {
					echo '<li>
							<a href="#totop" class="scrolltotop icon">
								<i class="hand fa fa-chevron-up"></i>
							</a>
						</li>';
				}?>
	
				<?php if ($share == true) {
					echo '
                    <li>
                        <a href="javascript:void(0)" class="hand icon" title="分享">
                            <i class="hand fa fa-share-alt"></i>
                        </a>		
                        <div class="bdsharebuttonbox footer-show">
                            <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间">分享到QQ空间</a>
                            <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">分享到新浪微博</a>
                            <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信">分享到微信</a>
                            <a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣网">分享到豆瓣网</a>
                            <a href="#" class="bds_tieba" data-cmd="tieba" title="分享到百度贴吧">分享到百度贴吧</a>
                            <a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友">分享到QQ好友</a>
                            <a href="#" class="bds_mshare" data-cmd="mshare" title="分享到一键分享">分享到一键分享</a>
                        </div>
                        <script>
                        window._bd_share_config={
                        "common":{
                                    "bdSnsKey":{},
                                    "bdText":"",
                                    "bdMini":"2",
                                    "bdPic":"",
                                    "bdStyle":"0",
                                    "bdSize":"16"
                                },
                                "share":{}
                            };
                            with(document)0[(getElementsByTagName("head")[0]||body).appendChild(createElement("script")).src="http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion="+~(-new Date()/36e5)];</script>
                    </li>
                    ';
				}?>
                
				<?php if ($comment == true && is_single ()) {
					echo '<li class="mate-com">
							<a href="#comment-jump" class="comment_btn hand icon"><i class="fa fa-comment-o"></i></a>
						  </li>';
				}?>								
				
				<?php if ($qrcode == true) {
					echo '<li>
							<a class="icon" title="二维码" href="javascript:void(0)">
                                <i class="fa fa-qrcode"></i>
							</a>
                            <div class="wx-show footer-show">
                                <img src="'. $qrcodeimg .'">
                            </div>
						</li>';
				}?>	

			</ul>
		</div>
	<?php }?>	


	<?php if ($player_mobi == true && is_mobile() ) { }else{ ?>
		<?php if ($player == true && ! empty( $player_id ) && function_exists('cue_playlist') ) {?>
			<!-- 音乐播放器 -->
				<?php cue_playlist( $player_id ); ?>
		<?php }	 ?>
	<?php }	 ?>

	<?php if ($switcher == true && !is_mobile()  ) { ?>
        <div class="skin_switcher">
            <div class="skin_header clearfix">
                <div class="container clearfix">
                    <span class="fl">自定义皮肤</span>
                    <span class="glass_btn hand fl"><i class="fa fa-toggle-on" aria-hidden="true"></i>毛玻璃菜单</span>
                    <span class="col_skin hand fr"><i class="fa fa-times"></i></span>
                </div>
            </div>
            <div class="container skin_list">
                <ul class="clearfix">
                    <?php 
                        $skins = cs_get_option( 'i_skin_custom' );
                        if( ! empty( $skins ) ) {
                          foreach ( $skins as $skin ) {
                            $body = ' '. $skin['i_skin_body'][color] .' url(\''. $skin['i_skin_body'][image] .'\') '. $skin['i_skin_body'][repeat] .' '. $skin['i_skin_body'][position] .' '. $skin['i_skin_body'][attachment] .'';
                            echo '
                            <li data-banner="'. $skin['i_skin_banner'] .'" data-body="'. $body .'">
                                <img src="'. $skin['i_skin_thumb'] .'">
                                <span class="text-ellipsis">'. $skin['i_skin_title'] .'</span>
                            </li>';
                          }
                        }
                    ?>
                </ul>
            </div>
        </div>
	<?php }	 ?>

	<?php if ($notice == true && !is_mobile() ) {?>		
		<?php
		setcookie('notice','show',time()+3600);
		if(isset($_COOKIE["notice"])){
		}else{?>	
			<div class="cd-user-modal is-visible notice-modal">
				<a href="#" class="cd-close-form"></a>
				<div class="cd-user-modal-container">
					<div class="modal-head clearfix">
						<div class="modal-title"><?php echo $notice_title ?></div>
					</div>
					<div class="modal-main">
						<?php echo $notice_main ?>
					</div>
					<div class="modal-bottom">
						<span>窗口<span id="num">3</span>秒后自动关闭</span>
					</div>
				</div>
			</div>
		<?php }	?>	
	<?php }	?>	

	<?php if ( is_single() && !is_mobile() && $download) {?>	
        <div class="cd-user-modal download-modal">
			<a href="#" class="cd-close-form"></a>
            <div class="cd-user-modal-container">
                <div class="modal-head">
                    <div class="modal-title"><i class="fa fa-download"></i>资源下载</div>
                </div>
                <div class="modal-main">
                    <div class="dl-btn"><a class="btn" href="javascript:void(0)" target="_black"><i class="fa fa-arrow-circle-o-down"></i>点击下载</a></div>
                    <div class="dl-tqcode">提取码：<span></span></div>
                </div>
                <div class="modal-bottom">
                    <span>下载声明：<?php echo $shengming ?></span>
                </div>
            </div>
        </div> 
	<?php }	?>

	<?php if ( is_single() && !is_mobile() && $index) {?>	
		<div class="index-box"></div>
	<?php }	?>	
	
    <?php if ( !is_user_logged_in() && $login == true) { ?>
        <div class="cd-user-modal login-modal">
            <a href="#" class="cd-close-form"></a>
            <div class="cd-user-modal-container">
                <div class="login-img" style="background: url('<?php echo $login_img; ?>') no-repeat center center;"></div>
            	<div class="login-form">
                    <?php
                        $login_form_args = array (
                            'form_id' => 'login-form',
                            'label_log_in' => '登录',
                            'remember' => false,
                            'value_remember' => false
                        );
                    ?>
                    <?php wp_login_form($login_form_args); ?>
                    <p class="login-links clearfix">
                        <span class="alignleft">
                            <a href="<?php echo htmlspecialchars(wp_lostpassword_url(get_permalink()), ENT_QUOTES); ?>"><?php echo __('忘记密码', 'pinthis'); ?></a>
                        </span>
                        <?php if (get_option('users_can_register')) { ?>
                            <span class="alignright"><?php wp_register('', ''); ?></span>
                        <?php } ?>
                    </p>
            	</div>
            </div>
        </div>
	<?php }	?>

	<?php if ($sidebar == true) {?>
		<?php get_sidebar(); ?>
	<?php }?>
	
	
	<?php wp_footer(); ?>
	<script>

    <?php if ($sliders == true) { ?>    
        
        <?php 
            $effect = cs_get_option( 'i_slider_effect' );  
            $effect_style = '';
            switch ($effect) {
                case "i_sliceDown":
                    $effect_style = 'sliceDown';
                    break;
                case "i_sliceDownLeft":
                    $effect_style = 'sliceDownLeft';
                    break;
                case "i_sliceUp":
                    $effect_style = 'sliceUp';
                    break;
                case "i_sliceUpLeft":
                    $effect_style = 'sliceUpLeft';
                    break;	
                case "i_sliceUpDown":
                    $effect_style = 'sliceUpDown';
                    break;
                case "i_sliceUpDownLeft":
                    $effect_style = 'sliceUpDownLeft';
                    break;
                case "i_fold":
                    $effect_style = 'fold';
                    break;
                case "i_fade":
                    $effect_style = 'fade';
                    break;	
                case "i_random":
                    $effect_style = 'random';
                    break;
                case "i_slideInRight":
                    $effect_style = 'slideInRight';
                    break;
                case "i_slideInLeft":
                    $effect_style = 'slideInLeft';
                    break;
                case "i_boxRandom":
                    $effect_style = 'boxRandom';
                    break;	  
                case "i_boxRain":
                    $effect_style = 'boxRain';
                    break;
                case "i_boxRainReverse":
                    $effect_style = 'boxRainReverse';
                    break;
                case "i_boxRainGrow":
                    $effect_style = 'boxRainGrow';
                    break;
                case "i_boxRainGrowReverse":
                    $effect_style = 'boxRainGrowReverse';
                    break;	                    
            } 
         ?>	
        
        jQuery(window).load(function() {
            jQuery('.nivoSlider').nivoSlider({
                effect: '<?php echo $effect_style; ?>', 
                boxCols: 10, 
                boxRows: 5,
                animSpeed: 300,
                prevText: '',
                nextText: '',      
            });
        });
    <?php } ?>     	
        
        
	jQuery(document).ready(function($) {
	
	<?php if ( $pagination == 'i_ajax' && is_home() || $pagination == 'i_ajax' && is_archive()) { ?>
		// ajax加载			
		var ias = $.ias({
			container: ".posts",
			item: ".post",
			pagination: ".post-nav-inside",
			next: ".post-nav-right a",
		});

		ias.extension(new IASTriggerExtension({
			textPrev: ' ',
			text: '<?php echo $loadmore ?>',
			offset: <?php echo $loadnum ?>,
		}));
		ias.extension(new IASNoneLeftExtension({
			text: '<?php echo $loadend ?>',
		}));
		ias.extension(new IASSpinnerExtension());
		ias.extension(new IASPagingExtension());
		ias.extension(new IASHistoryExtension({
			prev: '.post-nav-right a',
		}));

		ias.on('rendered', function(items) {
			echo.init({
				offset: 100,
				throttle: 250,
				unload: false,
			});

			if($(".audio-wrapper audio").length>0){
				$('.audio-wrapper audio').mediaelementplayer();
			}
			
		});	
	<?php } ?>		
	});
	</script>

</body>
</html>