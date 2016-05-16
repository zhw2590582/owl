<?php
$sliders = cs_get_option( 'i_slider' ); 
$pagination = cs_get_option('i_pagination');
$like = cs_get_option( 'i_post_like' );
$avatar_bg = cs_get_option( 'i_avatar_bg' );
$avatar_image = cs_get_option( 'i_avatar_image' );
$avatar_name = cs_get_option( 'i_avatar_name' );
$avatar_content = cs_get_option( 'i_avatar_content' );
$me = cs_get_option( 'i_me_switch' );
$bulletin = cs_get_option( 'i_bulletin' );
?> 

<?php get_header(); ?>	

<section id="content">
    <div class="container">
        <div class="content-inner">
            <div class="main_header colbox">
                <div class="avatar_box col">
                    <div class="me_img">
                        <div class="me_avatar">
                            <img src="<?php echo $avatar_image; ?>">
                        </div>
                        <span class="me_name"><?php echo $avatar_name; ?></span>
                    </div>
 				<?php if ($bulletin) { ?>
                    <div class="bulletin">
                        <?php
                            $my_bulletins = cs_get_option( 'i_bulletin_custom' );
                            echo '<ul class="bulletin_list">';
                            if( ! empty( $my_bulletins ) ) {
                              foreach ( $my_bulletins as $bulletin ) {
                                echo '<li style="display:none">';
                                if( ! empty( $bulletin['i_bulletin_link'] ) ){ echo '<a href="'. $bulletin['i_bulletin_link'] .'"';}
                                if ( ! empty( $bulletin['i_bulletin_link'] ) && $bulletin['i_bulletin_newtab'] == true) { echo 'target="_black">';}else{ if ( ! empty( $bulletin['i_bulletin_link'] )){ echo '>';}}
                                echo ''. $bulletin['i_bulletin_text'] .'';
                                if( ! empty( $bulletin['i_bulletin_link'] ) ){ echo '</a>';}
                                echo '</li>';
                              }
                            }
                            echo '</ul>';
                        ?>
                    </div>
				<?php } ?>
                </div>
                <div class="main-menu col">
                    <?php wp_nav_menu(array('theme_location' => 'main', 'container' => 'div', 'container_class' => 'header-menu-wrapper', 'menu_class' => 'header-menu-list', 'walker' => new description_walker())); ?>
                </div>
                <div class="actions-menu col">
                    <a class="layouts_width selected" href="#">
                        <span></span>
                        <span></span>
                    </a>
                    <a class="layouts_box" href="#">
                        <span style="margin-right:2px"></span>
                        <span></span>
                        <span style="margin-right:2px"></span>
                        <span></span>
                    </a>
                </div>
            </div>



            <div class="main_body colbox">
                <?php if (!is_mobile()) { ?>
                    <aside id="sidebar" class="col">
                        <?php if ($me == true) {?>
                            <div id="about">
                                <p class="me_content">
                                    <?php echo $avatar_content; ?>
                                </p>
                                <div class="social_link">
                                    <?php
                                        $my_socials = cs_get_option( 'i_social' );
                                        echo '<ul class="clearfix">';
                                        if( ! empty( $my_socials ) ) {
                                          foreach ( $my_socials as $social ) {
                                            $iconstyle = $social['i_icon_style'];
                                            echo '<li>';
                                            if( ! empty( $social['i_social_link'] ) ){echo '<a href="'. $social['i_social_link'] .'" title="'. $social['i_social_title'] .'"';}else{echo '<a href="javascript:void(0)" title="'. $social['i_social_title'] .'" ';}
                                            if ( $social['i_social_newtab'] == true) { echo 'target="_black"';}
                                            if ($iconstyle == 'i_icon') {echo '><i class="'. $social['i_social_icon'] .'"></i>';} else {echo '><img src="'. $social['i_social_image'] .'">';}
                                            echo '</a>';
                                            echo '</li>';
                                          }
                                        }
                                        echo '</ul>';
                                    ?>
                                </div>
                            </div>
                        <?php } ?>
                        <div id="widget" class="widgets">
                            <?php if (function_exists('dynamic_sidebar') && dynamic_sidebar('Aside') ) : else : ?>
                            <?php endif; ?>
                        </div>
                    </aside>
                <?php }?>

                <div id="main" class="col">

                	<?php if(is_home() && !is_paged()) { ?>
                		<!-- 调用幻灯片 -->
                		<?php if ($sliders == true) { ?>
                            <div class="app_slider">
                                <div class="slider_inner">
                                    <div id="slider" class="nivoSlider">
                                        <?php
                                            $my_sliders = cs_get_option( 'i_slider_custom' );
                                            if( ! empty( $my_sliders ) ) {
                                              foreach ( $my_sliders as $slider ) {
                                                if( ! empty( $slider['i_slider_link'] ) ){ echo '<a href="'. $slider['i_slider_link'] .'"';}
                                                if ( ! empty( $slider['i_slider_link'] ) && $slider['i_slider_newtab'] == true) { echo 'target="_black">';}else{ if ( ! empty( $slider['i_slider_link'] )){ echo '>';}}
                                                echo '<img class=" " src="'. $slider['i_slider_image'] .'" data-thumb="'. $slider['i_slider_image'] .'" title="'. $slider['i_slider_text'] .'"/>';
                                                if( ! empty( $slider['i_slider_link'] ) ){ echo '</a>';}
                                              }
                                            }
                                        ?>
                                    </div>
                                </div>
                            </div>
                		<?php } ?>
                	<?php } ?>

                    <div class="main-inner">

	                    <div id="posts-box">
	                            <?php if(is_search()) { ?>
	                                <h2 class="archive-title"><i class="fa fa-search"></i> <?php printf( __( '搜索结果: %s' ), '<span>' . get_search_query() . '</span>' ); ?></h2>
	                            <?php } else if(is_tag()) { ?>
	                                <h2 class="archive-title"><i class="fa fa-tags"></i> <?php single_tag_title(); ?></h2>
	                            <?php } else if(is_day()) { ?>
	                                <h2 class="archive-title"><i class="icon-time"></i> <?php _e('归档'); ?> <?php echo get_the_date(); ?></h2>
	                            <?php } else if(is_month()) { ?>
	                                <h2 class="archive-title"><i class="fa fa-calendar"></i> <?php echo get_the_date('F Y'); ?></h2>
	                            <?php } else if(is_year()) { ?>
	                                <h2 class="archive-title"><i class="fa fa-calendar"></i> <?php echo get_the_date('Y'); ?></h2>
	                            <?php } else if(is_category()) { ?>
	                                <h2 class="archive-title"><i class="fa fa-list-ul"></i> <?php single_cat_title(); ?></h2>
	                            <?php } else if(is_author()) { ?>
	                                <h2 class="archive-title"><i class="fa fa-user"></i> <?php
	                                $curauth = (isset($_GET['author_name'])) ? get_user_by('slug', $author_name) : get_userdata(intval($author)); echo $curauth->display_name; ?></h2>
	                            <?php } ?>

	                        <div class="posts clearfix">
	                            <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	                            <?php setPostViews(get_the_ID());?>
	                            <article <?php post_class('post'); ?>>
	                                <div class="post-wrap">
	                                    <?php if ( is_sticky() ) : ?>
	                                    <!-- 置顶文章 -->
	                                    <div class="post-sticky with-tooltip" data-tooltip="置顶文章"></div>
	                                    <?php else : ?>
	                                    <?php endif; ?>
	                                    <?php
											get_template_part('format', 'standard');
	                                    ?>

	                                    <ul class="bottom_meta clearfix">
	                                    	<li class="mate-time fl"><i class="fa fa-clock-o"></i><?php echo ''.timeago( get_gmt_from_date(get_the_time('Y-m-d G:i:s')) ); ?></li>
	                                        <li class="mate-cat fl"><i class="fa fa-circle-o-notch"></i><?php the_category(' '); ?></li>
	                                        <?php $posttags = get_the_tags(); if ($posttags) { ?>
	                                            <li class="meta_tabs fl"><i class="fa fa-tags"></i><?php the_tags('', ' ', ''); ?></li>
	                                        <?php } ?>

	                                        <?php if ($like == true) { ?>
	                                            <li class="meta_like fr">
	                                                <?php if ( $like ) { ?>
	                                                    <?php echo getPostLikeLink( get_the_ID() ); ?>
	                                                <?php } ?>
	                                            </li>
	                                        <?php } ?>
	                                    </ul>
	                                </div>

	                                <?php $nums=5;
                                    $get_comments_num=5;
                                    $min_comments = get_comments('status=approve&type=comment&number='.$get_comments_num.'&post_id='.get_the_ID());
                                    if ( !empty($min_comments) ) {
                                    	$my_email=get_bloginfo ('admin_email');
                                    	$i = 1; ?>
                                    	<div class="min_comments">
                                    		<ul><?php
                                    			$commentcount = $min_comments->comment_count;
                                    			$min_output='';
                                    			foreach ($min_comments as $min_comment) {
                                    				if ($min_comment->comment_author_email != $my_email) {
                                    					$min_avatar=get_avatar($min_comment->comment_author_email,60);
                                    					$min_output .= '<li><a class="" href="'
                                    					.get_comment_link( $min_comment->comment_ID, array('type' => 'all')).'" title="'.$min_comment->comment_date.'"><figure class="avatar avatar-box avatar-xs">'
                                    					.$min_avatar
                                    					.'</figure><span class="comment_box">'
                                    					.$min_comment->comment_author.'：'
                                    					.convert_smilies(strip_tags($min_comment->comment_content))
                                    					.'</span></a></li>';
                                    					if ($i == $nums || $i == $commentcount) break;
                                    					++$i;
                                    				}
                                    			}
                                    			echo $min_output;
                                    			if ($min_output) echo '<!-- <li class="min_more">', comments_popup_link('','','...'), '</li> -->';?>
                                    		</ul>
                                    	</div><?php
                                    } ?>

	                            </article>
	                            <?php endwhile; ?>
	                            <?php endif; ?>
	                        </div>

	                        <!-- 分页 -->
	                        <?php if ( $pagination == 'i_ajax') { ?>
	                            <?php if( island_page_has_nav() ) : ?>
	                                <div class="post-nav">
	                                    <div class="post-nav-inside clearfix">
	                                        <div class="post-nav-left"><?php previous_posts_link(__('上一页')) ?></div>
	                                        <div class="post-nav-right"><?php next_posts_link(__('下一页')) ?></div>
	                                    </div>
	                                </div>
	                            <?php endif; ?>
	                        <?php } else { ?>
	                            <div class="posts-nav">
	                                <div class="nav-inside">
	                                <?php echo paginate_links(array(
	                                    'prev_next'          => 0,
	                                    'before_page_number' => '',
	                                    'mid_size'           => 2,
	                                ));?>
	                                </div>
	                            </div>
	                            <?php ?>
	                        <?php } ?>
	                    </div>
                	</div>
                </div>

            </div>
        </div>
    </div>
</section>
		
<?php get_footer(); ?>