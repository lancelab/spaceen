
    	<script type="text/javascript">
			( function () {
				document.write( "\t\t<style type=\"text/css\">" +
					"#java-script-disabled, #scrollee, #menu, #canvas_wrap, #content { display:none; } " +
					"#loading_wrapper{ display:block; }</style>\n"
				);
				///	detects canvas-enabled browsers and initiates animation scenario;
				//	must be run as soon as possible to prevent landing flickers;
				var btb				= window.btb$ = window.btb$ || {};		
				var canvas			= document.createElement( 'canvas' );
				btb.canvasEnabled	= canvas && canvas.getContext && canvas.getContext( '2d' ) && canvas;
				if( btb.canvasEnabled )
				{
					document.write( "\t\t<style type=\"text/css\">#canvas_warning { display:none; }</style>\n" );
				}
			}) ();
		</script>


