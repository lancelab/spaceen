( function () {
	var btb						= window.btb$ = window.btb$ || {};
    var CALLS_LIMIT				= 1000;
	var TRUNCATE_STRING_TO		= 200000;
    var SIZE_LIMIT				= 50000;
    var LEVEL_LIMIT				= 10;
	var DEFAULT_DEBUG_WINDOW_ID	= 'tpdebug';	
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
	var getQueryPar = function( key )
	{
			var ww = window.location.search;
			var re = new RegExp('(?:&|\\?)'+key+'(?:=([^&]*))*(?:&|$)');
			ww = ww.match( re );
			if( !ww ) return false;
			if( !ww[1] ) return true;
			return decodeURIComponent( ww[1] );
	};
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
				rr += (j ? ii : '' ) + ww;
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
	btb.debugflag = getQueryPar( 'debug' );
	btb.ifdeb = function () { if( btb.debugflag ) btb.deb.apply( this, arguments ) };
	var debc = btb.debc =
		(	c_onsole_log &&	( function () { for( var ii = 0; ii <arguments.length; ii++) console.log( arguments[ ii ] ); } )	)	||
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
					for( var p in ob )
					{
						if( ob.hasOwnProperty( p ) )
						{
							ret = fun( p, ob[ p ] );
							if( ret !== undefined && !ret ) break; 
						}
					}
				}
			}
			return ob;
		}
		btb.throttledCallback = function ( callback_at_the_end )
		{
				var reset_delay_flag = null;
				var wrapper = function ()
				{
					reset_delay_flag = null;
					callback_at_the_end();
				};
				return ( function () {
					if( reset_delay_flag !== null )
					{
						window.clearTimeout( reset_delay_flag );
					}
					reset_delay_flag = setTimeout( wrapper, 10 );
				});
		};
	btb.bindEvent = function ( eventName, element, callback ) 
	{
		if ( element.addEventListener )
		{
			element.addEventListener( eventName, callback, false );
		}else if ( element.attachEvent ) {
			elem.attachEvent( "on" + eventName, callback );
		}
	};
	btb.pasteRef = function ()
	{
		var wall = arguments[ 0 ] || {};
		for( var ii = 1, len = arguments.length; ii < len; ii++ )
		{
			var ob = arguments[ ii ];
			if( !ob || typeof ob !== 'object' ) continue;
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
	var pasteNonArrayClonedTree = btb.pasteNonArrayClonedTree = function ()
	{
		var wall = arguments[ 0 ] || {};
		for( var ii = 1, len = arguments.length; ii < len; ii++ )
		{
			var ob = arguments[ ii ];
			if( !ob || typeof ob !== 'object' ) continue;
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
	btb.getQueryKeyPairs = function( integerify )
	{
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
					token = token.replace( '~', '=' );
					var numerify = 'f';
				}
			}
			btb.propertify( pairs, token, convert_URI_Value, numerify );
		}
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
		var self; 
		( function () {
			var btb		= window.btb$				= window.btb$				|| {};		
			var graph	= btb.graph					= btb.graph					|| {};
			self		= graph.lensTransformation	= graph.lensTransformation	|| {};
		}) ();
		var flgPERSPECTIVE	= self.flgPERSPECTIVE=0;
		var flgISOMETRY		= self.flgISOMETRY=1;
		var flg				= self.flg = flgPERSPECTIVE;
		var center			= self.center = [100,100];	
		var scale			= self.scale = 100;			
		var originY		= self.originY = 100;		
		var originX			= 0;						
		var originZ			= 0;	
		var originYMax		= null;
		var originYMin		= null;
		var xMax			= null;
		var xMin			= null;
		var zMax			= null;
		var zMin			= null;
		var reverseDistance	= 1/originY;
		var SQRT3 = Math.sqrt(3.0);
		self.reset = function( settings )
		{
			if( !settings ) return;
			var ss = settings;
			if( ss.originYMax || ss.originYMax === 0 ) originYMax = ss.originYMax;
			if( ss.originYMin || ss.originYMin === 0 ) originYMin = ss.originYMin;
			if( ss.xMax || ss.xMax === 0 ) xMax = ss.xMax;
			if( ss.xMin || ss.xMin === 0 ) xMin = ss.xMin;
			if( ss.zMax || ss.zMax === 0 ) zMax = ss.zMax;
			if( ss.zMin || ss.zMin === 0 ) zMin = ss.zMin;
			if( ss.center )
			{ 
				center[0] = ss.center[0];
				center[1] = ss.center[1];
			}
			if(typeof ss.scale	=== 'number' ) scale	=self.scale		=ss.scale;
			if(typeof ss.flg	=== 'number' ) flg		=self.flg		=ss.flg;
			if( ss.originX )	originX		=	ss.originX;
			if( ss.originZ )	originZ		=	ss.originZ;
			if( ss.originY )	originY	=	ss.originY;	
			if( ss.moveX )		originX		-=	ss.moveX;
			if( ss.moveZ )		originZ		-=	ss.moveZ;
			if( ss.moveY )		originY	-=	ss.moveY;
			if( ss.setAbsPosX ) originX		= ss.posX;
			if( ss.setAbsPosY ) originY	= ss.posY;
			if( ss.setAbsPosZ ) originZ		= ss.posZ;
			if( ( originYMax || originYMax === 0 ) && originY > originYMax ) originY = originYMax;
			if( ( originYMin || originYMin === 0 ) && originY < originYMin ) originY = originYMin;
			if( ( xMax || xMax === 0 ) && originX > xMax ) originX = xMax;
			if( ( xMin || xMin === 0 ) && originX < xMin ) originX = xMin;
			if( ( zMax || zMax === 0 ) && originZ > zMax ) originZ = zMax;
			if( ( zMin || zMin === 0 ) && originZ < zMin ) originZ = zMin;
			if(typeof ss.originY === 'number' || ss.moveY || ss.setAbsPosY )
			{
				self.originY	= originY; 
				reverseDistance	= 1/originY;
			}
			return self;
		};
		self.doproject = function( x, y, z )
		{
			var point = [];
			switch( flg )
			{
				case flgPERSPECTIVE:
					x = x + originX;
					z = z + originZ;
					y = y +	originY;
				 	var dst = Math.max( Math.abs( y ), 0.001 );
			    	point[0] = center[0] + scale * x / dst;
			    	point[1] = center[1] - scale * z / dst;
			    	break;
				case flgISOMETRY:
			    	point[0] = center[ 0 ] + scale * SQRT3 * ( x - y );
			    	point[1] = center[ 1 ] - scale * ( x + y + 2 * z );
			    break;
			}
	        return point;
		};
		self.doprojectPoint = function( point ) {
			return self.doproject( point[0], point[1], point[2]);
		};
		self.doprojectSize = function( size, y )
		{
			if( flgPERSPECTIVE !== flg ) return scale*size;
			if( y )
			{
				var dist = originY + y;
				if( !dist ) dist = -1;
				return scale * size / dist;
			}else{
				return scale * size * reverseDistance;
			}
		};
}) ();

( function () {
		var self; 
		( function () {
			var btb			= window.btb$	= window.btb$	|| {};		
			var graph		= btb.graph		= btb.graph		|| {};
			self			= graph.draw2D	= graph.draw2D	|| {};
		}) ();
		self.setPixel = function( imageData, x, y, r, g, b, a)
		{
		    ix = ( x + y * imageData.width ) * 4;
	    	imageData.data[ ix + 0 ] = r;
	    	imageData.data[ ix + 1 ] = g;
	    	imageData.data[ ix + 2 ] = b;
	    	imageData.data[ ix + 3 ] = a;
		};
		self.generateCanvas = function ( width, height )
		{
			var canvas		= document.createElement( 'canvas' );
			canvas.width	= width;
			canvas.height	= height;
			return			{ canvas : canvas, context : canvas.getContext( '2d' ) };
		};
		self.drawRotatedImage = function ( img, angle, pos_on_canvas_x, pos_on_canvas_y, size_x, size_y, ctx )
		{
			ctx.save();
			ctx.translate( pos_on_canvas_x, pos_on_canvas_y );
			ctx.rotate( -angle );
			if( size_x )
			{
				ctx.drawImage(
							img, 0, 0, img.width, img.height, 
							-(size_x * 0.5),  -(size_y * 0.5), size_x, size_y
				);
			}else{
				ctx.drawImage( img, -(img.width * 0.5),  -(img.height * 0.5) );
			}
			ctx.restore();
		};
}) ();

