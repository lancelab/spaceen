//	//\\//			Plugin. Projects 3D-stage to flat screen.
//					Available projections: PERSPECTIVE and ISOMETRY.
//					This plugin has no dependencies.
//					No canvasses and graphic context are required to setup this plugin:
//					this plugin operates purely with coordinates.

// 					Copyright (c) 2013 Konstantin Kirillov. License MIT.

( function () {





		var btb			= window.btb$				= window.btb$				|| {};		
		var	graph		= btb.graph					= btb.graph					|| {};
		var	self		= graph.lensTransformation	= graph.lensTransformation	|| {};
		var conf		= graph.conf				= graph.conf				|| {};
		var	conf3D		= conf.conf3D				= conf.conf3D				|| {};
		var usprite		= graph.usprite				= graph.usprite				|| {};
		var	ifdeb		= btb.ifdeb;


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
		var originTODM		= 100;
		var originY			= originTODM;		// self.originY = 100;		//	Distance to 3D-origin along axis y.
		var originX			= 0;				//	Origin to observer	// TODM no initial values in code ... This misleads ...
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




		self.getOrigin = function ()
		{
			return { xx : originX, yy : originY, zz : originZ };
		};



		///	(Re)Initialization function.
		//	Input:	"settings" and its properties are optional.
		self.reset = function( settings )	// TODM must split this sub to control and config
		{
			if( !settings ) return;
			var ss		= settings.conf3D	|| {};
			var cont	= settings.control	|| {};

			if( ss.originYMax || ss.originYMax === 0 ) originYMax = ss.originYMax;
			if( ss.originYMin || ss.originYMin === 0 ) originYMin = ss.originYMin;

			if( ss.xMax || ss.xMax === 0 ) xMax = ss.xMax;
			if( ss.xMin || ss.xMin === 0 ) xMin = ss.xMin;

			if( ss.zMax || ss.zMax === 0 ) zMax = ss.zMax;
			if( ss.zMin || ss.zMin === 0 ) zMin = ss.zMin;

			///	Screen's center
			if( cont.center )
			{ 
				center[0] = cont.center[0];
				center[1] = cont.center[1];
			}

			if(typeof ss.scale			=== 'number' ) scale	=self.scale		=ss.scale;
			if(typeof ss.flg			=== 'number' ) flg		=self.flg		=ss.flg;


			//:	Stashes
			var origX	= originX;
			var origY	= originY;
			var origZ	= originZ;

			if( ss.originX )	originX		=	ss.originX;
			if( ss.originZ )	originZ		=	ss.originZ;
			if( ss.originY )	originY		=	ss.originY;	

			if( cont.moveX )		originX		-=	cont.moveX;
			if( cont.moveZ )		originZ		-=	cont.moveZ;
			if( cont.moveY )		originY		-=	cont.moveY;

			if( cont.setAbsPosX ) originX		= cont.posX;
			if( cont.setAbsPosY ) originY		= cont.posY;
			if( cont.setAbsPosZ ) originZ		= cont.posZ;

			if( ( originYMax || originYMax === 0 ) && originY > originYMax ) originY = originYMax;
			if( ( originYMin || originYMin === 0 ) && originY < originYMin ) originY = originYMin;

			if( ( xMax || xMax === 0 ) && originX > xMax ) originX = xMax;
			if( ( xMin || xMin === 0 ) && originX < xMin ) originX = xMin;

			if( ( zMax || zMax === 0 ) && originZ > zMax ) originZ = zMax;
			if( ( zMin || zMin === 0 ) && originZ < zMin ) originZ = zMin;


			self.originY = originY; // TODM patch
			var newPoint = { xx : originX, yy : originY, zz : originZ };
			if( usprite.restrictMove && !usprite.restrictMove( newPoint ) )
			{
				//:	Reverts
				originX = newPoint.xx;
				originY = newPoint.yy;
				originZ = newPoint.zz;
			}

			self.originY = originY; 

			///	Spawns originY parameter
			if(typeof ss.originY === 'number' || cont.moveY || cont.setAbsPosY )
			{
				//. Silently protects originY from being zero
				reverseDistance	= 1/originY;
			}

			return self;
		};



		/// Does projecting 3D coordinates to screen.
		//
		self.doproject = function( x, y, z, dscale )  // TODM get rid from dscale
		{
			var point = [];


			var fscale = scale * ( dscale || 1 ); // TODM "embed" this to scale ... waste of time ...

			switch( flg )
			{
				case flgPERSPECTIVE:

					//:	Recalculates x, y, z in respect to observer
					//	Here: x, y, z become coordinates of a body in respect ot observer.
					x = x + originX;
					z = z + originZ;
					y = y +	originY;
					
				 	var dst = Math.max( Math.abs( y ), 0.0000001 );
					//c onsole.log(dst,x, x/dst);
			    	point[0] = center[0] + fscale * x / dst;
			    	point[1] = center[1] - fscale * z / dst;
			    	break;
				case flgISOMETRY:
			    	point[0] = center[ 0 ] + fscale * SQRT3 * ( x - y );
			    	point[1] = center[ 1 ] - fscale * ( x + y + 2 * z );
			    break;
			}
			//c onsole.log("LensT: point="+point[0]+","+point[1]);
	        return point;
		};

		///	Convenience function.
		//	Does project 3D coordinates to screen.
		self.doprojectPoint = function( point, dscale )
		{
			return self.doproject( point[0], point[1], point[2], dscale );
		};


		//	Does:		project size at given y. (including scale)
		//	Input:		if y is omitted, 0 is assumed.
		//	TODm:		do accurate distirtion along each axis x,y,z 
		//	Returns:	if point y is behind an observer, negative value is returned
		self.doprojectSize = function( size, y )
		{
			if( flgPERSPECTIVE !== flg ) return scale * size;

			//.	For speed. Possibly never used in practice.
			if( arguments.length < 2 ) return scale * size * reverseDistance;


			// if( y )	// was bug if( y ) Discovered Jul 23, 2013.
			var dist = originY + y;
			//. Silent "to non-zero" fix
			if( !dist ) dist = -1;

			///	Last resort low-level d ebug
			// c ccc(	' Lens tran: src-size='+size+' src-pos-y=' + y +
			//		' originY=' + originY + 
			//		' dist=' + dist + 
			//		' lt-res-scale=' + ( scale * size / dist )
			//);

			return scale * size / dist;
		};


		self.init = function ()
		{
				switch ( conf.lensFlag )
				{
					case 'isometry' :

						//var lensFlag = graph.lensTransformation.flgISOMETRY;		
						break;

					default :

						var lensFlag = graph.lensTransformation.flgPERSPECTIVE;		
						break;

				}

				//: Inits workers:
				conf3D.flg			= lensFlag;

				graph.lensTransformation.reset( {
								conf3D		: conf3D
				});

				ifdeb( 'lensT.init() completed' );

		};

}) ();
