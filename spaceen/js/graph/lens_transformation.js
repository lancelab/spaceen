//	//\\//			Plugin. Projects 3D-stage to flat screen.
//					Available projections: PERSPECTIVE and ISOMETRY.
//					This plugin has no dependencies.
//					No canvasses and graphic context are required to setup this plugin:
//					this plugin operates purely with coordinates.

// 					Copyright (c) 2013 Konstantin Kirillov. License MIT.


( function () {


		var self; // Plugin itself

		///	Attaches plugin
		( function () {
			var btb		= window.btb$				= window.btb$				|| {};		
			var graph	= btb.graph					= btb.graph					|| {};
			self		= graph.lensTransformation	= graph.lensTransformation	|| {};
		}) ();


		//:	Available 3D-types
		var flgPERSPECTIVE	= self.flgPERSPECTIVE=0;
		var flgISOMETRY		= self.flgISOMETRY=1;

		// TODm in the future:
		// self.flgAXONOMETRY = 2;
		// self.flgPSEUDOLINEAR = 3;
		

		//:	3D Scene Settings
		var flg				= self.flg = flgPERSPECTIVE;
		var center			= self.center = [100,100];	//	Center in screen.
		var scale			= self.scale = 100;			//	Rescales x and z dimensions.

		//:	Needed only for PERSPECTIVE.
		//.	Note: var originY	= distance
		var originY		= self.originY = 100;		//	Distance to 3D-origin along axis y.
		var originX			= 0;						//	Origin to observer
		var originZ			= 0;	
		var originYMax		= null;
		var originYMin		= null;
		var xMax			= null;
		var xMin			= null;
		var zMax			= null;
		var zMin			= null;


		//:	Auxilairy
		var reverseDistance	= 1/originY;
		var SQRT3 = Math.sqrt(3.0);


		///	(Re)Initialization function.
		//	Input:	"settings" and its properties are optional.
		self.reset = function( settings )
		{
			if( !settings ) return;
			var ss = settings;

			if( ss.originYMax || ss.originYMax === 0 ) originYMax = ss.originYMax;
			if( ss.originYMin || ss.originYMin === 0 ) originYMin = ss.originYMin;

			if( ss.xMax || ss.xMax === 0 ) xMax = ss.xMax;
			if( ss.xMin || ss.xMin === 0 ) xMin = ss.xMin;

			if( ss.zMax || ss.zMax === 0 ) zMax = ss.zMax;
			if( ss.zMin || ss.zMin === 0 ) zMin = ss.zMin;

			///	Screen's center
			if( ss.center )
			{ 
				center[0] = ss.center[0];
				center[1] = ss.center[1];
			}

			if(typeof ss.scale	=== 'number' ) scale	=self.scale		=ss.scale;
			if(typeof ss.flg	=== 'number' ) flg		=self.flg		=ss.flg;

			if( ss.originX )	originX		=	ss.originX;
			if( ss.originZ )	originZ		=	ss.originZ;
			if( ss.originY )	originY	=	ss.originY;	

			if( ss.moveX )		originX		-=	ss.moveX;
			if( ss.moveZ )		originZ		-=	ss.moveZ;
			if( ss.moveY )		originY	-=	ss.moveY;

			if( ss.setAbsPosX ) originX		= ss.posX;
			if( ss.setAbsPosY ) originY	= ss.posY;
			if( ss.setAbsPosZ ) originZ		= ss.posZ;

			if( ( originYMax || originYMax === 0 ) && originY > originYMax ) originY = originYMax;
			if( ( originYMin || originYMin === 0 ) && originY < originYMin ) originY = originYMin;

			if( ( xMax || xMax === 0 ) && originX > xMax ) originX = xMax;
			if( ( xMin || xMin === 0 ) && originX < xMin ) originX = xMin;

			if( ( zMax || zMax === 0 ) && originZ > zMax ) originZ = zMax;
			if( ( zMin || zMin === 0 ) && originZ < zMin ) originZ = zMin;

			// c ccc( 'max: y=' + originYMax + ' x=' + xMax + ' z= ' + zMax );
			// c ccc( 'y=' + originY + ' x=' + originX + ' z= ' + originZ );

			///	Spawns originY parameter
			if(typeof ss.originY === 'number' || ss.moveY || ss.setAbsPosY )
			{
				//. Silently protects originY from being zero
				self.originY	= originY; 
				reverseDistance	= 1/originY;
			}

			return self;
		};



		/// Does projecting 3D coordinates to screen.
		//
		self.doproject = function( x, y, z )
		{
			var point = [];


			switch( flg )
			{
				case flgPERSPECTIVE:

					//:	Recalculates x, y, z in respect to observer
					//	Here: x, y, z become coordinates of a body in respect ot observer.
					x = x + originX;
					z = z + originZ;
					y = y +	originY;

				 	var dst = Math.max( Math.abs( y ), 0.001 );
					//c onsole.log(dst,x, x/dst);
			    	point[0] = center[0] + scale * x / dst;
			    	point[1] = center[1] - scale * z / dst;
			    	break;
				case flgISOMETRY:
			    	point[0] = center[ 0 ] + scale * SQRT3 * ( x - y );
			    	point[1] = center[ 1 ] - scale * ( x + y + 2 * z );
			    break;
			}
			//c onsole.log("LensT: point="+point[0]+","+point[1]);
	        return point;
		};

		///	Convenience function.
		//	Does project 3D coordinates to screen.
		self.doprojectPoint = function( point ) {
			return self.doproject( point[0], point[1], point[2]);
		};


		//	Does:		project size at given y. (including scale)
		//	Input:		if y is omitted, 0 is assumed.
		//	TODm:		do accurate distirtion along each axis x,y,z 
		//	Returns:	if point y is behind an observer, negative value is returned
		self.doprojectSize = function( size, y )
		{
			if( flgPERSPECTIVE !== flg ) return scale*size;
			if( y )
			{
				var dist = originY + y;
				//. Silent "to non-zero" fix
				if( !dist ) dist = -1;
				return scale * size / dist;
			}else{
				return scale * size * reverseDistance;
			}
		};

}) ();
