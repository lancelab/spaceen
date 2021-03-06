
//	//\\//	Sets tasks for "window.onload" equivalent.
//			Immediately loads captured data pointed in query by ...&captured=FileBody....
//			jQuery must be already loaded when adding this file via script-tag to html-page.




( function ( $ ) {


	var	btb				= window.btb$		= window.btb$			|| {};		
	var jfon			= btb.jfon			= btb.jfon				|| {};
	var	graph			= btb.graph			= btb.graph				|| {};
	var conf			= graph.conf		= graph.conf			|| {};
	var debby			= btb.debby			= btb.debby				|| {};
	var	domjq			= graph.domjq		= graph.domjq			|| {};
	var ifdeb			= btb.ifdeb;

	var qKeyPars		= btb.getQueryKeyPairs( 'integrify' );

	//.	Fails in IE9
	//	var onload_original = window.onload;
	//	window.onload = function ()
	// 		if( onload_original ) onload_original();
	//	help: http://stackoverflow.com/questions/12814387/backbone-requirejs-jquery-window-load-not-working-at-all
	//	dome ready: http://requirejs.org/docs/api.html#pageload





	$( function () {

		if( /d/.test( debby.core ) ) btb.deb( btb.detected );




		//	//\\	PREPARES DOM-ELEMENTS	//////////////////////////////////////////

		var btbSuff = 'btb';

		///	Disables elements
		var ww = [ 'canvasFgIm', 'java-script-disabled', 'content', 'scrollee', 'menu' ];
		//.. in CSS: 'canvasBgIm2' 
		for( var ii = 0; ii < ww.length; ii++)
		{
			var wId = ww[ ii ] + '-' + btbSuff;
			var wEl = document.getElementById( wId );
			if( wEl ) wEl.style.visibility = 'hidden';
		}	

		//.	does enumerate dom-elements of interest
		var ww =
		[	'scrollee', 'menu', 'img_menu_selector', 'canvas_wrap', 'canvasBgIm',
			'content', 'canvas', 'img_menu_selector'
		];
		for( var ii = 0; ii < ww.length; ii++)
		{
			var wId			= ww[ ii ];
			var wSuff		= wId + '-' + btbSuff
			domjq [ wId ] = $( '#' + wSuff );
		}
		var canvas					= graph.canvas = domjq.canvas[0];
		graph.master_context		= canvas && canvas.getContext && canvas.getContext( '2d' );

		//	\\//	PREPARES DOM-ELEMENTS	//////////////////////////////////////////








		//	//\\	FINALIZES CONFIGURATION	////////////////////////////////////////////

		//:	Assembles configuration
		var wpaste = btb.paste_non_arrays;
		//.	Overrides generic_conf with conf
		wpaste( graph.conf, wpaste( graph.generic_conf, graph.conf ) );
		//.	External conf overrides internal
		if( graph.capturer && graph.capturer.conf )
		{
			wpaste( graph.conf, btb.fromJFON( graph.capturer.conf ) );
			delete graph.capturer.conf;
			graph.confRestoredFromCaptured = true;
		}

		//	//\\	Cleans up server's properties and pastes query
		//:	Deletes keys with s_
		var www = {};
		btb.each( qKeyPars, function ( key, value ) {
			if( key.indexOf( 's_' ) === 0 ) www[ key ] = key;
		});
		btb.each( www, function ( key, value ) {
			delete qKeyPars[ key ];
		});
		//.	Query-conf overrides all configs
		wpaste( graph.conf, qKeyPars );
		//	Premature print: do after init of sprites: if( /c/.test( debby.core ) ) btb.deb( graph.conf );

		///	TRANSITIONAL patches
		if( graph.conf.toggle_draw_on_click || graph.conf.toggle_draw_on_click === 0 )
		{
			graph.conf.stop_on_click = graph.conf.toggle_draw_on_click;
		}

		//.	Must run this before using conf.
		graph.spawn_config( graph.conf );

		//.	to add functions to this variable, but not to conf.
		var confImgToLoad = btb.paste_non_arrays( {}, conf.imagesToLoad );

		//	\\//	Cleans up server's properties and pastes query
		//	\\//	FINALIZES CONFIGURATION	////////////////////////////////////////////







		//	//\\	POSSIBLY OBSOLETE	//////////////////////////////////////////////////

		//:	Fixes browser's quirks ... some mobiles "break" on fixed style positioning ...
		// var ww							= $( '#canvas_wrap' );
		// if( ww && btb.browser.mobile )	ww.css( 'position', 'absolute' );
		//	\\//	POSSIBLY OBSOLETE	//////////////////////////////////////////////////








		//	//\\	IMAGE-GROUP LOADING INITIATION	//////////////////////////////////////////

		//... Example of how to setup image-load and declipifying. see js.doc

		if( !conf.doSplashOnImgLoad )
		{
			var endOfImgLoadCallback = null;

		}else{

			var endOfImgLoadCallback = function()
			{

				ifdeb( 'onload-img splash-scenario began' );

				var can_jq		= domjq.canvas_wrap;
				var men_jq		= domjq.menu;
				var scrollee_jq	= domjq.scrollee;
				var content_jq	= domjq.content;

				if( conf.landingSplashDuration )
				{
					//: This apparently changes units for height from % to px; Non-controlled-feature of jq?
					can_jq.css( 'opacity', 0 );
					can_jq.animate({ opacity : 1 }, conf.landingSplashDuration );

					men_jq.css( 'opacity', 0 );
					men_jq.animate({ opacity : 1 }, conf.landingSplashDuration );

					scrollee_jq.css( 'opacity', 0 );
					scrollee_jq.animate({ opacity : 1 }, conf.landingSplashDuration );

					ifdeb( 'splash-animation began' );
				}

				can_jq.css( 		'display', 'block' );
				can_jq.css( 		'visibility', 'visible' );
				men_jq.css(			'visibility', 'visible' );
				content_jq.css(		'visibility', 'visible' );
				scrollee_jq.css(	'visibility', 'visible' );
				domjq.img_menu_selector.css( 'visibility', 'visible' );
				men_jq.css(			'display', 'block' );
				scrollee_jq.css(	'display', 'block' );

				//:	Hides loading message
				graph.removeLoadingMsg ();

				ifdeb( 'onload-img splash-scenario completed' );

			};
		}	

		///	initiates loading of image-groups
		graph.load_images.groupsLoader.run( confImgToLoad, function () {

			ifdeb( "Notified to onload: all image groups are loaded" );
			if( endOfImgLoadCallback ) endOfImgLoadCallback();
		});

		//:	sets waitings in case some img-group-loading initiated
		var wWait						= !!graph.load_images.groupsLoader.loadsN;
  		graph.animatorWaitsForImgLoad	= conf.animatorWaitsForImgLoad && wWait;
  		graph.sceneRunnerWaitsForImg	= conf.sceneRunnerWaitsForImg && wWait;

		//	\\//	IMAGE GROUP LOADING INITIATION	//////////////////////////////////////////









		//	//\\	CALLS SCENARIO FROM SUBAPP	//////////////////////////////////////////
		graph.scenario.run();
		//	\\//	CALLS SCENARIO FROM SUBAPP	//////////////////////////////////////////








		//	//\\	POST-INITIATION WORKS	//////////////////////////////////////////

		if( ( !graph.animatorWaitsForImgLoad && !graph.sceneRunnerWaitsForImg && !conf.doSplashOnImgLoad ) || !conf.keepLoadingMsgTillImgLoad )
		{
			//:	Hides loading message
			graph.removeLoadingMsg ();
		}else{
			ifdeb( '"loading ... " warning will be removed later ' );
		}

		//.	Sets event to capture data
		btb.bindEvents (
			'keydown',
			document.body,
			function ( arg )
			{
				///	Sets keyboard keys combination to capture:
				if( arg.event.ctrlKey )
				{
					if( arg.keyName === 'g' && arg.event.shiftKey )
					{
						graph.capturer.capture( 'save config' );
						return false;
					}else if( arg.keyName === 'g' ) {
						graph.capturer.capture( 'show config' );
						return false;
					}else if( arg.keyName === 'e' ) {
						graph.capturer.capture( 'save picture' );
						return false;
					}
				}
				return true;
			}
		);

		if( /D/.test( debby.core ) ) btb.saveObjectToServer( 'detected', btb.detected );
		btb.ifdeb( 'doc ready fired' );

		//	\\//	POST-INITIATION WORKS	//////////////////////////////////////////


	}); // 	$( function () {





	//	//\\	LOADS CAPTURED DATA BEFORE wnidow.onload EVENT	//////////////////////////////////////////
	( function () {
		if( qKeyPars.captured )
		{
			var script		= document.createElement( 'script' );
			script.type		= 'text/javascript';
			script.async	= false;
			script.src		= 'js/captured' + qKeyPars.captured + '.js';

			//.	Cleans up no longer usefull property to avoid its capturing
			delete qKeyPars.captured

			//:	Google way:
			var ss = document.getElementsByTagName( 'script' )[ 0 ];
			ss.parentNode.insertBefore( script, ss );

			//.	Assumes current position is a header, which is hard to remember
			//	document.header.appendChild( script );
		}
	}) ();
	//	\\//	LOADS CAPTURED DATA BEFORE wnidow.onload EVENT	//////////////////////////////////////////



}) ( jQuery );
