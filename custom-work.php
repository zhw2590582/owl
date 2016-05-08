<?php 
/* 
Template Name: 作品页面
*/ 
error_reporting(0);
$pagination = cs_get_option('i_pagination'); 	
$loadmore = cs_get_option( 'i_ajax_loading' );  
$loadend = cs_get_option( 'i_ajax_end' ); 
$loadnum = cs_get_option( 'i_ajax_num' ); 
$worksnum = cs_get_option( 'i_works_num' ); 
$avatar_image = cs_get_option( 'i_avatar_image' );
$avatar_name = cs_get_option( 'i_avatar_name' );
$avatar_content = cs_get_option( 'i_avatar_content' );
$me = cs_get_option( 'i_me_switch' );
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
                        </div>
                        <div class="main-menu col">
                            <?php wp_nav_menu(array('theme_location' => 'main', 'container' => 'div', 'container_class' => 'header-menu-wrapper', 'menu_class' => 'header-menu-list', 'walker' => new description_walker())); ?>
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
                                    <?php if (function_exists('dynamic_sidebar') && dynamic_sidebar('Main Sidebar') ) : else : ?>
                                    <?php endif; ?>
                                </div>
                            </aside>
                        <?php }?>
                        <div id="main" class="col">
                            <div class="main-inner">
        	                    <div id="posts-box">
        	                        <div class="posts clearfix">
                                        <?php 
                                          $temp = $wp_query; 
                                          $wp_query = null; 
                                          $wp_query = new WP_Query(); 
                                          $show_posts = $worksnum;
                                          $permalink = 'Post name'; 
                                          $post_type = 'work';
                                          $req_uri =  $_SERVER['REQUEST_URI'];  
                                          if($permalink == 'Default') {
                                              $req_uri = explode('paged=', $req_uri);
                                              if($_GET['paged']) {
                                                $uri = $req_uri[0] . 'paged='; 
                                              } else {
                                                $uri = $req_uri[0] . '&paged=';
                                              }
                                          } elseif ($permalink == 'Post name') {
                                              if (strpos($req_uri,'page/') !== false) {
                                                  $req_uri = explode('page/',$req_uri);
                                                  $req_uri = $req_uri[0] ;
                                              }
                                                $uri = $req_uri . 'page/';
                                          }
                                          $wp_query->query('showposts='.$show_posts.'&post_type='. $post_type .'&paged='.$paged); 
                                          $count_posts = wp_count_posts('projects');
                                          while ($wp_query->have_posts()) : $wp_query->the_post(); 
                                          ?>

                                        <article <?php post_class('grid-item'); ?>>
                                            <div class="work-wrap">
                                                <?php if ( has_post_thumbnail()) { ?>
                                                    <a class="featured-image" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_post_thumbnail('thumbnail'); ?></a>
                                                <?php } ?>				
                                                 <div class="work-content">
                                                     <?php the_title();?>
                                                </div>
                                            </div>
                                            <ul class="work-mate">
                                                <li class="work_tabs"><?php $terms_as_text = get_the_term_list( $post->ID, 'genre', '', ', ', '' ) ; echo strip_tags($terms_as_text); ?></li>
                                                <li class="like_btn"><?php echo getPostLikeLink( get_the_ID() ); ?></li>	
                                            </ul>
                                        </article>

                                        <?php endwhile;?>
        	                        </div>

                                    <div class="work-nav fadeInDown animated">
                                        <div class="post-nav">
                                            <div class="post-nav-inside">
                                              <?php previous_posts_link('上一页 ') ?>
                                              <?php
                                              $count_post = $count_posts->publish / $show_posts;

                                              if( $count_posts->publish % $show_posts == 2 ) {
                                              $count_post++;
                                              $count_post = intval($count_post);
                                              };

                                              for($i = 1; $i <= $count_post ; $i++) { ?>
                                              <a <?php if($req_uri[1] == $i) { echo 'class=active_page'; } ?> href="<?php echo $uri . $i; ?>" rel="external nofollow" ><?php echo $i; ?></a>
                                              <?php }
                                              ?>
                                              <?php next_posts_link(' 下一页') ?>
                                            </div>
                                        </div>
                                    </div>

                                      <?php 
                                      $wp_query = null; 
                                      $wp_query = $temp;  // Reset
                                      ?>


                                    <script>
                                    jQuery(document).ready(function($) {
                                        if($(".post-nav-inside a").length==0){
                                            $(".post-nav").removeClass("post-nav");
                                        } else if ($(".post-nav-inside a").length==1){

                                        }else{			
                                            $(".post-nav-inside a:eq(0)").wrap("<div class='post-nav-left'></div>");
                                            $(".post-nav-inside a:eq(1)").wrap("<div class='post-nav-right'></div>");	
                                        }			
                                    });	
                                    </script>	

        	                    </div>
                        	</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

<?php get_footer(); ?>