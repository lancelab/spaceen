
//	//\\//	Sets external parameters for "exterier" of 3D Sprite



( function () {

	var btb			= window.btb$				= window.btb$				|| {};
	var graph		= btb.graph					= btb.graph					|| {};
	var conf		= graph.conf				= graph.conf				|| {};
	var e3DSprite	= graph.conf.e3DSprite		= graph.conf.e3DSprite		|| {};
	var lensT		= graph.lensTransformation	= graph.lensTransformation	|| {};


	/// Inserts dconf into flyer if dconf already exists
	var defaultSprite =
	{			
	};


	e3DSprite.init = function ()
	{
			// e3DSprite.clipify();
	};


	/// For flat draw on master_context
	e3DSprite.clipify = function ()
	{
			// var sprites	= graph.imagesFor3D.sprites;
			// if( !sprites.length ) return;
			var distance	= conf.spriteDistanceFromOrigin[ 0 ];
			var width		= conf.vwidth;
			var height		= conf.vheight;
			var scales2		= conf.spriteDrawScale[ 0 ] * lensT.scale / distance * 0.5;
			e3DSprite.clip	= { width2 : width * scales2, height2 : height * scales2 };
			// c ccc( e3DSprite.clip );
	};


	btb.paste_non_arrays( e3DSprite, btb.paste_non_arrays( defaultSprite, e3DSprite ) );


}) ();


