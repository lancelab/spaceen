
//	//\\//	====================================================================================
//
//	This is:		Light-weight "home-made" debugger.
//
//	Purpose:		1.	when
//					       no console,
//					       no Firebug, no other debugger, and
//					       the code is already on productin server ....
//					       any require.js performance is not clear in IE8 environment ...	
//
//					2.	timestamps are needed to timeline events ... 
//					3.	messages came before <body> were created must be stashed and
//						displayed later on <body>
//
//	Dependencies:	None.
//	For:			License, Copyright, WebSite, Contact, see enclosing btb.
//
//	Pollutes:		global namespace with btb$ and possibly with
//					window.cccc in btb$.non-production mode
//	Risk:			btb$.deb has a risk. It uses both console.log and deb, but existence of 
//					console.log can be misdetected and console.log falsely called and crashed.
//
//	Usage:			Calls from inside source code:
//				  		btb$.deb( arg1, arg2, ..., argN ), btb$.debc..., 
//						btb$.debug(	ob	[, title [, debug_window_ [, debug_window_parent_
//										[, level_restriction  ] ] ] ] );
//						level_restriction - deepness of displaying ob-tree
//					
//					URL Query examples to set btb$debugflag
//							www.mysite.com?debug
//							www.mysite.com?production&debug=lrs&page
//		
//	============================================================================================





