
//	//\\//			Plugin. Convenience functions for 3D-draw on canvas.


( function ( ) {


		var btb			= window.btb$	= window.btb$	|| {};		
		var graph		= btb.graph		= btb.graph		|| {};
		var parent		= btb.graph;
		var lens		= graph.lensTransformation = graph.lensTransformation || {};
		var draw3D		= graph.draw3D	= graph.draw3D	|| {};
		var conf		= graph.conf	= graph.conf	|| {};
		var conf3D		= conf.conf3D	= conf.conf3D	|| {};
		var virt		= graph.virt	= graph.virt	|| {};
		var e3DSprite	= graph.conf.e3DSprite	= graph.conf.e3DSprite	|| {};


		//Settings:
		var ctx;
		var scrWidth;
		var scrHeight;

		var fromObserverYMin	= null;
		var fromObserverYMax	= null;




	
		draw3D.supplyContextAndConf = function()
		{
			ctx = virt.ctx;
			fromObserverYMin	= conf3D.fromObserverYMin;
			fromObserverYMax	= conf3D.fromObserverYMax;
		};





		/// Projects 3D line to canvas
		var draw3DLine = draw3D.draw3DLine = function( point3DA, point3DB, color)
		{
			var pointA = lens.doprojectPoint( point3DA );
			var pointB = lens.doprojectPoint( point3DB );
			//c onsole.log(pointA,pointB,color);	
			//	TODm ctx.save();
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.moveTo( pointA[0], pointA[1] );
			ctx.lineTo( pointB[0], pointB[1] )
			ctx.stroke();
		};




		///	Draws 3D ball on canvas
		var draw3DBall = draw3D.draw3DBall = function( center, radius, colorDark )
		{
			var touchYPoint = center[1] - radius;
			var touchSize = lens.doprojectSize( radius, touchYPoint );
			if( touchSize < 0 ) return; //behind observer
			var center2D = lens.doprojectPoint( center );
			var radius2D = lens.doprojectSize( radius, center[1] );
			if( radius2D === 0 ) return;
			ctx.fillStyle = colorDark;
			ctx.beginPath();
			// c onsole.log(center2D,radius2D);
			ctx.arc( center2D[0], center2D[1], radius2D, 0, Math.PI*2, true);
			ctx.fill();
		};



		///	Draws 3D ball with gradients
		draw3D.draw3DBallGradient = function( center, radius, colorDark, colorLight )
		{

			var	scrWidth	= graph.scrWidth;
			var	scrHeight	= graph.scrHeight;

			var touchYPoint = center[1] - radius;
			var touchSize = lens.doprojectSize( radius, touchYPoint );
			if( touchSize < 0 ) return; //behind observer
			var center2D = lens.doprojectPoint( center );
			var radius2D = lens.doprojectSize( radius, center[1] );
			if( radius2D === 0) return;

			/// Leaves of outside of screen
			if( scrWidth )
			{
				var center2DX = center2D[0];
				var center2DY = center2D[1];
				if( center2DX + radius2D < 1 || center2DX - radius2D > scrWidth ) return;
				if( center2DY + radius2D < 1 || center2DY - radius2D > scrHeight ) return;
			}

			//good debug
			//radius2D=50;

			if( colorLight )
			{

				var blick_radius	= 1;
				var blickShift		= [ -0.3 * radius2D, -0.3 * radius2D ];
				var blickPoint		= parent.vector23D.combine( 1, blickShift, 1, center2D );
				//c onsole.log('blickPoint',blickPoint,center2D,radius2D);
				//c onsole.log('center',center,radius, colorDark, colorLight);
				var radgrad			= ctx.createRadialGradient(
											blickPoint[0],
											blickPoint[1],
											blick_radius,
											center2D[0],
											center2D[1],
											radius2D
									);  
				//var radgrad		= ctx.createRadialGradient(center2D[0]-0.3*radius2D,center2D[1]-0.3*radius2D,blick_radius,center2D[0],center2D[1],radius2D);  

				radgrad.addColorStop( 0, '#FFFFFF' ); //colorLight); //'#A7D30C');  

				//TODO work out:
				//radgrad.addColorStop(0.9, colorDark);  
				radgrad.addColorStop( 0.7, colorDark );  

				//TODO work out:
				//radgrad.addColorStop(1, colorDark); //'rgba(1,159,98,0)');  

				radgrad.addColorStop( 1, 'rgba(0,0,0,0)' );  

				//radgrad.addColorStop(1, 'rgba(1,159,98,0)');  

				//TODO: remove this: 1.1 for "safety":
				var area = touchSize * 1.1;
				//c onsole.log('center[1], radius, area',center[1], radius, area);
				ctx.fillStyle = radgrad;  
				var mLeft	= Math.max( 0, center2D[0] - area );
				var mTop	= Math.max( 0, center2D[1] - area);
				var mSize	= 2 * area;
				ctx.fillRect( mLeft, mTop, 	mSize, mSize );

			}else{

				ctx.fillStyle = colorDark;
				ctx.beginPath();
				//c onsole.log(center2D,radius2D);
				ctx.arc( center2D[0], center2D[1], radius2D, 0, Math.PI * 2, true );
				ctx.fill();
			}
		};






		///	Draws:		3D-scaled sprite
		//	Input:		array: [ x, y ]. Center of sprite in 3D space in respect to room-center.
		draw3D.drawImageIn3D = function( sprite3DCenter, sprite, internalScale )
		{

			//:	d ebug
			//	var fromObserver = sprite3DCenter[1] + lens.originY;
			//	c ccc(	'fromObserver sprite3DCenter[1]:  ' + fromObserver + ',  ' + sprite3DCenter[1] + ', originY=' + lens.originY +
			//			', fromObserverYMin=' + fromObserverYMin + ', fromObserverYMax=' + fromObserverYMax	);

			//:	Restricts drawing by distance from observer
			if( fromObserverYMin || fromObserverYMin === 0 )
			{
				var fromObserver = sprite3DCenter[1] + lens.originY;
				// if( fromObserver < fromObserverYMin ) c ccc(' behind ' ); //return;
				if( fromObserver < fromObserverYMin ) return;
			}
			if( fromObserverYMax || fromObserverYMax === 0 )
			{
				var fromObserver = sprite3DCenter[1] + lens.originY;
				// if( fromObserver > fromObserverYMax ) c ccc(' beyond ' ); //return;
				if( fromObserver > fromObserverYMax ) return;
			}

			var drawA			= virt.drawArea;
			var canvasWidth		= drawA.sizeX;
			var canvasHeight	= drawA.sizeY;
			var dscale			= drawA.dscale;

			var source_width	= sprite.width;
			var source_height	= sprite.height;

			internalScale 		= internalScale || 1;
			var finalScale		= dscale * internalScale;

			var finalWidth	= finalScale * source_width;
			var finalHeight	= finalScale * source_height;


			// //\\	Established flat screen dimensions, guards out-of-screen images /////////////////


			// c ccc( ' Dr image 0: fromObserver < fromObserverYMin='+ fromObserver + ' < ' + fromObserverYMin  );
			//:	Half-dimensions of sprite on canvas.
			var physW2 = Math.floor( lens.doprojectSize( finalWidth, sprite3DCenter[1] ) * 0.5 );
			var physH2 = Math.floor( lens.doprojectSize( finalHeight, sprite3DCenter[1] ) * 0.5 );

			// c ccc(	' physW2=' + physW2 + ', finalWidth=' + finalWidth +
			//		' sprite3DCenter[1]=' +  sprite3DCenter[1] + ' internalScale=' + internalScale + 
			//		' lensT.scale' + lens.scale );


			//.	Skips drawing sprite if it is behind of observer
			//	if( physH2 <= 0 || physW2 <= 0 ) c ccc(' physH2 ' + physH2 + ' <= 0 || physW2 ' + physW2 + ' <= 0 ' );
			if( physH2 <= 0 || physW2 <= 0 ) return;

			//:	Dimensions of sprite on monitor screen.
			var physW	= physW2 + physW2;
			var physH	= physH2 + physH2;

			//.	Center of sprite on current canvas:
			var wc			= lens.doprojectPoint( sprite3DCenter, virt.drawArea.dscale );
			var physCenterX = wc[0];
			var physCenterY = wc[1];
			var physCornerX = physCenterX - physW2;
			var physCornerY = physCenterY - physH2;

			// c ccc(	'physCornerX=' + physCornerX + ',  physW=' +  physW + ',  canvasWidth=' + canvasWidth + ',  physCornerY=' + 
			//		physCornerY + ',  physH=' + physH + ',  canvasHeight=' + canvasHeight
			//);


			//:	Dont waste time for out-of-boundary images 	
			//	if( physCornerX + physW	< 0 || physCornerX > canvasWidth )
			//	{
			//	c ccc(	'physCornerX ' + physCornerX + ' + physW ' + physW + ' < 0 || physCornerX ' + physCornerX +
			//			' > canvasWidth ' + canvasWidth
			//	);
			//}
			if( physCornerX + physW	< 0 || physCornerX > canvasWidth ) return;

			if( physCornerY + physH	< 0 || physCornerY > canvasHeight ) return;

			//	TODM was bug?
			// if( physCornerX + canvasWidth	< 1 || physCornerX > canvasWidth ) return;
			// if( physCornerY + canvasHeight	< 1 || physCornerY > canvasHeight ) return;


			if( !conf3D.boundaryProtectionDisabled )
			{
				if( physW > canvasWidth * 2	|| physH > canvasHeight * 2 ) return;
			}
			// \\//	Established flat screen dimensions, quards out-of-screen images /////////////////


			// c ccc(	' Drawing image 3: physW > canvasWidth=' + physW +  ' ' + canvasWidth +
			//			' physH > canvasHeight=' + physH + ' > ' +  canvasHeight );

			
			if( e3DSprite.clip )	// TODM think ... no need in clip if we draw rects and calculate all dimensions ourself ...
			{
				var wCX		= drawA.centerX;	
				var wCY		= drawA.centerY;	
				var wW2		= e3DSprite.clip.width2 * dscale;
				var wH2		= e3DSprite.clip.height2 * dscale;
				var left	= wCX - wW2 ; // physCenterX - wW2; 	// TODM stash for speed
				var top		= wCY - wH2;
				var right	= wCX + wW2;
				var bottom	= wCY + wH2;
				ctx.save();
				ctx.beginPath();
				ctx.moveTo( left,	top );
				ctx.lineTo( right,	top );
				ctx.lineTo( right,	bottom );
				ctx.lineTo( left,	bottom );
				ctx.closePath();
				ctx.clip();
				// c ccc( 'clip=' + left + ', ' + top + ', ' + right + ', ' + bottom );
			}


			ctx.drawImage(	sprite, 
							0,
							0,
							source_width,
							source_height,
							physCornerX,
							physCornerY,
							physW,
							physH
			);  

			if( e3DSprite.clip ) ctx.restore();

		};




		///	draw3DAxis
		var draw3DAxis = draw3D.draw3DAxis = function( origin, index, axisLength, color )
		{
			var pointA		=	[ origin[0], origin[1], origin[2] ];
			var pointB		=	[ origin[0], origin[1], origin[2] ];
			pointB[ index ]	+=	axisLength;
			//c onsole.log(pointA,pointB,color);
			draw3DLine( pointA, pointB, color );
		};


		///	draw3DAxes
		var draw3DAxes = draw3D.draw3DAxes = function ( origin, axisLength, colors )
		{
			draw3DAxis( origin, 0, axisLength, colors[0] );
			draw3DAxis( origin, 1, axisLength, colors[1] );
			draw3DAxis( origin, 2, axisLength, colors[2] );
		};



}) ();

