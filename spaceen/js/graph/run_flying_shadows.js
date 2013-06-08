
//	//\\//			Plugin. Convenience functions for 2D-draw.


( function () {

		var self; // Plugin itself
		var graph;
		var btb;

		///	Attaches plugin
		( function ( name ) {
			btb			= window.btb$		= window.btb$			|| {};		
			graph		= btb.graph			= btb.graph				|| {};
			self		= graph[ name ]		= graph[ name ]			|| {};
		}) ( 'run_flying_shadows' );


		var ifdeb				= null;
		var backgroundImageData = null;
		var draw2D				= null;
		var sprites				= [];
		var itemsMax;
		var flat_sprite_url;
		var wait_for_images;
		var final_width			= 80;
		var final_height		= 150;
		var loaded_sprites;
		var common_ff;
		var master_screen_scale;
		var conf;
		var flying_shadows;

		var sprites_seed;
		var PI2					= 2 * 3.1415;
		var justReinitialized	= false;		
		var formerTime;
		var leftMemorySensor;



		var generateSprites = function ( startup_rr_r0 )
		{

			PI2		= conf.turnTimePoint ? PI2 / conf.turnTimePoint : PI2;
			var sd	= sprites_seed;
			var rnd	= sprites_seed.randomizer;

			if( flying_shadows.captured )
			{
				sprites = flying_shadows.captured;
				return;
			}

			for( var ii = 0; ii < itemsMax; ii++ )
			{

				//.	Overrides constant value of initial radius with values from array
				var rr_r0	= startup_rr_r0 && startup_rr_r0[ ii ] || sd.rr.r0;

				var spr = sprites[ii] =
				{
					//	Sets radius pulsation
					rr :
					{
							ra : sd.rr.ra * ( rnd.rr.ra.base + rnd.rr.ra.factor * Math.random() ),
							vv : sd.rr.vv * ( rnd.rr.vv.base + Math.random() ),
							f0 : sd.rr.f0,
							r0 : rr_r0
					},

					//	Sets radius rotation
					cc :
					{	
						f0 : sd.cc.f0,
						vv : sd.cc.vv * ( rnd.cc.vv.base + rnd.cc.vv.factor * Math.random() )
					},	// vv angular velocity in units [vv]=circle/(100000 * frame)


					//	Sets own rotation
					ff :
					{	
						f0 : sd.ff.f0,
						vv : sd.ff.vv * ( rnd.ff.vv.base + rnd.ff.vv.factor * Math.random() )
					},	// vv angular velocity in units [vv]=circle/(100000 * frame)


					//	Sets size pulsation relative to beginning
					ss :
					{ 
						sa : sd.ss.sa * ( rnd.ss.sa.base + rnd.ss.sa.factor * Math.random()),
						vv : sd.ss.vv * ( rnd.ss.vv.base + rnd.ss.vv.factor * Math.random()),
						f0 : sd.ss.f0,
						s0 : sd.ss.s0
					}
				};
 
			};

			//.	Captures sprite as a whole, not its internal structure
			if( conf.doCapture ) btb$.debug( JSON.stringify( sprites, null, '\t'), 'sprites' );
		};



		//:	Screen
		var screen_xx;
		var screen_yy;
		var screen_center_xx;
		var screen_center_yy;

		//:	Scenario
		var	dontDrawAfterPeriod;
		var wipedAtTurnPoint = false;
		var wipedAtEndPoint	= false;
		var doVibroTick = false;


		
		/// Establishes graphics context, graph, draw2D, and other parameters.
		self.init_sprites = function ( backgroundImageData_, conf_ )
		{
			conf				= conf_;

			conf.turnTimePoint	= conf.turnTimePoint || conf.ticksPeriod;
			dontDrawAfterPeriod	= conf.dontDrawAfterPeriod;
			flying_shadows		= conf.flying_shadows;
			flat_sprite_url		= flying_shadows.flat_sprite_url;
			wait_for_images		= flat_sprite_url || flying_shadows.custom_image_url;
			sprites_seed		= flying_shadows.sprites_seed;
			common_ff			= sprites_seed.common_ff;
			ifdeb				= btb.ifdeb;
			draw2D				= graph.draw2D;
			backgroundImageData	= backgroundImageData_;
			itemsMax			= conf.itemsMax;
			leftMemorySensor	= conf.leftMemorySensor || 0.999;


			var ww = flying_shadows;
			if( flat_sprite_url )
			{
				graph.load_images.load( flat_sprite_url, flying_shadows.flat_sprite_ext, conf.itemsMax );
			}else if( ww.custom_image_url ) {
				graph.load_images.load( ww.custom_image_url, ww.custom_image_ext, 1 );
			}

			loaded_sprites		= graph.load_images.sprites;

			if( !flat_sprite_url )
			{
				graph.dsprite.prepareParameters( itemsMax, loaded_sprites );
				generateSprites( graph.dsprite.startup_rr_r0 );
			}else{
				generateSprites();
			}

			justReinitialized = true;
			
			ifdeb( 'run_flying_shadows.init_sprites: completed.' );
		};


		self.rescale_screen = function ( screen )
		{
			screen_xx			= screen.width;
			screen_yy			= screen.height;
			screen_xxP			= screen.width * 2;
			screen_yyP			= screen.height * 2;
			screen_center_xx	= screen_xx / 2;
			screen_center_yy	= screen_yy / 2;
			if( conf.virt === 'v' )
			{
				screen_scale_x		= screen.width / conf.vwidth;
				screen_scale_y		= screen.height / conf.vheight;
				master_screen_scale	= Math.min( screen_scale_x, screen_scale_y );
			}else{

				master_screen_scale	= 1.0;
			}


			//	btb$.d eb(	'Virtual rescale. scale =' + master_screen_scale +
			//				'width = ' + screen.width + ' height=' + screen.height );

		};




		var move_sprite = function ( sprite, tt )
		{
			//: Calculates distance to stage center
			var rrf =	PI2 * ( sprite.rr.vv + sprite.rr.f0 ) * tt;
			var rr	=	sprite.rr.ra * Math.sin( rrf ) + sprite.rr.r0;

			//. Common rotation
			var comm_ff	=	PI2 * common_ff.vv * tt + common_ff.f0;
			//. Own radius-from-screen-center-to-sprite-center rotation
			var cc_ff	= 	PI2 * sprite.cc.vv * tt + sprite.cc.f0;
			//. Radius rotation
			var rad_ff	= 	cc_ff + comm_ff;
			var rrx	=	rr * Math.cos( rad_ff);
			var rry	=	rr * Math.sin( rad_ff);

			//. Calculates own rotation plus radius common rotation
			var	ff	=	PI2 * sprite.ff.vv * tt + sprite.ff.f0 + rad_ff;

			//: Calculates size change
			var ssf =	PI2 * sprite.ss.vv * tt + + sprite.ss.f0;
			var ss	=	Math.abs( sprite.ss.sa * Math.abs( Math.sin( ssf ) ) + sprite.ss.s0 );

			return { rrx : rrx, rry : rry, ff : ff, ss : ss };
		};



		///	Moves collection of sprites
		self.move_sprites = function ( tt_, inPausePhase, time )
		{

			var virt		= graph.virt;
			var ctx			= virt.con[ virt.ix ];

			var tt			= tt_;
			var ttreverse	= tt;
			var ttabs		= Math.abs( tt );
			if( conf.backwardInTime )
			{
				var tt = conf.turnTimePoint - tt_;
				var ttabs = Math.abs( tt );
				var ttreverse = Math.abs( conf.turnTimePoint - ttabs );
			}				

			if( justReinitialized )
			{
				if( backgroundImageData )
				{
					ctx.putImageData( backgroundImageData, 0, 0 )
				}else{
					ctx.fillStyle = '#000000';
					ctx.fillRect( 0, 0, screen_xx, screen_yy );  
				}
				formerTime = 0;
				justReinitialized = false;
			}

			var endingAnimation = tt_ >= conf.ticksPeriod - 1;
			var elapsedTime = time - formerTime;





			//	//\\	IMAGE RECENT MEMORY FILTERING	////////////////////////////

			if( conf.memLoss >= 0  )
			{
				var ww_wipe_memory	=	!wipedAtTurnPoint &&
										conf.memClearAt0 && ttabs <= 1 &&
										( inPausePhase < 0 || inPausePhase > 0.5 ) ;
				if( ww_wipe_memory ) wipedAtTurnPoint = true;

				if( !ww_wipe_memory && !wipedAtEndPoint )
				{
					ww_wipe_memory = conf.clearEnd && endingAnimation;
					if( ww_wipe_memory ) wipedAtEndPoint = true;
				}	

				if( conf.memLoss && !ww_wipe_memory && elapsedTime > 0 )
				{

					var memLoss = ( ( inPausePhase > -1 || endingAnimation ) && conf.critPointMemLossExp ) || conf.memLossExp;

					if( memLoss )
					{

						var memLeft = Math.max( 1 - memLoss * elapsedTime, 0 ); 


						//.	Better: Math.exp( -memLoss * elapsedTime );
						if( memLeft < leftMemorySensor )
						{
							var wCur	= virt.ix;
							var wConCur	= virt.con[ wCur ];
							var wCanCur	= virt.can[ wCur ];
							var wWidth	= wCanCur.width;
							var wHeight	= wCanCur.height;

							if( virt.can.length > 1 )
							{
								//:: We have twin buffers
								var wNext		= ( wCur + 1 ) % 2;
								var wConNext	= virt.con[ wNext ];
								wConNext.clearRect( 0, 0, wWidth, wHeight );
								wConNext.globalAlpha = memLeft;
								wConNext.drawImage( wCanCur, 0, 0, wWidth, wHeight );
								//	good:	if( !( tt % 50 ) ) cccc( 'twins: memLeft = ' + memLeft );
								//.	Swaps twins
								virt.ix = wNext;
								ctx		= wConNext;

							}else{

								//::	Apparently, this is very slow method for mobiles, but it 
								//		is independent from twin buffers
								var imageData = wConCur.getImageData( 0, 0, wWidth, wHeight );
								graph.filters.memLeft( imageData, memLeft );
								formerTime = time;
								wConCur.putImageData( imageData, 0, 0 )
							}
						}


					}

				}else{

					if( backgroundImageData )
					{
						ctx.putImageData( backgroundImageData, 0, 0 )
					}else{
						ctx.fillStyle = '#000000';
						ctx.fillRect( 0, 0, screen_xx, screen_yy );
						//.	TODO Really bad bug
						//	if( tt_ >= conf.ticksPeriod - 1) c ccc( 'wiped. tt_='+tt_ + ' screen_xx, screen_yy = ' + screen_xx + ', ' + screen_yy );
					}
				}
			}

			//	\\//	IMAGE RECENT MEMORY FILTERING	////////////////////////////







			if( dontDrawAfterPeriod )
			{
				if( tt_ >= conf.ticksPeriod )
				{
					return true;
				}
			}


			var ctx = virt.con[ virt.ix ];

			var alpha = conf.turnTimePoint ? Math.max( Math.min( ttreverse / conf.turnTimePoint, 1 ), 0.0001 ) : 1;
			if( wait_for_images )
			{
				if( !graph.load_images.allImagesLoaded() )
				{
					ifdeb( '... skipped draw. number_of_loaded_images = ' + graph.load_images.number_of_loaded_images );
					return false;
				}			
				ctx.globalAlpha = alpha;
			}

			///	Generates delays. ( Vibration formerly. )
			doVibroTick				= doVibroTick || ( conf.turnVibrationLen && inPausePhase > -1 );
			var departureStep		= conf.turnPonitPause / sprites.length;
			var inPausePhaseEff		= conf.turnPonitPause * ( doVibroTick ? ( inPausePhase > -1 ? inPausePhase : 1 ) : 0  );
			//var wTurnTime			= conf.turnTimePoint / conf.ticksPerMsec;

			for( var ii = sprites.length - 1; ii > -1; ii-- )
			{
				var sprite			= sprites[ii];

				var vibroTick		= tt;
				if( doVibroTick && ii )
				{
					if( inPausePhaseEff > departureStep * ( ii - 1 ) )
					{
						vibroTick += ( inPausePhaseEff - departureStep * ( ii - 1 ) ) * conf.ticksPerMsec;
					}else{
						continue;
					}

				}
				var spr				= move_sprite( sprite, vibroTick );
				var vibroAngleFinal = spr.ff;

				//: xx, yy new positions of sprite center
				var xx = screen_center_xx + spr.rrx * master_screen_scale;
				var yy = screen_center_yy - spr.rry * master_screen_scale;
				var target_width = final_width * spr.ss * master_screen_scale;				
				var target_height = final_height * spr.ss * master_screen_scale;				


				if( flat_sprite_url )
				{

					var lsp = loaded_sprites[ii];

					//:	Draws pictures
					var img = lsp.img;

					//	//\\	Skips too big sprites
					var width = img.width;
					var height = img.height;

					var xcorner = xx - lsp.half_width * master_screen_scale;
					var ycorner = yy - lsp.half_height * master_screen_scale;

					if(	xcorner + target_width	< -screen_xx	|| xcorner	> screen_xx || 
						ycorner + target_height	< -screen_yy	|| ycorner	> screen_yy ||
						target_width > screen_xxP				|| target_height > screen_yyP
					){
						ifdeb( 'too out of screen ' );
						continue;
					}
					//	\\//	Skips too big sprites
					draw2D.drawRotatedImage( img, spr.ff, xx, yy, target_width, target_height, ctx );

				}else{


					//:	Generates pictures
					graph.dsprite.draw(
					{

						ctx				: ctx,

						//: Sprite-center-position on global canvas
						centerX			: xx,
						centerY			: yy,

						alpha			: alpha,
						scale			: spr.ss * master_screen_scale,
						ticks			: vibroTick,
						item			: ii,
						angle			: vibroAngleFinal

					});

				}


			} // ii

			if( inPausePhase > -1 )
			{
				graph.dsprite.drawPauseImage( inPausePhase, ctx, screen_center_xx, screen_center_yy, master_screen_scale );
			}

			//.	Puts garbage on the screen
			if( conf.scaffold ) graph.putText( ctx, screen_center_xx, screen_center_yy, master_screen_scale, conf.vwidth, conf.scaffold );

			return true;

		};
		///	Moves collection of sprites


}) ();

