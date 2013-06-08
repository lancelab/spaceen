
//	//\\//			Plugin. Convenience functions for 3D-draw on canvas.
//					Uses conf and lens.
//					Takes graphic context at initialization step.
//					

( function ( ) {

		var self; //Plugin itself
		var parent;
		var lens;


		///	Attaches plugin
		( function () {
			var btb			= window.btb$	= window.btb$	|| {};		
			var graph		= btb.graph		= btb.graph		|| {};
			parent			= btb.graph;
			lens			= graph.lensTransformation = graph.lensTransformation || {};
			self			= graph.draw3D	= graph.draw3D	|| {};
		}) ();



		//Settings:
		var ctx; //graphicsContext
		var scrWidth;
		var scrHeight;

		var fromObserverYMin	= null;
		var fromObserverYMax	= null;



	
		self.reset = function( graphicsContext, conf )
		{
			ctx = graphicsContext;

			if( conf )
			{
				fromObserverYMin	= conf.fromObserverYMin;
				fromObserverYMax	= conf.fromObserverYMax;
			}
			return self;
		};



		/// Projects 3D line to canvas
		var draw3DLine = self.draw3DLine = function( point3DA, point3DB, color)
		{
			var pointA = lens.doprojectPoint( point3DA );
			var pointB = lens.doprojectPoint( point3DB );
			//c onsole.log(pointA,pointB,color);	
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.moveTo( pointA[0], pointA[1] );
			ctx.lineTo( pointB[0], pointB[1] )
			ctx.stroke();
		};

		///	Draws 3D ball on canvas
		var draw3DBall = self.draw3DBall = function( center, radius, colorDark, colorLight )
		{
			var touchYPoint = center[1] - radius;
			var touchSize = lens.doprojectSize( radius, touchYPoint );
			if( touchSize < 0 ) return; //behind observer
			var center2D = lens.doprojectPoint( center );
			var radius2D = lens.doprojectSize( radius, center[1] );
			if( radius2D === 0 ) return;
			ctx.fillStyle = colorDark;
			ctx.beginPath();
			//c onsole.log(center2D,radius2D);
			ctx.arc( center2D[0], center2D[1], radius2D, 0, Math.PI*2, true);
			ctx.fill();
		};



		///	Draws 3D ball with gradients
		var draw3DBallGradient = self.draw3DBallGradient = function( center, radius, colorDark, colorLight, scrWidth, scrHeight )
		{
			var touchYPoint = center[1] - radius;
			var touchSize = lens.doprojectSize( radius, touchYPoint );
			if( touchSize < 0 ) return; //behind observer
			var center2D = lens.doprojectPoint( center );
			var radius2D = lens.doprojectSize( radius, center[1] );
			if( radius2D === 0) return;

			/// Leaves of outside of screen
			if( scrWidth )
			{
				var xx = center2D[0];
				var yy = center2D[1];
				if( xx + radius2D < 1 || xx - radius2D > scrWidth ) return;
				if( yy + radius2D < 1 || yy - radius2D > scrHeight ) return;
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
		//	Input:		center - array: [ x, y ]
		var drawImageIn3D = self.drawImageIn3D = function( center, scrWidth, scrHeight, sprite )
		{
			var start_width = sprite.width;
			var start_height = sprite.height;
			var dimension = Math.max( start_width, start_height );


			//:	Restricts drawing by distance from observer
			if( fromObserverYMin || fromObserverYMin === 0 )
			{
				var fromObserver = center[1] + lens.originY;
				if( fromObserver < fromObserverYMin ) return;
			}
			if( fromObserverYMax || fromObserverYMax === 0 )
			{
				var fromObserver = center[1] + lens.originY;
				if( fromObserver > fromObserverYMax ) return;
			}

			//var touchYPoint = center[1] - dimension;
			//var touchSize = lens.doprojectSize( dimension, touchYPoint );
			//if( touchSize < 0 ) return; //behind observer

			var center2D = lens.doprojectPoint( center );
			var width2D2 = Math.floor( lens.doprojectSize( start_width, center[1] ) * 0.5 );
			var height2D2 = Math.floor( lens.doprojectSize( start_height, center[1] ) * 0.5 );
			if( height2D2 <= 0 || width2D2 <= 0 ) return;


			var width2D		= width2D2 + width2D2;
			var height2D	= height2D2 + height2D2;

			/// Leaves of outside of screen
			if( scrWidth )
			{
				var xx = center2D[0];
				var yy = center2D[1];
				var xcorner = xx - width2D2;
				var ycorner = yy - height2D2;

				
				if( xcorner + width2D	< 1 || xcorner > scrWidth ) return;
				if( ycorner + height2D	< 1 || ycorner > scrHeight ) return;
				if( width2D > scrWidth * 2	|| height2D > scrHeight * 2 ) return;
			}

			//good debug
			//c onsole.log( scrWidth,	 scrHeight );
			//c onsole.log( xcorner, 	ycorner );
			//c onsole.log( "width2D2, height2D2=", width2D2, height2D2 );

			ctx.drawImage(	sprite, 
							0,
							0,
							start_width,
							start_height,
							xcorner,
							ycorner,
							width2D,
							height2D
			);  

		};




		///	draw3DAxis
		var draw3DAxis = self.draw3DAxis = function( origin, index, axisLength, color )
		{
			var pointA		=	[ origin[0], origin[1], origin[2] ];
			var pointB		=	[ origin[0], origin[1], origin[2] ];
			pointB[ index ]	+=	axisLength;
			//c onsole.log(pointA,pointB,color);
			draw3DLine( pointA, pointB, color );
		};


		///	draw3DAxes
		var draw3DAxes = self.draw3DAxes = function ( origin, axisLength, colors )
		{
			draw3DAxis( origin, 0, axisLength, colors[0] );
			draw3DAxis( origin, 1, axisLength, colors[1] );
			draw3DAxis( origin, 2, axisLength, colors[2] );
		};




		//	//\\ Draws collection in order from back to front:
		//	Algorithm: sorts by coordinate center.y.
		var comparator = function( itemA, itemB )
		{
			return Math.floor(   (itemB.center[1] - itemB.radius ) - ( itemA.center[1] - itemA.radius)  );
		};

		///	Input:	optional: 	scrWidth,scrHeight,backgroundImageData.
		//						Modifies screen if present.
		var drawCollection = self.drawCollection = function( col, scrWidth, scrHeight, backgroundImageData, sprite )
		{
			col.sort( comparator );
			if( backgroundImageData ) {
				ctx.putImageData( backgroundImageData, 0, 0 )
			}else{
				if( scrHeight ) ctx.clearRect( 0, 0, scrWidth, scrHeight );
			}

			//topApp.deb(col);
			for( var ii = 0, len = col.length; ii < len; ii++ )
			{
				var cl = col[ii];
				if( sprite )
				{
					drawImageIn3D( cl.center, scrWidth, scrHeight, sprite );
				}else{
					draw3DBallGradient = self.draw3DBallGradient(
						cl.center, cl.radius, cl.colorDark, cl.colorLight,
						scrWidth, scrHeight
					);
				}
			}
		};
		//	\\// Draws collection in order from back to front:


}) ();

