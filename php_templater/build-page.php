<?php 	



	ini_set( 'display_errors', '1' );
	error_reporting( E_ALL );


	$my_parent	= rtrim( dirname(__FILE__), '\/' );


	///	Overrides global variable "name" from query.
	//	Makes sure it is $default if no initial value exist and no query.
	function sspp( $name, $prefix='', $postfix='', $default=FALSE )
	{
		$ix	= 's_' . $name ;
		if(	 array_key_exists(	$ix,	$_GET		) ) $GLOBALS[ $name ] = $prefix	. $_GET[ $ix ] . $postfix;
		if( !array_key_exists(	$name,	$GLOBALS	) ) $GLOBALS[ $name ] = $default;
	}


	///	Overrides css-file "name" from query.
	//	Makes sure it is $default if no initial value exist and no query.
	function sscss( $name, $prefix='', $postfix='', $default=FALSE )
	{
		$ix	= 's_' . $name ;
		if(	array_key_exists(	$ix,	$_GET		) ) $GLOBALS[ $name ] = $_GET[ $ix ];
		if( array_key_exists(	$name,	$GLOBALS	) ) $GLOBALS[ $name ] = $prefix	. $GLOBALS[ $name ] . $postfix;
		if( !array_key_exists(	$name,	$GLOBALS	) ) $GLOBALS[ $name ] = false;
	}


	//.	For
	//	$jslinks and optionally for $warnings_and_bottom_dir
	//.	Cannot change this because minifier is bound to this
	//	TODM put to docs:
	define( 'TEMPLATES', 'common.tpl' );


	
	// //\\	Spawns configuration
	//$env = array_key_exists( 's_dev', $_GET ) ? 'dev'	: 'prod';

	sscss(	 'scenarios_css',	'../../common.tpl/css/',	'.css'										);
	sscss(	 'album_css',		'../common.tpl/css/',		'.css'										);
	sscss(	 'player_css',		'css/',						'.css'										);
	sspp(	 'warnings_css',	'',							'',		'../../common.tpl/css/warnings.css' );
	//.	Sets default path to content file
	sspp(	 'content',			'',							'',		'./content.php'						);
	//.	Sets default path to content folder
	sspp(	 'content_folder',	'',							'',		'.'									);




	if( !$scenarios_css && !$album_css && !$player_css ) $scenarios_css = '../../common.tpl/css/main.css';


	$content_canv_attached	=	array_key_exists( 's_attach',			$_GET )	? true						: $content_canv_attached;
	$content				=	array_key_exists( 's_nocontent',		$_GET )	? ''						: $content;
	$captured				=	array_key_exists( 's_captured',			$_GET )	? $_GET[ 's_captured' ]		: '';

	if( isset( $html_land_warn_and_bot_in_top_scen ) ) $scenarios_templates = $html_land_warn_and_bot_in_top_scen;
	// TODM poorly choosen name: $scenarios_templates. Remove.
	$warnings_and_bottom_dir	=	!empty( $scenarios_templates ) ? '../../common.tpl' : '../' . TEMPLATES;


	if( !isset( $canvas_background_img ) )	$canvas_background_img	=  '';
	if( !isset( $canvas_foreground_img ) )	$canvas_foreground_img	=  '';
	if( !isset( $content_folder ) )			$content_folder	=  '.';
	// \\//	Spawns configuration





	// //\\//	Building the page

	require_once(			$content_folder . '/top.php'				);
	require_once(			'../../../js/js-detector.js'				);


	//.	(( It's more general. Put first. ))
	if( $warnings_css )		echo "\t\t<link rel=\"stylesheet\"		href=\"" . $warnings_css	. "\">\n";
	if( $scenarios_css )	echo "\t\t<link rel=\"stylesheet\"		href=\"" . $scenarios_css	. "\">\n";
	if( $album_css )		echo "\t\t<link rel=\"stylesheet\"		href=\"" . $album_css		. "\">\n";
	if( $player_css )		echo "\t\t<link rel=\"stylesheet\"		href=\"" . $player_css		. "\">\n";




	//	//\\	Gets core js-links	/////////////////

	require( $my_parent . '/btb/get-files-by-regex.php' );

	$w_prefix		= "\t\t<script type=\"text/javascript\" src=\"../../../js/";
	$w_postfix		= "\"></script>\n";
	$w_regex		= '/\.js$/';

	$gf = new btb\get_files_by_regex();
	$w_entry		= $my_parent . '/../js/';
	$w_sub			= '3rd';
	$gf->run( $w_entry . $w_sub,	$w_regex, $w_prefix . $w_sub . '/', $w_postfix ); 
	$w_sub			= 'btb';
	$gf->run( $w_entry . $w_sub,	$w_regex, $w_prefix . $w_sub . '/', $w_postfix ); 
	$w_sub			= 'core';
	$gf->run( $w_entry . $w_sub,	$w_regex, $w_prefix . $w_sub . '/', $w_postfix ); 

	$w_sub			= 'tester';
	$gf->run( $w_entry . $w_sub,	$w_regex, $w_prefix . $w_sub . '/', $w_postfix ); 

	//	\\//	Gets core js-links	/////////////////

	$addon_prefix	= "\t\t<script src=\"../../../js/addon/";
	$addon_postfix	= "\"></script>\n";
	if( isset( $addon_jslinks ) )
	{
		foreach( $addon_jslinks as $link => $ww )
		{
			echo $addon_prefix . $link . $addon_postfix;
		}
	}

	$w_prefix		= "\t\t<script type=\"text/javascript\" src=\"js/";
	$w_postfix		= "\"></script>\n";
	$w_regex		= '/\.js$/';
	$w_entry		= './js';
	$gf->run( $w_entry,	$w_regex, $w_prefix, $w_postfix ); 

	$ww						= 'js/scenario.js';
	if( !file_exists( './' . $ww ) )
	{
		$ww					= '../common.tpl/js/scenario.js';
		if( !file_exists( $ww ) )
		{
			$ww				= '../../common.tpl/js/scenario.js';
			if( !file_exists( $ww ) ) $ww = '';
		}
	}
	if( $ww ) echo			"\t\t<script src=\"$ww\"></script>\n";


	///	Takes captured data
	if( strlen( $captured ) > 0 )
	{
		echo "\t\t<script src=\"captured.js/captured" . $captured . ".js\"></script>";
	}else if( file_exists ( './captured.js/captured.js' ) ) {
		echo "\t\t<script src=\"captured.js/captured.js\"></script>";
	}
	echo "\n\n\t</head>\n";



	require_once(			$warnings_and_bottom_dir . '/landing-warnings.php'	);

	if( $content )
	{
		if( !$content_canv_attached ) echo "\t\t</div>\n";
		require_once( $content );
		if( $content_canv_attached ) echo "\t\t</div>\n\n";
	}else{
		echo "\t\t</div>\n\n";
	}

	require_once(			$warnings_and_bottom_dir . '/bottom.php'			);

