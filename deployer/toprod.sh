#!/bin/bash -e

################################################################
#
#  Does all apps and extra-step for intro-app. See ./README...
#
################################################################

ruby minifier.rb
#extra-step for intro-app:
ruby minifier-steps-page.rb body

