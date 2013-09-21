<?php

	///	Core class for btb-package

	namespace btb;



	class core
	{

		const MINIMUM_ALLOWED_VERSION=50302;

			//	perhaps outside of PHP possibilities:
			//	const PHP_VERSION_ID ='test'.'moo';
			//  const PHP_VERSION_ID ='test'.($version[0] * 10000 + $version[1] * 100 + $version[2]);


		public static $version_allowed = null;
		// public static $btb_root_folder;

		public static function check_and_set_version ()
		{
			if( self::$version_allowed ) return true;

			if( !defined( 'PHP_VERSION_ID' ) )
			{
			   	$version = explode('.', PHP_VERSION);
				define('PHP_VERSION_ID', ($version[0] * 10000 + $version[1] * 100 + $version[2]));
			}

			self::$version_allowed = PHP_VERSION_ID >= self::MINIMUM_ALLOWED_VERSION;
			return self::$version_allowed;
		}

		// TODO self::$btb_root_folder = rtrim( dirname(__FILE__), '\/' );

	}

	//:	tests version check
	$is = core::check_and_set_version();
	// echo ( $is ? 'allowed' : 'forbidden' ) . "\n";
	if( !$is )
	{
		echo 	"PHP version ". PHP_VERSION_ID . " is too low. " .
				core::MINIMUM_ALLOWED_VERSION . " or higher is required for this application.\n"; 
		exit();
	}

	//	require_once(self::$root_folder.'/config.php');



