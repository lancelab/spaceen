
	#	//\\//	Finalizes top project landing pages.
	#			Replaces .dev. with .prod.


	require File.expand_path( '../source_files_scanner.rb', __FILE__ )

	#. html to be minified
	minifyee_html_base	= ARGV[0] ? ARGV[0] : 'body'
	minifyee_html		= File.expand_path( '../../scenarios/intro/landing.cont/' + minifyee_html_base + '.dev.php', __FILE__ )
	destination_folder	= File.expand_path( '../../scenarios/intro/landing.cont/',  __FILE__) + '/'
	minified_html		= destination_folder + minifyee_html_base + '.php'
	puts				"destination_folder = " + destination_folder
	puts				'minifyee = ' + minifyee_html


	web_page = ''
	File.open( minifyee_html, 'r+' ) do |f|
		web_page = f.read
	end


	#.	strips ...s_dev... from URL-query
	web_page.gsub!( /((\?)s_dev&)|((&)s_dev&)|(\?s_dev("))|(&s_dev("))/, '\2\4\6\8' );



	puts 'minified = ' + minified_html
    File.open( minified_html, 'w' ){ |f| f.write( web_page ) }



