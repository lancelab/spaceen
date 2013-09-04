( function () {
	var btb						= window.btb$	= window.btb$ || {};
	var debby					= btb.debby		= btb.debby || {};
    var CALLS_LIMIT				= 1000;
	var TRUNCATE_STRING_TO		= 200000;
    var SIZE_LIMIT				= 50000;
    var LEVEL_LIMIT				= 10;
	var DEFAULT_DEBUG_WINDOW_ID	= 'debug-btb';	
	var fontSize				= 8;
	var opacity					= '0.6';
	var color					= 'FFAAAA';
	var zIndex					= '';
	var debug_window			= null;	
	var collected_in_session	= '';
	var calls_count;
	var INDENT = '                                                                                                           	                                                                              ';
	var space = function( length )
	{
		return INDENT.substr( 0, length );
	};
	var indentize = function( ss, length )
	{
		if( ss.length > TRUNCATE_STRING_TO )
		{
			ss = ss.substr( 0, TRUNCATE_STRING_TO ) + ' ... ';
		}
		return ss.replace( "\n", "\n" + space( length ) );
	};
	var c_onsole_log	=	!IE && window.console &&			
							typeof console !== 'undefined' &&	
							console.log;						
	var c_onsole_clear	=	c_onsole_log && console.clear;		
    var isOpera = Object.prototype.toString.call( window.opera ) == '[object Opera]';
    var IE = !!window.attachEvent && !isOpera;
	var getQueryPar = function( key, separator )
	{
			var ww			= window.location.search;
			var sep			= separator || '=';
			var sepr		= sep === '-' ? '\\' + sep : sep;
			var re			= new RegExp(	'(?:&|\\?)' + key + 
											'(?:' + sep + '([^&' + sepr + ']*)){0,1}' + 
											'(?:' + sep + '([^&' + sepr + ']*)){0,1}' + 
											'(?:' + sep + '([^&' + sepr + ']*)){0,1}' + 
											'(?:&|$)');
			ww				= ww.match( re );
			if( !ww )		return false;
			if( ww.length === 1 )	return true;
			for( var ii = 1; ii < ww.length; ii++ )
			{
				ww[ ii ] = decodeURIComponent( ww[ ii ] );
			}
			if( separator ) return ww;
			return ww[ 1 ];	
	};
	var ww			= getQueryPar( 'deb', '-' );
	debby.on		= !!ww;
	debby.core		= ww && ww[1];
	debby.style		= ww && ww[2];
	debby.fontsize	= ww && ww[3];
	var debon		= debby.on;
	var setup_debug_window = function( debug_window_, debug_window_parent_)
	{
		if( debug_window ) return;
        debug_window = debug_window_ || document.getElementById( DEFAULT_DEBUG_WINDOW_ID );
		if( debug_window ) return;
        if( debug_window_parent_ || document.body)
		{
            debug_window = document.createElement('div');
			debug_window.setAttribute( 'id', 'debug-btb' );
			var gquery	= debby.style;
			if( gquery && gquery.length > 7 )
			{
				gquery		= gquery.toUpperCase();
				var color	= gquery.substr( 2, 6 );
				var wopacity	= gquery.substr( 0, 2 );
				var wopacity	= parseInt( '0x' + wopacity, 16 );
				if( !isNaN( wopacity ) && wopacity >=0 && wopacity <= 255 )
				{
					wopacity /= 255;
					wopacity = Math.max( wopacity, 0.0001 );
					opacity = 'opacity:' + opacity + '; ';
				}
				var wzindex = gquery.substr( 8 );
				wzindex = wzindex && parseInt( wzindex );
				if( !isNaN( wzindex ) ) zIndex = 'z-index:' + wzindex + '; ';
			}
			if( debby.fontsize )
			{
				var ww = parseInt( debby.fontsize );
				if( !isNaN( ww ) && ww > 5 ) fontSize = ww;
			}
			var wStyle =	'position: absolute; ' +
							'top: 0px; '	+
							'left:0px; '	+
							'color:#'		+ color + '; ' +
							opacity			+
							'font-size:'	+ fontSize + 'px; ' +
							zIndex;
			debug_window.setAttribute( 'style', wStyle );
			debug_window.style.lineHeight = '1em';
            var ww = debug_window_parent_ ? debug_window_parent_ : document.body;
            ww.appendChild( debug_window );
		}
	};
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
				rr += (jj ? ii : '' ) + ww;
				debug( ob[ jj ], space( ii.length + ww.length ), null, null, level + 1 );
            }
			if( !ob.length ) rr += n;
		}else if( tt === 'object' ) {
			var pcount = 0;
			for( var pp in ob )
			{
                if( ob.hasOwnProperty && ob.hasOwnProperty( pp ) )
				{
					var ww = ' ' + pp + '  : ';
					rr += ( pcount ? ii : '' ) + ww;
					debug( ob[ pp ], space( ii.length + ww.length ), null, null, level + 1 );
					pcount++;
				}
            }
			if( !pcount.length ) rr += n;
		}
		if( level === 0 ) {
			collected_in_session += rr;
			setup_debug_window( debug_window_, debug_window_parent_ );
			if( debug_window ) debug_window.innerHTML = "<pre>" + collected_in_session + "</pre>"; 
			if( c_onsole_log )
			{
				console.log( rr );	
			}
		}
        return rr;
    };
	btb.reuseDebugWindow = function ( textToOutput )
	{
		setup_debug_window();
		if( debug_window ) debug_window.innerHTML = "<pre>" + textToOutput + "</pre>"; 
	};
	btb.ifdeb = function () { if( debby.on ) btb.deb.apply( this, arguments ) };
	var sequentialConsole =	function ()
	{
		for( var ii = 0; ii <arguments.length; ii++)
		{
			console.log( arguments[ ii ] );	
		}
	};
	var debc = btb.debc =
		( c_onsole_log && sequentialConsole ) ||
		( function () { for( var ii = 0; ii <arguments.length; ii++) debug( arguments[ ii ] ); });
	var deb = btb.deb = function ()
	{ 
		if( arguments.length === 0 ) {
			if( debug_window )		debug_window.innerHTML = "<pre> </pre>"; 
			if( c_onsole_clear )	console.clear();	
			collected_in_session = '';
		}
		for( var ii = 0; ii < arguments.length; ii++ ) debug( arguments[ ii ] ); 
	};
	if( !btb.production_mode && c_onsole_log )
	{	
		window.cccc = function ()		
		{
			for( var ii=0; ii < arguments.length; ii++)
			{
				c_onsole_log( arguments[ ii ] );
			}
		}
	}
	return btb;
}) ();

