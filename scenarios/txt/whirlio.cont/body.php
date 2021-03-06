<?php ?>
		<div id="menu-btb" >

			<div id="menu-background-btb" >
				<img id="img_menu_selector-btb" src="img/web_page/lightonie.png" >
			</div>

			<div id="menu-content-btb" >

				<a id="m_introduction-btb" class="list-btb" href="#introduction-btb">Guest Readme</a>
				<a id="m_components-btb" class="list-btb" href="#components-btb">Gamions</a>
				<a id="m_loading_games-btb" class="list-btb" href="#loading_games-btb">Loading Games</a>
				<a id="m_solver-btb" class="list-btb" href="#solver-btb">Solver</a>
				<a id="m_kids-btb" class="list-btb" href="#kids-btb">Puzzles for Kids</a>
				<a id="m_whirly-btb" class="list-btb" href="http://www.whirlio.com/doc/whirly.htm">Whirly</a>
				<a id="m_crafting_games-btb" class="list-btb" href="http://www.whirlio.com/doc/crafting_games.htm">Crafting Games</a>
				<a id="m_creativity_indices-btb" class="list-btb" href="http://www.whirlio.com/doc/creativity_indices.htm">Scores and Metrics</a>
				<a id="m_whirly_and_sokoban-btb" class="list-btb" href="http://www.whirlio.com/doc/whirly_and_sokoban.htm">Whirly and Sokoban Variants</a>
				<a id="m_app_developer_readme-btb" class="list-btb" href="http://www.whirlio.com/doc/app_developer_readme.htm">Developing Engine</a>
				<a id="m_project_files-btb" class="list-btb" href="http://www.whirlio.com/doc/project_files.htm">Project Files</a>
				<a id="m_feedback-btb"	class="list-btb" href="http://www.whirlio.com//feeder/feedback/"
									title="Submit your comments, maps, scores, solutions, or games">Submit your comments ...</a>
				<a id="m_credits-btb" class="list-btb" href="#credits-btb">Credits</a>

			</div>


		</div><!-- menu -->






		<div id="scrollee-btb" >

			<div id="d_introduction-btb" class="section-btb" >

			<a id="introduction-btb"> </a><h1>Whirlio. Guest Readme</h1>


				<ul>
					<li>
						<table>
							<tr><td>Navigation:</td><td class="attention-btb">Shift + arrow up/down:</td>	<td class="attention-btb">forward/backward,</td></tr>
							<tr><td></td>    <td class="attention-btb">left/right:</td>				<td class="attention-btb">left/right</td></tr>
						</table><br>
					</li>
				</ui>


				This site allows to play, autosolve, and craft board puzzles derived from game <a href="http://www.whirlio.com/doc/whirly.htm">Whirly</a>.<br>
				All puzzles are loaded from text files called gamions.<br>
				Gamions can be pasted into this site or can be loaded from Internet links.<br>
				This site uses #@title@# as a back end player.<br>
			</div><!-- d_introduction -->





			<div id="d_components-btb" class="section-btb" ><a id="components-btb"> </a><h2>Gamions</h2>

				In simple case, gamion is a Sokoban maps' collection.<br>
				In general, gamion contains definitions of games, albums, and maps' collection.<br><br>

				Game is a set of rules to play. "Game" here means a puzzle-game. In context of #@title@#,<br>
				Game is a mathematical definition. It contains breeds, rules, and ovbjective.<br>
				It cannot be copyrighted, but credited.<br><br>

				Album merges together all components of playgame.<br>
				Album merges four things: game, dress, collection-references, and listing.<br><br>
	
				<ul>
					<li>Dress is how game looks and is interpreted in words.</li>
					<li>Dress includes images which are called "Skin".</li>
					<li>Listing specifies how to group albums in front-page-listing.</li>
					<li>Collection is a file containing maps.</li>
				</ul>
				<br>

				After merging, album displays itself as a listing on front-page. Game name often attached to album name.

				<div class="dynamic_image_placeholder-btb" >
					<img class="dynamic_image_placeholder-btb" src="img/web_page/components.png" >
					<img class="hider-btb" src="img/web_page/hider.png" >
				</div>

				Traditionally dresses and maps can be copyrighted.<br><br>

				Games can be derived from core-games or from external-games which are already derived from core-games.<br><br>

				"Collection-references" can be references to gamions ( ... so "album-gamion" is a recursive structure ).<br>
				This makes possible redressing and changing game-context for existing games and gamions.<br>
				For example, one can land to Sokoban maps in Flocks context and apply Flock-rules to Sokoban maps.<br>

			</div><!-- d_components -->





			<div id="d_loading_games-btb"  class="section-btb" >

				<a id="loading_games-btb"> </a>
				<h2>Loading Games</h2>

				U R L - q u e r y    P a r a m e t e r s   control execution of the player. For example:<br>

				<ul>
					<li>...&amp;aurl=http://mysite.com/mypath/myalbum.txt               - albums url, maps in target file are ignored</li>
					<li>...&amp;curl=http://users.bentonrea.com/~sasquatch/sokoban/m1   - collection url, target intends to have maps</li>
					<li>...&amp;curl=//mycollection_path/mycollection.txt</li>
					<li>...&amp;akey=sokoban                                            - album key</li>
					<li>...&amp;ckey=yes_this_is_my_collection_key                      - gamion key</li>
					<li>...&amp;mkey=yes_this_is_my_map_key</li>
					<li>...&amp;dkey=yes_this_is_my_dress_key</li>
					<li>...&amp;mix=345                                                 - map index</li>
					<li>...&amp;cix=123                                                 - gamion index. collection index.</li>
					<li>...&amp;asingle                                                 - suppresses display of other's albums except of &amp;aurl</li>
					<li>...&amp;slim=300000                                             - positions' number limit for solver</li>
				</ul>

				&amp;aurl or &amp;curl can be set independently: both or one of them.<br> 
				Game Crafters may want use these parameters to point to own sites.<br><br>
		
				Games can be copy-pasted right into web page.<br>

				<div class="dynamic_image_placeholder-btb" >
					<img class="dynamic_image_placeholder-btb" src="img/web_page/loading_games.png" >
					<img class="hider-btb" src="img/web_page/hider.png" >
				</div>

			</div><!-- d_loading_games -->



			<div id="d_solver-btb" class="section-btb">

				<a id="solver-btb" > </a>
				<h2>Solver ..</h2>

				.. is breadth-first and weak. Its power depends on size of your computer memory.<br>
				Solver memory limit is preset to slim=(300000 positions) for PC with 1 Gig memory.<br>
				If your computer has less, solver may freeze your browser. If you computer has more,<br>
				on your own risk, you may increase the limit to solve harder puzzles.<br><br>

				For FireFox 11, Ubuntu, empirical values are:<br>

				<ul>
					<li>slim=300000 for 1 Gig,</li>
					<li>slim=4000000 for 3 Gig. (Ubuntu 10.04, FF 11, Boarspirator version: 1.200.)</li>
				</ul>
				<br>

				<div class="dynamic_image_placeholder-btb" >
					<img class="dynamic_image_placeholder-btb" src="img/web_page/solver.png" >
					<img class="hider-btb" src="img/web_page/hider.png" >
				</div>

				Examples of supplying slim in URL string:<br>
				Do land to player URL, select game of your choice, and then run solver like this:<br><br>
					#@AppRoot@#/?slim=1000000<br><br>
				or<br><br>
					#@AppRoot@#/?akey=sokoban&amp;slim=100000&amp;map_ix=1<br><br>

				How to:<br><br>

				Each map has own solver. They can run concurrently. (Not a good idea for performance.)<br>

					You can start solver and go playing on another map.<br>
					If you start solver and start playing the on the same map,<br>
					     your game will be overriden when solver finds solution.<br> 
					     Overriding goes only to current round, other rounds of the same maps are intact.<br><br>

					Solver starts from given position, not from initial position of the map.<br>
					Initially, solver has two options "Search All" and "Search First".<br><br>

				Usage:<br><br>

				<ol>
					<li>	To generate new game-scenario, run solver for co-game, find "longest" solution in terms of
						   interactions or moves, then co-vert the scenario.
					</li>

					<li>
							Solving in "reverse mode".<br>
							It is indicated that some Sokoban and Colorban games are solved faster when solving in reverse mode which
							practically is:<br><br>

					       Description:    Land to map, Convert map to co-map, guess in which closed area hero(s) must be and add them into
						                   map manually, confirm map, start solver.<br><br>
					       Actions:        "Edit Co-Position", add heros manually, Ctr+d, Search/First.<br><br>
					</li>
				</ol>

						There are possible difficulties at the edge of Web-browser capabilities:<br><br>
							Browsers die, quit, crash differently on different OSes.<br>
							For example: Around version 1.163. In Windows 7, in FF 16, solver halts on 2046 Megs of mem.  32 bit limit?<br>
							So, far the best combination we found is FF 11, on Ubuntu 10.04 on <br>
							Acer laptop Aspire 5532.<br><br>

							FF memory limits:	http://www.talesofinterest.net/top-10-awesome-firefox-tricks/<br>
												http://superuser.com/questions/459448/how-can-i-configure-firefox-to-assume-i-have-less-memory<br>

			</div><!-- d_solver -->




			<div id="d_kids-btb"  class="section-btb" >

				<a id="kids-btb" > </a>
				<h2>Puzzles for Kids</h2>

				Some of us have kids and want to develop their analytical skills ...<br>
				Don't compain for the lack of kid-adapted puzzles, you don't<br>
				need programming skills to craft them ... <br>
				Here are the examples ... games: <a href="http://www.whirlio.com/?akey=kids6&asingle&curl=//def/albums/kids/6.json.txt">Kids 6</a>, <a href="../?akey=kids6co_colo&asingle&curl=//def/albums/kids/6co_colorban.json.txt">Kids 6 CoColo</a>, <a href="../?akey=kids7&asingle&curl=//def/albums/kids/7.json.txt">Kids 7</a>... their scripts:<br>
				<a href="http://www.whirlio.com/def/albums/kids/6.json.txt">Kids 6 Dress</a>, <a href="http://www.whirlio.com/def/albums/kids/collections/default/maps.txt">Kids 6 Maps</a>,<br>
				<a href="http://www.whirlio.com/def/albums/kids/6co_colorban.json.txt">Kids 6 CoColo Dress</a>,  <a href="http://www.whirlio.com/def/albums/kids/collections/default/coco_maps.txt">Kids 6 CoColo Maps</a><br>
				<a href="http://www.whirlio.com/def/albums/kids/7.json.txt">Kids 7 Dress</a>.<br><br>

				<div class="dynamic_image_placeholder-btb" >
					<img class="dynamic_image_placeholder-btb" src="img/web_page/kids.png" >
					<img class="hider-btb" src="img/web_page/hider.png" >
				</div>

				Yes, there are other challenges compare to mature age puzzles:<br>
				the heros must have character and gameplay must be motivating and rewarding ...<br>
				Craft your images, make maps you feel be entartaining for your child ...<br>
				If you afraid to play on-line, once you dowloaded the player, disconnect<br>
				from adult-Internet and continue playing ...<br>

			</div><!-- d_kids -->



			<div id="d_credits-btb"  class="section-btb" >

				<a id="credits-btb" > </a>
				<h2>Credits</h2>

				File: Sea_view_by_Moonlight.jpg<br><br>

				Description:			Sea view by Moonlight, by Ivan Aivazovsky<br>
				Original publication:	1878<br>
				Immediate source:		http://gallerix.ru/album/aivazovsky/pic/glrx-682659912<br>
				Date:					1878<br>
				Author:					Ivan Aivazovsky<br>
				downloaded_from:		http://upload.wikimedia.org/wikipedia/en/4/41/Sea_view_by_Moonlight.jpg<br><br>

				<a href="http://whirlio.com/doc/credits.htm" target="_blank" ><b>Skin Credits</b></a>

				<h3>Site Credits</h3>
				<a href="../../../">Samples</a><br>
				Copyright:	2013 (c) Konstantin Kirillov. All rights reserved. <br>
				<!-- EMail:		beaverscript (@) landkey (.) net<br><br -->

			</div><!-- d_credits -->


		</div><!-- id="scrollee" -->


