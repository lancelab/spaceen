
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

		runFlyer				: false,
		in3D					: true,
		stop_on_click			: false,
		stop_own_move_on_click	: true,
		doSyncTime				: false,

		// //\\	Generic animation parameters

		itemsMax				: 6,
		//backwardInTime		: false,
		runInfinitely			: true,
		ticksPeriod				: 4000,
		playPeriod				: 10000, // 80000,	// ms. See self.animationInterval below.


		landingSplashDuration	: 8000,		// ms

		//:	CSS
		preventCanvasAbsPos		: true,		//	Possibly done to resolve conflict with projects relying on browser CSS fluid management

		// \\//	Generic animation parameters


		//.	Sets canvas-HTML-element background dynamic resizing
		//		0		- do nothing,
		//		-1		- set to window height,
		//		> 0		- set to window_width * canvasHeightToWidth
		canvasHeightToWidth		: 1.5,
		virt					: 'v',
		vwidth					: 500,
		vheight					: 500,


		//	//\\ Gravity-project parameters ////////////////////////


		imagesToLoad :
		[
			{
				name			: 'load3DImg',
				mode			: 'names',

				path			: '../../../../img/mycity',
				template		: '',
				ext				: '',
				count			: null,
				names			: 
				[
					"DSCI1362.JPG",
					"DSCI1368.JPG",
					"DSCI1374.JPG",
					"DSCI1376.JPG",
					"DSCI1377.JPG",
					"DSCI1382.JPG"

/*
		"DSCI1383.JPG",
		"DSCI1389.JPG",
		"DSCI1391.JPG",
		"DSCI1396.JPG",
		"DSCI1400.JPG",
		"DSCI1408.JPG",
		"DSCI1410.JPG",
		"DSCI1412.JPG",
		"DSCI1413.JPG",
		"DSCI1421.JPG",
		"DSCI1425.JPG",
		"DSCI1427.JPG",
		"DSCI1429.JPG",
		"DSCI1443.JPG",
		"DSCI1446.JPG",
		"DSCI1453.JPG",
		"DSCI1454.JPG",
		"DSCI1462.JPG",
		"DSCI1465.JPG",
		"DSCI1467.JPG",
		"DSCI1472.JPG",
		"DSCI1475.JPG",
		"DSCI1477.JPG",
		"DSCI1478.JPG",
		"DSCI1481.JPG",
		"DSCI1491.JPG",
		"DSCI1494.JPG",
		"DSCI1498.JPG",
		"DSCI1513.JPG",
		"DSCI1515.JPG",
		"DSCI1517.JPG",
		"DSCI1521.JPG"
*/
				]
			}
		],



		//	//\\	conf3D	////////////////////////////////////////////
		conf3D :
		{
			//:	Dimensions of space-box confining all the 3D-items
			boxMaxX					: 3000,		
			boxMaxY					: 3000,
			boxMaxZ					: 200,

			boxCenterX				: 0,
			boxCenterY				: 0,
			boxCenterZ				: -5000,

			putItemsToCircleR		: 3000,	// Box-dimensions are ignored

			screenFocusX			: 0,
			screenFocusZ			: -200,  // -200 lifts up an entire scene by 200px on user's monitor



			//	Appr. origin's coords. in respect to observe
			// originYMax				: 1200,
			originYMin				: 2500,

			xMax					: 2000,
			xMin					: -2000,
			zMax					: null, //3000,
			zMin					: -3000,

			//:	Restricts drawing of image in 3D-subproject
			//fromObserverYMin		: 10,
			//fromObserverYMax		: 800,

			originY					: 3250,
			originZ					: 4400,

			//:	These are in effect iff above is set to true
			movingObserverStepX		: 20,
			movingObserverStepY		: 20,
			movingObserverStepZ		: 20,

			scale					: 1000,

			boundaryProtectionDisabled : false
			// \\// Gravity-project parameters //////////////////////////
		},

		movingObserver				: true,
		bodyRadiusMax				: 20,		//	100
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


