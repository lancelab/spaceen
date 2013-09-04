
// //\\//	Sets default configuration data.
//			Overridable by btb.graph.init and URL-query.



( function () {


	var btb				= window.btb$				= window.btb$				|| {};		
	var graph			= btb.graph					= btb.graph					|| {};
	var conf			= graph.conf				= graph.conf				|| {};
	var	conf3D			= conf.conf3D				= conf.conf3D				|| {};
	var	lensT 			= graph.lensTransformation	= graph.lensTransformation	|| {};
	var draw3D			= graph.draw3D				= graph.draw3D				|| {};
	var	runFlyer3D		= graph.runFlyer3D			= graph.runFlyer3D			|| {};	// TODM rename: run3DScene
	var	util_z_axial	= graph.util_z_axial		= graph.util_z_axial		|| {};	// TODM rename: run3DScene
	var debby			= btb.debby					= btb.debby || {};



	util_z_axial.squarePrism = function ( ticksPhase )
	{
			var conf3D		= conf.conf3D;
			var PI2			= 2 * Math.PI;
			var angle		= PI2 * ticksPhase;
			if( conf3D.backgroundScenario.speed )
			{
				angle		*= conf3D.backgroundScenario.speed;
			}
			var cs			= Math.cos( angle );
			var sn			= Math.sin( angle );
			var boxWrap		= conf3D.boxWrap.box;

			var rearVIx = 0;
			var rotatedVert = [];
			for( var ib = 0; ib < 4; ib++ )
			{
				var bv = boxWrap [ ib ];
				var vx = cs * bv[ 0 ] - sn * bv [ 1 ];
				var vy = sn * bv[ 0 ] + cs * bv [ 1 ];
				rotatedVert[ ib ] = [ vx, vy ];
				if( rotatedVert[ rearVIx ][ 1 ] < vy ) rearVIx = ib;
			}
			var rearRV = rotatedVert[ rearVIx ];
			var scrV = lensT.doproject( rearRV[ 0 ], rearRV[ 1 ], conf3D.boxMaxZ );
			//var scrV = lensT.doproject( rearRV[ 0 ], rearRV[ 1 ], 0);
			// c ccc( "Rear found = " + rearVIx + '; ' + rotatedVert[ 0 ] + ', ' + rotatedVert[ 1 ] );
			// c ccc( "On scr=", scrV );				

			var leftSIx = ( rearVIx + 3 ) % 4;
			var leftRV = rotatedVert[ leftSIx ];
			var leftSatellite = lensT.doproject( leftRV[ 0 ], leftRV[ 1 ], conf3D.boxMaxZ );
			//var leftSatellite = lensT.doproject( leftRV[ 0 ], leftRV[ 1 ], 0 );
			//var leftSecondSIx =	( 0 <= leftSatellite[ 0 ] && leftRV[ 1 ] + lensT.originY > 0 ) ? ( rearVIx + 2 ) % 4 : null;
			var leftSecondSIx = ( rearVIx + 2 ) % 4;
			//if( leftSecondSIx !== null && rotatedVert[ leftSecondSIx ][0] > leftRV[0] ) leftSecondSIx = null;


			var rightSIx = ( rearVIx + 1 ) % 4;
			var rightRV = rotatedVert[ rightSIx ];
			var rightSatellite = lensT.doproject( rightRV[ 0 ], rightRV[ 1 ], conf3D.boxMaxZ );
			//var rightSatellite = lensT.doproject( rightRV[ 0 ], rightRV[ 1 ], 0 );
			//var rightSecondSIx = ( rightSatellite[ 0 ] <= graph.scrWidth && rightRV[ 1 ] + lensT.originY > 0 ) ? ( rearVIx + 2 ) % 4 : null;
			var rightSecondSIx = ( rearVIx + 2 ) % 4;
			//if( rightSecondSIx !== null && rotatedVert[ rightSecondSIx ][0] < rightRV[0] ) rightSecondSIx = null;



			// c ccc( "Left Sat = " + leftSIx + ': ', leftSatellite );				
			// c ccc( "Right Sat = " + rightSIx + ': ', rightSatellite );				


			edgify( 1, rearRV, rearVIx, cs, sn );
			edgify( -1, rearRV, rearVIx, cs, sn );

			if( rightRV[ 1 ] > leftRV[ 1 ] )
			{
				//if( rightSecondSIx !== null ) edgify( -1, rightRV, rightSIx, cs, sn );
				//if( leftSecondSIx !== null ) edgify( 1, leftRV, leftSIx, cs, sn );
				edgify( -1, rightRV, rightSIx, cs, sn );
				edgify( 1, leftRV, leftSIx, cs, sn );
			}else{
				//if( leftSecondSIx !== null ) edgify( 1, leftRV, leftSIx, cs, sn );
				//if( rightSecondSIx !== null ) edgify( -1, rightRV, rightSIx, cs, sn );
				edgify( 1, leftRV, leftSIx, cs, sn );
				edgify( -1, rightRV, rightSIx, cs, sn );
			}

	};


	var edgify = function ( direction, rotatedVert, ix, cs, sn )
	{
		var boxWrap		= conf.conf3D.boxWrap;
		var doPrism		= boxWrap.doPrism;
		var edgeSize	= boxWrap.edgeSize;
		var stepN		= boxWrap.stepN;
		var step		= edgeSize / stepN;
		var Vx			= rotatedVert[ 0 ];
		var Vy			= rotatedVert[ 1 ];

		switch (ix)
		{
			case 0:
				if( direction > 0 ) colorV = '#00FFFF';
				if( direction < 0 ) colorV = '#FF0000';
				break;
			case 1:
				if( direction > 0 ) colorV = '#FF0000';
				if( direction < 0 ) colorV = '#00FF00';
				break;
			case 2:
				if( direction > 0 ) colorV = '#00FF00';
				if( direction < 0 ) colorV = '#0000FF';
				break;
			case 3:
				if( direction > 0 ) colorV = '#0000FF';
				if( direction < 0 ) colorV = '#00FFFF';
				break;
		}

		if( direction > 0 )
		{
			var edge	= boxWrap.edge[ ix ];
			var edgeX	= cs * edge[ 0 ] - sn * edge[ 1 ];
			var edgeY	= sn * edge[ 0 ] + cs * edge[ 1 ];
		}else{
			var edge	= boxWrap.edge[ ( ix + 1 ) % 4 ];
			var edgeX	= -cs * edge[ 0 ] + sn * edge[ 1 ];
			var edgeY	= -sn * edge[ 0 ] - cs * edge[ 1 ];
		}

		var img			= graph.bgImg;
		var imgW		= img.width;
		var imgStep		= imgW / 4 / stepN;

		var stepN4		= stepN * 4;
		var pastTOx		= null;

		var mxImgStep = Math.max( imgStep, 1 );

		for( var eix = 0; eix <=stepN; eix++ )
		{

			var imgPosIx	= ( stepN4 - eix * direction + ix * stepN ) % stepN4;
			var imgPos		= imgPosIx * imgStep;
			var pth			= step * eix;
			var eX			= pth * edgeX + Vx;
			var eY			= pth * edgeY + Vy;

			var tPoint		= lensT.doproject( eX, eY, conf3D.boxMaxZ );
			var tPointLow	= lensT.doproject( eX, eY, -conf3D.boxMaxZ );
			var offsetPhase	= imgPosIx / stepN4;

			var strips		= runFlyer3D.cyclifyImage( graph.bgImg, offsetPhase, imgStep );

			if( eix === 0 )
			{
				var pastTPoint		= tPoint;
				var pastTPointLow	= tPointLow;
				var pastImgPosIx	= imgPosIx;
				var pastImgPos		= imgPos;
				var pastOffsetPhase	= offsetPhase;
				var pastStrips		= strips;
				var pastEY			= eY;
				continue;
			}

			var targetW		= tPoint[ 0 ] - pastTPoint[ 0 ];
			var flip		= ( targetW > 0 && direction > 0 ) || ( targetW < 0 && direction < 0 );

			if( targetW > 0 )
			{
				var tOffset		= pastTPoint[ 0 ];
				var tYOffset	= pastTPoint[ 1 ];
				var tHeight		= pastTPointLow[ 1 ] - pastTPoint[ 1 ];
				var curStrips	= direction > 0 ? strips : pastStrips;
			}else{
				var targetW		= -targetW;
				var tOffset		= tPoint[ 0 ];
				var tYOffset	= tPoint[ 1 ];
				var tHeight		= tPointLow[ 1 ] - tPoint[ 1 ];
				var curStrips	= direction > 0 ? strips : pastStrips;
			}
			var imgStart		= curStrips[ 0 ];


			var targetW = Math.max( targetW, 1 );
			// c ccc( ix + ', ' + eix + ' direction=' + direction + " pastTPoint=" + pastTPoint[ 0 ] + " tPoint= " + tPoint[ 0 ] + " imgStart=" + imgStart + ' tO=' + tOffset + ' tW=' + targetW );



			//. Tests out-of-scope condition
			if( tOffset + targetW < 0 || tOffset > graph.scrWidth ||
				( eY + lensT.originY < 0 && pastEY + lensT.originY < 0 )
			) break;



			if( curStrips.length > 1 )
			{
				//:	legend: [ sourcePos1, sourceW1, sourceW2 ]
				//	first/start are in order on appearence on target
				var firstTW		= curStrips[ 1 ] * targetW / imgStep;
				var lastTW		= targetW - firstTW;
				var firstTO		= tOffset;
				var lastTO		= tOffset + firstTW;

				if( flip )
				{
					var firstTO	= tOffset + lastTW;
					var lastTO	= tOffset;
				}

				//:	Protects agains gaps-on-targed by overlapping
				firstTW			+= 1;
				lastTW			+= 1;

				var firstImgW	= Math.max( curStrips[1], 1 );
				var lastImgW	= Math.max( curStrips[2], 1 );

				//: patch prism: fast:
				if( doPrism )
				{
					tYOffset = 0;
					tHeight = graph.scrHeight;
				}

				runFlyer3D.drawImgInContext( img, imgStart,	0,	firstImgW,	img.height, firstTO,	tYOffset, firstTW, tHeight, flip );
				runFlyer3D.drawImgInContext( img, 0,		0,	lastImgW,	img.height, lastTO,		tYOffset, lastTW,  tHeight, flip );

			}else{



				if( !doPrism && tYOffset < 0 )
				{
					if( tHeight >= 1 )
					{
						var imgClipYOffset = img.height * Math.abs( tYOffset ) / tHeight;
						// fast? var imgClipYOffset = img.height * Math.abs( tYOffset ) / graph.scrHeight;
						tHeight += tYOffset;
						if( tHeight >= 1 )
						{
							tYOffset = 0;
							var imgClipYSize = img.height - imgClipYOffset;
							//var imgClipYSize = img.height;
							runFlyer3D.drawImgInContext( img, imgStart,	imgClipYOffset,	mxImgStep, imgClipYSize, tOffset, tYOffset, targetW + 1, tHeight + 1, flip );
						}
					}

				}else{

					//: patch prism: fast:
					if( doPrism )
					{
						tYOffset = 0;
						tHeight = graph.scrHeight;
					}

					runFlyer3D.drawImgInContext( img, imgStart,	0,	mxImgStep, img.height, tOffset, tYOffset, targetW + 1, tHeight, flip );
	
				}


			}


			if( debby.on ) draw3D.draw3DBall( [ eX, eY, -222 ], 5, colorV );

			var pastTPoint		= tPoint;
			var pastTPointLow	= tPointLow;
			var pastImgPosIx	= imgPosIx;
			var pastImgPos		= imgPos;
			var pastOffsetPhase	= offsetPhase;
			var pastStrips		= strips;
			var pastEY			= eY;
		}
		if( debby.on ) draw3D.draw3DBall( [ Vx, Vy, -222 ], 5, colorV );

	};


}) ();


