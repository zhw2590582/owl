<?php

?>
	<div id="lSidebar" class="widgets">
		<div class="sideinner">
			<div class="lContent">
                <?php if (function_exists('dynamic_sidebar') && dynamic_sidebar('Sidebar') ) : else : ?>
                <?php endif; ?>
			</div>
		</div>
		<div class="sidectrl">
			<div class="sidebar-ctrl">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	</div>



