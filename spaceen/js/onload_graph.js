
//	//\\//	Sets tasks for "window.onload" equivalent.
//			jQuery must be already loaded when adding this file via script-tag to html-page.





( function () {


	var	btb		= window.btb$		= window.btb$			|| {};		
	var	graph	= btb.graph			= btb.graph				|| {};


	//.	Fails in IE9
	//	var onload_original = window.onload;
	//	window.onload = function ()
	// 		if( onload_original ) onload_original();
	//	help: http://stackoverflow.com/questions/12814387/backbone-requirejs-jquery-window-load-not-working-at-all
	//	dome ready: http://requirejs.org/docs/api.html#pageload

	$( function () {


		//.	Removes js warning
		var warning = document.getElementById( 'java-script-disabled' );
		if( warning ) warning.style.display = 'none';	


		// //\\ Reformats section text /////////////////////////////////////////////////
		//		For lazy content maintainers, who dislikes putting <br> instead of \n
		var convert_pre2html = false;

		if( convert_pre2html )
		{
			$( 'div.section' ).each( function ( ix, section ) {

				section.innerHTML =	section.innerHTML.replace( 
									/\n\t\t/g,
									"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" ).replace(
									/\n\t/g, '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' ).replace( 
									/\n/g, '<br>'
				); 
			});
		}
		// \\// Reformats section text /////////////////////////////////////////////////





		//:	Assembles configuration
		var conf = graph.conf;
		btb.pasteNonArrayClonedTree( conf, btb.getQueryKeyPairs( 'integrify' ) );

		

		//:	Fixes browser's quirks ... some mobiles "break" on fixed style positioning ...
		var ww							= $( '#canvas_wrap' );
		if( ww && btb.browser.mobile )	ww.css( 'position', 'absolute' );



		graph.scenario.run();


		//:	Hides loading message
		var ww = document.getElementById( 'loading-wrap' );
		if( ww ) ww.style.display = 'none';

		btb.ifdeb( 'doc ready fired' );

	}); // 	$( function () {


}) ();
