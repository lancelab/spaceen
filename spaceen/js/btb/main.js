
//	//\\//	Beaver Tool Belt. BTB. Light weight JavaScript framework.
//			Possibly complimentary or "replacitary" for jQuery.
//			Copyright (c) 2013 Konstantin Kirillov. License: MIT.


( function () {


		var btb = window.btb$ = window.btb$ || {};		



		///	Light weight iterator through first-level object-nodes.
		//					If ob has length property,	assumes it is an array and iterates
		//			 						through array's indices only:
		//										non-number-convertible properties are skipped.
		//							        NOTES: undefined elements still trigger callback.
		//
		//					Otherwise,		iterates through "hasOwnProperty".
		//	Behaviour:		stops iteration at conditions (*), (**).
		//	Input:			object, callback
		btb.each = function( ob, fun )
		{
			if( typeof ob === 'object' && ob !== null ){
				var ret;
				var len=ob.length;
				if( len || len === 0 )
				{
					for(var i=0; i<len; i++)
					{
						ret = fun( i, ob[ i ] );
						if( ret !== undefined && !ret ) break; // (*)
					}
				}else{
					for( var p in ob )
					{
						if( ob.hasOwnProperty( p ) )
						{
							ret = fun( p, ob[ p ] );
							if( ret !== undefined && !ret ) break; // (**)
						}
					}
				}
			}
			return ob;
		}



		///	Throttle:	fires only once at the end of "window.onresize"
		//	Usage:		throttledCallback( callback );
		btb.throttledCallback = function ( callback_at_the_end )
		{
				var reset_delay_flag = null;


				var wrapper = function ()
				{
					reset_delay_flag = null;
					callback_at_the_end();
				};

				return ( function () {

					// good de bug: 
					// c onsole.log( 'reset_delay_flag', reset_delay_flag );

					if( reset_delay_flag !== null )
					{
						//	... see doc/info/run_graph.js
						window.clearTimeout( reset_delay_flag );
					}
					reset_delay_flag = setTimeout( wrapper, 10 );
				});


		};




	/// Possibly garbage? No IE format?
	/// Primodal event binder. Born probably before jQuery ...
	btb.bindEvent = function ( eventName, element, callback ) 
	{
		if ( element.addEventListener )
		{
			element.addEventListener( eventName, callback, false );

		}else if ( element.attachEvent ) {

			elem.attachEvent( "on" + eventName, callback );
		}
	};



	///	Pastes:		own properties of obj2, obj3, ... to wall
	//				Objects/arrays pasted by ref.
	//				Array -> Object paste does not change Object to Array.
	//
	//	Input:		wall, obj2, obj3, ... - all are optional,
	//				non-objects are skipped,
	//				falseful arguments are skipped,
	//				if all skipped, returns {}.
	//
	//	Returns:	wall
	//
	btb.pasteRef = function ()
	{
		var wall = arguments[ 0 ] || {};
		for( var ii = 1, len = arguments.length; ii < len; ii++ )
		{
			var ob = arguments[ ii ];
			if( !ob || typeof ob !== 'object' ) continue;

			//: Overrides settings if any
			for( var pp in ob )
			{
				if( ob.hasOwnProperty( pp ) )
				{
					wall[ pp ] = ob[ pp ];
				}
			}
		}
		return wall;
	};

	///	Pastes:		sequence of trees recursively
	//				Array -> Object paste does not change Object to Array.
	//
	//	Input:		wall, obj2, obj3, ... - all are optional,
	//				non-objects-in-sequence are skipped,
	//				falseful arguments are skipped,
	//				if all skipped, returns {}.
	//
	//	Returns:	wall
	//
	var pasteNonArrayClonedTree = btb.pasteNonArrayClonedTree = function ()
	{
		var wall = arguments[ 0 ] || {};
		for( var ii = 1, len = arguments.length; ii < len; ii++ )
		{
			var ob = arguments[ ii ];
			if( !ob || typeof ob !== 'object' ) continue;

			//: Overrides settings if any
			for( var pp in ob )
			{
				if( ob.hasOwnProperty( pp ) )
				{
					var value = ob[ pp ];
					var wall_value = wall[ pp ];
					if( typeof value === 'object' && value !== null )
					{
						if( typeof wall_value === 'object' && wall_value !== null )
						{
							pasteNonArrayClonedTree( wall_value, value );
						}else{
							//.	Clones
							wall[ pp ] = pasteNonArrayClonedTree( {}, value );
							//.	Pastes references
							//	wall[ pp ] = value;
						}
					}else{
						wall[ pp ] = value;
					}
				}
			}
		}
		return wall;
	};



	btb.userAgent = navigator.userAgent;


	///=====================================================================================
	//	Browser detection.
	//	We heard a lot about functional detection.
	//	But if buggy browser's image "jerks" when scrolling ... how we will detect this?
	//	... and how much time we spend to find "quantative measure" ...
	//	Apparently, jQuery phases out this feature, which is still irreplaceable ...
	//	... so we adding it here ...
	//	TODm possibly outdated.
	//	Sets core.browser.IE to truthful/falsness, and so on ...
	//	Usage: 	For IE, Mozilla, AppleWebKit, WebKit, Chrome, Gecko:
	//			like this:	if(tp.core.browser.IE),
	//						then tp.core.browser.IE[1] contains a version.
	//======================================================================================
	btb.browser = ( function () {

		    var isOpera =	Object.prototype.toString.call( window.opera ) === '[object Opera]';
			var ua = btb.userAgent;
			var ret =
			{
				//IE			: !!window.attachEvent && !isOpera, //prototype style detection
				IE				: !isOpera && ua.match(/msie\s*([0-9.]*)/i),
				Mozilla			: ua.match(/mozilla.*rv:([0-9.]*)/i),
				FireFox			: ua.match(/FireFox\/([0-9.]*)/i),
				AppleWebKit		: ua.match(/AppleWebKit\/([0-9.]*)/i),
				WebKit			: ua.match(/WebKit\/([0-9.]*)/i),
				Chrome			: ua.match(/chrome\/([0-9.]*)/i),
				Gecko			: (ua.indexOf('KHTML') === -1) && ua.match(/Gecko\/([0-9.]*)/i),
				Safari			: ua.match(/Safari\/([0-9.]*)/i),
				MobileSafari	: ua.match(/Apple.*Mobile/),
				Opera			: isOpera
   			};

			///	Converts IE version to an integer
			if( ret.IE )
			{
				var ww = parseInt( ret.IE[1] );
				if( isNaN( ww ) ) ww = 0;
				ret.IE[1] = ww;
			}

			///	Detects mobile.	TODM do better.
			if( 
				!( 
					ret.IE				||
					ret.Mozilla			||
					ret.FireFox			||
					ret.AppleWebKit		||
					ret.WebKit			||
					ret.Chrome			||
					ret.Gecko			||
					ret.Safari			||
					ret.Opera
				)	|| 	ret.MobileSafari
			)
			{
				ret.mobile = true;
			}

			return ret;


	}) ();




	///	Purpose:	URI-decodes a value.
	//	Input:		integerify - opt. Converts string to integer.
	var convert_URI_Value = function ( value, numerify )
	{
		var value = decodeURIComponent( value );
		if( numerify === 'i' ) // integerify
		{
			if( !isNaN( value ) ) value = Math.floor( parseInt( value ) );
		}else if( numerify === 'f' ) { // floatify
			if( !isNaN( value ) ) value = parseFloat( value );
		}
		return value;
	};



	///	Converts:	URL-query string [?]key1=val1&key2~val2 .... to
	//				{ ... key : vala, .... } object.
	//				"~" does flag float value.
	//				keys without "=value" assigned value JS-constant true
	//	Input:		integerify - optoinal; if given, integerifies all numeric parameters.
	//	Returns:	{} if nothing detected
	btb.getQueryKeyPairs = function( integerify )
	{
		//. Parenthesises are because gedit does not like "* /"
		var ww = window.location.search.replace( /^(\s*)/, '' );
		if( ww.charAt(0) === '?' )
		{
			ww = ww.substr(1);
		}
		if( !ww || ww.length === 0 ) return null;
		var splitted = ww.split( '&' );
		var pairs = {};
		for( var ii = 0; ii < splitted.length; ii++ )
		{
			var token = splitted[ ii ];
			if( token === '' ) continue;
			var pair = token.split( '=' );
			var numerify = integerify ? 'i' : '';
			if( pair.length === 1 )
			{
				var pair = token.split( '~' );
				if( pair.length === 1 )
				{
					pairs[ token ] = true;
					continue;
				}else{
					//.	Normalizes for propertifier
					token = token.replace( '~', '=' );
					var numerify = 'f';
				}
			}
			btb.propertify( pairs, token, convert_URI_Value, numerify );
			//pairs[ pair[ 0 ] ] = value;
		}
		return pairs;
	};



	/// Acts:		extends object's property-tree and assigns value to a leaf-property
	//	Usage:		propertify( conf, 'startup.items=4' ) assigns
	//				conf.startup.items = "4" even "starup" initially does not exist.
	//	Input:		obj - top object
	//				No '.' and '=' is allowed in tokens and in a value.
	//				converter - opt. Is a function to convert: see: (*).
	//				numerify - opt. Parameter for converter
	btb.propertify = function ( obj, string, converter, numerify )
	{
		if( !obj || typeof obj !== 'object' ) return;
		var parts	= string.split( '=' );
		if( parts.length < 2 ) return;
		value		= parts[1];
		var tokens	= parts[0].split( '.' );
		var len		= tokens.length;
		var len1	= len - 1;
		if( len1 < 0 ) return;
		var prop	= tokens[ 0 ];

		for( var ii = 0; ii < len1; ii++ )
		{
			//:: appends objects if missed
			if( !obj[ prop ] || typeof obj[ prop ] !== 'object' ) obj[ prop ] = {};
			obj = obj[ prop ];
			var prop = tokens[ ii + 1 ];
		}
		obj[ prop ] = converter ? converter( value, numerify ) : value;	// (*)
	};



}) ();

