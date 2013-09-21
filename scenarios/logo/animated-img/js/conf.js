
// //\\//	Sets default configuration data.
//			Overridable by btb.graph.init and URL-query.
//			Copyright (c) 2013 Konstantin Kirillov





( function () {


	var btb			= window.btb$		= window.btb$		|| {};		
					  btb.graph			= btb.graph			|| {};
	var conf		= btb.graph.conf	= btb.graph.conf	|| {};


	var default_conf =
	{
		runFlyer				: true,

		// //\\	Generic animation parameters

		itemsMax				: 1,
		backwardInTime			: false,
		runInfinitely			: true,
		playPeriod				: 11000,
		ticksPeriod				: 4000,

		doSyncTime				: true,
		animation_is_allowed	: true,

		transitionalBugTicksPoint : false, // disabling bug


		//	//\\	Debug	////////////////////////////////////////////////////////////////////
		//ticksPeriod				: 90,
		//use_setTimeout			: true,	//	Do ignore modern frame requestors
		//timeFromTicks			: true, 	//	Ticks do control time. time = ticks * conf.tickTimeStep (( see run_time_utility.js ))

		//toggle_draw_on_click	: true,		//	in mean time, overrides stop_on_click: graph.conf.toggle_draw_on_click || graph.conf.toggle_draw_on_click === 0
		//stop_afer_tick			: true,		//	TODM misleading name; must: idlify "animation thread" till toggling the thread
											//	"true" fires frames click by click
		//	\\//	Debug	////////////////////////////////////////////////////////////////////




		keepAtResize			: true,
		spaceTransf				: true,

		csize					: 'f',

		cwidth					: 320,
		cheight					: 225,

		vwidth					: 1100,
		vheight					: 400,
		virt					: '',

		noratio					: false,

		cCSS					: 1,

		disable_landing_loading_warning : true,
		landingSplashDuration	: 1000,

		// \\//	Generic animation parameters



		imagesToLoad :
		[
			{
				name			: 'load2DImg',
				mode			: 'template',
				path			: 'img',
				template		: 'assembly',
				ext				: 'jpg',
				count			: 1,
				names			: []
			}
		],


	}; // conf

	//.	conf takes highest precedence
	//	TODM slow, but dry
	btb.paste_non_arrays( conf, btb.paste_non_arrays( default_conf, conf ) );

}) ();


