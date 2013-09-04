
//	//\\//	Part of page-scenario running in each project



( function () {


	var	btb		= window.btb$		= window.btb$			|| {};		
	var	graph	= btb.graph			= btb.graph				|| {};
	var	conf	= graph.conf		= graph.conf			|| {};

	graph.beforeit_init_afterit = function( app_3D_navigator_, wforegrounds_ )
	{


		//:	Good but overkill
		// var ww;
		// var menu_jq					= ( ww = $( '#menu'			) )	&& ww[ 0 ] && ww;

		var menu_jq					= $( '#menu'			);
		var scrollee_jq				= $( '#scrollee'		);
		var canvas_wrap_jq			= $( '#canvas_wrap'		);
		var canvasBgIm_jq			= $( '#canvasBgIm'		);

		var canvas_jq			= $( '#canvas' );
		var canvas				= graph.canvas = canvas_jq[0];
		graph.master_context	= canvas && canvas.getContext && canvas.getContext( '2d' );

		if( conf.cBgColor && graph.master_context ) canvas_jq.css( 'background-color', conf.cBgColor );

		graph.dom					= graph.dom || {};
		graph.dom.canvasBgIm_jq		= canvasBgIm_jq;

		//.	... some mobiles "break" on fixed style positioning, but for
		//		short pages we don't patch this
		//	var fixedToAbsolutePatch	= btb.browser.mobile;	

		graph.init( app_3D_navigator_, wforegrounds_ );



		//	//\\	Finalizes visibilities, opacity, animates.
		//			TODM: These are still unreliable if images load delay or other delays.

		if( !conf.doSplashOnImgLoad )
		{
				menu_jq.css( 'opacity', 0 );
				menu_jq.css( 'visibility', 'visible' );
				$( '#img_menu_selector' ).css( { visibility : 'visible' } );
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
					$( '#canvas_wrap' ).css( 'display', 'block' );
					canvas_wrap_jq.css( 'visibility', 'visible' );
					//canvas_jq.css( 'display', 'block' );
				}
				$( '#canvas_wrap' ).css( 'display', 'block' );
				$( '#canvas_wrap' ).css( 'visibility', 'visible' );
		}
		// c ccc( 'rebuilt' );
		//	\\//	Finalizes visibilities, opacity, animates






		///	Sets bg-image in synch with canvas css-dimensions
		//	Enables animation resetting at window.onresize
		//	Does this AFTER initial animation fire-up.
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


	};
		

}) ();
