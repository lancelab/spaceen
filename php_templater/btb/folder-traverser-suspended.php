<?php

	

	//******************************************************************************
	//	//\\//	Suspended work. Ported from earlier package, but not refactored yet.
	//******************************************************************************



		//sometimes when deleting files,
		//we need to ease permissions like:
		//chmod -R 777 staging




	//Removes entity $file even it is not empty.
	function do_rm(	$absolute, $relative, $file, $absolute_to_funit, $depth, $is_directory, $filter=null )
	{
		$r = &$this->log;

		$indent=str_pad('',$depth,"\t");
		$new_relative=$relative=='' ? $file : "$relative/$file";

		if($filter!==null)
		{
			if(isset($filter['match']))
			{
				if(!preg_match($filter['match'],$file))
				{
					$r['log'].=$indent."not matched, so preserved: $file.\n";
					return;
				}
			}elseif(isset($filter['skip']))
			{
				if(preg_match($filter['skip'],$file))
				{
					$r['log'].=$indent."skipped, so preserved $file.\n";
					return;
				}
			}
		}

		if($is_directory)
		{		
			$r['log'].=$indent."cleaning contents of dir = $absolute_to_funit.\n";
			$this->traverse_tree($absolute, $new_relative, $depth+1, 'this->do_rm');
			//possibly add this:
			//$w=chmod($absolute_to_funit,0777);
			//if(!$w)$r['failure'].="Failed change mode to 0777 for directory $absolute_to_funit.\n";
			$r['log'].=$indent."removing dir = $absolute_to_funit.\n";
			$w=rmdir($absolute_to_funit);
			if(!$w)$r['failure'].="Failed to remove directory $absolute_to_funit.\n";
		}else{
			$r['log'].=$indent."deleting file = $absolute_to_funit.\n";
			$w=unlink($absolute_to_funit);
			if(!$w)$r['failure'].="Failed delete file $absolute_to_funit.\n";
		}
	}

 
	function do_clone($absolute, $relative, $file, $absolute_to_funit, $depth, $is_directory, $args)
	{

		$r=&self::$r;

		$new_relative=$relative=='' ? $file : "$relative/$file";
		$cloned_path="$args/$new_relative";
		if($is_directory)
		{		
			$r['log'].=str_pad('',$depth,"\t")."cloning dir $cloned_path from $absolute.\n";
			if(file_exists($cloned_path) and is_dir($cloned_path))
			{
				$this->rm($cloned_path,$r);
			}
			$w=mkdir($cloned_path);
			if(!$w)$r['failure'].="Failed create directory $cloned_path.\n";
			$w=chmod($cloned_path,0777);
			if(!$w)$r['failure'].="Failed change mode to 0777 for create directory $cloned_path.\n";
		}else{
			$r['log'].=str_pad('',$depth,"\t")."cloning file $cloned_path from $absolute_to_funit.\n";
			$w=copy($absolute_to_funit, $cloned_path);
			if(!$w)$r['failure'].="Failed copy $absolute_to_funit to $cloned_path.\n";
		}
	}
	//-------------------------------
	//Callbacks called as 'this->...'
	//===============================




	//======================
	//Shortcuts:
	//----------------------
	function rm_contents($path,$filter=null)
	{
		$this->traverse_tree($path,'',0, 'this->do_rm',$filter);
	}  

	function rm($path,$filter=null)
	{
		$r=&self::$r;

		$this->rm_contents($path,$r,$filter);
		$r['log'].="r e m o v i n g    d i r   =  $path.\n";
		$w=rmdir($path);
		if(!$w)$r['failure'].="Failed to remove directory $path.\n";
	}  

	function clone_contents($contents_container, $destination_container)
	{
		$r=&self::$r;

		$this->set_log($r);
		if(file_exists($destination_container))
		{
			if(!is_dir($destination_container))
			{
				$r['log'].="d e l e t i n g   f i l e   $destination_container.\n";
				$w=unlink($destination_container);
				if(!$w)
				{ 
					$r['failure'].="Failed delete file $destination_container.\n";
					return;
				}
			}
		}else{
			$r['log'].="c r e a t i n g   d i r e c t o r y   $destination_container.\n";
			$w=mkdir($destination_container);
			if(!$w)$r['failure'].="Failed create directory $destination_container.\n";
			$r['log'].="c h a n g i n g   m o d e   to  0777 for directory  $destination_container.\n";
			$w=chmod($destination_container,0777);
			if(!$w)$r['failure'].="Failed change mode to 0777 for directory $destination_container.\n";
		}
		tp::$util->exithtml($r);
		$this->traverse_tree($contents_container,'',0, 'this->do_clone', $destination_container);
	}


	//Remove svn meta files:
	function strip_svn($path)
	{
		$this->rm_contents($path,array('match'=>'/^\.svn/'));
	}

	//----------------------
	//Shortcuts:
	//======================

