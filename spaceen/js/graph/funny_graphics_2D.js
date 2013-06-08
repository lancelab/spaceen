
//	//\\//			Plugin. Convenience functions for 2D-draw.
//					No need for graphic context at initialization step.


( function () {


		var self; //Plugin itself
		var parent;
		var draw2D;

		///	Attaches plugin
		( function () {
			var btb		= window.btb$ = window.btb$ || {};		
			var graph	= btb.graph = btb.graph || {};
			parent		= btb.graph;
			draw2D		= parent.draw2D = parent.draw2D || {};
			self		= graph.funny_graphics_2D = graph.funny_graphics_2D	|| {};
		}) ();




		// Spread randomly ballsNumber random-radius and random color disks
		// over imageData.
		// Input:	width,height - dimensions of imageData,
		//			radiusMax - radius limit.
		//			imageData - opt. If present, pixels put there.
		var prepareRandomDisks = function( ballsNumber, width, height, radiusMax, imageData )
		{

				var setPixel=draw2D.setPixel;
				var pixs = [];
				for(var i=0; i<ballsNumber; i++){
					var radius	=Math.random()*radiusMax;
					var x	= Math.floor(Math.random()*width);
					var y	= Math.floor(Math.random()*height);
					var r	= Math.floor(254*Math.random());
					var g	= Math.floor(254*Math.random());
					var b	= Math.floor(254*Math.random());
					var a	= Math.floor(254*Math.random())

					if( imageData ) setPixel( imageData, x, y, r, g, b, a );

					pixs[i]=[x, y, r, g, b, a, radius];
					//c onsole.log(pixs[i]);
				}
				return pixs;
		};


	

		///	Creates canvas-element and draws random disks on it
		//	Credit: http://beej.us/blog/2010/02/html5s-canvas-part-ii-pixel-manipulation/
		self.createRandomDisks=function(grainsNumber,width,height){

			var radiusMax=3;

			var ww = draw2D.generateCanvas( width, height );
			subCanvas = ww.canvas;
			var sctx = ww.context;
			subCanvas.height = height;

			sctx.fillStyle = '#000000';
			sctx.fillRect( 0, 0, width, height );  

			//good:			var imageData = sctx.createImageData(width,height); 
			//need better:
			var imageData = sctx.getImageData(0,0,width,height); 

			if( grainsNumber )
			{
				var pixels=prepareRandomDisks(grainsNumber,width,height,radiusMax,imageData);

				//sctx.putImageData(imageData, 0,0)

				//Draw big balls:
				for(var i=0; i<grainsNumber; i++){
					var pl=pixels[i];
					var radius = pl[6];
					if(radius > 1){	
						sctx.beginPath();
						sctx.arc(pl[0],pl[1], radius, 0, Math.PI*2, true);
						var ww = 'rgba('+pl[2]+','+pl[3]+','+pl[4]+','+pl[5]+')';
						//c onsole.log(w);
						sctx.fillStyle = ww;
						sctx.fill();
					}
				}
			}

			return sctx;
		};




		return self;

}) ();

