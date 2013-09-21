<?php



	namespace btb;

	require( rtrim( dirname(__FILE__), '\/' ) . '/folder-traverser.php' );


	/// Builds text of links to be inserted in landing HTML page.
	//	Collects links from files in folder tree.
	class get_files_by_regex
	{

		public	$links;
		public	$links_wrapped;
		private $prefix;
		private $postfix;
 		private $regex;

		///	collects information
		public function callback ( $traverser, $absolute, $relative, $funit, $absolute_to_funit, $depth, $isdir, $cbargs = null )
		{
			if( !$isdir && preg_match( $this->regex, $funit ) )
			{ 
				$full_path				=	$relative ? "$relative/$funit" : $funit;
				$this->links[]			=	"$full_path";
				$this->links_wrapped	.=	$this->prefix . "$full_path" . $this->postfix;
				// echo "$full_path\n";
			}
		}

		public function run( $target_entry, $regex, $prefix = '', $postfix = '' )
		{
			$this->prefix			= $prefix;
			$this->postfix			= $postfix;
			$this->regex			= $regex;
			$this->links			= array();
			$this->links_wrapped 	= '';

			$ft = new folder_traverser();
			$ft->run( $target_entry, '', 'callback', 0, $this  );
			// print_r( $this->links );
			if( $this->links_wrapped ) echo $this->links_wrapped;
		}


	} //class ...




	//	//\\	Test case	/////////////////
	//	$gf = new get_files_by_regex();
	//	$gf->run( './traverser-test-target', '/t\.js$/', '', "\n" ); 
	//	\\//	Test case	/////////////////
	

