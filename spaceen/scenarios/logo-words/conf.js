
// //\\//	Sets default configuration data.
//			Overridable by btb.graph.init and URL-query.
//			Copyright (c) 2013 Konstantin Kirillov





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

		// //\\	Generic animation parameters /////////////////////////////

		itemsMax				: 9,
		backwardInTime			: true,
		runInfinitely			: false,

		ticksPeriod				: 400,		// last frame sitll will be drawn if not dontDrawAfterPeriod
		playPeriod				: 8000,
		turnTimePoint			: 400,		// 0 to disable. In ticks. In run_flying_shadows, is autoset to ticksPeriod if missed here.
		turnPonitPause			: 0,		// in ms

		dontDrawAfterPeriod		: false,
		//frozenTicksStart		: 260,		// autoset if missed here
		keepAtResize			: true,		// keeps memory-image at resize; in effect only for virt=v

		memLoss					: 0.005,	// memory loss per one second: 0 <= float <=1, -1 for absolute memory;
											// for non-twin-buff: 0.1 - 0.4 is good; 
		leftMemorySensor		: 0.98,		// threshold; if left is less, then do bookkeep the loss,
		critPointmemLoss		: 0.01, 	// 0.7 - for non-twins;	// memory loss per one second in critical areas: turning time point or end time point
		memClearAt0				: 0,		// truefull or falseful, 0 clears mem at the ticksPeriod-1
		clearEnd				: 0,		// clears memory after ticksPeriod
		spaceTransf				: false,	// true does resort to browser's native context transformations

		csize					: '',		// 'f'	for fixed: use cwidth and and cheight for canvas size
											// ''	when window resized, rescales canvas to window size, cheight and cwidth are ignored

		cwidth					: 700,		// if 0, vwidth is used
		cheight					: 400,		// if 0, vheight is used


		//:	Set dimensions which will be a base for sprite spatial parameters.
		//	Final drawing will be proportionally rescaled to real browser canvas size.
		vwidth					: 700,		// virtual width
		vheight					: 400,		// virtual height
		virt					: 't',		// b - create in memory and use virtual-offscreen canvas as a master,
											// v - virtual, keep calculating master image, but never draw it to memory-canvas,
											// '' - draw right to canvas omitting notion of virtual image;
											//		vwidth, and vheight have no effect
		noratio					: false,	// false	-	keeps ratio proportionally when putting image from virt='m' to canvas,
											//				chooses less distructive dimension,
											//				effective only for virt = 'm'.

		cCSS					: 1,		// if truthful and not csize === 'f', follow canvas.style CSS.
											// Otherwise, canvas is fit to screen, and in particular will GO OUT OF width set to %.
		min_width				: '',		// 500,		// set to 0 to ignore
		min_height				: '',		// 200,		// set to 0 to ignore

		body_overflow			: '',		// 'hidden',
		wrap_overflow			: '',		// 'hidden',


		//.	If set to "false", skips drawing while keepeing calling animation the chain.
		//	If doSyncTime is on, ticks do follow time and likely lost,
		//	otherwise ticks are frozen.
		animation_is_allowed	: true,

		use_setTimeout			: false,	// Do ignore modern frame requestors
		doSyncTime				: true, 	// Miss or repeat frames to sync with time

		screen_center_x			: null,
		screen_center_y			: null,

		stop_on_click			: false,
		stop_afer_tick			: false,	//	"true" fires frames click by click

		disable_landing_loading_warning : true,
		landingSplashDuration	: 1000,		// ms


		// \\//	Generic animation parameters





		//.	FlyingShadows ///////////////////////
		run_flying_shadows		: true,


		//	//\\ Gravity-project parameters ////////////////////////
		grainsNumber			: 0,
		//. Is a flag. Turns off balls.
		sprite_url				: '',	// 'img/mysprite.png',
		boxMax					: 500,	// 300
		bodyRadiusMax			: 20,	// 100
		originY					: 200,
		scale					: 100,
		framesInCircle			: 500,	// 200
		// \\// Gravity-project parameters //////////////////////////

		scaffold				: ''	// puts sign, scaffold on result canvas

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


