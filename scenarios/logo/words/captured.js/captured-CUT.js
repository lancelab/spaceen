             
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
			"fillSprites": false,
			"titlePosX": -350,
			"titlePosY": 200,
			"swap_gradients": 1,
			"startColorA": 1,
			"endColorA": 1,
			"colorUpperBound": 255,
			"alphaUpperBound": 1,
			"culmColorUpperBound": 255,
			"culmAlphaUpperBound": 1,
			"shape_paths": [
				[
					{
						"x": -105,
						"y": 0
					},
					{
						"x": -85,
						"y": 0
					},
					{
						"x": -85,
						"y": 50
					},
					{
						"x": -60,
						"y": 0
					},
					{
						"x": -43,
						"y": 0
					},
					{
						"x": -43,
						"y": 50
					},
					{
						"x": -18,
						"y": 0
					},
					{
						"x": 0,
						"y": 0
					},
					{
						"x": -35,
						"y": 73
					},
					{
						"x": -35,
						"y": 73
					},
					{
						"x": -57,
						"y": 73
					},
					{
						"x": -54,
						"y": 25
					},
					{
						"x": -81,
						"y": 73
					},
					{
						"x": -102,
						"y": 73
					}
				],
				[
					{
						"x": -18,
						"y": -3
					},
					{
						"x": -2,
						"y": -3
					},
					{
						"x": -8,
						"y": 24
					},
					{
						"x": 15,
						"y": 17
					},
					{
						"x": 27,
						"y": 29
					},
					{
						"x": 17,
						"y": 73
					},
					{
						"x": 0,
						"y": 73
					},
					{
						"x": 9,
						"y": 35
					},
					{
						"x": 3,
						"y": 30
					},
					{
						"x": -10,
						"y": 33
					},
					{
						"x": -20,
						"y": 73
					},
					{
						"x": -36,
						"y": 73
					}
				],
				[
					{
						"x": -14,
						"y": -3
					},
					{
						"x": 3,
						"y": -3
					},
					{
						"x": 0,
						"y": 11
					},
					{
						"x": -17,
						"y": 11
					}
				],
				[
					{
						"x": -3,
						"y": 19
					},
					{
						"x": 13,
						"y": 19
					},
					{
						"x": 0,
						"y": 73
					},
					{
						"x": -17,
						"y": 73
					}
				],
				[
					{
						"x": -34,
						"y": 19
					},
					{
						"x": -18,
						"y": 19
					},
					{
						"x": -20,
						"y": 27
					},
					{
						"x": -6,
						"y": 20
					},
					{
						"x": 4,
						"y": 19
					},
					{
						"x": 0,
						"y": 36
					},
					{
						"x": -15,
						"y": 35
					},
					{
						"x": -22,
						"y": 37
					},
					{
						"x": -31,
						"y": 73
					},
					{
						"x": -48,
						"y": 73
					}
				],
				[
					{
						"x": 1,
						"y": -3
					},
					{
						"x": 19,
						"y": -3
					},
					{
						"x": 0,
						"y": 73
					},
					{
						"x": -17,
						"y": 73
					}
				],
				[
					{
						"x": -13,
						"y": -3
					},
					{
						"x": 3,
						"y": -3
					},
					{
						"x": 0,
						"y": 11
					},
					{
						"x": -17,
						"y": 11
					}
				],
				[
					{
						"x": -2,
						"y": 19
					},
					{
						"x": 14,
						"y": 19
					},
					{
						"x": 0,
						"y": 73
					},
					{
						"x": -16,
						"y": 73
					}
				],
				[
					{
						"x": 12,
						"y": 23
					},
					{
						"x": 16,
						"y": 20
					},
					{
						"x": 24,
						"y": 17
					},
					{
						"x": 38,
						"y": 17
					},
					{
						"x": 52,
						"y": 23
					},
					{
						"x": 58,
						"y": 35
					},
					{
						"x": 54,
						"y": 59
					},
					{
						"x": 37,
						"y": 73
					},
					{
						"x": 21,
						"y": 77
					},
					{
						"x": 7,
						"y": 73
					},
					{
						"x": 0,
						"y": 66
					},
					{
						"x": -4,
						"y": 53
					},
					{
						"x": 0,
						"y": 35
					},
					{
						"x": 9,
						"y": 25
					},
					{
						"x": 18,
						"y": 35
					},
					{
						"x": 14,
						"y": 47
					},
					{
						"x": 15,
						"y": 59
					},
					{
						"x": 23,
						"y": 64
					},
					{
						"x": 32,
						"y": 62
					},
					{
						"x": 38,
						"y": 53
					},
					{
						"x": 40,
						"y": 40
					},
					{
						"x": 37,
						"y": 31
					},
					{
						"x": 28,
						"y": 29
					},
					{
						"x": 22,
						"y": 32
					}
				]
			],
			"start_colors": [
				[
					{
						"c0": 255,
						"amp": 424.19746803437766,
						"vv": 1.290770344227084
					},
					{
						"c0": 255,
						"amp": 263.9492222772868,
						"vv": 0.7139192828270885
					},
					{
						"c0": 255,
						"amp": 174.901793201311,
						"vv": 0.5721060090367963
					}
				],
				[
					{
						"c0": 255,
						"amp": 250.63459671365064,
						"vv": 0.9958598944301522
					},
					{
						"c0": 255,
						"amp": 189.4125181890661,
						"vv": 0.5915599162091222
					},
					{
						"c0": 255,
						"amp": 248.87660121528134,
						"vv": 0.23319817738411716
					}
				]
			],
			"linear_gradients": [
				{
					"X": 0,
					"Y": 80
				},
				{
					"X": 0,
					"Y": -20
				}
			],
			"rad_gradients": [
				{
					"R": 10,
					"X": 0,
					"Y": 80
				},
				{
					"R": 160,
					"X": 0,
					"Y": 80
				}
			]
		},
		"flat_sprite_url": "",
		"flat_sprite_ext": "png",
		"custom_image_url": "",
		"custom_image_ext": "png",
		"fillFrom": null,
		"uniform_delay": false,
		"bgRefillColor": "#000000",
		"sprites_seed": {
			"common_ff": {
				"f0": 0,
				"vv": 0
			},
			"rr": {
				"ra": 150,
				"vv": 1.5,
				"f0": 0,
				"r0": null
			},
			"cc": {
				"f0": 0,
				"vv": 0
			},
			"ff": {
				"f0": 0,
				"vv": -1.5
			},
			"ss": {
				"sa": 10,
				"vv": 0.015,
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
					"ra": 168.7283753218291,
					"vv": -0.1365278185297547,
					"f0": 0,
					"r0": -95
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": -0.7229817605730298
				},
				"ss": {
					"sa": 12.238076250342187,
					"vv": 0.009668012193174097,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 141.14005114882113,
					"vv": -0.014601672903936769,
					"f0": 0,
					"r0": -62
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": -1.228132420815733
				},
				"ss": {
					"sa": 12.053053171810344,
					"vv": 0.016507248449046073,
					"f0": 0,
					"s0": 1
				}
			}
		]
	},
	"itemsMax": 2,
	"backwardInTime": true,
	"runInfinitely": false,
	"ticksPeriod": 400,
	"playPeriod": 8000,
	"turnTicksPoint": 400,
	"turnPonitPause": 0,
	"dontDrawAfterPeriod": false,
	"keepAtResize": true,
	"memLoss": 0.005,
	"leftMemorySensor": 0.98,
	"critPointmemLoss": 0.01,
	"memClearAt0": 0,
	"clearEnd": 0,
	"spaceTransf": false,
	"csize": "",
	"cwidth": 700,
	"cheight": 400,
	"vwidth": 700,
	"vheight": 400,
	"virt": "t",
	"noratio": false,
	"cCSS": 1,
	"min_width": "",
	"min_height": "",
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
	"landingSplashDuration": 1000,
	"runFlyer": true,
	"grainsNumber": 0,
	"sprite_url": "",
	"boxMax": 500,
	"bodyRadiusMax": 20,
	"originY": 200,
	"scale": 100,
	"framesInCircle": 500,
	"scaffold": "",
	"frozenTicksStart": 400,
	"animationInterval": 20,
	"memLossExp": 0.000005012541823544286,
	"critPointMemLossExp": 0.00001005033585350145,
	"ticksPerMsec": 0.05,
	"dev": true
};

btb.paste_non_arrays( conf, graph.capturer.conf );
}) ();


