
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

		itemsMax				: 8,
		backwardInTime			: true,
		runInfinitely			: true,
		ticksPeriod				: 2500,
		playPeriod				: 40000, //44000, 	// ms. See self.animationInterval below.
		turnTicksPoint			: 1250,				// 0 to disable. In ticks. In runFlyer, is autoset to ticksPeriod if missed here.
		turnPonitPause			: 6000, //4000,		// in ms
		timeFromTicks			: false,

		dontDrawAfterPeriod		: true,
		playDomelPause			: true,		// do play foregrounds scenarios in pause
		keepAtResize			: true,		// keeps memory-image at resize; in effect only for virt=v

		memLoss					: 0.025,		// memory loss per one second: 0 <= float <=1, -1 for absolute memory;
											// for non-twin-buff: 0.1 - 0.4 is good; 
		leftMemorySensor		: 0.98,		// threshold; if left is less, then do bookkeep the loss,
		critPointmemLoss		: 0.005,		
		memClearAt0				: 0,		// truefull or falseful, 0 clears mem at the ticksPeriod-1
		clearEnd				: 0,		// 1 - clears memory after ticksPeriod

		spaceTransf				: false,

		csize					: '',		// 'f'	for fixed: use cwidth and and cheight for canvas size
											// ''	when window resized, rescales canvas to window size, cheight and cwidth are ignored

		cwidth					: 0,		// if 0, vwidth is used
		cheight					: 0,		// if 0, vheight is used


		//:	Set dimensions which will be a base for sprite spatial parameters.
		//	Final drawing will be proportionally rescaled to real browser canvas size.
		vwidth					: 1000,		// virtual width
		vheight					: 800,		// virtual height
		virt					: 't',		// b - create in memory and use virtual-offscreen canvas as a master,
											// t - creates twin buffers like in case b,
											// v - virtual, keep calculating master image, but never draw it to memory-canvas,
											// '' - draw right to canvas omitting notion of virtual image;
											//		vwidth, and vheight have no effect
		noratio					: true,		// false	-	keeps ratio proportionally when putting image from virt='m' to canvas,
											//				chooses less distructive dimension,
											//				effective only for virt = 'm'.

		cCSS					: 0,		// if truthful and not csize === 'f', follow canvas.style CSS.
											// Otherwise, canvas is fit to screen, and in particular will GO OUT OF width set to %.
		min_width				: 720,		// 500,		// set to 0 to ignore
		min_height				: 420,		// 200,		// set to 0 to ignore

		body_overflow			: '',		// 'hidden',
		wrap_overflow			: '',		// 'hidden',


		//disable_landing_loading_warning : true,
		landingSplashDuration	: 0, 		// fails: 2000,		// ms

		//:	CSS
		preventCanvasAbsPos		: true,		//	Possibly done to resolve conflict with projects relying on browser CSS fluid management

		// \\//	Generic animation parameters


		//.	Sets canvas-HTML-element background dynamic resizing
		//		0		- do nothing,
		//		-1		- set to window height,
		//		> 0		- set to window_width * canvasHeightToWidth
		canvasHeightToWidth		: -1, // 1.5,



		//.	FlyingShadows ///////////////////////
		runFlyer				: true,

		imagesToLoad :
		[
			{
				name			: 'loadCustomImg',
				mode			: 'names',
				path			: 'img',
				names			: [ 'title0.png' ]
			}
		],

		rerandom				: true	// trueful forces reinitialization and randomization at second iteration
										// when capturer.config has been submitted.

	}; // conf

	//.	conf takes highest precedence
	//	TODM slow, but dry
	btb.paste_non_arrays( conf, btb.paste_non_arrays( default_conf, conf ) );

}) ();


