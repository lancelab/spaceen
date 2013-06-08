<?php 	

	$env					=	array_key_exists( 'dev',		$_GET ) ? 'dev'								: 'prod';
	$main_css				=	array_key_exists( 'css', 		$_GET ) ? 'css/' . $_GET[ 'css' ] . '.css'	: $main_css;
	$content_canv_attached  =	array_key_exists( 'attach',		$_GET ) ? true								: $content_canv_attached;
	$content				=	array_key_exists( 'nocontent',	$_GET ) ? ''								: $content;

	$subtop					=	$env === 'dev' ? '../' . $templates . '/subtop.dev.php' : 'subtop.prod.php';

	///	special css for missed content
	if( !$content )
	{
		$main_css			=	'css/main.css';
	}

	require_once(			$content_folder . '/top.php'				);
	require_once(			$subtop										);	//	Apparently, in respect to leaf-php caller
	if( file_exists ( 		'./captured.js' ) )
	{
		echo "\t\t<script src=\"captured.js\"></script>";
	}
	echo "\n\n\t</head>\n";


	require_once(			'../' . $templates . '/subtop-warnings.php'	);

	if( $content )
	{
		if( !$content_canv_attached ) echo "\t\t</div>\n";
		require_once( $content );
		if( $content_canv_attached ) echo "\t\t</div>\n\n";
	}else{
		echo "\t\t</div>\n\n";
	}

	require_once(			'../' . $templates . '/bottom.php'			);

