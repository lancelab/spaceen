#!/bin/bash -e


# don't run unless you understand the script
# Ubuntu-specific

# Hard-coding: but Ubuntu quick-launcher fails without this:
cd /var/www/z/seen/spaceen/deployer

./toprod.sh

nautilus /var/www/z/seen/spaceen &

