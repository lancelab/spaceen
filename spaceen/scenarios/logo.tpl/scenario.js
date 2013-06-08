
//	//\\//	Sets tasks for "window.onload" equivalent for scenario



( function () {


	var scenario;	// Plugin itself
	var graph;
	var conf;


	///	Attaches plugin
	( function ( name ) {
			var btb		= window.btb$		= window.btb$			|| {};		
			graph		= btb.graph			= btb.graph				|| {};
			conf		= graph.conf		= graph.conf			|| {};
			scenario	= graph[ name ]		= graph[ name ]			|| {};
	}) ( 'scenario' );






	scenario.run = function () {


		//.	... some mobiles "break" on fixed style positioning, but for
		//		short pages we don't patch this
		//	var fixedToAbsolutePatch	= btb.browser.mobile;	

		graph.init( {} );

		var canvas_wrap = $( '#canvas_wrap' );
		canvas_wrap.css( 'opacity', 0 );
		canvas_wrap.css( 'visibility', 'visible' );
		canvas_wrap.animate({ opacity : 1 }, conf.landingSplashDuration );

	}; //	var run_main = function () {


}) ();
