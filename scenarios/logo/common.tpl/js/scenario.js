
//	//\\//	Sets tasks for "window.onload" equivalent for scenario



( function () {


	var scenario;	// Plugin itself
	var graph;


	///	Attaches plugin
	( function () {
			var btb		= window.btb$		= window.btb$			|| {};		
			graph		= btb.graph			= btb.graph				|| {};
			scenario	= graph.scenario	= graph.scenario		|| {};
	}) ();


		scenario.run = function () {

			graph.beforeit_init_afterit();

		};


}) ();
