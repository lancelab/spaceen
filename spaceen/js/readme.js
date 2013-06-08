

( function () {

	var btb		= window.btb$	= window.btb$	|| {};		
	var graph	= btb.graph		= btb.graph		|| {};



	graph.readme =
	{

		title		:	"GraphSpin",
		description	:	"Tiny canvas framework with dumb animation demo.",
		copyright	:	"Copyright (C) 2013 Konstantin Kirillov",
		license		:	"MIT except folder \"scenarios\" which have own licenses",

		version		:	"Version 0.0.51.",
		date		:	"June 8, 2013.",
		diary		:
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
	};
	
}) ();

