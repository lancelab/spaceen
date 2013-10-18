
//	//\\//	Beaver Tool Belt. BTB. Light weight JavaScript framework.
//			See jfon.readme below.
//			At a glance, this line { f : function () {}, ar : some-array, wrap : x } ...
//				converts to
//				{ 
//					f: { wrap : { fun : "function () ..." }, 
//					ar : { wrap : { arr : some-array-"naked" }, prop1 : ..., prop2 : ... } // where prop1, ...  are properties of some-array 
//					wrap : { esc : x }, 
//					....
//			
//				Hence, only these combinations of "wrap" property are possible in final result:
//					wrap : { fun ...;
//					wrap : { arr ...;
//					wrap : { esc ...;
//
//
//			CAVEATS	:	When serializing a funciton, be sure it does not have a "live" closure.
//						JFON is not serializing closures, so closure cannot be transported via JFON.
//						
//			Discussion:	http://stackoverflow.com/questions/16767431/parsing-functions-stored-as-strings-in-object-literal-json-syntax-and-differetia
//						http://perfectionkills.com/global-eval-what-are-the-options/
//						where to post this code: http://stackoverflow.com/questions/11556131/parsing-a-json-like-string-that-contains-functions?lq=1
//
( function ( window ) {


	//.	sets namespace
	var btb				= window.btb$		= window.btb$	|| {};
	//.	sets namespace for JFON
	var jfon			= btb.jfon			= btb.jfon		|| {};

	jfon.readme			=	"JavaScript Full Object Notation.\n\n" +
							"Version:    0.0.1. October 2, 2013.\n" +
							"Copyright:  (c) 2013 Konstantin Kirillov. License: MIT.\n" + 
							"Adds:       \"extra properties\" to JSON: storing functions and full array properties.\n" +
							"Method:     reserves property name \"wrap\" to wrap extra properties.\n" +
							"Objects:    without \"extra properties\" converted to original JSON.\n" +
							"Format:     is self-explanatory from test-samples.\n" +
							"More:       comments are in JFON.js\n\n";


	//	TODM Bad test. Use "Array protot" instead.
	var arrayDetector	= function ( obj ) { return ( typeof obj === 'object' ) && ( !!obj.length || obj.length === 0 ); };
	var hasOwn			= Object.prototype.hasOwnProperty;
	var detectIntIndex	= /^\-?[0-9]+$/;
	var undefined		= ( function ( undefined ) { return undefined; } ) ();






	//	//\\	Prepares object to be JSONed
	//			It skips elements with typeof element = 'undefined'.

	var toJFON = jfon.toJFON = function ( paper, recdepth, level )
	{
		level		= level	|| 0;
		var typ		= typeof paper;

		//.	returns "plain" objects
		if( paper === null || ( typ !== 'object' && typ !== 'function' ) ) return paper;
		//.	exterminates properties below restricted depth; TODM slow?
		if( ( recdepth || recdepth === 0 ) && level > recdepth ) return undefined;

		var wall = null;
		var wrap = null;

		if( typ === 'function' )
		{
			wrap		= wrap || {};
			wrap.fun	= paper.toString();
			//.	as of this version, ignores properties of function()
			return		{ wrap : wrap };
		}

		if( hasOwn.call( paper, 'wrap' ) )
		{
			wrap		= wrap || {};
			wrap.esc	= toJFON( paper.wrap, recdepth, level + 1 );
		}

		var arr = arrayDetector( paper ) && [];

		for( var pp in paper )
		{
			if( hasOwn.call( paper, pp ) )
			{
				var theValue = toJFON( paper[ pp ], recdepth, level + 1 );
				if( typeof theValue === 'undefined' ) continue;
				if( arr && detectIntIndex.test( pp + '' ) )
				{
					arr[ pp ] = theValue;
				}else if( pp !== 'wrap' ) {
					wall = wall || {};
					wall[ pp ] = theValue;
				}
			}
		}

		if( arr && !wall && !wrap )	wall = arr;
		wall = wall || {};
		if( arr || wrap )
		{
			wrap		= wrap || {};
			wall.wrap	= wrap;
			if( arr) wall.wrap.arr = arr;
		} 
		return wall;
	};



	///	Makes final step in recreating original object from "wrapper"
	var fromJFON = btb.fromJFON = function ( paper )
	{
		var typ = typeof paper;
		if( paper === null || ( typ !== 'object' && typ !== 'function' ) ) return paper;

		var wall = {};
		var wrap = paper.wrap;
		if( wrap )
		{
			if( wrap.fun )
			{
				wall = eval( '(' + wrap.fun + ')' );

			}else if( wrap.arr ) {

				wall = fromJFON( wrap.arr );
			}

			//.	restores wrap property and keeps wrap alive
			if( wrap.esc ) wall.wrap = fromJFON( wrap.esc );
		
		}else if( arrayDetector( paper ) ) {

			wall = [];
		}

		/// transfers array and object properties in one loop
		for( var pp in paper )
		{
			if( hasOwn.call( paper, pp ) && pp !== 'wrap' )
			{
				wall[ pp ] = fromJFON( paper[ pp ] );
			}
		}
		return wall;
	};




	//	//\\	API methods
	jfon.encode = function ( obj )
	{
		return JSON.stringify( toJFON( obj ), null, '\t');
	};

	jfon.decode = function ( obj )
	{
		return  fromJFON( JSON.parse( obj ) );
	};
	//	\\//	API methods



}) ( window );

