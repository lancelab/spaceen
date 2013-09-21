<?php ?>


	<img id="logo-btb" src="../../../../img/nebulae/cube-logo.png">


	<div id="scrollee">

		<div id="padder">

			<a id="introduction"> </a>

			<div id="carousel-1" class="section" >

				<h1>Parallax Journey</h1>


				<br>

				Parallax is a pacing objects in a plane and displaying the plane with <a href="../../../doc/sketch0_0.gif">scale inverse proportional to plane's distance from observer</a>.
				When few planes are moved, this creates an impression of a live scene.
				<br>
				<br>


				<h3>Simplest case</h3>

				Most simple case of parallax are parallel front planes and observer moving parallel to them. In this case, set of distances is fixed and
				scales fixed too. Hence, there is no need to dynamically rescale images which can be prescaled. However, speed V of offsetting
				the image is still V ~ 1 / D. Difference in speed will trick eye perception of distance.
				Even rough difference in speed already makes scene alive.
				<br><br>
				The design should be possible on any browser starting from mid-age 1996 browsers.
	
				<br><br>
				Plane center can be rotated along the circle belonging horizontal plane like on these pages:<br><br>

					<a href="./?imagesToLoad.0=0">C. No background.</a><br>
					<a href="./?conf3D.bgScenario.mode=infCylinder&itemsMax=1">CB. Background and body</a><br> 
					<a href="./?conf3D.bgScenario.mode=infCylinder">CB. With background</a><br><br>
				<br>
				This is still simple design. JavaScript program must be enough intelligent to make a division operation: 1/y.
				Browser should be able to make partially-transparent divs.
				<br>
				<br>

				<h3>Plane rotations around vertical axis</h3>

				There are more complex motions, which require more complex plane transformations than simple rescaling.
				For example, if the scene is a cube and planes belong facets of the cube, and cube rotates over vertical axis, then
				different parts of side facets may have different distance to observer.<br><br>

				<a href="./?conf3D.bgScenario.mode=cube&imagesToLoad.1=0&conf3D.boxWrap.doPrism=0&conf3D.originY=500&conf3D.originYMax=11200&conf3D.scale=700">A2.Experimental. Cube. Wallpaper. Slow FF performance on Ubuntu laptop. Should say good-bye to this variant.</a><br><br>
				<a href="./?conf3D.bgScenario.mode=cube&imagesToLoad.1=0&conf3D.boxWrap.doPrism=1&conf3D.originY=500&conf3D.originYMax=11200&conf3D.scale=700">A. Prism. Wallpaper.</a><br>
				<br>
				<br>
				
			</div><!-- carousel-1 -->

			
			<a id="credits"> </a>
			<div id="carousel-2"  class="section" >

				<a id="credits" > </a>
				<h2><a href="http://landkey.org/Sandbox/z/graph-spin/">Demos</a></h2>
				Image resources credit: NASA, ESA, and the Hubble Heritage Team (STScI/AURA)-ESA/Hubble Collaboration
				<a href="http://hubblesite.org/newscenter/archive/releases/2006/55/image/a/">hs-2006-55-a-full_jpg.jpg</a>,
				<a href="http://imgsrc.hubblesite.org/hu/db/images/hs-2006-19-c-full_jpg.jpg">hs-2006-19-c-full_jpg.jpg</a>.
				<br><br>
				Copyright 2013 (c) KVK<br>
				<br>
				<br>
				<br>

			</div><!-- d_credits -->

		</div><!-- id="padder" -->

	</div><!-- id="scrollee" -->

