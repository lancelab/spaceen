<?php

	//	//\\//	URL-query: ?s_dev for animation; ?s_dev=list for list.

	// e rror_reporting( E_ALL );
	// i ni_set( 'display_errors' , '1' );


	$static_list			=	array_key_exists( 's_list', $_GET ) ? 'list' : '';

	$content_folder			=	'../landing.cont';

	$html_land_warn_and_bot_in_top_scen	=	true;

	$scenarios_css			=	'main';
	$player_css				=	'main';
	$canvas_background_img	=	'<img id="canvasBgIm" src="img/web_page/canvas_background.png">' . "\n"; //	'';

	$content_canv_attached	=	false;

	$body					=	'body';
	$content				=	$content_folder . '/' . $body . '.php';


	/// Downfalls to development list and exits
	if( $static_list === 'list' )
	{
		require_once(		$content_folder . '/top.php'										);
		echo				"\t\t<link rel=\"stylesheet\"		href=\"../../common.tpl/css/" . $scenarios_css ."\">\n"	;
		echo				"\t\t</head><body>\n"												;
		require_once(		$content															);
		echo				"</body></html>"													;
		exit();
	}

	require_once(			'../../../php_templater/build-page.php' );

