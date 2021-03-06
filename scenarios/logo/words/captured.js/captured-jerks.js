
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
			"pauseExtendedStart": 100,
			"addCulStartToPause": 50,
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
						"amp": 348.63871954026695,
						"vv": 0.9218659795215968
					},
					{
						"c0": 255,
						"amp": 322.8899551435798,
						"vv": 0.8669187856641761
					},
					{
						"c0": 255,
						"amp": 266.8625579917488,
						"vv": 0.34253453437480474
					}
				],
				[
					{
						"c0": 255,
						"amp": 530.8790271949381,
						"vv": 0.7161298377709987
					},
					{
						"c0": 255,
						"amp": 223.35058666573684,
						"vv": 0.8021391825304346
					},
					{
						"c0": 255,
						"amp": 119.76552702333332,
						"vv": 0.20043845733132334
					}
				],
				[
					{
						"c0": 255,
						"amp": 550.19113759512,
						"vv": 0.8012010080638998
					},
					{
						"c0": 255,
						"amp": 392.780740162808,
						"vv": 0.5047712997695707
					},
					{
						"c0": 255,
						"amp": 171.76424488272158,
						"vv": 0.4743663614335709
					}
				],
				[
					{
						"c0": 255,
						"amp": 416.05956233130235,
						"vv": 1.3185840892975336
					},
					{
						"c0": 255,
						"amp": 263.7169351972089,
						"vv": 0.405963479543896
					},
					{
						"c0": 255,
						"amp": 173.23625503384358,
						"vv": 0.2864026354267045
					}
				],
				[
					{
						"c0": 255,
						"amp": 419.27514935206,
						"vv": 0.7847954627071553
					},
					{
						"c0": 255,
						"amp": 207.0983067437097,
						"vv": 0.393460733277739
					},
					{
						"c0": 255,
						"amp": 260.8486203210817,
						"vv": 0.36131297236999615
					}
				],
				[
					{
						"c0": 255,
						"amp": 433.40333869464496,
						"vv": 0.8681350657016588
					},
					{
						"c0": 255,
						"amp": 401.73078268882495,
						"vv": 0.5457973224085982
					},
					{
						"c0": 255,
						"amp": 123.41106776963157,
						"vv": 0.2466410417192517
					}
				],
				[
					{
						"c0": 255,
						"amp": 251.31128547670104,
						"vv": 0.9632407159890888
					},
					{
						"c0": 255,
						"amp": 171.48145381026026,
						"vv": 0.7999528876006313
					},
					{
						"c0": 255,
						"amp": 121.78706426848755,
						"vv": 0.5487804135477818
					}
				],
				[
					{
						"c0": 255,
						"amp": 483.15357476095306,
						"vv": 0.702748800100652
					},
					{
						"c0": 255,
						"amp": 429.70112988398097,
						"vv": 0.7761524504586027
					},
					{
						"c0": 255,
						"amp": 298.5709324680988,
						"vv": 0.5096690475477831
					}
				],
				[
					{
						"c0": 255,
						"amp": 201.20853266298786,
						"vv": 1.0796146074995816
					},
					{
						"c0": 255,
						"amp": 386.6810629157099,
						"vv": 0.7062616031846409
					},
					{
						"c0": 255,
						"amp": 141.88071614862423,
						"vv": 0.5080022648399948
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
			],
			"startup_rr_r0": [
				-95,
				-62,
				5,
				-11,
				54,
				73,
				123,
				106,
				130
			]
		},
		"flat_sprite_url": "",
		"flat_sprite_ext": "png",
		"custom_image_url": "",
		"custom_image_ext": "png",
		"fillFrom": 200,
		"sparkRange": 6,
		"uniform_delay": false,
		"bgRefillColor": "#000000",
		"pauseImageStays": null,
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
					"ra": 122.07228997793126,
					"vv": -0.49274196570120127,
					"f0": 0,
					"r0": -95
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": -0.7248087664143772
				},
				"ss": {
					"sa": 11.483510702997663,
					"vv": 0.016060468806984547,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 165.4445955469721,
					"vv": -0.113360397569374,
					"f0": 0,
					"r0": -62
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": -1.2508849430242555
				},
				"ss": {
					"sa": 12.230431712690944,
					"vv": 0.007829654894055441,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 139.3750998495523,
					"vv": 0.6225152213881023,
					"f0": 0,
					"r0": 5
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": -1.5497075096510349
				},
				"ss": {
					"sa": 13.862343539809865,
					"vv": 0.020916705093628613,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 164.72493919181886,
					"vv": 0.07904272967401971,
					"f0": 0,
					"r0": -11
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": -0.6380347599374083
				},
				"ss": {
					"sa": 11.978660132087377,
					"vv": 0.007917897690489109,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 126.84412127897674,
					"vv": -0.1924028302130702,
					"f0": 0,
					"r0": 54
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": -0.9105087354551995
				},
				"ss": {
					"sa": 11.21386620769011,
					"vv": 0.021926928957611266,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 123.12776857634607,
					"vv": 0.30049139721518653,
					"f0": 0,
					"r0": 73
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": -0.9602372530404556
				},
				"ss": {
					"sa": 10.113119716890262,
					"vv": 0.01996626862229562,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 131.24367075980982,
					"vv": -0.20034729969780057,
					"f0": 0,
					"r0": 123
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": -1.6618727382034466
				},
				"ss": {
					"sa": 11.063177337632265,
					"vv": 0.016338215098757543,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 159.46728207125122,
					"vv": -0.4092629997146002,
					"f0": 0,
					"r0": 106
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": -1.1772659300780761
				},
				"ss": {
					"sa": 13.639490526200056,
					"vv": 0.022105554527741697,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 146.70029240689448,
					"vv": 0.29468592658288434,
					"f0": 0,
					"r0": 130
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": -1.418539481186613
				},
				"ss": {
					"sa": 13.906418945503159,
					"vv": 0.02182793124188025,
					"f0": 0,
					"s0": 1
				}
			}
		]
	},
	"itemsMax": 9,
	"backwardInTime": true,
	"runInfinitely": false,
	"playPeriod": 8000,
	"ticksPeriod": 400,
	"turnTicksPoint": 400,
	"turnPonitPause": 0,
	"dontDrawAfterPeriod": false,
	"keepAtResize": true,
	"memLoss": 0.4,
	"leftMemorySensor": 0.98,
	"critPointmemLoss": 0.8,
	"clearEnd": 0,
	"memClearAt0": 0,
	"spaceTransf": false,
	"csize": "",
	"cwidth": 700,
	"cheight": 400,
	"vwidth": 700,
	"vheight": 400,
	"virt": "t",
	"noratio": true,
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
	"rerandom": 1,
	"scaffold": "",
	"in3D": null,
	"timeScale": 1,
	"drawFromBTAfterStopped": null,
	"frozenTicksStart": 400,
	"insertFMemBefore": null,
	"picClearAt0": null,
	"picClearAtEnd": null,
	"pictFadeInPause": null,
	"cBgColor": null,
	"canvasHeightToWidth": null,
	"underCanvasInSync": null,
	"preventCanvasAbsPos": null,
	"dummyNoCommaAfter": 2,
	"animationInterval": 20,
	"memLossExp": 0.0005108256237659907,
	"critPointMemLossExp": 0.0016094379124341005,
	"ticksPerMsec": 0.05
};

btb.paste_non_arrays( conf, graph.capturer.conf );
}) ();

