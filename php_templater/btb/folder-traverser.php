<?php


	//	//\\//	Traverses:		file-system folder tree and takes callbacks.
	//			Algorithm:		simple recursion.
	//			Part:			of btb-framework.
	//			Dependencies:	none.

	namespace btb;



	//.	This statement is disabled to remove dependency on btb-core.
	//	require( rtrim( dirname(__FILE__), '\/' ) . '/core.php' );


	class folder_traverser
	{


		private	$file_counter;
		private	$folder_counter;
		public	$log;
		

		//Input:	$cb			- call back to be called during traversing: $cbobject->$cb();
		//						  callback can set up switches:
		//								$this->stop_entering_dir,
		//								$this->stop_dir_loop,
		//								$this->stop_traversing;
		//			$cbargs		- default arguments for $cb;
		//			$depth		- folder tree level;
		//			$absolute	- entry path to target folder; possibly not absolute;
		//			$relative	- relative path from $absolute to current funit-target;
		//							is a flag; at the beginning	is '';
		function run( $absolute, $relative, $cb, $depth = 0, $cbobject=null, $cbargs=null )
		{

			/// initializes work variables and switches used for work
			if( $relative === '' )
			{
				//.	this creates dependency on core: let's disable this check
				//	if( !core::check_and_set_version() ) return false;

				$this->stop_entering_dir	= false;
				$this->stop_dir_loop		= false;
				$this->stop_traversing		= false;

				$this->file_counter			= 0;
				$this->folder_counter		= 1;
				$this->log					= array( 'failure' => '', 'info' => '' );
			}
	
			if( $this->stop_traversing ) return;


			$current	= "$absolute/$relative";
			$dir		= scandir( $current ); //scandir — list files and directories inside the specified path

			if( $dir === FALSE )
			{	$this->log[ 'failure' ] = "Error scanning directory \"$current\"\n";
				$this->continue = false;
				return false;
			}

			foreach( $dir as $funit )
			{
				if( $funit === '.' or $funit === '..' ) continue;
	
				$new_relative		= $relative === '' ? $funit : "$relative/$funit";
				$absolute_to_funit	= "$absolute/$new_relative";
				$isdir				= is_dir( $absolute_to_funit );

				$info = $this->args_to_string( $absolute, $relative, $funit, $absolute_to_funit, $depth, $isdir );

				$this->log[ 'info' ] .= $info;

				if( $isdir )
				{
					$this->folder_counter++;
				}else{	
					$this->file_counter++;
				}

				if( $cbobject )
				{
					//variable functions:
					//http://php.net/manual/en/functions.variable-functions.php
					$cbobject->$cb( 			$this, $absolute, $relative, $funit, $absolute_to_funit, $depth, $isdir, $cbargs );

				}else{

					switch( $cb )
					{	
						case 'this->args_to_string':
							echo $info; // one, if wishes, can display info after traversing if 
							break;
						case 'this->do_clone':
							$this->do_clone(	$this, $absolute, $relative, $funit, $absolute_to_funit, $depth, $isdir, $cbargs );
							break;
						case 'this->do_rm':
							$this->do_rm(		$this, $absolute, $relative, $funit, $absolute_to_funit, $depth, $isdir, $cbargs );
							break;
						default:
							$cb(				$this, $absolute, $relative, $funit, $absolute_to_funit, $depth, $isdir, $cbargs );
							break;
					}
				}

				if( $this->stop_traversing )	return;
				if( $this->stop_dir_loop )		break;


				//Do test again because dir could be already deleted by callback:
				if( is_dir( $absolute_to_funit ) && !$this->stop_entering_dir )
				{		
					$this->run( $absolute, $new_relative, $cb, $depth + 1, $cbobject, $cbargs );
				}
				if( $this->stop_traversing ) return;
				if( $this->stop_dir_loop ) break;
			}
		}




		///	Lists contents of a folder.
		//	Good for debug.
		//	Usage:	like: ...->run(	'./traverser-test-target', '', 'this->args_to_string' ); 
		function args_to_string( $absolute, $new_relative, $file, $absolute_to_funit, $depth, $is_directory )
		{
			return str_pad(	'',	$depth,	"\t"	) .
						"absolute=$absolute, new_relative=$new_relative, file=$file,  " .
						"absolute_to_funit= $absolute_to_funit, depth=$depth, is_directory=$is_directory\n";
		}

	} //class ...




	//	//\\	Test case	/////////////////
	//	$ft = new folder_traverser();
	//	$ft->run( './traverser-test-target', '', 'this->args_to_string' ); 
	//	print_r( $ft->log );
	//	\\//	Test case	/////////////////
	

