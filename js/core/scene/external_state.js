
//	//\\//			Sets and moves sprite in external system.


( function () {

		var	btb			= window.btb$		= window.btb$			|| {};		
		var	graph		= btb.graph			= btb.graph				|| {};
		var	flyer		= graph.flyer		= graph.flyer			|| {};
		var conf		= graph.conf		= graph.conf			|| {};
		var capturer	= graph.capturer	= graph.capturer		|| {};


		var PI2			= 2 * 3.1415;

		var PI2W;		//	Cycle frequency in respect to "effective cycle": see (*).


		var sprites;
		var itemsMax;
		var conf;
		var flyerConf;

		var common_ff;
		var sprites_seed;

//			clip : [ 100, 100, 500, 500 ]	// TODM add clipping to photo-project

		flyer.init_external_state = function ()	// TODM call this initExterAndInterSprites
		{

			flyerConf			= conf.cflyer;
			sprites				= flyerConf.sprites	= flyerConf.sprites || [];	// TODM call this externalSprite

			sprites_seed		= flyerConf.sprites_seed;
			itemsMax			= conf.itemsMax;
			if( sprites_seed )
			{
				common_ff			= sprites_seed.common_ff;
			}else{
				//.	We destroy further generation and capturer in the mean state of development ...
				return;
			}	
			var ww = flyerConf;

			var wl					= graph.load_images.groupsLoader;
			var loaded2DImages		= wl.load2DImg && wl.load2DImg.sprites;
			var loadedCustImages	= wl.loadCustomImg && wl.loadCustomImg.sprites;

			if( !loaded2DImages )	// TODM Really misleading logic.
			{
				graph.dsprite.prepareParameters( loadedCustImages );
				generateSprites( flyerConf.dconf.startup_rr_r0 );

			}else{
				generateSprites();
			}

		}; // flyer.init_external_state




		var generateSprites = function ( startup_rr_r0 )	// TODU Move this outside of run-time-runner
		{

			PI2W			= conf.turnTicksPoint ? PI2 / conf.turnTicksPoint * conf.timeScale : PI2;	// (*)

			var sd					= sprites_seed;
			var dontRandomizeFactor	= sprites_seed.dontRandomizeFactor;
			var rnd					= sprites_seed.randomizer;
			var delayStep			= conf.turnPonitPause / itemsMax;

			//.	skips (re)generation if captured or forbidden
			if(	( graph.confRestoredFromCaptured && !flyer.iteration ) || ( flyer.iteration && !conf.rerandom ) ) return;

			for( var ii = 0; ii < itemsMax; ii++ )
			{

				//.	Overrides constant value of initial radius with values from array
				var rr_r0	= startup_rr_r0 && startup_rr_r0[ ii ] || sd.rr.r0;

				var spr = sprites[ii] =
				{
					//	Sets radius pulsation
					rr :
					{
							ra : sd.rr.ra * ( rnd.rr.ra.base + rnd.rr.ra.factor * 
												( dontRandomizeFactor ? ( ( ii + 2 ) % conf.itemsMax ) / itemsMax :		Math.random() )
											),

							vv : sd.rr.vv * ( rnd.rr.vv.base +
												( dontRandomizeFactor ? ( ( ii + 3 ) % conf.itemsMax ) / itemsMax :		Math.random() )
											),
							f0 : sd.rr.f0,
							r0 : rr_r0
					},

					//	Sets radius rotation
					cc :
					{	
						f0 : sd.cc.f0,
						vv : sd.cc.vv * (	rnd.cc.vv.base + rnd.cc.vv.factor *
												( dontRandomizeFactor ? ( ( ii ) % conf.itemsMax ) / itemsMax :		Math.random() )
										)
					},	// vv angular velocity in units [vv]=circle/(100000 * frame)


					//	Sets own rotation
					ff :
					{	
						f0 : sd.ff.f0,
						vv : sd.ff.vv * ( rnd.ff.vv.base + rnd.ff.vv.factor *
									( dontRandomizeFactor ? ( ( ii + 4 ) % conf.itemsMax ) / itemsMax :		Math.random() ) )
					},	// vv angular velocity in units [vv]=circle/(100000 * frame)


					//	Sets size pulsation relative to beginning
					ss :
					{ 
						sa : sd.ss.sa * ( rnd.ss.sa.base + rnd.ss.sa.factor *
									( dontRandomizeFactor ? ( ( ii + 1 ) % conf.itemsMax ) / itemsMax :		Math.random() ) ),
						vv : sd.ss.vv * ( rnd.ss.vv.base + rnd.ss.vv.factor *
									( dontRandomizeFactor ? ( ( ii ) % conf.itemsMax ) / itemsMax :		Math.random() ) ),
						f0 : sd.ss.f0,
						s0 : sd.ss.s0
					}
				};
 
				if( flyerConf.uniform_delay )
				{
					if( ii )
					{
						spr.delay = delayStep * ii;
					}else{
						spr.delay = conf.turnPonitPause;
					}
					spr.delayTicks = spr.delay * conf.ticksPerMsec;
				}
			};
			capturer.increaseCounter();

		};






		flyer.move_sprite = function ( sprite, tt )
		{
			//: Calculates distance to stage center
			var rrf =	PI2W * ( sprite.rr.vv + sprite.rr.f0 ) * tt;
			var rr	=	sprite.rr.ra * Math.sin( rrf ) + sprite.rr.r0;

			//. Common rotation
			var comm_ff	=	PI2W * common_ff.vv * tt + common_ff.f0;
			//. Own radius-from-screen-center-to-sprite-center rotation
			var cc_ff	= 	PI2W * sprite.cc.vv * tt + sprite.cc.f0;
			//. Radius rotation
			var rad_ff	= 	cc_ff + comm_ff;
			var rrx	=	rr * Math.cos( rad_ff);
			var rry	=	rr * Math.sin( rad_ff);

			//.	as of August 29, par is used only in "words" subapp. possibly making sprites jerking;
			var ww = flyerConf.sparkRange;
			if( ww )
			{
				rrx += ww * ( 0.5 - Math.random() );
				rry += ww * ( 0.5 - Math.random() );
			}


			//. Calculates own rotation plus radius common rotation
			var	ff	=	PI2W * sprite.ff.vv * tt + sprite.ff.f0 + rad_ff;

			//: Calculates size change
			var ssf =	PI2W * sprite.ss.vv * tt + + sprite.ss.f0;
			var ss	=	Math.abs( sprite.ss.sa * Math.abs( Math.sin( ssf ) ) + sprite.ss.s0 );

			return { rrx : rrx, rry : rry, ff : ff, ss : ss };
		};


}) ();

