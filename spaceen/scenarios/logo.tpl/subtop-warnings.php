<?php ?>

	<body>

		<div id="loading_wrapper">
			<div id="loading">
				<h1><br><br>... loading ...</h1>
			</div>
		</div>
		<div id="canvas_warning">
			<div id="canvas_warning_subdiv">
				This browser is not able to run canvas.<br />
				Use modern browsers, FireFox, Chrome,<br />
				Internet Explorer 9+, ...<br />
			</div>
		</div>
		<div id="java-script-disabled">
			<div id="js-disabled-subdiv">
				Your browser does not understand JavaScript language.<br />
				To view this page, enable JavaScript.<br />
			</div>
		</div>

		<script>
			btb$.graph.landing_warnings();
		</script>

		<div id="canvas_wrap">
			<canvas id="canvas"> </canvas>

