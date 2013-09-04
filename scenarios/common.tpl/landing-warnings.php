<?php ?>

	<body>

		<div id="loading_wrapper">
			<div id="loading">
				<h1><br><br>... loading ...</h1>
			</div>
		</div>
		<div id="canvas_warning">
			<div id="canvas_warning_subdiv">
				This browser is not able to run canvas.<br>
				Use modern browsers, FireFox, Chrome,<br>
				Internet Explorer 9+, ...<br>
			</div>
		</div>
		<div id="java-script-disabled">
			<div id="js-disabled-subdiv">
				JavaScript language is disabled in your browser.
				This site is best viewed when JavaScript is enabled.<br>
			</div>
		</div>

		<div id="canvas_wrap">
			<?= $canvas_background_img ?>
			<canvas id="canvas"> </canvas>
			<?= $canvas_foreground_img ?>

