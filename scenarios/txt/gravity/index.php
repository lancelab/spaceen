<?php

	// e rror_reporting( E_ALL );
	// i ni_set( 'display_errors' , '1' );

	$html_land_warn_and_bot_in_top_scen	=	true;
	$content_folder			=	'.'; 
	$canvas_background_img	=	'<img id="canvasBgIm-btb" src="img/web_page/canvas_background.png">' . "\n";

	$scenarios_css			=	'main';
	$player_css				=	'main';

	$content				=	$content_folder . '/body.php';
	$content_canv_attached	=	false;

	require_once(			'../../../php_templater/build-page.php' );

