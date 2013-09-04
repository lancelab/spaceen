
// //\\//	Sets default configuration data.
//			Overridable by btb.graph.init and URL-query.



( function () {


	var conf;
	var btb;

	///	Attaches plugin
	( function () {
			btb			= window.btb$		= window.btb$		|| {};		
			var graph	= btb.graph			= btb.graph			|| {};
			conf		= graph.conf		= graph.conf		|| {};
	}) ();



	var default_conf =
	{

		// //\\	Generic animation parameters

		subapp					: 'fading-tree',
		runFlyer				: false,
		in3D					: true,

		ticksPeriod				: 2000,
		playPeriod				: 10000,
		doSyncTime				: true,
		use_setTimeout			: null,
		stop_on_click			: false,
		stop_afer_tick			: false,

		//:	Good d ebug
		//ticksPeriod				: 10,
		//playPeriod				: 10000,
		//doSyncTime				: false,
		//use_setTimeout			: true,
		//stop_on_click				: true,
		//stop_afer_tick			: true,
		//never_let_internal_evol	: true,

		stop_own_move_on_click	: false,
		never_let_internal_evol : true,
		startFromStopped		: false,
		dontResetAfterIteration : true,



		itemsMax				: 6,
		//backwardInTime		: false,
		runInfinitely			: true,


		landingSplashDuration	: 2000,		// ms

		//:	CSS
		preventCanvasAbsPos		: true,		//	Possibly done to resolve conflict with projects relying on browser CSS fluid management

		// \\//	Generic animation parameters


		//.	Sets canvas-HTML-element background dynamic resizing
		//		0		- do nothing,
		//		-1		- set to window height,
		//		> 0		- set to window_width * canvasHeightToWidth
		canvasHeightToWidth		: 0, // 1.5,

		virt					: 'v',
		vwidth					: 500,
		vheight					: 667,


		//	//\\ Gravity-project parameters ////////////////////////
		//	TODM move to conf3D


		imagesToLoad :
		[
			{
				name			: 'load3DImg',
				mode			: 'names',
				path			: 'img',
				names			:
				[
					"see.png",
					"top-bottom.png",
					"central-tree.png",
					"right-tree.png",
					"left-tree.png",
					"bottom.png"
				]
			}
		],

		/// Meters
		spriteDistanceFromOrigin	:
		[
			1000,
			30,
			20,
			15,
			10,
			3
		],

		spriteDrawScale	:
		[
			1,
			0.03,
			0.02,
			0.015,
			0.01,
			0.003
		],


		custom					:
		{
			range				: 200	// half of 3D travel Y range
		},


		//	//\\	conf3D	////////////////////////////////////////////
		conf3D :
		{

			putItemsToCircleR		: 3000,	// Box-dimensions are ignored
			putItemsAlongAxisY		: true,

			originY					: -2,
			originZ					: 0,


			//	Appr. origin's coords. in respect to observe
			originYMin				: -18,
			originYMax				: 0.00001,

			xMax					: 1000,
			xMin					: -1000,
			zMax					: 1000,
			zMin					: -1000,


			screenFocusX			: 0,
			screenFocusZ			: 0,  // -200 lifts up an entire scene by 200px on user's monitor

			//:	Restricts drawing of image in 3D-subproject
			// fromObserverYMin		: 0.3,
			// fromObserverYMax		: 3,

			//:	These are in effect iff above is set to true
			movingObserverStepX		: 0.2, //1,
			movingObserverStepY		: 0.2, //1,
			movingObserverStepZ		: 0.2,

			//.	Converts abstracts "lens-transformation" units to average screen/canvas resolution.
			scale					: 1000,	// TODM call this lensScale

			boundaryProtectionDisabled : true
			// \\// Gravity-project parameters //////////////////////////
		},


		movingObserver				: true,		// TODO make clear "and understoodable" name
		bodyRadiusMax				: 0,		// (( plays in sorting along Y ))
		reset_population_at_reset	: false,
		generate_backg_img			: false,


		//	\\//	conf3D	////////////////////////////////////////////



		//.	Fixes problem with large screens by magnifying 
		//	canvas proportionally when window-width becomes wider
		//	than this threshold.
		//	This spoils quality of drawing, but for smoke, clouds
		//	this "blur" can be tolerated.
		bigScreenScaleThreshold	: 0




	}; // conf

	//.	conf takes highest precedence
	//	TODM slow, but dry
	btb.paste_non_arrays( conf, btb.paste_non_arrays( default_conf, conf ) );

}) ();


