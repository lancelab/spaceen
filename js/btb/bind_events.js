

//	//\\//	Purpose:			Bind keypress events to document and supply key-human-name to handlers.
//
//			Depends:			on jQuery.
//			Implementation:		Is a wrapper around "bind" method
//			Version:			0.0.3
//			Date:				November 11, 2011 - May 18, 2013
//			License:			MIT
//			Copyright:			(c) 2013 Konstantin Kirillov 






( function () {




	var btb = window.btb$ = window.btb$ || {};		



	///	Sets keyboard handler, callbak.
	//	Parameters:			Attempted to keep the same as for "bind"
	//	Supplies to handler:  {keyName:..., event:..., arrow:true/false }
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



	///	Keyboard Table:
	//	Maps keyCodes to human words across the browsers.
	//	Not to be used directly. Use whichKey(...).
	//	Credit as of November 11, 2011 to Jan Wolter: http://unixpapa.com/js/key.html
	KEY =
	{	

			//C o m m o n:
			//Mozilla, IE, Opera, pseudoASCII, no exceptions:

				//alpha: from 65 till 90:
				65	: [	'a','b','c','d','e','f','g','h','i','j','k','l','m','n',
						'o','p','q','r','s','t','u','v','w','x','y','z'],


				32	: 'space',
				13	: 'enter',
				9	: 'tab',
				27	: 'escape',
				8	: 'backspace',
				//Arrows:
				37	: 'left',
				38	: 'up',
				39	: 'right',
				40	: 'down',
				//Special:
				45	: 'insert',
				46	: 'delete',
				36	: 'home',
				35	: 'end',
				33	: 'pageup',
				34	: 'pagedown',
				//Function keys:
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

			//M i s c o m m o n:
			//Modifiers: Exceptions.
			16	: 'shift',
			17	: 'control',
			18	: 'alt',
			20	: 'capslock',
			144	: 'numlock',
			//Keyboard Number. Except p.A. Exceptions.
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
			//Symbols. Many differences.
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
			//TODm add keypad:
	};		

	var	whichKey = function(keyCode)
	{
		if( !keyCode ) return null;
		if( 65 <= keyCode && keyCode <= 90 ) return KEY[ 65 ][ keyCode - 65 ];
		return KEY[ keyCode ];
	}

	return self;

}) ();



