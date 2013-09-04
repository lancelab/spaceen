
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


		subapp					: 'clouds',
		runFlyer				: false,
		in3D					: true,

		stop_on_click			: null,
		stop_afer_tick			: null,	//	"true" fires frames click by click
		stop_own_move_on_click	: null,
		never_let_internal_evol : null,
		startFromStopped		: null,

		//: Good debug
		// stop_on_click			: true,
		// stop_afer_tick			: true,
		// stop_own_move_on_click	: true,
		// startFromStopped			: true,

		// //\\	Generic animation parameters
		itemsMax				: 200,
		runInfinitely			: true,
		ticksPeriod				: 4000,
		playPeriod				: 80000,	// ms. See self.animationInterval below.

		landingSplashDuration	: 8000,		// ms

		//:	CSS
		preventCanvasAbsPos		: true,		//	Possibly done to resolve conflict with projects relying on browser CSS fluid management

		// \\//	Generic animation parameters


		//.	Sets canvas-HTML-element background dynamic resizing
		//		0		- do nothing,
		//		-1		- set to window height,
		//		> 0		- set to window_width * canvasHeightToWidth
		canvasHeightToWidth		: -1, // 1.5 fro clouds;	



		//	//\\ Gravity-project parameters ////////////////////////
		grainsNumber			: 0,

		conf3D :
		{

			//:	Dimensions of space-box confining all the 3D-items
			boxMaxX					: 800,		
			boxMaxY					: 800,
			boxMaxZ					: 1500,

			boxCenterX				: 0,
			boxCenterY				: 0,
			boxCenterZ				: -300,

			originYMax				: null,
			originYMin				: null,

			xMax					: null, 
			xMin					: null, 
			zMax					: null, 
			zMin					: null, 

			//:	Restricts drawing of image in 3D-subproject
			fromObserverYMin		: 10,
			fromObserverYMax		: 800,


			originY					: 700,
			scale					: 1000,

			//:	These are in effect iff above is set to true
			movingObserverStepX		: 10,
			movingObserverStepY		: 10,
			movingObserverStepZ		: 10,

			bigScreenWidthThreshold		: 1000,
			bigScreenHeightThreshold	: 600

		},

		movingObserver				: true,
		reset_population_at_reset	: false,
		generate_backg_img			: false,
		bodyRadiusMax				: 20,		//	100

		// \\// Gravity-project parameters //////////////////////////

	}; // conf

	//.	conf takes highest precedence
	//	TODM slow, but dry
	btb.paste_non_arrays( conf, btb.paste_non_arrays( default_conf, conf ) );

}) ();


