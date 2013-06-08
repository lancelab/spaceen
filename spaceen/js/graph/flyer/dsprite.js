
//	//\\//			Dynamic sprite


( function () {


		var btb		= window.btb$	= window.btb$		|| {};
		var graph	= btb.graph		= btb.graph			|| {};
		var conf	= graph.conf	= graph.conf		|| {};
		var dsprite	= graph.dsprite	= graph.dsprite		|| {};

		var PI				= 3.1415926;
		var PI2				= 2 * PI;
		var PID2			= PI / 2;
		var PI2T;

		//	//\\	Parameters made local for speed
		var loaded_sprite		= null;
		var PI2T;
		var start_gradient;

		var shape_paths;

		var startColorA;
		var endColorA;
		var start_colors;
		var doRadialGradient;
		var doFill;
		var linear_gradients;
		var rad_gradients;
		var swap_gradients;

		var titlePosX;
		var titlePosY;
		var	titleScale;

		var cosA;
		var sinA;

		//	\\//	Parameters made local for speed




		dsprite.prepareParametersToDraw = function ( dconf, itemsMax, loaded_sprites )
		{ 

			if( conf.doCapture ) btb$.debug( JSON.stringify( dconf, null, '\t'), 'dconf' );
			dconf = dsprite.captured || dconf;

			loaded_sprite		= loaded_sprites[0];
			PI2T				= PI2 / conf.turnTimePoint;
			start_gradient		= conf.flying_shadows.start_gradient;

			shape_paths			= dconf.shape_paths;

			startColorA			= dconf.startColorA;
			endColorA			= dconf.endColorA;
			start_colors		= dconf.start_colors;
			doRadialGradient	= dconf.doRadialGradient;
			doFill				= dconf.doFill;
			linear_gradients	= dconf.linear_gradients;
			rad_gradients		= dconf.rad_gradients;
			swap_gradients		= dconf.swap_gradients;

			titlePosX			= dconf.titlePosX;
			titlePosY			= dconf.titlePosY;
			titleScale			= dconf.titleScale;

		};




		dsprite.draw = function ( arg )
		{

			var ctx						= arg.ctx;

			//: Position on global canvas
			var centerX					= arg.centerX;
			var centerY					= arg.centerY;

			//.	Rotation
			var angle					= arg.angle;

			//. Scale
			var ss						= arg.scale;
			var ticks					= Math.abs( arg.ticks );
			var item					= arg.item;

			var sscc					= start_colors[ item ];

			// c ccc( ' ticks=' + ticks );


			for( var ii = 0, len = sscc.length; ii < len; ii++ )
			{
				var cc = sscc[ ii ];
				var color = Math.min( Math.floor( Math.abs( -cc.amp * Math.sin( PI2T * cc.vv * ticks ) + cc.c0 ) ), 255 );
				switch ( ii )
				{
					case 0:	var startColorR = color;
							break;
					case 1:	var startColorG = color;
							break;
					case 2:	var startColorB = color;
				}
			}

			var endColorR	= Math.floor( startColorR * 0.5 / ( ticks * 0.05 + 1 ) );
			var endColorG	= Math.floor( startColorG * 0.5 / ( ticks * 0.05 + 1 ) );
			var endColorB	= Math.floor( startColorB * 0.5 / ( ticks * 0.05 + 1 ) );


			var paths = shape_paths[ item % shape_paths.length ];

			if( conf.spaceTransf )
			{
				ctx.save();
				ctx.translate( centerX, centerY );
				ctx.rotate( -angle );
			}else if( angle ) {
				angle = -angle;
				sinA = Math.sin( angle );
				cosA = Math.cos( angle );
			}
			

			// //\\ Drawing

			//btb$.ifdeb ( 'Generating sprite', arg );

			ctx.beginPath();


			for( var iip = 0; iip < paths.length; iip++ )
			{

				var path = paths[ iip ];

				if( !conf.spaceTransf )
				{
					if( angle )
					{
						var wx = cosA * path.x - sinA * path.y;
						var wy = sinA * path.x + cosA * path.y;
						var startAngle	= path.startAngle + angle;
						var endAngle	= startAngle + path.angle;
					}else{
						var wx = path.x;
						var wy = path.y;
						var startAngle	= path.startAngle;
						var endAngle	= startAngle + path.angle;
					}
					var pointX = centerX + wx * ss;
					var pointY = centerY + wy * ss;
				}else{
					var pointX = path.x * ss;
					var pointY = path.y * ss;
					var startAngle	= path.startAngle;
					var endAngle	= startAngle + path.angle;
				}

				if( path.hasOwnProperty( 'r' ) )
				{

						var pathR		= path.r * ss;
						if( !conf.spaceTransf && angle )
						{
							var startAngle	= path.startAngle + angle;
							var endAngle	= startAngle + path.angle;
						}else{
							var startAngle	= path.startAngle;
							var endAngle	= startAngle + path.angle;
						}

						ctx.arc(
							pointX,
							pointY,
							pathR,
							startAngle,
							endAngle,
							path.dir
						);

				}else{

						if( iip === 0 )
						{
							ctx.moveTo( pointX, pointY );
						}else{
							ctx.lineTo( pointX, pointY );
							if( iip === paths.length - 1) ctx.closePath();
						}

				}

			} // for( var iip = 0; iip < paths.length; iip++ )


			// //\\	Renormalizes alpha
			//		in possibly small time area around turning point | ticks | < start_gradient.
			//		After filling gradient with shortAlpha, result becomes a background for "main-scenario" drawings.
			if( start_gradient && ticks < start_gradient )
			{
				var shortAlpha =	Math.max ( 
										Math.floor( 
												1000 * ( start_gradient - ticks ) / start_gradient * arg.alpha
										) / 1000,
										0.01
									);

				var gradShort = create_gradient(
					ctx, ss,
					startColorR, startColorG, startColorB, startColorA,
					endColorR, endColorG, endColorB, endColorA,
					shortAlpha, angle, centerX, centerY
				);


				/*
				///	Indispensable debug. Set ticks set to a small number like 10.
				c ccc( 
					' start_gradient=' + start_gradient +
					'. short grad :' + ' ss=' + ss +
					', startColorR= '	+ startColorR +
					', startColorG='	+ startColorG	+ ', startColorB=' + startColorB +
					', startColorA = '	+ startColorA	+ ', endColorR=' + endColorR +
					', endColorG='		+ endColorG		+ ', endColorB=' + endColorB + ', endColorA=' + endColorA +
					', shortAlpha=' + shortAlpha
				);
				*/

				ctx.fillStyle = gradShort;
				ctx.fill();
			}

			/*
			///	Indispensable debug. Set ticks set to a small number like 10.
			c ccc( 
					'. short grad :' + ' ss=' + ss +
					', startColorR= '	+ startColorR +
					', startColorG='	+ startColorG	+ ', startColorB=' + startColorB +
					', startColorA = '	+ startColorA	+ ', endColorR=' + endColorR +
					', endColorG='		+ endColorG		+ ', endColorB=' + endColorB + ', endColorA=' + endColorA +
					', arg.alpha=' + arg.alpha
			);
			*/



			var grad = create_gradient(
				ctx, ss,
				startColorR, startColorG, startColorB, startColorA,
				endColorR, endColorG, endColorB, endColorA,
				arg.alpha, angle, centerX, centerY
			);

			///	Presence of start_gradient disables filling of "main-scenario"
			if( start_gradient )
			{
				ctx.strokeStyle = grad;
				ctx.stroke();
			}else{
				ctx.fillStyle = grad;
				ctx.fill();
			}
			// \\// Drawing

			if( conf.spaceTransf ) ctx.restore();


		};



		///	Shortcut
		var create_gradient = function (
				ctx, ss,
				startColorR, startColorG, startColorB, startColorA,
				endColorR, endColorG, endColorB, endColorA,
				alpha, angle, centerX, centerY
		){

			if( doFill )
			{

				return 'rgba(' +
						startColorR + ',' +
						startColorG + ',' +
						startColorB + ',' +
						( startColorA * alpha ) + ')';
			}


			if( doRadialGradient ) {

				var ww0 = rad_gradients[ swap_gradients ];
				var ww1 = rad_gradients[ ( swap_gradients + 1 ) % 2 ];
				var w0R = ww0.R;
				var w1R = ww1.R;

			}else{

				var ww0 = linear_gradients[ swap_gradients ];
				var ww1 = linear_gradients[ ( swap_gradients + 1 ) % 2 ];

			}

			w0X = ww0.X;
			w0Y = ww0.Y;
			w1X = ww1.X;
			w1Y = ww1.Y;

			if( !conf.spaceTransf )
			{
					if( angle )
					{
						var w0x = cosA * w0X - sinA * w0Y;
						var w0y = sinA * w0X + cosA * w0Y;
						var w1x = cosA * w1X - sinA * w1Y;
						var w1y = sinA * w1X + cosA * w1Y;
					}else{
						var w0x = w0X;
						var w0y = w0Y;
						var w1x = w1X;
						var w1y = w1Y;
					}
					var w0X = centerX + w0x * ss;
					var w0Y = centerY + w0y * ss;
					var w1X = centerX + w1x * ss;
					var w1Y = centerY + w1y * ss;
			}


			if( doRadialGradient )
			{

				w0R	*= ss;
				w1R	*= ss;

				var grad = ctx.createRadialGradient(
					w0X,
					w0Y,
					w0R,
					w1X,
					w1Y,
					w1R
				);

			}else{

				var grad = ctx.createLinearGradient	(
					w0X,
					w0Y,
					w1X,
					w1Y
				);
			}





			grad.addColorStop( 0, 'rgba(' +
					startColorR + ',' +
					startColorG + ',' +
					startColorB + ',' +
					( startColorA * alpha ) + ')'
			);



			grad.addColorStop( 1, 'rgba(' +
					endColorR + ',' +
					endColorG + ',' +
					endColorB + ',' +
					( endColorA * alpha ) + ')'
			);

			return grad;

		};



		///	Part II. Title Image.
		dsprite.drawPauseImage = function ( phase, ctx, centerX, centerY, scale )
		{
			if( phase < 0 || phase > 1 ) return;
			var img = loaded_sprite.img;
			var alpha = phase * 2 - 1;
			alpha	*=	alpha;
			alpha	=	1 - Math.abs( alpha ); 
			alpha	*=	alpha;
			if( alpha > 1 ) alpha = 1;
			// c ccc( 'phase, alpha=' + phase + ', ' + alpha );			
			ctx.globalAlpha = alpha;
			var ww = img.width;
			var wh = img.height;
			var titleFinalScale = titleScale && titleScale * scale || scale;
			ctx.drawImage (
				img,
				0, 0, ww, wh,
				centerX + titlePosX * titleFinalScale , centerY + titlePosY * titleFinalScale,
				ww * titleFinalScale, wh * titleFinalScale
			);
		};
		


}) ();
