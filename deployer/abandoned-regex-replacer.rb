#?/usr/bin/ruby
#replace ? with ! in the first line and set permissions to executable to run this file standalone as ./file-name


	require File.expand_path( '../source_files_scanner.rb', __FILE__ )
	require File.expand_path( '../organizer.rb',            __FILE__ )


	album_container			= File.expand_path( '../..', __FILE__ )
	forbidden_folders		= '=...=..relative... path...='		# all is non-forbidden
	forbidden_extensions	= /\.tpl$|\.cont$/					# skips albums-templates
	verbose					= true



	#	//\\	Scans albums in container

	TPDirParser.scan( album_container, '', 0, verbose ) do | abs, rel, name, isdir, action, depth |

		if isdir

			# puts abs, rel, name, isdir, action, depth, "\n\n"
			splitted	= rel.split( '/' )
			album		= splitted[0]

			if forbidden_folders.index('=' + rel + '=')
				action[ 'dostop' ] = true
		 		puts ( rel + " ... skipped\n" ) if verbose
				next
			elsif name.index(forbidden_extensions)
		 		puts ( rel + " ... skipped\n" ) if verbose
				next
			elsif album.index(forbidden_extensions)
		 		puts ( rel + " ... skipped\n" ) if verbose
				next
			end

		elsif

			


		end
	end
	#	\\//	Scans albums in container

	puts "\nMinifier done\n\n"
