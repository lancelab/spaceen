
//	//\\//			Draws sprite's state


( function () {


	var btb		= window.btb$	= window.btb$		|| {};
	var graph	= btb.graph		= btb.graph			|| {};
	var conf	= graph.conf	= graph.conf		|| {};
	var dsprite	= graph.dsprite	= graph.dsprite		|| {};
	var	flyer	= graph.flyer	= graph.flyer		|| {};


	var PI				= 3.1415926;
	var PI2				= 2 * PI;
	var PID2			= PI / 2;
	var PI2T;							//	Unitless frequency multiplied with timeScale

	// var wD ebDone = false;



	//	//\\	Parameters made local for speed
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

	var endColorTicksThrot;		// Sets end-point-gradient dependence on ticks
	var endColorRatio;			// Sets end-point-gradient ratio
	var mstones;
	//	\\//	Parameters made local for speed





	/// Localizes settings for speed
	dsprite.prepareParameters = function ( loaded_sprites )
	{ 
			var capturer = graph.capturer;

			if(	!(	conf.cflyer.sprites &&
					( ( capturer.conf && !flyer.iteration ) ||  ( flyer.iteration && !conf.rerandom ) )
				)
			){
				dsprite.prepareConfig( loaded_sprites );
			}

			//.	Dconf is ready. Time to capture it.
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
			// softEase			= dconf.softEase;

	};




	// //\\	Master draw function for a sprite
	dsprite.draw = function ( arg )
	{

		var ctx						= arg.ctx;

		//: Position on global canvas
		var spriteCenterX			= arg.spriteCenterX;
		var spriteCenterY			= arg.spriteCenterY;

		//.	Rotation
		var angle					= arg.angle;

		//. Scale
		var ss						= arg.scale;
		var ticks					= Math.abs( arg.ticks );
		var item					= arg.item;



		var paths					= shape_paths.length && shape_paths[ item % shape_paths.length ];
		var paths_are_functions		= typeof paths === 'function';
		var fun_sprite				= shape_functions.length && shape_functions[ item % shape_functions.length ];

		//.	Exposes precedence of using functional-sprites
		var fun_sprite				= ( paths_are_functions && paths ) || fun_sprite || shape_function;
		paths						= !paths_are_functions && paths;
		if( !fun_sprite && !paths )
		{
			btb.deb( "no fun and no paths in dsprite is set" );
			//.	Fatal return. Nothing will be drawn for this sprite.
			return;
		}

		var sscc					= start_colors[ item ];
		var hsl_sscc				= hsl_start_colors[ item ];
		var eecc					= end_colors && end_colors[ item ];

		var inPausePhase 			= mstones.inPausePhase;



		//:	Locals
		var cosA;
		var sinA;
		var effectiveColorBound;
		var effectiveAlphaBound;

		// c ccc( ' ticks=' + ticks );

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
						case 0:	// hue?
								var color = cc.amp * Math.sin( PI2T * cc.vv * ticks ) + cc.c0;
								var startColorR = Math.min( Math.max( ( color + 360 ) % 360, 0 ), 360 );
								break;
						case 1:
								var color = cc.amp * Math.sin( PI2T * cc.vv * ticks ) + cc.c0;
								var startColorG = Math.min( Math.max( ( color + 100 ) % 100, 0 ), 100 );
								//var linear = ticks / conf.turnTicksPoint;
								//var startColorG = Math.min( cc.c0 + linear * 100, 100 );
								break;
						case 2: 
								var color = cc.amp * Math.sin( PI2T * cc.vv * ticks ) + cc.c0;
								var startColorB = Math.min( Math.max( ( color + 50 ) % 50, 0 ), 50 );
								//var linear = ticks / conf.turnTicksPoint;
								//var startColorB = Math.min( cc.c0 + linear * 50, 50 );
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
				//var color = cc.c0;
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

		///...	Master draw function for a sprite
		//... 	dsprite.draw = function ( arg )

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


		// //\\	Renormalizes alpha
		//		in possibly small time area around turning point | ticks | < fillFrom.
		//		After filling gradient with shortAlpha, result becomes a background for "main-scenario" drawings.
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
				///	Indispensable debug. Set ticks set to a small number like 10.
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

		} // if( !fillSprites

		//... 	dsprite.draw = function ( arg )

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
		

		///...	Master draw function for a sprite
		//... 	dsprite.draw = function ( arg )

		// //\\ Drawing

		//btb$.ifdeb ( 'Generating sprite', arg );


		if( paths )
		{
			ctx.beginPath();

			for( var iip = 0; iip < paths.length; iip++ )
			{

				var path = paths[ iip ];

				if( !conf.spaceTransf )
				{
					//::	JS manages rotation
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

					//::	Browser will manage rotation
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
							//::	JS manages rotation
							var startAngle	= path.startAngle + angle;
							var endAngle	= startAngle + path.angle;
						}else{

							//::	Browser will manage rotation
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

			} // for( var iip = 0; iip < paths.length; iip++ )
		} //	if( !fun_sprite )


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
		// \\// Drawing

		if( conf.spaceTransf ) ctx.restore();
		
	};
	// \\//	Master draw function for a sprite


}) ();