( function ( ) {
		var self; 
		var parent;
		var lens;
		( function () {
			var btb			= window.btb$	= window.btb$	|| {};		
			var graph		= btb.graph		= btb.graph		|| {};
			parent			= btb.graph;
			lens			= graph.lensTransformation = graph.lensTransformation || {};
			self			= graph.draw3D	= graph.draw3D	|| {};
		}) ();
		var ctx; 
		var scrWidth;
		var scrHeight;
		var fromObserverYMin	= null;
		var fromObserverYMax	= null;
		self.reset = function( graphicsContext, conf )
		{
			ctx = graphicsContext;
			if( conf )
			{
				fromObserverYMin	= conf.fromObserverYMin;
				fromObserverYMax	= conf.fromObserverYMax;
			}
			return self;
		};
		var draw3DLine = self.draw3DLine = function( point3DA, point3DB, color)
		{
			var pointA = lens.doprojectPoint( point3DA );
			var pointB = lens.doprojectPoint( point3DB );
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.moveTo( pointA[0], pointA[1] );
			ctx.lineTo( pointB[0], pointB[1] )
			ctx.stroke();
		};
		var draw3DBall = self.draw3DBall = function( center, radius, colorDark, colorLight )
		{
			var touchYPoint = center[1] - radius;
			var touchSize = lens.doprojectSize( radius, touchYPoint );
			if( touchSize < 0 ) return; 
			var center2D = lens.doprojectPoint( center );
			var radius2D = lens.doprojectSize( radius, center[1] );
			if( radius2D === 0 ) return;
			ctx.fillStyle = colorDark;
			ctx.beginPath();
			ctx.arc( center2D[0], center2D[1], radius2D, 0, Math.PI*2, true);
			ctx.fill();
		};
		var draw3DBallGradient = self.draw3DBallGradient = function( center, radius, colorDark, colorLight, scrWidth, scrHeight )
		{
			var touchYPoint = center[1] - radius;
			var touchSize = lens.doprojectSize( radius, touchYPoint );
			if( touchSize < 0 ) return; 
			var center2D = lens.doprojectPoint( center );
			var radius2D = lens.doprojectSize( radius, center[1] );
			if( radius2D === 0) return;
			if( scrWidth )
			{
				var xx = center2D[0];
				var yy = center2D[1];
				if( xx + radius2D < 1 || xx - radius2D > scrWidth ) return;
				if( yy + radius2D < 1 || yy - radius2D > scrHeight ) return;
			}
			if( colorLight )
			{
				var blick_radius	= 1;
				var blickShift		= [ -0.3 * radius2D, -0.3 * radius2D ];
				var blickPoint		= parent.vector23D.combine( 1, blickShift, 1, center2D );
				var radgrad			= ctx.createRadialGradient(
											blickPoint[0],
											blickPoint[1],
											blick_radius,
											center2D[0],
											center2D[1],
											radius2D
									);  
				radgrad.addColorStop( 0, '#FFFFFF' ); //colorLight); //'#A7D30C');  
				radgrad.addColorStop( 0.7, colorDark );  
				radgrad.addColorStop( 1, 'rgba(0,0,0,0)' );  
				var area = touchSize * 1.1;
				ctx.fillStyle = radgrad;  
				var mLeft	= Math.max( 0, center2D[0] - area );
				var mTop	= Math.max( 0, center2D[1] - area);
				var mSize	= 2 * area;
				ctx.fillRect( mLeft, mTop, 	mSize, mSize );
			}else{
				ctx.fillStyle = colorDark;
				ctx.beginPath();
				ctx.arc( center2D[0], center2D[1], radius2D, 0, Math.PI * 2, true );
				ctx.fill();
			}
		};
		var drawImageIn3D = self.drawImageIn3D = function( center, scrWidth, scrHeight, sprite )
		{
			var start_width = sprite.width;
			var start_height = sprite.height;
			var dimension = Math.max( start_width, start_height );
			if( fromObserverYMin || fromObserverYMin === 0 )
			{
				var fromObserver = center[1] + lens.originY;
				if( fromObserver < fromObserverYMin ) return;
			}
			if( fromObserverYMax || fromObserverYMax === 0 )
			{
				var fromObserver = center[1] + lens.originY;
				if( fromObserver > fromObserverYMax ) return;
			}
			var center2D = lens.doprojectPoint( center );
			var width2D2 = Math.floor( lens.doprojectSize( start_width, center[1] ) * 0.5 );
			var height2D2 = Math.floor( lens.doprojectSize( start_height, center[1] ) * 0.5 );
			if( height2D2 <= 0 || width2D2 <= 0 ) return;
			var width2D		= width2D2 + width2D2;
			var height2D	= height2D2 + height2D2;
			if( scrWidth )
			{
				var xx = center2D[0];
				var yy = center2D[1];
				var xcorner = xx - width2D2;
				var ycorner = yy - height2D2;
				if( xcorner + width2D	< 1 || xcorner > scrWidth ) return;
				if( ycorner + height2D	< 1 || ycorner > scrHeight ) return;
				if( width2D > scrWidth * 2	|| height2D > scrHeight * 2 ) return;
			}
			ctx.drawImage(	sprite, 
							0,
							0,
							start_width,
							start_height,
							xcorner,
							ycorner,
							width2D,
							height2D
			);  
		};
		var draw3DAxis = self.draw3DAxis = function( origin, index, axisLength, color )
		{
			var pointA		=	[ origin[0], origin[1], origin[2] ];
			var pointB		=	[ origin[0], origin[1], origin[2] ];
			pointB[ index ]	+=	axisLength;
			draw3DLine( pointA, pointB, color );
		};
		var draw3DAxes = self.draw3DAxes = function ( origin, axisLength, colors )
		{
			draw3DAxis( origin, 0, axisLength, colors[0] );
			draw3DAxis( origin, 1, axisLength, colors[1] );
			draw3DAxis( origin, 2, axisLength, colors[2] );
		};
		var comparator = function( itemA, itemB )
		{
			return Math.floor(   (itemB.center[1] - itemB.radius ) - ( itemA.center[1] - itemA.radius)  );
		};
		var drawCollection = self.drawCollection = function( col, scrWidth, scrHeight, backgroundImageData, sprite )
		{
			col.sort( comparator );
			if( backgroundImageData ) {
				ctx.putImageData( backgroundImageData, 0, 0 )
			}else{
				if( scrHeight ) ctx.clearRect( 0, 0, scrWidth, scrHeight );
			}
			for( var ii = 0, len = col.length; ii < len; ii++ )
			{
				var cl = col[ii];
				if( sprite )
				{
					drawImageIn3D( cl.center, scrWidth, scrHeight, sprite );
				}else{
					draw3DBallGradient = self.draw3DBallGradient(
						cl.center, cl.radius, cl.colorDark, cl.colorLight,
						scrWidth, scrHeight
					);
				}
			}
		};
}) ();

