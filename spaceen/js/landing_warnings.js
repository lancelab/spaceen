

//	//\\//	Immediately removes/adds warnings about features enabled in this browser.



( function () {


	var	btb		= window.btb$		= window.btb$			|| {};		
	var	graph	= btb.graph			= btb.graph				|| {};



	graph.landing_warnings = function ()
	{

				//:	Hides dead-JS warning
				var js_test = document.getElementById( 'java-script-disabled' );
				if( js_test ) js_test.style.display = 'none';	

				//:	Tells user, stuff is loading ...
				var loading = document.getElementById( 'loading' );
				//:	Covers everything until main-js-scenario starts
				loading.style.height = parseInt( $( 'body' ).css( 'height' ) );
				loading.style.visibility = 'visible';
				//	Good: btb$.d eb( 'page is loading' );

				var ctest = document.createElement( 'canvas' );

				/// Throws non-canvas-browser warning
				if( !ctest )
				{
					//:	We have canvas-unaware browser
					var canvas_warning = document.getElementById( 'canvas_warning' );
					if( canvas_warning )
					{
						canvas_warning.style.display = 'block';
						btb$.ifdeb( 'Canvas unaware browser. Warning issued.' );
					}
					return;
				}
	};


}) ();


