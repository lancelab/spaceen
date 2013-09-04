
//	//\\//			Filters


( function () {

		var filters; // Plugin itself

		///	Attaches plugin
		( function ( name ) {
			var btb		= window.btb$		= window.btb$			|| {};		
			var graph	= btb.graph			= btb.graph				|| {};
			conf		= graph.conf		= graph.conf			|| {};
			filters		= graph[ name ]		= graph[ name ]			|| {};
		}) ( 'filters' );

		filters.memLeft = function ( imageData, memLeft )
		{
			var data	= imageData.data;
			var keeper	= memLeft;
			var len4	= data.length - 4;

			for ( var ii = 0; ii <= len4; ii +=4 )
			{
				data[ ii     ] *= keeper;
				data[ ii + 1 ] *= keeper;
				data[ ii + 2 ] *= keeper;
			}

			/*
			/// This is slow, but "kills" near-zero shadows
			for ( var ii = 0; ii <= len4; ii +=4 )
			{
				data[ ii     ] = Math.floor( data[ ii     ] * keeper );
				data[ ii + 1 ] = Math.floor( data[ ii + 1 ] * keeper );
				data[ ii + 2 ] = Math.floor( data[ ii + 2 ] * keeper );
			}
			*/
		};

}) ();

