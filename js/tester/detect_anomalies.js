
//	//\\//		


( function () {

		var btb			= window.btb$		= window.btb$		|| {};
		var det			= btb.detected		= btb.detected		|| {};		
		var graph		= btb.graph			= btb.graph			|| {};

		var image_div;
		var canvas_div;
		var console_div;


		graph.detectAppleAnomaly = function ()
		{

			image_div = document.createElement( 'div' );
			document.body.appendChild( image_div );

			canvas_div = document.createElement( 'div' );
			document.body.appendChild( canvas_div );

			console_div	= document.createElement( 'div' );
			document.body.appendChild( console_div );
			console_div.setAttribute ( 'id', 'detectAnomaly_console_div_btb' );
			console_div.style.fontSize		= '9px';
			console_div.style.fontFamily	= 'monospace';
			console_div.style.whiteSpace	= 'pre';
			console_div.innerHTML			= '';

			//	4x4 image: squares 2x2 are: 0200FF, 04FF00, 06FFFF, 08|125|125
			var imgDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90JExIoEpyOl60AAAAnSURBVAjXY2Ri+P+fgYGBgek/IwMDAwMDEwMaYGH5D2Ew1dViVwEA9LMFDNgMpCEAAAAASUVORK5CYII=";

			reportImage ( imgDataURL );
			reportImage ( '../../../dev/test-data/img.png' );

		};

		var reportImage = function( url )
		{
			var img = new Image();
			img.src = url;

			img.onload = function ()
			{
				image_div.appendChild( img );

				var drawW		= Math.floor( img.width / 2 );
				var drawH		= Math.floor( img.height / 2 );

				var canvas		= document.createElement( 'canvas' );
				canvas.width	= drawW;
				canvas.height	= drawH;
				canvas.style.width = drawW + 'px';
				canvas.style.height = drawH + 'px';

				canvas_div.appendChild( canvas );

				var ctx			= canvas.getContext( '2d' );

				ctx.drawImage (
						img,
						0, 0, drawW, drawH, 
						0, 0, drawW, drawH
				);

				var renderedData = ctx.getImageData( 0, 0, drawW, drawH );


				var rendererLog =
				{
							detected : btb.detected,
							img		: [ img.width, img.height ],
							canvas	: [ canvas.width, canvas.height ],
							imgData	: [ renderedData.width, renderedData.height ],
							data	: renderedData.data
				};

				// var renderedData = {};
				// console.log( renderedData.width, renderedData.height, renderedData.data );


				var jsonedRendererLog	= JSON.stringify( rendererLog, null, '\t');
				console_div.innerHTML	= console_div.innerHTML + jsonedRendererLog;
				var logToURL			=	'../../../dev/capturer.php' + '?stamp='  + det.timeStamp;
				btb.saveTextToServer(	logToURL + '&command=snap', "jsonedRendererLog = \n" + jsonedRendererLog );

				try {
					var canvasBase64 = canvas.toDataURL( "image/png" );
					btb.saveTextToServer( logToURL + '-canvas-capture&command=picture', canvasBase64 );
				}catch ( error ) {
					console_div.innerHTML	= console_div.innerHTML + 
								'failed doing toDataURL ' +
								( typeof error === 'object' && error !== null ? error.message : '' + error );
				}

			}	// img.onload

		};	//	reportImage


}) ();

