<?php

	// e rror_reporting( E_ALL );
	// i ni_set( 'display_errors' , '1' );

	$content_folder			=	'../whirlio.cont'; 
	$content				=	$content_folder . '/body.php';

	$html_land_warn_and_bot_in_top_scen	=	true;

	$scenarios_css			=	'main';
	$player_css				=	'main';

	$content_canv_attached	=	false;
	$canvas_background_img	=	'<img id="canvasBgIm" src="img/web_page/canvas_background.jpg">' . "\n";

	require_once(			'../../../php_templater/build-page.php' );

