
	#	//\\//	Finalizes top project landing pages.
	#			Replaces .dev. with .prod.


	require File.expand_path( '../source_files_scanner.rb', __FILE__ )

	#. html to be minified
	minifyee_html_base	= ARGV[0] ? ARGV[0] : 'index'

	minifyee_html		= File.expand_path( '../../' + minifyee_html_base + '.dev.htm', __FILE__ )
	#. landing page directory
	landing_folder		= File.expand_path( '../..', __FILE__) + '/'
	puts				"landing_folder " + landing_folder

	minified_html		= landing_folder + minifyee_html_base + '.prod.htm'
	#.	Makes a copy of .prod.htm file
	minified_html2		= landing_folder + minifyee_html_base + '.htm'

	web_page = ''
	File.open( minifyee_html, 'r+' ) do |f|
		web_page = f.read
	end

	#.	strips ...dev... from URL-query
	web_page.gsub!( /((\?)dev&)|((&)dev&)|(\?dev("))|(&dev("))/, '\2\4\6\8' );

	puts 'minified_html=' + minified_html
    File.open( minified_html, 'w' ){ |f| f.write( web_page ) }
    File.open( minified_html2, 'w' ){ |f| f.write( web_page ) }



