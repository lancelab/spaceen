
//	//\\//	Sets external parameters of dynamic sprite.
//			Overridable by btb.graph.init and URL-query.
//			Copyright (c) 2013 Konstantin Kirillov


( function () {

	var btb;
	var conf;

	( function () {
		btb		= window.btb$		= window.btb$		|| {};
		var graph	= btb.graph			= btb.graph			|| {};
		conf		= graph.conf		= graph.conf		|| {};
	}) ();

	var confFlyer	= conf.cflyer		= conf.cflyer		|| {};

	/// Inserts dconf into flyer if dconf already exists
	var primaryFlyer =
	{			
		
			insert3DSceneBeforeIx1 : null,	//	This index inserts 3D scene before (insert3DSceneBeforeIx1 - 1) 2D-sprite.


			fillSprites			: true,	//	true fills Sprites from the beginning.
										//	Does not use functional sprites.
										//	Draws only Sprite's paths.
			fillFrom			: null, //	Additional parameter. Effective when !fillSprites.
										//	> 0	- does curves before turn-neighbourhood and fillings in neighbourhood scenario;
			fillTitleFrom		: null, // 2000,	TODM poor name. Possibly call: titleImageDisplayBeginsFrom.
										// Extends drawing pause image pause period
										// into time-neighbourhood of a pause. 


			sparkRange			: 0,	// "in pixels"

			uniform_delay		: false,

			bgRefillColor		: '#000000',	// ((
												// This data is used in two places:

												// 1. at: conf.clearEnd && mstones.iterationExitEntered and
												// 2. in wipeOutMemory in run which is fired at
												//		justReinitialized and
												//		!conf.memLoss || ww_wipe_memory
		
												// '' and 0 stands for 'transparent', but expected to be faster,
												// null makes this property ignored,
												// '#000000' fills with black.
												// ))

			pauseImageStays		: null,


			sprites_seed :
			{


				//	Sets parent space rotation
				//.	vv is a frequency in respect ot animation period
				common_ff : { f0 : 0, vv : 0 },

				//	Sets radius pulsation
				//rr : { ra : 0, vv : 1.5, f0 : 0, r0 : 0 },
				rr : { ra : 150, vv : 1.5, f0 : 0, r0 : null },
				// rr : { ra : 50,  vv : 1.5, f0 : 0, r0 : 100 },
				// rr : { ra : 100, vv : 0,   f0 : 0, r0 : 100 },

				//.	Sets radius rotation
				//	Set vv to 0 to stop rotation
				//	cc : { f0 : 0, vv : -2.0 },
				cc : { f0 : 0, vv : 0 },

				//	Sets own rotation
				ff : { f0 : 0.0, vv : -1.5 },

				//	Sets size pulsation relative to final_width, ... 
				// ss : { sa : 40, vv : 0.015, f0 : 0, s0 : 1.0 },
				ss : { sa : 10, vv : 0.015, f0 : 0, s0 : 1.0 },



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
							base : 0.4,
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
							factor : 0.4, // * Math.random()
						},

						vv :
						{
							// vv *
							//. Smaller sprites do not look good: -0.5 + Math.random()
							base : 0.5,
							factor : 1.0 // * Math.random()
						}
					}
				} // randomizer :

		} // sprites_seed :
	};


	primaryFlyer.seeds = [];

	btb.paste_non_arrays( confFlyer, btb.paste_non_arrays( primaryFlyer, confFlyer ) );


}) ();


