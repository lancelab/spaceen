
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
		suspendUserAutomoveAtActions	: true,
		suspendUserAutomoveDuration		: 2000
	};


	usprite.init = function ()
	{
		// e3DSprite.clipify();
		var content = document.getElementById( 'content' );
		if( content ) content.style.display = 'block';
	};


	usprite.restrictMove = function ( newPoint )
	{
		//:	Gets current pos
		var origin	= lensT.getOrigin();
		var yyC		= origin.yy;
		var xxC		= origin.xx;
		var zzC		= origin.zz;

		var horizonY		= conf.spriteDistanceFromOrigin[ 0 ];
		var halfHorizonX	= conf.vwidth * 0.5;
		var halfHorizonZ	= conf.vheight * 0.5;
		var alphaX			= halfHorizonX / horizonY;
		var alphaZ			= halfHorizonZ / horizonY;
		var boundaryX		= alphaX * Math.abs( lensT.originY  );
		var boundaryZ		= alphaZ * Math.abs( lensT.originY  );

		if( newPoint.xx < -boundaryX )
		{
			newPoint.xx = -boundaryX;
		}else if( newPoint.xx > boundaryX )
		{
			newPoint.xx = boundaryX;
		}

		if( newPoint.zz < -boundaryZ )
		{
			newPoint.zz = -boundaryZ;
		}else if( newPoint.zz > boundaryZ * 0.75 )
		{
			newPoint.zz = boundaryZ * 0.75;
		}

		// c ccc( 'ax,az, x,y,z=' + alphaX + ', ' + alphaZ + ', ' +  newX + ', ' +  newY + ', ' +  newZ +
		//		' boundaryX=' + boundaryX + ', boundaryZ=' + boundaryZ );
	};


	/// For flat draw on master_context
	usprite.startRunningTime = (new Date()).getTime();
	usprite.run = function ()
	{

		//.	Skips userAutomove if time not yet "arrived".
		if( (new Date()).getTime() < usprite.startRunningTime ) return;

		//:	Gets current pos
		var origin	= lensT.getOrigin();
		var yyC		= origin.yy;
		var xxC		= origin.xx;
		var zzC		= origin.zz;


		//:	Woudl move pos
		var horizonY		= conf.spriteDistanceFromOrigin[ 0 ];
		var halfHorizonX	= conf.vwidth * 0.5;
		var alpha2			= halfHorizonX / horizonY * 0.6;

		var phase = ( mstones.effTicks / conf.ticksPeriod ) % 4;
		var phasePI = 2 * 3.14 * phase;

		var moveCenterY = -9;
		var moveAmpY = 8;
		var yyPhase = moveAmpY * Math.cos( phasePI );

		var yy = moveCenterY + yyPhase;
		var move = yy;
		var xxAmpl = Math.abs( alpha2 * move * 2 );  
		var xx = xxAmpl * ( Math.sin( phasePI ) );

		//: Mixes move with current:
		yy = yyC * 0.99 + yy * 0.01;
		xx = xxC * 0.99 + xx * 0.01;

		var control =  { control : { setAbsPosY : true, setAbsPosX : true, posY : yy, posX : xx } };
		// c ccc( 'tick=' + mstones.effTicks + ' ph= ' + phase + ' move=' + move + ' amp=' + xxAmpl + ' xx=' + xx + ' yy=' + yy );

		lensT.reset( control );

	};


	btb.paste_non_arrays( uspriteConf, btb.paste_non_arrays( defaultSprite, uspriteConf ) );


}) ();


