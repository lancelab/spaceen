
//	//\\//			Plugin. Captures startup flyer parameters.

//					((Doc))
//					Attachement is server-based.
//					see: php: 	$captured				=	array_key_exists( 's_captured',			$_GET )	? $_GET[ 's_captured' ]		: '';
//								if( file_exists ( './js/captured.js' ) ) {
//					Enable AJAX to make URL-query-dynamic.


( function () {

		var btb				= window.btb$			= window.btb$				|| {};
		var graph			= btb.graph				= btb.graph					|| {};
		var conf			= graph.conf			= graph.conf				|| {};
		var flyerConf		= conf.cflyer			= conf.cflyer				|| {};
		var capturer		= graph.capturer		= graph.capturer			|| {};

		//.	configuration
		capturer.maxCount	= 2;

		capturer.count		= 0;


		capturer.increaseCounter = function ()
		{
			capturer.count++;
			if( capturer.count === capturer.maxCount ) btb.ifdeb( "All part of random capture-components are generated." );
		}

		///	Captures conf or canvas.
		capturer.capture	= function ( action )
		{
			if( !action ) return;

			//.	config is not yet ready
			if( capturer.count < capturer.maxCount ) return;

			if( conf.capture ) delete conf.capture;

			var ww = new Date();
			var timeStamp = ww.getHours() + '-' + ww.getMinutes() + '-' + ww.getSeconds() + '-' + ww.getMilliseconds();
			var url = 'capturer.php?command=' + ( action === 'save picture' ? 'picture' : 'conf' ) + '&stamp=' + timeStamp

			if( action === 'show config' || action === 'save config' )
			{
				var confJSONED = JSON.stringify( conf, null, '\t');
				var confTxt = header + "graph.capturer.conf = \n" + confJSONED + ";\n" + footer;
				if( action === 'show config' )
				{
					// c ccc( 'fired: ' + action + ' ' + capturer.count + ', ' + capturer.maxCount );
					btb.reuseDebugWindow( confTxt, '' );
				}else if( action === 'save config' ) {
					// c ccc( 'fired: ' + action + ' ' + capturer.count + ', ' + capturer.maxCount );
					btb.saveTextToServer( url, confTxt );
				}
			}else if( action === 'save picture' ) {
				try {
					// c ccc( 'fired: ' + action + ' ' + capturer.count + ', ' + capturer.maxCount );
					var canvasBase64 = canvas.toDataURL( "image/png" );
					btb.saveTextToServer( url, canvasBase64 );
				}catch ( error ) {
					btb.ifdeb(	'failed doing toDataURL ' +
								( typeof error === 'object' && error !== null ? error.message : '' + error )
					);	
				}
			}
			
		};
		

		var header =
			"\n\n( function () {\n" +
			"		var btb				= window.btb$			= window.btb$				|| {};\n" +
			"		var graph			= btb.graph				= btb.graph					|| {};\n" +
			"		var conf			= graph.conf			= graph.conf				|| {};\n" +
			"		var capturer		= graph.capturer		= graph.capturer			|| {};\n" +
			"\n";
		;

		var footer =
			"\n" +
			"btb.paste_non_arrays( conf, graph.capturer.conf );\n" +
			"}) ();\n";


}) ();

