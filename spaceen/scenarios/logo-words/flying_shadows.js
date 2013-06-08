
//	//\\//	Sets external parameters of dynamic sprite.
//			Overridable by btb.graph.init and URL-query.
//			Copyright (c) 2013 Konstantin Kirillov


( function () {

	var conf;
	( function () {
		var btb		= window.btb$	= window.btb$					|| {};
		var graph	= btb.graph		= btb.graph						|| {};
		conf		= graph.conf	= graph.conf					|| {};
	}) ();

	conf.flying_shadows =
	{			

			flat_sprite_url : '', //img/mysprite',
			flat_sprite_ext	: 'png',

			custom_image_url	: '', //'img/title',
			custom_image_ext	: 'png',

			start_gradient		: null,	//	when not "falseful", disables "main-scenario" drawings and enables
										//	fillings in neighbourhood of turning point | ticks | < start_gradient;

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


	conf.flying_shadows.seeds = [];

}) ();


