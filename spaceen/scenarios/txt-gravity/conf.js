
// //\\//	Sets default configuration data.
//			Overridable by btb.graph.init and URL-query.



( function () {


	var conf;

	///	Attaches plugin
	( function () {
			var btb		= window.btb$		= window.btb$		|| {};		
			var graph	= btb.graph			= btb.graph			|| {};
			conf		= graph.conf		= graph.conf		|| {};
	}) ();



	var default_conf =
	{

		// //\\	Generic animation parameters

		itemsMax				: 200,
		backwardInTime			: false,
		runInfinitely			: true,
		ticksPeriod				: 4000,
		playPeriod				: 80000,	// ms. See self.animationInterval below.


		//.	If set to "false", skips drawing while keepeing calling animation the chain.
		//	If doSyncTime is on, ticks do follow time and likely lost,
		//	otherwise ticks are frozen.
		animation_is_allowed	: true,


		use_setTimeout			: false,	// Do ignore modern frame requestors
		doSyncTime				: true,		// Miss or repeat frames to sync with time

		screen_center_x			: null,
		screen_center_y			: null,

		stop_on_click			: false,
		disable_landing_loading_warning : true,
		landingSplashDuration	: 8000,		// ms

		//:	CSS
		preventCanvasAbsPos		: true,		//	Possibly done to resolve conflict with projects relying on browser CSS fluid management

		// \\//	Generic animation parameters


		//.	Sets canvas-HTML-element background dynamic resizing
		//		0		- do nothing,
		//		-1		- set to window height,
		//		> 0		- set to window_width * canvasHeightToWidth
		canvasHeightToWidth		: -1, // 1.5 fro clouds;	


		//.	FlyingShadows ///////////////////////
		run_flying_shadows		: false,


		//	//\\ Gravity-project parameters ////////////////////////
		grainsNumber			: 0,
		//. Is a flag. Turns off balls.
		sprite_url				: '', //img/mysprite0.png',

		//:	Dimensions of space-box confining all the 3D-items
		boxMaxX					: 1000,		
		boxMaxY					: 1500,
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


		bodyRadiusMax			: 20,		//	100
		originY				: 700,
		scale					: 1000,

		//.	Fixes problem with large screens by magnifying 
		//	canvas proportionally when window-width becomes wider
		//	than this threshold.
		//	This spoils quality of drawing, but for smoke, clouds
		//	this "blur" can be tolerated.
		bigScreenScaleThreshold	: 1000,

		movingObserver			: true,
		//:	These are in effect iff above is set to true
		movingObserverStepX		: 10,
		movingObserverStepY		: 10,
		movingObserverStepZ		: 10,
		reset_population_at_reset	: false,
		generate_backg_img			: false,
		// \\// Gravity-project parameters //////////////////////////



	}; // conf


	///	Overrides by config sets in other module
	//	for case if other module is inserted into html file earlier
	for( var pp in default_conf  )
	{
		if( default_conf.hasOwnProperty( pp ) )
		{
			///	Default sets only if "external conf" is not set
			if( !conf[ pp ] && conf[ pp ] !== 0 )
			{
				conf[ pp ] = default_conf[ pp ];
			}
		}
	}


}) ();