( function () {
	var btb = window.btb$ = window.btb$ || {};		
	btb.effective_hostname = window.location.hostname.toLowerCase(); 
	btb.effective_hostname_without_www = btb.effective_hostname.replace( /^www\./, '' );
	btb.userAgent = navigator.userAgent;
	btb.browser = ( function () {
		    var isOpera =	Object.prototype.toString.call( window.opera ) === '[object Opera]';
			var ua = btb.userAgent;
			var ret =
			{
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
			if( ret.IE )
			{
				var ww = parseInt( ret.IE[1] );
				if( isNaN( ww ) ) ww = 0;
				ret.IE[1] = ww;
			}
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
	( function () {
		var det = btb.detected = {};
		btb.detected.mobile =	navigator.userAgent.match( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i );
		btb.detected.userAgent = navigator.userAgent;
	    var dpr = 1;
	    if(	window.devicePixelRatio !== undefined ) dpr = det.dpr = window.devicePixelRatio;
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
		det.outerWidth			= window.outerWidth;
	    det.outerHeight			= window.outerHeight;
		det.innerWidth			= window.innerWidth;
		det.innerHeight			= window.innerHeight;
		det.outerWidthByDpr		= det.outerWidth / dpr;
	    det.outerHeightByDpr	= det.outerHeight / dpr;
		det.innerWidthByDpr		= det.innerWidth / dpr;
		det.innerHeightByDpr	= det.innerHeight / dpr;
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
						if( ret !== undefined && !ret ) break; 
					}
				}else{
					var hasOwn	= Object.prototype.hasOwnProperty;
					for( var p in ob )
					{
						if( hasOwn.call( ob, p ) ) 
						{
							ret = fun( p, ob[ p ] );
							if( ret !== undefined && !ret ) break; 
						}
					}
				}
			}
			return ob;
		}
		var throttleIdGenerator = 0;	
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
				};
				return ( function () {
					if( toFlag !== null )
					{
						window.clearTimeout( toFlag );
					}
					toFlag = setTimeout( wrapper, delay );
				});
		};
	btb.pasteRef = function ()
	{
		var wall	= arguments[ 0 ] || {};
		var hasOwn	= Object.prototype.hasOwnProperty;
		for( var ii = 1, len = arguments.length; ii < len; ii++ )
		{
			var ob = arguments[ ii ];
			if( !ob || typeof ob !== 'object' ) continue;
			for( var pp in ob )
			{
				if( hasOwn.call( ob, pp ) ) 
				{
					wall[ pp ] = ob[ pp ];
				}
			}
		}
		return wall;
	};
	var pasteNonArrayClonedTree = btb.pasteNonArrayClonedTree = function ()
	{
		var wall = arguments[ 0 ] || {};
		for( var ii = 1, len = arguments.length; ii < len; ii++ )
		{
			var ob = arguments[ ii ];
			if( !ob || typeof ob !== 'object' ) continue;
			var hasOwn	= Object.prototype.hasOwnProperty;
			for( var pp in ob )
			{
				if( hasOwn.call( ob, pp ) ) 
				{
					var value = ob[ pp ];
					var wall_value = wall[ pp ];
					if( typeof value === 'object' && value !== null )
					{
						if( typeof wall_value === 'object' && wall_value !== null )
						{
							pasteNonArrayClonedTree( wall_value, value );
						}else{
							wall[ pp ] = pasteNonArrayClonedTree( {}, value );
						}
					}else{
						wall[ pp ] = value;
					}
				}
			}
		}
		return wall;
	};
		var paste_non_arrays = btb.paste_non_arrays = function ( wall, paper, level, skip_undefined, refdepth, recdepth, do_wrap_function )
		{
			level = level || 0;
			var t = typeof paper;
			if( !level && (t === 'undefined' || paper === null ) ) return wall;
			if( t === 'undefined' || t === 'string' || t === 'boolean' || t === 'number' || t === 'function' || paper === null)
			{
				return paper;
			}
			if( refdepth || refdepth === 0 )
			{
				if( level > refdepth ) return paper;
			}
			if( ( recdepth || recdepth ===0 ) && level > recdepth ) 
			{
				return '';
			}
			if( typeof wall !== 'object' || wall === null )
			{
				wall={};				
			}
			var arr_detector = !!paper.length || paper.length === 0;
			if( arr_detector && !wall.length && wall.length !== 0 ) //TODM Bad test. Use "Array protot" instead.
			{
				var wall_preserved = wall;
				wall = [];
				paste_non_arrays( wall, wall_preserved, level+1, skip_undefined, refdepth  );
			}
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
						throw "Reserved word \"length\" used as a property"; 
					}
				}
			}
			return wall;
		};
	var convert_URI_Value = function ( value, numerify )
	{
		var value = decodeURIComponent( value );
		if( numerify === 'i' ) 
		{
			if( !isNaN( value ) ) value = Math.floor( parseInt( value ) );
		}else if( numerify === 'f' ) { 
			if( !isNaN( value ) ) value = parseFloat( value );
		}
		return value;
	};
	btb.memorizedQKeyPars = null;
	btb.getQueryKeyPairs = function( integerify )
	{
		if( btb.memorizedQKeyPars ) return btb.memorizedQKeyPars;
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
					token = token.replace( '~', '=' );
					var numerify = 'f';
				}
			}
			btb.propertify( pairs, token, convert_URI_Value, numerify );
		}
		btb.memorizedQKeyPars = pairs;
		return pairs;
	};
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
			if( !obj[ prop ] || typeof obj[ prop ] !== 'object' ) obj[ prop ] = {};
			obj = obj[ prop ];
			var prop = tokens[ ii + 1 ];
		}
		obj[ prop ] = converter ? converter( value, numerify ) : value;	
	};
	btb.saveObjectToServer = function( baseName, obj )
	{
		var ww			= new Date();
		var timeStamp	=	ww.getFullYear() + '-' + ( ww.getUTCMonth() + 1 ) + '-' + ww.getUTCDate() + '-' +
							ww.getHours() + '-' + ww.getMinutes() + '-' + ww.getSeconds() + '-' + ww.getMilliseconds();
		var jsoned		= JSON.stringify( obj, null, '\t');
		var path		= baseName + '-' + timeStamp;
		var targetURL	= 'capturer.php?command=snap&stamp=' + baseName + '-' + timeStamp;
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

( function () {
	var btb = window.btb$ = window.btb$ || {};		
	btb.bindEvents = function( events, target, callbak )
	{
		target = target || document;
		$( document ).ready( function () {
			$( target ).bind( events, function( event ) {
				var keyName = whichKey( event.keyCode );
				return callbak	({	keyName	:	keyName,
									event	:	event,
									arrow	:	(	keyName === 'up' || keyName === 'down' ||
													keyName === 'left' || keyName === 'right'
												)
								});
			});
		});
	};
	KEY =
	{	
				65	: [	'a','b','c','d','e','f','g','h','i','j','k','l','m','n',
						'o','p','q','r','s','t','u','v','w','x','y','z'],
				32	: 'space',
				13	: 'enter',
				9	: 'tab',
				27	: 'escape',
				8	: 'backspace',
				37	: 'left',
				38	: 'up',
				39	: 'right',
				40	: 'down',
				45	: 'insert',
				46	: 'delete',
				36	: 'home',
				35	: 'end',
				33	: 'pageup',
				34	: 'pagedown',
				112	: 'F1',
				113	: 'F2',
				114	: 'F3',
				115	: 'F4',
				116	: 'F5',
				117	: 'F6',
				118	: 'F7',
				119	: 'F8',
				120	: 'F9',
				121	: 'F10',
				122	: 'F11',
				123	: 'F12',
			16	: 'shift',
			17	: 'control',
			18	: 'alt',
			20	: 'capslock',
			144	: 'numlock',
			48	: 'zero',
			49	: 'one',
			50	: 'two',
			51	: 'three',
			52  : 'four',
			53  : 'five',
			54	: 'six',
			55	: 'seven',
			56	: 'eight',
			57	: 'nine',
			59	: 'colon',
			61	: 'plus',
			188	: 'comma',
			109	: 'hypen',
			190	: 'dot',
			191	: 'question',
			192	: 'tilde',
			219	: 'lbracket',
			220	: 'pipe',
			221	: 'rbracket',
			222	: 'quote'
	};		
	var	whichKey = function(keyCode)
	{
		if( !keyCode ) return null;
		if( 65 <= keyCode && keyCode <= 90 ) return KEY[ 65 ][ keyCode - 65 ];
		return KEY[ keyCode ];
	}
	return self;
}) ();

( function () {
		var filters; 
		( function ( name ) {
			var btb		= window.btb$		= window.btb$			|| {};		
			var graph	= btb.graph			= btb.graph				|| {};
			conf		= graph.conf		= graph.conf			|| {};
			filters		= graph[ name ]		= graph[ name ]			|| {};
		}) ( 'filters' );
		filters.memLeft = function ( imageData, memLeft )
		{
			var data	= imageData.data;
			var keeper	= memLeft;
			var len4	= data.length - 4;
			for ( var ii = 0; ii <= len4; ii +=4 )
			{
				data[ ii     ] *= keeper;
				data[ ii + 1 ] *= keeper;
				data[ ii + 2 ] *= keeper;
			}
			/*
			for ( var ii = 0; ii <= len4; ii +=4 )
			{
				data[ ii     ] = Math.floor( data[ ii     ] * keeper );
				data[ ii + 1 ] = Math.floor( data[ ii + 1 ] * keeper );
				data[ ii + 2 ] = Math.floor( data[ ii + 2 ] * keeper );
			}
			*/
		};
}) ();

( function () {
		var btb				= window.btb$				= window.btb$				|| {};		
		var graph			= btb.graph					= btb.graph					|| {};
		var conf			= graph.conf				= graph.conf				|| {};
		var load_images		= graph.load_images			= graph.load_images			|| {};
		var mname			= 'load-images.js: ';		
		var debby			= btb.debby					= btb.debby					|| {};
		var ifdeb			= function ( msg )			{ if( debby.on ) btb.deb( mname + msg ) };
		load_images.load = function ( arg )
		{
			return load_images.LoadManager().load( arg );
		};
		load_images.LoadManager = function ()
		{
			var lman						= {};
			lman.sprites					= [];
			lman.count;
			lman.number_of_loaded_images	= 0;
			var allImagesAreLoaded			= false;
			lman.load = function ( arg )
			{
				if( !arg.mode ) return;	
				if( lman.loadFired ) return lman;
				var count	= arg.count;
				if( arg.mode === 'names' ) count = count || arg.names.length;
				if( arg.mode === 'single' ) count = 1;
				lman.count = count;
				for( var ii = 0; ii < count; ii++ )
				{
					var spr = lman.sprites[ ii ] = lman.sprites[ ii ] || {};
					spr.img = new Image();
					spr.img.onload	= ( function ( ii_, spr_ ) {
						return ( function () {
							if( !spr_.loaded )
							{
								spr_.loaded			= true;
								spr_.half_width		= Math.floor( spr_.img.width * 0.5 );
								spr_.half_height	= Math.floor( spr_.img.height * 0.5 );
								lman.number_of_loaded_images++;
								if( arg.declipify )		declipify( arg.declipify, spr_.img );
								if( arg.singleLoaded )	arg.singleLoaded( ii_, spr_ );
								ifdeb(	'loaded ' + ii_ + ' ' +  spr_.img.src +
										' number_of_loaded_images=' + lman.number_of_loaded_images, spr_.img );
								if( !allImagesAreLoaded && lman.count === lman.number_of_loaded_images )
								{
									allImagesAreLoaded = true;
									if( arg.allLoaded ) arg.allLoaded( lman );
									if( arg.allLoadedDewarning )
									{
										var ww = document.getElementById( 'loading-btb' );
										if( ww ) ww.style.display = 'none';
									}
								}
							}
						});
					}) ( ii, spr );
					if( arg.mode === 'names' )
					{
						var path	= arg.path + '/' + arg.names [ ii ];
						var name	= arg.names [ ii ];
					}else if( arg.mode === 'template' ) {
						var path	= arg.path + '/' + arg.template + ii + '.' + arg.ext;
						var name	= path;
					}else{
						var path	= arg.path;
						var name	= path; 
					}
					spr.img.src		= path;
					spr.name		= name;
				}; 
				lman.loadFired = true;
				ifdeb( 'fired load path = ' + arg.path );
				return lman;
			};
			lman.allImagesLoaded = function ()
			{
				return allImagesAreLoaded; 
			};
			return lman;
		}; 
		var declipify = load_images.declipify = function ( settings, imgContainer )
		{
			var data		= [];
			var canvas		= document.createElement( 'canvas' );
			var ctx			= canvas.getContext( '2d' );
			var templified	= settings.templified;
			var named		= settings.named;
			if( templified )
			{
				for( var gix = 0; gix < templified.length; gix++ )
				{
					var group		= templified[ gix ];
					var main		= group.main;
					var children	= group.children;
					var dgroup		= data[ gix ]	= {};
					dgroup.main		= doExtractClip( ctx, canvas, imgContainer, main );
					dgroup.children	= [];
					for( var cix = 0; cix < children.length; cix++ )
					{
						dchild = doExtractClip( ctx, canvas, imgContainer, children[ cix ] );
						dgroup.children[ cix ]	= dchild;
					}
				}
				distributeDeclipifiedImages ( data );
			}
			if( named )
			{
				for( var cssid in named )
				{
					if( !named.hasOwnProperty( cssid ) ) continue;
					var rect		= named[ cssid ];
					var extract		= doExtractClip( ctx, canvas, imgContainer, rect );
					var targetImg	= document.getElementById( cssid );
					targetImg.src	= extract;
					ifdeb( 'extracted img with cssid: ' + cssid + ' extracted = ' + (!!extract) ); // + ' rect=', rect ); 
				}
			}
		};	
	var doExtractClip = function ( ctx, canvas, imgContainer, rect )
	{
			var width	=	canvas.width	= rect[2] - rect[0] + 1;
			var height	=	canvas.height	= rect[3] - rect[1] + 1;
			ctx.drawImage(	imgContainer, rect[0], rect[1], width, height, 0, 0, width, height );
			var url = 'img/no-toDataURL-support.png';
			try {
				url = canvas.toDataURL( "image/png" );
			}catch ( error ) {
				ifdeb(	'failed doing toDataURL ' +
						( typeof error === 'object' && error !== null ? error.message : '' + error )
				)	
			}
			return url;
	};		
	var distributeDeclipifiedImages = function ( data )
	{
			for( var gix = 0; gix < data.length; gix++ )
			{
				var dgroup		= data[ gix ];
				var main		= dgroup.main;
				var children	= dgroup.children;
				var targetImg	= document.getElementById( 'expo' + gix + '-left-img-btb' ); 
				targetImg.src	= main;
				for( var cix = 0; cix < children.length; cix++ )
				{
					var dchild		= children[ cix ];
					var id			= 'expo' + gix + '-' + cix + '-right-sub-img-btb';
					var targetImg	= document.getElementById( id );
					targetImg.src	= dchild;
				}
			}
	};
	load_images.groupsLoader =
	{
		ran			: false,
		loadsN		: 0,
		loadsCount	: 0,
		groups		: []
	}
	load_images.groupsLoader.allLoaded = function ()
	{
		if( this.loadsN === this.loadsCount ) return this;
		return false;
	}
	load_images.groupsLoader.run = function ( toLoad, allLoadedCallback )
	{
		var gLd	= this;
		var grp	= gLd.groups;
		if( gLd.ran ) return;
		gLd.ran	= true;
		for( var ii = 0; ii < toLoad.length; ii++ )
		{
			var load	= load_images.load;
			var tol		= toLoad[ ii ];
			if( !tol.mode ) continue;
			if( gLd.loadsN === 0 ) ifdeb( 'Img groupsLoader began with ' + tol.name );
			( function ( allLoaded ) {
					var wAllLoaded = allLoaded;
					tol.allLoaded = function ( lman ) {
						if( wAllLoaded ) wAllLoaded( lman );
						gLd.loadsCount++;
						if( gLd.loadsN === gLd.loadsCount )
						{
							ifdeb( 'Img groupsLoader completed all ' + gLd.loadsN + ' group(s) load.' );	
							if( allLoadedCallback ) allLoadedCallback( gLd );
						}
						return gLd;
					};
			}) ( tol.allLoaded );
			var name			= tol.name;
			gLd[ name ]			= load( tol );
			grp[ gLd.loadsN ]	= gLd[ name ];
			gLd.loadsN++;
		}
		if( gLd.loadsN ) ifdeb( 'Img groupsLoader loads ' + gLd.loadsN + ' group(s) ... ' );
	};
}) ();

( function () {
		var	btb				= window.btb$			= window.btb$			|| {};		
		var	graph			= btb.graph				= btb.graph				|| {};
		var	flyer			= graph.flyer			= graph.flyer			|| {};
		var dsprite			= graph.dsprite			= graph.dsprite			|| {};
		var e3DSprite		= graph.conf.e3DSprite	= graph.conf.e3DSprite	|| {};
		var usprite			= graph.usprite			= graph.usprite			|| {};
		var conf			= graph.conf			= graph.conf			|| {};
		var	conf3D			= conf.conf3D			= conf.conf3D			|| {};
		var flyerConf		= conf.cflyer			= conf.cflyer			|| {};
		var dconf			= flyerConf.dconf		= flyerConf.dconf		|| {};
		var	draw2D			= graph.draw2D			= graph.draw2D			|| {};
		var	draw3D			= graph.draw3D			= graph.draw3D			|| {};
		var	runFlyer3D		= graph.runFlyer3D		= graph.runFlyer3D		|| {};
		var mstones			= graph.mstones			= graph.mstones			|| {};
		var virt			= graph.virt			= graph.virt			|| {};
		var	ifdeb			= btb.ifdeb;
		virt.drawArea		= virt.drawArea || {};
		var PI2				= 2 * 3.1415;
		var itemsMax;
		var sprites;
		var sprites3D;
		var clonedSprites3D;
		var loaded2DSprites;
		var run2D;
		var run3D;
		var master_context;
		var sceneRunnerWaitsForLoad;
		var final_width;
		var final_height;
		var master_screen_scale;
		var justReinitialized;
		var formerTime;
		var leftMemorySensor;
		var pauseExtendedStart;
		var addCulStartToPause;
		var insertFMemBefore;
		var wipeOutMemory;
		flyer.iteration = -1;	// TODM move to graph's functionality
		var screen_xx;
		var screen_yy;
		var screen_center_xx;
		var screen_center_yy;
		var	dontDrawAfterPeriod;
		var uniform_delay;
		var stoppedAfterPeriodDrawing;
		var firstInitDone = false;
		flyer.init_sprites = function ( )
		{
			flyer.iteration++;
			run2D				= conf.runFlyer;
			run3D				= conf.in3D;
			master_context		= graph.master_context;
			wipeOutMemory		= graph.wipeOutMemory;
			uniform_delay		= false;
			stoppedAfterPeriodDrawing = false;
			conf.turnTicksPoint	= conf.turnTicksPoint || conf.ticksPeriod; 
			dontDrawAfterPeriod	= conf.dontDrawAfterPeriod;
			itemsMax			= conf.itemsMax;
			final_width			= flyerConf.final_width || 80;	
			final_height		= flyerConf.final_height || 150;
			var wl				= graph.load_images.groupsLoader;
			loaded2DSprites		= wl.load2DImg && wl.load2DImg.sprites;
			pauseExtendedStart	= dconf.pauseExtendedStart;
			addCulStartToPause	= pauseExtendedStart && dconf.addCulStartToPause;
			insertFMemBefore = ( conf.insertFMemBefore || conf.insertFMemBefore === 0 ) ? conf.insertFMemBefore : itemsMax - 1;
			if( conf.generate_backg_img )
			{
				var wsalt			= graph.funny_graphics_2D.createRandomDisks( conf.grainsNumber, scrWidth, scrHeight );
				flyer.backgroundImageData = wsalt.getImageData( 0, 0, scrWidth, scrHeight );
			}
			if( usprite.init ) usprite.init();
			if( run2D )
			{
				flyer.init_external_state ();
				sprites = flyerConf.sprites;
			}
			if( run3D )
			{
				if( conf.reset_population_at_reset || !firstInitDone )
				{
					runFlyer3D.supplyContextAndConf();
					var w3D = graph.runFlyer3D;
					sprites3D		= w3D.generateSprites( conf );
					clonedSprites3D	= w3D.cloneCollection( sprites3D );
					ifdeb( 'run: Population of 3D sprites generated' );
				}
				if( e3DSprite.init )
				{
					e3DSprite.init();	
					ifdeb( 'run: e3DSprite.init() is ran' );
				}				
			};
			if( !firstInitDone ) sceneRunnerWaitsForLoad = graph.sceneRunnerWaitsForImg;
			mstones.frameMemLoss = conf.memLoss;
			mstones.frameLossPerMs = 0;
			if( mstones.frameMemLoss )
			{
				mstones.frameLossPerMs = mstones.frameMemLoss > 0.999999999 ? 1000000 : ( -Math.log( 1 - mstones.frameMemLoss ) ) / 1000;
			}
			mstones.critPointFrameLossPerMs = 0;
			if( conf.critPointmemLoss )
			{
				mstones.critPointFrameLossPerMs = conf.critPointmemLoss > 0.999999999 ? 1000000 : ( -Math.log( 1 - conf.critPointmemLoss ) ) / 1000;
			}
			leftMemorySensor = conf.leftMemorySensor || 0.999;
			graph.capturer.iteration++;
			firstInitDone = true;
			justReinitialized = true;
			ifdeb( 'flyer.init_sprites: completed.' );
		};
		flyer.rescale_virt = function ()
		{
			var canvas			= virt.canvas;
			var curA			= virt.drawArea;
			screen_xx			= curA.sizeX = canvas.width;
			screen_yy			= curA.sizeY = canvas.height;
			screen_center_xx	= curA.centerX = screen_xx / 2;
			screen_center_yy	= curA.centerY = screen_yy / 2;
			screen_xxP			= screen_xx * 2;
			screen_yyP			= screen_yy * 2;
			if( conf.virt === 'v' )
			{
				var wscaleX	= screen_xx / conf.vwidth;
				var wscaleY	= screen_yy / conf.vheight;
				master_screen_scale	= Math.min( wscaleX, wscaleY );
			}else{
				master_screen_scale	= 1.0;
			}
			curA.dscale = master_screen_scale;
			if( dsprite.resetDrawPars ) dsprite.resetDrawPars();
		};
	flyer.move_sprites = function ( effTicks, time )
	{
		var turnEnterPassed	= mstones.turnEnterPassed;
		var inPausePhase	= mstones.inPausePhase;
		var ctx				= virt.ctx;
		var effPhase		= effTicks / conf.ticksPeriod;
		var signedTicks		= effTicks;
		var complemTicks	= effTicks;
		var absTicks		= effTicks;
		if( conf.backwardInTime )
		{
			var signedTicks		= conf.turnTicksPoint - effTicks;
			var absTicks		= Math.abs( signedTicks );
		}				
		var complemTicks		= Math.max( conf.turnTicksPoint - absTicks, 0 );
		var complPhase			= complemTicks / conf.turnTicksPoint;
		if( usprite.run ) usprite.run();
		frameMemoryToPaste		= null;
		if( stoppedAfterPeriodDrawing )
		{
				if( ( conf.virt === 'b' || conf.virt === 't' ) && conf.drawFromBTAfterStopped )
				{	
					graph.scaleAndDrawMemoryCanvas ( inPausePhase, master_screen_scale, turnEnterPassed, absTicks );
					if( conf.scaffold ) graph.putText( ctx, screen_center_xx, screen_center_yy, master_screen_scale, conf.vwidth, conf.scaffold );
				}
				return;
		}
		if( justReinitialized )
		{
				wipeOutMemory();
				formerTime = 0;
				justReinitialized = false;
		}
		var elapsedTime		= time - formerTime;
		var effMemLoss =	( dsprite.frMemLossInPause && ( inPausePhase > -1 ) && dsprite.frMemLossInPause( inPausePhase ) ) ||
							mstones.frameMemLoss;
		if( effMemLoss >= 0  )	//	TODO very misleading mstones.frameMemLoss === 0 means "no memory"
		{
				var ww_wipe_memory	=	( conf.memClearAt0 && mstones.culminationEnterEntered );
				if( !mstones.frameMemLoss || ww_wipe_memory ) 
				{
					wipeOutMemory();
				}else if( elapsedTime > 0 ) {
					if( inPausePhase > -1 || ( addCulStartToPause && absTicks < pauseExtendedStart ) )
					{
						var memLoss = mstones.critPointFrameLossPerMs || mstones.frameLossPerMs;
					}else{
						var memLoss = mstones.frameLossPerMs;
					}
					if( memLoss )
					{
						var memLeft = Math.max( 1 - memLoss * elapsedTime, 0 ); 
						if( memLeft < leftMemorySensor )
						{
							formerTime = time;
							var wCur	= virt.ix;
							var wConCur	= virt.ctx;
							var wCanCur	= virt.canvas;
							var wWidth	= wCanCur.width;
							var wHeight	= wCanCur.height;
							if( virt.can.length > 1 )
							{
								var wNext		= ( wCur + 1 ) % 2;
								var wConNext	= virt.con[ wNext ];
								wConNext.clearRect( 0, 0, wWidth, wHeight );
								wConNext.globalAlpha = memLeft;
								frameMemoryToPaste = wCanCur;
								virt.ix		= wNext;
								virt.ctx	= virt.con[ wNext ];
								virt.canvas	= virt.can[ wNext ];
								ctx		= wConNext;
							}else{
								var imageData = wConCur.getImageData( 0, 0, wWidth, wHeight );
								graph.filters.memLeft( imageData, memLeft );
								wConCur.putImageData( imageData, 0, 0 )
							}
						}
					}
				}
		}
		var ctx = virt.ctx;
		var alpha = conf.turnTicksPoint ? Math.max( Math.min( complPhase, 1 ), 0.0001 ) : 1;
		if( sceneRunnerWaitsForLoad )
		{
				if( !graph.load_images.groupsLoader.allLoaded() )
				{
					ifdeb( '... skipped draw; not all images are yet loaded ... ' );
					if( dontDrawAfterPeriod && mstones.iterationExitEntered ) stoppedAfterPeriodDrawing = true;	
					return false;
				}else if( conf.keepLoadingMsgTillImgLoad ) {
					graph.removeLoadingMsg ();
				}
				sceneRunnerWaitsForLoad = false;
				if( conf.startAnimAfterImgLoad )
				{
					graph.startTime		= null;
					ifdeb( 'Begins animation. Time set to 0.' );
					return false;
				}
		}
		uniform_delay				= uniform_delay || ( flyerConf.uniform_delay && inPausePhase > -1 );
		var inPausePhaseEff		= conf.turnPonitPause * ( uniform_delay ? ( inPausePhase > -1 ? inPausePhase : 1 ) : 0  );
		if(	!(	( conf.picClearAtEnd	&& mstones.iterationExitEntered		) ||
				( conf.picClearAt0		&& mstones.culminationEnterEntered	) ||
				( conf.picClearInPause	&& inPausePhase > -1 )
			)
		){
			if( run3D && ( !flyerConf.insert3DSceneBeforeIx1 || !sprites.length ) )
			{
				if( frameMemoryToPaste ) insertFrameMemToPaste( ctx );
				run3DSprites( effTicks );
				if( !mstones.firstTimeRan ) enableBgAfterFirstRun();
			}else{
				for( var ii = sprites.length - 1; ii > -1; ii-- )
				{
					var sprite = sprites[ii];
					if( !loaded2DSprites )
					{
						if( frameMemoryToPaste && insertFMemBefore === ii ) insertFrameMemToPaste( ctx );
					}
					if( flyerConf.insert3DSceneBeforeIx1 === ii + 1 && run3D ) run3DSprites( effTicks );
					var filteredSignTicks = signedTicks;
					if( uniform_delay && ii )
					{
						if( inPausePhaseEff > sprite.delay )
						{
							filteredSignTicks += ( sprite.delay - inPausePhaseEff ) * conf.ticksPerMsec;
						}else{
							continue;
						}
					}
					var spr				= flyer.move_sprite( sprite, filteredSignTicks );
					var vibroAngleFinal = spr.ff;
					var spriteCenterX = screen_center_xx + spr.rrx * master_screen_scale;
					var spriteCenterY = screen_center_yy - spr.rry * master_screen_scale;
					var target_width = final_width * spr.ss * master_screen_scale;				
					var target_height = final_height * spr.ss * master_screen_scale;				
					if( loaded2DSprites )
					{
						var lsp = loaded2DSprites[ ii % loaded2DSprites.length ];
						var img = lsp.img;
						var width = img.width;
						var height = img.height;
						var xcorner = spriteCenterX - lsp.half_width * master_screen_scale;
						var ycorner = spriteCenterY - lsp.half_height * master_screen_scale;
						if(	xcorner + target_width	< -screen_xx	|| xcorner	> screen_xx || 
							ycorner + target_height	< -screen_yy	|| ycorner	> screen_yy ||
							target_width > screen_xxP				|| target_height > screen_yyP
						){
							ifdeb( 'too out of screen ' );
							continue;
						}
						ctx.globalAlpha = alpha;
						draw2D.drawRotatedImage( img, spr.ff, spriteCenterX, spriteCenterY, target_width, target_height, ctx );
						ctx.globalAlpha = 1;
					}else{
						dsprite.draw(
						{
							ctx				: ctx,
							spriteCenterX	: spriteCenterX,
							spriteCenterY	: spriteCenterY,
							alpha			: alpha,
							scale			: spr.ss * master_screen_scale,
							ticks			: filteredSignTicks,
							effPhase		: effPhase,
							complPhase		: complPhase,
							item			: ii,
							angle			: vibroAngleFinal
						});
					}
				} 
				if( !mstones.firstTimeRan ) enableBgAfterFirstRun();
			} 
		} 
		graph.scaleAndDrawMemoryCanvas ( inPausePhase, master_screen_scale, turnEnterPassed, absTicks );
		if( conf.scaffold ) graph.putText( ctx, screen_center_xx, screen_center_yy, master_screen_scale, conf.vwidth, conf.scaffold );
		if( dontDrawAfterPeriod && mstones.iterationExitEntered ) stoppedAfterPeriodDrawing = true;
		return true;
	};
	var run3DSprites = function ( effTicks )
	{
			if(	( conf.runInfinitely || mstones.iterationExitPassed ) && 
				graph.scrWidth > 0 && graph.scrHeight > 0					// TODM fix ... and why this is a "window.width"? ... do canvas ... do better
			) {
				graph.runFlyer3D.drawSprites (
					sprites3D,
					clonedSprites3D,
					effTicks
				);
			}
	};
	var enableBgAfterFirstRun = function ()
	{
		if( graph.dom.canvasBgIm_jq )
		{
			graph.dom.canvasBgIm_jq.css( 'display', 'block' );
			mstones.firstTimeRan = true;
		}
	}
	var frameMemoryToPaste;
	var insertFrameMemToPaste = function ( ctx )
	{
		var ww = frameMemoryToPaste;
		ctx.drawImage( ww, 0, 0, ww.width, ww.height );
		frameMemoryToPaste = null;
	};
}) ();

( function () {
		var	btb			= window.btb$		= window.btb$			|| {};		
		var	graph		= btb.graph			= btb.graph				|| {};
		var	flyer		= graph.flyer		= graph.flyer			|| {};
		var conf		= graph.conf		= graph.conf			|| {};
		var capturer	= graph.capturer	= graph.capturer		|| {};
		var PI2			= 2 * 3.1415;
		var PI2W;		//	Cycle frequency in respect to "effective cycle": see (*).
		var sprites;
		var itemsMax;
		var conf;
		var flyerConf;
		var common_ff;
		var sprites_seed;
		flyer.init_external_state = function ()	
		{
			flyerConf			= conf.cflyer;
			sprites				= flyerConf.sprites	= flyerConf.sprites || [];	
			sprites_seed		= flyerConf.sprites_seed;
			itemsMax			= conf.itemsMax;
			if( sprites_seed )
			{
				common_ff			= sprites_seed.common_ff;
			}else{
				return;
			}	
			var ww = flyerConf;
			var wl					= graph.load_images.groupsLoader;
			var loaded2DImages		= wl.load2DImg && wl.load2DImg.sprites;
			var loadedCustImages	= wl.loadCustomImg && wl.loadCustomImg.sprites;
			if( !loaded2DImages )	
			{
				graph.dsprite.prepareParameters( loadedCustImages );
				generateSprites( flyerConf.dconf.startup_rr_r0 );
			}else{
				generateSprites();
			}
		}; 
		var generateSprites = function ( startup_rr_r0 )	
		{
			PI2W			= conf.turnTicksPoint ? PI2 / conf.turnTicksPoint * conf.timeScale : PI2;	
			var sd					= sprites_seed;
			var dontRandomizeFactor	= sprites_seed.dontRandomizeFactor;
			var rnd					= sprites_seed.randomizer;
			var delayStep			= conf.turnPonitPause / itemsMax;
			if(	( capturer.conf && !flyer.iteration ) || ( flyer.iteration && !conf.rerandom ) ) return;
			for( var ii = 0; ii < itemsMax; ii++ )
			{
				var rr_r0	= startup_rr_r0 && startup_rr_r0[ ii ] || sd.rr.r0;
				var spr = sprites[ii] =
				{
					rr :
					{
							ra : sd.rr.ra * ( rnd.rr.ra.base + rnd.rr.ra.factor * 
									( dontRandomizeFactor ? ( ( ii + 2 ) % conf.itemsMax ) / itemsMax :		Math.random() ) ),
							vv : sd.rr.vv * ( rnd.rr.vv.base +
									( dontRandomizeFactor ? ( ( ii + 3 ) % conf.itemsMax ) / itemsMax :		Math.random() ) ),
							f0 : sd.rr.f0,
							r0 : rr_r0
					},
					cc :
					{	
						f0 : sd.cc.f0,
						vv : sd.cc.vv * ( rnd.cc.vv.base + rnd.cc.vv.factor *
									( dontRandomizeFactor ? ( ( ii ) % conf.itemsMax ) / itemsMax :		Math.random() ) )
					},	
					ff :
					{	
						f0 : sd.ff.f0,
						vv : sd.ff.vv * ( rnd.ff.vv.base + rnd.ff.vv.factor *
									( dontRandomizeFactor ? ( ( ii + 4 ) % conf.itemsMax ) / itemsMax :		Math.random() ) )
					},	
					ss :
					{ 
						sa : sd.ss.sa * ( rnd.ss.sa.base + rnd.ss.sa.factor *
									( dontRandomizeFactor ? ( ( ii + 1 ) % conf.itemsMax ) / itemsMax :		Math.random() ) ),
						vv : sd.ss.vv * ( rnd.ss.vv.base + rnd.ss.vv.factor *
									( dontRandomizeFactor ? ( ( ii ) % conf.itemsMax ) / itemsMax :		Math.random() ) ),
						f0 : sd.ss.f0,
						s0 : sd.ss.s0
					}
				};
				if( flyerConf.uniform_delay )
				{
					if( ii )
					{
						spr.delay = delayStep * ii;
					}else{
						spr.delay = conf.turnPonitPause;
					}
					spr.delayTicks = spr.delay * conf.ticksPerMsec;
				}
			};
			capturer.increaseCounter();
		};
		flyer.move_sprite = function ( sprite, tt )
		{
			var rrf =	PI2W * ( sprite.rr.vv + sprite.rr.f0 ) * tt;
			var rr	=	sprite.rr.ra * Math.sin( rrf ) + sprite.rr.r0;
			var comm_ff	=	PI2W * common_ff.vv * tt + common_ff.f0;
			var cc_ff	= 	PI2W * sprite.cc.vv * tt + sprite.cc.f0;
			var rad_ff	= 	cc_ff + comm_ff;
			var rrx	=	rr * Math.cos( rad_ff);
			var rry	=	rr * Math.sin( rad_ff);
			var ww = flyerConf.sparkRange;
			if( ww )
			{
				rrx += ww * ( 0.5 - Math.random() );
				rry += ww * ( 0.5 - Math.random() );
			}
			var	ff	=	PI2W * sprite.ff.vv * tt + sprite.ff.f0 + rad_ff;
			var ssf =	PI2W * sprite.ss.vv * tt + + sprite.ss.f0;
			var ss	=	Math.abs( sprite.ss.sa * Math.abs( Math.sin( ssf ) ) + sprite.ss.s0 );
			return { rrx : rrx, rry : rry, ff : ff, ss : ss };
		};
}) ();

( function () {
	var btb		= window.btb$	= window.btb$		|| {};
	var graph	= btb.graph		= btb.graph			|| {};
	var conf	= graph.conf	= graph.conf		|| {};
	var dsprite	= graph.dsprite	= graph.dsprite		|| {};
	var	flyer	= graph.flyer	= graph.flyer		|| {};
	var PI				= 3.1415926;
	var PI2				= 2 * PI;
	var PID2			= PI / 2;
	var PI2T;							
	var fillFrom;
	var fillSprites;
	var pauseExtendedStart;
	var hsl;
	var shape_paths;
	var shape_functions;
	var startColorA;
	var endColorA;
	var start_colors;
	var hsl_start_colors;
	var end_colors;
	var	colorUpperBound;
	var	alphaUpperBound;
	var	culmColorUpperBound;
	var	culmAlphaUpperBound;
	var colorLowBound;
	var endColorTicksThrot;		
	var endColorRatio;			
	var mstones;
	dsprite.prepareParameters = function ( loaded_sprites )
	{ 
			var capturer = graph.capturer;
			if(	!(	conf.cflyer.sprites &&
					( ( capturer.conf && !flyer.iteration ) ||  ( flyer.iteration && !conf.rerandom ) )
				)
			){
				dsprite.prepareConfig( loaded_sprites );
			}
			if( conf.capture ) graph.capturer.capture();
			var dconf			= conf.cflyer.dconf;
			var loaded_sprite	= loaded_sprites && loaded_sprites[0];
			PI2T				= PI2 / conf.turnTicksPoint * conf.timeScale;
			mstones				= graph.mstones;
			fillSprites			= conf.cflyer.fillSprites;
			fillFrom			= conf.cflyer.fillFrom;
			pauseExtendedStart			= dconf.pauseExtendedStart;
			hsl					= dconf.hsl;
			shape_paths			= dconf.shape_paths;
			shape_function		= dconf.shape_function;
			shape_functions		= dconf.shape_functions;
			startColorA			= dconf.startColorA;
			endColorA			= dconf.endColorA;
			start_colors		= dconf.start_colors;
			hsl_start_colors	= dconf.hsl_start_colors;
			end_colors			= dconf.end_colors;
			colorUpperBound		= dconf.colorUpperBound || 255;
			alphaUpperBound		= dconf.alphaUpperBound || 1.0;
			culmColorUpperBound	= dconf.culmColorUpperBound || 255;
			culmAlphaUpperBound	= dconf.culmAlphaUpperBound || 1.0;
			colorLowBound		= dconf.colorLowBound;
			endColorRatio		= dconf.endColorRatio || 0.5;
			endColorTicksThrot	= dconf.endColorTicksThrot || 0.05;
			dsprite.prepare_util( dconf, loaded_sprite );
	};
	dsprite.draw = function ( arg )
	{
		var ctx						= arg.ctx;
		var spriteCenterX			= arg.spriteCenterX;
		var spriteCenterY			= arg.spriteCenterY;
		var angle					= arg.angle;
		var ss						= arg.scale;
		var ticks					= Math.abs( arg.ticks );
		var item					= arg.item;
		var paths					= shape_paths.length && shape_paths[ item % shape_paths.length ];
		var paths_are_functions		= typeof paths === 'function';
		var fun_sprite				= shape_functions.length && shape_functions[ item % shape_functions.length ];
		var fun_sprite				= ( paths_are_functions && paths ) || fun_sprite || shape_function;
		paths						= !paths_are_functions && paths;
		if( !fun_sprite && !paths )
		{
			btb.deb( "no fun and no paths in dsprite is set" );
			return;
		}
		var sscc					= start_colors[ item ];
		var hsl_sscc				= hsl_start_colors[ item ];
		var eecc					= end_colors && end_colors[ item ];
		var inPausePhase 			= mstones.inPausePhase;
		var cosA;
		var sinA;
		var effectiveColorBound;
		var effectiveAlphaBound;
		var pausePhase = pauseExtendedStart && ticks < pauseExtendedStart;
		if( pausePhase )
		{
				pausePhase = Math.min( Math.max( ( pauseExtendedStart - ticks ) / pauseExtendedStart, 0.0001 ), 1.0 );
		}
		if( pauseExtendedStart ) dsprite.animateDomEls( arg, pausePhase );
		if( conf.playDomelPause && mstones.pauseEnterPassed ) dsprite.animateDomEls( arg, inPausePhase );	
		if( pausePhase )
		{
				effectiveColorBound = culmColorUpperBound;
				effectiveAlphaBound = culmAlphaUpperBound;
		}else{
				effectiveColorBound = colorUpperBound;
				effectiveAlphaBound = alphaUpperBound;
		}
		for( var ii = 0, len = sscc.length; ii < len; ii++ )
		{
				if( hsl && !fun_sprite )
				{
					var cc = hsl_sscc[ ii ];
					switch ( ii )
					{
						case 0:	
								var color = cc.amp * Math.sin( PI2T * cc.vv * ticks ) + cc.c0;
								var startColorR = Math.min( Math.max( ( color + 360 ) % 360, 0 ), 360 );
								break;
						case 1:
								var color = cc.amp * Math.sin( PI2T * cc.vv * ticks ) + cc.c0;
								var startColorG = Math.min( Math.max( ( color + 100 ) % 100, 0 ), 100 );
								break;
						case 2: 
								var color = cc.amp * Math.sin( PI2T * cc.vv * ticks ) + cc.c0;
								var startColorB = Math.min( Math.max( ( color + 50 ) % 50, 0 ), 50 );
					}
				}else{
				var cc = sscc[ ii ];
				var color = Math.min( Math.floor( Math.abs( -cc.amp * Math.sin( PI2T * cc.vv * ticks ) + cc.c0 ) ), effectiveColorBound );
				if( colorLowBound ) color = Math.max( color, colorLowBound );
				switch ( ii )
				{
					case 0:	var startColorR = color;
							break;
					case 1:	var startColorG = color;
							break;
					case 2:	var startColorB = color;
				}
		}
		}
		if( eecc )
		{
			for( var ii = 0, len = eecc.length; ii < len; ii++ )
			{
				var cc = eecc[ ii ];
				var color = Math.min( Math.floor( Math.abs( -cc.amp * Math.sin( PI2T * cc.vv * ticks ) + cc.c0 ) ), effectiveColorBound );
				switch ( ii )
				{
					case 0:	var endColorR = color;
							break;
					case 1:	var endColorG = color;
							break;
					case 2:	var endColorB = color;
				}
			}
		}else{
			if( hsl )
			{
				var endColorR	= 125;
				var endColorG	= 125;
				var endColorB	= 125;
			}else{
			var endColorR	= Math.floor( startColorR * endColorRatio / ( ticks * endColorTicksThrot + 1 ) );
			var endColorG	= Math.floor( startColorG * endColorRatio / ( ticks * endColorTicksThrot + 1 ) );
			var endColorB	= Math.floor( startColorB * endColorRatio / ( ticks * endColorTicksThrot + 1 ) );
			}
		}
		var doFilteredAlpha	= false;
		if( conf.pictFadeInPause && ( inPausePhase > -1 || mstones.culminationEnterPassed ) )
		{
			if( mstones.culminationEnterPassed )
			{
				var filteredAlpha = 0.0001;
			}else{
				var filteredAlpha = Math.max( 1 - inPausePhase * 2, 0.0001 ); 
			}
			doFilteredAlpha = true;
		}else if( !fun_sprite ) {
			var shortZoneTick = paths && paths[ 0 ].shortZoneTick;
			if( shortZoneTick )
			{
				if( shortZoneTick && ticks > shortZoneTick ) return;
				var filteredAlpha = ( shortZoneTick - ticks ) / shortZoneTick;
				doFilteredAlpha = true;
			}
		}
		filteredAlpha = doFilteredAlpha ? arg.alpha * filteredAlpha : arg.alpha;
		if( conf.spaceTransf )
		{
				ctx.save();
				ctx.translate( spriteCenterX, spriteCenterY );
				ctx.rotate( -angle );
		}else if( angle ) {
				angle = -angle;
				sinA = Math.sin( angle );
				cosA = Math.cos( angle );
		}
		var funGrad = null;
		if( fun_sprite )
		{
			funGrad = fun_sprite( ctx, grad, grad, ss, arg,
							startColorR, startColorG, startColorB, startColorA,
							endColorR, endColorG, endColorB, endColorA,
							item, filteredAlpha, effectiveAlphaBound
			);
		}
		var gradShort = null;
		if( !fillSprites && fillFrom && ticks < fillFrom )
		{
			var shortAlpha =	filteredAlpha ||
								Math.max ( 
										Math.floor( 
												1000 * ( fillFrom - ticks ) / fillFrom * arg.alpha
										) / 1000,
										0.001
								);
			if( fun_sprite )
			{
				var gradShort = funGrad;
			}else{
				var gradShort = dsprite.create_gradient (
					ctx, ss,
					startColorR, startColorG, startColorB, startColorA,
					endColorR, endColorG, endColorB, endColorA,
					shortAlpha, angle, spriteCenterX, spriteCenterY,
					effectiveAlphaBound,
					sinA, cosA,
					hsl
				);
			}
			/*
				c ccc( 
					' fillFrom=' + fillFrom +
					'. short grad :' + ' ss=' + ss +
					', startColorR= '	+ startColorR +
					', startColorG='	+ startColorG	+ ', startColorB=' + startColorB +
					', startColorA = '	+ startColorA	+ ', endColorR=' + endColorR +
					', endColorG='		+ endColorG		+ ', endColorB=' + endColorB + ', endColorA=' + endColorA +
					', shortAlpha=' + shortAlpha
				);
			*/
		} 
		if( paths )
		{
			var grad = dsprite.create_gradient(
				ctx, ss,
				startColorR, startColorG, startColorB, startColorA,
				endColorR, endColorG, endColorB, endColorA,
				filteredAlpha, angle, spriteCenterX, spriteCenterY,
				effectiveAlphaBound,
				sinA, cosA,
				hsl
			);
		}
		if( paths )
		{
			ctx.beginPath();
			for( var iip = 0; iip < paths.length; iip++ )
			{
				var path = paths[ iip ];
				if( !conf.spaceTransf )
				{
					if( angle )
					{
						var wx = cosA * path.x - sinA * path.y;
						var wy = sinA * path.x + cosA * path.y;
						var startAngle	= path.startAngle + angle;
						var endAngle	= startAngle + path.angle;
					}else{
						var wx = path.x;
						var wy = path.y;
						var startAngle	= path.startAngle;
						var endAngle	= startAngle + path.angle;
					}
					var pointX = spriteCenterX + wx * ss;
					var pointY = spriteCenterY + wy * ss;
				}else{
					var pointX = path.x * ss;
					var pointY = path.y * ss;
					var startAngle	= path.startAngle;
					var endAngle	= startAngle + path.angle;
				}
				if( path.hasOwnProperty( 'r' ) )
				{
						var pathR		= path.r * ss;
						if( !conf.spaceTransf && angle )
						{
							var startAngle	= path.startAngle + angle;
							var endAngle	= startAngle + path.angle;
						}else{
							var startAngle	= path.startAngle;
							var endAngle	= startAngle + path.angle;
						}
						ctx.arc(
							pointX,
							pointY,
							pathR,
							startAngle,
							endAngle,
							path.dir
						);
				}else{
						if( iip === 0 )
						{
							ctx.moveTo( pointX, pointY );
						}else{
							ctx.lineTo( pointX, pointY );
							if( iip === paths.length - 1) ctx.closePath();
						}
				}
			} 
		} 
		if( paths )
		{
			if( fillSprites )
			{
				ctx.fillStyle = funGrad || grad;
					ctx.fill();
			}else{
				if( gradShort )
				{
						ctx.fillStyle = gradShort;
						ctx.fill();	
				}
				ctx.strokeStyle = funGrad || grad;
				ctx.stroke();
			}
		}
		if( conf.spaceTransf ) ctx.restore();
	};
}) ();

( function () {
		var btb		= window.btb$	= window.btb$		|| {};
		var graph	= btb.graph		= btb.graph			|| {};
		var conf	= graph.conf	= graph.conf		|| {};
		var dsprite	= graph.dsprite	= graph.dsprite		|| {};
		var loaded_sprite		= null;
		var doRadialGradient;
		var fillSprites;
		var mstones;
		var linear_gradients;
		var rad_gradients;
		var swap_gradients;
		var titlePosX;
		var titlePosY;
		var	titleScale;
		var pauseImageStays;
		var fillTitleFrom;	
		var foregrounds	= null;	
		var elSTART		= 0;
		var elPROGRESS	= 1;
		var elDONE		= 2;
		var elState;
		dsprite.prepare_util = function ( dconf, loaded_sprite_ )
		{
			linear_gradients	= dconf.linear_gradients;
			rad_gradients		= dconf.rad_gradients;
			swap_gradients		= dconf.swap_gradients;
			doRadialGradient	= dconf.doRadialGradient;
			fillSprites				= dconf.fillSprites;
			loaded_sprite		= loaded_sprite_;
			titlePosX			= dconf.titlePosX;
			titlePosY			= dconf.titlePosY;
			titleScale			= dconf.titleScale;
			pauseImageStays		= conf.cflyer.pauseImageStays;
			fillTitleFrom		= conf.cflyer.fillTitleFrom;
			mstones				= graph.mstones;
			if( !foregrounds )
			{
				foregrounds			= graph.flyer.foregrounds = graph.flyer.foregrounds || {};
				var ww				= conf.cflyer.foregroundsIds;
				btb.each( ww, function ( key, value ) {
					foregrounds[ key ] = foregrounds[ key ] || [];
					btb.each( value, function ( key2, id ) {
							var wf = $( id );
							if( wf && wf[0] ) foregrounds[ key ].push( wf );
					});
				});
				elState		= elSTART;
			}
		};
		dsprite.create_gradient = function (
				ctx, ss,
				startColorX, startColorY, startColorZ, startColorA,
				endColorR, endColorG, endColorB, endColorA,
				alpha, angle, centerX, centerY,
				effectiveAlphaBound,
				sinA, cosA,
				hsl
		){
			var alphaStart	= Math.min( startColorA	* alpha, effectiveAlphaBound );
			var alphaEnd	= Math.min( endColorA	* alpha, effectiveAlphaBound );
			if( fillSprites )
			{
				if( hsl )
				{
					return 'hsla(' +
						startColorX + ',' +
						startColorY + '%,' +
						startColorZ + '%,' +
						alphaStart + ')';
				}else{
					return 'rgba(' +
						startColorX + ',' +
						startColorY + ',' +
						startColorZ + ',' +
						alphaStart + ')';
				}
			}
			if( doRadialGradient ) {
				var ww0 = rad_gradients[ swap_gradients ];
				var ww1 = rad_gradients[ ( swap_gradients + 1 ) % 2 ];
				var w0R = ww0.R;
				var w1R = ww1.R;
			}else{
				var ww0 = linear_gradients[ swap_gradients ];
				var ww1 = linear_gradients[ ( swap_gradients + 1 ) % 2 ];
			}
			w0X = ww0.X;
			w0Y = ww0.Y;
			w1X = ww1.X;
			w1Y = ww1.Y;
			if( !conf.spaceTransf )
			{
					if( angle )
					{
						var w0x = cosA * w0X - sinA * w0Y;
						var w0y = sinA * w0X + cosA * w0Y;
						var w1x = cosA * w1X - sinA * w1Y;
						var w1y = sinA * w1X + cosA * w1Y;
					}else{
						var w0x = w0X;
						var w0y = w0Y;
						var w1x = w1X;
						var w1y = w1Y;
					}
					var w0X = centerX + w0x * ss;
					var w0Y = centerY + w0y * ss;
					var w1X = centerX + w1x * ss;
					var w1Y = centerY + w1y * ss;
			}
			if( doRadialGradient )
			{
				w0R	*= ss;
				w1R	*= ss;
				var grad = ctx.createRadialGradient(
					w0X,
					w0Y,
					w0R,
					w1X,
					w1Y,
					w1R
				);
			}else{
				var grad = ctx.createLinearGradient	(
					w0X,
					w0Y,
					w1X,
					w1Y
				);
			}
			if( hsl )
			{
				var stopCol = 'hsla(' +
						startColorX + ',' +
						startColorY + '%,' +
						startColorZ + '%,' +
						alphaStart + ')';
			}else{
				var stopCol = 'rgba(' +
					startColorX + ',' +
					startColorY + ',' +
					startColorZ + ',' +
					alphaStart + ')';
			}
			grad.addColorStop( 0, stopCol );
			grad.addColorStop( 1, 'rgba(' +
					endColorR + ',' +
					endColorG + ',' +
					endColorB + ',' +
					alphaEnd + ')'
			);
 			return grad;
		};
		dsprite.drawPauseImage = function ( phase, ctx, centerX, centerY, scaleX, scaleY, turnEnterPassed, ownTicks )
		{
			if( !loaded_sprite || !loaded_sprite.loaded ) return;	
			if( fillTitleFrom && fillTitleFrom > ownTicks )
			{
				phase = ( fillTitleFrom - ownTicks ) / ( fillTitleFrom * 2 ); 
			}else if( pauseImageStays && turnEnterPassed ) {
				phase *= 0.5;
				if( phase < -0.2 ) phase = 0.5;
			}else if( phase < 0 || phase > 1 ) {
				return;
			}
			var img			=	loaded_sprite.img;
			var alpha		=	phase * 2 - 1;
			alpha			*=	alpha;
			alpha			=	1 - Math.abs( alpha ); 
			alpha			*=	alpha;
			if( alpha > 1 )		alpha = 1;
			ctx.globalAlpha	=	alpha;
			var ww			=	img.width;
			var wh			=	img.height;
			scaleX			=	titleScale && titleScale * scaleX || scaleX;
			scaleY			=	titleScale && titleScale * scaleY || scaleY;
			ctx.drawImage (	img,
							0, 0, ww, wh,
							centerX + titlePosX * scaleX , centerY + titlePosY * scaleY,
							ww * scaleX, wh * scaleY
			);
			ctx.globalAlpha	= 1;
		};
		dsprite.animateDomEls = function( arg, elphase )
		{
			if( !foregrounds || elState === elDONE ) return;
			var fade	= foregrounds.fadeAtCulmination;
			var show	= foregrounds.stayAfterCulm;
			var flen	= fade && fade.length || 0;
			var slen	= show && show.length || 0 ;
			var len		= Math.max( flen, slen );
			if( !len )	return;
			if( elphase === -2 || elphase > 0.99999)
			{
				for( var ii = 0; ii < len; ii++ )
				{
					if( ii < flen )
					{
						var fd = fade[ ii ];
						btb.ifdeb(	'fader-' + ii + '-' + fd[0].id + ' hidden. elState=' + elState + ' opacity=' + fd[0].style.opacity +
									' height=' + $( fd ).css( 'height' ));
						fd[0].style.visibility = 'hidden';
						fd[0].style.display = 'none';
					}
					if( ii < slen )
					{
						var sh = show[ ii ];
						sh.css( 'opacity', 1 );
						if( elState === elSTART )
						{
							sh[0].style.visibility = 'visible';
							sh[0].style.display		= 'block';
							btb.ifdeb(	'shower-' + ii + '-' + sh[0].id + ' shown elState=' + elState + ' opacity=' + sh[0].style.opacity +
										' height=' + $( sh ).css( 'height' ));
						}
					}
				}
				elState = elDONE;
				btb.ifdeb( 'domels done: elState=' + elState );
			}else{ 
				var alpha	= elphase === -2 ? 0 : ( elphase === -1 ? 1 : elphase );
				if( alpha > 0.99999 ) alpha = 1;
				if( alpha < 0.00001 ) alpha = 0;
				var calpha = 1 - alpha;
				for( var ii = 0; ii < len; ii++ )
				{
					if( ii < flen )
					{
						var fd = fade[ ii ];
						fd.css( 'opacity', calpha );
						if( elState === elSTART ) fd[0].style.visibility = 'visible';
					}
					if( ii < slen )
					{
						var sh = show[ ii ];
						sh.css( 'opacity', alpha );
						if( elState === elSTART )
						{
							sh[0].style.visibility	= 'visible';
							sh[0].style.display		= 'block';
						}
					}
				}
				elState = elPROGRESS;
			}
		};
}) ();

( function () {
		var btb				= window.btb$			= window.btb$				|| {};
		var graph			= btb.graph				= btb.graph					|| {};
		var conf			= graph.conf			= graph.conf				|| {};
		var flyerConf		= conf.cflyer			= conf.cflyer				|| {};
		var capturer		= graph.capturer		= graph.capturer			|| {};
		capturer.maxCount	= 2;
		capturer.count		= 0;
		capturer.increaseCounter = function ()
		{
			capturer.count++;
			if( capturer.count === capturer.maxCount ) btb.ifdeb( "All part of random capture-components are generated." );
		}
		capturer.capture	= function ( action )
		{
			if( !action ) return;
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
					btb.reuseDebugWindow( confTxt, '' );
				}else if( action === 'save config' ) {
					btb.saveTextToServer( url, confTxt );
				}
			}else if( action === 'save picture' ) {
				try {
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

( function () {
	var btb		= window.btb$	= window.btb$	|| {};		
	var graph	= btb.graph		= btb.graph		|| {};
	graph.readme =
	{
		title		:	"Spaceen",
		description	:	"SPACEseEN is a JavaScript library to animate 3D scene or experiment with canvases.",
		copyright	:	"Copyright (C) 2013 Konstantin Kirillov",
		license		:	"MIT except folder \"scenarios\" which have own licenses",
		version		:	"Version 0.0.80",
		date		:	"September 2, 2013."
	}
}) ();

( function () {
	var btb			= window.btb$		= window.btb$			|| {};		
	var graph		= btb.graph			= btb.graph				|| {};	
	var conf		= graph.conf		= graph.conf			|| {};
	var	conf3D		= conf.conf3D		= conf.conf3D			|| {};
	var usprite		= graph.usprite		= graph.usprite			|| {};
	var mstones 	= graph.mstones		= graph.mstones			|| {};
	var virt		= graph.virt		= graph.virt			|| {};
	var	lensT		= graph.lensTransformation	= graph.lensTransformation	|| {};
	var debby		= btb.debby			= btb.debby				|| {};
	var ifdeb;
	var $;
	var canvas_wrap					= null;
	var canvas						= null;
   	var master_context				= null;											//canvas.getContext('2d');
	var animation_scheduled;					
	var stop_animation_chain;					// puts state to "false" at first opportunity
	var neverRunAnimAgain;
	var stop_afer_tick;
	var runFlyer_flg;
	var scrHeight					= -1;		
    var	scrWidth					= -1;		
	graph.init = function ( requested_3D_navigator, foregrounds_ )
	{
			ifdeb			= btb.ifdeb;
			$				= window.jQuery;
			ifdeb( 'graph.init entered' );
			canvas_wrap = document.getElementById( 'canvas_wrap' );
			if( !canvas_wrap ) return;
			master_context = graph.master_context;
			if( !master_context )
			{
				canvas_wrap.style.display='none';
				ifdeb( 'graph.init: canvas-unaware browser: canvas is disabled.' );
				return;
			}
			graph.enabled = true;
			canvas = graph.canvas;
			stop_afer_tick = conf.stop_afer_tick;
			if( conf.disable_landing_loading_warning )
			{
				var ww = document.getElementById( 'loading' );
				if( ww ) ww.style.display = 'none';	
			}
			if( conf.min_width		) $( canvas ).css( 'min-width', conf.min_width );
			if( conf.min_height		) $( canvas ).css( 'min-height', conf.min_height );
			if( conf.body_overflow	) document.body.style.overflow = conf.body_overflow;
			if( conf.wrap_overflow	) canvas_wrap.style.overflow = conf.wrap_overflow;
			virt.can	= [];
			virt.con	= [];
			virt.ix		= 0;
			virt.mctx	= master_context;
			if( conf.virt === 'b' || conf.virt === 't' )
			{
				var wlen = conf.virt === 't' ? 2 : 1;
				for( var wi = 0; wi < wlen; wi++ )
				{
					var ww 			= document.createElement( 'canvas' );
					ww.width		= conf.vwidth;
					ww.height		= conf.vheight;
					virt.can[ wi ]	= ww;
					virt.con[ wi ]	= ww.getContext( '2d' );
				}
				virt.canvas			= virt.can[ 0 ];
				virt.ctx			= virt.con[ 0 ];
			}else{
				virt.can[ 0 ]	= canvas;
				virt.con[ 0 ]	= master_context;
				virt.canvas		= canvas;
				virt.ctx		= master_context;
			}
			window.requestAnimationFrame =
				window.requestAnimationFrame		||
		        window.webkitRequestAnimationFrame	||
		        window.mozRequestAnimationFrame		||
		        window.oRequestAnimationFrame		||
		        window.msRequestAnimationFrame		||
				timeoutAnimationFrame;
			graph.animation_is_allowed	= conf.animation_is_allowed;
			stop_animation_chain		= !graph.animation_is_allowed;
			neverRunAnimAgain			= false;
			runFlyer_flg				= conf.runFlyer;
			if( conf.in3D) lensT.init();
			graph.flyer.foregrounds = graph.flyer.foregrounds || foregrounds_;
			graph.flyer.init_sprites ();
			graph.flyer.rescale_virt();
			if( /c/.test( debby.core ) ) btb.deb( 'graph.conf=',  graph.conf );
			if( /C/.test( debby.core ) ) btb.saveObjectToServer( 'conf', graph.conf );
			graph.startTime	= null;
			throttledResize();
			if( conf.movingObserver )
			{
				$( document.body ).bind( 'keydown', requested_3D_navigator || graph.default_3D_navigator );
			}
			btb.bindEvents( 'resize',  window, throttledResize );
			if( conf.stop_on_click )
			{
				btb.bindEvents( 'click', document.body, function () {
						graph.animation_is_allowed = !graph.animation_is_allowed;
						return true;
					} 
				);
			}
			if( conf.usprite.suspendUserAutomoveAtActions )
			{
				btb.bindEvents( 'click', document.body, function () {
						usprite.startRunningTime = (new Date()).getTime() + conf.usprite.suspendUserAutomoveDuration;
						return true;
					} 
				);
				btb.bindEvents( 'keydown', document.body, function () {
						usprite.startRunningTime = (new Date()).getTime() + conf.usprite.suspendUserAutomoveDuration;
						return true;
					} 
				);
			}
			graph.mstones.ownMoveStopped = conf.startFromStopped;
			if( conf.never_let_internal_evol )
			{
				graph.mstones.ownMoveStopped = true;
			}else{
				if( conf.stop_own_move_on_click )
				{
					btb.bindEvents( 'click', document.body, function () {
							graph.mstones.ownMoveStopped = !graph.mstones.ownMoveStopped;
							return true;
						}
					);
				}
			}
			ifdeb( 'graph.init completed.' );
	}; 
	var timeoutAnimationFrame = function( callback,  element )
	{
		window.setTimeout( callback, conf.animationInterval );
	};
	var select_animator = function ( draw_and_reschedule )
	{
		animation_scheduled = true;
		if( conf.use_setTimeout )
		{
			timeoutAnimationFrame( draw_and_reschedule );				
		}else{
			requestAnimationFrame( draw_and_reschedule );
		}
	};
	graph.do_trigger_animation = function ( dodo )
	{
				if( dodo && !neverRunAnimAgain )
				{
					stop_animation_chain = false;
					if( !animation_scheduled )
					{
						select_animator( draw_and_reschedule );
					}
					if( canvas_wrap ) canvas_wrap.style.display = "block";
					ifdeb( 'Animation chain on' );
				}else{
					if( canvas_wrap ) canvas_wrap.style.display = "none";
					stop_animation_chain = true;
					ifdeb( 'Animation chain off. neverRunAnimAgain=' + neverRunAnimAgain );
				}
	};
	var mstonesDefault =
	{
		reinit : function ()
		{
			this.completedJustFirstFrame	= false;	
			this.afterFirstFrame		= false;
			this.turnEnterPassed		= false;
			this.pauseEnterPassed		= false;
			this.culminationEnterPassed	= false;
			this.turnExitPassed			= false;
			this.iterationExitPassed	= false;
			this.turnEnterEntered			= null;
			this.pauseEnterEntered			= null;
			this.culminationEnterEntered	= null;
			this.turnExitEntered			= null;
			this.iterationExitEntered		= null;
			this.inPausePhase				= null;
		}	
	};
	btb.paste_non_arrays( graph.mstones, mstonesDefault );
	var draw_and_reschedule = function ()
	{
		animation_scheduled			= false;
		if( stop_animation_chain )	return;
		if( !graph.animation_is_allowed )
		{
			select_animator( draw_and_reschedule );
			return;
		}
						if( graph.startTime === null )
						{
							graph.startTime		= conf.timeFromTicks ? 0 : (new Date()).getTime();
							mstones.ticks		= 0;
							mstones.pastTicks	= 0;
						}
						if( conf.timeFromTicks )
						{
							var time			= conf.tickTimeStep * mstones.ticks; 
						}else{
							var time			= (new Date()).getTime() - graph.startTime;
						var ww				= Math.floor( time / conf.playPeriod * conf.ticksPeriod );
							var ticks_change	= ww - mstones.pastTicks;
							mstones.ticks		= ww;
							effective_ticks		= mstones.ticks;
						}
						var effective_ticks		= mstones.ticks;
						var ticks_change		= mstones.ticks - mstones.pastTicks;
						mstones.pastTicks = mstones.ticks;
						/*
						if( time > 2000 )
						{
							c ccc( 'stopped' );
							return;
						}
						*/
						var wttp				= conf.turnTicksPoint;
						mstones.inPausePhase	= -1;
						if( wttp && mstones.ticks >= wttp )
						{
							var turnTime		= conf.tickTimeStep * wttp;
							var wpause			= conf.turnPonitPause;
							mstones.turnEnterEntered		= !mstones.turnEnterPassed;
							if( mstones.turnEnterEntered )	mstones.turnEnterPassed = true;
							if( wpause )
							{
								mstones.pauseEnterEntered = !mstones.pauseEnterPassed && mstones.turnEnterEntered;
								if( mstones.pauseEnterEntered )	mstones.pauseEnterPassed = true;
								mstones.inPausePhase	= ( time - turnTime ) / wpause;
								if( mstones.inPausePhase <= 1 )
								{
									effective_ticks = wttp;
									mstones.culminationEnterEntered			= !mstones.culminationEnterPassed && mstones.inPausePhase >= 0.5 ;
									if( mstones.culminationEnterEntered )	mstones.culminationEnterPassed = true;
								}else{
									mstones.turnExitEntered					= !mstones.turnExitPassed;
									if( mstones.turnExitEntered )			mstones.turnExitPassed = true;
									mstones.culminationEnterEntered			= !mstones.culminationEnterPassed;
									if( mstones.culminationEnterEntered )	mstones.culminationEnterPassed = true;
									mstones.inPausePhase					= -2;
									effective_ticks	= Math.floor( ( time - wpause ) / conf.playPeriod * conf.ticksPeriod );
								}
							}
						}else{
							mstones.turnExitEntered					= !mstones.turnExitPassed;
							if( mstones.turnExitEntered )			mstones.turnExitPassed = true;
							mstones.inPausePhase					= -2;
						}
		mstones.iterationExitEntered		= !mstones.iterationExitPassed && effective_ticks > conf.frozenTicksStart;
		if( mstones.iterationExitEntered )	mstones.iterationExitPassed = true;
		if( mstones.iterationExitPassed )
		{
							if( conf.runInfinitely )
							{
								if( conf.reinitAfterIteration )
								{
									mstones.reinit();
									graph.startTime	= null; 
									graph.flyer.init_sprites ();
									select_animator( draw_and_reschedule );
									return;
								}
							}else{
								effective_ticks = conf.frozenTicksStart;
								if( conf.stopAnimChainAfterIter )
								{
									stop_animation_chain = true;
									neverRunAnimAgain = true;
									ifdeb( 'Animation chain stopped after iter.' ); 
								}
							}
		}
		if( conf.clearEnd && mstones.iterationExitEntered ) graph.wipeOutMemory();
		mstones.effTicks = effective_ticks;
		mstones.time = time;
		var did_draw = graph.flyer.move_sprites( effective_ticks, time );
		if( did_draw )
		{
							if( conf.timeFromTicks ) mstones.ticks++;
							if( !mstones.completedJustFirstFrame && !mstones.afterFirstFrame )
							{
								mstones.completedJustFirstFrame = true;
								setCanvasVisible();	
							}else{
								mstones.afterFirstFrame = true;
								mstones.completedJustFirstFrame = false;
							}
							if( stop_afer_tick ) graph.animation_is_allowed = false;
		}
		select_animator( draw_and_reschedule ); 
	};
	var firstAnimationResetDone = false;
	graph.reset_animation = function ()
	{
			if( !canvas || !canvas_wrap || neverRunAnimAgain ) return;
			var wwe = document.documentElement;
			var wwb = document.body;
			if( conf3D.bigScreenWidthThreshold || conf3D.bigScreenHeightThreshold )
			{
				graph.fixLensTranScaleForBigScreens();
			}
			var $d = $(document);
			var $w = $(window);
			var ww_w = $w.width();
			var ww_h = $w.height(); 
			if( ww_w === scrWidth && ww_h === scrHeight ) return;
			scrWidth	= graph.scrWidth	= ww_w;
			scrHeight	= graph.scrHeight	= ww_h;
			graph.scrCenterX	= conf.screen_center_x !== null ?
					conf.screen_center_x :
					Math.floor(scrWidth/2);
			graph.scrCenterY	= conf.screen_center_y !== null ?
					conf.screen_center_y :
					Math.floor(scrHeight/2);
			if( conf.in3D )
			{
				var screenFocusX	= conf3D.screenFocusX || 0;
				var screenFocusZ	= conf3D.screenFocusZ || 0;
				var control = { center : [ graph.scrCenterX + screenFocusX, graph.scrCenterY + screenFocusZ ] };
				graph.lensTransformation.reset( { control : control });
			}
			if( conf.csize === 'f' )
			{
		    	new_width			= conf.cwidth	|| conf.vwidth;
		    	new_height			= conf.cheight	|| conf.vheight;
			}else if( conf.cCSS ) {
		    	new_width			= parseInt( $( canvas ).css( 'width' ) );
		    	new_height			= parseInt( $( canvas ).css( 'height' ) );
			}else{
				canvas_wrap.style.width		= scrWidth + 'px';
				if( !conf.preventCanvasAbsPos )
				{
					canvas_wrap.style.position	= 'absolute';
					canvas.style.position		= 'absolute';
				}
				canvas_wrap.style.left		= '0px';
				canvas_wrap.style.top		= '0px';
				canvas.style.left			= '0px';
				canvas.style.top			= '0px';
		    	new_width			= scrWidth;
		    	new_height			= scrHeight;
				if( conf.min_width && new_width < conf.min_width	) new_width = conf.min_width;
				if( conf.min_height && new_height < conf.min_height ) new_height = conf.min_height;
				$( canvas ).css( 'width', new_width );
				$( canvas ).css( 'height', new_height );
			}
			graph.resizeCanvasPreservingly( master_context, new_width, new_height );
			if( conf.virt !== 'b' && conf.virt !== 't'  )
			{
				graph.flyer.rescale_virt();
			}
			if( conf.reinitSpritesInResize )
			{
				graph.flyer.init_sprites (); 
			}	
			if( graph.startTime !== null )
			{
				conf.timeFromTicks ? 0 : (new Date()).getTime();
				mstones.ticks		= 0;		//	counts animation phase till the browser's death. Independent from window resizes.
				mstones.pastTicks	= 0;
			}
			graph.do_trigger_animation( !stop_animation_chain );
			ifdeb( 'graph.init: animation is reset.' );
	};
	var setCanvasVisible = function ()
	{
		$( canvas ).css( 'visibility', 'visible' );
		$( canvas ).css( 'display', 'block' );
		var bg_jq = $( '#canvasBgIm' );
		if( conf.unfadeBgImgTimeMs )
		{
			bg_jq.css( 'opacity', 0 );
			bg_jq.animate( { opacity : 1 }, { duration : conf.unfadeBgImgTimeMs } );	
		}
		bg_jq.css( 'visibility', 'visible' ); 
		bg_jq.css( 'display', 'block' );
	};
	var throttledResize = btb.throttledCallback( graph.reset_animation, 50 );
}) ();

( function () {
	var btb			= window.btb$		= window.btb$			|| {};		
	var graph		= btb.graph			= btb.graph				|| {};
	var conf		= graph.conf		= graph.conf			|| {};
	var	conf3D		= conf.conf3D		= conf.conf3D			|| {};
	var flyerConf	= conf.cflyer		= conf.cflyer			|| {};
	var virt		= graph.virt		= graph.virt			|| {};
	var	flyer 		= graph.flyer		= graph.flyer			|| {};
	var ifdeb		= btb.ifdeb;
	var tmpcanvas	= null;
	var tmpctx		= null;
	graph.spawn_config = function ( conf )
	{
			if( !conf.timeScale ) conf.timeScale = 1;
			if( !conf.frozenTicksStart && conf.frozenTicksStart !== 0 ) conf.frozenTicksStart = conf.ticksPeriod;
			conf.tickTimeStep = conf.ticksPeriod > 0 ? conf.playPeriod / conf.ticksPeriod : 1000;
			conf.animationInterval = Math.max( Math.floor( conf.tickTimeStep ), 20 );
			conf.ticksPerMsec = conf.ticksPeriod / conf.playPeriod;
			if( !conf.turnPonitPause ) conf.turnPonitPause = 0;
	}	
	graph.putText = function ( ctx, center_xx, center_yy, scale, vwidth, text )
 	{
		var cc			= ctx.canvas;
		var ww			= cc.width;
		var hh			= cc.height;
		var len			= text.length;
		if( !len )		return;
		var fontSize	= Math.ceil( vwidth / len * scale * 0.5 ) + 2;
		var offsetX		= center_xx - 0.25 * fontSize * len;
		var offsetY		= center_yy - fontSize;
		ctx.font = fontSize + 'px Arial';
		ctx.lineWidth = 1.0;
		ctx.fillStyle = 'rgba( 125, 125, 125, 0.2 )';
		ctx.fillText( text, offsetX, offsetY );
	};
	graph.resizeCanvasPreservingly = function ( ctx, new_width, new_height )
	{
		var canvas			= ctx.canvas;					
		var canvas_width	= canvas.width;
		var canvas_height	= canvas.height;
		if( canvas_width === new_width && canvas_height === new_height ) return;
		if( !graph.mstones.frameMemLoss || conf.virt === 'b' || conf.virt === 't' )
		{
	    	canvas.height		= new_height;
	    	canvas.width		= new_width;
			return;
		}
		if( !tmpcanvas )	
		{
			tmpcanvas		= document.createElement( 'canvas' );
			tmpctx			= tmpcanvas.getContext( '2d' );
		}
		if( conf.virt === 'v' )
		{
			graph.reframeResizedImage( canvas_width, canvas_height, new_width, new_height, canvas, canvas, ctx );
		}else{
			tmpcanvas.width		= canvas_width;
			tmpcanvas.height	= canvas_height;
			tmpctx.drawImage( canvas, 0, 0 );
    		canvas.height		= new_height;
    		canvas.width		= new_width;
			ctx.drawImage( tmpctx.canvas, 0, 0, canvas_width, canvas_height, 0, 0, new_width, new_height );
		}
	};
	graph.reframeResizedImage = function ( 
			beforeW, beforeH, afterW, afterH,
			from_canvas, to_canvas, to_context )
	{
		var sbW = beforeW / conf.vwidth;
		var sbH = beforeH / conf.vheight;
		var bS = Math.min( sbW, sbH );
		var saW = afterW / conf.vwidth;
		var saH = afterH / conf.vheight;
		var aS = Math.min( saW, saH );
		var nS = aS / bS;
		var newW = beforeW * nS;
		var newH = beforeH * nS;
		var offX = ( afterW - newW ) * 0.5;
		var offY = ( afterH - newH ) * 0.5;
		var doPreserve = conf.keepAtResize;	
		if( doPreserve )
		{
			tmpcanvas.width		= beforeW;
			tmpcanvas.height	= beforeH;
			tmpctx.drawImage( from_canvas, 0, 0 );
		}
		to_context.canvas.width = afterW;
		to_context.canvas.height = afterH;
		to_context.clearRect( 0, 0, afterW, afterH );
		/*
		c ccc(	"Transferring img when resizing canvas with kept ratio:\n" +
				'  bs, as, ns =' + bS + ', ' + aS + ', ' + nS + "\n" +
				'  before, after, virt = ' +
				beforeW + ', ' + beforeH + ', ' +  afterW + ', ' + afterH + ', ' + conf.vwidth + ', ' + conf.vheight + "\n" +
				'  offX, offY, nW, nH = ' + offX + ', ' + offY + ', ' + newW + ', ' + newH );
		*/
		if( !doPreserve ) return;
		to_context.drawImage(
			tmpcanvas,
			0, 0, beforeW, beforeH,
			offX, offY, newW, newH
		);
	};
	graph.scaleAndDrawMemoryCanvas = function ( inPausePhase, master_screen_scale, turnEnterPassed, ownTicks )
	{
			var vcanvas	= virt.canvas;
			var master_context = virt.mctx;
			var canvas	= master_context.canvas;
			var ww		= canvas.width;
			var wh		= canvas.height;
			var ww_v	= vcanvas.width;
			var wh_v	= vcanvas.height;
			var ww_off	= 0;
			var wh_off	= 0;
			var ww_new	= ww;
			var wh_new	= wh;
			var w_w		= ww / ww_v;
			var w_h		= wh / wh_v;
			if( !conf.noratio )
			{
				var wscale	= Math.min( w_w, w_h );
				var ww_new	= ww_v * wscale;
				var wh_new	= wh_v * wscale;
				var ww_off	= Math.max( 0, ( ww - ww_new ) * 0.5 );
				var wh_off	= Math.max( 0, ( wh - wh_new ) * 0.5 );
				var w_w		= wscale;
				var w_h		= wscale;
			}
			if( conf.virt === 'b' || conf.virt === 't' )
			{
				master_context.clearRect( 0, 0, ww, wh );
				master_context.drawImage(
					vcanvas,
					0, 0, ww_v, wh_v,
					ww_off, wh_off, ww_new, wh_new
				);
			}
			var fillTitleFrom = conf.cflyer && conf.cflyer.fillTitleFrom;
			if( turnEnterPassed || ( fillTitleFrom && fillTitleFrom > ownTicks )) 
			{
				graph.dsprite.drawPauseImage (
					inPausePhase,
					master_context,
					ww * 0.5,
					wh * 0.5,
					w_w * master_screen_scale,
					w_h * master_screen_scale,
					turnEnterPassed,
					ownTicks
				);
			}
	};	
	graph.wipeOutMemory = function ()	
	{
			var wctx			= virt.ctx;
			var curA			= virt.drawArea;
			var bgRefillColor	= flyerConf.bgRefillColor;
			if( flyer.backgroundImageData )
			{
				wctx.putImageData( flyer.backgroundImageData, 0, 0 )
			}else if( bgRefillColor ) {
				wctx.fillStyle = bgRefillColor;
				wctx.fillRect( 0, 0, curA.sizeX, curA.sizeY );  
			}else if( bgRefillColor !== null ) {
				wctx.clearRect( 0, 0, curA.sizeX, curA.sizeY );
			}
	};
	graph.removeLoadingMsg = function ()
	{
		var ww = document.getElementById( 'loading-wrap' );
		if( ww ) ww.style.display = 'none';
		ifdeb( '"loading ... " warning is removed ' );
	};
	graph.default_3D_navigator = function ( event )
	{
					var control = {};
					var handled = false;
					if( event.altKey ) return true;
					if( event.ctrlKey )
					{
						switch ( event.keyCode )
						{
							case 38	:	control.moveY = conf.movingObserverStepY	//'forward',
										handled = true;
										break;
							case 40	:	control.moveY = -conf.movingObserverStepY	//'backward',
										handled = true;
										break;
						}
					}else{
						switch ( event.keyCode )
						{
							case 37	: control.moveX = -conf.movingObserverStepX	//'left',
										handled = true;
										break;
							case 38	: control.moveZ = conf.movingObserverStepZ	//'up',
										handled = true;
										break;
							case 39	: control.moveX = conf.movingObserverStepX	//'right',
										handled = true;
										break;
							case 40	: control.moveZ = -conf.movingObserverStepZ	//'down',
										handled = true;
										break;
						}
					}
					if( handled )
					{
						var lens = graph.lensTransformation.reset( control );
						return false;
					}
					return true;
	};
	graph.non_priority_3D_navigator = function ( event )
	{
					var conf3D		= conf.conf3D;
					var arg			= {};
					var control		= arg.control = {};
					var handled		= false;
					var pass_event	= true;
					if( event.altKey ) return true;
					if( event.shiftKey )
					{
						switch ( event.keyCode )
						{
							case 38	:	control.moveY = conf3D.movingObserverStepY	// 'forward',
										pass_event = false;
										handled = true;
										break;
							case 40	:	control.moveY = -conf3D.movingObserverStepY	// 'backward',
										pass_event = false;
										handled = true;
										break;
						}
					}else{
						switch ( event.keyCode )
						{
							case 37	:	control.moveX = -conf3D.movingObserverStepX	//'left',
										pass_event = false;
										handled = true;
										break;
							case 39	:	control.moveX = conf3D.movingObserverStepX	//'right',
										pass_event = false;
										handled = true;
										break;
						}
					}
					if( handled )
					{
						var lens = graph.lensTransformation.reset( arg );
					}
					return pass_event;
	};
	graph.priority_3D_navigator = function ( event )
	{
			var conf3D		= conf.conf3D;
			var arg			= {};
			var control		= arg.control = {};
			var handled		= false;
			var pass_event	= true;
			if( event.altKey ) return true;
			if( event.ctrlKey )		//	Apparently "Mac. Lion" takes away Ctro+arrow up.
			{
			}else if( event.shiftKey ) {
						switch ( event.keyCode )
						{
							case 38	:	control.moveZ = conf3D.movingObserverStepZ	//'up',
										pass_event = false;
										handled = true;
										break;
							case 40	:	control.moveZ = -conf3D.movingObserverStepZ	//'down',
										pass_event = false;
										handled = true;
										break;
						}
			}else{
						switch ( event.keyCode )
						{
							case 38	:	control.moveY = conf3D.movingObserverStepY	// 'forward',
										pass_event = false;
										handled = true;
										break;
							case 40	:	control.moveY = -conf3D.movingObserverStepY	// 'backward',
										pass_event = false;
										handled = true;
										break;
							case 37	:	control.moveX = -conf3D.movingObserverStepX	//'left',
										pass_event = false;
										handled = true;
										break;
							case 39	:	control.moveX = conf3D.movingObserverStepX	//'right',
										pass_event = false;
										handled = true;
										break;
						}
			}
			if( handled )
			{
					var lens = graph.lensTransformation.reset( arg );
			}
			return pass_event;
	};
	graph.fixLensTranScaleForBigScreens = function ()
	{
		var width		= $(window).width();
		var height		= $(window).height();
		var scale		= conf3D.scale;
		var ww			= conf3D.bigScreenWidthThreshold;
		var scaleW		= ww && ww < width ? scale * width / ww : scale;
		var ww			= conf3D.bigScreenHeightThreshold;
		var scaleH		= ww && ww < height ? scale * height / ww : scale;
		var scaleR		= Math.ceil( Math.max( scaleW, scaleH ) );
		if( scaleR		> scale )
		{
			graph.lensTransformation.reset( { conf3D : { scale : scaleR } } );
		};
	};
}) ();

( function () {
	var	btb		= window.btb$		= window.btb$			|| {};		
	var	graph	= btb.graph			= btb.graph				|| {};
	var	conf	= graph.conf		= graph.conf			|| {};
	graph.beforeit_init_afterit = function( app_3D_navigator_, wforegrounds_ )
	{
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
		graph.init( app_3D_navigator_, wforegrounds_ );
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
					canvas_wrap_jq.css( 'opacity', 0 );
					canvas_wrap_jq.animate({ opacity : 1 }, conf.landingSplashDuration );
					$( '#canvas_wrap' ).css( 'display', 'block' );
					canvas_wrap_jq.css( 'visibility', 'visible' );
				}
				$( '#canvas_wrap' ).css( 'display', 'block' );
				$( '#canvas_wrap' ).css( 'visibility', 'visible' );
		}
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
				var throttledResize = btb.throttledCallback( synchronizeBgImg );
				btb.bindEvents( 'resize',  window, throttledResize );
			}
		}
	};
}) ();

