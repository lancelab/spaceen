
//	//\\//			Runs Scene


( function () {

		var debSavedTODO	= false;	// do remove after development

		var	btb				= window.btb$			= window.btb$			|| {};		
		var debby			= btb.debby				= btb.debby				|| {};
		var	graph			= btb.graph				= btb.graph				|| {};
		var	flyer			= graph.flyer			= graph.flyer			|| {};
		var dsprite			= graph.dsprite			= graph.dsprite			|| {};
		var e3DSprite		= graph.conf.e3DSprite	= graph.conf.e3DSprite	|| {};
		var usprite			= graph.usprite			= graph.usprite			|| {};
		var conf			= graph.conf			= graph.conf			|| {};
		var confAddon		= conf.addon			= conf.addon			|| {};
		var	conf3D			= conf.conf3D			= conf.conf3D			|| {};
		var flyerConf		= conf.cflyer			= conf.cflyer			|| {};
		var dconf			= flyerConf.dconf		= flyerConf.dconf		|| {};
		var	draw2D			= graph.draw2D			= graph.draw2D			|| {};
		var	draw3D			= graph.draw3D			= graph.draw3D			|| {};
		var	runFlyer3D		= graph.runFlyer3D		= graph.runFlyer3D		|| {};
		var mstones			= graph.mstones			= graph.mstones			|| {};
		var virt			= graph.virt			= graph.virt			|| {};
		var	addon			= graph.addon			= graph.addon			|| {};
		var	ifdeb			= btb.ifdeb;

		virt.drawArea		= virt.drawArea || {};

		var PI2				= 2 * 3.1415926;

		var itemsMax;
		var sprites;
		var sprites3D;
		var clonedSprites3D;
		var loaded2DSprites;

		var run2D;
		var run3D;
		var master_context;

		var sceneRunnerWaitsForLoad;
		var final_width;
		var final_height;
		var master_screen_scale;

		var justReinitialized;
		var formerTime;
		var leftMemorySensor;
		var pauseExtendedStart;
		var addCulStartToPause;
		var insertFMemBefore;
		var wipeOutMemory;

		//.	Counts ticksPeriods
		//	Current cycle when animation cycles does repeat.
		//	Used to repeat randomization from second cycle.
		flyer.iteration = -1;	// TODM move to graph's functionality



		//:	Screen
		var screen_xx;
		var screen_yy;
		var screen_center_xx;
		var screen_center_yy;

		//:	Scenario
		var	dontDrawAfterPeriod;
		var uniform_delay;
		var stoppedAfterPeriodDrawing;
		var firstInitDone = false;
		var firstClipCycleDone_TODP = false;	// must make separate module for JavaScriptted-jpg
		






		//********************************************************
		/// Establishes graphics context and other parameters.
		//********************************************************
		flyer.init_sprites = function ( )
		{
			//  c ccc( conf.dontResetAfterIteration, firstInitDone );	// TODM Mess with lens init. Separate it from sprites init. Mess is a triple call of init_sprites in run_graph.
			// if( conf.dontResetAfterIteration && firstInitDone ) return;

			flyer.iteration++;

			run2D				= conf.runFlyer;
			run3D				= conf.in3D;
			master_context		= graph.master_context;
			wipeOutMemory		= graph.wipeOutMemory;
			uniform_delay		= false;
			stoppedAfterPeriodDrawing = false;

			if( conf.transitionalBugTicksPoint ) conf.turnTicksPoint = conf.turnTicksPoint || conf.ticksPeriod;
			dontDrawAfterPeriod	= conf.dontDrawAfterPeriod;

			itemsMax			= conf.itemsMax;
			final_width			= flyerConf.final_width;
			final_height		= flyerConf.final_height;

			var wl				= graph.load_images.groupsLoader;
			loaded2DSprites		= wl.load2DImg && wl.load2DImg.sprites;

			pauseExtendedStart	= dconf.pauseExtendedStart;
			addCulStartToPause	= pauseExtendedStart && dconf.addCulStartToPause;

			//.	Sets this parameter to draw before first frame if it is not set in conf.
			insertFMemBefore = ( conf.insertFMemBefore || conf.insertFMemBefore === 0 ) ? conf.insertFMemBefore : itemsMax - 1;

			if( confAddon.generate_backg_img )
			{
				//:	It is black if no grains:
				var wsalt			= addon.funny_graphics_2D.createRandomDisks( conf.grainsNumber, scrWidth, scrHeight );
				flyer.backgroundImageData = wsalt.getImageData( 0, 0, scrWidth, scrHeight );
			}


			if( usprite.init ) usprite.init();

			if( run2D )
			{
				flyer.init_external_state ();
				sprites = flyerConf.sprites;
			}
			//	Future: good place to add custom init here here: if( dsprite.prepareDSpriteScenario ) dsprite.prepareDSpriteScenario();


			if( run3D )
			{
				/// Was LensT init
				if( conf.reset_population_at_reset || !firstInitDone )
				{

					runFlyer3D.supplyContextAndConf();
					var w3D = graph.runFlyer3D;
					//:	Regenerates population of "sprites"
					sprites3D		= w3D.generateSprites( conf );
					clonedSprites3D	= w3D.cloneCollection( sprites3D );
					ifdeb( 'run: Population of 3D sprites generated' );
				}
				if( e3DSprite.init )
				{
					e3DSprite.init();	//	TODM this is a syntax garbage; What is support for syntax sugar?: 
										//	e3DSprite.init && e3DSprite.init();
					ifdeb( 'run: e3DSprite.init() is ran' );
				}				
			};

			if( !firstInitDone ) sceneRunnerWaitsForLoad = graph.sceneRunnerWaitsForImg;



			//	//\\	frameMemory	////////////////////////
			mstones.frameMemLoss = conf.memLoss;

			mstones.frameLossPerMs = 0;
			if( mstones.frameMemLoss )
			{
				mstones.frameLossPerMs = mstones.frameMemLoss > 0.999999999 ? 1000000 : ( -Math.log( 1 - mstones.frameMemLoss ) ) / 1000;
			}

			mstones.critPointFrameLossPerMs = 0;
			if( conf.critPointmemLoss )
			{
				mstones.critPointFrameLossPerMs = conf.critPointmemLoss > 0.999999999 ? 1000000 : ( -Math.log( 1 - conf.critPointmemLoss ) ) / 1000;
			}

			leftMemorySensor = conf.leftMemorySensor || 0.999;

			//	\\//	frameMemory	////////////////////////



			graph.capturer.iteration++;
			firstInitDone = true;
			justReinitialized = true;
			
			ifdeb( 'flyer.init_sprites: completed.' );
		};





		flyer.rescale_virt = function ()
		{

			var canvas			= virt.canvas;
			var curA			= virt.drawArea;
			screen_xx			= curA.sizeX = canvas.width;
			screen_yy			= curA.sizeY = canvas.height;
			screen_center_xx	= curA.centerX = screen_xx / 2;
			screen_center_yy	= curA.centerY = screen_yy / 2;
			screen_xxP			= screen_xx * 2;
			screen_yyP			= screen_yy * 2;
			if( conf.virt === 'v' )
			{
				var wscaleX	= screen_xx / conf.vwidth;
				var wscaleY	= screen_yy / conf.vheight;
				master_screen_scale	= Math.min( wscaleX, wscaleY );
			}else{

				master_screen_scale	= 1.0;
			}

			curA.dscale = master_screen_scale;

			// dsprite.resetDrawPars && dsprite.resetDrawPars(); // is 5; a legal JS statement?
			if( dsprite.resetDrawPars ) dsprite.resetDrawPars();

		};









	//***************************************************************
	///	Moves collection of sprites
	//	Input:	effTicks = effective_ticks from run_graph.js
	//			inPausePhase: -1 before, 0<= ... <=1 in, -2 after.
	//***************************************************************
	flyer.move_sprites = function ( effTicks, time )
	{

		var turnEnterPassed	= mstones.turnEnterPassed;
		var inPausePhase	= mstones.inPausePhase;
		var ctx				= virt.ctx;
		var effPhase		= conf.ticksPeriod ? effTicks / conf.ticksPeriod : 0;
		var signedTicks		= effTicks;
		var complemTicks	= effTicks;
		var absTicks		= effTicks;


		///	Change happens this way:
		//	signedTicks = conf.turnTicksPoint, .... , 0, .... , -conf.turnTicksPoint
		if( conf.backwardInTime )
		{
			var signedTicks		= conf.turnTicksPoint - effTicks;
			var absTicks		= Math.abs( signedTicks );
		}				
		var complemTicks		= Math.max( conf.turnTicksPoint - absTicks, 0 );
		var complPhase			= complemTicks / conf.turnTicksPoint;



		if( usprite.run ) usprite.run();


		//.	Will have memory if calculated
		frameMemoryToPaste		= null;

		if( stoppedAfterPeriodDrawing )
		{
				if( ( conf.virt === 'b' || conf.virt === 't' ) && conf.drawFromBTAfterStopped )
				{	//.	Stops changing the picture, but continues invoking last picture which is effectively frozen
					graph.drawScaledStubsToMaster ( inPausePhase, master_screen_scale, turnEnterPassed, absTicks );
					//.	Puts garbage on the screen
					if( conf.scaffold ) graph.putText( ctx, screen_center_xx, screen_center_yy, master_screen_scale, conf.vwidth, conf.scaffold );
				}
				return;
		}

		if( justReinitialized )
		{
				wipeOutMemory();
				formerTime = 0;
				justReinitialized = false;
		}

		var elapsedTime		= time - formerTime;






		//	//\\	IMAGE RECENT MEMORY FILTERING	////////////////////////////

		var effMemLoss =	( dsprite.frMemLossInPause && ( inPausePhase > -1 ) && dsprite.frMemLossInPause( inPausePhase ) ) ||
							mstones.frameMemLoss;

		/// No memory or some loss			
		if( effMemLoss >= 0  )	//	TODO very misleading mstones.frameMemLoss === 0 means "no memory"
		{
				var ww_wipe_memory	=	( conf.memClearAt0 && mstones.culminationEnterEntered );
										// was || ( conf.clearEnd && mstones.iterationExitEntered );

				// d ebug
				//if( ( Math.floor( effTicks ) % 1000 ) === 0 || mstones.culminationEnterEntered )
				//{
				//		c ccc(	'ef-ticks=' + effTicks + 'w_mem = ' + ww_wipe_memory + ' elapsedTime=' + elapsedTime +
				//				' culm Entered=' + mstones.culminationEnterEntered );
				//}

				///	No memory or wipe memory.
				//	Wipes memory.
				if( !mstones.frameMemLoss || ww_wipe_memory ) 
				{
					wipeOutMemory();

				/// Recalls some frames
				}else if( elapsedTime > 0 ) {

					if( inPausePhase > -1 || ( addCulStartToPause && absTicks < pauseExtendedStart ) )
					{
						var memLoss = mstones.critPointFrameLossPerMs || mstones.frameLossPerMs;
					}else{
						var memLoss = mstones.frameLossPerMs;
					}

					/// Recalls some frames
					if( memLoss )
					{

						//.. }else if( elapsedTime > 0 ) {
						//.... if( memLoss )

						//	Better: Math.exp( -memLoss * elapsedTime );

						var memLeft = Math.max( 1 - memLoss * elapsedTime, 0 ); 
						//	d ebug
						// if( ( Math.floor( effTicks ) % 10 ) === 0 || mstones.culminationEnterEntered )
						// {
						//		c ccc( 'memLeft=' + memLeft + ' memLoss=' + memLoss);
						//	}

						/// Fades the past
						if( memLeft < leftMemorySensor )
						{
							formerTime = time;
							var wCur	= virt.ix;
							var wConCur	= virt.ctx;
							var wCanCur	= virt.canvas;
							var wWidth	= wCanCur.width;
							var wHeight	= wCanCur.height;

							if( virt.can.length > 1 )
							{
								//:: We have twin buffers
								var wNext		= ( wCur + 1 ) % 2;
								var wConNext	= virt.con[ wNext ];
								wConNext.clearRect( 0, 0, wWidth, wHeight );
								wConNext.globalAlpha = memLeft;

								//wConNext.drawImage( wCanCur, 0, 0, wWidth, wHeight );
								frameMemoryToPaste = wCanCur;

								//	good:	if( !( signedTicks % 50 ) ) c ccc( 'twins: memLeft = ' + memLeft );
								//.	Swaps twins
								virt.ix		= wNext;
								virt.ctx	= virt.con[ wNext ];
								virt.canvas	= virt.can[ wNext ];
								ctx		= wConNext;

							}else{

								//::	Apparently, this is very slow method for mobiles, but it 
								//		is independent from twin buffers
								//		Apparently on July 18, it can work well for virt=v. 
								var imageData = wConCur.getImageData( 0, 0, wWidth, wHeight );
								graph.filters.memLeft( imageData, memLeft );
								wConCur.putImageData( imageData, 0, 0 )
							}
						}
					}
				}
		}
		//	\\//	IMAGE RECENT MEMORY FILTERING	////////////////////////////







		var ctx = virt.ctx;

		var alpha = conf.turnTicksPoint ? Math.max( Math.min( complPhase, 1 ), 0.0001 ) : 1;

		//.	Helps with radial gradients in virt='v' mode. Unknown why ... bug?
		//	if( alpha > 0.9 ) alpha = 0.1;
		if( sceneRunnerWaitsForLoad )
		{
				if( !graph.load_images.groupsLoader.allLoaded() )
				{
					ifdeb( '... skipped draw; not all images are yet loaded ... ' );
					if( dontDrawAfterPeriod && mstones.iterationExitEntered ) stoppedAfterPeriodDrawing = true;	// TODO bad FSM
					return false;
				}else if( conf.keepLoadingMsgTillImgLoad ) {
					graph.removeLoadingMsg ();
				}
				sceneRunnerWaitsForLoad = false;
				if( conf.startAnimAfterImgLoad )
				{
					graph.startTime		= null;
					ifdeb( 'Begins animation. Time set to 0.' );
					// Skips one loop ... to digest "reconstructed" time ...
					return false;
				}
		}

		///	Generates delays. ( Vibration formerly. )
		uniform_delay			= uniform_delay || ( flyerConf.uniform_delay && inPausePhase > -1 );
		// var departureStep	= conf.turnPonitPause / sprites.length;
		var inPausePhaseEff		= conf.turnPonitPause * ( uniform_delay ? ( inPausePhase > -1 ? inPausePhase : 1 ) : 0  );
		//var wTurnTime			= conf.turnTicksPoint / conf.ticksPerMsec;

		// d ebug
		//	if( ( Math.floor( effTicks ) % 100 ) === 0 || mstones.culminationEnterEntered )
		//	{
		//		c ccc( 'ef-ticks=' + effTicks + ' signedTicks=' + signedTicks + ' rev=' + complemTicks + ' alpha=' + alpha );
		//	}



		if(	!(	( conf.picClearAtEnd	&& mstones.iterationExitEntered		) ||
				( conf.picClearAt0		&& mstones.culminationEnterEntered	) ||
				( conf.picClearInPause	&& inPausePhase > -1 )
			)
		){

			if( run3D && ( !flyerConf.insert3DSceneBeforeIx1 || !sprites.length ) )
			{
				if( frameMemoryToPaste ) insertFrameMemToPaste( ctx );
				//.	Inserts 3D scene
				run3DSprites( effTicks );
				if( !mstones.firstTimeRan ) enableBgAfterFirstRun();

			}else{

				if ( virt.bgReady && !( conf.virt === 'b' || conf.virt === 't' ) )
				{
					graph.drawScaledStubsToMaster ( inPausePhase, master_screen_scale, turnEnterPassed, absTicks, 'before sprites' );
				}

				for( var ii = sprites.length - 1; ii > -1; ii-- )
				{
					var sprite = sprites[ii];

					if( !loaded2DSprites )
					{
						if( frameMemoryToPaste && insertFMemBefore === ii ) insertFrameMemToPaste( ctx );
					}

					//.	Inserts 3D scene between flat sprites
					if( flyerConf.insert3DSceneBeforeIx1 === ii + 1 && run3D ) run3DSprites( effTicks );

			
					var filteredSignTicks = signedTicks;
					if( uniform_delay && ii )
					{
						if( inPausePhaseEff > sprite.delay )
						{
							filteredSignTicks += ( sprite.delay - inPausePhaseEff ) * conf.ticksPerMsec;
						}else{
							continue;
						}

					}
					var spr				= flyer.move_sprite( sprite, filteredSignTicks );
					var vibroAngleFinal = spr.ff;

					//: xx, yy new positions of sprite center
					var spriteCenterX = screen_center_xx + spr.rrx * master_screen_scale;
					var spriteCenterY = screen_center_yy - spr.rry * master_screen_scale;
					var target_width = final_width * spr.ss * master_screen_scale;				
					var target_height = final_height * spr.ss * master_screen_scale;				


					if( loaded2DSprites )
					{

						var lsp = loaded2DSprites[ ii % loaded2DSprites.length ];
						var img = lsp.img;

						if( flyerConf.frameScenario.on )
						{
							var wFC			= flyerConf.frameScenario;
							var size		= wFC.size;
							var gridXN		= wFC.gridXN;
							var gridYN		= wFC.gridYN;
							var gridVolume	= gridXN * gridYN;

							if( firstClipCycleDone_TODP )
							{
								var cellOffset = wFC.cellIterationNextOffset;
							}else{
								var cellOffset = wFC.cellIteration1Offset;
							}
							var iterationVolume	= gridVolume - cellOffset;

							var effectiveTicks	= mstones.ticks;
							var wSwing			= conf.swingTicks * 2;
							if( wSwing )
							{
								var ww			= effectiveTicks % wSwing;
								var effectiveTicks	= Math.min( ww, wSwing - ww );
							}

							var unlimitedCell	= Math.floor( gridVolume * effectiveTicks / conf.ticksPeriod );
							if( unlimitedCell >= iterationVolume - 1 ) firstClipCycleDone_TODP = true;
							effGridCell			= cellOffset + unlimitedCell % iterationVolume;

							//	vital debug in combination with time-from-ticks 
							//	cccc(	mstones.ticks + ', unlimitedCell=' + unlimitedCell  + ', cellOffset=' + cellOffset +
							//			', iterationVolume=' + iterationVolume + ' effGridCell=' + effGridCell );

							var gridRow	= Math.floor( effGridCell / gridXN );
							var gridCol	= effGridCell - gridRow * gridXN;

							var widthX	= size[ 0 ];
							var widthY	= size[ 1 ];

							var offsetX = widthX * gridCol;
							var offsetY = widthY * gridRow;
							// c ccc( gridRow, gridCol, effTicks, effGridCell, widthX, widthY, offsetX, offsetY );

							ctx.globalAlpha = alpha;
							if( conf.apple5 && btb.detected.browser.iPx5Plus )
							{
								if( !debSavedTODO )
								{
									///	should fail: too early
									var wwDiv = document.getElementById( 'detectAnomaly_console_div_btb' );
									if( wwDiv )
									{
										if( debby.extra )
										{
											var ww =	"\n" +
												'Anomaly debug: ' +
												"\n" +
												' gridRow=' + gridRow + ' gridCol=' + gridCol + ' offsetX = ' + offsetX + ' offsetY=' + offsetY + 
												' widthX=' + widthX +
												' target_width = ' + target_width + ' target_height=' + target_height + "\n" +
												' master_screen_scale=' + master_screen_scale + ' final_width=' + final_width;
											var logToURL =	'../../../dev/capturer.php' + '?stamp='  + btb.detected.timeStamp + '-scales';
											btb.saveTextToServer(	logToURL + '&command=snap', ww );
											wwDiv.innerHTML = wwDiv.innerHTML + ww;
										}
										debSavedTODO = true;
									}
								}

								offsetX /= 2;
								offsetY /= 2;
								widthX /= 2;
								widthY /= 2;
							}
							// spr.ff is an angle
							draw2D.drawRotatedClip( img, offsetX, offsetY, widthX, widthY, spr.ff, spriteCenterX, spriteCenterY, target_width, target_height, ctx );
							ctx.globalAlpha = 1;

							//. solved:	conf.scaffold on the screen; TODM why this fails if called at the end of sub?
							// if( conf.scaffold ) graph.putText( ctx, screen_center_xx, screen_center_yy, master_screen_scale, conf.vwidth, conf.scaffold );


						///	not frame-scenario
						}else{


							//	//\\	Skips too big sprites
							var width = img.width;
							var height = img.height;

							var xcorner = spriteCenterX - lsp.half_width * master_screen_scale;
							var ycorner = spriteCenterY - lsp.half_height * master_screen_scale;

							if(	xcorner + target_width	< -screen_xx	|| xcorner	> screen_xx || 
								ycorner + target_height	< -screen_yy	|| ycorner	> screen_yy ||
								target_width > screen_xxP				|| target_height > screen_yyP
							){
								ifdeb( 'too out of screen ' );
								continue;
							}

							ctx.globalAlpha = alpha;
							//	\\//	Skips too big sprites
							draw2D.drawRotatedImage( img, spr.ff, spriteCenterX, spriteCenterY, target_width, target_height, ctx );
							ctx.globalAlpha = 1;
						}
						

					/// not 2DImages
					}else{


						//:	Generates pictures
						dsprite.draw(
						{
							ctx				: ctx,

							//: Sprite-center-position on global canvas
							spriteCenterX	: spriteCenterX,
							spriteCenterY	: spriteCenterY,

							alpha			: alpha,
							scale			: spr.ss * master_screen_scale,
							ticks			: filteredSignTicks,
							effPhase		: effPhase,
							complPhase		: complPhase,
							item			: ii,
							angle			: vibroAngleFinal
						});

					}

				} // ii
				if( !mstones.firstTimeRan ) enableBgAfterFirstRun();

			} // flat sprites exist

		} //if( !( conf.picClearAtEnd &&



		//.	Puts garbage on the screen
		if( conf.scaffold ) graph.putText( ctx, screen_center_xx, screen_center_yy, master_screen_scale, conf.vwidth, conf.scaffold );

		graph.drawScaledStubsToMaster ( inPausePhase, master_screen_scale, turnEnterPassed, absTicks );

		// if( dontDrawAfterPeriod && effTicks >= conf.ticksPeriod ) stoppedAfterPeriodDrawing = true;
		if( dontDrawAfterPeriod && mstones.iterationExitEntered ) stoppedAfterPeriodDrawing = true;
		return true;

	};
	///	Moves collection of sprites







	///	Wrapper. 3D may be called between 2D-layers or alone.
	var run3DSprites = function ( effTicks )
	{
			if(	( conf.runInfinitely || mstones.iterationExitPassed ) && 
				graph.scrWidth > 0 && graph.scrHeight > 0					// TODM fix ... and why this is a "window.width"? ... do canvas ... do better
			) {

				graph.runFlyer3D.drawSprites (

					sprites3D,
					clonedSprites3D,
					effTicks
				
				);
			}
	};




	///	Enables non-displayed bgImage
	var enableBgAfterFirstRun = function ()
	{
		if( graph.domjq.canvasBgIm )
		{
			graph.domjq.canvasBgIm.css( 'display', 'block' );
			mstones.firstTimeRan = true;
		}
	}


	///	At the moment, this funciton is needed in two places, this is why it is a function.
	var frameMemoryToPaste;
	var insertFrameMemToPaste = function ( ctx )
	{
		var ww = frameMemoryToPaste;
		ctx.drawImage( ww, 0, 0, ww.width, ww.height );
		frameMemoryToPaste = null;
	};


}) ();

