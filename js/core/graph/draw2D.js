
//	//\\//			Plugin. Convenience functions for 2D-draw on canvas.
//					Is not bound to any graphics-context.
// 					Copyright (c) 2013 Konstantin Kirillov. License: in js/readme.js.


( function () {

		var self; // Plugin itself

		///	Attaches plugin
		( function () {
			var btb			= window.btb$	= window.btb$	|| {};		
			var graph		= btb.graph		= btb.graph		|| {};
			self			= graph.draw2D	= graph.draw2D	|| {};
		}) ();


		/// Sets pixel on imageData
		//	Credit: http://beej.us/blog/2010/02/html5s-canvas-part-ii-pixel-manipulation/
		self.setPixel = function( imageData, x, y, r, g, b, a)
		{
			//c onsole.log('args',arguments);
		    ix = ( x + y * imageData.width ) * 4;
	    	imageData.data[ ix + 0 ] = r;
	    	imageData.data[ ix + 1 ] = g;
	    	imageData.data[ ix + 2 ] = b;
	    	imageData.data[ ix + 3 ] = a;
		};



		///	Thin helper
		self.generateCanvas = function ( width, height )
		{
			var canvas		= document.createElement( 'canvas' );
			canvas.width	= width;
			canvas.height	= height;
			return			{ canvas : canvas, context : canvas.getContext( '2d' ) };
		};


		///	Rotates:	image around its center and draws it at pos_on_canvas_x, pos_on_canvas_y.
		//	Input:		angle in radians. Positive when clockwise.
		//	Credit:		http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
		self.drawRotatedImage = function ( img, angle, pos_on_canvas_x, pos_on_canvas_y, size_x, size_y, ctx )
		{
			ctx.save();
			ctx.translate( pos_on_canvas_x, pos_on_canvas_y );
			ctx.rotate( -angle );
			if( size_x )
			{
				ctx.drawImage(
							img, 0, 0, img.width, img.height, 
							-(size_x * 0.5),  -(size_y * 0.5), size_x, size_y
				);
			}else{
				ctx.drawImage( img, -(img.width * 0.5),  -(img.height * 0.5) );
			}
			ctx.restore();
		};

		///	This function should replace self.drawRotatedImage TODM
		self.drawRotatedClip = function ( img, offsetX, offsetY, widthX, widthY, angle, pos_on_canvas_x, pos_on_canvas_y, size_x, size_y, ctx )
		{
			ctx.save();
			ctx.translate( pos_on_canvas_x, pos_on_canvas_y );
			ctx.rotate( -angle );
			size_x = size_x || widthX;
			size_y = size_y || widthY;
			ctx.drawImage(	img, offsetX, offsetY, widthX, widthY, 
							-(size_x * 0.5),  -(size_y * 0.5), size_x, size_y
			);
			ctx.restore();
		};

}) ();

