
//	//\\//	Part of subapp-page-scenario



( function () {


	var	btb		= window.btb$		= window.btb$			|| {};		
	var	graph	= btb.graph			= btb.graph				|| {};
	var	conf	= graph.conf		= graph.conf			|| {};
	var	domjq	= graph.domjq		= graph.domjq			|| {};
	var	dom		= graph.dom			= graph.dom				|| {};


	graph.beforeit_init_afterit = function( app_3D_navigator_, wforegrounds_, do_display_content )
	{




		//	//\\	BEFORE IT	////////////////////////////////////////////////////////////////////

		//:	Good but overkill
		// var ww;
		// var menu_jq					= ( ww = $( '#menu'			) )	&& ww[ 0 ] && ww;
		var menu_jq					= domjq.menu;
		var scrollee_jq				= domjq.scrollee;
		var canvas_wrap_jq			= domjq.canvas_wrap;
		var canvasBgIm_jq			= domjq.canvasBgIm;
		var canvas_jq				= domjq.canvas;
		var canvas					= graph.canvas;

		if( conf.cBgColor && graph.master_context ) canvas_jq.css( 'background-color', conf.cBgColor );

		//.	... some mobiles "break" on fixed style positioning, but for
		//		short pages we don't patch this
		//	var fixedToAbsolutePatch	= btb.browser.mobile;	
		//	\\//	BEFORE IT	////////////////////////////////////////////////////////////////////






		//	//\\	IN IT	////////////////////////////////////////////////////////////////////
		graph.init( app_3D_navigator_, wforegrounds_ );
		//	\\//	IN IT	////////////////////////////////////////////////////////////////////





		//	//\\	AFTER IT	////////////////////////////////////////////////////////////////////
		//	//\\	Finalizes visibilities, opacity, animates.
		//			TODM: These are still unreliable if images load delay or other delays.

		if( !conf.doSplashOnImgLoad )
		{
				menu_jq.css( 'opacity', 0 );
				menu_jq.css( 'visibility', 'visible' );
				domjq.img_menu_selector.css( { visibility : 'visible' } );
				menu_jq.animate({ opacity : 1 }, conf.landingSplashDuration );

				scrollee_jq.css( 'opacity', 0 );
				scrollee_jq.css( 'visibility', 'visible' );
				scrollee_jq.animate({ opacity : 1 }, conf.landingSplashDuration );

				if( conf.landingSplashDuration )
				{
					// c ccc( 'rcc1: canvas-css width/height=' + $( canvas ).css( 'width' ) + '/' + $( canvas ).css( 'height' ) );
					// c ccc( 'rcc: fgImg width/height=' + $( '#canvasFgIm' ).css( 'width' ) + '/' + $( '#canvasFgIm' ).css( 'height' ) );
					//: This apparently changes units for height from % to px; Non-controlled-feature of jq?
					canvas_wrap_jq.css( 'opacity', 0 );
					canvas_wrap_jq.animate({ opacity : 1 }, conf.landingSplashDuration );
					// $( '#canvas_wrap' ).css( 'display', 'block' );
					// canvas_wrap_jq.css( 'visibility', 'visible' );
					// canvas_jq.css( 'display', 'block' );
				}
				canvas_wrap_jq.css( 'display', 'block' );
				canvas_wrap_jq.css( 'visibility', 'visible' );
				domjq.content.css( 'visibility', 'visible' );
				if( do_display_content ) domjq.content.css( 'display', 'block' );
		}
		// c ccc( 'rebuilt' );
		//	\\//	Finalizes visibilities, opacity, animates






		///	Sets bg-image in synch with canvas css-dimensions
		//	Enables animation resetting at window.onresize
		if( conf.underCanvasInSync && canvasBgIm_jq )
		{
			if( graph.master_context )
			{
				var synchronizeBgImg = function ()
				{
					var width = canvas_jq.width();
					var height = canvas_jq.height();
					canvasBgIm_jq.css( 'width', width );
					canvasBgIm_jq.css( 'height', height );
				};

				synchronizeBgImg();

				/// Handles destructive events like "window.onresize"
				var throttledResize = btb.throttledCallback( synchronizeBgImg );
				btb.bindEvents( 'resize',  window, throttledResize );

			}

		}
		//	\\//	AFTER IT	////////////////////////////////////////////////////////////////////


	};
		

}) ();
