<?php
// 获取选项
$notice = cs_get_option( 'i_notice' );
$notice_main = cs_get_option( 'i_notice_main' );
$keywords = cs_get_option( 'i_seo_keywords' ); 
$description = cs_get_option( 'i_seo_description' );
$favicon = cs_get_option( 'i_favicon_icon' ); 
$banner = cs_get_option( 'i_banner_image' );
$page = cs_get_option('i_pagination');
$style = cs_get_option('i_ajax_style'); 
$symbol = cs_get_option( 'i_symbol' ); 
$logo = cs_get_option( 'i_logo_image' ); 
$search = cs_get_option( 'i_search' ); 
$login = cs_get_option( 'i_login' ); 
$switcher = cs_get_option( 'i_switcher' );
$banner_test = cs_get_option( 'i_banner_text' );
$avatar_bg = cs_get_option( 'i_avatar_bg' );
$avatar_image = cs_get_option( 'i_avatar_image' );
$avatar_name = cs_get_option( 'i_avatar_name' );
?> 

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<title><?php if(function_exists('show_wp_title')){show_wp_title();} ?></title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0,minimal-ui">
	<meta name="keywords" content="<?php echo $keywords ?>" />
	<meta name="description" content="<?php echo $description ?>" />
	<link rel="shortcut icon" href="<?php echo $favicon; ?>" title="Favicon">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<?php if (is_mobile()) { ?>
		<div style="display:none;"><?php the_post_thumbnail( 'medium' ); ?></div>
	<?php }?>
    <?php if ($notice && !is_mobile()) { ?>
        <div class="notice hide">
            <div class="notice-inner"><?php echo $notice_main; ?></div>
            <a href="javascript:void(0)" class="clo-notice"><i class="fa fa-times"></i></a>
        </div>
    <?php }?>
     <?php $banner_c = ' '. $banner[color] .' url(\''. $banner[image] .'\') no-repeat center 0'; ?>
     <?php
     $i_glass = cs_get_option( 'i_glass_style' );
     if ( $i_glass  == 'i_glass_w') {
         $i_glass_c = 'glass_w';
     }else{
         $i_glass_c = 'glass_b';
     }
     ?>
    <header id="header" class="<?php echo $i_glass_c; ?>" style="background:<?php echo $banner_c; ?>;">
        <div class="header-mask-sd">
            <div class="header-mask-blur">
                <div class="header-mask" style="background: <?php echo $banner_c; ?>"></div>
                <div class="header-mask-bg"></div>
            </div>
        </div>

        <div class="header-inner">
            <div class="container clearfix">
                <div class="header-logo">
                    <?php if ( $symbol == 'i_text' ) { ?>
                        <div class="logo">	
                            <a href="<?php echo home_url( '/' ); ?>" title="<?php bloginfo('name'); ?>"><?php bloginfo('name'); ?></a>
                        </div>
                    <?php }elseif( $symbol == 'i_logo' ){ ?>
                        <div  class="logo">
                            <a href="<?php echo home_url(); ?>" title="<?php bloginfo('name'); ?>">
                                <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-echo="<?php echo $logo ;?>" alt="<?php bloginfo('name'); ?>" />
                            </a>
                        </div> 
                    <?php }else{ ?>
                        <div class="logo">	
                            <a href="<?php echo home_url( '/' ); ?>" title="<?php bloginfo('name'); ?>"><i class="icon-logo"></i></a>
                        </div>
                    <?php } ?>
                </div>

                <nav class="header-menu">
                    <?php wp_nav_menu(array('theme_location' => 'header', 'container' => 'div', 'container_class' => 'header-menu-wrapper', 'menu_class' => 'header-menu-list', 'walker' => new description_walker())); ?>
                </nav>	

                <ul class="header-tool header-menu-list">

                    <?php if ($login == true) { ?>
                    <li class="navbar-login menu-item-has-children">
                        <?php $current_user = wp_get_current_user(); ?>
                        <?php if ( is_user_logged_in() ) { ?>
                            <a class="avatar-box" href="<?php if(current_user_can('level_10')){ echo admin_url( 'admin.php?page=cs-framework' ) ;}else {echo admin_url( 'index.php' ) ;}  ?>" title="后台管理">
                                <?php if (strlen(get_avatar($current_user->ID, 40)) > 0) { ?>
                                    <?php echo get_avatar($current_user->ID, 40); ?>
                                <?php } else { ?>
                                    <img src="<?php echo get_stylesheet_directory_uri(); ?>/images/default-avatar.png" alt="<?php echo $current_user->display_name; ?>">
                                <?php } ?>
                            </a>	
                            <ul class="sub-menu clearfix">
                                <li class="name">
                                    <a href="<?php if(current_user_can('level_10')){ echo admin_url( 'admin.php?page=cs-framework' ) ;}else {echo admin_url( 'index.php' ) ;}  ?>"><i class="fa fa-tachometer"></i>后台管理</a>
                                </li>
                                <li class="edit-post">
                                    <a href="<?php echo admin_url( 'post-new.php' ) ; ?>"><i class="fa fa-edit"></i>发文章</a>
                                </li>
                                <li class="log-out">
                                    <a href="<?php echo wp_logout_url(home_url()); ?>" class="tooltip"><i class="fa fa-sign-out"></i>登出</a>
                                </li>
                            </ul>
                        <?php } else { ?>
                         <a href="#" onclick="return false;" class="navbar-btn">登陆</a>
                        <?php } ?>	
                    </li>		

                <?php } ?>	  

                <?php if ($switcher == true && !is_mobile()) { ?>
                    <li class="navbar-skin menu-item-has-children">
                        <a href="javascript:void(0)" class="skin-btn">皮肤</a>
                    </li>
                <?php }?>

                <?php if ($search == true && !is_mobile()) { ?>
                <!-- 搜索栏 -->	
                    <li class="search">
                        <form method="get" id="searchform" action="<?php echo home_url(); ?>/">
						<input type="text" class="search-form-input text" name="s" onfocus="if (this.value == '查找...') {this.value = '';}" onblur="if (this.value == '') {this.value = '查找...';}" value="查找...">                        </form>
                    </li>
                <?php }?>

                </ul>
            </div>
        </div>
        <div id="header-modal" class="with-tooltip" data-tooltip="<?php echo $banner_test ?>"></div>
    </header>
