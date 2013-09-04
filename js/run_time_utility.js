
//	//\\//	Run-time helpers



( function () {



	var btb			= window.btb$		= window.btb$			|| {};		
	var graph		= btb.graph			= btb.graph				|| {};
	var conf		= graph.conf		= graph.conf			|| {};
	var	conf3D		= conf.conf3D		= conf.conf3D			|| {};
	var flyerConf	= conf.cflyer		= conf.cflyer			|| {};
	var virt		= graph.virt		= graph.virt			|| {};
	var	flyer 		= graph.flyer		= graph.flyer			|| {};
	var ifdeb		= btb.ifdeb;


	/// Helper
	//	Not helpful for browser's width.
	//	graph.screen			= {};
	//graph.screen.detect = function ()
	//{
	//		screen.width = window.innerWidth; // || body.clientWidth;
	//		screen.height = window.innerHeight; // || body.clientHeight;
	//};


	//:	To transfer picture from master canvas to master canvas when it is resized
	var tmpcanvas	= null;
	var tmpctx		= null;



	///	Spawns configuration data
	//	Must be run before using conf.
	graph.spawn_config = function ( conf )
	{
			if( !conf.timeScale ) conf.timeScale = 1;
			if( !conf.frozenTicksStart && conf.frozenTicksStart !== 0 ) conf.frozenTicksStart = conf.ticksPeriod;
			conf.tickTimeStep = conf.ticksPeriod > 0 ? conf.playPeriod / conf.ticksPeriod : 1000;
			//.	Effective only if setTimeout used for animation or if !!timeFromTicks
			conf.animationInterval = Math.max( Math.floor( conf.tickTimeStep ), 20 );

			conf.ticksPerMsec = conf.ticksPeriod / conf.playPeriod;

			if( !conf.turnPonitPause ) conf.turnPonitPause = 0;

	}	


	///	Puts simple text message on canvas
	graph.putText = function ( ctx, center_xx, center_yy, scale, vwidth, text )
 	{
		var cc			= ctx.canvas;
		var ww			= cc.width;
		var hh			= cc.height;
		var len			= text.length;
		if( !len )		return;
		var fontSize	= Math.ceil( vwidth / len * scale * 0.5 ) + 2;
		var offsetX		= center_xx - 0.25 * fontSize * len;
		var offsetY		= center_yy - fontSize;

		// c ccc( center_xx + ', ' + center_yy + ' fontSize=' + fontSize);

		ctx.font = fontSize + 'px Arial';

		ctx.lineWidth = 1.0;
		ctx.fillStyle = 'rgba( 125, 125, 125, 0.2 )';
		ctx.fillText( text, offsetX, offsetY );
	};


	///	Transfers picture from master canvas to master canvas when it is resized
	graph.resizeCanvasPreservingly = function ( ctx, new_width, new_height )
	{
		var canvas			= ctx.canvas;					
		var canvas_width	= canvas.width;
		var canvas_height	= canvas.height;

		//.	Do nothing
		if( canvas_width === new_width && canvas_height === new_height ) return;
		///	Nothing to preserve: no frame-memory to keep or all info is kept in buffers
		if( !graph.mstones.frameMemLoss || conf.virt === 'b' || conf.virt === 't' )
		{
			//:	Resizes and leaves
	    	canvas.height		= new_height;
	    	canvas.width		= new_width;
			return;
		}

		if( !tmpcanvas )	//	TODMspeedup
		{
			tmpcanvas		= document.createElement( 'canvas' );
			tmpctx			= tmpcanvas.getContext( '2d' );
		}

		if( conf.virt === 'v' )
		{
			graph.reframeResizedImage( canvas_width, canvas_height, new_width, new_height, canvas, canvas, ctx );

		///	Very crude method: picture quality may be lost each time.
		}else{


			tmpcanvas.width		= canvas_width;
			tmpcanvas.height	= canvas_height;
			tmpctx.drawImage( canvas, 0, 0 );

			//.	Alternative method
			//	var imageData	= ctx.getImageData( 0, 0, canvas_width, canvas_height );

    		canvas.height		= new_height;
    		canvas.width		= new_width;

			//.	Alternative method continued
			//	ctx.putImageData( imageData, 0, 0, 0, 0, new_width, new_height );

			//	http://stackoverflow.com/questions/8693949/resize-html5-canvas-element
			ctx.drawImage( tmpctx.canvas, 0, 0, canvas_width, canvas_height, 0, 0, new_width, new_height );
		}
	
	};




	///	For virtual-non-memory canvas
	graph.reframeResizedImage = function ( 
			beforeW, beforeH, afterW, afterH,
			from_canvas, to_canvas, to_context )
	{
		var sbW = beforeW / conf.vwidth;
		var sbH = beforeH / conf.vheight;
		var bS = Math.min( sbW, sbH );
		var saW = afterW / conf.vwidth;
		var saH = afterH / conf.vheight;
		var aS = Math.min( saW, saH );
		var nS = aS / bS;
		var newW = beforeW * nS;
		var newH = beforeH * nS;
		var offX = ( afterW - newW ) * 0.5;
		var offY = ( afterH - newH ) * 0.5;

		var doPreserve = conf.keepAtResize;	// wrong: changed ratio still causes gaps: || nS <= 1;

		if( doPreserve )
		{
			tmpcanvas.width		= beforeW;
			tmpcanvas.height	= beforeH;
			tmpctx.drawImage( from_canvas, 0, 0 );
		}

		to_context.canvas.width = afterW;
		to_context.canvas.height = afterH;
		to_context.clearRect( 0, 0, afterW, afterH );


		/*

		c ccc(	"Transferring img when resizing canvas with kept ratio:\n" +
				'  bs, as, ns =' + bS + ', ' + aS + ', ' + nS + "\n" +
				'  before, after, virt = ' +
				beforeW + ', ' + beforeH + ', ' +  afterW + ', ' + afterH + ', ' + conf.vwidth + ', ' + conf.vheight + "\n" +
				'  offX, offY, nW, nH = ' + offX + ', ' + offY + ', ' + newW + ', ' + newH );

		*/

		//.	Deletes memory-image at resize
		if( !doPreserve ) return;
		
		to_context.drawImage(
			tmpcanvas,
			0, 0, beforeW, beforeH,
			offX, offY, newW, newH
		);

		// c ccc( 'Canvas transferred to new size. Ratio preserved. Before, after, virt = ', bW, bH, aW, aH, conf.width, conf.vheight );

	};



	///	Animation frame draw helper
	//	Apparently draws from twin or single buffers.
	//	Usage case: if( conf.virt === 'b' || ... 't' )
	graph.scaleAndDrawMemoryCanvas = function ( inPausePhase, master_screen_scale, turnEnterPassed, ownTicks )
	{
			var vcanvas	= virt.canvas;
			var master_context = virt.mctx;

			var canvas	= master_context.canvas;
			var ww		= canvas.width;
			var wh		= canvas.height;
			var ww_v	= vcanvas.width;
			var wh_v	= vcanvas.height;
			var ww_off	= 0;
			var wh_off	= 0;
			var ww_new	= ww;
			var wh_new	= wh;
		
			//: Used for image
			var w_w		= ww / ww_v;
			var w_h		= wh / wh_v;
			
			if( !conf.noratio )
			{
				var wscale	= Math.min( w_w, w_h );
				var ww_new	= ww_v * wscale;
				var wh_new	= wh_v * wscale;
				var ww_off	= Math.max( 0, ( ww - ww_new ) * 0.5 );
				var wh_off	= Math.max( 0, ( wh - wh_new ) * 0.5 );
				var w_w		= wscale;
				var w_h		= wscale;
			}
		

			if( conf.virt === 'b' || conf.virt === 't' )
			//if( master_context !== virt.con[ virt.ix ] )
			{
				master_context.clearRect( 0, 0, ww, wh );
				master_context.drawImage(
					vcanvas,
					0, 0, ww_v, wh_v,
					ww_off, wh_off, ww_new, wh_new
				);
			}


			///	Draws image to master in time of pause
			var fillTitleFrom = conf.cflyer && conf.cflyer.fillTitleFrom;
			if( turnEnterPassed || ( fillTitleFrom && fillTitleFrom > ownTicks )) //inPausePhase > -1 )	//TODM too expensive calls after pause. Rid them.
			{
				graph.dsprite.drawPauseImage (
					inPausePhase,
					master_context,
					ww * 0.5,
					wh * 0.5,
					w_w * master_screen_scale,
					w_h * master_screen_scale,
					turnEnterPassed,
					ownTicks
				);
			}


	};	//	graph.scaleAndDrawMemoryCanvas



	///	Wipes out current context with image, color, or transparent color
	graph.wipeOutMemory = function ()	// TODM make init sub to localize flyer.backgroundImageData
	{
			var wctx			= virt.ctx;
			var curA			= virt.drawArea;
			var bgRefillColor	= flyerConf.bgRefillColor;

			if( flyer.backgroundImageData )
			{
				wctx.putImageData( flyer.backgroundImageData, 0, 0 )
			}else if( bgRefillColor ) {

				wctx.fillStyle = bgRefillColor;
				wctx.fillRect( 0, 0, curA.sizeX, curA.sizeY );  

			}else if( bgRefillColor !== null ) {

				//.	Fills with transparent color:
				wctx.clearRect( 0, 0, curA.sizeX, curA.sizeY );
			}
	};

	///	Does this one-time: removes "loading ... " warning
	graph.removeLoadingMsg = function ()
	{
		var ww = document.getElementById( 'loading-wrap' );
		if( ww ) ww.style.display = 'none';
		ifdeb( '"loading ... " warning is removed ' );
	};




	///	Keyboard navigation through 3D
	//	Makes 3D-forward/backward by CtrlKey. Fails? on Mac.
	graph.default_3D_navigator = function ( event )
	{
					var control = {};
					var handled = false;

					if( event.altKey ) return true;

					if( event.ctrlKey )
					{
						switch ( event.keyCode )
						{
							case 38	:	control.moveY = conf.movingObserverStepY	//'forward',
										handled = true;
										break;
							case 40	:	control.moveY = -conf.movingObserverStepY	//'backward',
										handled = true;
										break;
						}

					}else{

						switch ( event.keyCode )
						{
							case 37	: control.moveX = -conf.movingObserverStepX	//'left',
										handled = true;
										break;
							case 38	: control.moveZ = conf.movingObserverStepZ	//'up',
										handled = true;
										break;
							case 39	: control.moveX = conf.movingObserverStepX	//'right',
										handled = true;
										break;
							case 40	: control.moveZ = -conf.movingObserverStepZ	//'down',
										handled = true;
										break;
						}

					}

					if( handled )
					{
						var lens = graph.lensTransformation.reset( control );
						return false;
					}
					return true;

	};




	///	3D is non-prioritized in keys-navigation
	//
	graph.non_priority_3D_navigator = function ( event )
	{
					var conf3D		= conf.conf3D;
					var arg			= {};
					var control		= arg.control = {};
					var handled		= false;
					var pass_event	= true;

					if( event.altKey ) return true;

					if( event.shiftKey )
					{

						switch ( event.keyCode )
						{

							case 38	:	control.moveY = conf3D.movingObserverStepY	// 'forward',
										pass_event = false;
										handled = true;
										break;
							case 40	:	control.moveY = -conf3D.movingObserverStepY	// 'backward',
										pass_event = false;
										handled = true;
										break;
						}

					}else{

						switch ( event.keyCode )
						{


							//	//\\	These handlers disabled because of their job is
							//			delegate to scroll-event repositioner.
							//case 38	: control.moveZ = conf.movingObserverStepZ	//'up',
							//			handled = true;
							//			break;

							//case 40	: control.moveZ = -conf.movingObserverStepZ	//'down',
							//			handled = true;
							//			break;
							//	\\//	These handlers disabled because of their job is

							case 37	:	control.moveX = -conf3D.movingObserverStepX	//'left',
										pass_event = false;
										handled = true;
										break;
							case 39	:	control.moveX = conf3D.movingObserverStepX	//'right',
										pass_event = false;
										handled = true;
										break;
						}

					}

					if( handled )
					{
						var lens = graph.lensTransformation.reset( arg );
					}
					return pass_event;

	};


	///	3D is prioritized in keys-navigation
	//
	graph.priority_3D_navigator = function ( event )
	{

			var conf3D		= conf.conf3D;
			var arg			= {};
			var control		= arg.control = {};
			var handled		= false;
			var pass_event	= true;

			if( event.altKey ) return true;

			if( event.ctrlKey )		//	Apparently "Mac. Lion" takes away Ctro+arrow up.
			{


			}else if( event.shiftKey ) {

						switch ( event.keyCode )
						{
							case 38	:	control.moveZ = conf3D.movingObserverStepZ	//'up',
										pass_event = false;
										handled = true;
										break;

							case 40	:	control.moveZ = -conf3D.movingObserverStepZ	//'down',
										pass_event = false;
										handled = true;
										break;
						}

			}else{


						switch ( event.keyCode )
						{

							case 38	:	control.moveY = conf3D.movingObserverStepY	// 'forward',
										pass_event = false;
										handled = true;
										break;
							case 40	:	control.moveY = -conf3D.movingObserverStepY	// 'backward',
										pass_event = false;
										handled = true;
										break;
							case 37	:	control.moveX = -conf3D.movingObserverStepX	//'left',
										pass_event = false;
										handled = true;
										break;
							case 39	:	control.moveX = conf3D.movingObserverStepX	//'right',
										pass_event = false;
										handled = true;
										break;
						}


			}

			if( handled )
			{
					var lens = graph.lensTransformation.reset( arg );
			}
			return pass_event;

	};


	///	TODM create utilit. for graph and move this function there
	graph.fixLensTranScaleForBigScreens = function ()
	{
		//	This should be checked in a caller:
		//	if( !conf3D.bigScreenWidthThreshold && !conf3D.bigScreenHeightThreshold ) return;

		var width		= $(window).width();
		var height		= $(window).height();

		var scale		= conf3D.scale;

		var ww			= conf3D.bigScreenWidthThreshold;
		var scaleW		= ww && ww < width ? scale * width / ww : scale;

		var ww			= conf3D.bigScreenHeightThreshold;
		var scaleH		= ww && ww < height ? scale * height / ww : scale;

		var scaleR		= Math.ceil( Math.max( scaleW, scaleH ) );

		if( scaleR		> scale )
		{
			// c ccc( 'resetting scale from ' + scale + ' to ' + scaleR + ' win-width=' + width + ' win-h=' + height );
			graph.lensTransformation.reset( { conf3D : { scale : scaleR } } );
		};
	};



}) ();


