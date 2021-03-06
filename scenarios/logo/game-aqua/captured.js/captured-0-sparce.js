
( function () {
		var btb				= window.btb$			= window.btb$				|| {};
		var graph			= btb.graph				= btb.graph					|| {};
		var conf			= graph.conf			= graph.conf				|| {};
		var capturer		= graph.capturer		= graph.capturer			|| {};

graph.capturer.conf = 
{
	"cflyer": {
		"dconf": {
			"doDisableR0": true,
			"doRadialGradient": false,
			"fillSprites": true,
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
			"shape_paths": [],
			"start_colors": [
				[
					{
						"c0": 249,
						"amp": 404.84561760777495,
						"vv": 1.2620112174564744
					},
					{
						"c0": 252,
						"amp": 410.0340789362583,
						"vv": 0.32791772381493167
					},
					{
						"c0": 51,
						"amp": 259.98750244846286,
						"vv": 0.5870176002714942
					}
				],
				[
					{
						"c0": 228,
						"amp": 583.0209618676715,
						"vv": 1.4545569704938741
					},
					{
						"c0": 255,
						"amp": 275.53931081947286,
						"vv": 0.42959548010520493
					},
					{
						"c0": 0,
						"amp": 158.65317015214592,
						"vv": 0.34888515266425635
					}
				],
				[
					{
						"c0": 228,
						"amp": 444.0502650423843,
						"vv": 1.1021227600647663
					},
					{
						"c0": 255,
						"amp": 361.383191448062,
						"vv": 0.45611342719376574
					},
					{
						"c0": 0,
						"amp": 213.40033494131544,
						"vv": 0.2954506523127759
					}
				],
				[
					{
						"c0": 0,
						"amp": 569.6698550739376,
						"vv": 1.051155156548591
					},
					{
						"c0": 200,
						"amp": 297.2740343527164,
						"vv": 0.6179063524204541
					},
					{
						"c0": 100,
						"amp": 146.08195579432038,
						"vv": 0.39317964508024716
					}
				],
				[
					{
						"c0": 0,
						"amp": 534.3142183751487,
						"vv": 1.0288798801816044
					},
					{
						"c0": 150,
						"amp": 418.733364583797,
						"vv": 0.5086682810909097
					},
					{
						"c0": 200,
						"amp": 166.14533011453418,
						"vv": 0.4730419593576154
					}
				],
				[
					{
						"c0": 0,
						"amp": 241.68625354694032,
						"vv": 0.8550990588608746
					},
					{
						"c0": 110,
						"amp": 342.71340073256886,
						"vv": 0.33397468009544956
					},
					{
						"c0": 200,
						"amp": 159.21121144974651,
						"vv": 0.28224373340952386
					}
				],
				[
					{
						"c0": 0,
						"amp": 529.441607343459,
						"vv": 1.4641128262749272
					},
					{
						"c0": 80,
						"amp": 237.6701362572029,
						"vv": 0.7883786318022427
					},
					{
						"c0": 200,
						"amp": 269.9943983904401,
						"vv": 0.5759882436352901
					}
				],
				[
					{
						"c0": 0,
						"amp": 543.9280465094025,
						"vv": 1.41813130310937
					},
					{
						"c0": 80,
						"amp": 240.18251241865977,
						"vv": 0.6231012775341925
					},
					{
						"c0": 230,
						"amp": 163.15344637174397,
						"vv": 0.37142123654786974
					}
				],
				[
					{
						"c0": 100,
						"amp": 345.123798740318,
						"vv": 0.621863131606418
					},
					{
						"c0": 180,
						"amp": 212.29797474124572,
						"vv": 0.6853041044099123
					},
					{
						"c0": 180,
						"amp": 206.00871032034064,
						"vv": 0.5597447121873654
					}
				],
				[
					{
						"c0": 100,
						"amp": 247.62225154884115,
						"vv": 0.9450374661818689
					},
					{
						"c0": 100,
						"amp": 291.4995507624726,
						"vv": 0.8300478352313738
					},
					{
						"c0": 230,
						"amp": 221.16944309540324,
						"vv": 0.3338110273127215
					}
				],
				[
					{
						"c0": 10,
						"amp": 336.7130119952303,
						"vv": 1.4254357974765548
					},
					{
						"c0": 10,
						"amp": 258.5293761088489,
						"vv": 0.8074097337307606
					},
					{
						"c0": 255,
						"amp": 104.96239387057562,
						"vv": 0.3373377009673362
					}
				]
			],
			"end_colors": [
				[
					{
						"c0": 255,
						"amp": 552.6141342359281,
						"vv": 0.7754225905880009
					},
					{
						"c0": 0,
						"amp": 350.26332795092634,
						"vv": 0.8519930449014331
					},
					{
						"c0": 0,
						"amp": 202.89952739334674,
						"vv": 0.23252330819887243
					}
				],
				[
					{
						"c0": 255,
						"amp": 481.73072618210074,
						"vv": 0.6563408900813137
					},
					{
						"c0": 80,
						"amp": 310.0024467875011,
						"vv": 0.6365508279093967
					},
					{
						"c0": 0,
						"amp": 100.85405276039243,
						"vv": 0.5878130073832886
					}
				],
				[
					{
						"c0": 233,
						"amp": 292.98144963832226,
						"vv": 1.0545132060204003
					},
					{
						"c0": 120,
						"amp": 217.30281542919846,
						"vv": 0.3462059580630567
					},
					{
						"c0": 0,
						"amp": 194.54900537248852,
						"vv": 0.2707056625075707
					}
				],
				[
					{
						"c0": 220,
						"amp": 496.4759939065312,
						"vv": 1.2044636896603764
					},
					{
						"c0": 180,
						"amp": 238.35639823076883,
						"vv": 0.3252453932863344
					},
					{
						"c0": 0,
						"amp": 270.3643063683957,
						"vv": 0.40412169892235283
					}
				],
				[
					{
						"c0": 0,
						"amp": 511.6740160754077,
						"vv": 1.3204642101495283
					},
					{
						"c0": 200,
						"amp": 167.44720705167447,
						"vv": 0.3911234874526177
					},
					{
						"c0": 50,
						"amp": 101.92007506681273,
						"vv": 0.4503666307246583
					}
				],
				[
					{
						"c0": 0,
						"amp": 458.30205459081503,
						"vv": 0.8929326927359061
					},
					{
						"c0": 200,
						"amp": 241.00866498044402,
						"vv": 0.34771769596481444
					},
					{
						"c0": 170,
						"amp": 154.7847413529486,
						"vv": 0.4305230807212994
					}
				],
				[
					{
						"c0": 0,
						"amp": 223.923362750636,
						"vv": 0.6848327288068226
					},
					{
						"c0": 180,
						"amp": 303.05338985491426,
						"vv": 0.31365070830081976
					},
					{
						"c0": 180,
						"amp": 208.44642138284692,
						"vv": 0.5568146560641954
					}
				],
				[
					{
						"c0": 60,
						"amp": 353.2655829537328,
						"vv": 1.1900076895434764
					},
					{
						"c0": 160,
						"amp": 186.90769606806015,
						"vv": 0.3545766140570419
					},
					{
						"c0": 190,
						"amp": 266.34218676408005,
						"vv": 0.2135740308245497
					}
				],
				[
					{
						"c0": 150,
						"amp": 256.3644559913944,
						"vv": 0.7030763788613212
					},
					{
						"c0": 230,
						"amp": 340.5853369724185,
						"vv": 0.31282096491372435
					},
					{
						"c0": 230,
						"amp": 181.96644576510573,
						"vv": 0.44002568071903936
					}
				],
				[
					{
						"c0": 0,
						"amp": 472.03476099582053,
						"vv": 1.0069635252837754
					},
					{
						"c0": 150,
						"amp": 351.1625060121661,
						"vv": 0.31350689190821773
					},
					{
						"c0": 230,
						"amp": 230.0563130690558,
						"vv": 0.4731718275875696
					}
				],
				[
					{
						"c0": 120,
						"amp": 450.1327982841079,
						"vv": 1.0093333068640007
					},
					{
						"c0": 120,
						"amp": 417.16827455335664,
						"vv": 0.7932914714524104
					},
					{
						"c0": 200,
						"amp": 196.5782442954491,
						"vv": 0.3016483595347729
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
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			]
		},
		"flat_sprite_url": "",
		"flat_sprite_ext": "png",
		"custom_image_url": "",
		"custom_image_ext": "png",
		"fillFrom": false,
		"uniform_delay": false,
		"bgRefillColor": "#000000",
		"sprites_seed": {
			"common_ff": {
				"f0": 0,
				"vv": 0
			},
			"rr": {
				"ra": 0,
				"vv": 1.5,
				"f0": 0,
				"r0": 0
			},
			"cc": {
				"f0": 0,
				"vv": 0
			},
			"ff": {
				"f0": 0,
				"vv": -3.5
			},
			"ss": {
				"sa": 20,
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
						"base": -0.4,
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
					"ra": 0,
					"vv": -0.510627798756087,
					"f0": 0,
					"r0": 0
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": 0.8873728140877013
				},
				"ss": {
					"sa": 27.966226441778495,
					"vv": 0.010432909380556448,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 0,
					"vv": 0.679709616287479,
					"f0": 0,
					"r0": 0
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": 0.7182986163168306
				},
				"ss": {
					"sa": 25.98867724521402,
					"vv": 0.01355607807812078,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 0,
					"vv": -0.16266944352072005,
					"f0": 0,
					"r0": 0
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": -1.067611957165527
				},
				"ss": {
					"sa": 25.552934835254824,
					"vv": 0.021456536829654684,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 0,
					"vv": 0.1338037501012586,
					"f0": 0,
					"r0": 0
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": -0.9779876849423329
				},
				"ss": {
					"sa": 27.451756093833882,
					"vv": 0.017713716159049122,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 0,
					"vv": 0.27369717893317835,
					"f0": 0,
					"r0": 0
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": 0.39950536179527235
				},
				"ss": {
					"sa": 27.13192643763373,
					"vv": 0.022294780036571885,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 0,
					"vv": 0.6452441621767318,
					"f0": 0,
					"r0": 0
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": 0.33954076377075704
				},
				"ss": {
					"sa": 24.960797522040234,
					"vv": 0.01754144523786086,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 0,
					"vv": -0.17406348282100748,
					"f0": 0,
					"r0": 0
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": 0.6567447078015168
				},
				"ss": {
					"sa": 24.800401700011538,
					"vv": 0.011860751373259652,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 0,
					"vv": 0.6080527702195234,
					"f0": 0,
					"r0": 0
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": -0.9910624855608378
				},
				"ss": {
					"sa": 25.18847340576456,
					"vv": 0.011833162705597675,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 0,
					"vv": 0.6729800683676649,
					"f0": 0,
					"r0": 0
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": 0.30951942182133607
				},
				"ss": {
					"sa": 25.504472076576793,
					"vv": 0.01078459050077235,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 0,
					"vv": -0.14222393722241988,
					"f0": 0,
					"r0": 0
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": 0.40178404019963243
				},
				"ss": {
					"sa": 21.483230949196624,
					"vv": 0.009555208938361912,
					"f0": 0,
					"s0": 1
				}
			},
			{
				"rr": {
					"ra": 0,
					"vv": 0.5831942249749338,
					"f0": 0,
					"r0": 0
				},
				"cc": {
					"f0": 0,
					"vv": 0
				},
				"ff": {
					"f0": 0,
					"vv": -1.3515561827127067
				},
				"ss": {
					"sa": 27.805706133856596,
					"vv": 0.011435563179247665,
					"f0": 0,
					"s0": 1
				}
			}
		]
	},
	"itemsMax": 7,
	"backwardInTime": true,
	"runInfinitely": false,
	"playPeriod": 5000,
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
	"spaceTransf": true,
	"csize": "",
	"cwidth": 1100,
	"cheight": 400,
	"vwidth": 1100,
	"vheight": 400,
	"virt": "v",
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
	"ticksPerMsec": 0.08
};

btb.paste_non_arrays( conf, graph.capturer.conf );
}) ();

