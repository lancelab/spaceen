#?/usr/bin/ruby
#replace ? with ! in the first line and set permissions to executable to run this file standalone as ./file-name



# =========================================================================
#
# This module takes development index...htm file, scans its <script> tags, 
# accomulates all the scripts in one file and rewrites index...htm file
#
# usage: $ruby minifier.rb
#
# =========================================================================


	# require File.expand_path('../tp_ruby/dig.rb',__FILE__)
	require File.expand_path('../source_files_scanner.rb',__FILE__)

	#. html to be minified
	minifyee_html_base				= ARGV[0] ? ARGV[0]			: 'subtop'
	landing_folder_base				= ARGV[1] ? ARGV[1]			: 'logo-feather'
	templates						= ARGV[2] ? ARGV[2]			: 'logo.tpl'

	minifyee_html					= File.expand_path('../../scenarios/' + templates + '/' + minifyee_html_base + '.dev.php',__FILE__)
	#. landing page directory
	landing_folder					= File.expand_path('../../scenarios/' + landing_folder_base, __FILE__)
	landing_folder_sl				= landing_folder + '/'
	puts							"\nApplication began. Landing_folder " + landing_folder

	minified_html					= landing_folder_sl + minifyee_html_base + '.prod.php'
	minified_engine					= landing_folder_sl + 'app.js'
	minified_engine_from_landing	= 'app.js'
	
	jquery_name_re					= /\/jquery\.js$|\/jquery\.min\.js$/	# Skips jquery...js from cleanup
	dont_bunlde_jq					= true;	# this single line controls splitting/bundling jq/app


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
		puts	'... skipped missed ' + minifyee_html + " or\n... " + landing_folder
		exit
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
				product +=	'<script type="text/javascript" src="' + minified_engine_from_landing +
							'"></script>' + "\n"
				#	p uts 'inside text-scanner loop: src=' + minified_engine_from_landing
				product += t + s

			elsif state == 'parsing' and m and m[1]

				target_file_path = landing_folder_sl + m[1]
				# puts 'target_file_path = ' + target_file_path

				#target_script = File.expand_path(m[1],__FILE__)
				target_script = target_file_path
				

				File.open(target_script,'r+') do |f|

					text = f.read
			
					###	Skips jquery....js
					if m[1] =~ jquery_name_re

			 			puts " *** jq skipped: #{m[1]}"
						if dont_bunlde_jq

							product +=	'<script type="text/javascript" src="' + m[1] +
										'"></script>' + "\n\t\t"
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

			puts "got link #{m[1]}" if m and i == 0
			puts "got end #{m[0]}"  if m and i == 1
		
		end

		puts 'minified_html=' + minified_html
		puts 'minified_engine=' + minified_engine 
		#puts 'product=' + product
	    File.open( minified_html, 'w' ){ |f| f.write( product ) }
	    File.open( minified_engine, 'w' ){ |f| f.write( product_scripts ) }



