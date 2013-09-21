#?/usr/bin/ruby
#replace ? with ! in the first line and set permissions to executable to run this file standalone as ./file-name



# =========================================================================
#
# This module scans albums in scenarios folders for projects
# and minifies projects:
# stakes landing HTML-template, scans its <script> tags, 
# accomulates all the scripts in one file and rewrites index...htm file
#
# usage: $ruby minifier.rb
#
# =========================================================================


	# require File.expand_path('../tp_ruby/dig.rb',__FILE__)
	require File.expand_path( '../source_files_scanner.rb', __FILE__ )
	require File.expand_path( '../organizer.rb',            __FILE__ )





	album_container			=	File.expand_path( '../../scenarios', __FILE__ )
	forbidden_folders		= '=...=..relative... path...='		# all is non-forbidden
	forbidden_extensions	= /\.tpl$|\.cont$/					# skips albums-templates
	verbose					= false


	scenarios_folder				=	File.expand_path('../../scenarios', __FILE__)
	scenarios_prod_folder			=	File.expand_path('../../prod', __FILE__)


	@minif_eng_folder_from_landing		=	'js'
	@minified_engine_from_landing		=	@minif_eng_folder_from_landing + '/app.js'
	@jquery_name_re						=	/\/jquery\.js$|\/jquery\.min\.js$/	# Skips jquery...js from cleanup
	@dont_bunlde_jq						=	true;								# this single line controls splitting/bundling jq/app
	@move_into_subapp_jq				=	true;
	@jQuery_final_name					=	'jquery.js'

	########################################################################################################################
	# makes raw prod-folder and cleans it up
	########################################################################################################################
	if !system( 'rm -rf ' + scenarios_prod_folder ) 
		msg = $?.to_s
   		raise msg
	end

	if !system( 'cp -fr ' + scenarios_folder + ' ' + scenarios_prod_folder ) 
		msg = $?.to_s
   		raise msg
	end

	#fails: wCommand = 'find ' + scenarios_prod_folder + ' -name \*.php -o -name \*.js -exec rm \{\} \;' #TODM make
	#if !system( wCommand ) 
	#	msg = $?.to_s
   	#	raise msg
	#end

	wCommand = 'find ' + scenarios_prod_folder + ' -type f -name \*.js -exec rm \{\} \;'
	if !system( wCommand )
		msg = $?.to_s
   		raise msg
	end

	wCommand = 'find ' + scenarios_prod_folder + '  -type f -name \*.php -exec rm \{\} \;'
	if !system( wCommand ) 
		msg = $?.to_s
   		raise msg
	end














  ########################################################################################################################
  #	deploy_project
  ########################################################################################################################

  def deploy_project( album, landing_folder_base, scenarios_prod_folder )



	landing_folder_base				=	album + '/' + landing_folder_base
	landing_folder					=	File.expand_path('../../scenarios/' + landing_folder_base, __FILE__)
	landing_folder_sl				=	landing_folder + '/'
	puts								"\n" + landing_folder_base + " deployment began.\n... Landing_folder=" + landing_folder
	landing_prod_folder				=	scenarios_prod_folder + '/' + landing_folder_base


	########################################################################################################################
	#	Gets single-file response from server and writes it to disk creating source for minifying
	########################################################################################################################

	#.	we amend this statement because index.htm can be also a target:
	#	curl_target_file				=	( landing_folder_sl + 'index.php' ).gsub( /^\/var\/www/, 'http://localhost' )

	curl_target_file				=	( landing_folder_sl ).gsub( /^\/var\/www/, 'http://localhost' )
	assembled_html_file				=	landing_folder_sl + 'index.php.htm'

	command_to_run					=	'php curlify.php ' + curl_target_file + ' ' + assembled_html_file
	puts '... running: ' + command_to_run
		
	if !system( command_to_run ) 
		msg = $?.to_s
   		raise msg
	end



	minifyee_html					=	assembled_html_file;
	minified_html					=	landing_prod_folder + '/index.htm'
	minified_engine					=	landing_prod_folder + '/' + @minified_engine_from_landing



	# input of deployer
	web_page = ''

	#:	outputs of deployer
	#.	contents of "index_product.htm"
	product			= ''
	#.	contents of "app.js"
	product_scripts = ''


	#:	search keys
	keys		= 	[	/<script(?:(?:[^<]+\s)|\s)src="([^"]+)"[^<]*<\/script>/,
						/<\/head>/
					]


	#	//\\	sets replacements
	file_to_replace = 'core/config/non-existing-file.js'
	replacement_pair =	[	
							/^\s$/,
							"dummy"
						]	
	#	\\//	sets replacements




	#:	Removes empty lines or one line comments: // comment ...
	one_line_comment	=	/(^\s*\/\/.*(\n|\r))|(^\s*(\n|\r))/
	one_line_comment_replacement = ''

	#:	Removes in line comments: a = " // data "; // comment ...
	in_line_comment		=	/\/\/[^'"\r\n]*(\n|\r)/
	in_line_comment_replacement = "\n"

	if !File.exists?( minifyee_html ) or !File.directory?( landing_folder )
		puts	'... skipped missed minifyee_html=' + minifyee_html + " or\n... landing_folder=" + landing_folder
		return
	end

		File.open(minifyee_html,'r+') do |f|
			web_page=f.read
		end

		source_scanner = SourceFilesScanner.new

		state		= 'begin'
		source_scanner.scan_infinitely(web_page, 0, keys) do |p,t,s,i,m|

			# i = index of regex which was caught. To change state of parser.
			# s = total value of expression which was caught (separator)
			# t = token before separator
			product += t if state == 'begin' or state == 'end'

			#	p uts '!!m=' + (!!m).to_s + ' match-key=' + i.to_s
			#	p uts 't=' + t + ' s=' + s

			state = 'parsing' if m and i == 0 and state == 'begin'
			# puts 'separator = ' + s


			#.	s == '' means end-of-file-separator
			if ( ( m and i == 1 ) or s == '' ) and state == 'parsing'

				state = 'end' 
				product +=	'<script type="text/javascript" src="' + @minified_engine_from_landing +
							'"></script>' + "\n"
				#	p uts 'inside text-scanner loop: src=' + @minified_engine_from_landing
				product += t + s

			elsif state == 'parsing' and m and m[1]

				target_file_path = landing_folder_sl + m[1]
				# puts 'target_file_path = ' + target_file_path

				#target_script = File.expand_path(m[1],__FILE__)
				target_script = target_file_path
				

				File.open(target_script,'r+') do |f|

					text = f.read
			
					###	Skips jquery....js
					if m[1] =~ @jquery_name_re

			 			puts "*** jq skipped: #{m[1]}"
						if @dont_bunlde_jq or @move_into_subapp_jq

							if @move_into_subapp_jq

								wJQuery	= landing_prod_folder + '/' + @minif_eng_folder_from_landing + '/' + @jQuery_final_name
								puts '... jQuery ... ' + wJQuery
							    File.open( wJQuery, 'w' ){ |f| f.write( text ) }
								product +=	'<script type="text/javascript" src="' + @minif_eng_folder_from_landing + '/' + @jQuery_final_name +
											'"></script>' + "\n\t\t"

							elsif

								product +=	'<script type="text/javascript" src="' + m[1] +
											'"></script>' + "\n\t\t"

							end

						else

							product_scripts += text + "\n"
						end

					else

						#::	performs replacements
						if m[1] == file_to_replace
							match = text.match(replacement_pair[0]);
							text.sub!(replacement_pair[0],replacement_pair[1]);
						end
						text.gsub!( one_line_comment, one_line_comment_replacement )
						text.gsub!( in_line_comment, in_line_comment_replacement )

						product_scripts += text + "\n"

					end

				end
			end # elsif state == 'parsing' and m and m[1]

			# puts "got link #{m[1]}" if m and i == 0
			# puts "got end #{m[0]}"  if m and i == 1
		
		end

		puts '... minified_html=' + minified_html
		puts '... minified_engine=' + minified_engine 
		# puts '... product=' + product.slice(0, 10) + '...'
	    File.open( minified_html, 'w' ){ |f| f.write( product ) }
	    File.open( minified_engine, 'w' ){ |f| f.write( product_scripts ) }

		wCommand = 'rm ' + minifyee_html
		# puts '... removing=' + minifyee_html
		if !system( wCommand ) 
			msg = $?.to_s
	   		raise msg
		end

  end









	#	//\\	Scans albums in container

	TPDirParser.scan( album_container, '', 0, verbose ) do | abs, rel, name, isdir, action, depth |

		next if depth > 1

		if isdir

			# puts abs, rel, name, isdir, action, depth, "\n\n"
			splitted	= rel.split( '/' )
			album		= splitted[0]

			if forbidden_folders.index('=' + rel + '=')
				action[ 'dostop' ] = true
		 		puts ( rel + " ... skipped\n" ) if verbose
			elsif name.index(forbidden_extensions)
		 		puts ( rel + " ... skipped\n" ) if verbose
			elsif album.index(forbidden_extensions)
		 		puts ( rel + " ... skipped\n" ) if verbose
			elsif depth == 1
				#deploy_project  album, 	landing_folder_base,  landing_file_base
				deploy_project(  album,	name, scenarios_prod_folder )
			end

		end
	end
	#	\\//	Scans albums in container

	puts "\nMinifier done\n\n"
