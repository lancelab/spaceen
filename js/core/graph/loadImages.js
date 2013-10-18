
//	//\\//			Plugin. Loads images.




( function () {

		var btb				= window.btb$				= window.btb$				|| {};		
		var graph			= btb.graph					= btb.graph					|| {};
		var conf			= graph.conf				= graph.conf				|| {};
		var load_images		= graph.load_images			= graph.load_images			|| {};
		var mname			= 'load-images.js: ';		// stub for messaging from this module;
		var debby			= btb.debby					= btb.debby					|| {};
		var ifdeb			= function ( msg )			{ if( debby.on ) btb.deb( mname + msg ) };



		///	Sugar wrapper around LoadManager.
		//	Creates LoadManager who fires loading, and returns loader.
		//	Returned LoadManager is always not null and
		//	always has sprites array which can be empty.
		//
		//	Usage sample:
		//		images2D = btb.load_images.load( config2D );
		//		images3D = btb.load_images.load( config3D );
		//			In this case, images2D.sprites, images2D.allImagesLoaded can be used;
		load_images.load = function ( arg )
		{
			return load_images.LoadManager().load( arg );
		};





		/// Functional Constructor LoadManager.
		//	Returns object which handles loading group of images
		//	like group of sprites for 3D scene or group for 2D scene.
		//	
		//	Usage sample: see "Sugar wrapper around LoadManager";
		//
		load_images.LoadManager = function ()
		{

			//.	Load-manager. Will be returned.
			var lman						= {};
			lman.sprites					= [];
			lman.count;
			lman.number_of_loaded_images	= 0;
			var allImagesAreLoaded			= false;


			///	Fires loading images for each sprite.
			//	Sets img.onload to check do all images loaded.
			//	When all loaded, lman.count === lman.number_of_loaded_images.
			lman.load = function ( arg )
			{

				if( !arg.mode ) return;	// TODM possibly redundant;

				//. Possibly redundant protector against running "load" twice;
				if( lman.loadFired ) return lman;

				var count	= arg.count;
				if( arg.mode === 'names' ) count = count || arg.names.length;
				if( arg.mode === 'single' ) count = 1;
				lman.count		= count;
				lman.conf		= arg;

				for( var ii = 0; ii < count; ii++ )
				{

					var spr = lman.sprites[ ii ] = lman.sprites[ ii ] || {};

					spr.img = new Image();

					spr.img.onload	= ( function ( ii_, spr_ ) {

						return ( function () {

							//.	Possibly protects fire-of-onload image twice. TODM possibly redundant.
							if( !spr_.loaded )
							{
								spr_.loaded			= true;
								spr_.half_width		= Math.floor( spr_.img.width * 0.5 );
								spr_.half_height	= Math.floor( spr_.img.height * 0.5 );
								lman.number_of_loaded_images++;

								if( arg.declipify )		declipify( arg.declipify, spr_.img );
								if( arg.singleLoaded )	arg.singleLoaded( ii_, spr_ );
								ifdeb(	'loaded ' + ii_ + ' ' +  spr_.img.src +
										' number_of_loaded_images=' + lman.number_of_loaded_images, spr_.img );

								//.	Protects from firing twice.  TODM possibly redundant.
								if( !allImagesAreLoaded && lman.count === lman.number_of_loaded_images )
								{
									allImagesAreLoaded = true;
									if( arg.allLoaded ) arg.allLoaded( lman );
									//.	Disables "loading" warning
									if( arg.allLoadedDewarning )
									{
										var ww = document.getElementById( 'loading-btb' );
										if( ww ) ww.style.display = 'none';
									}
								}
							}
						});
					}) ( ii, spr );

					if( arg.mode === 'names' )
					{
						var path	= arg.path + '/' + arg.names [ ii ];
						var name	= arg.names [ ii ];
					}else if( arg.mode === 'template' ) {
						var path	= arg.path + '/' + arg.template + ii + '.' + arg.ext;
						var name	= path;
					}else{
						var path	= arg.path;
						var name	= path; 
					}

					spr.img.src		= path;
					spr.name		= name;

				}; // for( var ii = 0; ii < count; ii++ )


				lman.loadFired = true;

				ifdeb( 'fired load path = ' + arg.path );
				return lman;
			};



			///	Returns true only when all images are loaded
			lman.allImagesLoaded = function ()
			{
				return allImagesAreLoaded; // was: lman.count === lman.number_of_loaded_images;
			};

			return lman;
		}; /// Functional Constructor


		

		/// Extracts templated or named sets of sprites
		var declipify = load_images.declipify = function ( settings, imgContainer )
		{
			var data		= [];
			var canvas		= document.createElement( 'canvas' );
			var ctx			= canvas.getContext( '2d' );
			var templified	= settings.templified;
			var named		= settings.named;

			if( templified )
			{
				
				for( var gix = 0; gix < templified.length; gix++ )
				{
					var group		= templified[ gix ];
					var main		= group.main;
					var children	= group.children;
					var dgroup		= data[ gix ]	= {};
					dgroup.main		= doExtractClip( ctx, canvas, imgContainer, main );

					//: simple debug
					// c onsole.log(	'dataULR=' + (!!data.main) ); 
					//var targetImg	= document.getElementById( 'expo' + gix + '-left-img-btb' );
					//targetImg.src	= dgroup.main;

					dgroup.children	= [];
					for( var cix = 0; cix < children.length; cix++ )
					{
						dchild = doExtractClip( ctx, canvas, imgContainer, children[ cix ] );
						dgroup.children[ cix ]	= dchild;

						//: simple debug
						//var id			= 'expo' + gix + '-' + cix + '-right-sub-img-btb';
						//var targetImg	= document.getElementById( id );
						//targetImg.src	= dchild;
					}
				}
				distributeDeclipifiedImages ( data );
			}


			if( named )
			{
				for( var cssid in named )
				{
					if( !named.hasOwnProperty( cssid ) ) continue;
					var rect		= named[ cssid ];
					var extract		= doExtractClip( ctx, canvas, imgContainer, rect );
					var targetImg	= document.getElementById( cssid );
					targetImg.src	= extract;
					ifdeb( 'extracted img with cssid: ' + cssid + ' extracted = ' + (!!extract) ); // + ' rect=', rect ); 
				}
			}

		};	//	load_images.declipify(




	/// Helper
	var doExtractClip = function ( ctx, canvas, imgContainer, rect )
	{
			var width	=	canvas.width	= rect[2] - rect[0] + 1;
			var height	=	canvas.height	= rect[3] - rect[1] + 1;
			// c onsole.log( ' extracting ... w,h=' + width + ', ' + height, rect );
			ctx.drawImage(	imgContainer, rect[0], rect[1], width, height, 0, 0, width, height );
			var url = 'img/no-toDataURL-support.png';
			try {
				url = canvas.toDataURL( "image/png" );
			}catch ( error ) {
				ifdeb(	'failed doing toDataURL ' +
						( typeof error === 'object' && error !== null ? error.message : '' + error )
				)	
			}
			return url;
	};		


	/// Helper. Distributes images to tabbed dialog content after these images were declipped.
	//	Designed only for templated-sprites.
	var distributeDeclipifiedImages = function ( data )
	{
			for( var gix = 0; gix < data.length; gix++ )
			{
				var dgroup		= data[ gix ];
				var main		= dgroup.main;
				var children	= dgroup.children;
				var targetImg	= document.getElementById( 'expo' + gix + '-left-img-btb' ); // TODM generalize template as formal-parameter.
				targetImg.src	= main;

				for( var cix = 0; cix < children.length; cix++ )
				{
					var dchild		= children[ cix ];
					var id			= 'expo' + gix + '-' + cix + '-right-sub-img-btb';
					// c onsole.log( id );
					var targetImg	= document.getElementById( id );
					targetImg.src	= dchild;
				}
			}
	};


	load_images.groupsLoader =
	{
		ran			: false,
		loadsN		: 0,
		loadsCount	: 0,
		groups		: []
	}

	///	An alternative to allLoadedCallback
	load_images.groupsLoader.allLoaded = function ()
	{
		if( this.loadsN === this.loadsCount ) return this;
		return false;
	}

	///	One-time call to initialte image-groups for loading, usually at page landing
	load_images.groupsLoader.run = function ( toLoad, allLoadedCallback )
	{
		var gLd	= this;
		var grp	= gLd.groups;	// TODO bug: img. name cannot be 'groups';

		//.	courtesy protection from running twice
		if( gLd.ran ) return;
		gLd.ran	= true;

		for( var ii = 0; ii < toLoad.length; ii++ )
		{
			var load	= load_images.load;
			var tol		= toLoad[ ii ];

			//.	config sugar: skips loads without mode specified
			if( !tol || !tol.mode ) continue;
			if( gLd.loadsN === 0 ) ifdeb( 'Img groupsLoader began with ' + tol.name );

			//.	adds gLd-completion-test to tol.allLoaded
			( function ( allLoaded ) {
					var wAllLoaded = allLoaded;
					tol.allLoaded = function ( lman ) {
						if( wAllLoaded ) wAllLoaded( lman );
						gLd.loadsCount++;
						if( gLd.loadsN === gLd.loadsCount )
						{
							ifdeb( 'Img groupsLoader completed all ' + gLd.loadsN + ' group(s) load.' );	
							if( allLoadedCallback ) allLoadedCallback( gLd );
						}
						return gLd;
					};
			}) ( tol.allLoaded );

			var name			= tol.name;
			gLd[ name ]			= load( tol );	// TODO bug: name cannot be 'run', 'allLoaded', etc.; FIX=make gLd.names = {} and gLd.names[ name ] = load ....
			grp[ gLd.loadsN ]	= gLd[ name ];
			gLd.loadsN++;
		}

		if( gLd.loadsN ) ifdeb( 'Img groupsLoader loads ' + gLd.loadsN + ' group(s) ... ' );

	};





}) ();

