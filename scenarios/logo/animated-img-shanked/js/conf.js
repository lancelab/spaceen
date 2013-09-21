
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

		itemsMax				: 7,
		backwardInTime			: true,
		runInfinitely			: false,

		playPeriod				: 5000,

		ticksPeriod				: 400,
		turnTicksPoint			: 400,
		turnPonitPause			: 0,

		keepAtResize			: true,

		memLoss					: 0.4,

		leftMemorySensor		: 0.98,
		critPointmemLoss		: 0.8,

		spaceTransf				: true,

		csize					: '',

		cwidth					: 1100,
		cheight					: 400,


		vwidth					: 1100,
		vheight					: 400,
		virt					: 'v',

		noratio					: false,

		cCSS					: 1,

		animation_is_allowed	: true,

		use_setTimeout			: false,
		doSyncTime				: true,

		disable_landing_loading_warning : true,
		landingSplashDuration	: 1000,

		// \\//	Generic animation parameters



		imagesToLoad :
		[
			{
				name			: 'load2DImg',
				mode			: 'template',
				path			: 'img',

				//template		: 'poly',
				//ext				: 'png',
				//count			: 1,

				//template		: 'mysprite',
				//ext				: 'png',
				//count			: 1,

				template		: '2d',
				ext				: 'jpg',
				count			: 2,

				names			: []
			}
		],

		//.	Crafting casts
		rerandom				: 1


	}; // conf

	//.	conf takes highest precedence
	//	TODM slow, but dry
	btb.paste_non_arrays( conf, btb.paste_non_arrays( default_conf, conf ) );

}) ();


