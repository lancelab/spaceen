


Minifier does:

	In each project scenario/album/project:

		Makes index.prod.htm
		Removes all server stuff from it
			By calling to localhos via curl from PHP
		Builds minified engine js/app.js

	Primary front page: scenarios/intro/landing
	
		Removes ...s_dev... from query strings


Usage:

	$cd deployer
	$./finalize_package.sh


Requirements:

	Ruby
	PHP
	Curl
	Apache


TODO:
	
	Move all clean stuff in separate root
	All templates called outside of project ../../ must be localized under project.
	
