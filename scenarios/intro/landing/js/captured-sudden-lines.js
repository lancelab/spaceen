

( function () {
		var btb				= window.btb$			= window.btb$				|| {};
		var graph			= btb.graph				= btb.graph					|| {};
		var conf			= graph.conf			= graph.conf				|| {};
		var capturer		= graph.capturer		= graph.capturer			|| {};

graph.capturer.conf = 
{
	"cflyer": {
		"dconf": {
			"doRadialGradient": false,
			"fillSprites": true,
			"titlePosX": -548,
			"titlePosY": -224,
			"titleScale": 0.4,
			"swap_gradients": 0,
			"startColorA": 0.08,
			"endColorA": 0.08,
			"colorUpperBound": 255,
			"culmColorUpperBound": 255,
			"alphaUpperBound": 0.08,
			"culmAlphaUpperBound": 0.001,
			"pauseExtendedStart": 200,
			"addCulStartToPause": false,
			"shape_paths": [
				[
					{
						"r": 250,
						"startAngle": 0,
						"angle": 6.2831852,
						"x": 300,
						"y": 0,
						"dir": false
					}
				]
			],
			"start_colors": [
				[
					{
						"c0": 50,
						"amp": 586.0465349511039,
						"vv": 1.3374360190995929
					},
					{
						"c0": 140,
						"amp": 409.1933652577232,
						"vv": 0.5715586731427013
					},
					{
						"c0": 140,
						"amp": 159.14532589429703,
						"vv": 0.3446764712732533
					}
				],
				[
					{
						"c0": 50,
						"amp": 445.40496005755585,
						"vv": 0.8515065638452758
					},
					{
						"c0": 140,
						"amp": 396.0142379335747,
						"vv": 0.696125140481695
					},
					{
						"c0": 140,
						"amp": 172.20903738274458,
						"vv": 0.311484008704727
					}
				],
				[
					{
						"c0": 50,
						"amp": 573.378253451401,
						"vv": 1.2524453233931583
					},
					{
						"c0": 140,
						"amp": 360.41511781787784,
						"vv": 0.42679922176649115
					},
					{
						"c0": 140,
						"amp": 295.60424491811676,
						"vv": 0.20811810988106738
					}
				],
				[
					{
						"c0": 50,
						"amp": 420.27636523235276,
						"vv": 0.9506368682701223
					},
					{
						"c0": 140,
						"amp": 420.38046522010416,
						"vv": 0.43578074346756496
					},
					{
						"c0": 140,
						"amp": 273.97859114436096,
						"vv": 0.2767541081147957
					}
				],
				[
					{
						"c0": 50,
						"amp": 244.13540979651333,
						"vv": 1.3148501703870648
					},
					{
						"c0": 140,
						"amp": 311.1958254861102,
						"vv": 0.778339604236106
					},
					{
						"c0": 140,
						"amp": 286.6633977248241,
						"vv": 0.5589042333393505
					}
				],
				[
					{
						"c0": 50,
						"amp": 517.6757724254268,
						"vv": 1.204317267178603
					},
					{
						"c0": 140,
						"amp": 208.09229779733917,
						"vv": 0.7607764583246491
					},
					{
						"c0": 140,
						"amp": 109.38212532318754,
						"vv": 0.2960397275724506
					}
				],
				[
					{
						"c0": 50,
						"amp": 311.9103432430725,
						"vv": 0.7764951628555469
					},
					{
						"c0": 140,
						"amp": 285.5273895365995,
						"vv": 0.5866068688670066
					},
					{
						"c0": 140,
						"amp": 249.89652327956517,
						"vv": 0.5555543110733485
					}
				],
				[
					{
						"c0": 50,
						"amp": 452.1408096544043,
						"vv": 1.1732258872999717
					},
					{
						"c0": 140,
						"amp": 433.9476592991542,
						"vv": 0.7871484032046224
					},
					{
						"c0": 140,
						"amp": 113.69143730845465,
						"vv": 0.5003372214431859
					}
				]
			],
			"linear_gradients": [
				{
					"X": -250,
					"Y": -250
				},
				{
					"X": 250,
					"Y": 250
				}
			],
			"rad_gradients": [
				{
					"R": 0,
					"X": 187.5,
					"Y": 187.5
				},
				{
					"R": 500,
					"X": 187.5,
					"Y": 187.5
				}
			],
			"startup_rr_r0": []
		},
		"flat_sprite_url": "",
		"flat_sprite_ext": "png",
		"custom_image_url": "img/title",
		"custom_image_ext": "png",
		"fillFrom": -1,
		"uniform_delay": true,
		"bgRefillColor": null,
		"sprites_seed": {
			"common_ff": {
				"f0": 0,
				"vv": 0
			},
			"rr": {
				"ra": 400,
				"vv": 1.5,
				"f0": 0,
				"r0": -300
			},
			"cc": {
				"f0": 0,
				"vv": -2
			},
			"ff": {
				"f0": 0,
				"vv": 0
			},
			"ss": {
				"sa": 10,
				"vv": 0.03,
				"f0": 0,
				"s0": 1
			},
			"randomizer": {
				"rr": {
					"ra": {
						"base": 0.8,
						"factor": 0.4
					},
					"vv": {
						"base": -0.5
					}
				},
				"cc": {
					"vv": {
						"factor": 1,
						"base": -0.5
					}
				},
				"ff": {
					"vv": {
						"base": 0.4,
						"factor": 0.8
					}
				},
				"ss": {
					"sa": {
						"base": 1,
						"factor": 0.4
					},
					"vv": {
						"base": 0.5,
						"factor": 1
					}
				}
			}
		},
		"seeds": [],
		"sprites": [
			{
				"rr": {
					"ra": 372.3402236562726,
					"vv": -0.5622330864316589,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": 0.5280554095668686
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 10.781528199019641,
					"vv": 0.029049559519574497,
					"f0": 0,
					"s0": 1
				},
				"delay": 6000,
				"delayTicks": 375
			},
			{
				"rr": {
					"ra": 357.2139982508566,
					"vv": -0.3542761914783431,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": 0.34555523805115773
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 13.245731106080594,
					"vv": 0.044980963692331656,
					"f0": 0,
					"s0": 1
				},
				"delay": 750,
				"delayTicks": 46.875
			},
			{
				"rr": {
					"ra": 404.5271976784785,
					"vv": 0.3405799095933505,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": -0.9242903152286213
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 12.056093172904063,
					"vv": 0.04469188020301863,
					"f0": 0,
					"s0": 1
				},
				"delay": 1500,
				"delayTicks": 93.75
			},
			{
				"rr": {
					"ra": 455.22130569118656,
					"vv": 0.032140882648016234,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": -0.25398917119660047
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 13.041674541206946,
					"vv": 0.03898667930678289,
					"f0": 0,
					"s0": 1
				},
				"delay": 2250,
				"delayTicks": 140.625
			},
			{
				"rr": {
					"ra": 450.2070343547266,
					"vv": 0.2087836745134159,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": 0.9854247674092369
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 13.887643640571367,
					"vv": 0.038256429496155146,
					"f0": 0,
					"s0": 1
				},
				"delay": 3000,
				"delayTicks": 187.5
			},
			{
				"rr": {
					"ra": 471.2133616789858,
					"vv": -0.001329178272467868,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": 0.5058582598098709
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 11.203309811926692,
					"vv": 0.0393578989948931,
					"f0": 0,
					"s0": 1
				},
				"delay": 3750,
				"delayTicks": 234.375
			},
			{
				"rr": {
					"ra": 337.97140270203704,
					"vv": -0.2880874512991841,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": -0.5719042125221683
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 10.369712389919723,
					"vv": 0.01921587425286741,
					"f0": 0,
					"s0": 1
				},
				"delay": 4500,
				"delayTicks": 281.25
			},
			{
				"rr": {
					"ra": 381.1659047692077,
					"vv": -0.5326440971137768,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": -0.6212304983918213
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 10.946137035080506,
					"vv": 0.017774706550716318,
					"f0": 0,
					"s0": 1
				},
				"delay": 5250,
				"delayTicks": 328.125
			}
		]
	},
	"itemsMax": 8,
	"backwardInTime": true,
	"runInfinitely": true,
	"ticksPeriod": 2500,
	"playPeriod": 40000,
	"turnTicksPoint": 1250,
	"turnPonitPause": 6000,
	"dontDrawAfterPeriod": true,
	"keepAtResize": true,
	"memLoss": 0.0005,
	"leftMemorySensor": 0.98,
	"critPointmemLoss": 0.0005,
	"memClearAt0": 0,
	"clearEnd": 0,
	"spaceTransf": false,
	"csize": "",
	"cwidth": 0,
	"cheight": 0,
	"vwidth": 1000,
	"vheight": 800,
	"virt": "t",
	"noratio": true,
	"cCSS": 0,
	"min_width": 720,
	"min_height": 420,
	"body_overflow": "",
	"wrap_overflow": "",
	"animation_is_allowed": true,
	"use_setTimeout": false,
	"doSyncTime": true,
	"screen_center_x": null,
	"screen_center_y": null,
	"stop_on_click": false,
	"stop_afer_tick": false,
	"disable_landing_loading_warning": true,
	"landingSplashDuration": 0,
	"preventCanvasAbsPos": true,
	"canvasHeightToWidth": -1,
	"runFlyer": true,
	"grainsNumber": 0,
	"sprite_url": "",
	"boxMaxX": 1000,
	"boxMaxY": 1500,
	"boxMaxZ": 1500,
	"boxCenterX": 0,
	"boxCenterY": 0,
	"boxCenterZ": -300,
	"bodyRadiusMax": 20,
	"originY": 800,
	"scale": 1000,
	"bigScreenScaleThreshold": 0,
	"movingObserver": true,
	"movingObserverStepX": 10,
	"movingObserverStepY": 10,
	"movingObserverStepZ": 10,
	"reset_population_at_reset": false,
	"generate_backg_img": false,
	"timeScale": 1,
	"frozenTicksStart": 2500,
	"animationInterval": 20,
	"memLossExp": 5.001250416822429e-7,
	"critPointMemLossExp": 5.001250416822429e-7,
	"ticksPerMsec": 0.0625
};

btb.paste_non_arrays( conf, graph.capturer.conf );
}) ();

