
//	//\\//	Core definitions



( function () {


	var btb			= window.btb$		= window.btb$			|| {};		
	var graph		= btb.graph			= btb.graph				|| {};
	var conf		= graph.conf		= graph.conf			|| {};
	var debby		= btb.debby			= btb.debby				|| {};
	var gater		= graph.gater		= graph.gater			|| {};




	var Gate = gater.Gate = function ( self_, parent_ )
	{
		var gate				= self_;
		var resource			= self_.resource_;	//	image, canvas, function
		var breed				= self_.breed_;
		var dimEnv				= self_.dimEnv;
		var drawMethod			= self_.drawMethod;
		var drawOnParentMethod	= self_.drawOnParentMethod;
		var moveTo				= self_.moveTo;

		var parent				= parent_;		//	parent gate: div or canvas

		var children = gate.children = [];

		///	draws children on self
		gate.draw = function ( tick )
		{
			for( var ii = 0, len = children.length; ii < len; ii++ )
			{
				var child = children[ ii ];
				var childBreed = child.breed;
				var drawMethod = child.drawOnParentMethod || gate.drawMethod;
				
				switch( breed )
				{
					case 'img':
					break;
					case 'div':

						switch( childBreed )
						{
							case 'img':
								// var howToDraw = drawMethod || 'pos';	// move vs CSS bg shift;
								// if( moveTo ) ...
								child.shell.style.zIndex = '' + ii;
							break;			
						}
					break;
					case 'canvas':
					break;
				}
			}
		};

		///	draws children on self
		gate.addChild = function ( child )
		{
				var childBreed	= child.breed;
				var added		= false;

				switch( gate.breed )
				{
					case 'img':
					break;
					case 'div':

						switch( childBreed )
						{
							case 'img':
								gate.shell.appendChild( child.shell );
								added = true;
							break;			
						}
					break;
					case 'canvas':
					break;
				}
				if( added ) children.push( child );

		};

		return gate;
	};


}) ();


