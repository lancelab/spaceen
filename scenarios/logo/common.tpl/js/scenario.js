
//	//\\//	Sets tasks for "window.onload" equivalent for scenario



( function () {

		var btb			= window.btb$		= window.btb$			|| {};		
		var	graph		= btb.graph			= btb.graph				|| {};
		var	scenario	= graph.scenario	= graph.scenario		|| {};

		scenario.run = function ()
		{
			graph.beforeit_init_afterit();
		};


}) ();
