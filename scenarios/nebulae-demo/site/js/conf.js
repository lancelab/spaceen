
// //\\//	Sets default configuration data.
//			Overridable by btb.graph.init and URL-query.



( function () {


	var btb			= window.btb$				= window.btb$				|| {};		
	var graph		= btb.graph					= btb.graph					|| {};
	var conf		= graph.conf				= graph.conf				|| {};


	var wb = 500;	//	box edge length; should be "multiple" of stepN;
	var	boxWrap =
	{
		doPrism	: true, // doPrism === make "infinitelly tall" prism;

		//.	"belongs" to box edge
		//	40 works on Opera, Ubuntu, Acer-laptop;
		//	> 80 for doPrism; 10 for !doPrism; stepN : 40;
		stepN : 80,

		edgeSize : 2 * wb,

		box :
		[
			[ -wb, -wb ], [ -wb, wb ], [ wb, wb ], [ wb, -wb ]
		],

		edge :
		[
			[ 1, 0 ], [ 0, -1 ], [ -1, 0 ], [ 0, 1 ]
		]
	};		



	var default_conf =
	{
		subapp					: 'nebulae',
		runFlyer				: false,
		in3D					: true,

		toggle_draw_on_click	: null,
		stop_afer_tick			: null,	//	"true" fires frames click by click

		stop_own_move_on_click	: null,
		never_let_internal_evol : null,
		startFromStopped		: null,

		//: Good debug
		// stop_own_move_on_click	: true,
		// startFromStopped			: true,

		// //\\	Generic animation parameters

		itemsMax				: 6,
		//backwardInTime		: false,
		runInfinitely			: true,
		ticksPeriod				: 4000,
		playPeriod				: 80000, // 40000, // box: 80000,	// ms. See self.animationInterval below.

		//use_setTimeout			: true,	//	Do ignore modern frame requestors
		//timeFromTicks			: true, 	//	Ticks do control time. time = ticks * conf.tickTimeStep (( see run_time_utility.js ))

		doSplashOnImgLoad		: true,
		landingSplashDuration	: 8000, // box: 8000,		// ms

		//:	CSS
		preventCanvasAbsPos		: true,		//	Possibly done to resolve conflict with projects relying on browser CSS fluid management



		// \\//	Generic animation parameters


		//.	Sets canvas-HTML-element background dynamic resizing
		//		0		- do nothing,
		//		-1		- set to window height,
		//		> 0		- set to window_width * canvasHeightToWidth
		canvasHeightToWidth		: 1.5,


		//	//\\ Gravity-project parameters ////////////////////////
		grainsNumber			: 0,

		imagesToLoad :
		[

			{
				name			: 'imgBgScenario',
				mode			: 'single',
				path			: '../../../../img/nebulae/bgImg.jpg',
				template		: '',
				ext				: '',
				count			: null,
				names			: []
			},

			{
				name			: 'load3DImg',
				mode			: 'names',	//	'single',
											//	'template',  like load3DImgPath/load3DImgBase.load3DImgExt
											//	'names',
				path			: '../../../../img/nebulae',
				template		: '',
				ext				: '',
				count			: null,
				lastImgIsSingle	: true,
				names			: 
				[
					//"slayer1.png",
					"slayer2.png",
					"hs-2006-19-c-full_jpg_small.png"
					// not ready "slayer3.png"
				]

			}
		],

		conf3D :
		{

			domCarousel	:
			{
				on					: null,
				placement			: 'vertical',
				arrangement			: 'circle',
				radius				: 500,
				distance			: 500,
				//stepX				: 0,
				//stepZ				: 0,
				stepY				: 10
			},


			putItemsToCircleR		: 500,
			putUniformly			: true,

			boxMaxZ					: 500, // 0, // cube: 500,

			boxCenterX				: 0,
			boxCenterY				: 0,
			boxCenterZ				: 0,

			originY					: 900,
			originZ					: 0,

			originYMax				: 1200,
			originYMin				: 0,

			xMax					: 100,
			xMin					: -100,
			zMax					: 200,
			zMin					: -200,

			//:	Restricts drawing of image in 3D-subproject
			fromObserverYMin		: 5,
			fromObserverYMax		: 11200,


			//:	These are in effect iff above is set to true
			movingObserverStepX		: 5,
			movingObserverStepY		: 5,
			movingObserverStepZ		: 5,

			boundaryProtectionDisabled : true,	// "Don't set this to ''false'' unless badly short on resources"

			scale					: 1000,	// TODM call this lensScale

			bgScenario				:
			{
				mode				: null,
				speed				: 0.5, //2 // good: 0.5
			},


			//: Do increase lensTran scale if exceeded
			//:	Fixes problem with large screens by magnifying 
			//	canvas proportionally when window-width becomes wider
			//	than this threshold.
			//	This threshold should be of source-image-width;
			//	( see lens_transformation.js .reset() )
			//	This spoils quality of drawing, but for smoke, clouds
			//	this "blur" can be tolerated.
			bigScreenWidthThreshold		: 1000,
			bigScreenHeightThreshold	: 500,

			boxWrap					: boxWrap

		},

		movingObserver				: true,

		//.	should be irrelevant to this subapp; should be removed;
		bodyRadiusMax				: 2,		//	100

		reset_population_at_reset	: false,

		// \\// Gravity-project parameters //////////////////////////



	}; // conf

	//.	conf takes highest precedence
	//	TODM slow, but dry
	btb.paste_non_arrays( conf, btb.paste_non_arrays( default_conf, conf ) );

}) ();