( function () {
		var self; 
		var parent;
		var draw2D;
		( function () {
			var btb		= window.btb$ = window.btb$ || {};		
			var graph	= btb.graph = btb.graph || {};
			parent		= btb.graph;
			draw2D		= parent.draw2D = parent.draw2D || {};
			self		= graph.funny_graphics_2D = graph.funny_graphics_2D	|| {};
		}) ();
		var prepareRandomDisks = function( ballsNumber, width, height, radiusMax, imageData )
		{
				var setPixel=draw2D.setPixel;
				var pixs = [];
				for(var i=0; i<ballsNumber; i++){
					var radius	=Math.random()*radiusMax;
					var x	= Math.floor(Math.random()*width);
					var y	= Math.floor(Math.random()*height);
					var r	= Math.floor(254*Math.random());
					var g	= Math.floor(254*Math.random());
					var b	= Math.floor(254*Math.random());
					var a	= Math.floor(254*Math.random())
					if( imageData ) setPixel( imageData, x, y, r, g, b, a );
					pixs[i]=[x, y, r, g, b, a, radius];
				}
				return pixs;
		};
		self.createRandomDisks=function(grainsNumber,width,height){
			var radiusMax=3;
			var ww = draw2D.generateCanvas( width, height );
			subCanvas = ww.canvas;
			var sctx = ww.context;
			subCanvas.height = height;
			sctx.fillStyle = '#000000';
			sctx.fillRect( 0, 0, width, height );  
			var imageData = sctx.getImageData(0,0,width,height); 
			if( grainsNumber )
			{
				var pixels=prepareRandomDisks(grainsNumber,width,height,radiusMax,imageData);
				for(var i=0; i<grainsNumber; i++){
					var pl=pixels[i];
					var radius = pl[6];
					if(radius > 1){	
						sctx.beginPath();
						sctx.arc(pl[0],pl[1], radius, 0, Math.PI*2, true);
						var ww = 'rgba('+pl[2]+','+pl[3]+','+pl[4]+','+pl[5]+')';
						sctx.fillStyle = ww;
						sctx.fill();
					}
				}
			}
			return sctx;
		};
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

( function ( ) { 
		var self; 
		var parent;
		( function () {
			var btb		= window.btb$				= window.btb$				|| {};		
			var graph	= btb.graph					= btb.graph					|| {};
			self		= graph.funny_graphics_3D	= graph.funny_graphics_3D	|| {};
			parent		= graph;
		}) ();
		self.generateRandomCollectionOfBalls = function( 
					itemsMax,bodyRadiusMax, boxMaxX, boxMaxY, boxMaxZ,
					boxCenterX, boxCenterY, boxCenterZ  )
		{
			var items=[];
			for(var i=0; i<itemsMax; i++){
				var center = 
				[			
							( Math.random() - 0.5 ) * boxMaxX + boxCenterX, 
							( Math.random() - 0.5 ) * boxMaxY + boxCenterY, 
							( Math.random() - 0.5 ) * boxMaxZ + boxCenterZ, 
				];
				var radius	= Math.random() * bodyRadiusMax;
				items[i]={	center : center,
							radius : radius,
							colorDark : '#'+(4+(i%5))+'000'+(5-(i%5))+'0',
							colorLight : '#FFFFFF'
				};
			};
			return items;
		};
		self.cloneCollection = function ( col )
		{
			var t=[];
			for(var i=0, len=col.length; i<len; i++){
				var c=col[i];
				t[i]={	center : [c.center[0],c.center[1],c.center[2]],
					radius : c.radius,
					colorDark : c.colorDark,
					colorLight : c.colorLight
				};
			}
			return t;
		};
		self.rotateCollection = function ( col, clonedCollection, cs, sn )
		{
			for( var i=0, len=col.length; i<len; i++ )
			{
				var cl = col[i];
				var rc = clonedCollection[i];
				rc.center = parent.vector23D.rotateXY( cs, sn, cl.center );	
				rc.radius = cl.radius;
				rc.colorDark = cl.colorDark;								
				rc.colorLight = cl.colorLight;
			}
		};
		self.drawCollectionOfBalls = function (
				items,
				clonedCollection,
				ticks,
				ticksPeriod,
				scrWidth,
				scrHeight,
				backgroundImageData,
				sprite
		){
			var angle	= 2 * Math.PI * ticks / ticksPeriod;
			var cs		= Math.cos( angle );
			var sn		= Math.sin( angle );
			self.rotateCollection( items, clonedCollection, cs, sn );
			parent.draw3D.draw3DAxes( [0,0,0],  200, ['#0000FF','#00FF00','#FF0000'] );
			parent.draw3D.drawCollection(
				clonedCollection, scrWidth, scrHeight, backgroundImageData, sprite
			);
		};
}) ();

( function () {
		var self; 
		( function () {
			var btb			= window.btb$		= window.btb$		|| {};		
			var graph		= btb.graph			= btb.graph			|| {};
			self			= graph.vector23D	= graph.vector23D	|| {};
		}) ();
		var combine = self.combine = function ( a, vectorA, b, vectorB )
		{
			var result = [	a * vectorA[0] + b * vectorB[0],
							a * vectorA[1] + b * vectorB[1]
			];
			if( vectorA.length > 2) result[2] = a * vectorA[2] + b * vectorB[2];
			return result;
		};
		var rotateXY = self.rotateXY = function ( cs, sn, vector )
		{
			result = [	cs * vector[0] - sn * vector[1],
						sn * vector[0] + cs * vector[1]
			];
			if( vector.length > 2) result[2] = vector[2];
			return result;
		};
}) ();

( function () {
		var self; 
		( function () {
			var btb		= window.btb$				= window.btb$				|| {};		
			var graph	= btb.graph					= btb.graph					|| {};
			self		= graph.load_images			= graph.load_images			|| {};
		}) ();
		self.sprites					= [];
		self.itemsMax;
		self.number_of_loaded_images	= 0;
		self.load = function ( 
			base_image_path,		
			extension,				
			itemsMax				
		) {
			self.itemsMax = itemsMax;
			for( var ii = 0; ii < itemsMax; ii++ )
			{
				var spr = self.sprites[ ii ] = self.sprites[ ii ] || {};
				if( spr.loaded ) continue;
				spr.img = new Image();
				spr.img.onload	= ( function ( ii_, spr_) {
					return ( function () {
						if( !spr_.loaded )
						{
							spr_.loaded			= true;
							spr_.half_width		= Math.floor( spr_.img.width * 0.5 );
							spr_.half_height	= Math.floor( spr_.img.height * 0.5 );
							self.number_of_loaded_images++;
							if( self.itemsMax === self.number_of_loaded_images )
							{
								var ww = document.getElementById( 'loading' );
								if( ww ) ww.style.display = 'none';	
							}
						}
					});
				}) ( ii, spr );
				var img_path	= base_image_path + ii + '.' + extension;
				spr.img.src		= img_path;
			};
			if( btb$ && btb$.ifdeb ) btb$.ifdeb( 'Image load fired' );
		};
		self.allImagesLoaded = function ()
		{
			return self.itemsMax === self.number_of_loaded_images;
		};
		return self;
}) ();

( function () {
		var self; 
		var graph;
		var btb;
		( function ( name ) {
			btb			= window.btb$		= window.btb$			|| {};		
			graph		= btb.graph			= btb.graph				|| {};
			self		= graph[ name ]		= graph[ name ]			|| {};
		}) ( 'run_flying_shadows' );
		var ifdeb				= null;
		var backgroundImageData = null;
		var draw2D				= null;
		var sprites				= [];
		var itemsMax;
		var flat_sprite_url;
		var wait_for_images;
		var final_width			= 80;
		var final_height		= 150;
		var loaded_sprites;
		var common_ff;
		var master_screen_scale;
		var conf;
		var flying_shadows;
		var sprites_seed;
		var PI2					= 2 * 3.1415;
		var justReinitialized	= false;		
		var formerTime;
		var leftMemorySensor;
		var generateSprites = function ( startup_rr_r0 )
		{
			PI2		= conf.turnTimePoint ? PI2 / conf.turnTimePoint : PI2;
			var sd	= sprites_seed;
			var rnd	= sprites_seed.randomizer;
			if( flying_shadows.captured )
			{
				sprites = flying_shadows.captured;
				return;
			}
			for( var ii = 0; ii < itemsMax; ii++ )
			{
				var rr_r0	= startup_rr_r0 && startup_rr_r0[ ii ] || sd.rr.r0;
				var spr = sprites[ii] =
				{
					rr :
					{
							ra : sd.rr.ra * ( rnd.rr.ra.base + rnd.rr.ra.factor * Math.random() ),
							vv : sd.rr.vv * ( rnd.rr.vv.base + Math.random() ),
							f0 : sd.rr.f0,
							r0 : rr_r0
					},
					cc :
					{	
						f0 : sd.cc.f0,
						vv : sd.cc.vv * ( rnd.cc.vv.base + rnd.cc.vv.factor * Math.random() )
					},	
					ff :
					{	
						f0 : sd.ff.f0,
						vv : sd.ff.vv * ( rnd.ff.vv.base + rnd.ff.vv.factor * Math.random() )
					},	
					ss :
					{ 
						sa : sd.ss.sa * ( rnd.ss.sa.base + rnd.ss.sa.factor * Math.random()),
						vv : sd.ss.vv * ( rnd.ss.vv.base + rnd.ss.vv.factor * Math.random()),
						f0 : sd.ss.f0,
						s0 : sd.ss.s0
					}
				};
			};
			if( conf.doCapture ) btb$.debug( JSON.stringify( sprites, null, '\t'), 'sprites' );
		};
		var screen_xx;
		var screen_yy;
		var screen_center_xx;
		var screen_center_yy;
		var	dontDrawAfterPeriod;
		var wipedAtTurnPoint = false;
		var wipedAtEndPoint	= false;
		var doVibroTick = false;
		self.init_sprites = function ( backgroundImageData_, conf_ )
		{
			conf				= conf_;
			conf.turnTimePoint	= conf.turnTimePoint || conf.ticksPeriod;
			dontDrawAfterPeriod	= conf.dontDrawAfterPeriod;
			flying_shadows		= conf.flying_shadows;
			flat_sprite_url		= flying_shadows.flat_sprite_url;
			wait_for_images		= flat_sprite_url || flying_shadows.custom_image_url;
			sprites_seed		= flying_shadows.sprites_seed;
			common_ff			= sprites_seed.common_ff;
			ifdeb				= btb.ifdeb;
			draw2D				= graph.draw2D;
			backgroundImageData	= backgroundImageData_;
			itemsMax			= conf.itemsMax;
			leftMemorySensor	= conf.leftMemorySensor || 0.999;
			var ww = flying_shadows;
			if( flat_sprite_url )
			{
				graph.load_images.load( flat_sprite_url, flying_shadows.flat_sprite_ext, conf.itemsMax );
			}else if( ww.custom_image_url ) {
				graph.load_images.load( ww.custom_image_url, ww.custom_image_ext, 1 );
			}
			loaded_sprites		= graph.load_images.sprites;
			if( !flat_sprite_url )
			{
				graph.dsprite.prepareParameters( itemsMax, loaded_sprites );
				generateSprites( graph.dsprite.startup_rr_r0 );
			}else{
				generateSprites();
			}
			justReinitialized = true;
			ifdeb( 'run_flying_shadows.init_sprites: completed.' );
		};
		self.rescale_screen = function ( screen )
		{
			screen_xx			= screen.width;
			screen_yy			= screen.height;
			screen_xxP			= screen.width * 2;
			screen_yyP			= screen.height * 2;
			screen_center_xx	= screen_xx / 2;
			screen_center_yy	= screen_yy / 2;
			if( conf.virt === 'v' )
			{
				screen_scale_x		= screen.width / conf.vwidth;
				screen_scale_y		= screen.height / conf.vheight;
				master_screen_scale	= Math.min( screen_scale_x, screen_scale_y );
			}else{
				master_screen_scale	= 1.0;
			}
		};
		var move_sprite = function ( sprite, tt )
		{
			var rrf =	PI2 * ( sprite.rr.vv + sprite.rr.f0 ) * tt;
			var rr	=	sprite.rr.ra * Math.sin( rrf ) + sprite.rr.r0;
			var comm_ff	=	PI2 * common_ff.vv * tt + common_ff.f0;
			var cc_ff	= 	PI2 * sprite.cc.vv * tt + sprite.cc.f0;
			var rad_ff	= 	cc_ff + comm_ff;
			var rrx	=	rr * Math.cos( rad_ff);
			var rry	=	rr * Math.sin( rad_ff);
			var	ff	=	PI2 * sprite.ff.vv * tt + sprite.ff.f0 + rad_ff;
			var ssf =	PI2 * sprite.ss.vv * tt + + sprite.ss.f0;
			var ss	=	Math.abs( sprite.ss.sa * Math.abs( Math.sin( ssf ) ) + sprite.ss.s0 );
			return { rrx : rrx, rry : rry, ff : ff, ss : ss };
		};
		self.move_sprites = function ( tt_, inPausePhase, time )
		{
			var virt		= graph.virt;
			var ctx			= virt.con[ virt.ix ];
			var tt			= tt_;
			var ttreverse	= tt;
			var ttabs		= Math.abs( tt );
			if( conf.backwardInTime )
			{
				var tt = conf.turnTimePoint - tt_;
				var ttabs = Math.abs( tt );
				var ttreverse = Math.abs( conf.turnTimePoint - ttabs );
			}				
			if( justReinitialized )
			{
				if( backgroundImageData )
				{
					ctx.putImageData( backgroundImageData, 0, 0 )
				}else{
					ctx.fillStyle = '#000000';
					ctx.fillRect( 0, 0, screen_xx, screen_yy );  
				}
				formerTime = 0;
				justReinitialized = false;
			}
			var endingAnimation = tt_ >= conf.ticksPeriod - 1;
			var elapsedTime = time - formerTime;
			if( conf.memLoss >= 0  )
			{
				var ww_wipe_memory	=	!wipedAtTurnPoint &&
										conf.memClearAt0 && ttabs <= 1 &&
										( inPausePhase < 0 || inPausePhase > 0.5 ) ;
				if( ww_wipe_memory ) wipedAtTurnPoint = true;
				if( !ww_wipe_memory && !wipedAtEndPoint )
				{
					ww_wipe_memory = conf.clearEnd && endingAnimation;
					if( ww_wipe_memory ) wipedAtEndPoint = true;
				}	
				if( conf.memLoss && !ww_wipe_memory && elapsedTime > 0 )
				{
					var memLoss = ( ( inPausePhase > -1 || endingAnimation ) && conf.critPointMemLossExp ) || conf.memLossExp;
					if( memLoss )
					{
						var memLeft = Math.max( 1 - memLoss * elapsedTime, 0 ); 
						if( memLeft < leftMemorySensor )
						{
							var wCur	= virt.ix;
							var wConCur	= virt.con[ wCur ];
							var wCanCur	= virt.can[ wCur ];
							var wWidth	= wCanCur.width;
							var wHeight	= wCanCur.height;
							if( virt.can.length > 1 )
							{
								var wNext		= ( wCur + 1 ) % 2;
								var wConNext	= virt.con[ wNext ];
								wConNext.clearRect( 0, 0, wWidth, wHeight );
								wConNext.globalAlpha = memLeft;
								wConNext.drawImage( wCanCur, 0, 0, wWidth, wHeight );
								virt.ix = wNext;
								ctx		= wConNext;
							}else{
								var imageData = wConCur.getImageData( 0, 0, wWidth, wHeight );
								graph.filters.memLeft( imageData, memLeft );
								formerTime = time;
								wConCur.putImageData( imageData, 0, 0 )
							}
						}
					}
				}else{
					if( backgroundImageData )
					{
						ctx.putImageData( backgroundImageData, 0, 0 )
					}else{
						ctx.fillStyle = '#000000';
						ctx.fillRect( 0, 0, screen_xx, screen_yy );
					}
				}
			}
			if( dontDrawAfterPeriod )
			{
				if( tt_ >= conf.ticksPeriod )
				{
					return true;
				}
			}
			var ctx = virt.con[ virt.ix ];
			var alpha = conf.turnTimePoint ? Math.max( Math.min( ttreverse / conf.turnTimePoint, 1 ), 0.0001 ) : 1;
			if( wait_for_images )
			{
				if( !graph.load_images.allImagesLoaded() )
				{
					ifdeb( '... skipped draw. number_of_loaded_images = ' + graph.load_images.number_of_loaded_images );
					return false;
				}			
				ctx.globalAlpha = alpha;
			}
			doVibroTick				= doVibroTick || ( conf.turnVibrationLen && inPausePhase > -1 );
			var departureStep		= conf.turnPonitPause / sprites.length;
			var inPausePhaseEff		= conf.turnPonitPause * ( doVibroTick ? ( inPausePhase > -1 ? inPausePhase : 1 ) : 0  );
			for( var ii = sprites.length - 1; ii > -1; ii-- )
			{
				var sprite			= sprites[ii];
				var vibroTick		= tt;
				if( doVibroTick && ii )
				{
					if( inPausePhaseEff > departureStep * ( ii - 1 ) )
					{
						vibroTick += ( inPausePhaseEff - departureStep * ( ii - 1 ) ) * conf.ticksPerMsec;
					}else{
						continue;
					}
				}
				var spr				= move_sprite( sprite, vibroTick );
				var vibroAngleFinal = spr.ff;
				var xx = screen_center_xx + spr.rrx * master_screen_scale;
				var yy = screen_center_yy - spr.rry * master_screen_scale;
				var target_width = final_width * spr.ss * master_screen_scale;				
				var target_height = final_height * spr.ss * master_screen_scale;				
				if( flat_sprite_url )
				{
					var lsp = loaded_sprites[ii];
					var img = lsp.img;
					var width = img.width;
					var height = img.height;
					var xcorner = xx - lsp.half_width * master_screen_scale;
					var ycorner = yy - lsp.half_height * master_screen_scale;
					if(	xcorner + target_width	< -screen_xx	|| xcorner	> screen_xx || 
						ycorner + target_height	< -screen_yy	|| ycorner	> screen_yy ||
						target_width > screen_xxP				|| target_height > screen_yyP
					){
						ifdeb( 'too out of screen ' );
						continue;
					}
					draw2D.drawRotatedImage( img, spr.ff, xx, yy, target_width, target_height, ctx );
				}else{
					graph.dsprite.draw(
					{
						ctx				: ctx,
						centerX			: xx,
						centerY			: yy,
						alpha			: alpha,
						scale			: spr.ss * master_screen_scale,
						ticks			: vibroTick,
						item			: ii,
						angle			: vibroAngleFinal
					});
				}
			} 
			if( inPausePhase > -1 )
			{
				graph.dsprite.drawPauseImage( inPausePhase, ctx, screen_center_xx, screen_center_yy, master_screen_scale );
			}
			if( conf.scaffold ) graph.putText( ctx, screen_center_xx, screen_center_yy, master_screen_scale, conf.vwidth, conf.scaffold );
			return true;
		};
}) ();

( function () {
		var btb		= window.btb$	= window.btb$		|| {};
		var graph	= btb.graph		= btb.graph			|| {};
		var conf	= graph.conf	= graph.conf		|| {};
		var dsprite	= graph.dsprite	= graph.dsprite		|| {};
		var PI				= 3.1415926;
		var PI2				= 2 * PI;
		var PID2			= PI / 2;
		var PI2T;
		var loaded_sprite		= null;
		var PI2T;
		var start_gradient;
		var shape_paths;
		var startColorA;
		var endColorA;
		var start_colors;
		var doRadialGradient;
		var doFill;
		var linear_gradients;
		var rad_gradients;
		var swap_gradients;
		var titlePosX;
		var titlePosY;
		var	titleScale;
		var cosA;
		var sinA;
		dsprite.prepareParametersToDraw = function ( dconf, itemsMax, loaded_sprites )
		{ 
			if( conf.doCapture ) btb$.debug( JSON.stringify( dconf, null, '\t'), 'dconf' );
			dconf = dsprite.captured || dconf;
			loaded_sprite		= loaded_sprites[0];
			PI2T				= PI2 / conf.turnTimePoint;
			start_gradient		= conf.flying_shadows.start_gradient;
			shape_paths			= dconf.shape_paths;
			startColorA			= dconf.startColorA;
			endColorA			= dconf.endColorA;
			start_colors		= dconf.start_colors;
			doRadialGradient	= dconf.doRadialGradient;
			doFill				= dconf.doFill;
			linear_gradients	= dconf.linear_gradients;
			rad_gradients		= dconf.rad_gradients;
			swap_gradients		= dconf.swap_gradients;
			titlePosX			= dconf.titlePosX;
			titlePosY			= dconf.titlePosY;
			titleScale			= dconf.titleScale;
		};
		dsprite.draw = function ( arg )
		{
			var ctx						= arg.ctx;
			var centerX					= arg.centerX;
			var centerY					= arg.centerY;
			var angle					= arg.angle;
			var ss						= arg.scale;
			var ticks					= Math.abs( arg.ticks );
			var item					= arg.item;
			var sscc					= start_colors[ item ];
			for( var ii = 0, len = sscc.length; ii < len; ii++ )
			{
				var cc = sscc[ ii ];
				var color = Math.min( Math.floor( Math.abs( -cc.amp * Math.sin( PI2T * cc.vv * ticks ) + cc.c0 ) ), 255 );
				switch ( ii )
				{
					case 0:	var startColorR = color;
							break;
					case 1:	var startColorG = color;
							break;
					case 2:	var startColorB = color;
				}
			}
			var endColorR	= Math.floor( startColorR * 0.5 / ( ticks * 0.05 + 1 ) );
			var endColorG	= Math.floor( startColorG * 0.5 / ( ticks * 0.05 + 1 ) );
			var endColorB	= Math.floor( startColorB * 0.5 / ( ticks * 0.05 + 1 ) );
			var paths = shape_paths[ item % shape_paths.length ];
			if( conf.spaceTransf )
			{
				ctx.save();
				ctx.translate( centerX, centerY );
				ctx.rotate( -angle );
			}else if( angle ) {
				angle = -angle;
				sinA = Math.sin( angle );
				cosA = Math.cos( angle );
			}
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
					var pointX = centerX + wx * ss;
					var pointY = centerY + wy * ss;
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
			if( start_gradient && ticks < start_gradient )
			{
				var shortAlpha =	Math.max ( 
										Math.floor( 
												1000 * ( start_gradient - ticks ) / start_gradient * arg.alpha
										) / 1000,
										0.01
									);
				var gradShort = create_gradient(
					ctx, ss,
					startColorR, startColorG, startColorB, startColorA,
					endColorR, endColorG, endColorB, endColorA,
					shortAlpha, angle, centerX, centerY
				);
				/*
				c ccc( 
					' start_gradient=' + start_gradient +
					'. short grad :' + ' ss=' + ss +
					', startColorR= '	+ startColorR +
					', startColorG='	+ startColorG	+ ', startColorB=' + startColorB +
					', startColorA = '	+ startColorA	+ ', endColorR=' + endColorR +
					', endColorG='		+ endColorG		+ ', endColorB=' + endColorB + ', endColorA=' + endColorA +
					', shortAlpha=' + shortAlpha
				);
				*/
				ctx.fillStyle = gradShort;
				ctx.fill();
			}
			/*
			c ccc( 
					'. short grad :' + ' ss=' + ss +
					', startColorR= '	+ startColorR +
					', startColorG='	+ startColorG	+ ', startColorB=' + startColorB +
					', startColorA = '	+ startColorA	+ ', endColorR=' + endColorR +
					', endColorG='		+ endColorG		+ ', endColorB=' + endColorB + ', endColorA=' + endColorA +
					', arg.alpha=' + arg.alpha
			);
			*/
			var grad = create_gradient(
				ctx, ss,
				startColorR, startColorG, startColorB, startColorA,
				endColorR, endColorG, endColorB, endColorA,
				arg.alpha, angle, centerX, centerY
			);
			if( start_gradient )
			{
				ctx.strokeStyle = grad;
				ctx.stroke();
			}else{
				ctx.fillStyle = grad;
				ctx.fill();
			}
			if( conf.spaceTransf ) ctx.restore();
		};
		var create_gradient = function (
				ctx, ss,
				startColorR, startColorG, startColorB, startColorA,
				endColorR, endColorG, endColorB, endColorA,
				alpha, angle, centerX, centerY
		){
			if( doFill )
			{
				return 'rgba(' +
						startColorR + ',' +
						startColorG + ',' +
						startColorB + ',' +
						( startColorA * alpha ) + ')';
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
			grad.addColorStop( 0, 'rgba(' +
					startColorR + ',' +
					startColorG + ',' +
					startColorB + ',' +
					( startColorA * alpha ) + ')'
			);
			grad.addColorStop( 1, 'rgba(' +
					endColorR + ',' +
					endColorG + ',' +
					endColorB + ',' +
					( endColorA * alpha ) + ')'
			);
			return grad;
		};
		dsprite.drawPauseImage = function ( phase, ctx, centerX, centerY, scale )
		{
			if( phase < 0 || phase > 1 ) return;
			var img = loaded_sprite.img;
			var alpha = phase * 2 - 1;
			alpha	*=	alpha;
			alpha	=	1 - Math.abs( alpha ); 
			alpha	*=	alpha;
			if( alpha > 1 ) alpha = 1;
			ctx.globalAlpha = alpha;
			var ww = img.width;
			var wh = img.height;
			var titleFinalScale = titleScale && titleScale * scale || scale;
			ctx.drawImage (
				img,
				0, 0, ww, wh,
				centerX + titlePosX * titleFinalScale , centerY + titlePosY * titleFinalScale,
				ww * titleFinalScale, wh * titleFinalScale
			);
		};
}) ();

( function () {
	var	btb		= window.btb$		= window.btb$			|| {};		
	var	graph	= btb.graph			= btb.graph				|| {};
	graph.landing_warnings = function ()
	{
				var js_test = document.getElementById( 'java-script-disabled' );
				if( js_test ) js_test.style.display = 'none';	
				var loading = document.getElementById( 'loading' );
				loading.style.height = parseInt( $( 'body' ).css( 'height' ) );
				loading.style.visibility = 'visible';
				var ctest = document.createElement( 'canvas' );
				if( !ctest )
				{
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

( function () {
	var btb		= window.btb$	= window.btb$	|| {};		
	var graph	= btb.graph		= btb.graph		|| {};
	graph.readme =
	{
		title		:	"GraphSpin",
		description	:	"Tiny canvas framework with dumb animation demo.",
		copyright	:	"Copyright (C) 2013 Konstantin Kirillov",
		license		:	"MIT except folder \"scenarios\" which have own licenses",
		version		:	"Version 0.0.51.",
		date		:	"June 8, 2013.",
		diary		:
						"0.0.51  June 8, 2013; prepared for GitHub," +
						"0.0.50  June 8, 2013; flying-shadows: adding effect around turning point," +
						"0.0.49  June 6, 2013; flying-shadows: circles," +
						"0.0.48  flying-shadows: twin buffers," +
						"0.0.46  flying-shadows: does not rely on native space transforms," +
						"        but still choppy," +
						"0.0.45  flying-shadows: virt=v resize shift bug fixed. logo-words is showable." +
						"0.0.44  flying-shadows: mode virt=v ratio=k resizes partially well" +
						"                        steps.dev.htm minifier and jq/app splitter done." +
						"        JS-minifier extended to all subprojects. PHP-templating is better." +
						"        began restoration non-feather projects. All but logo-whirlio are about working." +
						"        logo-words is about showable." +
						"0.0.43  flying-shadows: exponential memory decay based on time, not on ticks." +
						"                        less brightness jerks." +
						"0.0.42  flying-shadows: gradient fixed. alternative fill added." +
						"                        fading title added." +
						"0.0.41  working on turn-point-pause and way back" +
						"0.0.40  wrapped into fluid-css content page," +
						"0.0.38  resize scenarios improved," +
						"0.0.37  flying-shadows: virtual-master-offscreen-canvas," +
						"0.0.36  minifier added," +
						"        appriximately last version preserving non-feather projects." +
						"0.0.35  flying-shadows: browser rescaling added." +
						"        double drawImage used to preserve memory after resize - deteriorates image," +
						"        offline-master-image is desired" +
						"0.0.34  flying-shadows: master_scale added." +
						"0.0.33  flying-shadows: \"finer tuned colors\"\n" +
						"        finer feather.\n" +
						"0.0.31  flying-shadows: memoryLength and memorizeRange.\n" +
						"        ready for alpha.\n" +
						"0.0.30  flying-shadows: twins: path and grad modes added.\n" +
						"0.0.29  whirlio logo updated.\n" +
						"0.0.28  general cleanup.\n" +
						"0.0.27  requirejs is stripped. Canvas div has \"fixed\" positioning by default again.\n" +
						"        PHP used to put common script in templates *.tpl.\n" +
						"0.0.26  Five scenarios in one step. Had to add ''define'' in jquery.js file.\n" +
						"        Will strip requirejs from project as non-beneficial.\n" +
						"        Random block on IE9: missing scenario.run function.\n" +
						"0.0.25  Changed ''fixed'' to ''absolute'' to position canvas. Because of mobile support problems.\n" +
						"        Added ''screenScaleThreshold'' to protect from user's Ctrl+ zoom.\n" +
						"        Returned vertical navigation to arrrow-up/down to not confuse a user.\n" +
						"0.0.24  Better support for JSless pages.\n" +
						"0.0.21  Between ver. 21 and 24, see steps_index.htm.\n" +
						"0.0.20. May 6.    Whirlio logo title image added.\n" +
						"0.0.19. May 1.    Ticks are synced with time. All variants including bubbles work.\n" +
						"0.0.18. April 30. Dynamic gradient-enabled-non-image-sprites added. \n" +
						"0.0.17. April 28. btb$ is global. Sprites can be scaled to screen. Single config. Posted. \n" +
						"                  Posted. Works in IE9 again.\n" +
						"0.0.12. grainsNumber is variable including 0.\n" +
						"0.0.8.mozilla requestAnimationFrame\n" +
						"0.0.7 setTimeout animation"	
	};
}) ();

( function () {
	var btb		= window.btb$		= window.btb$			|| {};		
	var graph	= btb.graph			= btb.graph				|| {};	
	var conf	= graph.conf		= graph.conf			|| {};
	var ifdeb;
	var $;
	var canvas_wrap			= null;
	var canvas				= null;
   	var master_context		= null;											//canvas.getContext('2d');
	var virt				= graph.virt = { can : [], con : [], ix : 0 };	
	var ticks				= 0;	//	counts animation phase till the browser's death. Independent from window resizes.
	var scrHeight			= -1;	
    var	scrWidth			= -1;	
	var animation_scheduled;			
	var stop_animation_chain;			// puts state to "false" at first opportunity
	var first_time_3D_reset_done = false;
	var stop_afer_tick;
	var scrCenterX;
	var scrCenterY;
	var items;
	var clonedCollection;
	var salt;
	var backgroundImageData;
	var sprite = null;
	var fshadows_flg;
	var startTime = null;
	graph.init = function ( conf_, requested_3D_navigator )
	{
			ifdeb			= btb.ifdeb;
			$				= window.jQuery;
			ifdeb( 'graph.init entered' );
			canvas_wrap = document.getElementById( 'canvas_wrap' );
			if( !canvas_wrap ) return;
			canvas = document.getElementById( 'canvas' );
			master_context = canvas && canvas.getContext && canvas.getContext( '2d' );
			if( !master_context )
			{
				canvas_wrap.style.display='none';
				ifdeb( 'graph.init: canvas-unaware browser: canvas is disabled.' );
				return;
			}
			graph.enabled = true;
			btb.pasteNonArrayClonedTree( conf, conf_ );
			graph.spawn_config( conf );
			stop_afer_tick = conf.stop_afer_tick;
			if( conf.disable_landing_loading_warning )
			{
				var ww = document.getElementById( 'loading' );
				if( ww ) ww.style.display = 'none';	
			}
			if( conf.min_width ) 
			{
				$( canvas ).css( 'min-width', conf.min_width );
			}
			if( conf.min_height )
			{
				$( canvas ).css( 'min-height', conf.min_height );
			}
			if( conf.body_overflow	) document.body.style.overflow = conf.body_overflow;
			if( conf.wrap_overflow	) canvas_wrap.style.overflow = conf.wrap_overflow;
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
			}else{
				virt.can[ 0 ]	= canvas;
				virt.con[ 0 ]	= master_context;
			}
			window.requestAnimationFrame =
				window.requestAnimationFrame		||
		        window.webkitRequestAnimationFrame	||
		        window.mozRequestAnimationFrame		||
		        window.oRequestAnimationFrame		||
		        window.msRequestAnimationFrame		||
				timeoutAnimationFrame;
			graph.animation_is_allowed = conf.animation_is_allowed;
			stop_animation_chain = !graph.animation_is_allowed;
			fshadows_flg = conf.run_flying_shadows;
			ifdeb( 'readme: ', graph.readme ); 
			ifdeb( 'graph init: conf_, graph.conf: ', conf_, graph.conf ); 
			if( conf.sprite_url )
			{
				sprite = new Image();
				sprite.src = conf.sprite_url;
			}else if( fshadows_flg ) {
				graph.run_flying_shadows.init_sprites ( 
						null,
						conf
				);
				var ww = virt.can[ virt.ix ];
				graph.run_flying_shadows.rescale_screen( { width : ww.width, height : ww.height } );
			}
			if( startTime !== null ) startTime = (new Date()).getTime();
			throttledResize();
			if( conf.movingObserver )
			{
				$( document.body ).bind( 'keydown', requested_3D_navigator || graph.default_3D_navigator );
			}
			btb.bindEvent( 'resize',  window, throttledResize );
			if( conf.stop_on_click )
			{
				btb.bindEvent( 'click', document.body, function () {
						graph.animation_is_allowed = !graph.animation_is_allowed;
						return false;
					},
					true
				);
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
				if( dodo )
				{
					stop_animation_chain = false;
					if( !animation_scheduled )
					{
						select_animator( draw_and_reschedule );
					}
					if( canvas_wrap ) canvas_wrap.style.display = "block";
					btb$.ifdeb( 'Animation chain on' );
				}else{
					if( canvas_wrap ) canvas_wrap.style.display = "none";
					stop_animation_chain = true;
					btb$.ifdeb( 'Animation chain off' );
				}
	};
	var draw_and_reschedule = function ()
	{
				animation_scheduled = false;
				if( stop_animation_chain ) return;
				if( graph.animation_is_allowed )
				{
					var effective_ticks = ticks;
					var ticks_change = 1;
					if( conf.doSyncTime )
					{
						if( startTime === null )
						{
							startTime = (new Date()).getTime();
						}
						var time = (new Date()).getTime() - startTime;
						var ww = Math.floor( time / conf.playPeriod * conf.ticksPeriod );
						var ticks_change = ww - ticks;
						ticks = ww;
						/*
						if( time > 2000 )
						{
							c ccc( 'stopped' );
							return;
						}
						*/
						var wttp = conf.turnTimePoint;
						var inPausePhase = -1;
						effective_ticks = ticks;
						if( wttp && ticks >= wttp )
						{
							var wperiod = conf.playPeriod;
							var wpause = conf.turnPonitPause;
							var wtperiod = conf.ticksPeriod;
							var turnTime = wperiod * wttp / wtperiod;
							var inPausePhase = ( time - turnTime ) / wpause;
							if( inPausePhase <= 1 )
							{
								effective_ticks = wttp;
							}else{
								inPausePhase = -1;
								effective_ticks = Math.floor( ( time - wpause ) / wperiod * wtperiod );
							}
						}
					}	
					if( fshadows_flg )
					{
						if( effective_ticks > conf.frozenTicksStart && !conf.runInfinitely )
						{
							effective_ticks = conf.frozenTicksStart;
						}
						if( conf.clearEnd && effective_ticks >= conf.ticksPeriod - 1 )
						{
							master_context.fillStyle = '#000000';
							master_context.fillRect( 0, 0, canvas.width, canvas.height );
						}
						var did_draw = graph.run_flying_shadows.move_sprites( effective_ticks, inPausePhase, time );
						if( did_draw )
						{
							if( conf.virt === 'b' || conf.virt === 't' )
							{
								graph.scaleAndDrawMemoryCanvas ( master_context, virt )
							}
							if( !conf.doSyncTime ) ticks++;
						}
					}else{
						if( !conf.runInfinitely && ticks > conf.ticksPeriod ) return;
						graph.funny_graphics_3D.drawCollectionOfBalls (
							items,
							clonedCollection,
							ticks,
							conf.ticksPeriod,
							scrWidth,
							scrHeight,
							backgroundImageData,
							sprite
						);
						if( !conf.doSyncTime ) ticks++;
					}
					if( stop_afer_tick ) graph.animation_is_allowed = false;
				}
				select_animator( draw_and_reschedule );
	};
	graph.reset_animation = function ()
	{
			if( !canvas || !canvas_wrap ) return;
			var wwe = document.documentElement;
			var wwb = document.body;
			var $d = $(document);
			var $w = $(window);
			var ww_w = $w.width();
			var ww_h = $w.height(); 
			if( ww_w === scrWidth && ww_h === scrHeight ) return;
			scrWidth = ww_w;
			scrHeight = ww_h;
			scrCenterX	= conf.screen_center_x !== null ?
					conf.screen_center_x :
					Math.floor(scrWidth/2);
			scrCenterY	= conf.screen_center_y !== null ?
					conf.screen_center_y :
					Math.floor(scrHeight/2);
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
				if( conf.min_width && new_width < conf.min_width )
				{
					new_width = conf.min_width;
				}
				if( conf.min_height && new_height < conf.min_height )
				{
					new_height = conf.min_height;
				}
				$( canvas ).css( 'width', new_width );
				$( canvas ).css( 'height', new_height );
			}
			graph.resizeCanvasPreservingly( master_context, new_width, new_height );
			var lensFlag = graph.lensTransformation.flgPERSPECTIVE;		
			if( fshadows_flg ) {
				if( conf.virt !== 'b' && conf.virt !== 't'  )
				{
					var ww = virt.can[ virt.ix ];
					graph.run_flying_shadows.rescale_screen( { width : ww.width, height : ww.height } );
				}
			}else{
				if( conf.generate_backg_img )
				{
					salt				= graph.funny_graphics_2D.createRandomDisks( conf.grainsNumber, scrWidth, scrHeight );
					backgroundImageData	= salt.getImageData( 0, 0, scrWidth, scrHeight );
				}
				var lens = graph.lensTransformation.reset({ 
					flg			: lensFlag,
					center		: [ scrCenterX, scrCenterY ],
					originY		: conf.originY,
					scale		: conf.scale,
					originYMax	: conf.originYMax,
					originYMin	: conf.originYMin,
					xMax		: conf.xMax,
					xMin		: conf.xMin,
					zMax		: conf.zMax,
					zMin		: conf.zMin
				});
				if( conf.reset_population_at_reset || !first_time_3D_reset_done )
				{
					graph.draw3D.reset( master_context, conf );
					items				= graph.funny_graphics_3D.generateRandomCollectionOfBalls(
										conf.itemsMax,
										conf.bodyRadiusMax,
										conf.boxMaxX,
										conf.boxMaxY,
										conf.boxMaxZ,
										conf.boxCenterX, conf.boxCenterY, conf.boxCenterZ
									  );
					clonedCollection	= graph.funny_graphics_3D.cloneCollection( items );
				}
				first_time_3D_reset_done = true;
			}
			graph.do_trigger_animation( !stop_animation_chain );
			ifdeb( 'graph.init: animation is reset.' );
	};
	var throttledResize = btb.throttledCallback( graph.reset_animation );
}) ();

( function () {
	var btb		= window.btb$		= window.btb$			|| {};		
	var graph	= btb.graph			= btb.graph				|| {};
	var conf	= graph.conf		= graph.conf			|| {};
	var tmpcanvas	= null;
	var tmpctx		= null;
	graph.default_3D_navigator = function ( event )
	{
					var control = {};
					var handled = false;
					if( event.ctrlKey )
					{
						switch ( event.keyCode )
						{
							case 38	:	control.moveY = conf.movingObserverStepY	//'up',
										handled = true;
										break;
							case 40	:	control.moveY = -conf.movingObserverStepY	//'down',
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
	graph.spawn_config = function ( conf )
	{
			if( !conf.frozenTicksStart && conf.frozenTicksStart !== 0 ) conf.frozenTicksStart = conf.ticksPeriod;
			var ww = conf.ticksPeriod > 0 ? Math.floor( conf.playPeriod / conf.ticksPeriod ) : 20;
			if( ww < 20 ) ww = 20;
			conf.animationInterval = ww;
			conf.memLossExp = 0;
			if( conf.memLoss )
			{
				conf.memLossExp = conf.memLoss > 0.999999999 ? 1000000 : ( -Math.log( 1 - conf.memLoss ) ) / 1000;
			}
			conf.critPointMemLossExp = 0;
			if( conf.critPointmemLoss )
			{
				conf.critPointMemLossExp = conf.critPointmemLoss > 0.999999999 ? 1000000 : ( -Math.log( 1 - conf.critPointmemLoss ) ) / 1000;
			}
			conf.ticksPerMsec = conf.ticksPeriod / conf.playPeriod;
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
		if( !conf.memLoss || conf.virt === 'b' || conf.virt === 't' )
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
	graph.scaleAndDrawMemoryCanvas = function ( master_context, virt )
	{
			var vcanvas	= virt.can[ virt.ix ];
			var canvas	= master_context.canvas;
			var ww		= canvas.width;
			var wh		= canvas.height;
			var ww_v	= vcanvas.width;
			var wh_v	= vcanvas.height;
			var ww_off	= 0;
			var wh_off	= 0;
			var ww_new	= ww;
			var wh_new	= wh;
			if( !conf.noratio )
			{
				var w_w		= ww / ww_v;
				var w_h		= wh / wh_v;
				var wscale	= Math.min( w_w, w_h );
				var ww_new	= ww_v * wscale;
				var wh_new	= wh_v * wscale;
				var ww_off	= Math.max( 0, ( ww - ww_new ) * 0.5 );
				var wh_off	= Math.max( 0, ( wh - wh_new ) * 0.5 );
			}
			master_context.clearRect( 0, 0, ww, wh );
			master_context.drawImage(
					vcanvas,
					0, 0, ww_v, wh_v,
					ww_off, wh_off, ww_new, wh_new
			);
	};	
}) ();

( function () {
	var	btb		= window.btb$		= window.btb$			|| {};		
	var	graph	= btb.graph			= btb.graph				|| {};
	$( function () {
		var warning = document.getElementById( 'java-script-disabled' );
		if( warning ) warning.style.display = 'none';	
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
		var conf = graph.conf;
		btb.pasteNonArrayClonedTree( conf, btb.getQueryKeyPairs( 'integrify' ) );
		var ww							= $( '#canvas_wrap' );
		if( ww && btb.browser.mobile )	ww.css( 'position', 'absolute' );
		graph.scenario.run();
		var ww = document.getElementById( 'loading-wrap' );
		if( ww ) ww.style.display = 'none';
		btb.ifdeb( 'doc ready fired' );
	}); 
}) ();

( function () {
	var conf;
	( function () {
			var btb		= window.btb$		= window.btb$		|| {};		
			var graph	= btb.graph			= btb.graph			|| {};
			conf		= graph.conf		= graph.conf		|| {};
	}) ();
	var default_conf =
	{
		itemsMax				: 9,
		backwardInTime			: true,
		runInfinitely			: false,
		ticksPeriod				: 400,		
		playPeriod				: 8000,
		turnTimePoint			: 400,		
		turnPonitPause			: 0,		
		dontDrawAfterPeriod		: false,
		keepAtResize			: true,		
		memLoss					: 0.005,	
		leftMemorySensor		: 0.98,		
		critPointmemLoss		: 0.01, 	
		memClearAt0				: 0,		
		clearEnd				: 0,		
		spaceTransf				: false,	// true does resort to browser's native context transformations
		csize					: '',		// 'f'	for fixed: use cwidth and and cheight for canvas size
		cwidth					: 700,		
		cheight					: 400,		
		vwidth					: 700,		
		vheight					: 400,		
		virt					: 't',		
		noratio					: false,	// false	-	keeps ratio proportionally when putting image from virt='m' to canvas,
		cCSS					: 1,		// if truthful and not csize === 'f', follow canvas.style CSS.
		min_width				: '',		
		min_height				: '',		
		body_overflow			: '',		// 'hidden',
		wrap_overflow			: '',		// 'hidden',
		animation_is_allowed	: true,
		use_setTimeout			: false,	
		doSyncTime				: true, 	
		screen_center_x			: null,
		screen_center_y			: null,
		stop_on_click			: false,
		stop_afer_tick			: false,	//	"true" fires frames click by click
		disable_landing_loading_warning : true,
		landingSplashDuration	: 1000,		
		run_flying_shadows		: true,
		grainsNumber			: 0,
		sprite_url				: '',	// 'img/mysprite.png',
		boxMax					: 500,	
		bodyRadiusMax			: 20,	
		originY					: 200,
		scale					: 100,
		framesInCircle			: 500,	
		scaffold				: ''	
	}; 
	for( var pp in default_conf  )
	{
		if( default_conf.hasOwnProperty( pp ) )
		{
			if( !conf[ pp ] && conf[ pp ] !== 0 )
			{
				conf[ pp ] = default_conf[ pp ];
			}
		}
	}
}) ();

( function () {
	var btb		= window.btb$	= window.btb$		|| {};
	var graph	= btb.graph		= btb.graph			|| {};
	var conf	= graph.conf	= graph.conf		|| {};
	var dsprite	= graph.dsprite	= graph.dsprite		|| {};
	var dconf = 
	{
			doRadialGradient	: false,
			doFill				: false,	
			titlePosX			: -350,
			titlePosY			: 200,
			swap_gradients		: 1,		
			startColorA			: 1,
			endColorA			: 1
	}
	var shape_paths				= dconf.shape_paths			= [];
	var start_colors			= dconf.start_colors		= [];
	var linear_gradients		= dconf.linear_gradients	= [];
	var rad_gradients			= dconf.rad_gradients		= [];
	var startup_rr_r0			= dsprite.startup_rr_r0		= [];
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
		dsprite.prepareParameters = function ( itemsMax, loaded_sprites )
		{ 
			for( var ii = 0; ii < itemsMax; ii++ )
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
			dsprite.prepareParametersToDraw(  dconf, itemsMax, loaded_sprites );
		};
}) ();

( function () {
	var conf;
	( function () {
		var btb		= window.btb$	= window.btb$					|| {};
		var graph	= btb.graph		= btb.graph						|| {};
		conf		= graph.conf	= graph.conf					|| {};
	}) ();
	conf.flying_shadows =
	{			
			flat_sprite_url : '', //img/mysprite',
			flat_sprite_ext	: 'png',
			custom_image_url	: '', //'img/title',
			custom_image_ext	: 'png',
			start_gradient		: null,	//	when not "falseful", disables "main-scenario" drawings and enables
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
	conf.flying_shadows.seeds = [];
}) ();

( function () {
	var scenario;	
	var graph;
	var conf;
	( function ( name ) {
			var btb		= window.btb$		= window.btb$			|| {};		
			graph		= btb.graph			= btb.graph				|| {};
			conf		= graph.conf		= graph.conf			|| {};
			scenario	= graph[ name ]		= graph[ name ]			|| {};
	}) ( 'scenario' );
	scenario.run = function () {
		graph.init( {} );
		var canvas_wrap = $( '#canvas_wrap' );
		canvas_wrap.css( 'opacity', 0 );
		canvas_wrap.css( 'visibility', 'visible' );
		canvas_wrap.animate({ opacity : 1 }, conf.landingSplashDuration );
	}; 
}) ();

