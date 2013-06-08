<?php

	// e rror_reporting( E_ALL );
	// i ni_set( 'display_errors' , '1' );

	$templates				=	'txt.tpl';
	$content_folder			=	'../txt-whirlio.cont'; 
	$canvas_background_img	=	'<img id="canvasBgIm" src="img/web_page/canvas_background.jpg">' . "\n";
	$main_css				=	'../' . $templates . '/css/main.css';
	$content				=	$content_folder . '/body.php';
	$content_canv_attached	=	false;

	require_once(			'../../php_templater/build-page.php' );

