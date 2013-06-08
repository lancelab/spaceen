
//	//\\//			Plugin. Convenience functions for 3D-draw in JavaScript.


( function () {


		var self; // Plugin itself

		///	Attaches plugin
		( function () {
			var btb			= window.btb$		= window.btb$		|| {};		
			var graph		= btb.graph			= btb.graph			|| {};
			self			= graph.vector23D	= graph.vector23D	|| {};
		}) ();


		///	Builds linear combination of two 2D or 3D vectors
		var combine = self.combine = function ( a, vectorA, b, vectorB )
		{
			var result = [	a * vectorA[0] + b * vectorB[0],
							a * vectorA[1] + b * vectorB[1]
			];
			if( vectorA.length > 2) result[2] = a * vectorA[2] + b * vectorB[2];
			return result;
		};

	
		///	Rotates vector in 2D plane or around vertical axis
		var rotateXY = self.rotateXY = function ( cs, sn, vector )
		{
			result = [	cs * vector[0] - sn * vector[1],
						sn * vector[0] + cs * vector[1]
			];
			if( vector.length > 2) result[2] = vector[2];
			return result;
		};


}) ();

