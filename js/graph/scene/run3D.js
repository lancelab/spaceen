//	//\\//			Plugin. Convenience functions for 3D-draw on canvas.
//					Uses graphic context taken from tp$.draw3D.


//:	It was before:
//	Does not:	need canvas environment to instantiate.
//	Input:		no canvas environment is required.




( function ( ) { 

		var	btb			= window.btb$				= window.btb$				|| {};		
		var	graph		= btb.graph					= btb.graph					|| {};
		var	runFlyer3D	= graph.runFlyer3D			= graph.runFlyer3D			|| {};	// TODM rename: run3DScene
		var	flyer		= graph.flyer				= graph.flyer				|| {};
		var	conf		= graph.conf				= graph.conf				|| {};
		var	conf3D		= conf.conf3D				= conf.conf3D				|| {};
		var	draw3D		= graph.draw3D				= graph.draw3D				|| {};
		var e3DSprite	= graph.conf.e3DSprite		= graph.conf.e3DSprite		|| {};
		var virt		= graph.virt				= graph.virt				|| {};
		var	util_z_axial	= graph.util_z_axial		= graph.util_z_axial		|| {};	// TODM rename: run3DScene

		var ctx;


		runFlyer3D.supplyContextAndConf = function()
		{
			ctx = virt.ctx;
			draw3D.supplyContextAndConf ();
		};



		// Clone collection of balls
		runFlyer3D.cloneCollection = function ( col )
		{
			var tt = [];
			for(var ii = 0, len = col.length; ii < len; ii++ )
			{
				var cc = col[ ii ];
				tt[ ii ] = 
				{	center		: [ cc.center[0], cc.center[1], cc.center[2] ],
					radius		: cc.radius,
					attr		: btb.pasteRef( {}, cc.attr )	// Was bug: tree-copy instead of ref. which copied img-object.
				};
			}
			return tt;
		};




		// Input:	col - original collection of balls.
		// Result of rotation is contained in clonedCollection
		runFlyer3D.rotateCollection = function ( col, clonedCollection, cs, sn )
		{
			for( var i=0, len=col.length; i<len; i++ )
			{
				var cl			= col[i];
				var rc			= clonedCollection[i];

				if( !graph.mstones.ownMoveStopped )
				{
					if( conf.subapp === 'fading-tree' )
					{
						rc.center[ 0 ] = cl.center[ 0 ];
						rc.center[ 1 ] = cl.center[ 1 ] - conf.custom.range * ( 1 + sn );
						rc.center[ 2 ] = cl.center[ 2 ];
					}else{
						rc.center = graph.vector23D.rotateXY( cs, sn, cl.center );	// TODM returning array is slow
					}
				}

				// TODO waste ... time ... don't clone so many times ....
				
				//	We cannot hold a convention:
				//		"originally cloned and original col are the same and
				//		the only diff. cloned col does rotate its center".
				//	The reason: cloned coll is sorted.
				rc.radius		= cl.radius;
				rc.attr			= cl.attr;
				//c onsole.log(clonedCollection[i]);
			}
		};






		///	This function is in "general 3D" because of sorting.
		//
		//	Input:	optional: 	scrWidth,scrHeight,backgroundImageData.
		//						Modifies screen if present.
		var drawCollection = function ( col, backgroundImageData, ticks )
		{

			var	scrWidth	= graph.scrWidth;
			var	scrHeight	= graph.scrHeight;

			col.sort( comparator );
			//	app. when conf.generate_backg_img is set
			if( backgroundImageData )
			{
				ctx.putImageData( backgroundImageData, 0, 0 );

			/// Draws cyclic ( periodic and smooth boundary transition) bg.
			}else if( conf3D.backgroundScenario ) {

				var offsetPhase = ticks / conf.ticksPeriod;
				offsetPhase = ( offsetPhase * conf3D.backgroundScenario.speed ) % 1;
				cyclifyImage(	graph.bgImg, offsetPhase, Math.floor( graph.bgImg.width * 0.5 ), 'doDraw' );

			}else{
				if( scrHeight ) ctx.clearRect( 0, 0, scrWidth, scrHeight );
			}

			var wDImg3D = draw3D.drawImageIn3D;
			for( var ii = 0, len = col.length; ii < len; ii++ )
			{
					var cl = col[ ii ];

					var imgWrap = cl.attr.imgWrap;					
					if( imgWrap )
					{
						if( imgWrap.loaded )
						{
							// c ccc( "\n\nGoing to drawImage: " + cl.attr.name + cl.attr.ix );
							wDImg3D( cl.center, imgWrap.img, cl.attr.spriteDrawScale );
						}
					}else{
						draw3D.draw3DBallGradient(
							cl.center, cl.radius, cl.attr.colorDark, cl.attr.colorLight
						);
					}
			}
		};
		//	\\// Draws collection in order from back to front:




		/// Main entrance from "animation manager" to "3D-painter"
		runFlyer3D.drawSprites = function (
				items,
				clonedCollection,
				ticks
		){

			//.	sets e3DSprite.clip if preset in config.;
			if( e3DSprite.clipify ) e3DSprite.clipify();	// TODM should be added to 2D scene


			//.	Main purpose: sets ctx for "t" or "b" buffers in run3D.js and draw3D.js
			if( virt.con.length ) runFlyer3D.supplyContextAndConf();

			var ticksPhase	= ticks / conf.ticksPeriod;
			var angle		= 2 * Math.PI * ticksPhase;
			var cs			= Math.cos( angle );
			var sn			= Math.sin( angle );

			if( conf3D.boxWrap )
			{
				/// "Own drawing algorithm."
				util_z_axial.squarePrism( ticksPhase );

			}else{
				//	TODM bug: assumed box and origin Y are the same. Does not have to. Must add boxY after rotatinn insied the box.
				runFlyer3D.rotateCollection( items, clonedCollection, cs, sn );	// TODM buggy: does not remember ticks;
				//	D ebug:
				//	graph.draw3D.draw3DAxes( [0,0,0],  200, ['#0000FF','#00FF00','#FF0000'] );
				drawCollection( clonedCollection, flyer.backgroundImageData, ticks );
			}
		};

		//	//\\ Draws collection in order from back to front:
		//	Algorithm: sorts by coordinate center.y.
		var comparator = function( itemA, itemB )
		{
			return Math.floor(   (itemB.center[1] - itemB.radius ) - ( itemA.center[1] - itemA.radius)  );
		};


		///	Cuts vertical visibleWidth-strips from continuosly-x-periodic-image.
		//
		//	Input:		doDraw			- draw immediately;
		//				offsetPhase		- where to start: range: [0...1] of source img width;
		//				visibleWidth	- strip width on source img;
		//	Returns:	clipShape		- info about one or two strips;
		var cyclifyImage = runFlyer3D.cyclifyImage = function ( img, offsetPhase, visibleWidth, doDraw )
		{
				var	scrWidth	= graph.scrWidth;
				var	scrHeight	= graph.scrHeight;
				var imgW		= img.width;
				var imgW_2		= img.width * 0.5;
				var sourcePos1	= Math.floor( Math.min( imgW * offsetPhase, imgW - 1 ) );
				var targetW1	= scrWidth * visibleWidth / imgW_2;
				var sourceW1	= visibleWidth;
				var reminder	= imgW - sourcePos1;

				var clipShape	= null;
				if( reminder	< visibleWidth )
				{
					sourceW1		= reminder;
					var sourceW2	= visibleWidth - sourceW1;
					var targetW1tmp	= Math.floor( targetW1 * sourceW1 / visibleWidth );
					var targetW2	= targetW1 - targetW1tmp;
					var targetW1	= targetW1tmp;

					if( doDraw )
					{
						//.	takes image-clip from 0-offset to feed missed tail
						ctx.drawImage(	img, 0, 0, sourceW2, img.height, targetW1, 0, targetW2, scrHeight );
					}else{
						clipShape = [ sourcePos1, sourceW1, sourceW2 ]; 
					}
				}	
				if( doDraw )
				{
					ctx.drawImage( img, sourcePos1, 0, sourceW1, img.height, 0, 0, targetW1, scrHeight );
				}else{
					if( !clipShape ) clipShape = [ sourcePos1 ]; 
				}
				return clipShape;
		};

		/// Just because ctx of this module keeps "track" of corrected ctx;
		//	Input:	flip		- does flip the strip around itself;
		runFlyer3D.drawImgInContext = function ( img, startx, starty, wx, wy, startTx, startTy, wTx, wTy, flip )
		{
				/*
				var left = startTx;
				var right = startTx + wTx;
				var top = startTy;
				var bottom = startTy + wTy;
				ctx.beginPath();
				ctx.moveTo( left,	top );
				ctx.lineTo( right,	top );
				ctx.lineTo( right,	bottom );
				ctx.lineTo( left,	bottom );
				ctx.closePath();
				ctx.clip();
				*/
				if( flip ) 
				{
					ctx.save();
					ctx.setTransform( -1, 0, 0, 1, startTx * 2 + wTx, 0 );
				}
				ctx.drawImage( img, startx, starty, wx, wy, startTx, startTy, wTx, wTy );
				if( flip ) ctx.restore();
		};


}) ();

