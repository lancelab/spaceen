<?php

	error_reporting( E_ALL );
	ini_set( 'display_errors' , '1' );

	$templates				=	'logo.tpl';
	$content_folder			=	'.'; 
	$canvas_background_img	=	'';
	$main_css				=	'../' . $templates . '/css/main.css';
	$content				=	'content.php';
	$content_canv_attached	=	false;

	require_once(			'../../php_templater/build-page.php' );

