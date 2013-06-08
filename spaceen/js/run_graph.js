
//	//\\//	Run-time single animation manager



( function () {



	//:	Localizes and creates top objects	//////////////////////////////////////////
	var btb		= window.btb$		= window.btb$			|| {};		
	var graph	= btb.graph			= btb.graph				|| {};	// Plugin itself
	var conf	= graph.conf		= graph.conf			|| {};
	var ifdeb;
	var $;




	//	//\\	Run-time variables	//////////////////////////////////////////
	var canvas_wrap			= null;
	var canvas				= null;
   	var master_context		= null;											//canvas.getContext('2d');
	var virt				= graph.virt = { can : [], con : [], ix : 0 };	// canvas, context, index


	var ticks				= 0;	//	counts animation phase till the browser's death. Independent from window resizes.
	var scrHeight			= -1;	//	resize flag
    var	scrWidth			= -1;	//	resize flag

	var animation_scheduled;			// state of animation
	var stop_animation_chain;			// puts state to "false" at first opportunity
	var first_time_3D_reset_done = false;
	var stop_afer_tick;
		
	var scrCenterX;
	var scrCenterY;
	var items;
	var clonedCollection;
	var salt;
	var backgroundImageData;
	var sprite = null;
	var fshadows_flg;
	var startTime = null;
	//	\\//	Run-time variables	//////////////////////////////////////////






	/// Initializes animation parameters and fires infinite animation loop
	//	Looks for element with id = 'canvas' and tests browser.
	//
	graph.init = function ( conf_, requested_3D_navigator )
	{

			ifdeb			= btb.ifdeb;
			$				= window.jQuery;

			ifdeb( 'graph.init entered' );



			canvas_wrap = document.getElementById( 'canvas_wrap' );
			if( !canvas_wrap ) return;

			///	Inits 2D environment or abandons it
			canvas = document.getElementById( 'canvas' );
			master_context = canvas && canvas.getContext && canvas.getContext( '2d' );
			if( !master_context )
			{
				//:	We have canvas-unaware browser.
				//	Removes canvas from page.
				canvas_wrap.style.display='none';
				ifdeb( 'graph.init: canvas-unaware browser: canvas is disabled.' );
				return;
			}
			graph.enabled = true;




			//:	Reassembles configuration
			btb.pasteNonArrayClonedTree( conf, conf_ );
			//. Overrides settings if any
			//.	Must run this before using conf.
			graph.spawn_config( conf );
			stop_afer_tick = conf.stop_afer_tick;


			if( conf.disable_landing_loading_warning )
			{
				//.	Disables "loading" warning
				var ww = document.getElementById( 'loading' );
				if( ww ) ww.style.display = 'none';	
			}


			//	//\\	Sets in-line CSS dynamically
			if( conf.min_width ) 
			{
				$( canvas ).css( 'min-width', conf.min_width );
			}

			if( conf.min_height )
			{
				$( canvas ).css( 'min-height', conf.min_height );
			}
			if( conf.body_overflow	) document.body.style.overflow = conf.body_overflow;
			if( conf.wrap_overflow	) canvas_wrap.style.overflow = conf.wrap_overflow;
			//	\\//	Sets in-line CSS dynamically


			///	Virtual Master
			if( conf.virt === 'b' || conf.virt === 't' )
			{
				var wlen = conf.virt === 't' ? 2 : 1;
				for( var wi = 0; wi < wlen; wi++ )
				{
					var ww 			= document.createElement( 'canvas' );
					ww.width		= conf.vwidth;
					ww.height		= conf.vheight;
					virt.can[ wi ]	= ww;
					virt.con[ wi ]	= ww.getContext( '2d' );
				}
			}else{
				virt.can[ 0 ]	= canvas;
				virt.con[ 0 ]	= master_context;
			}



			///	Fallback to "setTimeout-animation-frame"
			window.requestAnimationFrame =
				window.requestAnimationFrame		||
		        window.webkitRequestAnimationFrame	||
		        window.mozRequestAnimationFrame		||
		        window.oRequestAnimationFrame		||
		        window.msRequestAnimationFrame		||
				timeoutAnimationFrame;


			graph.animation_is_allowed = conf.animation_is_allowed;
			stop_animation_chain = !graph.animation_is_allowed;
			fshadows_flg = conf.run_flying_shadows;

			ifdeb( 'readme: ', graph.readme ); 
			ifdeb( 'graph init: conf_, graph.conf: ', conf_, graph.conf ); 

			if( conf.sprite_url )
			{
				sprite = new Image();
				sprite.src = conf.sprite_url;

			}else if( fshadows_flg ) {

				graph.run_flying_shadows.init_sprites ( 
						null,
						conf
				);
				var ww = virt.can[ virt.ix ];
				graph.run_flying_shadows.rescale_screen( { width : ww.width, height : ww.height } );
			}

			if( startTime !== null ) startTime = (new Date()).getTime();




			//: Resets animation up
			throttledResize();

			if( conf.movingObserver )
			{
				//btb.bindEvent( 'keydown', document.body, function ( events, target, callbak ) {
				$( document.body ).bind( 'keydown', requested_3D_navigator || graph.default_3D_navigator );
			}

			//.	Enables animation resetting at window.onresize
			//	Does this AFTER initial animation fire-up.
			btb.bindEvent( 'resize',  window, throttledResize );
			//	possibly wrong: btb.bindEvent( 'resize',  document.body, throttledResize );

			///	Sets stop/start animation on click.
			if( conf.stop_on_click )
			{
				btb.bindEvent( 'click', document.body, function () {
						graph.animation_is_allowed = !graph.animation_is_allowed;
						//.	For debug
						//	graph.do_trigger_animation( graph.animation_is_allowed );
						return false;
					},
					true
				);
			}



	
			ifdeb( 'graph.init completed.' );


	}; /// graph.init
	/// Initializes animation parameters and fires infinite animation loop



	///	Shortcut
	var timeoutAnimationFrame = function( callback,  element )
	{
		window.setTimeout( callback, conf.animationInterval );
	};


	///	Shortcut
	var select_animator = function ( draw_and_reschedule )
	{
		animation_scheduled = true;

		if( conf.use_setTimeout )
		{
			timeoutAnimationFrame( draw_and_reschedule );				
		}else{
			requestAnimationFrame( draw_and_reschedule );
		}
	};





	///	Triggers frozen animation without resetting it.
	graph.do_trigger_animation = function ( dodo )
	{
				if( dodo )
				{
					stop_animation_chain = false;

					if( !animation_scheduled )
					{
						select_animator( draw_and_reschedule );
					}
					if( canvas_wrap ) canvas_wrap.style.display = "block";
					btb$.ifdeb( 'Animation chain on' );
					
				}else{

					if( canvas_wrap ) canvas_wrap.style.display = "none";
					stop_animation_chain = true;
					btb$.ifdeb( 'Animation chain off' );

				}

	};




	/// Puts population on screen and schedules next "put".
	var draw_and_reschedule = function ()
	{
				animation_scheduled = false;

				if( stop_animation_chain ) return;

				if( graph.animation_is_allowed )
				{

					///	Synchronizing with time, turnTime, and pause.
					var effective_ticks = ticks;
					var ticks_change = 1;
					if( conf.doSyncTime )
					{

						//.	Fires startTime for the first time in page life
						if( startTime === null )
						{
							startTime = (new Date()).getTime();
						}
						var time = (new Date()).getTime() - startTime;
						var ww = Math.floor( time / conf.playPeriod * conf.ticksPeriod );
						var ticks_change = ww - ticks;
						ticks = ww;

						/*
						///	Good debug code
						if( time > 2000 )
						{
							c ccc( 'stopped' );
							return;
						}
						*/


						var wttp = conf.turnTimePoint;
						var inPausePhase = -1;
						effective_ticks = ticks;
						if( wttp && ticks >= wttp )
						{
							var wperiod = conf.playPeriod;
							var wpause = conf.turnPonitPause;
							var wtperiod = conf.ticksPeriod;
							var turnTime = wperiod * wttp / wtperiod;
							var inPausePhase = ( time - turnTime ) / wpause;

							if( inPausePhase <= 1 )
							{
								//c ccc( ' ticks=' + ticks + ' time=' + time );
								effective_ticks = wttp;
							}else{
								inPausePhase = -1;
								effective_ticks = Math.floor( ( time - wpause ) / wperiod * wtperiod );
							}
						}

					}	// if( conf.doSyncTime )
					///	Synchronizing with time, turnTime, and pause.




					if( fshadows_flg )
					{

						if( effective_ticks > conf.frozenTicksStart && !conf.runInfinitely )
						{
							// c ccc( 'ticks > conf.ticksPeriod. Draw is skipped.' + ticks + ' ' + conf.ticksPeriod );
							effective_ticks = conf.frozenTicksStart;
							//: debug
							//	btb$.ifdeb( 'ticks > conf.ticksPeriod. Draw is skipped.' + ticks + ' ' + conf.ticksPeriod );
							//  stop_animation_chain = true;
							//  return;
						}

						//	TODM fix:
						if( conf.clearEnd && effective_ticks >= conf.ticksPeriod - 1 )
						{
							master_context.fillStyle = '#000000';
							master_context.fillRect( 0, 0, canvas.width, canvas.height );
						}

						var did_draw = graph.run_flying_shadows.move_sprites( effective_ticks, inPausePhase, time );

						///	Transfers picture from virtual master to master
						if( did_draw )
						{

							if( conf.virt === 'b' || conf.virt === 't' )
							{
								graph.scaleAndDrawMemoryCanvas ( master_context, virt )
							}

							//	TODM possibly need to put it here for better copyright protection.
							//.	Puts garbage on the screen. Good but misplaced at resize.
							//	if( conf.scaffold ) graph.putText( master_context, conf.scaffold );

							if( !conf.doSyncTime ) ticks++;
						}


					}else{

						if( !conf.runInfinitely && ticks > conf.ticksPeriod ) return;
						graph.funny_graphics_3D.drawCollectionOfBalls (
							items,
							clonedCollection,
							ticks,
							conf.ticksPeriod,
							scrWidth,
							scrHeight,
							backgroundImageData,
							sprite
						);
						if( !conf.doSyncTime ) ticks++;
					}

					if( stop_afer_tick ) graph.animation_is_allowed = false;

				}
				//:	No better for both
				//master_context.putImageData( offscreenCanvas.context.getImageData( 0, 0, scrWidth, scrHeight ), 0, 0 );
				//master_context.drawImage( offscreenCanvas.canvas, 0, 0 );

				select_animator( draw_and_reschedule );

	};






	///	Regenerates population of "sprites".
	//	Used when window resizes at graph.init.
	//	Double checks if dimensions really changed keeping in mind
	//	usage in other hooks.
	//
	graph.reset_animation = function ()
	{

			//	btb$.d eb( ' reset_animation ' );
			if( !canvas || !canvas_wrap ) return;

			var wwe = document.documentElement;
			var wwb = document.body;

			// Alternative
			//graph.screen.detect();
			//var ww_w = screen.width;
			//var ww_h = screen.height;

			//: jQuery versions of dimensions detection
			var $d = $(document);
			var $w = $(window);
			var ww_w = $w.width();
			var ww_h = $w.height(); // Math.max( $d.height(), $w.height() );

			if( ww_w === scrWidth && ww_h === scrHeight ) return;

			
			scrWidth = ww_w;
			scrHeight = ww_h;

			// TODM wrong: if min-width is set in CSS for canvas
			scrCenterX	= conf.screen_center_x !== null ?
					conf.screen_center_x :
					//.	Sugar
					Math.floor(scrWidth/2);
			
			scrCenterY	= conf.screen_center_y !== null ?
					conf.screen_center_y :
					//.	Sugar
					Math.floor(scrHeight/2);

			if( conf.csize === 'f' )
			{
		    	new_width			= conf.cwidth	|| conf.vwidth;
		    	new_height			= conf.cheight	|| conf.vheight;

			}else if( conf.cCSS ) {

		    	new_width			= parseInt( $( canvas ).css( 'width' ) );
		    	new_height			= parseInt( $( canvas ).css( 'height' ) );
				//	btb$.d eb( 'Following CSS: new canvas width = ' + new_width + ', height = ' + new_height );

			}else{

				//: Keeps canvas fitting the screen.
				canvas_wrap.style.width		= scrWidth + 'px';
				//canvas_wrap.style.height	= scrHeight + 'px';
				if( !conf.preventCanvasAbsPos )
				{
					canvas_wrap.style.position	= 'absolute';
					canvas.style.position		= 'absolute';
				}
				canvas_wrap.style.left		= '0px';
				canvas_wrap.style.top		= '0px';
				canvas.style.left			= '0px';
				canvas.style.top			= '0px';

		    	new_width			= scrWidth;
		    	new_height			= scrHeight;

				// c ccc( 'new_width = scrWidth; new_height = scrHeight ::: ' + new_width + '; ' + new_height );

				if( conf.min_width && new_width < conf.min_width )
				{
					new_width = conf.min_width;
				}

				if( conf.min_height && new_height < conf.min_height )
				{
					new_height = conf.min_height;
				}

				// c ccc( 'new_width; new_height ::: ' + new_width + '; ' + new_height );

				$( canvas ).css( 'width', new_width );
				$( canvas ).css( 'height', new_height );

				// c ccc( 'css width; height ::: ' + $( canvas ).css( 'width' ) + '; ' + $( canvas ).css( 'height' ) );

			}
			graph.resizeCanvasPreservingly( master_context, new_width, new_height );




			//var lensFlag = graph.lensTransformation.flgISOMETRY;		
			var lensFlag = graph.lensTransformation.flgPERSPECTIVE;		




			//	//\\ SETS 3D OR 2D ANIMATION
			if( fshadows_flg ) {
			
				///	We don't need to rescale screen for "fixed-buffers" canvas
				if( conf.virt !== 'b' && conf.virt !== 't'  )
				{
					var ww = virt.can[ virt.ix ];
					graph.run_flying_shadows.rescale_screen( { width : ww.width, height : ww.height } );
				}
			}else{



				if( conf.generate_backg_img )
				{
					//:	It is black if no grains:
					salt				= graph.funny_graphics_2D.createRandomDisks( conf.grainsNumber, scrWidth, scrHeight );
					backgroundImageData	= salt.getImageData( 0, 0, scrWidth, scrHeight );
				}


				//: Inits workers:
				var lens = graph.lensTransformation.reset({ 
					flg			: lensFlag,
					center		: [ scrCenterX, scrCenterY ],
					originY		: conf.originY,
					scale		: conf.scale,
					originYMax	: conf.originYMax,
					originYMin	: conf.originYMin,
					xMax		: conf.xMax,
					xMin		: conf.xMin,
					zMax		: conf.zMax,
					zMin		: conf.zMin
				});


				if( conf.reset_population_at_reset || !first_time_3D_reset_done )
				{

					// var offscreenCanvas = graph.draw2D.generateCanvas( scrWidth, scrHeight );
					// graph.draw3D.reset( offscreenCanvas.context );
					graph.draw3D.reset( master_context, conf );

					///	Regenerates population of "sprites"
					items				= graph.funny_graphics_3D.generateRandomCollectionOfBalls(
										conf.itemsMax,
										conf.bodyRadiusMax,
										conf.boxMaxX,
										conf.boxMaxY,
										conf.boxMaxZ,
										conf.boxCenterX, conf.boxCenterY, conf.boxCenterZ
									  );
					clonedCollection	= graph.funny_graphics_3D.cloneCollection( items );
				}

				first_time_3D_reset_done = true;
			}

			graph.do_trigger_animation( !stop_animation_chain );

			ifdeb( 'graph.init: animation is reset.' );

	};


	/// Handles destructive events like "window.onresize"
	var throttledResize = btb.throttledCallback( graph.reset_animation );



}) ();


