<?php 
/* 
Template Name: 归档页面
*/ 
error_reporting(0);
$layout = cs_get_option('i_layout');
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
                    </div>

                    <div class="main_body colbox">
                        <?php if (!is_mobile() && $layout == 'i_layout_two') { ?>
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
                            <div class="main-inner">
        	                    <div id="posts-box">
        	                        <div class="posts clearfix">
        								<article>
        									<div class="post-wrap">
        										<div class="post-inner">
        											<div class="post-body">
								<div class="content">
									<?php the_content(__( 'Read More','island')); ?>
									<div id="archives">      
										<div id="archives-content">      
										<?php       
											$the_query = new WP_Query( 'posts_per_page=-1&ignore_sticky_posts=1' );      
											$year=0; $mon=0; $i=0; $j=0;      
											$all = array();      
											$output = '';      
											while ( $the_query->have_posts() ) : $the_query->the_post();      
												$year_tmp = get_the_time('Y');      
												$mon_tmp = get_the_time('n');      
												$y=$year; $m=$mon;      
												if ($mon != $mon_tmp && $mon > 0) $output .= '</div></div>';      
												if ($year != $year_tmp) { // 输出年份      
													$year = $year_tmp;      
													$all[$year] = array();      
												}      
												if ($mon != $mon_tmp) { // 输出月份      
													$mon = $mon_tmp;      
													array_push($all[$year], $mon);      
													$output .= "<div class='archive_title' id='arti-$year-$mon'><h3>$year-$mon</h3><div class='archives archives-$mon' data-date='$year-$mon'>";      
												}      
												$output .= '<div class="brick"><a href="'.get_permalink() .'"><span class="time">'.get_the_time('n-d').'</span>'.get_the_title() .'<em>('. get_comments_number('0', '1', '%') .')</em></a></div>';      
											endwhile;      
											wp_reset_postdata();      
											$output .= '</div></div>';      
											echo $output;      
										 
											$html = "";      
											$year_now = date("Y");      
											foreach($all as $key => $value){// 输出 左侧年份表      
												$html .= "<li class='year' id='year-$key'><a href='#' class='year-toogle' id='yeto-$key'>$key</a><ul class='monthall'>";      
												for($i=12; $i>0; $i--){      
													if($key == $year_now && $i > $value[0]) continue;      
													$html .= in_array($i, $value) ? ("<li class='month monthed' id='mont-$key-$i'>$i</li>") : ("<li class='month'>$i</li>");      
												}      
												$html .= "</ul></li>";   
											}      
										?>     
										</div>   
										<?php if (!is_mobile()) { ?>
											<div id="archive-nav" class="fade out">      
												<ul class="archive-nav"><?php echo $html;?></ul>      
											</div>  
										<?php }?>	
									</div><!-- #archives -->  										
								</div>
							</div>
        											</div>
        										</div>
        									</div>
        								</article>
        	                        </div>
        	                    </div>
                        	</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

<?php get_footer(); ?>