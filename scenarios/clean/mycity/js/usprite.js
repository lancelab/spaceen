
//	//\\//	Sets external parameters for "exterier" of 3D Sprite



( function () {

	var btb			= window.btb$				= window.btb$				|| {};
	var graph		= btb.graph					= btb.graph					|| {};
	var conf		= graph.conf				= graph.conf				|| {};
	var mstones		= graph.mstones				= graph.mstones				|| {};
	var usprite		= graph.usprite				= graph.usprite				|| {};
	var uspriteConf	= graph.conf.usprite		= graph.conf.usprite		|| {};
	var lensT		= graph.lensTransformation	= graph.lensTransformation	|| {};


	/// Inserts dconf into flyer if dconf already exists
	var defaultSprite = 
	{			
	};


	usprite.init = function ()
	{
		// e3DSprite.clipify();
		var content = document.getElementById( 'content' );
		if( content ) content.style.display = 'block';
	};



	btb.paste_non_arrays( uspriteConf, btb.paste_non_arrays( defaultSprite, uspriteConf ) );


}) ();


