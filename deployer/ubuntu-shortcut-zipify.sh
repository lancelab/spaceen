#!/bin/bash -e

# zips up spaceen by ignoring "prod" and .git subfolders
# don't run unless you understand the script
# Ubuntu-specific


nautilus /var/www/z/seen/ &
# Hard-coding: but Ubuntu quick-launcher fails without this:
cd /var/www/z/seen/spaceen/deployer

./zipify.sh