( function () {
	var	btb				= window.btb$		= window.btb$			|| {};		
	var	graph			= btb.graph			= btb.graph				|| {};
	var conf			= graph.conf		= graph.conf			|| {};
	var debby			= btb.debby			= btb.debby				|| {};
	var ifdeb			= btb.ifdeb;
	var qKeyPars		= btb.getQueryKeyPairs( 'integrify' );
	$( function () {
		if( /d/.test( debby.core ) ) btb.deb( btb.detected );
		var ww = [ 'canvasFgIm', 'java-script-disabled', 'content', 'scrollee', 'menu' ];
		for( var ii = 0; ii < ww.length; ii++)
		{
			var wEl = document.getElementById( ww[ ii ] );
			if( wEl ) wEl.style.visibility = 'hidden'; // display = 'none';	
		}	
		var wpaste = btb.paste_non_arrays;
		wpaste( graph.conf, wpaste( graph.generic_conf, graph.conf ) );
		graph.spawn_config( graph.conf );
		if( graph.capturer && graph.capturer.conf ) wpaste( graph.conf, graph.capturer.conf );
		var www = {};
		btb.each( qKeyPars, function ( key, value ) {
			if( key.indexOf( 's_' ) === 0 ) www[ key ] = key;
		});
		btb.each( www, function ( key, value ) {
			delete qKeyPars[ key ];
		});
		wpaste( graph.conf, qKeyPars );
		if( graph.conf.toggle_draw_on_click || graph.conf.toggle_draw_on_click === 0 )
		{
			graph.conf.stop_on_click = graph.conf.toggle_draw_on_click;
		}
		var confImgToLoad = btb.paste_non_arrays( {}, conf.imagesToLoad );
		/*
		if( btb.canvasEnabled )
		{
				if( conf.basic_images_to_load )
				{
					confImgToLoad ... conf.basic_images_to_load.singleLoaded = function( ix, sprite )
					{
						ifdeb( 'image ' + ix + ' loaded; sprite.name = ' + sprite.name );
					};
					confImgToLoad ... conf.basic_images_to_load.allLoaded = function( lman )
					{
						firePostAnimation();
						ifdeb( 'all basic images digested' );
					};
					load_images.load( conf.basic_images_to_load );
				}
				if( conf.images_to_load )
				{
					load_images.load( conf.images_to_load );
				}
		}	
		*/
		if( !conf.doSplashOnImgLoad )
		{
			var endOfImgLoadCallback = null;
		}else{
			var endOfImgLoadCallback = function()
			{
				ifdeb( 'onload-img splash-scenario began' );
				var can_jq = $( '#canvas_wrap' );
				var men_jq = $( '#menu' );
				var scrollee_jq = $( '#scrollee' );
				if( conf.landingSplashDuration )
				{
					can_jq.css( 'opacity', 0 );
					can_jq.animate({ opacity : 1 }, conf.landingSplashDuration );
					men_jq.css( 'opacity', 0 );
					men_jq.animate({ opacity : 1 }, conf.landingSplashDuration );
					scrollee_jq.css( 'opacity', 0 );
					scrollee_jq.animate({ opacity : 1 }, conf.landingSplashDuration );
					ifdeb( 'splash-animation began' );
				}
				can_jq.css( 'display', 'block' );
				can_jq.css( 'visibility', 'visible' );
				men_jq.css( 'visibility', 'visible' );
				scrollee_jq.css( 'visibility', 'visible' );
				$( '#img_menu_selector' ).css( { visibility : 'visible' } );
				men_jq.css(			'display', 'block' );
				scrollee_jq.css(	'display', 'block' );
				graph.removeLoadingMsg ();
				ifdeb( 'onload-img splash-scenario completed' );
			};
		}	
		graph.load_images.groupsLoader.run( confImgToLoad, function () {
			ifdeb( "Notified to onload: all image groups are loaded" );
			if( endOfImgLoadCallback ) endOfImgLoadCallback();
		});
		var wWait = !!graph.load_images.groupsLoader.loadsN;
  		graph.animatorWaitsForImgLoad = conf.animatorWaitsForImgLoad && wWait;
  		graph.sceneRunnerWaitsForImg = conf.sceneRunnerWaitsForImg && wWait;
		graph.scenario.run();
		if( ( !graph.animatorWaitsForImgLoad && !graph.sceneRunnerWaitsForImg && !conf.doSplashOnImgLoad ) || !conf.keepLoadingMsgTillImgLoad )
		{
			graph.removeLoadingMsg ();
		}else{
			ifdeb( '"loading ... " warning will be removed later ' );
		}
		btb.bindEvents (
			'keydown',
			document.body,
			function ( arg )
			{
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
	}); 
	( function () {
		if( qKeyPars.captured )
		{
			var script		= document.createElement( 'script' );
			script.type		= 'text/javascript';
			script.async	= false;
			script.src		= 'js/captured' + qKeyPars.captured + '.js';
			delete qKeyPars.captured
			var ss = document.getElementsByTagName( 'script' )[ 0 ];
			ss.parentNode.insertBefore( script, ss );
		}
	}) ();
}) ();

( function () {
						window.btb$			= window.btb$			|| {};		
	var graph		=	window.btb$.graph	= window.btb$.graph		|| {};
	graph.generic_conf =
	{
		in3D					: null,		
		itemsMax				: null,
		backwardInTime			: null,
		runInfinitely			: null,	
		reinitAfterIteration	: null,
		reinitSpritesInResize	: true,
		playPeriod				: 10000,
		ticksPeriod				: 10000,	
		turnTicksPoint			: null,		
		turnPonitPause			: null,		
		use_setTimeout			: false,	
		timeFromTicks			: false, 	
		timeScale				: 1,		
		dontDrawAfterPeriod		: null,
		drawFromBTAfterStopped	: null,		
		stopAnimChainAfterIter	: null,
		unfadeBgImgTimeMs		: 1000,		
		frozenTicksStart		: null,		
		keepAtResize			: true,		
		insertFMemBefore		: null,		
		memLoss					: null,		
		leftMemorySensor		: null,		
		critPointmemLoss		: null,	 	
		clearEnd				: null,		
		memClearAt0				: null,		
		picClearAt0				: null,		// don't draw flyer's sprites at middle-culmination-event;
		picClearAtEnd			: null,		// don't draw flyer's sprites at interation-end-event;
		picClearInPause			: null,
		pictFadeInPause			: null,		
		spaceTransf				: null,		// true does resort to browser's native context transformations
		keepLoadingMsgTillImgLoad	: true,
		cBgColor				: null,		// 'transparent', ... 
		csize					: '',		// 'f'	for fixed: use cwidth and and cheight for canvas size
		cwidth					: 700,		
		cheight					: 400,		
		canvasHeightToWidth		: null,
		underCanvasInSync		: null,		
		vwidth					: 700,		
		vheight					: 400,		
		virt					: null,		
		noratio					: false,	// false	-	keeps ratio proportionally when putting image from virt='m' to canvas,
		preventCanvasAbsPos		: null,		
		cCSS					: null,		// if truthful and not csize === 'f', follow canvas.style CSS.
		min_width				: null,		
		min_height				: null,		
		body_overflow			: '',		// 'hidden',
		wrap_overflow			: '',		// 'hidden',
		animation_is_allowed	: true,		// "false" does "kill" animation "thread"
		screen_center_x			: null,
		screen_center_y			: null,
		stop_on_click			: false,	//	TODM misleading name; must be "toggle drawing frames on click";
		toggle_draw_on_click	: null,		
		stop_afer_tick			: null,		//	TODM misleading name; must: idlify "animation thread" till toggling the thread
		never_let_internal_evol : null,
		stop_own_move_on_click	: null,		
		startFromStopped		: null,		
		disable_landing_loading_warning : true,
		doSplashOnImgLoad		: null,
		landingSplashDuration	: 1000,		
		runFlyer				: null,
		rerandom				: null,	
		scaffold				: null,	// '', puts sign, scaffold on result canvas
		grainsNumber			: null,
		conf3D :
		{
			domCarousel	:
			{
				on					: null,
				placement			: 'vertical',
				arrangement			: 'circle',
				radius				: 500,
				distance			: 500,
				stepY				: 10
			},
			putItemsToCircleR		: 500,
			boxCenterX				: 0,
			boxCenterY				: 0,
			boxCenterZ				: 0,
			originY					: 900,
			originYMax				: 1900, 
			originYMin				: 0,
			xMax					: 120,
			xMin					: -120,
			zMax					: 200,
			zMin					: -200,
			fromObserverYMin		: 5,
			fromObserverYMax		: 11200,
			movingObserverStepX		: 5,
			movingObserverStepY		: 5,
			movingObserverStepZ		: 5,
			boundaryProtectionDisabled : true,	// "Don't set this to ''false'' unless badly short on resources"
			scale					: 1000,	
			generate_backg_img			: false,
			bigScreenWidthThreshold		: null, 
			bigScreenHeightThreshold	: null	
		},
		animatorWaitsForImgLoad : true,
		sceneRunnerWaitsForImg	: true,
		cflyer					: { dconf : {} },
		usprite					: {},
	imagesToLoad :
	[
		{
			name			: 'load3DImg',
			mode			: '',	//	'single',
			path			: '',
			template		: '',
			ext				: '',
			count			: null,
			names			: []
		},
		{
			name			: 'load2DImg',
			mode			: '',	//	'single',
			path			: '',
			template		: '',
			ext				: '',
			count			: null,
			names			: []
		},
		{
			name			: 'loadCustomImg',
			mode			: '',	//	'single',
			path			: '',
			template		: '',
			ext				: '',
			count			: null,
			names			: []
		},
		{
			name			: 'imgBgScenario',
			mode			: '',	//	'single',
			path			: '../../../../img/nebulae/bgImg.jpg',
			template		: '',
			ext				: '',
			count			: null,
			names			: []
		}
	/*
	,
	{
		name				: 'customExample',
		mode				: 'single',
		path				: 'img/ctn/content-sprites.jpg',
		template			: '',			
		ext					: '',			
		count				: null,			
		names				: [ ],			
		postLoadAnimationDuration : null,	// ms, fires up animation which is preset in "run-onload";
		allLoadedDewarning	: null,			
		declipify			:				
		{
			templified :
			[	
				{
					main : [ 8, 12, 412, 220 ],
					children :
					[
						[ 8, 669, 284, 835 ],
						[ 297, 670, 570, 834 ],
						[ 581, 672, 838, 826 ]
					]
				},
				{
					main : [ 422, 10, 827, 222 ],
					children :
					[
						[ 8, 841, 284, 1009 ],
						[ 292, 842, 569, 1009 ],
						[ 575, 842, 847, 1010 ]
					]
				},
				{
					main : [ 6, 235, 410, 442 ],
					children :
					[
						[ 8, 669, 284, 835 ],
						[ 297, 670, 570, 834 ],
						[ 581, 672, 838, 826 ]
					]
				},
				{
					main : [ 422, 234, 824, 442 ],
					children :
					[
						[ 8, 841, 284, 1009 ],
						[ 292, 842, 569, 1009 ],
						[ 575, 842, 847, 1010 ]
					]
				},
				{
					main : [ 7, 452, 408, 660 ],
					children :
					[
						[ 8, 669, 284, 835 ],
						[ 297, 670, 570, 834 ],
						[ 581, 672, 838, 826 ]
					]
				},
				{
					main : [ 420, 453, 824, 660 ],
					children :
					[
						[ 8, 841, 284, 1009 ],
						[ 292, 842, 569, 1009 ],
						[ 575, 842, 847, 1010 ]
					]
				}
			],
			named :
			{	
				"expoF-left-img-btb"			: [ 8, 12, 412, 220 ],
				"expoF-0-right-sub-img-btb"		: [ 8, 669, 284, 835 ],
				"expoF-1-right-sub-img-btb"		: [ 297, 670, 570, 834 ],
				"expoF-2-right-sub-img-btb"		: [ 8, 669, 284, 835 ]
			}
		} 
	}, 
	{
		mode				: 'basic_images_to_load',
		path				: 'img/basic-sprites-transp.png',
		template			: '',
		ext					: '',
		count				: null,
		names				: [ ],
		allLoadedDewarning	: true,
		postLoadAnimationDuration : 5000,
		declipify			:
		{
			named :
			{	
				"logo-btb"							: [ 458, 1, 706, 80 ],
				"banner-img-btb"					: [ 15, 116, 412, 483 ],
				"banner-button-img-id-btb"			: [ 7, 5, 208, 70 ],
				"banner-button-hover-img-id-btb"	: [ 212, 4, 414, 70 ],
				"under-banner-filler-img-btb"		: [ 15, 116, 415, 196 ]
			}
		}
	} 
	*/
	],
		dummyNoCommaAfter		: 2
	};
}) ();

( function () {
	var conf;
	var btb;
	( function () {
			btb			= window.btb$		= window.btb$		|| {};		
			var graph	= btb.graph			= btb.graph			|| {};
			conf		= graph.conf		= graph.conf		|| {};
	}) ();
	var default_conf =
	{
		itemsMax				: 9,
		backwardInTime			: true,
		runInfinitely			: false,
		playPeriod				: 8000,
		ticksPeriod				: 400,
		turnTicksPoint			: 400,
		turnPonitPause			: 0,		
		dontDrawAfterPeriod		: false,
		keepAtResize			: true,
		memLoss					: 0.4,
		leftMemorySensor		: 0.98,
		critPointmemLoss		: 0.8,
		clearEnd				: 0,
		memClearAt0				: 0,
		spaceTransf				: false,
		csize					: '',
		cwidth					: 700,
		cheight					: 400,
		vwidth					: 700,
		vheight					: 400,
		virt					: 't',
		noratio					: false,
		cCSS					: 1,
		min_width				: '',
		min_height				: '',
		body_overflow			: '',
		wrap_overflow			: '',
		animation_is_allowed	: true,
		use_setTimeout			: false,
		doSyncTime				: true,
		screen_center_x			: null,
		screen_center_y			: null,
		stop_on_click			: false,
		stop_afer_tick			: false,
		disable_landing_loading_warning : true,
		landingSplashDuration	: 1000,
		runFlyer		: true,
		rerandom				: 1,
		scaffold				: ''
	}; 
	btb.paste_non_arrays( conf, btb.paste_non_arrays( default_conf, conf ) );
}) ();

( function () {
	var btb			=	window.btb$		= window.btb$		|| {};
	var graph		=	btb.graph		= btb.graph			|| {};
	var conf		=	graph.conf		= graph.conf		|| {};
	var dsprite		=	graph.dsprite	= graph.dsprite		|| {};
	var	flyer		=	graph.flyer		= graph.flyer		|| {};
	var wcflyer		=	conf.cflyer		= conf.cflyer		|| {};
	var dconf		=	wcflyer.dconf	= wcflyer.dconf		|| {};
	var mstones		=	graph.mstones	= graph.mstones		|| {};
	var capturer	=	graph.capturer	= graph.capturer	|| {};
	var primaryDConf = 
	{
			doRadialGradient	: false,
			fillSprites				: false,	
			titlePosX			: -350,
			titlePosY			: 200,
			swap_gradients		: 1,		
			startColorA			: 1,
			endColorA			: 1,
			colorUpperBound		: 255,		
			alphaUpperBound		: 1,		
			culmColorUpperBound	: 255,		
			culmAlphaUpperBound	: 1,		
			colorLowBound		: 120,
			pauseExtendedStart	: 100,		
			addCulStartToPause	: 50		
	}
	var shape_paths				= primaryDConf.shape_paths		= [];
	var shape_functions			= primaryDConf.shape_functions	= [];
	var start_colors			= primaryDConf.start_colors		= [];
	var hsl_start_colors		= primaryDConf.hsl_start_colors	= [];
	var linear_gradients		= primaryDConf.linear_gradients	= [];
	var rad_gradients			= primaryDConf.rad_gradients	= [];
	var startup_rr_r0			= primaryDConf.startup_rr_r0	= [];
	( function build_shapes () {
		var _W			= 0;	
		var masterBT	= 0;	
		var masterWordX	= -200;	
		var dataWordX	= 68;	
		var bTT			= 90;	
		var bT			= 93;	
		var bM			= 143;	
		var bMU			= 109;
		var bML			= 118;
		var bB			= 166;	
		var shapes		= [];
		shapes[ _W ]	=
		[
			 68, bT,
			 88, bT,
			 88, bM,
			113, bT,
			130, bT,
			130, bM,
			155, bT,
			173, bT,
			138, bB,
			138, bB,
			116, bB,
			119, bML,
			 92, bB,
			 71, bB
		];
		var _h				= 1;
		shapes[ _h ]	=
		[
			188, bTT,
			204, bTT,
			198, 117,
			221, 110,	
			233, 122,	
			223, bB,
			206, bB,
			215, 128,
			209, 123,
			196, 126,
			186, bB,
			170, bB
		];
		var _i_dot			= 2;
		shapes[ _i_dot ]	=
		[
			259, bTT,
			276, bTT,
			273, 104,
			256, 104
		];
		var _i_leg			= 3;
		shapes[ _i_leg ]	=
		[
			254, 112,
			270, 112,
			257, bB,
			240, bB
		];
		var _r			= 4;
		shapes[ _r ]	=
		[
			288, 112,
			304, 112,
			302, 120,
			316, 113,
			326, 112,
			322, 129,
			307, 128,
			300, 130,
			291, bB,
			274, 166
		];
		var _l			= 5;
		shapes[ _l ]	=
		[
			342, bTT,
			360, bTT,
			341, bB,
			324, bB
		];
		var _i2_dot			= 6;
		shapes[ _i2_dot ]	=
		[
			378, bTT,
			394, bTT,
			391, 104,
			374, 104
		];
		var _i2_leg			= 7;
		shapes[ _i2_leg ]	=
		[
			372, 112,
			388, 112,
			374, bB,
			358, bB
		];
		var _o				= 8;
		shapes[ _o ]	=
		[
			410, 116,
			414, 113,
			422, 110,
			436, 110,
			450, 116,
			456, 128,
			452, 152,
			435, 166,
			419, 170,
			405, 166,
			398, 159,
			394, 146,
			398, 128,
			407, 118,
			416, 128,
			412, 140,
			413, 152,
			421, 157,
			430, 155,
			436, 146,
			438, 133,
			435, 124,
			426, 122,
			420, 125
		];
		var xShift	= masterWordX - dataWordX;
		var yShift	= masterBT - bT;
		var groups	= 2;	
		for( var ii = 0, len = shapes.length; ii < len; ii++ )
		{
			var shapesP = shapes[ ii ];
			var paths = shape_paths[ ii ] = [];
			for( var point = 0, lenp = shapesP.length / groups; point < lenp; point++ )
			{
				var ix = point * groups;
				paths[ point ]		=	paths[ point ] || {};
				paths[ point ].x	=	shapesP[ ix		] + xShift;
				paths[ point ].y	=	shapesP[ ix + 1	] + yShift;
			}
			var wmiddle = Math.floor( paths.length / 2 );
			var ww = startup_rr_r0[ ii ] = paths[ wmiddle ].x; 
			for( var point = 0, lenp = paths.length; point < lenp; point++ )
			{
				paths[ point ].x	-=	ww;
			}
		}
	}) (); 
	rad_gradients[ 0 ] =
	{
				R					: 10,
				X					: 0,
				Y					: 80
	};
	rad_gradients[ 1 ] =
	{
				R					: 160,
				X					: 0,
				Y					: 80
	};
	linear_gradients[ 0 ] =
	{
				X					: 0,
				Y					: 80
	};
	linear_gradients[ 1 ] =
	{
				X					: 0,
				Y					: -20
	};
	btb.paste_non_arrays( dconf, btb.paste_non_arrays( primaryDConf, dconf ) );
	dsprite.prepareConfig = function ( loaded_sprites )
	{ 
			var start_colors = dconf.start_colors;
			if(	( capturer.conf && !flyer.iteration ) || ( flyer.iteration && !conf.rerandom ) ) return;
			for( var ii = 0; ii < conf.itemsMax; ii++ )
			{
				start_colors[ii] =
				[
					{ 
						c0	: 255,
						amp : 200	* ( 1 + 2 * Math.random() ),
						vv	: 0.5	* ( 1 + 2 * Math.random() )		
					},
					{ 
						c0	: 255,
						amp : 150	* ( 1 + 2 * Math.random() ),
						vv	: 0.3	* ( 1 + 2 * Math.random() )
					},
					{ 
						c0	: 255,
						amp : 100	* ( 1 + 2 * Math.random() ),
						vv	: 0.2	* ( 1 + 2 * Math.random() )
					}
				]
 			};
			capturer.increaseCounter();
	};
}) ();

( function () {
	var btb;
	var conf;
	( function () {
		btb		= window.btb$		= window.btb$		|| {};
		var graph	= btb.graph			= btb.graph			|| {};
		conf		= graph.conf		= graph.conf		|| {};
	}) ();
	var confFlyer	= conf.cflyer		= conf.cflyer		|| {};
	var primaryFlyer =
	{			
			insert3DSceneBeforeIx1 : null,	
			fillSprites			: true,	
			fillFrom			: null, 
			fillTitleFrom		: null, 
			sparkRange			: 0,	// "in pixels"
			uniform_delay		: false,
			bgRefillColor		: '#000000',	
			pauseImageStays		: null,
			sprites_seed :
			{
				common_ff : { f0 : 0, vv : 0 },
				rr : { ra : 150, vv : 1.5, f0 : 0, r0 : null },
				cc : { f0 : 0, vv : 0 },
				ff : { f0 : 0.0, vv : -1.5 },
				ss : { sa : 10, vv : 0.015, f0 : 0, s0 : 1.0 },
				randomizer :
				{
					rr :
					{
							ra :
							{
								base : 0.8,
								factor : 0.4, 
							},
							vv : 
							{
								base : -0.5, 
							}
					},
					cc :
					{	
						vv : 
						{
							factor : 1,
							base : -0.5, 
						}
					},
					ff :
					{	
						vv :
						{
							base : 0.4,
							factor : 0.8, 
						}
					},
					ss :
					{ 
						sa :
						{
							base : 1.0,
							factor : 0.4, 
						},
						vv :
						{
							base : 0.5,
							factor : 1.0 
						}
					}
				} 
		} 
	};
	primaryFlyer.seeds = [];
	btb.paste_non_arrays( confFlyer, btb.paste_non_arrays( primaryFlyer, confFlyer ) );
}) ();

( function () {
	var scenario;	
	var graph;
	( function () {
			var btb		= window.btb$		= window.btb$			|| {};		
			graph		= btb.graph			= btb.graph				|| {};
			scenario	= graph.scenario	= graph.scenario		|| {};
	}) ();
		scenario.run = function () {
			graph.beforeit_init_afterit();
		};
}) ();

( function () {
		var btb = window.btb$;
		if( !btb ) return;
		var gapps =
		{
			enabled		: true,	
			gaVERSION	: '2012',	
			forbidden_subpaths			: [ "/a1/", "metap/apps/", "/feat", "/bil" ],
			forbidden_host_names	: [ 'localhost' ],
			hosts			:
			{
				'landkey.net'	:
				{ 
						'_setAccount'		: 'UA-26834667-1'
				},
				'landkey.org'	:
				{ 
						'_setAccount'		: 'UA-26834667-3'
				},
				'boardspirator.herokuapp.com'	:
				{
						'_setAccount'		: 'UA-26834667-4'
				},
				'boardspirator.com'	:
				{
						'_setAccount'		: 'UA-26834667-5'
				},
				'whirlio.com'	:
				{
						'_setAccount'		: 'UA-40278788-1',
						gaVERSION			: '2013'
				}
			}
		};
		gapps.host		= gapps.hosts[ btb.effective_hostname_without_www ] || gapps.hosts[ 'landkey.net' ];
		gapps.gaVERSION	= gapps.host.gaVERSION || gapps.gaVERSION;
		var ww = window.location.pathname.toLowerCase();
		btb.each( gapps.forbidden_subpaths, function( dummy, subpath ) { 
			if(	ww.indexOf( subpath ) > -1 )
			{
				btb.ifdeb( 'Google is disabled for subpath = ' + subpath );
				gapps.enabled = false;
			}
		});
		btb.each( gapps.forbidden_host_names, function( dummy, host ) {
			if(	btb.effective_hostname_without_www.indexOf( host ) > -1 )
			{
				btb.ifdeb( 'Google is disabled for host = ' + host );
				gapps.enabled = false;
			}
		});
		if( !gapps.enabled ) return;
		if( gapps.gaVERSION === 'ga2013' )
		{
			  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			  ga('create', gapps.host['_setAccount'], 'whirlio.com');
			  ga('send', 'pageview');
		}else{
		    var _gaq = window._gaq = window._gaq || [];
		    _gaq.push([    '_setAccount',   gapps.host['_setAccount'] ]);
		    _gaq.push(['_trackPageview']);
		    (function() {
				var ga = document.createElement('script');
				ga.type = 'text/javascript';
				ga.async = true;
				ga.src = ('https:' == document.location.protocol ?
								'https://ssl' : 
								'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(ga, s);
		    })();
		}
}) ();

