//	//\\//			Plugin. Convenience functions for 3D-draw on canvas.
//					Uses graphic context taken from tp$.draw3D.

/// Builds:		plugin body singleton
//	Does not:	need canvas environment to instantiate.
//	Input:		no canvas environment is required.


( function ( ) { 

		var self; //Plugin itself
		var parent;

		///	Attaches plugin
		( function () {
			var btb		= window.btb$				= window.btb$				|| {};		
			var graph	= btb.graph					= btb.graph					|| {};
			self		= graph.funny_graphics_3D	= graph.funny_graphics_3D	|| {};
			parent		= graph;
		}) ();






		///	Input:	boxMax - size of space-box confining all the 3D-items
		self.generateRandomCollectionOfBalls = function( 
					itemsMax,bodyRadiusMax, boxMaxX, boxMaxY, boxMaxZ,
					boxCenterX, boxCenterY, boxCenterZ  )
		{
			var items=[];


			for(var i=0; i<itemsMax; i++){

				var center = 
				[			
							( Math.random() - 0.5 ) * boxMaxX + boxCenterX, 
							( Math.random() - 0.5 ) * boxMaxY + boxCenterY, 
							( Math.random() - 0.5 ) * boxMaxZ + boxCenterZ, 
				];
				var radius	= Math.random() * bodyRadiusMax;


				items[i]={	center : center,
							radius : radius,
							colorDark : '#'+(4+(i%5))+'000'+(5-(i%5))+'0',
							colorLight : '#FFFFFF'
				};
			};
			return items;
		};

		// Clone collection of balls
		self.cloneCollection = function ( col )
		{
			var t=[];
			for(var i=0, len=col.length; i<len; i++){
				var c=col[i];
				t[i]={	center : [c.center[0],c.center[1],c.center[2]],
					radius : c.radius,
					colorDark : c.colorDark,
					colorLight : c.colorLight
				};
			}
			return t;
		};


		// Input:	col - original collection of balls.
		// Result of rotation is contained in clonedCollection
		self.rotateCollection = function ( col, clonedCollection, cs, sn )
		{
			for( var i=0, len=col.length; i<len; i++ )
			{
				var cl = col[i];
				var rc = clonedCollection[i];
				rc.center = parent.vector23D.rotateXY( cs, sn, cl.center );	// TODM returning array is slow
				rc.radius = cl.radius;
				rc.colorDark = cl.colorDark;								// TODM making color for picture is slow
				rc.colorLight = cl.colorLight;
				//c onsole.log(clonedCollection[i]);
			}
		};


		self.drawCollectionOfBalls = function (
				items,
				clonedCollection,
				ticks,
				ticksPeriod,
				scrWidth,
				scrHeight,
				backgroundImageData,
				sprite
		){
			var angle	= 2 * Math.PI * ticks / ticksPeriod;
			var cs		= Math.cos( angle );
			var sn		= Math.sin( angle );
			self.rotateCollection( items, clonedCollection, cs, sn );
			//ctx.clearRect(0,0,scrWidth,scrHeight);
			//origin, axisLength, colors:
			parent.draw3D.draw3DAxes( [0,0,0],  200, ['#0000FF','#00FF00','#FF0000'] );
			parent.draw3D.drawCollection(
				clonedCollection, scrWidth, scrHeight, backgroundImageData, sprite
			);
		};

}) ();

