<?php ?>

	<body>

		<div id="loading_wrapper-btb">
			<div id="loading-btb">
				<h1><br><br>... loading ...</h1>
			</div>
		</div>
		<div id="canvas_warning-btb">
			<div id="canvas_warning_subdiv-btb">
				This browser is not able to run canvas.<br>
				Use modern browsers, FireFox, Chrome,<br>
				Internet Explorer 9+, ...<br>
			</div>
		</div>
		<div id="java-script-disabled-btb">
			<div id="js-disabled-subdiv-btb">
				JavaScript language is disabled in your browser.
				This site is best viewed when JavaScript is enabled.<br>
			</div>
		</div>

		<div id="canvas_wrap-btb">
			<?= $canvas_background_img ?>
			<canvas id="canvas-btb"> </canvas>
			<?= $canvas_foreground_img ?>