( function () {


	//.	Inserts debug into global btb$ namespace
	var btb						= window.btb$ = window.btb$ || {};

	//: Default setup
    var CALLS_LIMIT				= 1000;
	var TRUNCATE_STRING_TO		= 200000;
    var SIZE_LIMIT				= 50000;
    var LEVEL_LIMIT				= 10;
	var DEFAULT_DEBUG_WINDOW_ID	= 'tpdebug';	//CSS-id



	//	//\\	Helper functions and variables   //////////////////

	var debug_window			= null;	// Debug-console: DOM-element where debug text will be shown to user
	var collected_in_session	= '';
	var calls_count;

	///	Purpose:	generate blank string comprised with char(32) characters.
	//	Input:		length
	var INDENT = '                                                                                                           	                                                                              ';
	var space = function( length )
	{
		return INDENT.substr( 0, length );
	};

	
	///	Purpose:	apparently to add nice indent for tree nodes in deep levels
	var indentize = function( ss, length )
	{
		if( ss.length > TRUNCATE_STRING_TO )
		{
			ss = ss.substr( 0, TRUNCATE_STRING_TO ) + ' ... ';
		}
		return ss.replace( "\n", "\n" + space( length ) );
	};



	var c_onsole_log	=	!IE && window.console &&			// *** browser safe c onsole string
							typeof console !== 'undefined' &&
							console.log;						// *** browser safe c onsole.log string
	var c_onsole_clear	=	c_onsole_log && console.clear;		// *** browser safe c onsole.clear string



	//:	credit:	https://ajax.googleapis.com/ajax/libs/prototype/1.7.0.0/prototype.js
	//			(c) 2005-2010 Sam Stephenson http://www.prototypejs.org/
    var isOpera = Object.prototype.toString.call( window.opera ) == '[object Opera]';
    var IE = !!window.attachEvent && !isOpera;



	///	Gets parameter from URL query string.
	//	Returns:	true-valuatable value if exists;
	//				otherwise returns true or false
	//				depending on key's existence.
	var getQueryPar = function( key )
	{
			var ww = window.location.search;
			var re = new RegExp('(?:&|\\?)'+key+'(?:=([^&]*))*(?:&|$)');
			ww = ww.match( re );
			if( !ww ) return false;
			if( !ww[1] ) return true;
			return decodeURIComponent( ww[1] );
	};

	//	\\//	Helper functions and variables   //////////////////








	//========================================================================
	//Purpose:	creates debug_window if not yet exists
	//Input:	debug_window_ - dom object.
	//					If not supplied, ....getElementById(DEFAULT_DEBUG_WINDOW_ID) is tried.
	//					If fails, then window is generated.			
	//			debug_window_parent_ used to attach debug_window to it.
	//					If not supplied, attached to document.body
	//========================================================================
	var setup_debug_window = function( debug_window_, debug_window_parent_)
	{
		if( debug_window ) return;
        debug_window = debug_window_ || document.getElementById( DEFAULT_DEBUG_WINDOW_ID );
		if( debug_window ) return;
        if( debug_window_parent_ || document.body)
		{
            debug_window = document.createElement('div');
			debug_window.setAttribute( 'id', 'tp_debug_window' );
			debug_window.setAttribute( 'style',	'visibility:visible; opacity:0.5; position: absolute; '+
												'top: 0px; left:0px; color:#ffaaaa;'); // z-index: 900000000; ');
            var ww = debug_window_parent_ ? debug_window_parent_ : document.body;
            ww.appendChild( debug_window );
		}
	};


	///=========================================================================
    //	Purpose:	this is a workhorse of debugger. Recursively parses objects.
	//	Does:		ads timestamp
	//	How works:	collects all data parsed from object tree and adds them
	//				to "collected_in_session" string.
	//				Displays "collected_in_session" as innerHTML of console	
	//	Input:		ob - required
	//				other parameters are optional
	//===========================================================================

	//.	Collects strings constructed in recursive "debug" calls
	var rr;

    var debug = btb.debug = function( ob, title, debug_window_, debug_window_parent_, level )
	{
		level=level	|| 0;
		title=title || '';

		if( !level )
		{
			var ww = new Date();
			title=
				''  + ( ww.getHours() + 1 ) +
				':' + ( ww.getMinutes() + 1 ) +
				':' + ( ww.getSeconds() + 1 ) +
				'.' + ( ww.getMilliseconds() + 1 ) +
				' ' + title + ' ';
			calls_count = 0;
			rr = title;
		}

        if
		(
			rr.length		> SIZE_LIMIT	||
			level			> LEVEL_LIMIT	||
			++calls_count	> CALLS_LIMIT
		)	return rr;


		var tt	= ( typeof ob ); 
        var n	= "\n";
        var ii	= space( title.length );
	    if( tt === 'string' ) {
            var ss = indentize( ob, ii.length );
            rr += ss + n;
        }else if( tt === 'function') {

			//TODm parse conditionally:
			//TODm replace with beatutifier to replace indent:
            var ss = indentize( ob.toString(), ii.length );
            rr += ss + n;
        }else if( tt === 'number' ) {
            rr += ob + n;
        }else if( tt === 'boolean' ) {
            rr += ob + n;
        }else if( ob === null ) {
            rr += 'null' + n;
        }else if( tt === 'undefined' ) {
            rr += 'undefined' + n;
        }else if( tt === 'object' && ob.length  ) {

            for( var jj = 0, wwlen = ob.length; jj < wwlen; jj++ ) {
				var ww = '[' + jj + ']= ';
				rr += (j ? ii : '' ) + ww;
				debug( ob[ jj ], space( ii.length + ww.length ), null, null, level + 1 );
            }
			if( !ob.length ) rr += n;

		}else if( tt === 'object' ) {

			var pcount = 0;
			for( var pp in ob )
			{
				//	Why IE breaks here?:
                //	if(ob.hasOwnProperty(p))

                if( ob.hasOwnProperty && ob.hasOwnProperty( pp ) )
				{
					var ww = ' ' + pp + '  : ';
					rr += ( pcount ? ii : '' ) + ww;
					debug( ob[ pp ], space( ii.length + ww.length ), null, null, level + 1 );
					pcount++;
				}
            }
			//TODm add loop via __proto__
			if( !pcount.length ) rr += n;
		}

		if( level === 0 ) {

			collected_in_session += rr;
			//Should catch history before page loaded.:
			setup_debug_window( debug_window_, debug_window_parent_ );
			if( debug_window ) debug_window.innerHTML = "<pre>" + collected_in_session + "</pre>"; 
			if( c_onsole_log )
			{
				console.log( rr );						// *** browser safe c onsole.log string
			}

			//====================
			//TODm
			//fails,? why?: (c onsole && c onsole.log) || 
			//if(window.console && window.c onsole.log )c onsole.log(r);  // *** safe c onsole.log
			//====================

		}
        return rr;
    };





	//	//\\	E x t e r n a l   c a l l s

	//. Inits debug flag at object definition time.
	btb.debugflag = getQueryPar( 'debug' );

	//.	Fires "deb" by passing input to it only if debugflag is set
	btb.ifdeb = function () { if( btb.debugflag ) btb.deb.apply( this, arguments ) };


	//	Purpose:		if window.c onsole exist, debug only to it.
	//					Despite apparent usefulness of this function, it seems not very practical.
	var debc = btb.debc =
		(	c_onsole_log &&	( function () { for( var ii = 0; ii <arguments.length; ii++) console.log( arguments[ ii ] ); } )	)	||
							( function () { for( var ii = 0; ii <arguments.length; ii++) debug( arguments[ ii ] ); });



	// Purpose:			debug to both custom debugger and if exist, to console:
	// Input:			empty arguments list clears up collected_in_session and debug windows
	// Input sample:	btb$.deb( myObject, 'This is myObject', ... )
	//					the same for debc
	var deb = btb.deb = function ()
	{ 
		if( arguments.length === 0 ) {

			if( debug_window )		debug_window.innerHTML = "<pre> </pre>"; 
			if( c_onsole_clear )	console.clear();	// *** browser safe c onsole.clear string
			collected_in_session = '';
		}
		for( var ii = 0; ii < arguments.length; ii++ ) debug( arguments[ ii ] ); 
	};
	//	\\//	E x t e r n a l   c a l l s




	
	///	Adds global shortcut "cccc" of "c onsole.log" in non-production-flag mode.
	//	Production_mode usually passed from "PHP or ROR server" if any.
	if( !btb.production_mode && c_onsole_log )
	{	
		/// reduces annoying name c onsole.log to shorter
		window.cccc = function ()		// *** browser safe cc cc string
		{
			for( var ii=0; ii < arguments.length; ii++)
			{
				c_onsole_log( arguments[ ii ] );
			}
		}
	}

	return btb;

}) ();
