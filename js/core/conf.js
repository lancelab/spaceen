
// //\\//	Sets configuration data with possibly most common values.
//			Comments do serve as part of documentation.
//			Readme: conf.js.doc.txt


( function () {

						window.btb$			= window.btb$			|| {};		
	var graph		=	window.btb$.graph	= window.btb$.graph		|| {};



	graph.generic_conf =
	{

		reinitSpritesInResize				: true,
		playPeriod							: 10000,
		ticksPeriod							: 10000,
		transitionalBugTicksPoint			: true,
		timeScale							: 1,
		unfadeBgImgTimeMs					: 1000,
		keepAtResize						: true,
		animation_is_allowed				: true,

		keepLoadingMsgTillImgLoad			: true,
		disable_landing_loading_warning 	: true,
		landingSplashDuration				: 1000,

		addon			: {},
		usprite			: {},
		imagesToLoad	: [],

		//	//\\	3D	////////////////////////////////////////////
		conf3D :
		{
			domCarousel	:
			{
				on					: null,
				placement			: 'vertical',
				arrangement			: 'circle',
				radius				: 500,
				distance			: 500,
				stepY				: 10
			},


			boxCenterX				: 0,
			boxCenterY				: 0,
			boxCenterZ				: 0,

			originY					: 900,

			originYMax				: 1900, //1800,
			originYMin				: 0,

			xMax					: 120,
			xMin					: -120,
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

			bgScenario				: {}
		},


		//...	Sprite images	//TODO mess mix "gravity/generic/orphans"

		animatorWaitsForImgLoad		: true,
		sceneRunnerWaitsForImg		: true,
		//	\\//	3D	////////////////////////////////////////////


		///	"External sprite" template
		cflyer :
		{
			dconf				:
			{
				shape_functions				: [],
				shape_paths					: []
			},

			final_width			: 80,					// tile dimension;
			final_height		: 150,					// tile dimension;

			///	sets parameters of clips in the image of clips
			frameScenario :
			{
				on						: null,			// "falseful" disables scenario;
				size					: [ 320, 225 ],	// tile dimensions;
				gridXN					: 10,			// row lenght;
				gridYN					: 8,			// column hight;
				cellIteration1Offset	: 14,			// begins first part of play in the first iteration;
				cellIterationNextOffset	: 55			// begins looping infinitely of the second part of play after first iteration;
			}

		},

		dummyNoCommaAfter	: 2

	};

}) ();


