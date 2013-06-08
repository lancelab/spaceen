#!/bin/bash

################################################################
#
#  Finalizes package contents and
#  makes it ready to push to production as is.
#
#. Use it from running from this folder.
#  cd ........./deployer/
#
#
################################################################

ruby minifier.rb subtop logo-circles		logo.tpl
ruby minifier.rb subtop logo-fake-test		logo.tpl
ruby minifier.rb subtop logo-words			logo.tpl
ruby minifier.rb subtop logo-whirlio		logo.tpl
ruby minifier.rb subtop txt-whirlio-clouds	txt.tpl
ruby minifier.rb subtop txt-whirlio-frames	txt.tpl
ruby minifier.rb subtop txt-gravity			txt.tpl
ruby minifier-steps-page.rb index

