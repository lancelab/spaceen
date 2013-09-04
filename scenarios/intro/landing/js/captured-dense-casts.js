

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
						"amp": 200.46173917870163,
						"vv": 0.9903213837239104
					},
					{
						"c0": 140,
						"amp": 413.1600800919227,
						"vv": 0.8065909038645779
					},
					{
						"c0": 140,
						"amp": 192.89218023485654,
						"vv": 0.5075508100955157
					}
				],
				[
					{
						"c0": 50,
						"amp": 312.39981080324594,
						"vv": 1.0227655115988246
					},
					{
						"c0": 140,
						"amp": 285.9124556049185,
						"vv": 0.5160730103347699
					},
					{
						"c0": 140,
						"amp": 255.45374503700558,
						"vv": 0.2392351430295755
					}
				],
				[
					{
						"c0": 50,
						"amp": 400.8274605365493,
						"vv": 0.5418272387932889
					},
					{
						"c0": 140,
						"amp": 338.299976828275,
						"vv": 0.646470837779288
					},
					{
						"c0": 140,
						"amp": 256.47357589684486,
						"vv": 0.3765065260046988
					}
				],
				[
					{
						"c0": 50,
						"amp": 432.7119706462884,
						"vv": 1.4742249102805838
					},
					{
						"c0": 140,
						"amp": 197.03644271372187,
						"vv": 0.5697180955389282
					},
					{
						"c0": 140,
						"amp": 244.3527029986653,
						"vv": 0.38422717626669595
					}
				],
				[
					{
						"c0": 50,
						"amp": 406.05805814776954,
						"vv": 0.5329880573671032
					},
					{
						"c0": 140,
						"amp": 356.68852024497045,
						"vv": 0.600988975050953
					},
					{
						"c0": 140,
						"amp": 130.28799604981862,
						"vv": 0.4835056972196613
					}
				],
				[
					{
						"c0": 50,
						"amp": 407.0561026780286,
						"vv": 1.4380722315649086
					},
					{
						"c0": 140,
						"amp": 188.31598168655182,
						"vv": 0.5525012757581943
					},
					{
						"c0": 140,
						"amp": 124.44898704614396,
						"vv": 0.48738481225230645
					}
				],
				[
					{
						"c0": 50,
						"amp": 312.3445490178315,
						"vv": 1.3043281235868258
					},
					{
						"c0": 140,
						"amp": 251.1433065916884,
						"vv": 0.3004304523758588
					},
					{
						"c0": 140,
						"amp": 254.3439702192665,
						"vv": 0.5431285860333971
					}
				],
				[
					{
						"c0": 50,
						"amp": 316.64049692896776,
						"vv": 1.1383487292318506
					},
					{
						"c0": 140,
						"amp": 405.1517113683363,
						"vv": 0.8141631428047448
					},
					{
						"c0": 140,
						"amp": 263.5514489305437,
						"vv": 0.4589485269011596
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
					"ra": 450.86529323780366,
					"vv": 0.6558523068096423,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": -0.07140889783335913
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 13.993615883867502,
					"vv": 0.0195110777447452,
					"f0": 0,
					"s0": 1
				},
				"delay": 6000,
				"delayTicks": 375
			},
			{
				"rr": {
					"ra": 357.9610366060743,
					"vv": -0.5852969862268103,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": -0.8207064130031008
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 10.795281232994189,
					"vv": 0.036808665128076984,
					"f0": 0,
					"s0": 1
				},
				"delay": 750,
				"delayTicks": 46.875
			},
			{
				"rr": {
					"ra": 434.70308529517484,
					"vv": -0.689270432762106,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": 0.8123799226450632
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 11.88927961939343,
					"vv": 0.018229016007312575,
					"f0": 0,
					"s0": 1
				},
				"delay": 1500,
				"delayTicks": 93.75
			},
			{
				"rr": {
					"ra": 359.4130940962283,
					"vv": -0.4404591742140779,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": -0.2810510233857435
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 10.281636651543167,
					"vv": 0.031314131114632826,
					"f0": 0,
					"s0": 1
				},
				"delay": 2250,
				"delayTicks": 140.625
			},
			{
				"rr": {
					"ra": 456.8459736087716,
					"vv": 0.19241867622417497,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": -0.34561208710030566
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 13.666167375792035,
					"vv": 0.016603509921354682,
					"f0": 0,
					"s0": 1
				},
				"delay": 3000,
				"delayTicks": 187.5
			},
			{
				"rr": {
					"ra": 442.0072767837041,
					"vv": 0.4502302942435063,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": -0.14500214944792433
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 10.826033881795887,
					"vv": 0.022254549592071207,
					"f0": 0,
					"s0": 1
				},
				"delay": 3750,
				"delayTicks": 234.375
			},
			{
				"rr": {
					"ra": 435.89660093235034,
					"vv": 0.7192440858817404,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": -0.596078890692364
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 11.23386008967956,
					"vv": 0.022651738291081157,
					"f0": 0,
					"s0": 1
				},
				"delay": 4500,
				"delayTicks": 281.25
			},
			{
				"rr": {
					"ra": 330.2834566184319,
					"vv": 0.21500280184479847,
					"f0": 0,
					"r0": -300
				},
				"cc": {
					"f0": 0,
					"vv": 0.4791951809622055
				},
				"ff": {
					"f0": 0,
					"vv": 0
				},
				"ss": {
					"sa": 10.911702344442475,
					"vv": 0.028686750337631947,
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

