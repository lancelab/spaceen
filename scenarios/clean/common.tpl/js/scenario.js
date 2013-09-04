
//	//\\//	Sets tasks for "window.onload" equivalent for scenario


( function () {



	var	btb			= window.btb$		= window.btb$			|| {};		
	var	graph		= btb.graph			= btb.graph				|| {};
	var	conf		= graph.conf		= graph.conf			|| {};
	var	scenario	= graph.scenario	= graph.scenario		|| {};






	scenario.run = function ()
	{







		//	//\\//	/////////////////////////////////////////////////////////////////////////////////////////////
		//
		//              Manages front page
		//
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

		//: CONTROL FRAGMENT ////////////////////////////////////////
		var canvas_wrap_jq			= $( '#canvas_wrap' );
		var canvasBgIm_jq			= $( '#canvasBgIm' );
		var canvasHeightToWidth		= conf.canvasHeightToWidth;
		var landingSplashDuration	= conf.landingSplashDuration;
		//.	... some mobiles "break" on fixed style positioning ...
		var fixedToAbsolutePatch	= btb.browser.mobile;	





		// //\\ digestPositions ////////////////////////////////////////////////

		var repositionCanvasNavigation = function ()
		{
			var window_minus_doc	= $(document).scrollTop();
			var wheight				= Math.floor( $(window).height() );
			var wwidth				= Math.floor( $(window).width() );

			var bigScreenScale	= conf.conf3D.scale;
			var ww				= conf.bigScreenScaleThreshold;
			if( ww && ww < wwidth ) bigScreenScale *= wwidth / ww;
			// Good de-bug: c ccc( conf.bigScreenScaleThreshold + ' wwidth=' + wwidth + ' bigScreenScale=' + bigScreenScale );		

			graph.lensTransformation.reset(
			{
				conf3D : { scale : bigScreenScale }
			});
			
			
			if( fixedToAbsolutePatch )
			{
				//.	This is an ugly fix for inability of some mobiles to handle "fixed" positioning.
				//	But it causes flicker in IE9,10.
				canvas_wrap_jq.css( { top : window_minus_doc, height : wheight } );
			}
		};



		var digestPositions = function ()
		{
			//:	Detects offsets
			var window_minus_doc		= $(document).scrollTop();
			var wheight					= $(window).height();
			var wwidth					= Math.floor( $(window).width() );

			//.	This is an ugly fix for inability of some mobiles to handle "fixed" positioning
			//	No success: flicker: canvas_wrap_jq.css( 'top', window_minus_doc );

			//:	TODM don't do this every time. But do at landing, bs image download delay.
			//: Does recenter background image
			var canvasBgImWidth			= wwidth;
			canvasBgIm_jq.css(			'width', canvasBgImWidth );

			if( canvasHeightToWidth )
			{
				if( canvasHeightToWidth > 0 )
				{
					var canvasBgImHeight	= canvasHeightToWidth * wwidth;
				}else{
					var canvasBgImHeight	= wheight;
				}
				canvasBgIm_jq.css( 'height', canvasBgImHeight );
 			}

			//.	Possibly good place
			//	graph.lensTransformation.reset( { setAbsPosZ : true, posZ : -scrollee_minus_window * 0.25 } );

		};
		// \\// digestPositions ////////////////////////////////////////////////



		var throttledDigest = btb$.throttledCallback( digestPositions );
		var throttledCanvas = btb$.throttledCallback( repositionCanvasNavigation );


		//:	TODM Messy. Too many calls.
		$(window).resize(	throttledDigest );
		$(window).resize(	throttledCanvas );
		//$(document).scroll(	throttledDigest );
		//$(document).scroll(	repositionCanvasNavigation );
		digestPositions();
		repositionCanvasNavigation();

		graph.beforeit_init_afterit( graph.priority_3D_navigator );

	}; //	var run_main = function () {


}) ();
