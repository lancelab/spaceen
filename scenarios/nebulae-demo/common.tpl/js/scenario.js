
//	//\\//	Sets tasks for "window.onload" equivalent for scenario



( function () {

							window.btb$			= window.btb$			|| {};		
		var graph		=	window.btb$.graph	= window.btb$.graph		|| {};
		var scenario	=	graph.scenario		= graph.scenario		|| {};


		var arrow_vertical_scale	= 20;
		var scroll_scale			= 0.2;


		scenario.run = function ()
		{



			///	Handles scrolls made by vertical arrows
			var domNavScenario = function ( event )
			{
				var move	= 0;
				if( event.altKey || event.ctrlKey ) return;

				switch ( event.keyCode )
				{
						case 38	:	move = -arrow_vertical_scale;	// up
									break;
						case 40	:	move = arrow_vertical_scale;	// down
									break;
				}
				if( move )
				{
					var padder_jq	= $( '#padder-btb' );
					var newOffset	= padder_jq.scrollTop() + move;
					padder_jq.scrollTop( newOffset  );
					padderOffset	= newOffset;
				}
				return graph.priority_3D_navigator( event );
			};


			/// Handles verticalScrolls
			var padder_jq			= $( '#padder-btb' );
			var padderOffset		= padder_jq.scrollTop();
			var digestPadderScroll	= function ()
			{
				var newOffset = padder_jq.scrollTop();

				if( newOffset !== padderOffset )
				{
					
					graph.lensTransformation.reset (
					{
						control :
						{
							//: variants
							//	setAbsPosY	: true,
							//	posY		: newOffset * scroll_scale

							moveY		: ( padderOffset - newOffset ) * scroll_scale
						}
					});
					padderOffset = newOffset;
				}
			};



			graph.beforeit_init_afterit( domNavScenario );



			padder_jq.scroll( digestPadderScroll );
			//:	possible variant
			//	var throttledDigest = btb$.throttledCallback( digestPadderScroll, 20 );
			//	padder_jq.scroll( throttledDigest );

		};

}) ();
