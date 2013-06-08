
//	//\\//	Run-time helpers



( function () {



	var btb		= window.btb$		= window.btb$			|| {};		
	var graph	= btb.graph			= btb.graph				|| {};
	var conf	= graph.conf		= graph.conf			|| {};


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


	///	Keyboard navigation through 3D
	graph.default_3D_navigator = function ( event )
	{
					var control = {};
					var handled = false;

					if( event.ctrlKey )
					{
						switch ( event.keyCode )
						{
							case 38	:	control.moveY = conf.movingObserverStepY	//'up',
										handled = true;
										break;
							case 40	:	control.moveY = -conf.movingObserverStepY	//'down',
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


	///	Spawns configuration data
	//	Must be run before using conf.
	graph.spawn_config = function ( conf )
	{
			if( !conf.frozenTicksStart && conf.frozenTicksStart !== 0 ) conf.frozenTicksStart = conf.ticksPeriod;
			var ww = conf.ticksPeriod > 0 ? Math.floor( conf.playPeriod / conf.ticksPeriod ) : 20;
			if( ww < 20 ) ww = 20;
			//.	Effective only if setTimeout used for animation
			conf.animationInterval = ww;

			conf.memLossExp = 0;
			if( conf.memLoss )
			{
				conf.memLossExp = conf.memLoss > 0.999999999 ? 1000000 : ( -Math.log( 1 - conf.memLoss ) ) / 1000;
			}

			conf.critPointMemLossExp = 0;
			if( conf.critPointmemLoss )
			{
				conf.critPointMemLossExp = conf.critPointmemLoss > 0.999999999 ? 1000000 : ( -Math.log( 1 - conf.critPointmemLoss ) ) / 1000;
			}

			conf.ticksPerMsec = conf.ticksPeriod / conf.playPeriod;

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
		///	Nothing to preserve
		if( !conf.memLoss || conf.virt === 'b' || conf.virt === 't' )
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
	//	Usage case: if( conf.virt === 'b' || ... 't' )
	graph.scaleAndDrawMemoryCanvas = function ( master_context, virt )
	{
			var vcanvas	= virt.can[ virt.ix ];
			var canvas	= master_context.canvas;
			var ww		= canvas.width;
			var wh		= canvas.height;
			var ww_v	= vcanvas.width;
			var wh_v	= vcanvas.height;
			var ww_off	= 0;
			var wh_off	= 0;
			var ww_new	= ww;
			var wh_new	= wh;

			if( !conf.noratio )
			{
				var w_w		= ww / ww_v;
				var w_h		= wh / wh_v;
				var wscale	= Math.min( w_w, w_h );
				var ww_new	= ww_v * wscale;
				var wh_new	= wh_v * wscale;
				var ww_off	= Math.max( 0, ( ww - ww_new ) * 0.5 );
				var wh_off	= Math.max( 0, ( wh - wh_new ) * 0.5 );
			}
		
			//.	TODO Really bad bug
			//	if( ticks > conf.ticksPeriod - 10 && ticks < conf.ticksPeriod + 10 ) c ccc( 'time=' + time + 'really did_draw=' + did_draw );

			master_context.clearRect( 0, 0, ww, wh );
			master_context.drawImage(
					vcanvas,
					0, 0, ww_v, wh_v,
					ww_off, wh_off, ww_new, wh_new
			);


	};	//	graph.scaleAndDrawMemoryCanvas


}) ();


