
//	//\\//			Sets internal structure of dynamic sprite.
//					Copyright (c) 2013 Konstantin Kirillov


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
			fillSprites				: true,		//	amends doRadialGradient and linear gradient
			titlePosX			: -548,
			titlePosY			: -224,
			titleScale			: 0.4,
			swap_gradients		: 0,		//	0 - no swap, 1 swap. Apparently changes role of indices in grad.-array.
			startColorA			: 0.08,		//	0.2,	//	scenario-wide color "diminisher" ... why? TODM put in master-words-dsprite
			endColorA			: 0.08,		//	0.2,
			colorUpperBound		: 255,		// !colorUpperBound, then will be set to 255 automatically
			culmColorUpperBound	: 255,
			alphaUpperBound		: 0.08,		// !alphaUpperBound, then will be set to 1.0 automatically
			culmAlphaUpperBound	: 0.001,
			pauseExtendedStart	: 200,		//	in ticks

			addCulStartToPause	: false		// Extends duration pause-mem-Loss to culmination area

	};
	var shape_paths				= primaryDConf.shape_paths		= [];
	var shape_functions			= primaryDConf.shape_functions	= [];
	var start_colors			= primaryDConf.start_colors		= [];
	var hsl_start_colors		= primaryDConf.hsl_start_colors	= [];
	var linear_gradients		= primaryDConf.linear_gradients	= [];
	var rad_gradients			= primaryDConf.rad_gradients	= [];
	var startup_rr_r0			= primaryDConf.startup_rr_r0	= [];



		
	var PI					= 3.1415926;
	var PID2				= PI / 2;
	var PI2					= PI * 2;


		//:	Fully defines shape
	
		var wscale			= 0.5;
		var innerShift		= 153	* wscale;
		var outerRadius 	= 500	* wscale;
		var misfit			= 3		* wscale;
		var radTip1			= 48	* wscale;
		var radTip2			= 43.5  * wscale;


		var ecenterX		= 300;
		var ecenterY		= 0;

		var topShift	= 0;
		var radTip		= radTip1;
		var centerCY	= topShift / 2;
		var rad			= outerRadius;

		var swith 		= function ( ix, reflect )
		{
			var radIn		= rad - radTip;
			var centerInY	= topShift + 2 * radTip + radIn - outerRadius;
			var centerTipY	= radTip + topShift - outerRadius;

			shape_paths[ ix ] =
			[
				{
					r			: rad,
					startAngle	: 0,
					angle		: PI2,
					x			: ecenterX,
					y			: reflect ? -centerCY : centerCY,
					dir			: false
				}			];
			if( ix === 0 )
			{
				linear_gradients[ 0 ] =
				{
						X			: -outerRadius,
						Y			: -outerRadius
				};

				linear_gradients[ 1 ] =
				{
						X			: outerRadius,
						Y			: outerRadius
				}
			}
		};

		swith( 0 );


		// //\\	Gradients /////////////////
		rad_gradients[ 0 ] =
		{
				R					: 0,
				X					: outerRadius * 0.75,
				Y					: outerRadius * 0.75,
		};
		rad_gradients[ 1 ] =
		{
				R					: outerRadius * 2,
				X					: outerRadius * 0.75,
				Y					: outerRadius * 0.75,
		};
		// \\//	Gradients /////////////////

		btb.paste_non_arrays( dconf, btb.paste_non_arrays( primaryDConf, dconf ) );


		dsprite.prepareConfig = function ( loaded_sprites )
		{ 
			var start_colors = dconf.start_colors;

			//.	skips (re)generation if captured or forbidden
			if(	( capturer.conf && !flyer.iteration ) || ( flyer.iteration && !conf.rerandom ) ) return;

			for( var ii = 0; ii < conf.itemsMax; ii++ )
			{

				var wR = 50;	//140;
				var wG = 140;
				var wB = 140;	//50;

				var wint = ii % shape_paths.length;
				/*
				if( wint === 0 )
				{
					var wR = 100;
					var wG = 130;
					var wB = 160;
				}
				*/

				/// [0] - R, [1] - G, [2] - B
				start_colors[ii] =
				[
					{ 
						c0	: wR,
						amp : 200	* ( 1 + 2 * Math.random() ),
						vv	: 0.5	* ( 1 + 2 * Math.random() )		// cyclic frequency
					},

					{ 
						c0	: wG,
						amp : 150	* ( 1 + 2 * Math.random() ),
						vv	: 0.3	* ( 1 + 2 * Math.random() )
					},

					{ 
						c0	: wB,
						amp : 100	* ( 1 + 2 * Math.random() ),
						vv	: 0.2	* ( 1 + 2 * Math.random() )
					}
				];
 			};
			capturer.increaseCounter();
	};



}) ();
