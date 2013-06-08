
//	//\\//			Plugin. Loads images.




( function () {

		var self; // Plugin itself

		///	Attaches plugin
		( function () {
			var btb		= window.btb$				= window.btb$				|| {};		
			var graph	= btb.graph					= btb.graph					|| {};
			self		= graph.load_images			= graph.load_images			|| {};
		}) ();


		self.sprites					= [];
		self.itemsMax;
		self.number_of_loaded_images	= 0;



		///	Fires loading images for each sprite.
		//	Sets img.onload to check do all images loaded.
		//	When all loaded, self.itemsMax === self.number_of_loaded_images
		self.load = function ( 

			base_image_path,		// path relative to app root
			extension,				// png, jpg, ...
			itemsMax				// how many ...
		) {

			self.itemsMax = itemsMax;
			for( var ii = 0; ii < itemsMax; ii++ )
			{

				var spr = self.sprites[ ii ] = self.sprites[ ii ] || {};
				//. Possibly redundant protector against running "load" twice.
				if( spr.loaded ) continue;

				spr.img = new Image();

				spr.img.onload	= ( function ( ii_, spr_) {

					return ( function () {
						if( !spr_.loaded )
						{
							spr_.loaded			= true;
							spr_.half_width		= Math.floor( spr_.img.width * 0.5 );
							spr_.half_height	= Math.floor( spr_.img.height * 0.5 );
							self.number_of_loaded_images++;

							if( self.itemsMax === self.number_of_loaded_images )
							{
								//.	Disables "loading" warning
								var ww = document.getElementById( 'loading' );
								if( ww ) ww.style.display = 'none';	
							}
							// c ccc( 'loaded ' + ii_ + ' number_of_loaded_images=' + self.number_of_loaded_images );
						}
					});
				}) ( ii, spr );

				var img_path	= base_image_path + ii + '.' + extension;
				spr.img.src		= img_path;

			};
			if( btb$ && btb$.ifdeb ) btb$.ifdeb( 'Image load fired' );
		};



		///	Returns true only when all images are loaded
		self.allImagesLoaded = function ()
		{
			return self.itemsMax === self.number_of_loaded_images;
		};

		return self;

}) ();

