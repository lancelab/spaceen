
//	//\\//	Run-time single animation manager



( function () {


	var btb			= window.btb$		= window.btb$			|| {};		
	var graph		= btb.graph			= btb.graph				|| {};	// Plugin itself
	var conf		= graph.conf		= graph.conf			|| {};
	var	conf3D		= conf.conf3D		= conf.conf3D			|| {};
	var usprite		= graph.usprite		= graph.usprite			|| {};
	var mstones 	= graph.mstones		= graph.mstones			|| {};
	var virt		= graph.virt		= graph.virt			|| {};
	var	lensT		= graph.lensTransformation	= graph.lensTransformation	|| {};
	var debby		= btb.debby			= btb.debby				|| {};
	var ifdeb;
	var $;


	//	//\\	Run-time variables	//////////////////////////////////////////
	var canvas_wrap					= null;
	var canvas						= null;
   	var master_context				= null;											//canvas.getContext('2d');


	var animation_scheduled;					// state of animation
	var stop_animation_chain;					// puts state to "false" at first opportunity
	var neverRunAnimAgain;
	var stop_afer_tick;


	var runFlyer_flg;

	var scrHeight					= -1;		//	resize flag
    var	scrWidth					= -1;		//	resize flag
		
	//	\\//	Run-time variables	//////////////////////////////////////////











	//***************************************************************
	/// Initializes animation parameters and fires infinite animation loop
	//	Looks for element with id = 'canvas' and tests browser.
	//
	//***************************************************************
	graph.init = function ( requested_3D_navigator, foregrounds_ )
	{

			ifdeb			= btb.ifdeb;
			$				= window.jQuery;

			ifdeb( 'graph.init entered' );

			canvas_wrap = document.getElementById( 'canvas_wrap' );
			if( !canvas_wrap ) return;

			master_context = graph.master_context;
			if( !master_context )
			{
				//:	We have canvas-unaware browser.
				//	Removes canvas from page.
				canvas_wrap.style.display='none';
				ifdeb( 'graph.init: canvas-unaware browser: canvas is disabled.' );
				return;
			}
			graph.enabled = true;
			canvas = graph.canvas;

			///	External conf overrides internal
			//if( !( graph.capturer && graph.capturer.conf ) )
			//{ 
			//	btb.paste_non_arrays( conf, conf_ );
			//}


			stop_afer_tick = conf.stop_afer_tick;

			if( conf.disable_landing_loading_warning )
			{
				//.	Disables "loading" warning
				var ww = document.getElementById( 'loading' );
				if( ww ) ww.style.display = 'none';	
			}


			//:	Sets in-line CSS dynamically
			if( conf.min_width		) $( canvas ).css( 'min-width', conf.min_width );
			if( conf.min_height		) $( canvas ).css( 'min-height', conf.min_height );
			if( conf.body_overflow	) document.body.style.overflow = conf.body_overflow;
			if( conf.wrap_overflow	) canvas_wrap.style.overflow = conf.wrap_overflow;


			///	Virtual Master
			//: contains, canvas, context, index, current, master_context
			virt.can	= [];
			virt.con	= [];
			virt.ix		= 0;
			virt.mctx	= master_context;
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
				virt.canvas			= virt.can[ 0 ];
				virt.ctx			= virt.con[ 0 ];
			}else{
				virt.can[ 0 ]	= canvas;
				virt.con[ 0 ]	= master_context;
				virt.canvas		= canvas;
				virt.ctx		= master_context;
			}



			///	Fallback to "setTimeout-animation-frame"
			window.requestAnimationFrame =
				window.requestAnimationFrame		||
		        window.webkitRequestAnimationFrame	||
		        window.mozRequestAnimationFrame		||
		        window.oRequestAnimationFrame		||
		        window.msRequestAnimationFrame		||
				timeoutAnimationFrame;


			graph.animation_is_allowed	= conf.animation_is_allowed;
			stop_animation_chain		= !graph.animation_is_allowed;
			neverRunAnimAgain			= false;
			runFlyer_flg				= conf.runFlyer;

			if( conf.in3D) lensT.init();

			graph.flyer.foregrounds = graph.flyer.foregrounds || foregrounds_;
			graph.flyer.init_sprites ();
			graph.flyer.rescale_virt();

			if( /c/.test( debby.core ) ) btb.deb( 'graph.conf=',  graph.conf );
			if( /C/.test( debby.core ) ) btb.saveObjectToServer( 'conf', graph.conf );

			//. Sets start flag
			//	(( mstones.ticks		= 0;		//	counts animation phase till the browser's death. Independent from window resizes. ))
			//	(( mstones.pastTicks	= 0; ))
			graph.startTime	= null;


			// c ccc( 'init: canvas-css width/height=' + $( canvas ).css( 'width' ) + '/' + $( canvas ).css( 'height' ) );
			// c ccc( 'init: fgImg width/height=' + $( '#canvasFgIm' ).css( 'width' ) + '/' + $( '#canvasFgIm' ).css( 'height' ) );

			//: Resets animation up

			throttledResize();

			if( conf.movingObserver )
			{
				$( document.body ).bind( 'keydown', requested_3D_navigator || graph.default_3D_navigator );
			}

			//.	Enables animation resetting at window.onresize
			//	Does this AFTER initial animation fire-up.
			btb.bindEvents( 'resize',  window, throttledResize );
			//	d eb: btb.bindEvents( 'resize',  window, function () { c ccc( 'resized' ); throttledResize(); } );
			//	possibly wrong: btb.bindEvents( 'resize',  document.body, throttledResize );

			///	Sets stop/start animation on click.
			if( conf.stop_on_click )
			{
				btb.bindEvents( 'click', document.body, function () {
						graph.animation_is_allowed = !graph.animation_is_allowed;
						//.	For debug
						//	graph.do_trigger_animation( graph.animation_is_allowed );
						return true;
					} 
				);
			}

			///	Sets stop/start animation on click.
			if( conf.usprite.suspendUserAutomoveAtActions )
			{
				btb.bindEvents( 'click', document.body, function () {
						usprite.startRunningTime = (new Date()).getTime() + conf.usprite.suspendUserAutomoveDuration;
						return true;
					} 
				);
				btb.bindEvents( 'keydown', document.body, function () {
						usprite.startRunningTime = (new Date()).getTime() + conf.usprite.suspendUserAutomoveDuration;
						return true;
					} 
				);
			}


	


			///	Sets stop/start animation on click.
			graph.mstones.ownMoveStopped = conf.startFromStopped;

			if( conf.never_let_internal_evol )
			{
				graph.mstones.ownMoveStopped = true;
			}else{

				if( conf.stop_own_move_on_click )
				{
					btb.bindEvents( 'click', document.body, function () {
							graph.mstones.ownMoveStopped = !graph.mstones.ownMoveStopped;
							return true;
						}
					);
				}
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
				if( dodo && !neverRunAnimAgain )
				{
					stop_animation_chain = false;

					if( !animation_scheduled )
					{
						select_animator( draw_and_reschedule );
					}
					if( canvas_wrap ) canvas_wrap.style.display = "block";
					ifdeb( 'Animation chain on' );
					
				}else{

					if( canvas_wrap ) canvas_wrap.style.display = "none";
					stop_animation_chain = true;
					ifdeb( 'Animation chain off. neverRunAnimAgain=' + neverRunAnimAgain );
				}

	};

	///	Milestones
	var mstonesDefault =
	{
		reinit : function ()
		{
			this.completedJustFirstFrame	= false;	// fired only once
			this.afterFirstFrame		= false;

			this.turnEnterPassed		= false;
			this.pauseEnterPassed		= false;
			this.culminationEnterPassed	= false;
			this.turnExitPassed			= false;
			this.iterationExitPassed	= false;

			this.turnEnterEntered			= null;
			this.pauseEnterEntered			= null;
			this.culminationEnterEntered	= null;
			this.turnExitEntered			= null;
			this.iterationExitEntered		= null;

			this.inPausePhase				= null;
		}	
	};
	btb.paste_non_arrays( graph.mstones, mstonesDefault );








	//***************************************************************
	/// Puts population on screen and schedules next "put".
	//***************************************************************
	var draw_and_reschedule = function ()
	{
		animation_scheduled			= false;
		if( stop_animation_chain )	return;

		//	TODO add?: 	if( !reset_delay_flag ) or some flag telling that there is no reschedule started from
		//				parent app. Otherwise, core graph may still waiting for reschedule, but
		//				main app already fired "draw and reschedule". Was bug in Whirlio animation.

		if( !graph.animation_is_allowed )
		{
			select_animator( draw_and_reschedule );
			return;
		}


						//.	Initializes tick-time counts
						if( graph.startTime === null )
						{
							graph.startTime		= conf.timeFromTicks ? 0 : (new Date()).getTime();
							mstones.ticks		= 0;
							mstones.pastTicks	= 0;
						}

						if( conf.timeFromTicks )
						{
							var time			= conf.tickTimeStep * mstones.ticks; 
						}else{
							var time			= (new Date()).getTime() - graph.startTime;
						var ww				= Math.floor( time / conf.playPeriod * conf.ticksPeriod );
							var ticks_change	= ww - mstones.pastTicks;
							mstones.ticks		= ww;
							effective_ticks		= mstones.ticks;
						}
						var effective_ticks		= mstones.ticks;
						var ticks_change		= mstones.ticks - mstones.pastTicks;
						//. pastTicks is no longer needed for iteration-preparation. Set it to new value
						mstones.pastTicks = mstones.ticks;

						/*
						///	Good debug code
						if( time > 2000 )
						{
							c ccc( 'stopped' );
							return;
						}
						*/


						var wttp				= conf.turnTicksPoint;
						mstones.inPausePhase	= -1;


						if( wttp && mstones.ticks >= wttp )
						{
							var turnTime		= conf.tickTimeStep * wttp;
							var wpause			= conf.turnPonitPause;

							mstones.turnEnterEntered		= !mstones.turnEnterPassed;
							if( mstones.turnEnterEntered )	mstones.turnEnterPassed = true;

							if( wpause )
							{

								mstones.pauseEnterEntered = !mstones.pauseEnterPassed && mstones.turnEnterEntered;
								if( mstones.pauseEnterEntered )	mstones.pauseEnterPassed = true;

								mstones.inPausePhase	= ( time - turnTime ) / wpause;
								if( mstones.inPausePhase <= 1 )
								{
									//c ccc( ' ticks=' + ticks + ' time=' + time );
									//.	Keeps effective ticks at the turn point
									effective_ticks = wttp;
									mstones.culminationEnterEntered			= !mstones.culminationEnterPassed && mstones.inPausePhase >= 0.5 ;
									if( mstones.culminationEnterEntered )	mstones.culminationEnterPassed = true;

								}else{
									//::	After-pause area
									mstones.turnExitEntered					= !mstones.turnExitPassed;
									if( mstones.turnExitEntered )			mstones.turnExitPassed = true;
									mstones.culminationEnterEntered			= !mstones.culminationEnterPassed;
									if( mstones.culminationEnterEntered )	mstones.culminationEnterPassed = true;
									mstones.inPausePhase					= -2;
									//.	Subtracts pause from effective ticks
									effective_ticks	= Math.floor( ( time - wpause ) / conf.playPeriod * conf.ticksPeriod );
								}
							}
						}else{
							//::	After-pause area
							mstones.turnExitEntered					= !mstones.turnExitPassed;
							if( mstones.turnExitEntered )			mstones.turnExitPassed = true;
							mstones.inPausePhase					= -2;
						}
		///	Synchronizing with time, turnTime, and pause.

		//.	Apparently: don't put >= below yet. Will have dramatic effect: pause is never entered ...	TODM fix this.
		mstones.iterationExitEntered		= !mstones.iterationExitPassed && effective_ticks > conf.frozenTicksStart;

		if( mstones.iterationExitEntered )	mstones.iterationExitPassed = true;


		if( mstones.iterationExitPassed )
		{
							if( conf.runInfinitely )
							{
								// c ccc( time + ' ticks=' + ticks + ' eff. ticks=' + effective_ticks );

								if( conf.reinitAfterIteration )
								{
									mstones.reinit();

									graph.startTime	= null; //(new Date()).getTime();
									///	New color-shape-scenario at every new animation cycle
									graph.flyer.init_sprites ();
									select_animator( draw_and_reschedule );
									return;
								}

							}else{
								// c ccc( 'ticks > conf.ticksPeriod. Draw is skipped.' + ticks + ' ' + conf.ticksPeriod );
								effective_ticks = conf.frozenTicksStart;
								if( conf.stopAnimChainAfterIter )
								{
									stop_animation_chain = true;
									neverRunAnimAgain = true;
									ifdeb( 'Animation chain stopped after iter.' ); 
									// c ccc( 'stopper: canvas-css width/height=' + $( canvas ).css( 'width' ) + '/' + $( canvas ).css( 'height' ) );
									// c ccc( 'stopper: fgImg width/height=' + $( '#canvasFgIm' ).css( 'width' ) + '/' + $( '#canvasFgIm' ).css( 'height' ) );
								}
							}
		}

		///	(( Clears before drawing. For complete clean up, don't draw after cleanup.))
		if( conf.clearEnd && mstones.iterationExitEntered ) graph.wipeOutMemory();

		mstones.effTicks = effective_ticks;
		mstones.time = time;
		// c ccc( mstones.ticks, mstones );
		var did_draw = graph.flyer.move_sprites( effective_ticks, time );


		//..	if( runFlyer_flg )

		if( did_draw )
		{

							//	TODM possibly need to put it here for better copyright protection.
							//.	Puts garbage on the screen. Good but misplaced at resize.
							//	if( conf.scaffold ) graph.putText( master_context, conf.scaffold );

							if( conf.timeFromTicks ) mstones.ticks++;
							if( !mstones.completedJustFirstFrame && !mstones.afterFirstFrame )
							{
								mstones.completedJustFirstFrame = true;
								setCanvasVisible();	// TODM this seems not good because shows background image before
													// canvas is refreshed although canvas is drawn earlier;
													// This is a rough but helpless solution: setTimeout( setCanvasVisible, 500 );
							}else{
								mstones.afterFirstFrame = true;
								mstones.completedJustFirstFrame = false;
							}
							// c ccc( time );
							// if( stop_afer_tick && mstones.ticks > 10 ) graph.animation_is_allowed = false;
							if( stop_afer_tick ) graph.animation_is_allowed = false;
		}


				
		//:	No better for both
		//master_context.putImageData( offscreenCanvas.context.getImageData( 0, 0, scrWidth, scrHeight ), 0, 0 );
		//master_context.drawImage( offscreenCanvas.canvas, 0, 0 );

		select_animator( draw_and_reschedule ); // TODM ineffective ... to draw when !did_draw

	};// draw_and_reschedule = function ()
	/// Puts population on screen and schedules next "put".








	//***************************************************************
	///	Regenerates population of "sprites" for gravity scenario.
	//	Used when window resizes at graph.init.
	//	Double checks if dimensions really changed keeping in mind
	//	usage in other hooks.
	//
	//***************************************************************
	var firstAnimationResetDone = false;
	graph.reset_animation = function ()
	{

			//	btb$.d eb( ' reset_animation ' );
			if( !canvas || !canvas_wrap || neverRunAnimAgain ) return;
			//	if( !canvas || !canvas_wrap ) return; // d ebug

			var wwe = document.documentElement;
			var wwb = document.body;

			// Alternative
			//graph.screen.detect();
			//var ww_w = screen.width;
			//var ww_h = screen.height;

			if( conf3D.bigScreenWidthThreshold || conf3D.bigScreenHeightThreshold )
			{
				graph.fixLensTranScaleForBigScreens();
			}

			//: jQuery versions of dimensions detection
			var $d = $(document);
			var $w = $(window);
			var ww_w = $w.width();
			var ww_h = $w.height(); // Math.max( $d.height(), $w.height() );

			if( ww_w === scrWidth && ww_h === scrHeight ) return;

			scrWidth	= graph.scrWidth	= ww_w;
			scrHeight	= graph.scrHeight	= ww_h;

			// TODM wrong: if min-width is set in CSS for canvas
			graph.scrCenterX	= conf.screen_center_x !== null ?
					conf.screen_center_x :
					//.	Sugar
					Math.floor(scrWidth/2);
			
			graph.scrCenterY	= conf.screen_center_y !== null ?
					conf.screen_center_y :
					//.	Sugar
					Math.floor(scrHeight/2);


			if( conf.in3D )
			{
				var screenFocusX	= conf3D.screenFocusX || 0;
				var screenFocusZ	= conf3D.screenFocusZ || 0;
				//.	At some point, we must make name transition from 3D Z axis to 2D canvas Y axis ... here we do ...
				var control = { center : [ graph.scrCenterX + screenFocusX, graph.scrCenterY + screenFocusZ ] };
				graph.lensTransformation.reset( { control : control });
			}


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
				if( conf.min_width && new_width < conf.min_width	) new_width = conf.min_width;
				if( conf.min_height && new_height < conf.min_height ) new_height = conf.min_height;

				$( canvas ).css( 'width', new_width );
				$( canvas ).css( 'height', new_height );

				// c ccc( 'new_width; new_height ::: ' + new_width + '; ' + new_height );
				// c ccc( 'reset_animation: canvas-css width/height=' + $( canvas ).css( 'width' ) + '; ' + $( canvas ).css( 'height' ) );

			}
			graph.resizeCanvasPreservingly( master_context, new_width, new_height );


			//	//\\ SETS 3D OR 2D ANIMATION
			if( conf.virt !== 'b' && conf.virt !== 't'  )
			{
				//::	We don't need to rescale screen for "fixed-buffers" canvas
				graph.flyer.rescale_virt();
			}

			//if( conf.in3D ) graph.flyer.init_sprites (); // TODO bug: split subs.
			if( conf.reinitSpritesInResize )
			{
				graph.flyer.init_sprites (); // TODO bug: split subs. Bug bs. lens.init is required, but it is messed with spr.
			}	
			//	\\// SETS 3D OR 2D ANIMATION


			if( graph.startTime !== null )
			{
				conf.timeFromTicks ? 0 : (new Date()).getTime();
				mstones.ticks		= 0;		//	counts animation phase till the browser's death. Independent from window resizes.
				mstones.pastTicks	= 0;
			}
			graph.do_trigger_animation( !stop_animation_chain );

			ifdeb( 'graph.init: animation is reset.' );

	};


	var setCanvasVisible = function ()
	{
		//:	needs research
		//$( '#canvas_wrap' ).css( 'display', 'block' );
		//$( '#canvas_wrap' ).css( 'visibility', 'visible' );

		$( canvas ).css( 'visibility', 'visible' );
		$( canvas ).css( 'display', 'block' );

		var bg_jq = $( '#canvasBgIm' );
		if( conf.unfadeBgImgTimeMs )
		{
			bg_jq.css( 'opacity', 0 );
			bg_jq.animate( { opacity : 1 }, { duration : conf.unfadeBgImgTimeMs } );	// TODM apparently makes canvas animatin jerking at short unfadeBgImgTimeMs;
		}
		bg_jq.css( 'visibility', 'visible' ); // Apparently does it before canvas is refreshed and causes flicker;
		bg_jq.css( 'display', 'block' );
		// c ccc( 'set visible in animation thread' );
	};

	/// Handles destructive events like "window.onresize"
	var throttledResize = btb.throttledCallback( graph.reset_animation, 50 );



}) ();


