//	//\\//			Plugin. Convenience functions for 3D-draw on canvas.
//					Uses graphic context taken from tp$.draw3D.

/// Builds:		plugin body singleton
//	Does not:	need canvas environment to instantiate.
//	Input:		no canvas environment is required.


( function ( ) { 

		var btb			= window.btb$				= window.btb$				|| {};		
		var	graph		= btb.graph					= btb.graph					|| {};
		var	runFlyer3D	= graph.runFlyer3D			= graph.runFlyer3D			|| {};
		var	ifdeb		= btb.ifdeb;


		///	Input:	boxMax - size of space-box confining all the 3D-items
		runFlyer3D.generateSprites = function( conf )
		{

			var conf3D			= conf.conf3D;
			var itemsMax		= conf.itemsMax;
			var bodyRadiusMax	= conf.bodyRadiusMax;

			var boxMaxX			= conf3D.boxMaxX;
			var boxMaxY			= conf3D.boxMaxY;
			var boxMaxZ			= conf3D.boxMaxZ;
			var boxCenterX		= conf3D.boxCenterX;
			var boxCenterY		= conf3D.boxCenterY;
			var boxCenterZ		= conf3D.boxCenterZ;
			var putItemsToCircleR = conf3D.putItemsToCircleR;

			var PI2		= 2 * 3.1415926;
			var items	= [];
			var radius	= Math.random() * bodyRadiusMax;

			var wscale	= conf.spriteDrawScale && conf.spriteDrawScale.length && conf.spriteDrawScale;

			var ww			= graph.load_images.groupsLoader;
			var load3DImg	= ww.load3DImg;
			var spr3D		= load3DImg && load3DImg.sprites;
			var spr3D		= spr3D && spr3D.length && spr3D;

			for(var i=0; i<itemsMax; i++){

				if( conf3D.putItemsAlongAxisY )
				{
					var center = 
						[			
							0, //boxCenterX,
							conf.spriteDistanceFromOrigin[ i ], // garbage?: bug?: - conf3D.originY - boxCenterY,
							0, //boxCenterZ
						];


				}else if( putItemsToCircleR ) {
					var angle	= PI2 * ( conf3D.putUniformly ? i / itemsMax : Math.random() );
					var radius	= bodyRadiusMax;
					var center	= 
					[			
						putItemsToCircleR * Math.cos( angle ) + boxCenterX, 
						putItemsToCircleR * Math.sin( angle ) + boxCenterY, 
						boxCenterZ
					];
				}else{
					var center = 
					[			
							( Math.random() - 0.5 ) * boxMaxX + boxCenterX, 
							( Math.random() - 0.5 ) * boxMaxY + boxCenterY, 
							( Math.random() - 0.5 ) * boxMaxZ + boxCenterZ, 
					];
				}


				var imgName	= '';
				var imgWrap	= null;
				if( spr3D )
				{
					var wModule = load3DImg.conf.lastImgIsSingle ? spr3D.length - 1 : spr3D.length;
					if( load3DImg.conf.lastImgIsSingle && i === itemsMax - 1)		// TODM
					{
						var imgName	= spr3D[ wModule ].name;
						var imgWrap	= spr3D[ wModule ];
					}else{
						var imgName	= spr3D[ i % wModule ].name;
						var imgWrap	= spr3D[ i % wModule ];
					}
				}

				items[i] =
				{
					center : center,
					radius : radius,	// Put not in attr, for comparator speed, 
					attr :
					{		
							colorDark			: '#'+(4+(i%5))+'000'+(5-(i%5))+'0',
							colorLight			: '#FFFFFF',
							//.	Memorizes original index because will be sorted later
							ix					: i,
							spriteDrawScale		: wscale && wscale[	i % wscale.length ],
							name				: imgName,
							imgWrap				: imgWrap	// TODM breaks capturebility of config? ... put index instead.
					}
				};
			};

			var ww = graph.load_images.groupsLoader;
			if( ww.imgBgScenario )
			{
				graph.bgImg = ww.imgBgScenario.sprites[0].img;
			}


			ifdeb( 'prepare3D: items generated' );
			return items;
		};


}) ();

