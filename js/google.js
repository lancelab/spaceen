
//	//\\//	Inserts Google Analytics. Can be optionally included.
//			Must be after btb$ core is defined.
//			Should be last before <head>
//			Sets GA immediately.


( function () {

		var btb = window.btb$;
		if( !btb ) return;

		var gapps =
		{

			enabled		: true,	// GA is enabled by default.

			gaVERSION	: '2012',	// default; reset by hostname; ga2012 uses qa.js; ga2013 uses analytics.js

			//. If one of these tokens is met in location.pathname, then
			//	google is disabled in entire application
			forbidden_subpaths			: [ "/a1/", "metap/apps/", "/feat", "/bil" ],

			//.	Sets hosts forbidden for google suite
			forbidden_host_names	: [ 'localhost' ],

			hosts			:
			{
				'landkey.net'	:
				{ 
						'_setAccount'		: 'UA-26834667-1'
				},

				'landkey.org'	:
				{ 
						'_setAccount'		: 'UA-26834667-3'
				},

				//http:
				'boardspirator.herokuapp.com'	:
				{
						'_setAccount'		: 'UA-26834667-4'
				},

				//http:
				'boardspirator.com'	:
				{
						'_setAccount'		: 'UA-26834667-5'
				},

				'whirlio.com'	:
				{
						'_setAccount'		: 'UA-40278788-1',
						gaVERSION			: '2013'
				}

			}//hostnames

		};



		gapps.host		= gapps.hosts[ btb.effective_hostname_without_www ] || gapps.hosts[ 'landkey.net' ];
		//.	Falls back to default if non-defined in host
		gapps.gaVERSION	= gapps.host.gaVERSION || gapps.gaVERSION;


		// //\\ removes traces of google apps for preset paths or hosts
		var ww = window.location.pathname.toLowerCase();
		btb.each( gapps.forbidden_subpaths, function( dummy, subpath ) { 
			if(	ww.indexOf( subpath ) > -1 )
			{
				btb.ifdeb( 'Google is disabled for subpath = ' + subpath );
				gapps.enabled = false;
			}
		});

		btb.each( gapps.forbidden_host_names, function( dummy, host ) {
			if(	btb.effective_hostname_without_www.indexOf( host ) > -1 )
			{
				btb.ifdeb( 'Google is disabled for host = ' + host );
				gapps.enabled = false;
			}
		});
		if( !gapps.enabled ) return;
		// \\// removes traces of google apps for preset paths or hosts


		///	Selects google account depending on host name
		if( gapps.gaVERSION === 'ga2013' )
		{
			  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			  ga('create', gapps.host['_setAccount'], 'whirlio.com');
			  ga('send', 'pageview');

		}else{

    
		    var _gaq = window._gaq = window._gaq || [];
		    _gaq.push([    '_setAccount',   gapps.host['_setAccount'] ]);
		    _gaq.push(['_trackPageview']);

		    (function() {
				var ga = document.createElement('script');
				ga.type = 'text/javascript';
				ga.async = true;
				ga.src = ('https:' == document.location.protocol ?
								'https://ssl' : 
								'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(ga, s);
		    })();
		}


}) ();
