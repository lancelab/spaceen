<?php

	// //\\// Calls local host and saves retrieved file


	if( !array_key_exists( 2, $argv ) ) exit;

	$link							= $argv[1];
	$assembled_minified_file_name	= $argv[2];

		$session = curl_init($link);						

		curl_setopt($session, CURLOPT_HEADER, false); 	    
		curl_setopt($session, CURLOPT_RETURNTRANSFER, true);


		// ------------------------------------------------------
		// Apparently fails on outdated PHP version:
		// curl_setopt($session, CURLOPT_TIMEOUT_MS, 10);

		// Possibly enough to load: modern sites are fast, and
		// file must be simple:
		curl_setopt($session, CURLOPT_TIMEOUT, 10);
		// ------------------------------------------------------



		// ------------------------------------------------------
		// No solution:
		// check data exists: http://stackoverflow.com/questions/4095193/check-that-file-exists-on-different-domain-without-reading-it
		// http://stackoverflow.com/questions/9062798/php-curl-timeout-is-not-working
		// CURLOPT_CONNECTTIMEOUT_MS: Added in cURL 7.16.2. Available since PHP 5.2.3.
		// if (!defined(CURLOPT_CONNECTTIMEOUT_MS)) define('CURLOPT_CONNECTTIMEOUT_MS', 156);
		// curl_setopt($session, CURLOPT_CONNECTTIMEOUT_MS, 10);

		curl_setopt($session, CURLOPT_CONNECTTIMEOUT, 4);
		// ------------------------------------------------------


		$returned = curl_exec($session);

		if(curl_errno($session)){
		 	$content .= "\n";
			// uncomment for debug:
		 	//$content .= "\n".'debug: ' . 'error:' . 
			//			curl_errno($session) . ' ' . curl_error($session);

	 		curl_close($session);
		}else{
	 		curl_close($session);
		}

		//echo $returned;
		echo ( "... calling\n... " . $link . "\n... and placing to\n... " . $assembled_minified_file_name . "\n");

		//D ebug: emulates an error.		
		//$matches = array ();
		//if( preg_match_all( '/\/words\//', $assembled_minified_file_name, $matches ) )
		//{
		//	moo_boo(); $boo = goo / 0; 
		//}

		file_put_contents( $assembled_minified_file_name, $returned );


