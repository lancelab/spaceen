
//	//\\//	Sets external parameters of dynamic sprite.
//			Overridable by btb.graph.init and URL-query.
//			Copyright (c) 2013 Konstantin Kirillov


( function () {


	var btb			= window.btb$		= window.btb$		|| {};		
					  btb.graph			= btb.graph			|| {};
	var conf		= btb.graph.conf	= btb.graph.conf	|| {};
	var confFlyer	= conf.cflyer		= conf.cflyer		|| {};

	/// Inserts dconf into flyer if dconf already exists
	var primaryFlyer =
	{			
		
			bgRefillColor		: '#000000',

			//.	it plays here: target_width = final_width * spr.ss * master_screen_scale in scene::run.js
			//	TODM change name: to target_width_before_scaleling
			final_width			: 320,					// tile dimension;
			final_height		: 224,					// tile dimension;

			frameScenario :
			{
				on						: true,
				size					: [ 320, 224 ],	// tile dimensions
				gridXN					: 10,			// row lenght;
				gridYN					: 9,			// column hight;
				cellIteration1Offset	: 4,			// begins first part of play;
				cellIterationNextOffset	: 44			// begins looping of the second part of play after first iteration;
			},



			///	((At this version, all rotations and transformations are disabled.))
			sprites_seed :
			{


				//	Sets parent space rotation
				//.	vv is a frequency in respect ot animation period
				common_ff : { f0 : 0, vv : 0 },

				//	Sets radius pulsation
				rr :
				{			ra : 0,						// "0 is enough"
							vv : 0,						// "0 is enough"
							f0 : 0,						// "0 is enough"
							r0 : 0						// "0 is enough if not intruders"
				},

				//.	Sets radius rotation
				//	Set vv to 0 to stop rotation
				cc : { f0 : 0, vv : 0 },				//	"0 for all is enough"

				//	Sets own rotation
				ff : { f0 : 0.0, vv : 0 },

				//	Sets size pulsation relative to final_width, ... 
				ss : { sa : 0, vv : 0.0, f0 : 0, s0 : 1 },		// s0 must? be !== 0 ?; in neutral case 1?


				randomizer :
				{
					//	Sets radius pulsation
					rr :
					{
							ra :
							{
								// ra * 
								base : 0.8,
								factor : 0.4, // * Math.random()
							},

							vv : 
							{
								// vv *
								base : -0.5, // + Math.random()
							}
					},

					//	Sets radius rotation
					cc :
					{	
						vv : 
						{
							// vv *
							factor : 1,
							base : -0.5, // + Math.random()
						}
					},


					//	Sets own rotation
					ff :
					{	
						vv :
						{
							// vv *
							base : -0.4, // 0.4,
							factor : 0.8, // * Math.random()
						}
					},


					//	Sets size pulsation relative to beginning
					ss :
					{ 
						sa :
						{
							// sa *
							base : 1.0,
							factor : 0, // * Math.random()
						},

						vv :
						{
							// vv *
							//. Smaller sprites do not look good: -0.5 + Math.random()
							base : 0.5,
							factor : 0 // * Math.random()
						}
					}
				} // randomizer :

		} // sprites_seed :
	};


	primaryFlyer.seeds = [];

	btb.paste_non_arrays( confFlyer, btb.paste_non_arrays( primaryFlyer, confFlyer ) );


}) ();


