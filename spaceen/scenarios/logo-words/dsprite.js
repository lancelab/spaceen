
//	//\\//			Sets internal structure of dynamic sprite.
//					Copyright (c) 2013 Konstantin Kirillov


( function () {


	var btb		= window.btb$	= window.btb$		|| {};
	var graph	= btb.graph		= btb.graph			|| {};
	var conf	= graph.conf	= graph.conf		|| {};
	var dsprite	= graph.dsprite	= graph.dsprite		|| {};



	var dconf = 
	{
			doRadialGradient	: false,
			doFill				: false,	// amends doRadialGradient and linear gradient; 
											// apparently, true speeds up significantly for big sprites;
			titlePosX			: -350,
			titlePosY			: 200,
			swap_gradients		: 1,		//	0 - no swap, 1 swap. Apparently changes role of indices in grad.-array.
			startColorA			: 1,
			endColorA			: 1
	}
	var shape_paths				= dconf.shape_paths			= [];
	var start_colors			= dconf.start_colors		= [];
	var linear_gradients		= dconf.linear_gradients	= [];
	var rad_gradients			= dconf.rad_gradients		= [];

	var startup_rr_r0			= dsprite.startup_rr_r0		= [];
	

	( function build_shapes () {

		var _W			= 0;	//	word index

		var masterBT	= 0;	//	word Y-offset to be displayed
		var masterWordX	= -200;	//	-300;	//	word offset to be displayed

		var dataWordX	= 68;	//	word offset when entering a data

		var bTT			= 90;	//	toppest Top
		var bT			= 93;	//	top
		var bM			= 143;	//	middle
		var bMU			= 109;
		var bML			= 118;
		var bB			= 166;	//	bottom

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
			221, 110,	// h legs bridge top
			233, 122,	// second leg straight area begins
			223, bB,

			// bottom x begins decreasing
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
		var groups	= 2;	// 2: no bezier point, all are straight lines
		for( var ii = 0, len = shapes.length; ii < len; ii++ )
		{
			var shapesP = shapes[ ii ];
			var paths = shape_paths[ ii ] = [];
			for( var point = 0, lenp = shapesP.length / groups; point < lenp; point++ )
			{
				var ix = point * groups;
				//.	creates empty object
				paths[ point ]		=	paths[ point ] || {};
				//:	fills object with point
				paths[ point ].x	=	shapesP[ ix		] + xShift;
				paths[ point ].y	=	shapesP[ ix + 1	] + yShift;
			}
			//:	Let's take some middle point x as letter's center and set up
			//	r0 = x.
			var wmiddle = Math.floor( paths.length / 2 );
			var ww = startup_rr_r0[ ii ] = paths[ wmiddle ].x; // 0 disables settings.
			for( var point = 0, lenp = paths.length; point < lenp; point++ )
			{
				paths[ point ].x	-=	ww;
			}
		}

	}) (); // ( function build_shapes () {





		// //\\	Gradients /////////////////
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
		// \\//	Gradients /////////////////









		dsprite.prepareParameters = function ( itemsMax, loaded_sprites )
		{ 

			for( var ii = 0; ii < itemsMax; ii++ )
			{
				/// [0] - R, [1] - G, [2] - B
				start_colors[ii] =
				[
					{ 
						c0	: 255,
						amp : 200	* ( 1 + 2 * Math.random() ),
						vv	: 0.5	* ( 1 + 2 * Math.random() )		// cyclic frequency
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
