//	//\\//	Diary. Optional file.

( function () {

	var btb		= window.btb$	= window.btb$	|| {};		
	var graph	= btb.graph		= btb.graph		|| {};

	graph.diary =

		"0.0.80			Intermediate version. Some functionality of previous versions is lost;" +
		"               conf3D.bigScreenWidthThreshold and ... Height;" +
		"				Two Nebulae subapps ''cube'' and ''prism'';" +

		"0.0.79			Nebulae subapp. ''cube'' version hit performance issues ... and developmentability ''stall'';" +
		"				...scenarios/nebulae/site/index.php?s_dev&boxWrap&imagesToLoad.1=0&conf3D.boxWrap.doPrism=0&conf3D.boxWrap.stepN=80&conf3D.boxMaxZ=500" +

		"0.0.79			Feathers subapp. Aug 30; scenario improved: less jerks, animation is non-random;" +
		"                Drawbacks of this animation are:" +
		"                does not convince;" +
		"                non-sleek;" +
		"                colors non-in-harmony with final emblem;" +
		"                final transition to emblem is dirty;" +
		"                net is dirty;" +
		"                minor jerk in the middle in FF;" +
		"                starts too sharp" +

		"0.0.78			single config. array done for all groups of images to be loaded by groupsLoader;" +
		"               groupsLoader catches ''all groups loaded'';" +
		"0.0.77			has vertical strip flip feature for nebula subapp; possibly will disappear in next version;" +
		"               nebulae-box is about deliverable;" +
		"0.0.76			nebulae: scene-cube is drawn and images are painted on side walls;" +

		"0.0.75			all forks are merged;" +
		"               js-css-landing-scenario is changed: ''landing_warnings.js'' and  optional loading of ''prehiding.css'' are removed;" +
		"               js/canvas detector is common now in html-header;" +
		"               problems: content lost in subapp fasing-tree: possibly *.css is damaged; too grey colors in words subapp" +

		"0.0.73spFork3	fragment: ''var convert_pre2html = false;...'' removed;" +
		"               capturer.php ... saves conf and base64-canvas;" +
		"               format added: ...&deb-cdCD...-aarrggbbzzzzz-15; able to detect device and save info to disk" +

						"0.0.73spFork1	moved to timeFromTicks-modes; SenseP: changed bgImg; added functional-sprites;" +
						"0.0.73  sometimes began use file-name index.nojs.htm to denote pages designed for JavaScript-less browsers ;" +
						"0.0.72  July 31, 2013; message ''loading ... '' can be kept till last image load;" +
						"        lensT.init is separate from sprites init;" +
						"0.0.71  Should be kept because of good Nebulae stub;" +
						"0.0.69  July 25, 2013; possibly forked from captures by new parameter: conf.cflyer.fillSprites;" +
						"        Inserts 3D scene between flat sprite layers; Image loader cleaned;" +
						"        Removed subapps: biletu, shapes; album: room;" +

						"0.0.67  July 19; gamemazing scaffold;" +
						"0.0.64  July 16; better JavaScriptLess mode; possibly no fork from core;" +
						"0.0.63  July 11; possible fork from core;" +
						"0.0.62  July 11; integrity is probably alive yet; need to fork SenseProjects bs its features are too different;" +
						"0.0.61  July 10; edited; working on SenseProjects; memoryFrames pasted in arbitrary gap between items;" +
						"0.0.60  July 9; refactored; working on gamemazing;" +

						"0.0.59  July 5; room album began;" +

						"0.0.58  memLoss formerTime bug fixed; mstones events are accessible now; minifier scans for projects - no manual settings;" +
						"        deployer strips dependence on *.php: by curl call;" +
						"0.0.57  timeScale; dontDrawAfterPeriod fixed frame-memory-loss; custom image can stay after pause;" +
						"0.0.56  June 18. full config capturer added; config is a tree; culmination image drawn right on master;" +
						"0.0.53  flying-shadows: captured-parameters option added, intro-scenario added;" +
						"        flyer===flying-shadows now; scenario/albums added;" +
						"        GA added;" +

						"0.0.51  June 8, 2013; prepared for GitHub," +
						"0.0.50  June 8, 2013; flying-shadows: adding effect around turning point," +
						"0.0.49  June 6, 2013; flying-shadows: circles," +
						"0.0.48  flying-shadows: twin buffers," +
						"0.0.46  flying-shadows: does not rely on native space transforms," +
						"        but still choppy," +

						"0.0.45  flying-shadows: virt=v resize shift bug fixed. logo-words is showable." +
						"0.0.44  flying-shadows: mode virt=v ratio=k resizes partially well" +
						"                        steps.dev.htm minifier and jq/app splitter done." +
						"        JS-minifier extended to all subprojects. PHP-templating is better." +
						"        began restoration non-feather projects. All but logo-whirlio are about working." +
						"        logo-words is about showable." +

						"0.0.43  flying-shadows: exponential memory decay based on time, not on ticks." +
						"                        less brightness jerks." +
						"0.0.42  flying-shadows: gradient fixed. alternative fill added." +
						"                        fading title added." +
						"0.0.41  working on turn-point-pause and way back" +
						"0.0.40  wrapped into fluid-css content page," +
						"0.0.38  resize scenarios improved," +
						"0.0.37  flying-shadows: virtual-master-offscreen-canvas," +
						"0.0.36  minifier added," +
						"        appriximately last version preserving non-feather projects." +
						"0.0.35  flying-shadows: browser rescaling added." +
						"        double drawImage used to preserve memory after resize - deteriorates image," +
						"        offline-master-image is desired" +
						"0.0.34  flying-shadows: master_scale added." +
						"0.0.33  flying-shadows: \"finer tuned colors\"\n" +
						"        finer feather.\n" +
						"0.0.31  flying-shadows: memoryLength and memorizeRange.\n" +
						"        ready for alpha.\n" +

						"0.0.30  flying-shadows: twins: path and grad modes added.\n" +
						"0.0.29  whirlio logo updated.\n" +
						"0.0.28  general cleanup.\n" +
						"0.0.27  requirejs is stripped. Canvas div has \"fixed\" positioning by default again.\n" +
						"        PHP used to put common script in templates *.tpl.\n" +
						"0.0.26  Five scenarios in one step. Had to add ''define'' in jquery.js file.\n" +
						"        Will strip requirejs from project as non-beneficial.\n" +
						"        Random block on IE9: missing scenario.run function.\n" +
						"0.0.25  Changed ''fixed'' to ''absolute'' to position canvas. Because of mobile support problems.\n" +
						"        Added ''screenScaleThreshold'' to protect from user's Ctrl+ zoom.\n" +
						"        Returned vertical navigation to arrrow-up/down to not confuse a user.\n" +

						"0.0.24  Better support for JSless pages.\n" +
						"0.0.21  Between ver. 21 and 24, see steps_index.htm.\n" +
						"0.0.20. May 6.    Whirlio logo title image added.\n" +
						"0.0.19. May 1.    Ticks are synced with time. All variants including bubbles work.\n" +
						"0.0.18. April 30. Dynamic gradient-enabled-non-image-sprites added. \n" +
						"0.0.17. April 28. btb$ is global. Sprites can be scaled to screen. Single config. Posted. \n" +
						"                  Posted. Works in IE9 again.\n" +
						"0.0.12. grainsNumber is variable including 0.\n" +
						"0.0.8.mozilla requestAnimationFrame\n" +
						"0.0.7 setTimeout animation"	
	
}) ();

