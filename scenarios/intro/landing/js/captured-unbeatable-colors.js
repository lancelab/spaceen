

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
						"amp": 313.35208350257756,
						"vv": 1.143396899393551
					},
					{
						"c0": 140,
						"amp": 423.8353091866807,
						"vv": 0.8530174197701507
					},
					{
						"c0": 140,
						"amp": 127.22320957095658,
						"vv": 0.5408688349347791
					}
				],
				[
					{
						"c0": 50,
						"amp": 390.76880435381315,
						"vv": 0.5790808420647469
					},
					{
						"c0": 140,
						"amp": 179.60918056793437,
						"vv": 0.535400537300003
					},
					{
						"c0": 140,
						"amp": 258.8064260902441,
						"vv": 0.5084344463607893
					}
				],
				[
					{
						"c0": 50,
						"amp": 460.049597754503,
						"vv": 1.4080843459884242
					},
					{
						"c0": 140,
						"amp": 354.05484129239363,
						"vv": 0.4858818575717139
					},
					{
						"c0": 140,
						"amp": 125.51522084321908,
						"vv": 0.28626860648950186
					}
				],
				[
					{
						"c0": 50,
						"amp": 351.8721156326993,
						"vv": 1.3538115603564222
					},
					{
						"c0": 140,
						"amp": 419.42707685624356,
						"vv": 0.4560959002192351
					},
					{
						"c0": 140,
						"amp": 157.19387779852784,
						"vv": 0.21814742756002087
					}
				],
				[
					{
						"c0": 50,
						"amp": 361.9623743971884,
						"vv": 0.5652798436810439
					},
					{
						"c0": 140,
						"amp": 220.14377337119114,
						"vv": 0.36299535628663615
					},
					{
						"c0": 140,
						"amp": 134.08407380421917,
						"vv": 0.21826341818454834
					}
				],
				[
					{
						"c0": 50,
						"amp": 411.6639615677837,
						"vv": 1.3723620272781796
					},
					{
						"c0": 140,
						"amp": 369.95990003951175,
						"vv": 0.6474243778602577
					},
					{
						"c0": 140,
						"amp": 271.3509957011637,
						"vv": 0.20556126271436206
					}
				],
				[
					{
						"c0": 50,
						"amp": 519.3006360956715,
						"vv": 1.4206855029635133
					},
					{
						"c0": 140,
						"amp": 175.62155120615233,
						"vv": 0.6030709746310717
					},
					{
						"c0": 140,
						"amp": 217.55460012532626,
						"vv": 0.35317753898799636
					}
				],
				[
					{
						"c0": 50,
						"amp": 510.79058613163045,
						"vv": 1.0396736824363977
					},
					{
						"c0": 140,
						"amp": 298.1529403150414,
						"vv": 0.42005287991288953
					},
					{
						"c0": 140,
						"amp": 279.51139436689897,
						"vv": 0.2869776017010521
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
		"bgRefillColor": '',
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
					"ra": 424.8065763769596,
					"vv": 0.22768847555442057,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": -0.6557305348317388
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 10.02289861638361,
					"vv": 0.03984675431606577,
					"f0": 0,
					"s0": 1
				},
				"delay": 6000,
				"delayTicks": 375
			},
			{
				"rr": {
					"ra": 363.97802941538686,
					"vv": -0.4559531912140684,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": -0.3594283856906042
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 10.390648239238221,
					"vv": 0.02230646686895985,
					"f0": 0,
					"s0": 1
				},
				"delay": 750,
				"delayTicks": 46.875
			},
			{
				"rr": {
					"ra": 382.30149794392776,
					"vv": 0.3939574520792171,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": 0.2435857944182127
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 12.186693609987081,
					"vv": 0.018249523521846448,
					"f0": 0,
					"s0": 1
				},
				"delay": 1500,
				"delayTicks": 93.75
			},
			{
				"rr": {
					"ra": 366.5329407547416,
					"vv": 0.0032101732860335686,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": 0.11144438658933464
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 11.818731958871044,
					"vv": 0.022252796338098853,
					"f0": 0,
					"s0": 1
				},
				"delay": 2250,
				"delayTicks": 140.625
			},
			{
				"rr": {
					"ra": 443.7292802497639,
					"vv": 0.6706655498076481,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": 0.02170101972477889
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 10.471755110244167,
					"vv": 0.03134928207213387,
					"f0": 0,
					"s0": 1
				},
				"delay": 3000,
				"delayTicks": 187.5
			},
			{
				"rr": {
					"ra": 389.56341283541906,
					"vv": 0.7076191247605814,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": -0.6761904073829317
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 12.20320033168383,
					"vv": 0.027591909819918194,
					"f0": 0,
					"s0": 1
				},
				"delay": 3750,
				"delayTicks": 234.375
			},
			{
				"rr": {
					"ra": 468.4757762187374,
					"vv": 0.747315114322558,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": -0.5108260133313207
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 10.084816581247269,
					"vv": 0.0309451826694506,
					"f0": 0,
					"s0": 1
				},
				"delay": 4500,
				"delayTicks": 281.25
			},
			{
				"rr": {
					"ra": 421.71869007906133,
					"vv": 0.3906128014521974,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": -0.4054397577852853
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 12.089009930383414,
					"vv": 0.01649427302031009,
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
	"clearEnd": 1,
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
	"ticksPerMsec": 0.0625,
	"rerandom" : true
};

btb.paste_non_arrays( conf, graph.capturer.conf );
}) ();

