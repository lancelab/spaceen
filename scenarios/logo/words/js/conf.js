
// //\\//	Sets default configuration data.
//			Overridable by btb.graph.init and URL-query.
//			Copyright (c) 2013 Konstantin Kirillov





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

		// //\\	Generic animation parameters /////////////////////////////

		itemsMax				: 9,
		backwardInTime			: true,
		runInfinitely			: false,


		playPeriod				: 8000,
		// timeScale			: 1,

		ticksPeriod				: 400,
		turnTicksPoint			: 400,
		turnPonitPause			: 0,		//	in ms

		dontDrawAfterPeriod		: false,

		keepAtResize			: true,

		memLoss					: 0.4,

		leftMemorySensor		: 0.98,
		critPointmemLoss		: 0.8,


		clearEnd				: 0,
		memClearAt0				: 0,


		spaceTransf				: false,

		csize					: '',

		cwidth					: 700,
		cheight					: 400,


		vwidth					: 700,
		vheight					: 400,
		virt					: 't',

		noratio					: false,

		cCSS					: 1,

		min_width				: '',
		min_height				: '',

		body_overflow			: '',
		wrap_overflow			: '',


		animation_is_allowed	: true,

		use_setTimeout			: false,
		doSyncTime				: true,

		screen_center_x			: null,
		screen_center_y			: null,

		stop_on_click			: false,
		stop_afer_tick			: false,

		disable_landing_loading_warning : true,
		landingSplashDuration	: 1000,


		// \\//	Generic animation parameters





		//.	FlyingShadows ///////////////////////
		runFlyer		: true,



		//	//\\	Crafting casts
		rerandom				: 1,
		scaffold				: ''
		//	\\//	Crafting casts


	}; // conf

	//.	conf takes highest precedence
	//	TODM slow, but dry
	btb.paste_non_arrays( conf, btb.paste_non_arrays( default_conf, conf ) );

}) ();


