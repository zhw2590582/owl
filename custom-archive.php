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

                        </div>
                    </div>

                    <div class="main_body colbox">

                        <div id="main" class="col">
                            <div class="main-inner">
        	                    <div id="posts-box">
        	                        <div class="posts clearfix">
        								<article>
        									<div class="post-wrap">
        										<div class="post-inner">
        											<div class="post-body">
								<div class="content">
																<header>
									<h2 class="entry-title"><a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>
									<ul class="top_meta"></ul>
								</header>
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