<?php


	// ini_set( 'display_errors', '1' );
	// error_reporting( E_ALL );

	///	Captures data and pictures.
	if( empty( $_GET[ 'command' ] ) ) require_once ( '../../../dev/capturer.php' );

	$upload_folder = '../captured';	// should have 733 permissions

	$command = $_GET[ 'command' ];
	$stamp = $_GET[ 'stamp' ];
	//$post = $HTTP_RAW_POST_DATA; // faulty
	//	TODO must use structured post = { type : 'png', data : toDataURL }
	$post = file_get_contents("php://input"); // TODO fails?: enctype="multipart/form-data"

	$path_to_save = "$upload_folder/captured-" . time() ."-$stamp";
	$do_save_me = false;

	switch ( $command )
	{
		case 'snap':

			// $path = './captured/' . $stamp . '.txt';
			$path = "$path_to_save.txt";
			$do_save_me = '<?php exit(); ?>' . $post;
			break;

		case 'conf':

			// $path = './js/captured' . $stamp . '.js';
			$path = "$path_to_save.js";
			$do_save_me = '<?php exit(); ?>' . $post;
			break;

		case 'picture':

			/*
			possible test instructions:
		
			ini_set( 'display_errors', '1' );
			error_reporting( E_ALL );


			NOT IN PRODUCTION: set writable perm. on "img" folder. 733 should work for www-data;

			land on:
			http://localhost/z/seen/spaceen/scenarios/logo/words/capturer.php?command=picture&stamp=9-52-36-962&data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAApIAAAECC

			make fake post:

			// from: http://en.wikipedia.org/wiki/Data_URI_scheme
			// chunkify: http://stackoverflow.com/questions/888461/how-to-base64-decode-large-files-in-php

$post = <<<DOCDOCDOC
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA
AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
9TXL0Y4OHwAAAABJRU5ErkJggg==
DOCDOCDOC;

			*/
			
			//$clean_pos = str_replace( ' ', '+', $post );
			$clean = substr( $post, strpos( $post, ',' ) );	// TODM very slow?
			$do_save_me = base64_decode( $clean );
			
			if( $do_save_me === FALSE )
			{
				echo 'failure decode captured picture';
				exit();
			}

			$path = "$path_to_save.png";
			break;

		default:

			echo 'failure saving captured data: "&data=" directive is not defined;';
			exit();
	}

	if( file_put_contents( $path, $do_save_me ) === FALSE )
	{
		echo 'failure of saving with command = ' . $command;

	}else{

		// $ww = chmod( $path, 0000 );	//	best working security
		$ww = chmod( $path, 0404 );
		if( !$ww )
		{
			echo "success $command but cannot change mode to 0404";
		}else{
			echo 'success saving and setting chmod; command = ' . $command;
		}

	}


