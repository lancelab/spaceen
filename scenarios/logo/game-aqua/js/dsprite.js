
//	//\\//			Sets internal structure of dynamic sprite.
//					Copyright (c) 2013 Konstantin Kirillov





( function () {


	var btb				=	window.btb$				= window.btb$			|| {};
	var graph			=	btb.graph				= btb.graph				|| {};
	var conf			=	graph.conf				= graph.conf			|| {};
	var dsprite			=	graph.dsprite			= graph.dsprite			|| {};
	var wcflyer			=	conf.cflyer				= conf.cflyer			|| {};
	var dconf			=	wcflyer.dconf			= wcflyer.dconf			|| {};
	var	flyer			=	graph.flyer				= graph.flyer			|| {};
	var mstones		=	graph.mstones	= graph.mstones		|| {};
	var capturer	=	graph.capturer	= graph.capturer	|| {};
	var lowLevelScreen	=	flyer.lowLevelScreen	= flyer.lowLevelScreen	|| {};




	//	//\\	Local settings
	var sceneScale		= 1.5;

	//:	Do make bigger if not enough
	var halfClipX		= 130;
	var halfClipY		= 150;
	var	halfWordX		= 355;
	var	halfWordY		= 100;


	var topFacet		= 5;
	var facetEnlighter	= 3;
	var facetAdder		= 150;	// Flag. If !! then used instead of facetEnlighter.
	//	\\//	Local settings




	var primaryDConf = 
	{

			doDisableR0			: true,

			doRadialGradient	: false,
			fillSprites				: true,		// amends doRadialGradient and linear gradient; 
											// apparently, true speeds up significantly for big sprites;
			titlePosX			: -350,
			titlePosY			: 200,
			swap_gradients		: 1,		//	0 - no swap, 1 swap. Apparently changes role of indices in grad.-array.
			startColorA			: 1,
			endColorA			: 1,

			//:	These parameters restrict color and alpha during normal and culmination scenario periods
			colorUpperBound		: 255,		// !colorUpperBound, then will be set to 255 automatically
			alphaUpperBound		: 1,		// !alphaUpperBound, then will be set to 1.0 automatically
			culmColorUpperBound	: 255,		// !value, then will be set to 255 automatically
			culmAlphaUpperBound	: 1,		// !value, then will be set to 1.0 automatically

			pauseExtendedStart	: 100,		// extends pause area to neighbourhood-of-0 for ticks for
											// animations external to dsprite: "foregrounds" for example;
											//
											// alpha has own restriction in this area;
											// falseful, 0 do disable this parameter;
											//
											// affects addCulStartToPause
											//
			addCulStartToPause	: 50		// depends on dconf.pauseExtendedStart
											// sets time periods before and after pause to use memLoss established for pause.


	}
	var shape_paths				= primaryDConf.shape_paths		= [];
	var shape_functions			= primaryDConf.shape_functions	= [];
	var start_colors			= primaryDConf.start_colors		= [];
	var hsl_start_colors		= primaryDConf.hsl_start_colors	= [];
	primaryDConf.end_colors		= [];
	var linear_gradients		= primaryDConf.linear_gradients	= [];
	var rad_gradients			= primaryDConf.rad_gradients	= [];
	var startup_rr_r0			= primaryDConf.startup_rr_r0	= [];



	//: locals
	var itemLineGradPoints		= [];
	var coreShapes = [];
	var letterPosX				= [];
	//var	halfScreenClipX;
	//var	halfScreenClipY;



	dsprite.resetDrawPars = function ()
	{
		//	Useless?:
		//	halfScreenClipX = lowLevelScreen.centerX;
		//	halfScreenClipY = lowLevelScreen.centerY;
		//	c ccc( 'resetDrawPars ' + halfScreenClipX );
	};



	///	Helper. Part of painter.
	var preTwin = function ( ctx, strokeStyle, fillStyle, scale, facet, itemIx )
	{
		var fscale		= sceneScale * scale;
		//var rfscale		= 1 / fscale;
		var r0X			= startup_rr_r0[ itemIx ] || 0;
		var lpX			= letterPosX[ itemIx ]; // * rfscale;
		if( r0X )
		{

			var localizeX	= -lpX;
			var localizeY	= -halfWordY;

			var minClipX	= lpX - halfClipX;
			var maxClipX	= lpX + halfClipX;
			var minClipY	= 0;
			var maxClipY	= halfClipY * 2;

		}else{
			var localizeX	= -halfWordX;
			var localizeY	= -halfWordY;

			var minClipX	= 0;
			var maxClipX	= halfWordX * 2;
			var minClipY	= 0;
			var maxClipY	= halfWordY * 2;
		}


		//:	group
		ctx.lineCap = 'butt';
		ctx.lineJoin = 'miter';
		ctx.miterLimit = 4;

		ctx.scale( fscale, fscale );
		ctx.translate( localizeX, localizeY );

		ctx.beginPath();
		ctx.moveTo( minClipX,	minClipY);
		ctx.lineTo( maxClipX,	minClipY);
		ctx.lineTo( maxClipX,	maxClipY);
		ctx.lineTo( minClipX,	maxClipY);
		ctx.closePath();
		ctx.clip();

		if( facet )
		{
			ctx.save();
			ctx.translate( 0, -topFacet );
			// c ccc( 'faceted=' + topFacet );
			// c ccc( 'faceted=' + topFacet + ' minClipX=' + minClipX + ' r0X=' + r0X + ' fscale=' + fscale );
		}


	};







	///	Protects color and alpha to go out of range 0...1 and from 
	//	taking format e-23.
	var facetColorizer = function ( color )
	{
		if( facetAdder )
		{
			var result = Math.floor( color + facetAdder );
		}else{
			var result = Math.floor( color * facetEnlighter );
		}

		if( result > 255 ) result = 255;

		// var facet = graph.mstones.iterationExitEntered;
		// if( facet ) c ccc( 'raser=' + result + ' color=' + color + ' enl=' + facetEnlighter );

		return result;
	};





	/// "Universal" shape function.
	var shape_function = primaryDConf.shape_function = function(
							ctx, strokeStyle, fillStyle, scale, arg,
							startColorR, startColorG, startColorB, startColorA,
							endColorR, endColorG, endColorB, endColorA,
							itemIx
	){

		ctx.save();

		var g;
		var facet		= graph.mstones.iterationExitPassed;
		//var facet		= graph.mstones.iterationExitEntered;

		preTwin( ctx, strokeStyle, fillStyle, scale, facet, itemIx );

		if( facet )
		{

			g=ctx.createLinearGradient.apply( ctx, itemLineGradPoints[ itemIx ] );
			g.addColorStop( 0,"rgba(" + 
					facetColorizer( startColorR )	+ ", " +
					facetColorizer( startColorG	)	+ ", " +
					facetColorizer( startColorB	)	+ ", " + 
					startColorA	+ ")"
			);

			var ww = "rgba(" + 
					facetColorizer( endColorR )		+ ", " +
					facetColorizer( endColorG	)	+ ", " +
					facetColorizer( endColorB	)	+ ", " + 
					endColorA + ")";
			// c ccc( ww );
			g.addColorStop( 1, ww );

			ctx.fillStyle = g;
			coreShapes[ itemIx ]( ctx );
			ctx.restore();
		}

		// var wp = itemLineGradPoints[ itemIx ];
		// g = ctx.createLinearGradient( wp[0], wp[1], wp[2], wp[3] );
		g=ctx.createLinearGradient.apply( ctx, itemLineGradPoints[ itemIx ] );

		if( facet )
		{

			// c ccc( 'facet: ' + itemIx + ' rasing grad: ' + startColorR + ', ' + startColorG + ', ' +  startColorB + ', ' +  startColorA + ', ' +  endColorR + ', ' +  endColorG + ', ' +  endColorB + ', ' +  endColorA );
			// c ccc( '       gpath: '		 + wp[0] + ', ' + wp[1] + ', ' +  wp[2] + ', ' +  wp[3] );
			// if( itemIx === 0 ) done = true;
		}


		g.addColorStop( 0, "rgba(" + startColorR	+ ", " + startColorG	+ ", " + startColorB	+ ", " + startColorA	+ ")" );
		g.addColorStop( 1, "rgba(" + endColorR		+ ", " + endColorG		+ ", " + endColorB		+ ", " + endColorA		+ ")" );

		ctx.fillStyle = g;
		coreShapes[ itemIx ]( ctx );

		
		ctx.restore();
	};






	//... step 0 G //////////////////////////////////////////



	//facet:
	//g.addColorStop(0,"rgba(249, 252, 51, 0.31491712)");
	//g.addColorStop(1,"rgba(255, 222, 150, 1)");

	itemLineGradPoints [ 0 ]	= [ 102, 139, 79, 47 ];
	letterPosX [ 0 ]			= 64;
	coreShapes[ 0 ]				= function ( ctx )
	{
ctx.beginPath();
ctx.moveTo(64.267209,132.94552);
ctx.bezierCurveTo(30.842994,125.89707,41.544845,79.141438,66.504441,67.837471);
ctx.bezierCurveTo(89.792596,33.364209,128.59067,46.472225,132.3293,82.074334);
ctx.bezierCurveTo(137.51338,101.91961,106.91582,105.77493,106.43195,87.428461);
ctx.bezierCurveTo(85.511043,74.948945,52.157724,90.124255,61.73109,115.5282);
ctx.bezierCurveTo(68.500655,131.79187,114.09671,118.10647,81.994459,118.77391);
ctx.bezierCurveTo(65.198041,100.89778,86.41494700000001,102.19859,93.921816,103.43382);
ctx.bezierCurveTo(106.02994000000001,101.38947999999999,124.14017000000001,103.31766999999999,108.81143,120.48850999999999);
ctx.bezierCurveTo(99.136417,135.50334999999998,79.850674,134.12004,64.26720900000001,132.94552);
ctx.closePath();
ctx.fill();
	};







	//... step a1 //////////////////////////////////////////

	itemLineGradPoints [ 1 ]	= [ 165, 144, 155, 85 ];
	letterPosX [ 1 ]			= 157;
	coreShapes [ 1 ]			= function ( ctx )
	{
ctx.beginPath();
ctx.moveTo(157.4561,110.44819);
ctx.bezierCurveTo(148.4521,110.32404,129.89305,120.3009,149.0811,123.97944);
ctx.lineTo(153.36235,123.01069);
ctx.lineTo(156.92485,121.29194);
ctx.bezierCurveTo(164.26482,113.33852,162.17247999999998,110.51321999999999,157.4561,110.44819);
ctx.closePath();
ctx.moveTo(136.30413,135.54555);
ctx.bezierCurveTo(95.02961499999998,125.52596999999999,137.39381999999998,94.468583,158.98674,100.21616999999999);
ctx.bezierCurveTo(177.82734,91.49478799999999,149.71726,83.79936199999999,142.87465,93.96571699999998);
ctx.bezierCurveTo(112.56704,88.65066699999998,171.01053000000002,61.808182999999985,179.0503,84.97392799999999);
ctx.bezierCurveTo(181.53025,99.44748399999999,177.20077,124.34045999999998,172.77015,134.83019);
ctx.bezierCurveTo(159.03981,130.9972,151.61414,133.98415999999997,136.30413,135.54555);
ctx.closePath();
ctx.fill();
};




//... step m1 //////////////////////////////////////////

	itemLineGradPoints [ 2 ]	= [ 248, 133, 216, 77 ];
	letterPosX [ 2 ]			= 187;
	coreShapes[ 2 ]				= function ( ctx )
	{
ctx.beginPath();
ctx.moveTo(187.18135,127.39352);
ctx.bezierCurveTo(194.61589,110.70058999999999,173.10749,67.425,205.53987,79.991702);
ctx.bezierCurveTo(214.32844,77.715652,238.12759,76.403772,245.14517,86.373239);
ctx.bezierCurveTo(263.59648,66.065066,276.31597,90.383258,262.70728,112.40800999999999);
ctx.bezierCurveTo(256.66984,121.48534999999998,248.41880000000003,126.71936,240.76721000000003,134.37027999999998);
ctx.bezierCurveTo(212.77794000000003,139.42317999999997,234.06462000000005,122.16575999999998,241.03315000000003,107.62273999999998);
ctx.bezierCurveTo(235.00171000000003,87.65132399999997,229.68891000000002,118.95433999999997,222.24622000000002,134.55086999999997);
ctx.bezierCurveTo(202.52797,140.28296999999998,209.55974000000003,117.82761999999997,216.28406,105.13607999999998);
ctx.bezierCurveTo(214.48389,86.72048399999997,207.65539,114.64886999999997,201.25937000000002,129.33648999999997);
ctx.bezierCurveTo(201.54664000000002,141.78147999999996,189.02029000000002,139.06656999999996,187.18135,127.39351999999997);
ctx.closePath();
ctx.fill();
};





//... step e //////////////////////////////////////////

	itemLineGradPoints [3]	= [ 316, 143, 288, 88 ];
	letterPosX [ 3 ]		= 300;
	coreShapes[ 3 ]			= function ( ctx )
	{
ctx.beginPath();
ctx.moveTo(308.03655,102.42493);
ctx.bezierCurveTo(311.17184,74.599744,267.09789,106.12118000000001,296.88572,104.16132);
ctx.bezierCurveTo(300.62599,103.95332,304.60965,104.34344,308.03655,102.42493);
ctx.closePath();
ctx.moveTo(281.25748,136.57707);
ctx.bezierCurveTo(257.42991,129.93610999999999,272.01801,64.76004999999999,296.68507,78.630693);
ctx.bezierCurveTo(328.6214,65.78730399999999,338.12952,120.71500999999999,306.63615,113.00162999999999);
ctx.bezierCurveTo(296.56617,111.23546999999999,271.56410999999997,112.76328,290.91767,125.12592);
ctx.bezierCurveTo(297.83198,125.20371999999999,324.17352999999997,109.77564,312.93482,128.14257999999998);
ctx.bezierCurveTo(305.68093,136.20923,291.54146000000003,140.22512999999998,281.25748,136.57707);
ctx.closePath();
ctx.fill();
};




/// Step. m2. //////////////////////////////////////////

	itemLineGradPoints [4]	= [ 396, 147, 342, 70 ];
	letterPosX [ 4 ]		= 327;
	coreShapes[ 4 ]			= function ( ctx )
	{

ctx.beginPath();
ctx.moveTo(327.88934,127.48893);
ctx.bezierCurveTo(335.32388000000003,110.79599999999999,313.81548,67.520405,346.24786,80.087105);
ctx.bezierCurveTo(355.03643,77.811055,378.83558,76.499175,385.85316,86.468645);
ctx.bezierCurveTo(404.30447,66.160471,417.02396,90.47866499999999,403.41527,112.50341999999999);
ctx.bezierCurveTo(397.37783,121.58076,389.12679,126.81477,381.47520000000003,134.46569);
ctx.bezierCurveTo(353.48593000000005,139.51859,374.77261000000004,122.26116999999999,381.74114000000003,107.71815);
ctx.bezierCurveTo(375.70970000000005,87.746725,370.3969,119.04974999999999,362.95421000000005,134.64628);
ctx.bezierCurveTo(343.23596000000003,140.37838,350.26773000000003,117.92302999999998,356.99205000000006,105.23149);
ctx.bezierCurveTo(355.1918800000001,86.815885,348.36338000000006,114.74427999999999,341.96736000000004,129.43189999999998);
ctx.bezierCurveTo(342.25463,141.87688999999997,329.72828000000004,139.16197999999997,327.88934000000006,127.48892999999998);
ctx.closePath();
ctx.fill();
};



/// Step. m2. //////////////////////////////////////////

	itemLineGradPoints [5]	= [ 449, 144, 419, 88 ];
	letterPosX [ 5 ]		= 440;
	coreShapes[ 5 ]			= function ( ctx )
	{
ctx.beginPath();
ctx.moveTo(440.36821,111.89427);
ctx.bezierCurveTo(431.36420999999996,111.77012,412.80516,121.74698000000001,431.99321,125.42552);
ctx.lineTo(436.27446,124.45677);
ctx.lineTo(439.83696,122.73802);
ctx.bezierCurveTo(447.17692999999997,114.78460000000001,445.08459,111.95930000000001,440.36821,111.89427);
ctx.closePath();
ctx.moveTo(419.21623999999997,136.99163000000001);
ctx.bezierCurveTo(377.94172999999995,126.97205000000001,420.30593,95.91466300000002,441.89885,101.66225000000001);
ctx.bezierCurveTo(460.73945,92.94087300000001,432.62937,85.24544300000002,425.78675999999996,95.41180300000002);
ctx.bezierCurveTo(395.47914999999995,90.09675300000002,453.92263999999994,63.25426600000002,461.96241,86.42001300000003);
ctx.bezierCurveTo(464.44235999999995,100.89356000000002,460.11287999999996,125.78654000000003,455.68226,136.27627);
ctx.bezierCurveTo(441.95192,132.44328000000002,434.52625,135.43024,419.21623999999997,136.99163000000001);
ctx.closePath();
ctx.fill();
};




	// step z /////////////////////////////////////////////////////////////////

	itemLineGradPoints [ 6 ]	= [ 508.38708,146.41936,478.70969, 77 ];
	letterPosX [ 6 ]			= 463;
	coreShapes[ 6 ]				= function ( ctx )
	{
ctx.beginPath();
ctx.moveTo(463.50051,135.60484);
ctx.bezierCurveTo(462.84547000000003,116.57025999999999,493.8192,104.10853999999999,492.4848,91.02300299999999);
ctx.bezierCurveTo(479.52682,95.741982,460.87412,82.85386299999999,480.59856,78.65268999999999);
ctx.bezierCurveTo(493.16687,78.354895,505.73761,78.758889,518.30645,78.854839);
ctx.bezierCurveTo(519.46838,87.778402,516.04037,94.713997,508.87492000000003,100.03085);
ctx.bezierCurveTo(499.58008,109.85674,475.05885,129.4802,504.27769,124.39809);
ctx.bezierCurveTo(525.19903,129.41087,497.30463000000003,141.87556999999998,486.24302,136.35484);
ctx.bezierCurveTo(478.67263,136.20392999999999,471.02554,136.53856,463.50051,135.60484);
ctx.closePath();
ctx.fill();
};




//... step i no period //////////////////////////////////////////

	itemLineGradPoints [ 7 ]	= [ 533.5484,141.90323,527.21857,69.645164 ];
	letterPosX [ 7 ]			= 514;
	coreShapes[ 7 ]			= function ( ctx )
	{
ctx.beginPath();
ctx.moveTo(514.43447,135.00178);
ctx.bezierCurveTo(520.65243,118.60522,516.97163,66.884939,540.00264,81.674331);
ctx.bezierCurveTo(536.93474,99.629047,532.80971,117.37913,529.1102500000001,135.20969);
ctx.bezierCurveTo(524.24072,135.20669,519.22743,136.16454,514.43447,135.00178);
ctx.closePath();
ctx.fill();
};



	/// Step. Period on i. //////////////////////////////////////////
	itemLineGradPoints [ 8 ]	= [ 539.35486,74.161293,535.28485,57.835873 ];
	letterPosX [ 8 ]			= 527;
	coreShapes[ 8 ]				= function ( ctx )
	{
ctx.beginPath();
ctx.moveTo(527.07937,70.904075);
ctx.bezierCurveTo(524.00192,43.545863000000004,558.34621,66.936738,536.20236,71.376362);
ctx.bezierCurveTo(533.15609,71.476112,530.0395,71.815568,527.07937,70.904075);
ctx.closePath();
ctx.fill();
};








	//... step n

	itemLineGradPoints [ 9 ]	= [ 583.87097,142.54839,567.92212,69.645164 ];
	letterPosX [ 9 ]			= 537;
	coreShapes[ 9 ]				= function ( ctx )
	{
ctx.beginPath();
ctx.moveTo(537.79342,136.49236);
ctx.bezierCurveTo(546.40671,119.37566999999999,536.5816699999999,76.59546399999999,562.61919,79.841611);
ctx.bezierCurveTo(566.8085,89.09052199999999,598.84433,65.483136,598.03574,92.160378);
ctx.bezierCurveTo(596.34603,107.13811,580.05312,122.37679,577.1269,137.14517);
ctx.bezierCurveTo(550.2332799999999,143.54171,575.81863,109.78191000000001,574.25469,95.03777400000001);
ctx.bezierCurveTo(556.87243,79.98561900000001,555.68971,115.05198000000001,553.78883,129.77027);
ctx.bezierCurveTo(554.53644,140.1336,544.81344,136.03061000000002,537.79342,136.49236000000002);
ctx.closePath();
ctx.fill();
};




	/// Step g //////////////////////////////////////////
	itemLineGradPoints [ 10 ]	= [ 663.87097,203.83871,625.80646,49.645161 ];
	letterPosX [ 10 ]		= 637;
	coreShapes[ 10 ]			= function ( ctx )
	{

ctx.beginPath();
ctx.moveTo(637.71204,176.25074);
ctx.bezierCurveTo(665.24903,161.78138,625.48454,153.98610000000002,611.26324,171.03273000000002);
ctx.bezierCurveTo(611.00638,175.98309,629.58415,185.8607,637.71204,176.25074);
ctx.closePath();

ctx.moveTo(614.68643,193.5233);
ctx.bezierCurveTo(596.08367,194.83745000000002,584.4502699999999,171.58202,609.04385,155.18931);
ctx.bezierCurveTo(622.01584,153.9737,650.0264500000001,138.59361,629.08763,139.76235);
ctx.bezierCurveTo(599.687,147.79482,590.88009,101.92761999999999,607.65528,87.049496);
ctx.bezierCurveTo(617.31598,70.77899400000001,630.1025199999999,86.045466,640.1550299999999,78.51832300000001);
ctx.bezierCurveTo(654.0492999999999,13.00672800000001,702.9196499999999,50.50883400000001,664.0717099999999,83.12326100000001);
ctx.bezierCurveTo(649.92023,94.33612200000002,644.5768199999999,132.15783000000002,662.9237899999999,170.67856);
ctx.bezierCurveTo(677.1495399999999,186.93991,644.2335999999999,195.48162,614.68643,193.5233);
ctx.closePath();
ctx.moveTo(625.7709,121.71137);
ctx.bezierCurveTo(663.63046,114.33879,616.12403,75.575751,611.58016,108.75142);
ctx.bezierCurveTo(610.03297,119.50824,613.77204,126.8052,625.7709,121.71136999999999);
ctx.closePath();
ctx.fill();
};







	/////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////



	// //\\	Gradients /////////////////
	//		Not-used. Garbage. July 18.
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


	btb.paste_non_arrays( dconf, btb.paste_non_arrays( primaryDConf, dconf ) );


	dsprite.prepareConfig = function ( loaded_sprites )
	{ 

			var start_colors	= dconf.start_colors;
			var end_colors		= dconf.end_colors;
			var doDisableR0		= dconf.doDisableR0;
			startup_rr_r0		= dconf.startup_rr_r0;

			//.	skips (re)generation if captured or forbidden
			if(	( capturer.conf && !flyer.iteration ) || ( flyer.iteration && !conf.rerandom ) ) return;


			///	This "kills own letter centers".
			for( var ii = 0, wlen = conf.itemsMax; ii < wlen; ii++ )
			{
				if( doDisableR0 )
				{
					startup_rr_r0[ ii ] = 0;
				}else{
					startup_rr_r0[ ii ] = ( letterPosX[ ii ] - halfWordX ) * sceneScale;
				}
			}



			for( var ii = 0; ii < conf.itemsMax; ii++ )
			{
				/// [0] - R, [1] - G, [2] - B

				if( ii < conf.itemsMax )
				{

					switch( ii )
					{

						case 0:
							var cR = 249;
							var cG = 252;
							var cB = 51;

							var ceR = 255;
							var ceG = 0;
							var ceB = 0;

							break;

						case 1:

							var cR = 228;
							var cG = 255;
							var cB = 0;

							var ceR = 255;
							var ceG = 80;
							var ceB = 0;

							break;

						case 2:	// m1
							var cR = 228;
							var cG = 255;
							var cB = 0;

							var ceR = 233;
							var ceG = 120;
							var ceB = 0;

							break;

						case 3: // e

							var cR = 0;
							var cG = 200;
							var cB = 100;

							var ceR = 220;
							var ceG = 180;
							var ceB = 0;

							break;

						case 4: // m2

							var cR = 0;
							var cG = 150;
							var cB = 200;

							var ceR = 0;
							var ceG = 200;
							var ceB = 50;

							break;


						case 5:
/// Step. m2. //////////////////////////////////////////
//g.addColorStop(0, "rgba(55, 165, 255, 1)");
//g.addColorStop(1, "rgba(55, 255, 225, 1)");

							var cR = 0;
							var cG = 110;
							var cB = 200;

							var ceR = 0;
							var ceG = 200;
							var ceB = 170;

							break;
						case 6:


//step z. step 6.

//g.addColorStop(0, "rgba(60, 140, 255, 1)");
//g.addColorStop(1, "rgba(60, 240, 240, 1)");

							var cR = 0;
							var cG = 80;
							var cB = 200;

							var ceR = 0;
							var ceG = 180;
							var ceB = 180;

							break;

					case 7:

//step 7 step i no period
//g.addColorStop(0, "rgba(60, 140, 255, 1)");
//g.addColorStop(1, "rgba(120, 230, 255, 1)");


							var cR = 0;
							var cG = 80;
							var cB = 230;

							var ceR = 60;
							var ceG = 160;
							var ceB = 190;

							break;


					case 8:
//step period. step 8.
//g.addColorStop(0,"rgba(160, 255, 255, 1)");
//g.addColorStop(1,"rgba(220, 255, 255, 1)");


							var cR = 100;
							var cG = 180;
							var cB = 180;

							var ceR = 150;
							var ceG = 230;
							var ceB = 230;

							break;


					case 9:
//step n step 9.
//g.addColorStop(0, "rgba(160, 160, 255, 1)");
//g.addColorStop(1, "rgba(60, 210, 255, 1)");

							var cR = 100;
							var cG = 100;
							var cB = 230;

							var ceR = 0;
							var ceG = 150;
							var ceB = 230;

							break;




					case 10:

//letter g step 10
//g.addColorStop(0, "rgba(70, 70, 255, 1)");
//g.addColorStop(1, "rgba(180, 180, 255, 1)");

							var cR = 10;
							var cG = 10;
							var cB = 255;

							var ceR = 120;
							var ceG = 120;
							var ceB = 200;

							break;










					}
				}else{
					var cR = 255;
					var cG = 255;
					var cB = 255;
				}


				start_colors[ii] =
				[
					{ 
						c0	: cR,
						amp : 200	* ( 1 + 2 * Math.random() ),
						vv	: 0.5	* ( 1 + 2 * Math.random() )		// cyclic frequency
					},

					{ 
						c0	: cG,
						amp : 150	* ( 1 + 2 * Math.random() ),
						vv	: 0.3	* ( 1 + 2 * Math.random() )
					},

					{ 
						c0	: cB,
						amp : 100	* ( 1 + 2 * Math.random() ),
						vv	: 0.2	* ( 1 + 2 * Math.random() )
					}
				];

				end_colors[ii] =
				[
					{ 
						c0	: ceR,
						amp : 200	* ( 1 + 2 * Math.random() ),
						vv	: 0.5	* ( 1 + 2 * Math.random() )		// cyclic frequency
					},

					{ 
						c0	: ceG,
						amp : 150	* ( 1 + 2 * Math.random() ),
						vv	: 0.3	* ( 1 + 2 * Math.random() )
					},

					{ 
						c0	: ceB,
						amp : 100	* ( 1 + 2 * Math.random() ),
						vv	: 0.2	* ( 1 + 2 * Math.random() )
					}
				];

 			};
			capturer.increaseCounter();
	};




}) ();
