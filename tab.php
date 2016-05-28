<div class="tabs_title_box">
    <ul class="tabs_title clearfix">
        <li><a href="#"><i class="fa fa-comments-o"></i></a></li>
        <li><a href="#"><i class="fa fa-clock-o"></i></a></li>
        <li><a href="#"><i class="fa fa-fire"></i></a></li>
    </ul>
</div>
<div class="tab_content">
    <div class="tabs_item" id="recent-comment">
        <ul>
            <?php h_comments($outer='博主',$limit= 10);?>
        </ul>
    </div>
    <div class="tabs_item hide" id="recent-post">

    </div>
    <div class="tabs_item hide" id="hot-post">
        <ul class="comm_posts">
            <?php if(function_exists('most_comm_posts')) most_comm_posts(120,12); ?>
        </ul>
    </div>
</div>
