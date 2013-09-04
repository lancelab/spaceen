
//	//\\//	Beaver Tool Belt. BTB. Light weight JavaScript framework.
//			Possibly complimentary or "replacitary" for jQuery.
//			Copyright (c) 2013 Konstantin Kirillov. License: MIT.


( function () {


	var btb = window.btb$ = window.btb$ || {};		

	btb.effective_hostname = window.location.hostname.toLowerCase(); // mydomain.com
	btb.effective_hostname_without_www = btb.effective_hostname.replace( /^www\./, '' );





	//	//\\	Detections ///////////////////////////


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



	///	Detects mobile and screen capability
	//	http://stackoverflow.com/questions/8430890/mobile-detection-and-supporting-older-devices?rq=1

	( function () {

		var det = btb.detected = {};

		//	TODM improve later
		btb.detected.mobile =	navigator.userAgent.match( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i );
		btb.detected.userAgent = navigator.userAgent;

	    var dpr = 1;
	    if(	window.devicePixelRatio !== undefined ) dpr = det.dpr = window.devicePixelRatio;

		//	Canvas storage?
		///	If detection is not yet privided, do it now
		if( !btb.canvasEnabled )
		{
			var canvas			= document.createElement( 'canvas' );
			btb.canvasEnabled	= canvas && canvas.getContext && canvas.getContext( '2d' ) && canvas;
		}
		if( btb.canvasEnabled )
		{
			
			var ctx = btb.canvasEnabled.getContext( '2d' );
			var bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;
			btb.detected.canvas_bsr = bsr;
		}else{
			btb.detected.canvas_bsr = null;
		}
		btb.detected.canvasWorks = !!btb.canvasEnabled;


		//	https://developer.mozilla.org/en-US/docs/Web/API/window.outerWidth
		det.outerWidth			= window.outerWidth;
	    det.outerHeight			= window.outerHeight;
		det.innerWidth			= window.innerWidth;
		det.innerHeight			= window.innerHeight;
		det.outerWidthByDpr		= det.outerWidth / dpr;
	    det.outerHeightByDpr	= det.outerHeight / dpr;
		det.innerWidthByDpr		= det.innerWidth / dpr;
		det.innerHeightByDpr	= det.innerHeight / dpr;


		// https://developer.mozilla.org/en-US/docs/Web/API/window.screen
	    var width			= screen.width;
	    var height			= screen.height;
		det.screenWidth		= width;
		det.screenHeight	= height;
	    det.screenDiagonal	= Math.sqrt( width * width + height * height );
		det.screenVolume	= width * height;
		var wratio			= 2;
		det.screenSide		= Math.sqrt( det.screenVolume / wratio );
		det.scrMinSide		= Math.min( width, height );
	}) ();

	//	\\//	Detections ///////////////////////////




























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
					var hasOwn	= Object.prototype.hasOwnProperty;
					for( var p in ob )
					{
						if( hasOwn.call( ob, p ) ) // if( ob.hasOwnProperty( p ) )
						{
							ret = fun( p, ob[ p ] );
							if( ret !== undefined && !ret ) break; // (**)
						}
					}
				}
			}
			return ob;
		}



		///	Throttle:	fires only once at the "end" of "window.onresize";
		//	Input:		delay - how much time throttle will wait;
		//	Usage:		throttledCallback( callback [, delay] );
		var throttleIdGenerator = 0;	// for debug
		btb.throttledCallback = function ( callback_at_the_end, delay )
		{
				var throttleId = throttleIdGenerator;
				throttleIdGenerator++;
				var toFlag = null;
				delay = delay || 10;

				var wrapper = function ()
				{
					toFlag = null;
					callback_at_the_end();
					// btb.d eb( ' throttle ' + throttleId +' COMPLETED. toFlag=' + toFlag );
				};

				//	TODM Add functionality:
				//	var callee = function ...
				//	callee.addMoreCallbacks = function ( callback ) {
				//		var former = callback_at_the_end;
				//		callback_at_the_end = function() {
				//				former();
				//				callback();
				//		};
				//	};

				return ( function () {

					//:	good de bug:
					// btb.d eb( ' throttle ' + throttleId +' callbacked. toFlag=' + toFlag );

					if( toFlag !== null )
					{
						//	... see doc/info/run_graph.js
						window.clearTimeout( toFlag );
						// btb.d eb( ' throttle ' + throttleId +' delayed. toFlag=' + toFlag );
					}
					toFlag = setTimeout( wrapper, delay );
				});


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
	//	Usage:		Example: newWall = pasteRef( wall, paper ); pasteRef( wall, paper );
	//
	btb.pasteRef = function ()
	{
		var wall	= arguments[ 0 ] || {};
		var hasOwn	= Object.prototype.hasOwnProperty;
		for( var ii = 1, len = arguments.length; ii < len; ii++ )
		{
			var ob = arguments[ ii ];
			if( !ob || typeof ob !== 'object' ) continue;

			//: Overrides settings if any
			for( var pp in ob )
			{
				if( hasOwn.call( ob, pp ) ) // ob.hasOwnProperty( pp ) )
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
			var hasOwn	= Object.prototype.hasOwnProperty;
			for( var pp in ob )
			{
				if( hasOwn.call( ob, pp ) ) // if( ob.hasOwnProperty( pp ) )
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



		///	Purpose:		Cloning object trees by value till refdepth.
		//					"All existing properties at and below refdepth become common
		//					for operands and result".
		//	Detais:			Makes wall a correct paste of paper when
		//						both wall and paper do not have arrays in their trees till (refdepth+1);
		//					otherwise, ( "arrayflict" case)
		//						non-array obj.W can be overriden with array [] and with A which may
		//						break outside reference w = obj.W which still points to the former W.
		//					Infinite recursion is not protected except by using recdepth.
		//	Comparision:	of arrayflicts with jQuery.extend
		//						wall = {...} paper [...]
		//							in jQuery - this is an obligation of programmer to make wall [...]
		//							in tp	-	wall is brutally replaced with []. Not extended,  //TODM possibly fix
		//										but return result is correct possibly except numerics in wall_preserved.
		//						in deeper levels of arrayflict
		//							in jQuery	- new [] is generated
		//							in tp		- new [] is generated
		//							in jQuery	- numeric and non-numeric properties of wall.....non-arr are "killed"
		//							in tp		- numeric and non-numeric properties of wall.....non-arr are preserved
		//					in jQuery	- all prototype levels are copied
		//					in tp		- only ownProperties are copied
		//					in jQuery	- only two options "deep copy" or "not deep"
		//					in tp		- reference deepness can be controlled
		//							
		//	Input:			All args are optional.
		//					skip_undefined	- omitting it allows copying "wall <- paper.undefined".
		//					recdepth		- stops recursion at level > recdepth

		//					do_wrap_function converts functions to string ( usually used for JSON transport )
		//						example: { x : function() { F... }, y : function () { G... }, fun : data }
		//							converts to
		//						{ fun : [ { x : "function () ... ", y : "function () { G ...} ] }, data ] }
		//						ambiguity fun : moo
		//							is indicated by length === 2 of array next to fun :

		//	Results in:		changed wall properties.
		//	Returns:		combined clone of paper to wall.
		var paste_non_arrays = btb.paste_non_arrays = function ( wall, paper, level, skip_undefined, refdepth, recdepth, do_wrap_function )
		{

			level = level || 0;

			// TODm slow?:
			var t = typeof paper;

			// if( deb ) deb( 'Entered: paper-type=' + t + '. Level = ' + level + '.' );

			// On top level, pasting nothing does not change wall:
			if( !level && (t === 'undefined' || paper === null ) ) return wall;

			if( t === 'undefined' || t === 'string' || t === 'boolean' || t === 'number' || t === 'function' || paper === null)
			{
				// if( deb ) deb( 'Paper is a plain value with type='+t+'. Returning paper.' );
				return paper;
			}

			//.	TODM slow
			if( refdepth || refdepth === 0 )
			{
				if( level > refdepth ) return paper;
			}

			//.	TODM slow
			if( ( recdepth || recdepth ===0 ) && level > recdepth ) 
			{
				// if( deb ) deb( 'Recursion limit ' + recdepth + ' exceeded.' );
				return '';
			}


			// if( deb ) deb( 'Paper is non-void array or object. What about wall? Checking ...' );
			if( typeof wall !== 'object' || wall === null )
			{
				// if( deb ) deb( 'Wall is a plain value. Making it an empty object' );
				wall={};				
			}

			var arr_detector = !!paper.length || paper.length === 0;
			if( arr_detector && !wall.length && wall.length !== 0 ) //TODM Bad test. Use "Array protot" instead.
			{
				// if( deb ) deb( ' Paper is an array and wall not. Generating array. Breaking paste feature.' );
				var wall_preserved = wall;
				wall = [];
				paste_non_arrays( wall, wall_preserved, level+1, skip_undefined, refdepth  );
			}

			// if( deb ) deb( ' Now both wall and paper are objects of the same type. Pasting their properties.' );
			var hasOwn	= Object.prototype.hasOwnProperty;
			for(var p in paper )
			{
				if( hasOwn.call( paper, p ) ) // if(paper.hasOwnProperty( p ) ) //TODO when works on arrays? when not fails on 'length'? bs "length" is notOwnProperty?
				{
					if( p !== 'length' )
					{

						var paperP = paper[ p ];
						if( do_wrap_function && typeof paperP === 'function' )
						{
							wall.fun			= wall.fun || [];
							wall.fun[0]			= wall.fun[0] || {};
							wall.fun[ 0 ][ p ]	= paperP.toString();
					
						}else{

							var theValue = paste_non_arrays( wall[ p ], paper[ p ], level+1, skip_undefined, refdepth );

							if( ! ( ( arr_detector || skip_undefined ) && typeof theValue === 'undefined' )  )
							{
								// if( deb ) deb( 'Assigning wall[' + p + '] = "' + theValue +'".' );
								if( do_wrap_function && p === 'fun' )
								{
									wall.fun		= wall.fun || [];
									wall.fun[0]		= wall.fun[0] || {};
									wall.fun[1]		= theValue;
								}else{
									wall[ p ]		= theValue;
								}
							}
						}


					}else{
						throw "Reserved word \"length\" used as a property"; //TODO
					}
				}
			}
			return wall;
		};// ...paste_non_arrays=function...
		









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
	//	Algorithm:	reuses btb.memorizedQKeyPars
	//
	//	Input:		integerify - optoinal; if given, integerifies all numeric parameters.
	//	Output:		memorizes result in btb.memorizedQKeyPars.
	//	Returns:	{} if nothing detected
	btb.memorizedQKeyPars = null;
	btb.getQueryKeyPairs = function( integerify )
	{
		if( btb.memorizedQKeyPars ) return btb.memorizedQKeyPars;
		//. Parenthesises are because gedit does not like "* /"
		var ww = window.location.search.replace( /^(\s*)/, '' );
		if( ww.charAt(0) === '?' )
		{
			ww = ww.substr(1);
		}
		if( !ww || ww.length === 0 )
		{
			btb.memorizedQKeyPars = {};
			return btb.memorizedQKeyPars;
		}
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
		btb.memorizedQKeyPars = pairs;
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



	btb.saveObjectToServer = function( baseName, obj )
	{
		var ww			= new Date();
		var timeStamp	=	ww.getFullYear() + '-' + ( ww.getUTCMonth() + 1 ) + '-' + ww.getUTCDate() + '-' +
							ww.getHours() + '-' + ww.getMinutes() + '-' + ww.getSeconds() + '-' + ww.getMilliseconds();
		var jsoned		= JSON.stringify( obj, null, '\t');
		var path		= baseName + '-' + timeStamp;
		var targetURL	= 'capturer.php?command=snap&stamp=' + baseName + '-' + timeStamp;
		// c ccc( targetURL );
		btb.saveTextToServer( targetURL, jsoned );
	}


	btb.saveTextToServer = function( url, text )
	{
			var ajax_call =
			{
				url			: url,
				cache		: false,
				dataType	: 'text',
				type		: 'post',
				data		: text,
				timeout		: 5000,
				success		: function( data, textStatus ) {
					if(	textStatus === 'success' )
					{
						if( data.indexOf( 'success' ) === 0 )
						{
							btb.ifdeb( "text saved to " + url );
						}else{
							btb.ifdeb( "failure saving to " + url + "\n" + data );
						}
					}
				}
			};
			$.ajax( ajax_call ).fail( function() {
				btb.ifdeb(
					"Failed to save to " + url + "\n" +
					"Possible error status = " + arguments[ 1 ] + "\n" +
					"Possible error expanation = " + arguments[ 2 ]
				);
			});
	};



}) ();

