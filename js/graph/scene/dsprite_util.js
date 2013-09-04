
//	//\\//			Dynamic draw utilities


( function () {


		var btb		= window.btb$	= window.btb$		|| {};
		var graph	= btb.graph		= btb.graph			|| {};
		var conf	= graph.conf	= graph.conf		|| {};
		var dsprite	= graph.dsprite	= graph.dsprite		|| {};

		// var wD ebDone = false;

		//	//\\	Parameters made local for speed
		var loaded_sprite		= null;

		var doRadialGradient;
		var fillSprites;
		var mstones;
		var linear_gradients;
		var rad_gradients;
		var swap_gradients;

		var titlePosX;
		var titlePosY;
		var	titleScale;



		var pauseImageStays;
		var fillTitleFrom;	// in ownTicks
		var foregrounds	= null;	// vital to set to null. Is a flag.
		// var softEase;
		//	\\//	Parameters made local for speed

		//:	Control DomEl-scenario
		var elSTART		= 0;
		var elPROGRESS	= 1;
		var elDONE		= 2;
		var elState;




		dsprite.prepare_util = function ( dconf, loaded_sprite_ )
		{
			linear_gradients	= dconf.linear_gradients;
			rad_gradients		= dconf.rad_gradients;
			swap_gradients		= dconf.swap_gradients;
			doRadialGradient	= dconf.doRadialGradient;
			fillSprites				= dconf.fillSprites;
			loaded_sprite		= loaded_sprite_;
			titlePosX			= dconf.titlePosX;
			titlePosY			= dconf.titlePosY;
			titleScale			= dconf.titleScale;
			pauseImageStays		= conf.cflyer.pauseImageStays;
			fillTitleFrom		= conf.cflyer.fillTitleFrom;
			mstones				= graph.mstones;
			if( !foregrounds )
			{
				foregrounds			= graph.flyer.foregrounds = graph.flyer.foregrounds || {};
				var ww				= conf.cflyer.foregroundsIds;
				btb.each( ww, function ( key, value ) {
					foregrounds[ key ] = foregrounds[ key ] || [];
					btb.each( value, function ( key2, id ) {
							var wf = $( id );
							if( wf && wf[0] ) foregrounds[ key ].push( wf );
					});
				});
				elState		= elSTART;
			}
		};





		dsprite.create_gradient = function (
				ctx, ss,
				startColorX, startColorY, startColorZ, startColorA,
				endColorR, endColorG, endColorB, endColorA,
				alpha, angle, centerX, centerY,
				effectiveAlphaBound,
				sinA, cosA,
				hsl
		){

			var alphaStart	= Math.min( startColorA	* alpha, effectiveAlphaBound );
			var alphaEnd	= Math.min( endColorA	* alpha, effectiveAlphaBound );

			if( fillSprites )
			{
				// d ebug
				// startColorX = '100';
				// startColorY = '0';
				// startColorZ = '0';
				// alphaStart = '1';
				if( hsl )
				{
					return 'hsla(' +
						startColorX + ',' +
						startColorY + '%,' +
						startColorZ + '%,' +
						alphaStart + ')';
				}else{
					return 'rgba(' +
						startColorX + ',' +
						startColorY + ',' +
						startColorZ + ',' +
						alphaStart + ')';
				}
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



			if( hsl )
			{
				var stopCol = 'hsla(' +
						startColorX + ',' +
						startColorY + '%,' +
						startColorZ + '%,' +
						alphaStart + ')';
			}else{
				var stopCol = 'rgba(' +
					startColorX + ',' +
					startColorY + ',' +
					startColorZ + ',' +
					alphaStart + ')';
			}
			grad.addColorStop( 0, stopCol );


			//try {

			grad.addColorStop( 1, 'rgba(' +
					endColorR + ',' +
					endColorG + ',' +
					endColorB + ',' +
					alphaEnd + ')'
			);

			//} catch ( err ) {
			//	c ccc( alphaEnd, alpha, item, ticks );
			//}

 			return grad;

		};



		///	Part II. Title Image.
		dsprite.drawPauseImage = function ( phase, ctx, centerX, centerY, scaleX, scaleY, turnEnterPassed, ownTicks )
		{

			if( !loaded_sprite || !loaded_sprite.loaded ) return;	// TODM slow. Check this earlier.

			if( fillTitleFrom && fillTitleFrom > ownTicks )
			{
				phase = ( fillTitleFrom - ownTicks ) / ( fillTitleFrom * 2 ); 
				// c ccc( ' in phase=' + phase + ' ownTicks=' + ownTicks );
			}else if( pauseImageStays && turnEnterPassed ) {
				//.	Brightnesses image at the end
				phase *= 0.5;
				//.	Handles case phase === -1
				if( phase < -0.2 ) phase = 0.5;
			}else if( phase < 0 || phase > 1 ) {
				return;
			}

			var img			=	loaded_sprite.img;
			var alpha		=	phase * 2 - 1;
			//.	TODM do for sprite, not for image
			//	alpha			=	softEase ? alpha : alpha * alpha;
			alpha			*=	alpha;
			alpha			=	1 - Math.abs( alpha ); 
			alpha			*=	alpha;

			if( alpha > 1 )		alpha = 1;

			ctx.globalAlpha	=	alpha;
			var ww			=	img.width;
			var wh			=	img.height;
			scaleX			=	titleScale && titleScale * scaleX || scaleX;
			scaleY			=	titleScale && titleScale * scaleY || scaleY;

			ctx.drawImage (	img,
							0, 0, ww, wh,
							centerX + titlePosX * scaleX , centerY + titlePosY * scaleY,
							ww * scaleX, wh * scaleY
			);
			//. Unkills environment
			ctx.globalAlpha	= 1;

		};
		






		///	Helper
		//	Usage:	works right from single dsprite "drawer".
		//	Input:	arg.foregrounds.onAtStartup and arg.foregrounds.fadeAtCulmination
		//

		dsprite.animateDomEls = function( arg, elphase )
		{

			if( !foregrounds || elState === elDONE ) return;
			var fade	= foregrounds.fadeAtCulmination;
			var show	= foregrounds.stayAfterCulm;
			var flen	= fade && fade.length || 0;
			var slen	= show && show.length || 0 ;
			var len		= Math.max( flen, slen );
			if( !len )	return;

			if( elphase === -2 || elphase > 0.99999)
			{
				///	does finish the job
				for( var ii = 0; ii < len; ii++ )
				{
					if( ii < flen )
					{
						var fd = fade[ ii ];
						btb.ifdeb(	'fader-' + ii + '-' + fd[0].id + ' hidden. elState=' + elState + ' opacity=' + fd[0].style.opacity +
									' height=' + $( fd ).css( 'height' ));
						fd[0].style.visibility = 'hidden';
						fd[0].style.display = 'none';
					}

					if( ii < slen )
					{
						var sh = show[ ii ];
						sh.css( 'opacity', 1 );
						if( elState === elSTART )
						{
							sh[0].style.visibility = 'visible';
							sh[0].style.display		= 'block';
							btb.ifdeb(	'shower-' + ii + '-' + sh[0].id + ' shown elState=' + elState + ' opacity=' + sh[0].style.opacity +
										' height=' + $( sh ).css( 'height' ));
						}
					}
				}

				elState = elDONE;
				btb.ifdeb( 'domels done: elState=' + elState );

			}else{ 

				var alpha	= elphase === -2 ? 0 : ( elphase === -1 ? 1 : elphase );
				if( alpha > 0.99999 ) alpha = 1;
				if( alpha < 0.00001 ) alpha = 0;
				var calpha = 1 - alpha;

				for( var ii = 0; ii < len; ii++ )
				{
					if( ii < flen )
					{
						var fd = fade[ ii ];
						fd.css( 'opacity', calpha );
						///	Does extra help in case foregrounds are non-visible. TODM redundant?
						if( elState === elSTART ) fd[0].style.visibility = 'visible';
					}

					if( ii < slen )
					{
						var sh = show[ ii ];
						sh.css( 'opacity', alpha );

						if( elState === elSTART )
						{
							sh[0].style.visibility	= 'visible';
							sh[0].style.display		= 'block';
							//btb.ifdeb( 'shower is shown. id=' + sh[0].id + ' alpha=' + alpha  + ' elState=' + elState);
							// c ccc(	'shower is shown. id=' + sh[0].id + ' alpha=' + alpha  + ' elState=' + elState +
							//		' height=' + $( sh ).css( 'height' ) );
						}
					}
				}
				elState = elPROGRESS;
			}
		};



}) ();
