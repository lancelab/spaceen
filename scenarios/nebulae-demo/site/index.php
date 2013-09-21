<?php

	// e rror_reporting( E_ALL );
	// ini _set( 'display_errors' , '1' );


	$content_folder							=	'../cont.cont'; // (( only to take top.php and body.php))
	$content								=	$content_folder . '/body.php';
	$html_land_warn_and_bot_in_top_scen		=	true;

	$canvas_background_img					=	''; //'<img id="canvasBgIm" src="img/web_page/canvas_background.jpg">' . "\n";

	//$scenarios_css						=	'main';
	$player_css								=	'main';
	$content_canv_attached					=	false;


	$addon_jslinks							=	array (

		'util-z-axial.js'	=>	'dummy'

	);

	require_once(							'../../../php_templater/build-page.php' );

