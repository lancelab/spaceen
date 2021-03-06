
//	//\\//	Sets tasks for "window.onload" equivalent for scenario
//			For HTML canvas-wrapper, menu, sections, canvas-bg-image, image-shader :
//				accomodates height, width, position,
//				defines handlers for scrolling and resizing.


( function () {



	var	btb			= window.btb$		= window.btb$			|| {};		
	var	graph		= btb.graph			= btb.graph				|| {};
	var	conf		= graph.conf		= graph.conf			|| {};
	//.	Plugin itself
	var	scenario	= graph.scenario	= graph.scenario		|| {};



	//.	Fails in IE9
	//	var onload_original = window.onload;
	//	window.onload = function ()
	// 		if( onload_original ) onload_original();
	//	help: http://stackoverflow.com/questions/12814387/backbone-requirejs-jquery-window-load-not-working-at-all
	//	dome ready: http://requirejs.org/docs/api.html#pageload





	scenario.run = function () {



		//	//\\//	/////////////////////////////////////////////////////////////////////////////////////////////
		//
		//              Manages front page
		//
		/////////////////////////////////////////////////////////////////////////////////////////////////////////




		// //\\ CONTROL FRAGMENT ////////////////////////////////////////

		var menu_jq					= $( '#menu-btb' );
		var scrollee_jq				= $( '#scrollee-btb' );
		var sections_jq				= $( '.section-btb' );
		var canvas_wrap_jq			= $( '#canvas_wrap-btb' );
		var canvasBgIm_jq			= $( '#canvasBgIm-btb' );

		//menu_jq.css(				'visiblity', 'hidden' );
		//scrollee_jq.css(			'visiblity', 'hidden' );

		menu_jq.css(
		{
									padding : 0,
									'background-color' : 'transparent'
		});
		scrollee_jq.css(
		{ 
									// Better?: position : 'absolute',
									// Better?: 'margin-left', 0,
									// Better?: left : 230,
									top : 0,
									'background-color' : 'transparent'
		});
	
		if( !conf.doSplashOnImgLoad )
		{
			menu_jq.css(		'display', 'block' );
			scrollee_jq.css(	'display', 'block' );
		}

		var wlen = menu_jq.length;
		var menu_width				= wlen ? parseInt( menu_jq.css( 'width' ) ) : 0;
		var menu_background_height	= wlen ? parseInt( $( '#menu-background-btb' ).css( 'height' ) ) : 0;
		scrollee_jq.css( 'margin-left', menu_width + 30 );


		//	var menu_width				= menu_jq.width();	// TODM speed up
		//	var menu_background_height	= $( '#menu-background' ).height();

		var menu_background_light_y	= 187;
		var established_section		= -1;
		var established_win_width	= Math.floor( $(window).width() );
		var sectionWidthDecreaser	= 100;
		var shaderUnhidingDuration	= 1500;		// ms
		var imageUnhidingDuration	= 2000;		// ms
		var imgWidthToParent		= 0.8;
		var imageWidthLimit			= 400;		// px
		var canvasHeightToWidth		= conf.canvasHeightToWidth;
		var scroll_scale			= btb.browser.IE ? 0.1 : 0.25;
		// var scrollStep			= btb.browser.IE ? 4 : 20;


		
		//.	At least one must exist
		var imageShaderPaddingTop		= parseInt( $( '.dynamic_image_placeholder-btb' ).css( 'padding-top' ) );
		var imageShaderPaddingBottom	= parseInt( $( '.dynamic_image_placeholder-btb' ).css( 'padding-bottom' ) );

		var imageShaderHorPadding	= 0.05;		// * img.width
		var landingSplashDuration	= conf.landingSplashDuration;

		//.	... some mobiles "break" on fixed style positioning ...
		var fixedToAbsolutePatch	= btb.browser.mobile;	
		// \\// CONTROL FRAGMENT ////////////////////////////////////////







		//	//\\ Rebuilds Division Sections ////////////////////////////////////////////////

		var sections	= [];
		var sections_h	= {};
		var images		= [];


		$( 'div.section-btb' ).each( function ( ix, section ) {

			var name = section.id.substr(2);

			var div_img_jq		= $( '#' + section.getAttribute( 'id' ) + ' .dynamic_image_placeholder-btb' );
			var img_jq			= null;
			var imgShader_jq	= null;
	

			if( div_img_jq && div_img_jq[0] )
			{
				var img_jq			= $( 'img.dynamic_image_placeholder-btb',  div_img_jq );
				var imgShader_jq	= $( 'img.hider-btb',  div_img_jq );
				img_jq.css( 'visibility', 'hidden' );
			}

			var section_jq = $( section );

			sections_h[ name ] = sections[ ix ] =
			{
				ix				: ix,
				name			: name,
				id				: section.getAttribute( 'id' ),
				img_jq			: img_jq,
				imgShader_jq	: imgShader_jq,
				div_img_jq		: div_img_jq,
				div				: section
			};

		}); //	$( 'div.section' ).each
		// \\// Rebuilds Division Sections ////////////////////////////////////////////////





		// //\\ Menu Sections ////////////////////////////////////////////////
		var msections = [];
		var msections_h = {};
		/// .list is a class of items in menu-content
		$( '.list-btb' ).each( function ( ix, msection ) {

			var id				= msection.getAttribute( 'id' );
			var name			= id.substr(2);
			var msec_jq			= $( msection );
			var msection_height	= parseInt( msec_jq.css( 'height' ) );
			msec_jq.css(
			{	position	: 'absolute',
				top			: msection_height * ix
				//'color'	: '#1B1E27' 	
			});
			msections_h[ name ] = msections[ ix ] =
			{
				ix		: ix,
				name	: name,
				id		: id,
				top		: parseInt( msec_jq.css( 'top' ) ),
				jq		: $( msection )
			};
		});
		// \\// Menu Sections ////////////////////////////////////////////////




		// //\\ digestPositions ////////////////////////////////////////////////

		var repositionCanvasNavigation = function ()
		{

			//:	Detects offsets
			var window_minus_doc		= $(document).scrollTop();
			var wheight					= Math.floor( $(window).height() );
			var wwidth					= Math.floor( $(window).width() );

			var ssdd					= scrollee_jq.offset().top;
			var scrollee_minus_window	= ssdd - window_minus_doc;
			var conf					= graph.conf;

			graph.lensTransformation.reset(
			{
				control :
				{	setAbsPosZ	: true,
					posZ		: -scrollee_minus_window * scroll_scale
				}
			});
			
			if( fixedToAbsolutePatch )
			{
				//.	This is an ugly fix for inability of some mobiles to handle "fixed" positioning.
				//	But it causes flicker in IE9,10.
				canvas_wrap_jq.css( { top : window_minus_doc, height : wheight } );
			}

		};



		var digestPositions = function ()
		{
			var wheight					= $(window).height();
			var wwidth					= Math.floor( $(window).width() );

			//:	Detects offsets
			var ssdd					= scrollee_jq.offset().top;
			var window_minus_doc		= $(document).scrollTop();
			var scrollee_minus_window	= ssdd - window_minus_doc;
			var new_section_width		= Math.ceil( wwidth - menu_width - sectionWidthDecreaser );
	
			//.	This is an ugly fix for inability of some mobiles to handle "fixed" positioning
			//	No success: flicker: canvas_wrap_jq.css( 'top', window_minus_doc );

			///	Modifies sections width if window width changed
			if( established_win_width !== wwidth )
			{
				$.each( sections, function ( ix, section ) {
					section.div.style.width	= new_section_width + 'px';

					var img_jq		= section.img_jq;
					if( img_jq )
					{
						var img_width	= new_section_width * imgWidthToParent;
						// c ccc( 'strict=' + img_width + ' current css=' + img_jq.css( 'width' ) );			
						if( img_width > imageWidthLimit )
						{
							img_jq.css( 'width', imageWidthLimit );
							// c ccc( ' set to limit: img.width=' + img_jq[0].width + ' css=' + img_jq.css( 'width' ) );			

						}else{
							img_jq[0].style.width = '80%';
							// c ccc( ' set to 80%: css=' + img_jq.css( 'width' ) );			
						}
					}
				});
				established_win_width = wwidth;

			}

			//:	TODM don't do this every time. But do at landing, bs image download delay.
			//: Does recenter background image
			var canvasBgImWidth			= wwidth;
			canvasBgIm_jq.css( 'width', canvasBgImWidth );

			if( canvasHeightToWidth )
			{
				if( canvasHeightToWidth > 0 )
				{
					var canvasBgImHeight		= canvasHeightToWidth * wwidth;
				}else{
					var canvasBgImHeight		= wheight;
				}
				canvasBgIm_jq.css( 'height', canvasBgImHeight );
 			}

			//var canvasBgImWidth			= parseInt( canvasBgIm_jq.css( 'width' ) );
			//var canvasBgImCenteredLeft	= ( wwidth - canvasBgImWidth ) * 0.5;
			//canvasBgIm_jq.css( 'left', canvasBgImCenteredLeft );


			///	Detects current which is most visible on window.
			//	Sets section width.
			var current_section = null;
			$.each( sections, function ( ix, section ) {

				// Useless: var dyntop = $( section.div ).css( 'top' );
				var dyntopoff = $( section.div ).offset().top;
				var section_to_window = Math.floor( dyntopoff - window_minus_doc );
				// c ccc( section.name + ' w-d=' + window_minus_doc + ' s-d dyn off = ' + dyntopoff + ' wheight=' + wheight );

				if( !current_section && section_to_window > 0 )
				{
					///	If section on upper half of the window, select it
					if( ix === 0 || section_to_window < wheight * 0.5 )
					{
						current_section = section;
					}else{
						current_section = sections[ ix - 1 ];
					}

					// c ccc(	' est before = ' + established_section + 'est now=' + current_section.ix + ' = ' + current_section.name );
					return false;
				};

			});

			current_section = current_section || sections[ sections.length - 1 ];

			// c ccc ( "Done: cur sec = " + current_section.name + " \n\n");

			if( established_section !== current_section.ix )
			{
				//:: Changes happened. Spawns them.

				$.each( sections, function ( ix, section ) {

					section.div.style.width	= new_section_width + 'px';
					var img_jq				= section.img_jq;
					var imgShader_jq		= section.imgShader_jq;

					if( img_jq )
					{

						var width = parseInt( img_jq[0].width );
						var height = parseInt( img_jq[0].height );

						if( current_section.ix === ix )
						{

							//:: Ok.	New section is established. Do impress reader with image effect.

							//.	Cannot use this
							//	var shaderWidthPercent	= Math.ceil( parseInt( img_jq.css( 'width' ) ) * 1.4 );
							//	var shaderRightWidth	= Math.ceil( shaderWidthPercent * 0.5 )

							var shaderWidth			= Math.ceil( width * ( 1 + imageShaderHorPadding ) );
							var shaderHeight		= Math.ceil( height + imageShaderPaddingTop + imageShaderPaddingBottom );
							var shaderLeft			= parseInt( img_jq.css( 'left' ) );
							var shaderLeftStart		= shaderLeft - Math.ceil( shaderWidth * 0.225 );
							var shaderLeftEnd		= shaderLeft + Math.ceil( shaderWidth * 0.3 );


							/*
							//	//\\	Step 1. Condensing Shader	//\\

							//:	Adjusts shader to shadee
							imgShader_jq.css({
								width : Math.ceil( width * ( 1 + imageShaderHorPadding ) ),
								height : Math.ceil( height + 2 * imageShaderPadding ),
								left : 0,	//TODM find out why fails without this. rid this q&d
								opacity : 0,
								visibility : 'visible'
							});
							//	\\//	Step 1. Condensing Shader	\\//
							*/


							//	//\\	Step 1. Advancing Shader	//\\
							//:	Adjusts shader to shadee
							imgShader_jq.css({
								width		: shaderWidth,
								height		: shaderHeight,
								left		: shaderLeftStart,
								opacity		: 0,
								visibility	: 'visible'
							});
							//	\\//	Step 1. Advancing Shader	\\//



							//	//\\	Step 2. Uncovering Shader	//\\
							imgShader_jq.animate(
							{	opacity : 1, left : shaderLeft },
							{	duration : shaderUnhidingDuration,
								easing : 'linear', //'easeInQuad',
								complete : function ()
								{
										//.	Spoiling minor delay. Why?
										//	But apparently, using 'swing' makes delay much worse.
										//	img_jq[0].style.visibility = 'visible';
										img_jq.css(	'visibility', 'visible' );

										//.	Long move version. Works.
										//	imgShader_jq.animate( { left : '+' + $(window).width(), opacity : 0 }, imageUnhidingDuration,
										imgShader_jq.animate(
										{
											left : '+' + shaderLeftEnd,
											opacity : 0
										},
										{	duration : imageUnhidingDuration,
											easing : 'linear', //'easeOutQuad',
											complete : function ()
											{
												imgShader_jq.css( 'opacity', 0 );
											}
										});
								}	
							});
							//	\\//	Step 2. Uncovering Shader	\\//

							//.. if( current_section.ix === ix )

						}else{
		
							img_jq.css( 'visibility', 'hidden' );
							imgShader_jq.css( 'opacity', 0 );

						}
					} // if( img_jq ...
				}); // $.each( sections, function

				$( '.list' ).removeClass( 'selected-btb' );
				var ww = current_section.name;

				if( menu_jq.length )
				{
					var current_msection = msections_h[ ww ];
					current_msection.jq.addClass( 'selected-btb' );

					//	Sets background highlighter
					var bg_img_top = current_msection.top - menu_background_light_y;


					$( '#menu-background-btb' ).css( 'top', bg_img_top );
				}

				established_section = current_section.ix;

			} // if( established_section !== current_section.ix )


			//.	Possibly good place
			//	graph.lensTransformation.reset( { setAbsPosZ : true, posZ : -scrollee_minus_window * 0.25 } );

		};
		// \\// digestPositions ////////////////////////////////////////////////





		var throttledDigest = btb$.throttledCallback( digestPositions );
		var throttledCanvas = btb$.throttledCallback( repositionCanvasNavigation );



		//:	TODM Messy. Too many calls.
		$(window).resize(	throttledDigest );
		$(window).resize(	throttledCanvas );
		$(document).scroll(	throttledDigest );
		$(document).scroll(	repositionCanvasNavigation );

		/*
		///	Fails
		$(document.body).bind( 'mousewheel', function ( event ) {
			if( event.originalEvent.wheelDelta / 120 > 0 ){
								// c onsole.log( 'scrolling up' );
			}else{
								// c onsole.log( 'scrolling down' );
			}		
			throttledDigest();
		});
		*/


		/*
		//.	arg properties can be: keyName, event, arrow
		btb$.bindEvents( 'keydown', null, function( arg ){

			var top = parseInt( scrollee_jq.css( 'top' ) );
			if( arg.keyName === 'up' ) $( scrollee_jq ).css( 'top', top - scrollStep );
			if( arg.keyName === 'down' )
			{
				var header_height = 0;
				var top = parseInt( scrollee_jq.css( 'top' ) );
				if( top > header_height ) return;
				scrollee_jq.css( 'top', top + scrollStep );
			}
			digestPositions();

			return true;
		});
		*/






		// //\\	Final preparation and firing up animations	/////////////////////

		digestPositions();
		repositionCanvasNavigation();

		/// Must exist in document
		//	(( Is a flag. If present, then fires dsprite.handleForegrounds ))
		var wforegrounds =
		{
			fadePulseAtCulmPoint :	// TODM do this to enable /intro/landing scenario;
			[ 
				jQuery( '#scrollee-btb' ),
				jQuery( '#menu-btb' ),
				jQuery( '#img_menu_selector-btb' )
			]
			// , onAtStartup : []
		};

		graph.beforeit_init_afterit( graph.non_priority_3D_navigator, wforegrounds );

		// Fails in IE9: scrollee_jq[0].style.visibility = 'visible';
		// menu_jq[0].style.visibility = 'visible';

		//	\\//	Finalizes visibilities, opacity, animates
		//	\\//	Final preparation and firing up animations	/////////////////////



	}; //	var run_main = function () {


}) ();
